import React, { useState } from 'react';
import '../CSS/Header.css';
import logo from '../images/logo.png';

const Header = () => {
  // Estado para manejar la visibilidad del menú
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <a href="/" className="logo-link">
        <img src={logo} alt="Fundación Gabo" className="logo" />
      </a>

      <div className="menu-icon" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      <nav className={menuOpen ? "open" : ""}>
        <ul>
          <li><a href="/">Quienes somos</a></li>
          <li><a href="/about">Sobre nosotros</a></li>
          <li><a href="/news">Noticias</a></li>
          <li><a href="/contact">Contacto</a></li>
        </ul>
      </nav>

      <div className="language-selector">
        <select>
          <option value="es">Español</option>
          <option value="en">English</option>
        </select>
      </div>
    </header>
  );
};

export default Header;
