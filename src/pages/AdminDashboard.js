import React, { useState } from 'react';
import AddTopic from '../components/AddTopicModal';
import ManageTopics from '../components/ManageTopics';
import '../CSS/AdminDashboard.css';

const AdminDashboard = () => {
  const [view, setView] = useState('manage'); // 'add' o 'manage'

  return (
    <div className="dashboard-container">
      <div className="view-toggle">
        <button
          className={`submit-button ${view === 'manage' ? 'active' : ''}`}
          onClick={() => setView('manage')}
        >
          Ver/Editar Temas
        </button>
        <button
          className={`submit-button ${view === 'add' ? 'active' : ''}`}
          onClick={() => setView('add')}
        >
          Agregar Tema
        </button>
      </div>

      {view === 'add' ? <AddTopic /> : <ManageTopics />}
    </div>
  );
};

export default AdminDashboard;
