import React from 'react';

const ReAfirmacion = ({ mensaje, onConfirm, onCancel }) => {
    return (
        <div className="overlay">
            <div className="reafirmacion-container">
                <h3 className="reafirmacion-title">{mensaje}</h3>
                <div className="reafirmacion-buttons">
                    <button className="reafirmacion-btn confirmar" onClick={onConfirm}>Sí, Eliminar</button>
                    <button className="reafirmacion-btn cancelar" onClick={onCancel}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default ReAfirmacion;
