import React, { useState } from 'react';
import '../CSS/Header.css';
import logo from '../images/logo.png';

const Header = () => {
  // Estado para manejar la visibilidad del menú
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);  // Cambiar el estado al hacer clic en el ícono de menú
  };

  return (
    <header className={`header ${menuOpen ? 'expanded' : ''}`}>
      <a href="/" className="logo-link">
        <img src={logo} alt="Fundación Yoyo Zevallos" className="logo" />
      </a>

      {/* Ícono de menú hamburguesa */}
      <div className="menu-icon" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {/* Menú de navegación */}
      <nav className={`nav-menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li><a href="/quienes-somos">Quienes somos</a></li>
          <li><a href="/nuestro-camino">Nuestro camino</a></li>
          <li><a href="/news">Noticias</a></li>
          <li><a href="/contact">Contacto</a></li>
        </ul>
      </nav>

      {/* <div className="language-selector">
        <select>
          <option value="es">Español</option>
          <option value="en">English</option>
        </select>
      </div> */}
    </header>
  );
};

export default Header;
