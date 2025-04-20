import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/TopicSection.css';
import { BASE_URLs, getTopics } from '../services/api';

const TopicSection = () => {
  const [topics, setTopics] = useState([]);


  useEffect(() => {
    // Fetch topics from the backend
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

  // Función para crear el slug
  const createSlug = (title) => {
    return title.toLowerCase()
      .replace(/ /g, '-')      // Reemplaza los espacios por guiones
      .replace(/[^\w-]+/g, ''); // Elimina cualquier caracter no alfanumérico
  };

  return (
    <div className="topics-section">
      <h2>Últimos temas</h2>
      <div className="topic-grid">
        {topics.map((topic) => (
          <Link to={`/topic/${createSlug(topic.title)}`} style={{ textDecoration: 'none' }} key={topic._id}>
            <div className="topic-card">
              <img
                src={`${BASE_URLs}/uploads/${topic.imageUrl}`}
                alt={topic.title}
                className="topic-image"
              />
              <h3 className="topic-title">{topic.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopicSection;
