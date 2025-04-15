import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import '../CSS/AdminDashboard.css';

const AdminDashboard = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState([]);
  const [contentType, setContentType] = useState('paragraph');
  const [quote, setQuote] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [image, setImage] = useState(null);

  // Estado para los temas disponibles
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('');

  // Estados y funciones para el modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal abierto o cerrado
  const [contentToDelete, setContentToDelete] = useState(null); // El índice del contenido a eliminar

  const BASE_URL = 'http://localhost:5000';

  // Obtener los temas disponibles desde la base de datos
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/topics`);
        setTopics(response.data);
      } catch (error) {
        console.error('Error al obtener los temas:', error);
      }
    };
    fetchTopics();
  }, []);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Función para crear el slug del tema
  const createSlug = (title) => {
    return title.toLowerCase()
      .replace(/ /g, '-')      // Reemplaza los espacios por guiones
      .replace(/[^\w-]+/g, ''); // Elimina cualquier caracter no alfanumérico
  };

  // Función para agregar el tema como un enlace dentro del párrafo
  const insertTopicInParagraph = (index) => {
    if (selectedTopic) {
      const updatedContent = [...content];
      const topic = topics.find(t => t.title === selectedTopic);
      const link = `<a href="/topic/${createSlug(topic.title)}">${topic.title}</a>`;
      updatedContent[index].content = updatedContent[index].content + ' ' + link; // Insertamos el enlace al final del contenido del párrafo
      setContent(updatedContent);
      setSelectedTopic(''); // Resetear la selección
    }
  };

  const renderContent = (contentArray) => {
    return contentArray.map((section, index) => {
      switch (section.type) {
        case 'paragraph':
          return <p key={index} dangerouslySetInnerHTML={{ __html: section.content }} />;
        case 'subtitle':
          return <h3 key={index}>{section.content}</h3>;
        default:
          return null;
      }
    });
  };

  const handleAddContent = () => {
    let newContent = {};

    if (contentType === 'paragraph') {
      newContent = {
        type: 'paragraph',
        content: '',
      };
    } else if (contentType === 'subtitle') {
      newContent = {
        type: 'subtitle',
        content: '',
      };
    }

    setContent([...content, newContent]);
  };

  const handleRemoveContent = (index) => {
    const contentToRemove = content[index];

    // Si el contenido está vacío, lo eliminamos directamente
    if (contentToRemove.content === '') {
      const updatedContent = content.filter((_, i) => i !== index);
      setContent(updatedContent);
    } else {
      // Si el contenido no está vacío, mostramos el modal de confirmación
      setContentToDelete(index);  // Establecemos el contenido a eliminar
      setIsModalOpen(true); // Mostramos el modal
    }
  };

  const handleContentChange = (index, newText) => {
    const updatedContent = [...content];
    updatedContent[index].content = newText;
    setContent(updatedContent);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);
    formData.append('content', JSON.stringify(content));
    formData.append('quote', quote); // Incluimos la cita en los datos enviados

    try {
      const response = await axios.post(`${BASE_URL}/topics`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Tema agregado:', response.data);
    } catch (error) {
      console.error('Error al agregar tema:', error);
    }
  };

  const handleOnDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;

    const updatedContent = Array.from(content);
    const [movedItem] = updatedContent.splice(source.index, 1);
    updatedContent.splice(destination.index, 0, movedItem);
    setContent(updatedContent);
  };

  // Confirmar eliminación del contenido
  const handleConfirmDelete = () => {
    if (contentToDelete !== null) {
      const updatedContent = content.filter((_, i) => i !== contentToDelete);
      setContent(updatedContent);
    }
    setIsModalOpen(false); // Cerrar el modal
    setContentToDelete(null); // Resetear el contenido a eliminar
  };

  // Cancelar la eliminación
  const handleCancelDelete = () => {
    setIsModalOpen(false); // Cerrar el modal sin eliminar
    setContentToDelete(null); // Resetear el contenido a eliminar
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Panel de Administración</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="form-label">Título:</label>
          <input
            type="text"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Carga de imagen */}
        <div className="form-group">
          <label className="form-label">Imagen:</label>
          <input type="file" className="form-input" onChange={handleFileChange} />
        </div>

        {/* Campo de Cita */}
        <div className="form-group">
          <label className="form-label">Cita (opcional):</label>
          <input
            type="text"
            className="form-input"
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            placeholder="Agrega una cita sobre la imagen (opcional)"
          />
        </div>

        {/* Selección de tipo de contenido */}
        <div className="form-group">
          <label className="form-label">Seleccionar tipo de contenido:</label>
          <select
            className="form-input"
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
          >
            <option value="paragraph">Párrafo</option>
            <option value="subtitle">Subtítulo</option>
          </select>
        </div>

        {/* Botón para agregar contenido */}
        <button type="button" className="add-button" onClick={handleAddContent}>
          Agregar {contentType}
        </button>


        {/* Selección de tema */}
        <div className="form-group">
          <label className="form-label">Seleccionar tema:</label>
          <select
            className="form-input"
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
          >
            <option value="">Selecciona un tema</option>
            {topics.map((topic) => (
              <option key={topic._id} value={topic.title}>
                {topic.title}
              </option>
            ))}
          </select>
          <button type="button" className="add-button" onClick={() => insertTopicInParagraph(content.length - 1)}>
            Insertar tema
          </button>
        </div>

        {/* Renderizar bloques de contenido con drag and drop */}
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="contentList">
            {(provided) => (
              <div
                className="content-preview"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h2>Vista previa del contenido:</h2>
                {content.map((block, index) => (
                  <Draggable key={index} draggableId={String(index)} index={index}>
                    {(provided) => (
                      <div
                        className="content-block"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {block.type === 'link' ? (
                          <div dangerouslySetInnerHTML={{ __html: block.content }} />
                        ) : (
                          <>
                            <span className="content-label">
                              {block.type === 'subtitle' ? 'Subtítulo:' : 'Párrafo:'}
                            </span>
                            {block.type === 'paragraph' ? (
                              <textarea
                                value={block.content}
                                onChange={(e) => handleContentChange(index, e.target.value)}
                                className="content-textarea"
                                placeholder="Ingresar contenido del párrafo"
                              />
                            ) : (
                              <input
                                type="text"
                                value={block.content}
                                onChange={(e) => handleContentChange(index, e.target.value)}
                                className="content-input"
                                placeholder="Ingresar subtítulo"
                              />
                            )}
                          </>
                        )}

                        {/* Botón de eliminar con el icono de basura */}
                        <button
                          type="button"
                          className="remove-button"
                          onClick={() => handleRemoveContent(index)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <button
          type="button"
          className="submit-button"
          onClick={() => setShowPreview(!showPreview)}
        >
          {showPreview ? 'Ocultar vista previa' : 'Previsualizar'}
        </button>
        <button type="submit" className="submit-button">Enviar</button>
      </form>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirmar Eliminación</h3>
            <p>¿Estás seguro de que deseas eliminar este contenido?</p>
            <button onClick={handleConfirmDelete} className="confirm-button">Sí, Eliminar</button>
            <button onClick={handleCancelDelete} className="cancel-button">Cancelar</button>
          </div>
        </div>
      )}

      {/* Lo que se ve en la vista previa */}
      {showPreview && (
        <div className="topic-detail" style={{ marginTop: '40px' }}>
          {/* Fecha simulada */}
          <p className="topic-detail-date">
            {new Date().toLocaleDateString('es-ES', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </p>

          <h1>{title}</h1>
          {image && (
            <div className="topic-image-container">
              {/* Cita encima de la imagen */}
              {quote && <blockquote className="topic-detail-quote">
                {quote}
              </blockquote>}
              <img
                src={URL.createObjectURL(image)}
                alt={title}
                className="topic-detail-image"
              />
            </div>
          )}
          <div className="topic-detail-content">
            {renderContent(content)}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
