import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import '../CSS/Carousel.css';
import { BASE_URLs, getTopics } from '../services/api';
import { createSlug } from '../components/Topics';
import { Link } from 'react-router-dom';

const Carousel = () => {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const data = await getTopics();
                setTopics(data.slice(0, 6));
            } catch (err) {
                console.error('Error al obtener temas:', err);
            }
        };

        fetchTopics();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
    };

    return (
        <div className="carousel-container">
            <Slider {...settings}>
                {topics.map((topic) => {
                    const slug = createSlug(topic.title);
                    const image = `${BASE_URLs}/uploads/${topic.imageUrl}`;

                    return (
                        <div className="carousel-item" key={topic._id}>
                            <img src={image} alt={topic.title} />
                            <div className="carousel-caption">
                                <Link to={`/${topic.type}/${slug}`} className="link-container">
                                    <h3>{topic.title}</h3>
                                </Link>
                                <div className="button-container">
                                    <Link to={`/${topic.type}/${slug}`} className="btn-explore">
                                        Explora
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
}

export default Carousel;
