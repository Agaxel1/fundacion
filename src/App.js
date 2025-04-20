import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EnProceso from './pages/EnProceso';
import TopBanner from './components/TopBanner';
import Header from './components/Header';
import Footer from './components/Footer';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Home from './pages/Home';
import About from './pages/About';
import AdminDashboard from './pages/AdminDashboard';
import TopicDetail from './pages/TopicDetail';
import './App.css';

const App = () => {
  return (
    <Router>
      <TopBanner />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<AdminDashboard />} /> {/* Nueva ruta para administración */}
        <Route path="/topic/:slug" element={<TopicDetail />} />
        <Route path="/en-proceso" element={<EnProceso />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
