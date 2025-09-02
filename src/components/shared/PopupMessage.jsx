import React, { useEffect } from 'react';
import '../../styles/PopupMessage.css';

export const PopupMessage = ({
    mensaje,
    tipo = 'exito',
    duracion = 2500,
    onCerrar
}) => {
    useEffect(() => {
        if (duracion) {
            const timer = setTimeout(() => {
                onCerrar();
            }, duracion);

            return () => clearTimeout(timer);
        }
    }, [duracion, onCerrar]);

    return (
        <div className={`mensaje-emergente ${tipo}`}>
            <div className="mensaje-contenido">
                <span className="mensaje-texto">{mensaje}</span>
                <button
                    className="cerrar-btn"
                    onClick={onCerrar}
                    aria-label="Cerrar mensaje"
                >
                    ×
                </button>
            </div>
        </div>
    );
};