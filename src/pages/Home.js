import React from 'react';
import Carousel from '../components/Carousel';
import EventsSection from '../components/EventsSection';
import TopicSection from '../components/TopicSection';
import '../CSS/Home.css';

const Home = () => {
  return (
    <div className="home">
      <Carousel />
      <EventsSection />
      <TopicSection />
    </div>
  );
};

export default Home;
