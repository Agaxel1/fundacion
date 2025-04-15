import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/TopicSection.css';
import axios from 'axios';

const TopicSection = () => {
  const [topics, setTopics] = useState([]);

  const BASE_URL = 'http://localhost:5000'; // Cambia a tu URL de producción cuando sea necesario

  useEffect(() => {
    // Fetch topics from the backend
    const fetchTopics = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/topics`);
        setTopics(response.data.slice(0, 3)); // Solo obtener los últimos 3 temas
      } catch (error) {
        console.error('Error fetching topics:', error);
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
                src={`${BASE_URL}/uploads/${topic.imageUrl}`}
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
