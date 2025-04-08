// src/pages/Home.js
import React from 'react';
import Carousel from '../components/Carousel'; // El carrusel que ya creaste
import EventsSection from '../components/EventsSection'; // Importa el nuevo componente de eventos
import '../CSS/Home.css';

const Home = () => {
  return (
    <div className="home">
      <Carousel />
      <EventsSection />
    </div>
  );
}

export default Home;
