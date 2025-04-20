// src/components/ViewTopic.js
import React from 'react';

const ViewTopic = ({ title, quote, image, content, renderContent }) => {
  return (
    <div className="topic-detail" style={{ marginTop: '40px' }}>
      {/* Fecha simulada */}
      <p className="topic-detail-date">
        {new Date().toLocaleDateString('es-ES', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })}
      </p>

      <h1>{title}</h1>

      {image && (
        <div className="topic-image-container">
          {/* Cita encima de la imagen */}
          {quote && <blockquote className="topic-detail-quote">{quote}</blockquote>}
          <img
            src={typeof image === 'string' ? image : URL.createObjectURL(image)}
            alt={title}
            className="topic-detail-image"
          />
        </div>
      )}

      <div className="topic-detail-content">
        {renderContent(content)}
      </div>
    </div>
  );
};

export default ViewTopic;
