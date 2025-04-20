// src/components/Carousel.js
import React from 'react';
import Slider from 'react-slick'; // Importamos el componente Slider de react-slick
import '../CSS/Carousel.css';
import back1 from '../images/back1.png';
import back2 from '../images/back2.png';
import back3 from '../images/back3.png';


const Carousel = () => {
    const settings = {
        dots: true, // Habilitar los puntos debajo
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true, // Reproducción automática
        autoplaySpeed: 3000, // Intervalo entre las imágenes
    };

    return (
        <div className="carousel-container">
            <Slider {...settings}>
                <div className="carousel-item">
                    <img src={back1} alt="Imagen 1" />
                    <div className="carousel-caption">
                        <h3>Fundación Yoyos lidera estudio sobre desiertos informativos en América Latina</h3>
                        <button className="btn-explore">Explora</button>
                    </div>
                </div>
                <div className="carousel-item">
                    <img src={back2} alt="Imagen 2" />
                    <div className="carousel-caption">
                        <h3>Otro título importante relacionado con los estudios de Yoyos</h3>
                        <button className="btn-explore">Explora</button>
                    </div>
                </div>
                <div className="carousel-item">
                    <img src={back3} alt="Imagen 3" />
                    <div className="carousel-caption">
                        <h3>Un estudio interesante que está marcando tendencias en América Latina</h3>
                        <button className="btn-explore">Explora</button>
                    </div>
                </div>
            </Slider>
        </div>
    );
}

export default Carousel;
