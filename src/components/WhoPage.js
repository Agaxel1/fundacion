import React, { useState, useEffect } from 'react';
import '../CSS/WhoPage.css';

const sections = [
  { id: 'quienes', label: '¿Quiénes somos?' },
  { id: 'proposito', label: 'Nuestro propósito' },
  { id: 'patrono', label: 'Nuestro patrono' },
  { id: 'lema', label: 'Nuestro lema' },
  //{ id: 'donde', label: 'Dónde lo hacemos' }
];

const teamSections = [
  { id: 'junta', label: 'Junta Directiva', link: '/junta-directiva' },
  { id: 'consejo', label: 'Consejo Rector', link: '/consejo-rector' },
  { id: 'equipo', label: 'Equipo', link: '/equipo' },
  { id: 'fundador', label: 'Fundador', link: '/fundador' }
];

const WhoPage = ({ activeSection, setActiveSection }) => {
  const [openFoundation, setOpenFoundation] = useState(false); // Mantiene la sección de Fundación cerrada por defecto
  const [openTeam, setOpenTeam] = useState(false); // Mantiene la sección de Equipo cerrada por defecto
  const [openSection, setOpenSection] = useState(null); 

  // Detecta el tamaño de la pantalla al cargar y ajustar el estado por defecto
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)'); // Pantallas más grandes (tabletas y desktop)
    const updateAccordionState = () => {
      if (mediaQuery.matches) {
        setOpenFoundation(true); // Abre la sección en pantallas grandes
        setOpenTeam(true); // Abre la sección en pantallas grandes
      } else {
        setOpenFoundation(false); // Mantiene la sección cerrada en pantallas pequeñas
        setOpenTeam(false); // Mantiene la sección cerrada en pantallas pequeñas
      }
    };

    // Inicializa el estado
    updateAccordionState();

    // Agrega un listener para cambios en el tamaño de la pantalla
    mediaQuery.addEventListener('change', updateAccordionState);

    // Limpieza del listener
    return () => mediaQuery.removeEventListener('change', updateAccordionState);
  }, []);

  const handleFoundationToggle = () => {
    setOpenFoundation(!openFoundation);
  };

  const handleTeamToggle = () => {
    setOpenTeam(!openTeam);
  };

  const handleSectionToggle = (id) => {
    setOpenSection(openSection === id ? null : id); // Alterna entre abrir y cerrar la subsección
    setActiveSection(id); // Cambia la sección activa para el scroll
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); // Desplazamiento suave al contenido
  };

  return (
    <div className="who-p">
      {/* Sección de Fundación Yoyo Zevallos */}
      <div className="accordion">
        <button className="accordion-button" onClick={handleFoundationToggle}>
          Sobre Fundación Yoyo Zevallos
          <span className={`arrow ${openFoundation ? 'rotate' : ''}`}>▶</span>
        </button>
        {openFoundation && (
          <ul className="accordion-content">
            {sections.map(({ id, label }) => (
              <li key={id}>
                <button
                  className={`accordion ${openSection === id ? 'active' : ''}`}
                  onClick={() => handleSectionToggle(id)}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Sección de Equipo */}
      <div className="accordion">
        <button className="accordion-button" onClick={handleTeamToggle}>
          Nuestro equipo
          <span className={`arrow ${openTeam ? 'rotate' : ''}`}>▶</span>
        </button>
        {openTeam && (
          <ul className="accordion-content">
            {teamSections.map(({ id, label, link }) => (
              <li key={id}>
                <a href={link}>
                  <button className="accordion">
                    {label}
                  </button>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Sección de Contáctenos (sin acordeón) */}
      <div className="accordion">
        <a href="/contact">
          <button className="accordion-button">
            Contáctenos
          </button>
        </a>
      </div>
    </div>
  );
};

export default WhoPage;
