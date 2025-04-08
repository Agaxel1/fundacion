import React from 'react';
import '../CSS/Footer.css';

const Footer = () => {

  return (
    <footer className="footer">
      <p>&copy; 2025 Fundación Gabo | Todos los derechos reservados.</p>
      <div className="social-media">
        <a href={process.env.REACT_APP_FACEBOOK_URL}>Facebook</a>
        <a href={process.env.REACT_APP_TWITTER_URL}>Twitter</a>
        <a href={process.env.REACT_APP_INSTAGRAM_URL}>Instagram</a>
      </div>
    </footer >
  );
}

export default Footer;
