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
import TodasConvocatorias from './pages/TodasConvocatorias';
import TopicDetail from './pages/TopicDetail';
import Who from './pages/Who';
import LoginAdmin from './pages/LoginAdmin';
import SessionChecker from './components/SessionChecker';

import './App.css';

const AdminLayout = () => (
  <>
    <SessionChecker />
    <AdminDashboard />
  </>
);

const App = () => {
  return (
    <Router>
      <TopBanner />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quienes-somos" element={<Who />} />
        <Route path="/nuestro-camino" element={<About />} />
        <Route path="/login-admin" element={<LoginAdmin />} />
        <Route
          path="/admin"
          element={
            <AdminLayout />
          }
        />
        <Route path="/topic/:slug" element={<TopicDetail />} />
        <Route path="/convocatorias" element={<TodasConvocatorias />} />
        <Route path="/convocatoria/:slug" element={<TopicDetail />} />
        <Route path="/en-proceso" element={<EnProceso />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
