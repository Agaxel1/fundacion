import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/EventsSection.css';
import { BASE_URLs, getTopics } from '../services/api';
import { createSlug } from '../components/Topics';

const EventsSection = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const data = await getTopics();
        setTopics(data.slice(0, 3)); // Mostrar solo los 3 primeros temas
      } catch (err) {
        console.error('Error al obtener temas:', err);
      }
    };

    fetchTopics();
  }, []);

  return (
    <div className="events-section">
      <h2 className="section-title">Eventos y Talleres</h2>
      <div className="events-container">
        {topics.map((topic) => {
          const slug = createSlug(topic.title);
          const image = `${BASE_URLs}/uploads/${topic.imageUrl}`;

          return (
            <Link
              to={`/${topic.type}/${slug}`}
              className="event-card"
              key={topic._id}
            >
              <img src={image} alt={topic.title} />
              <div className="event-body">
                {topic.tipo && (
                  <div>
                    <span className="event-card-label">{topic.tipo}</span>
                  </div>
                )}
                <h3 className="event-title">{topic.title}</h3>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default EventsSection;
