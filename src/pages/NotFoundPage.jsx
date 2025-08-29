import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

export const NotFoundPage = () =>  {
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <h1 className="not-found-error-code">404</h1>
                <h2 className="not-found-title">¡Parece que te has desviado del camino!</h2>
                <p className="not-found-description">
                    La página que buscas no está disponible o nunca existió.
                </p>
                <div className="not-found-actions">
                    <Link
                        to="/"
                        className="home-button-404"
                    >
                        Volver a la página principal
                    </Link>
                    <Link
                        to="/productos"
                        className="home-button-404 secondary"
                    >
                        Explorar productos
                    </Link>
                </div>
            </div>
        </div>
    );
};
