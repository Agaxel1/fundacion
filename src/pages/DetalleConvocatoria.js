import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTopics } from '../services/api';
import { BASE_URLs } from '../services/api';
import { isConvocatoriaOpen } from '../utils/dateUtils';
import '../CSS/DetalleConvocatoria.css';

const DetalleConvocatoria = () => {
    const { id } = useParams();
    const [convocatoria, setConvocatoria] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getTopics();
            const selected = data.find((item) => item._id === id);
            setConvocatoria(selected);
        };
        fetchData();
    }, [id]);

    if (!convocatoria) return <div>Cargando...</div>;

    const isOpen = isConvocatoriaOpen(convocatoria.startDate, convocatoria.endDate);

    return (
        <div className="detalle-convocatoria">
            <h2>{convocatoria.title}</h2>
            <img src={`${BASE_URLs}/uploads/${convocatoria.imageUrl}`} alt={convocatoria.title} />
            <p><strong>Estado:</strong> {isOpen ? 'Abierta' : 'Cerrada'}</p>
            <p><strong>Descripción:</strong> {convocatoria.description}</p>
            <p><strong>Tipo:</strong> {convocatoria.type}</p>
            <p><strong>Fecha de inicio:</strong> {new Date(convocatoria.startDate).toLocaleDateString()}</p>
            <p><strong>Fecha de fin:</strong> {new Date(convocatoria.endDate).toLocaleDateString()}</p>
        </div>
    );
};

export default DetalleConvocatoria;
