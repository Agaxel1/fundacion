import '../CSS/Convocatorias.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { BASE_URLs, getTopics } from '../services/api';
import { isConvocatoriaOpen } from '../utils/dateUtils';
import { createSlug } from '../components/Topics';




const ConvocatoriaCard = ({ title, image, type, startDate, endDate, slug }) => {
    const isOpen = isConvocatoriaOpen(startDate, endDate);

    return (
        <Link to={`/convocatoria/${slug}`} className="convocatoria-card">
            <img className="card-img" src={image} alt={title} />
            <div className="card-body">
                {type && (
                    <div>
                        <span className="card-label">{type}</span>
                    </div>
                )}
                <p className="card-status">
                    {isOpen ? 'Convocatoria Abierta' : 'Convocatoria Cerrada'}
                </p>
                <h3 className="card-title">{title}</h3>
            </div>
        </Link>

    );
};



const Convocatorias = () => {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        const fetchConvocatorias = async () => {
            try {
                const data = await getTopics();
                setTopics(data);
            } catch (err) {
                console.error('Error al obtener temas:', err);
            }
        };
        fetchConvocatorias();
    }, []);

    const settings = {
        infinite: true,
        speed: 600,
        slidesToShow: 3,
        autoplay: true,
        autoplaySpeed: 8000,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 2 }
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 1 }
            }
        ]
    };

    return (
        <section className="convocatorias-container">
            <h2 className="title">Convocatorias</h2>
            <Slider {...settings}>
                {topics
                    .filter((topic) => topic.type === 'convocatoria')
                    .map((topic) => (
                        <ConvocatoriaCard
                            key={topic._id}
                            title={topic.title}
                            image={`${BASE_URLs}/uploads/${topic.imageUrl}`}
                            type={topic.type}
                            endDate={topic.endDate}
                            startDate={topic.startDate}
                            slug={createSlug(topic.title)}
                        />
                    ))}
            </Slider>
            <Link to="/convocatorias" className="ver-mas-button">Ver más</Link>
        </section>
    );
};

export default Convocatorias;
