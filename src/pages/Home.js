import React from 'react';
import Carousel from '../components/Carousel';
import EventsSection from '../components/EventsSection';
import WorkSection from '../components/WorkSection';
import Convocatorias from '../components/Convocatorias';
import '../CSS/Home.css';

const Home = () => {
  return (
    <div className="home">
      <Carousel />
      <EventsSection />
      <WorkSection />
      <Convocatorias />
    </div>
  );
};

export default Home;
