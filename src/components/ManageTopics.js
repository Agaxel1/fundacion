import React, { useEffect, useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { insertTopicInParagraph, renderContent, handleContentChange, getNewContent } from '../components/Topics';
import { BASE_URLs, getTopics, deleteTopic, updateTopic, getLinks, updateLink } from '../services/api';
import ViewTopic from '../components/ViewTopic';
import Opcion from '../utils/Opcion';
import ReAfirmacion from '../components/ReAfirmacion'; // Importamos el componente de confirmación

const ManageTopics = ({ contentTipo }) => {
    const [topics, setTopics] = useState([]);
    const [editingTopic, setEditingTopic] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [editedQuote, setEditedQuote] = useState('');
    const [editedContent, setEditedContent] = useState([]);
    const [showPreview, setShowPreview] = useState(false);
    const [editedImage, setEditedImage] = useState(null);
    const [selectedTopic, setSelectedTopic] = useState('');
    const [editedTipo, setEditedTipo] = useState('');
    const [editedTipoLink, setEditedTipoLink] = useState('');
    const [editedTemaLink, setEditedTemaLink] = useState('');
    const [contentType, setContentType] = useState('paragraph');
    const [contentText, setcontentText] = useState('Párrafo');
    const [showTopicSelectorAt, setShowTopicSelectorAt] = useState(null);
    const [, setInsertingTopicAtIndex] = useState(null);

    // Nuevos campos de convocatoria
    const [editedStatus, setEditedStatus] = useState(true); // Estado de la convocatoria
    const [editedStartDate, setEditedStartDate] = useState('');
    const [editedEndDate, setEditedEndDate] = useState('');
    const [editedCosto, setEditedCosto] = useState('');
    const [editedCupos, setEditedCupos] = useState('');
    const [editedFechaSeleccionados, setEditedFechaSeleccionados] = useState('');
    const [editedPais, setEditedPais] = useState('');

    // Nueva variable para manejar la visibilidad de la pantalla de confirmación
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [topicToDelete, setTopicToDelete] = useState(null);

    useEffect(() => {
        fetchData();
        setEditingTopic(null);
    }, [contentTipo]);

    const fetchData = async () => {
        try {
            let data;

            if (contentTipo === 'link') {
                data = await getLinks(); // obtenemos los links
            } else {
                data = await getTopics(); // obtenemos los demás contenidos
            }

            setTopics(data);
        } catch (err) {
            console.error('Error al obtener contenidos:', err);
        }
    };

    // Función que muestra el mensaje de confirmación
    const handleDeleteConfirmation = (id) => {
        setTopicToDelete(id);
        setShowDeleteConfirm(true); // Mostrar la pantalla de confirmación
    };

    // Función para confirmar la eliminación
    const handleConfirmDelete = async () => {
        try {
            await deleteTopic(topicToDelete);
            fetchData();
            setShowDeleteConfirm(false); // Ocultar la pantalla de confirmación
        } catch (err) {
            console.error('Error al eliminar tema:', err);
            setShowDeleteConfirm(false); // Ocultar la pantalla de confirmación
        }
    };

    // Función para cancelar la eliminación
    const handleCancelDelete = () => {
        setShowDeleteConfirm(false); // Ocultar la pantalla de confirmación
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
        if (contentTipo === 'link') {
            setEditedTipoLink(topic.link || '');
            setEditedTemaLink(topic.tema || '');
        }
        setEditingTopic(topic._id);
        setEditedTitle(topic.title);
        setEditedDescription(topic.description);
        setEditedQuote(topic.quote || '');
        setEditedContent(topic.content || []);
        setEditedImage(topic.imageUrl || null); // Asignar la imagen
        setEditedTipo(topic.tipo);
        setEditedStatus(topic.status);
        setEditedStartDate(topic.startDate || '');
        setEditedEndDate(topic.endDate || '');
        setEditedCosto(topic.costo || '');
        setEditedCupos(topic.cupos || '');
        setEditedFechaSeleccionados(topic.fechaSeleccionados || '');
        setEditedPais(topic.pais || '');
    };

    const handleSave = async () => {
        try {
            if (contentTipo === 'link') {
                const data = {
                    link: editedTipoLink,
                    tema: editedTemaLink
                };
                await updateLink(editingTopic, data);
            } else {
                const formData = new FormData();
                formData.append('title', editedTitle);
                formData.append('description', editedDescription);
                formData.append('quote', editedQuote);
                formData.append('content', JSON.stringify(editedContent));
                formData.append('status', editedStatus);
                formData.append('tipo', editedTipo);
                formData.append('startDate', editedStartDate);
                formData.append('endDate', editedEndDate);
                formData.append('costo', editedCosto);
                formData.append('cupos', editedCupos);
                formData.append('fechaSeleccionados', editedFechaSeleccionados);
                formData.append('pais', editedPais);
                formData.append('type', contentTipo);
                if (editedImage) formData.append('image', editedImage);

                await updateTopic(editingTopic, formData);
            }

            setEditingTopic(null);
            fetchData(); // actualiza la lista luego de guardar
        } catch (err) {
            console.error('Error al editar contenido:', err);
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
            <h2>Listado de {<Opcion Opcion={contentTipo} />}</h2>

            {/* Mostrar la pantalla de confirmación antes de eliminar */}
            {showDeleteConfirm && (
                <ReAfirmacion
                    mensaje={'¿Estás seguro de eliminar este tema?'}
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}

            {/* Mostrar los temas o convocatorias solo si no estamos editando */}
            {editingTopic === null && (
                <div className="topic-list-container">
                    {topics.length > 0 ? (
                        topics
                            .filter((topic) => {
                                // Para links no necesitamos topic.type, para los demás sí
                                return contentTipo === 'link' || topic.type === contentTipo;
                            })
                            .map((topic) => (
                                <div key={topic._id} className="topic-item">
                                    <div className="topic-info">
                                        {contentTipo === 'link' ? (
                                            <>
                                                <h3 className="topic-title">{topic.tema}</h3>
                                                <a
                                                    href={topic.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="link-url"
                                                >
                                                    {topic.link}
                                                </a>
                                            </>
                                        ) : (
                                            <h3 className="topic-title">{topic.title}</h3>
                                        )}
                                    </div>
                                    <div className="topic-actions">
                                        <button
                                            className="topic-button edit"
                                            onClick={() => handleEdit(topic)}
                                        >
                                            <FaEdit /> <span>Editar</span>
                                        </button>
                                        <button
                                            className="topic-button remove"
                                            onClick={() => handleDeleteConfirmation(topic._id)}
                                        >
                                            <FaTrash /> <span>Eliminar</span>
                                        </button>
                                    </div>
                                </div>
                            ))
                    ) : (
                        <p className="no-topics">
                            No hay {<Opcion Opcion={contentTipo} />} disponibles.
                        </p>
                    )}
                </div>
            )}


            {/* Mostrar la sección de edición solo si se está editando un tema */}
            {editingTopic !== null && (
                <div className="editing-section">
                    {contentTipo === 'link' ? (
                        <>
                            <div className="form-group">
                                <label className="form-label">Enlace:</label>
                                <input
                                    type="url"
                                    className="form-input"
                                    value={editedTipoLink}
                                    onChange={(e) => setEditedTipoLink(e.target.value)}
                                    placeholder="https://..."
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Tema asociado:</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={editedTemaLink}
                                    onChange={(e) => setEditedTemaLink(e.target.value)}
                                    placeholder="Tema relacionado"
                                    required
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="content-type-label">Título</div>
                            <input
                                type="text"
                                value={editedTitle}
                                onChange={(e) => setEditedTitle(e.target.value)}
                                className="form-input"
                            />
                            <div className="content-type-label">Descripción</div>
                            <input
                                type="text"
                                value={editedDescription}
                                onChange={(e) => setEditedDescription(e.target.value)}
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

                            {/* Campos exclusivos para convocatoria */}
                            {contentTipo === 'convocatoria' && (
                                <>
                                    <div className="form-group">
                                        <label className="form-label">Tipo:</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={editedTipo}
                                            onChange={(e) => setEditedTipo(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Fecha de inicio:</label>
                                        <input
                                            type="date"
                                            className="form-input"
                                            value={editedStartDate}
                                            onChange={(e) => setEditedStartDate(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Fecha de finalización:</label>
                                        <input
                                            type="date"
                                            className="form-input"
                                            value={editedEndDate}
                                            onChange={(e) => setEditedEndDate(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Costo:</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={editedCosto}
                                            onChange={(e) => setEditedCosto(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Cupos:</label>
                                        <input
                                            type="number"
                                            className="form-input"
                                            value={editedCupos}
                                            onChange={(e) => setEditedCupos(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Fecha de seleccionados:</label>
                                        <input
                                            type="date"
                                            className="form-input"
                                            value={editedFechaSeleccionados}
                                            onChange={(e) => setEditedFechaSeleccionados(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">País:</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={editedPais}
                                            onChange={(e) => setEditedPais(e.target.value)}
                                        />
                                    </div>
                                </>
                            )}

                            {/* Solo mostrar contenido si no es link */}
                            <div className="form-group">
                                <label className="form-label">Seleccionar tipo de contenido:</label>
                                <select
                                    className="form-input"
                                    value={contentType}
                                    onChange={(e) => {
                                        setContentType(e.target.value);
                                        setcontentText(e.target.value === 'paragraph' ? 'Párrafo' : 'Subtítulo');
                                    }}
                                >
                                    <option value="paragraph">Párrafo</option>
                                    <option value="subtitle">Subtítulo</option>
                                </select>
                            </div>

                            {/* Editor visual */}
                            <div className="content-preview">
                                <h3>Contenido</h3>
                                <button type="button" className="add-button" onClick={handleAddContent}>
                                    Agregar {contentText}
                                </button>
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
                                                                <div className="content-type-label">
                                                                    {block.type === 'subtitle' ? 'Subtítulo' : 'Párrafo'}
                                                                </div>
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

                            {/* Vista previa solo para no-links */}
                            {showPreview && (
                                <ViewTopic
                                    title={editedTitle}
                                    description={editedDescription}
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
                        </>
                    )}

                    {/* Siempre mostrar guardar/cancelar */}
                    <button className="submit-button" onClick={handleSave}>Guardar</button>
                    <button className="cancel-button" onClick={() => setEditingTopic(null)}>Cancelar</button>
                </div>
            )}

        </div>
    );
};

export default ManageTopics;
