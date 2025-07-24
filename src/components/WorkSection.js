import React from 'react';
import '../CSS/WorkSection.css';
import Fondo from '../images/fondo.png'

const WorkSection = () => {
  return (
    <div className="work-section">
      <h2 className="work-section-title">Nuestro trabajo en Iberoamérica</h2>
      <div className="work-cards-container">
        <div className="work-card">
          <div className="icon">
            <img src={Fondo} alt="Periodismo" />
          </div>
          <h3>Periodismo</h3>
          <p>
            Impulsamos la calidad, la coherencia ética, la innovación, la relación
            estrecha con las audiencias y la cobertura de impacto sobre temas
            fundamentales para el futuro del periodismo.
          </p>
          <button className="btn-more-info">Conoce más</button>
        </div>

        <div className="work-card">
          <div className="icon">
            <img src={Fondo} alt="Educación" />
          </div>
          <h3>Educación</h3>
          <p>
            Fomentamos las capacidades narrativas en niños y jóvenes, y
            propiciamos espacios de formación, conversación y creación sobre
            prácticas comunicativas y alfabetización mediática.
          </p>
          <button className="btn-more-info">Conoce más</button>
        </div>

        <div className="work-card">
          <div className="icon">
            <img src={Fondo} alt="Cultura" />
          </div>
          <h3>Cultura</h3>
          <p>
            Generamos espacios culturales como el Festival Gabo, que conectan a la
            ciudadanía con el legado de Gabo, el periodismo y la educación.
          </p>
          <button className="btn-more-info">Conoce más</button>
        </div>
      </div>
    </div>
  );
};

export default WorkSection;
