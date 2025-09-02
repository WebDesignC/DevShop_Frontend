import React from 'react';
import '../styles/PoliticaDePrivacidad.css';
import { 
  FaBuilding, 
  FaDatabase, 
  FaCrosshairs, 
  FaExchangeAlt, 
  FaUserCheck, 
  FaShieldAlt, 
  FaSync, 
  FaEnvelope 
} from 'react-icons/fa';

export const PoliticaDePrivacidad = () => {
  return (
    <main className="privacy-page">
      <div className="privacy-header">
        <h1 className="privacy-title">Política de Privacidad</h1>
        <p className="privacy-updated">Última actualización: 1 de septiembre de 2025</p>
      </div>

      <div className="privacy-grid">
        <section className="privacy-section">
          <h2>
            <FaBuilding className="privacy-icon" />
            Responsable del Tratamiento
          </h2>
          <p>
            Esta política aplica a MercArt, con domicilio en Torre Diana, CDMX, quien será responsable del tratamiento de tus datos personales conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.
          </p>
        </section>

        <section className="privacy-section">
          <h2>
            <FaDatabase className="privacy-icon" />
            Datos que Recabamos
          </h2>
          <ul>
            <li>Datos de identificación (nombre, correo electrónico, teléfono)</li>
            <li>Datos financieros y patrimoniales (solo si aplica)</li>
            <li>Datos de navegación y comportamiento en la plataforma</li>
            <li>Datos biométricos (si se usan para autenticación)</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>
            <FaCrosshairs className="privacy-icon" />
            Finalidades del Tratamiento
          </h2>
          <p>Utilizamos tus datos para:</p>
          <ul>
            <li>Proveer productos y servicios solicitados</li>
            <li>Gestionar pagos, facturación y soporte</li>
            <li>Mejorar la experiencia del usuario</li>
            <li>Cumplir obligaciones legales y contractuales</li>
            <li>Enviar promociones y comunicaciones comerciales (previo consentimiento)</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>
            <FaExchangeAlt className="privacy-icon" />
            Transferencia de Datos
          </h2>
          <p>
            Tus datos pueden ser compartidos con terceros nacionales o internacionales para cumplir con las finalidades descritas, siempre bajo medidas de seguridad adecuadas.
          </p>
        </section>

        <section className="privacy-section">
          <h2>
            <FaUserCheck className="privacy-icon" />
            Derechos ARCO
          </h2>
          <p>
            Puedes acceder, rectificar, cancelar u oponerte al tratamiento de tus datos personales enviando una solicitud a mercart@mcarkart.com. También puedes revocar tu consentimiento en cualquier momento.
          </p>
        </section>

        <section className="privacy-section">
          <h2>
            <FaShieldAlt className="privacy-icon" />
            Medidas de Seguridad
          </h2>
          <p>
            Implementamos medidas técnicas, administrativas y físicas para proteger tus datos contra pérdida, alteración, acceso no autorizado o divulgación indebida.
          </p>
        </section>

        <section className="privacy-section">
          <h2>
            <FaSync className="privacy-icon" />
            Modificaciones a esta Política
          </h2>
          <p>
            Nos reservamos el derecho de modificar esta política de privacidad. Cualquier cambio será publicado en esta misma sección.
          </p>
        </section>
      </div>

      <section className="privacy-contact">
        <h2>
          <FaEnvelope className="privacy-icon" />
          Contacto
        </h2>
        <p>
          Para cualquier duda o aclaración sobre esta política, contáctanos en mercart@mcarkart.com.
        </p>
      </section>
    </main>
  );
};