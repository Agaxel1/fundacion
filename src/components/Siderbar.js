import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <p>SOBRE LA FUNDACIÓN GABO</p>
        <a href="/who#quienes">Quiénes somos</a>
        <a href="/who#proposito">Nuestro propósito</a>
        <a href="/who#hacemos">Qué hacemos</a>
        <a href="/who#diferencia">Qué nos diferencia</a>
        <a href="/who#donde">Dónde lo hacemos</a>
      </div>
      <div className="sidebar-section">
        <p>NUESTRO EQUIPO</p>
        <Link to="/junta">Junta directiva</Link>
        <Link to="/consejo">Consejo rector</Link>
        <Link to="/equipo">Equipo</Link>
        <Link to="/fundador">Fundador</Link>
      </div>
      <div className="sidebar-section">
        <Link to="/contacto">CONTÁCTENOS</Link>
      </div>
    </div>
  );
};

export default Sidebar;
