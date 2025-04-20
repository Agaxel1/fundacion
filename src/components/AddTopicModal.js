import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { insertTopicInParagraph, renderContent, handleContentChange, getNewContent } from '../components/Topics';
import { getTopics, submitTopic } from '../services/api';
import ViewTopic from '../components/ViewTopic'
import '../CSS/AdminDashboard.css';

const AddTopicModal = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState([]);
    const [contentType, setContentType] = useState('paragraph');
    const [contentText, setcontentText] = useState('Párrafo');
    const [quote, setQuote] = useState('');
    const [showPreview, setShowPreview] = useState(false);
    const [image, setImage] = useState(null);
    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [contentToDelete, setContentToDelete] = useState(null);
    const [showTopicSelectorAt, setShowTopicSelectorAt] = useState(null); // index del contenido
    const [, setInsertingTopicAtIndex] = useState(null); // para saber dónde insertar el tema

    // Obtener los temas disponibles desde la base de datos
    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const data = await getTopics();
                setTopics(data);
            } catch (err) {
                console.error('Error al obtener temas:', err);
            }
        };
        fetchTopics();
    }, []);

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleInsertTopic = (index) => {
        const updatedContent = insertTopicInParagraph(index, selectedTopic, content, topics);
        setContent(updatedContent);
        setSelectedTopic('');
        setShowTopicSelectorAt(null);
        setInsertingTopicAtIndex(null);
    };

    const handleContentChangeWrapper = (index, newText) => {
        const { updatedContent, newTopicSelectorAt } = handleContentChange(
            index,
            newText,
            content,
            showTopicSelectorAt
        );

        setContent(updatedContent);
        setShowTopicSelectorAt(newTopicSelectorAt);
    };

    const handleAddContent = () => {
        const newContent = getNewContent(contentType);
        if (newContent) {
            setContent([...content, newContent]);
        }
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


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('image', image);
        formData.append('content', JSON.stringify(content));
        formData.append('quote', quote); // Incluimos la cita en los datos enviados

        try {
            const response = await submitTopic(formData); // Usamos la función de api.js
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
                        onChange={(e) => {
                            setContentType(e.target.value);
                            if (e.target.value === 'paragraph') {
                                setcontentText('Párrafo');
                            } else {
                                setcontentText('Subtítulo');
                            }
                        }}
                    >
                        <option value="paragraph">Párrafo</option>
                        <option value="subtitle">Subtítulo</option>
                    </select>
                </div>

                {/* Botón para agregar contenido */}
                <button type="button" className="add-button" onClick={handleAddContent}>
                    Agregar {contentText}
                </button>

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
                                                        {block.type === 'subtitle' ? (
                                                            <input
                                                                type="text"
                                                                value={block.content}
                                                                onChange={(e) => handleContentChangeWrapper(index, e.target.value)}
                                                                className="content-input"
                                                                placeholder="Ingresar subtítulo"
                                                            />
                                                        ) : (
                                                            <textarea
                                                                value={block.content}
                                                                onChange={(e) => handleContentChangeWrapper(index, e.target.value)}
                                                                className="content-textarea"
                                                                placeholder="Ingresar contenido del párrafo"
                                                            />
                                                        )}

                                                        {showTopicSelectorAt === index && (
                                                            <div className="form-group">
                                                                <label className="form-label">Seleccionar tema para insertar:</label>
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
                                                                <button
                                                                    type="button"
                                                                    className="add-button"
                                                                    onClick={() => handleInsertTopic(index)}
                                                                >
                                                                    Insertar tema
                                                                </button>
                                                            </div>
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

            {showPreview && (
                <ViewTopic
                    title={title}
                    quote={quote}
                    image={image}
                    content={content}
                    renderContent={renderContent}
                />
            )}

        </div>
    );
};

export default AddTopicModal;
