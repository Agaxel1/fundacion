import React, { useState } from 'react';
import AddTopicModal from '../components/AddTopicModal';  // Componente unificado para agregar tema o convocatoria
import ManageTopics from '../components/ManageTopics';  // Componente para gestionar temas
import '../CSS/AdminDashboard.css';
import Opcion from '../utils/Opcion';

const AdminDashboard = () => {
  const [contentTipo, setContenTipo] = useState('topic'); // 'topic' o 'convocatoria'
  const [view, setView] = useState('manage'); // 'add' o 'manage'

  // Función para manejar el cambio del tipo de contenido
  const handleContentTypeChange = (event) => {
    const selectedType = event.target.value;
    if (selectedType !== contentTipo) {
      setContenTipo(selectedType); // Cambia el tipo de contenido solo si es diferente
    }
  };

  return (
    <div className="dashboard-container">
      {/* Selector de tipo de contenido */}
      <div className="content-selector">
        <select
          value={contentTipo}
          onChange={handleContentTypeChange}
          className="form-input custom-select"
        >
          <option value="topic">Temas</option>
          <option value="convocatoria">Convocatorias</option>
          <option value="noticias">Noticias</option>
          <option value="proyecto">Proyectos</option>
          <option value="actividad">Actividades</option>
          <option value="capacitacion">Capacitaciones</option>
          <option value="link">Links</option>
        </select>
      </div>

      <br></br>

      {/* Vista de los botones para gestionar o agregar */}
      <div className="view-toggle">
        <button
          className={`submit-button ${view === 'manage' ? 'active' : ''}`}
          onClick={() => setView('manage')}
        >
          Ver/Editar {<Opcion Opcion={contentTipo} />}
        </button>
        <button
          className={`submit-button ${view === 'add' ? 'active' : ''}`}
          onClick={() => setView('add')}
        >
          Agregar {<Opcion Opcion={contentTipo} />}
        </button>
      </div>

      {/* Renderizado de los componentes dependiendo de la vista y el tipo de contenido */}
      {view === 'add' ? (
        <AddTopicModal contentTipo={contentTipo} />  // Componente unificado para agregar tema o convocatoria
      ) : (
        <ManageTopics contentTipo={contentTipo} />  // Componente para gestionar temas
      )}
    </div>
  );
};

export default AdminDashboard;
