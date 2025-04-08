// src/components/EventsSection.js
import React from 'react';
import '../CSS/EventsSection.css';

const events = [
  {
    id: 1,
    title: '“Todo se sabe: el cuento de la creación de Gabo”',
    description:
      'Exposición temporal Biblioteca Nacional de Colombia, 23 de abril - 2 de agosto 2025.',
    image: 'https://via.placeholder.com/300x200/FF6347/FFFFFF?text=Evento+1', // Imagen de ejemplo
    link: '/evento-1', // Ajusta a la ruta de cada evento
  },
  {
    id: 2,
    title: 'Taller de libros periodísticos 2025',
    description: 'Taller con Martín Caparrós.',
    image: 'https://via.placeholder.com/300x200/FFD700/FFFFFF?text=Evento+2', // Imagen de ejemplo
    link: '/evento-2', // Ajusta a la ruta de cada evento
  },
  {
    id: 3,
    title: 'Festival Gabo 2025',
    description:
      'Festival Gabo 2025: una invitación a vernos de cerca del 25 al 27 de julio en Bogotá.',
    image: 'https://via.placeholder.com/300x200/32CD32/FFFFFF?text=Evento+3', // Imagen de ejemplo
    link: '/evento-3', // Ajusta a la ruta de cada evento
  },
];

const EventsSection = () => {
  return (
    <div className="events-section">
      <h2 className="section-title">Eventos y Talleres</h2>
      <div className="events-container">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <img src={event.image} alt={event.title} />
            <div className="event-info">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <a href={event.link} className="btn-more-info">
                Más información
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsSection;
