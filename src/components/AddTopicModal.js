import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { getTopics, submitTopic, submitLink } from '../services/api';
import { insertTopicInParagraph, renderContent, handleContentChange, getNewContent } from './Topics';
import Opcion from '../utils/Opcion';
import ViewTopic from '../components/ViewTopic';

const AddTopicModal = ({ contentTipo }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tipo, setTipo] = useState('');
    const [content, setContent] = useState([]);
    const [quote, setQuote] = useState('');
    const [showPreview, setShowPreview] = useState(false);
    const [image, setImage] = useState(null);
    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState('');
    const [contentType, setContentType] = useState('paragraph');
    const [showTopicSelectorAt, setShowTopicSelectorAt] = useState(null);
    const [, setInsertingTopicAtIndex] = useState(null);

    // Solo para Convocatoria
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [costo, setCosto] = useState('');
    const [cupos, setCupos] = useState('');
    const [fechaSeleccionados, setFechaSeleccionados] = useState('');
    const [pais, setPais] = useState('');

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

    const handleRemoveContent = (index) => {
        const updatedContent = content.filter((_, i) => i !== index);
        setContent(updatedContent);
    };

    const handleAddContent = () => {
        const newContent = getNewContent(contentType);
        if (newContent) {
            setContent([...content, newContent]);
        }
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

    const handleSubmitLink = async () => {
        const formData = new FormData();
        formData.append('type', 'link');
        formData.append('link', tipo);
        formData.append('tema', title);

        try {
            const response = await submitLink(formData);// misma función del servicio
            console.log('Link agregado:', response.data);
        } catch (error) {
            console.error('Error al agregar link:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (contentTipo === 'link') {
            return handleSubmitLink(); // función separada para links
        }

        const formData = new FormData();
        formData.append('type', contentTipo);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('tipo', tipo);
        formData.append('startDate', startDate);
        formData.append('endDate', endDate);
        formData.append('image', image);
        formData.append('content', JSON.stringify(content));
        formData.append('quote', quote);
        formData.append('costo', costo);
        formData.append('cupos', cupos);
        formData.append('fechaSeleccionados', fechaSeleccionados);
        formData.append('pais', pais);

        try {
            const response = await submitTopic(formData);
            console.log('Contenido agregado:', response.data);
        } catch (error) {
            console.error('Error al agregar contenido:', error);
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

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Agregar {<Opcion Opcion={contentTipo} />}</h1>
            <form onSubmit={handleSubmit} className="form">

                {contentTipo === 'link' ? (
                    <>

                        <div className="form-group">
                            <label className="form-label">Tema asociado:</label>
                            <input
                                type="text"
                                className="form-input"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Nombre o categoría del tema"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Enlace:</label>
                            <input
                                type="url"
                                className="form-input"
                                value={tipo}
                                onChange={(e) => setTipo(e.target.value)}
                                placeholder="https://..."
                                required
                            />
                        </div>

                    </>
                ) : (
                    <>
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

                        <div className="form-group">
                            <label className="form-label">Descripción:</label>
                            <input
                                type="text"
                                className="form-input"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
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

                        {/* Solo para Convocatoria */}
                        {contentTipo === 'convocatoria' && (
                            <>
                                <div className="form-group">
                                    <label className="form-label">Tipo:</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={tipo}
                                        onChange={(e) => setTipo(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Fecha de inicio:</label>
                                    <input
                                        type="date"
                                        className="form-input"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Fecha de finalización:</label>
                                    <input
                                        type="date"
                                        className="form-input"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Costo:</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={costo}
                                        onChange={(e) => setCosto(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Cupos:</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        value={cupos}
                                        onChange={(e) => setCupos(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Fecha de seleccionados:</label>
                                    <input
                                        type="date"
                                        className="form-input"
                                        value={fechaSeleccionados}
                                        onChange={(e) => setFechaSeleccionados(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">País:</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={pais}
                                        onChange={(e) => setPais(e.target.value)}
                                    />
                                </div>
                            </>
                        )}




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
                            Agregar {contentType === 'topic' ? 'Párrafo' : 'Subtítulo'}
                        </button>
                    </>
                )}

                {/* Renderizar bloques de contenido con drag and drop */}
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="contentList">
                        {(provided) => (
                            <div
                                className="content-preview"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {content.map((block, index) => (
                                    <Draggable key={index} draggableId={String(index)} index={index}>
                                        {(provided) => (
                                            <div
                                                className="content-block"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <span className="content-label">
                                                    {block.type === 'subtitle' ? 'Subtítulo' : 'Párrafo'}
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

            {showPreview && (
                <ViewTopic
                    title={title}
                    description={description}
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