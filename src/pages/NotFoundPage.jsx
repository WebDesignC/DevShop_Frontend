import React from "react";
import "../styles/NotFound.css";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="notfound-container">
        <h1 className="notfound-code">404</h1>
        <h2 className="notfound-title">Página no encontrada</h2>
        <p className="notfound-text">
            Lo sentimos, la página que buscas no existe o fue movida.
        </p>
        <Link to="/" className="notfound-btn">
            Volver al inicio
        </Link>
        </div>
    );
};

export default NotFoundPage;
