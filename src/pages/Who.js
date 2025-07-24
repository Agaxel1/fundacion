import React, { useState, useEffect } from 'react';
import '../CSS/Who.css';
import patronoImage from '../images/patrono.png';
import patronoImage2 from '../images/Quienes.jpeg';
import WhoPage from '../components/WhoPage';

const Who = () => {
  const [activeSection, setActiveSection] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Puedes ajustar el ancho según tu diseño
    };

    handleResize(); // Verifica al montar
    window.addEventListener('resize', handleResize); // Escucha cambios

    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <div className="who-page">
      {!isMobile && (
        <WhoPage activeSection={activeSection} setActiveSection={setActiveSection} />
      )}
      <div className="who-container">
        {isMobile && (
          <WhoPage activeSection={activeSection} setActiveSection={setActiveSection} />
        )}

        <section className="who-content" id="quienes">
          <div className="who-text">
            <h1 className={activeSection === 'quienes' ? 'active-title' : ''}>¿Quiénes somos?</h1>
            <p>
              Una fundación sociocultural y de ayuda mutua que busca realizar
              acciones, actividades y proyectos con grupos vulnerables y de
              atención prioritaria, a través de expresiones artísticas, pero con
              un alto componente final psicoterapéutico.
            </p>

            <h2 id="proposito" className={activeSection === 'proposito' ? 'active-title' : ''}>Objetivos:</h2>
            <ul>
              <li>
                a) Gestionar procesos de investigación social en grupos de
                atención prioritaria, su calidad de vida, situación psicosocial,
                y desarrollo dentro de sus comunidades.
              </li>
              <li>
                b) Brindar atención e intervención psicosocial con fines
                psicoterapéuticos, adecuadas a las necesidades de los grupos
                vulnerables y de atención prioritaria.
              </li>
              <li>
                c) Evaluar los resultados de las intervenciones implementadas.
              </li>
              <li>
                d) Desarrollar actividades de protección, inclusión, movilidad
                social, económica y cultural para primera infancia, juventud,
                adultos, adultos mayores y personas con discapacidad.
              </li>
            </ul>
          </div>
          <div className="who-image">
            <img src={patronoImage2} alt="Nuestro Patrono" />
          </div>
        </section>

        <section className="patrono" id="patrono">
          <div className="patrono-content">
            <div className="patrono-image">
              <img src={patronoImage} alt="Rodolfo Xavier Zevallos Mendoza" />
            </div>
            <div className="patrono-text">
              <h2 className={activeSection === 'patrono' ? 'active-title' : ''}>Nuestro Patrono</h2>
              <p>
                Rodolfo Xavier Zevallos Mendoza, conocido por todos como “Yoyó”, y
                quien ha dado nombre a nuestra organización, nace el 22 de junio de
                1961 en Portoviejo, Manabí, Ecuador. Se graduó como Naturópata,
                profesión que ejerció hasta su muerte, acaecida el 3 de diciembre de
                2012, en su ciudad natal. Su espíritu solidario, consecuente y
                empático, lo llevó a vivir bajo la frase de su autoría que ahora es
                nuestro lema: “El ser humano vino a este mundo para ser feliz”, y se
                esforzó para que todos a quienes tocó con su vida, alcanzaran ese
                estado de plenitud.
              </p>
            </div>
          </div>
        </section>

        <section className="lema" id="lema">
          <h2 className={activeSection === 'lema' ? 'active-title' : ''}>Nuestro lema:</h2>
          <blockquote>
            <p>"El ser humano vino a este mundo para ser feliz."</p>
          </blockquote>
        </section>

        {/* <section className="who-location" id="donde">
          <h2 className={activeSection === 'donde' ? 'active-title' : ''}>¿Dónde lo hacemos?</h2>
          <p>
            Nuestra fundación tiene presencia activa en comunidades de alto riesgo
            en varias provincias del Ecuador, priorizando zonas con escasa atención
            social, educativa y emocional. Trabajamos tanto en contextos urbanos
            marginales como en áreas rurales.
          </p>
        </section> */}
      </div>
    </div>
  );
};

export default Who;
