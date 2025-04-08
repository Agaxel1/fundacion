import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBanner from './components/TopBanner';
import Header from './components/Header';
import Footer from './components/Footer';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Home from './pages/Home';
import About from './pages/About';
import './App.css';

const App = () => {
  return (
    <Router>
      <TopBanner />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
