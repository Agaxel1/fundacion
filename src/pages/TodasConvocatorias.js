import React, { useEffect, useState } from 'react';
import { getTopics } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { BASE_URLs } from '../services/api';
import { createSlug } from '../components/Topics'; // Asegúrate de que esté bien exportado
import '../CSS/TodasConvocatorias.css'; // crea este archivo si no existe

const TodasConvocatorias = () => {
    const [topics, setTopics] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getTopics();
            setTopics(data);
        };
        fetchData();
    }, []);

    return (
        <div className="todas-convocatorias">
            <h2>Todas las Convocatorias</h2>
            <div className="convocatorias-grid">
                {topics
                    .filter((topic) => topic.type === 'convocatoria')
                    .map((topic) => (
                        <div
                            key={topic._id}
                            className="convocatoria-mini"
                            onClick={() => navigate(`/convocatoria/${createSlug(topic.title)}`)}
                        >
                            <img src={`${BASE_URLs}/uploads/${topic.imageUrl}`} alt={topic.title} />
                            <h3>{topic.title}</h3>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default TodasConvocatorias;
