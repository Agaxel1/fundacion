import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Para obtener el slug desde la URL
import axios from 'axios';
import '../CSS/TopicDetail.css'; // Asegúrate de que el CSS esté bien configurado

const TopicDetail = () => {
  const { slug } = useParams(); // Obtenemos el slug desde la URL
  const [topic, setTopic] = useState(null);
  const BASE_URL = 'http://localhost:5000'; // Cambia a tu URL de producción cuando sea necesario

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        // Primero, obtenemos todos los temas y luego buscamos el que coincide con el slug
        const response = await axios.get(`${BASE_URL}/topics`);
        const foundTopic = response.data.find(topic => createSlug(topic.title) === slug);

        if (foundTopic) {
          setTopic(foundTopic);
        } else {
          console.error('Topic not found');
        }
      } catch (error) {
        console.error('Error fetching topic:', error);
      }
    };

    fetchTopic();
  }, [slug]);

  // Función para crear el slug desde el título
  const createSlug = (title) => {
    return title.toLowerCase()
      .replace(/ /g, '-')      // Reemplaza los espacios por guiones
      .replace(/[^\w-]+/g, ''); // Elimina cualquier caracter no alfanumérico
  };

  // Función para renderizar el contenido basado en su tipo (párrafo o subtítulo)
  const renderContent = (contentArray) => {
    return contentArray.map((section, index) => {
      switch (section.type) {
        case 'paragraph':
          // Usamos dangerouslySetInnerHTML para interpretar el HTML
          return <p key={index} dangerouslySetInnerHTML={{ __html: section.content }} />;
        case 'subtitle':
          return <h3 key={index}>{section.content}</h3>;
        default:
          return null; // Si el tipo no es reconocido, no se renderiza nada
      }
    });
  };

  if (!topic) return <div>Loading...</div>;

  return (
    <div className="topic-detail">
      {/* Fecha */}
      {topic.createdAt && (
        <p className="topic-detail-date">
          {new Date(topic.createdAt).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}
        </p>
      )}
      {/* Título */}
      <h1>{topic.title}</h1>
      {/* Cita (si existe) */}
      {topic.quote && (
        <blockquote className="topic-detail-quote">
          {topic.quote}
        </blockquote>
      )}

      {/* Imagen */}
      {topic.imageUrl && (
        <img
          src={`${BASE_URL}/uploads/${topic.imageUrl}`}
          alt={topic.title}
          className="topic-detail-image"
        />
      )}

      {/* Contenido */}
      <div className="topic-detail-content">
        {renderContent(topic.content)}
      </div>
    </div>
  );
};

export default TopicDetail;
