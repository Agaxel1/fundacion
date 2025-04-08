import React from 'react';
import '../CSS/Card.css';

const Card = ({ title, description, image }) => {
  return (
    <div className="card">
      <img src={image} alt={title} />
      <div className="card-content">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default Card;
