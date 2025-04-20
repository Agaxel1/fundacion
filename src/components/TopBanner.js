// src/components/TopBanner.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLinks } from '../services/api'; // Importamos la función para obtener los enlaces
import '../CSS/TopBanner.css';

const TopBanner = () => {
  const [links, setLinks] = useState([]); // Estado para almacenar los enlaces

  // Llamada a la API para obtener los enlaces cuando el componente se monta
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const linksData = await getLinks(); // Obtenemos los enlaces de la API
        setLinks(linksData); // Guardamos los enlaces en el estado
      } catch (error) {
        console.error("Error al obtener los enlaces:", error);
      }
    };

    fetchLinks();
  }, []); // Este efecto se ejecuta solo una vez cuando el componente se monta

  return (
    <div className="top-banner">
      <div className="top-banner-buttons">
        {links.length > 0 ? (
          links.map((link, index) => (
            link.link ? (
              <a key={index} href={link.link} target="_blank" rel="noopener noreferrer">
                <button className="btn-link">{link.tema}</button>
              </a>
            ) : (
              <Link key={index} to="/en-proceso">
                <button className="btn-link">{link.tema}</button>
              </Link>
            )
          ))
        ) : (
          <p>Cargando enlaces...</p>
        )}
      </div>
    </div>
  );
};

export default TopBanner;
