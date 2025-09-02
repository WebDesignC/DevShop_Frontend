import { Link } from 'react-router-dom';
import '../styles/Payment.css';

export const DataBreachAlertPage = () => {
    return (
        <div className="breach-alert-container">
            <div className="breach-alert-content">
                <div className="alert-icon">
                    <span className="pulse-animation">⚠️</span>
                </div>
                <h1 className="breach-alert-title">¡ALERTA DE SEGURIDAD!</h1>
                <h2 className="breach-alert-subtitle">Tu información ha sido comprometida</h2>
                
                <div className="breach-details">
                    <div className="breach-card critical">
                        <h3>⚠️ Fuiste vulnerado</h3>
                        <p>Se detectó acceso no autorizado a tus datos personales y financieros.</p>
                    </div>
                    
                    <div className="breach-card warning">
                        <h3>🔓 Se robaron tus datos</h3>
                        <p>Información sensible como RFC, CURP y datos bancarios fueron extraídos.</p>
                    </div>
                    
                    <div className="breach-card danger">
                        <h3>👤 Tu identidad fue clonada</h3>
                        <p>Los atacantes han estado utilizando tu información para actividades fraudulentas.</p>
                    </div>
                    
                    <div className="breach-card urgent">
                        <h3>📋 El SAT te investiga por fraude fiscal</h3>
                        <p>Se detectaron declaraciones falsas y movimientos irregulares a tu nombre.</p>
                    </div>
                </div>
                
                <div className="action-steps">
                    <h3>¿Qué debes hacer ahora?</h3>
                    <ol>
                        <li>Contacta inmediatamente a tu institución bancaria</li>
                        <li>Reporta el incidente a las autoridades (CNS, Policía Cibernética)</li>
                        <li>Comunícate con el SAT para aclarar tu situación fiscal</li>
                        <li>Cambia todas tus contraseñas y activa autenticación de dos factores</li>
                    </ol>
                </div>
                
                <div className="breach-alert-actions">
                    <Link
                        to="/contacto"
                        className="alert-button primary"
                    >
                        📞 Contactar a soporte urgente
                    </Link>
                    <Link
                        to="/"
                        className="alert-button secondary"
                    >
                        🏠 Volver al inicio
                    </Link>
                </div>
                
                <p className="disclaimer">
                    Esta es una simulación de alerta de seguridad. Si llegaste aquí por error, 
                    <Link to="/"> regresa a la página principal</Link>.
                </p>
            </div>
        </div>
    );
};