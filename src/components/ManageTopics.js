import React, { useEffect, useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import ViewTopic from '../components/ViewTopic';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { insertTopicInParagraph, renderContent, handleContentChange, getNewContent } from '../components/Topics';
import { BASE_URLs, getTopics, deleteTopic, updateTopic } from '../services/api';
import '../CSS/AdminDashboard.css';

const ManageTopics = () => {
    const [topics, setTopics] = useState([]);
    const [editingTopic, setEditingTopic] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedQuote, setEditedQuote] = useState('');
    const [editedContent, setEditedContent] = useState([]);
    const [showPreview, setShowPreview] = useState(false);
    const [editedImage, setEditedImage] = useState(null);
    const [selectedTopic, setSelectedTopic] = useState('');
    const [contentType, setContentType] = useState('paragraph');
    const [contentText, setcontentText] = useState('Párrafo');
    const [showTopicSelectorAt, setShowTopicSelectorAt] = useState(null); // index del contenido
    const [, setInsertingTopicAtIndex] = useState(null);

    useEffect(() => {
        fetchTopics();
    }, []);

    const fetchTopics = async () => {
        try {
            const data = await getTopics();
            setTopics(data);
        } catch (err) {
            console.error('Error al obtener temas:', err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Estás seguro de eliminar este tema?')) return;
        try {
            await deleteTopic(id);
            fetchTopics();
        } catch (err) {
            console.error('Error al eliminar tema:', err);
        }
    };

    const handleContentChangeWrapper = (index, newText) => {
        const { updatedContent, newTopicSelectorAt } = handleContentChange(
            index,
            newText,
            editedContent,
            showTopicSelectorAt
        );

        setEditedContent(updatedContent);
        setShowTopicSelectorAt(newTopicSelectorAt);
    };

    const handleEdit = (topic) => {
        setEditingTopic(topic._id);
        setEditedTitle(topic.title);
        setEditedQuote(topic.quote || '');
        setEditedContent(topic.content || []);
        setEditedImage(topic.imageUrl || null); // Asignar la imagen
    };

    const handleSave = async () => {
        const formData = new FormData();
        formData.append('title', editedTitle);
        formData.append('quote', editedQuote);
        formData.append('content', JSON.stringify(editedContent));
        if (editedImage) formData.append('image', editedImage);

        try {
            await updateTopic(editingTopic, formData);
            setEditingTopic(null);
            fetchTopics();
        } catch (err) {
            console.error('Error al editar tema:', err);
        }
    };




    const handleInsertTopic = (index) => {
        const updatedContent = insertTopicInParagraph(index, selectedTopic, editedContent, topics);
        setEditedContent(updatedContent); // Manejas el estado aquí
        setSelectedTopic('');
        setShowTopicSelectorAt(null);
        setInsertingTopicAtIndex(null);
    };

    const handleAddContent = () => {
        const newContent = getNewContent(contentType);
        if (newContent) {
            setEditedContent([...editedContent, newContent]);
        }
    };

    const handleRemoveContent = (index) => {
        const updatedContent = editedContent.filter((_, i) => i !== index);
        setEditedContent(updatedContent);
    };

    const handleFileChange = (e) => {
        setEditedImage(e.target.files[0]); // Guardar la imagen seleccionada
    };

    return (
        <div className="dashboard-container">
            <h2>Listado de Temas</h2>

            {/* Mostrar los temas solo si no estamos editando */}
            {editingTopic === null && (
                <div className="topic-list-container">
                    {topics.map((topic) => (
                        <div key={topic._id} className="topic-item">
                            <div>
                                <h3 className="topic-title">{topic.title}</h3>
                            </div>
                            <div>
                                <button className="topic-button edit" onClick={() => handleEdit(topic)}>
                                    <FaEdit /> Editar
                                </button>
                                <button className="topic-button remove" onClick={() => handleDelete(topic._id)}>
                                    <FaTrash /> Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}


            {/* Mostrar la sección de edición solo si se está editando un tema */}
            {editingTopic !== null && (
                <div className="editing-section">
                    <div className="content-type-label">Título</div>
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        className="form-input"
                    />
                    <div className="content-type-label">Cita</div>
                    <input
                        type="text"
                        value={editedQuote}
                        onChange={(e) => setEditedQuote(e.target.value)}
                        className="form-input"
                        placeholder="Cita"
                    />

                    {/* Campo para cargar la imagen */}
                    <div className="form-group">
                        <label className="form-label">Imagen:</label>
                        <input
                            type="file"
                            className="form-input"
                            onChange={handleFileChange}
                        />
                    </div>

                    {/* Vista previa de la imagen */}
                    {editedImage && (
                        <div className="image-preview">
                            <h4>Vista previa de la imagen:</h4>
                            <img
                                src={editedImage instanceof File
                                    ? URL.createObjectURL(editedImage)
                                    : `${BASE_URLs}/uploads/${editedImage}`}
                                alt="Vista previa"
                                className="image-thumbnail"
                            />
                        </div>
                    )}


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


                    <div className="content-preview">
                        <h3>Contenido</h3>
                        <button type="button" className="add-button" onClick={handleAddContent}>Agregar {contentText}</button>
                        <DragDropContext>
                            <Droppable droppableId="contentList">
                                {(provided) => (
                                    <div
                                        className="content-preview"
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {editedContent.map((block, index) => (
                                            <Draggable key={index} draggableId={String(index)} index={index}>
                                                {(provided) => (
                                                    <div
                                                        className="content-block"
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        {/* Identificar el tipo de contenido */}
                                                        <div className="content-type-label">
                                                            {block.type === 'subtitle' ? 'Subtítulo' : 'Párrafo'}
                                                        </div>

                                                        {/* Renderizado condicional según el tipo de contenido */}
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
                    </div>

                    {showPreview && (
                        <ViewTopic
                            title={editedTitle}
                            quote={editedQuote}
                            image={`${BASE_URLs}/uploads/${editedImage}`}
                            content={editedContent}
                            renderContent={renderContent}
                        />
                    )}

                    <button
                        type="button"
                        className="submit-button"
                        onClick={() => setShowPreview(!showPreview)}
                    >
                        {showPreview ? 'Ocultar vista previa' : 'Previsualizar'}
                    </button>
                    <button className="submit-button" onClick={handleSave}>Guardar</button>
                    <button className="cancel-button" onClick={() => setEditingTopic(null)}>Cancelar</button>
                </div>
            )}
        </div>
    );
};

export default ManageTopics;
