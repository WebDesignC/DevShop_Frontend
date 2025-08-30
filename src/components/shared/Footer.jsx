import '../../styles/Footer.css'; 
import { FaInstagram, FaFacebook, FaYoutube  } from "react-icons/fa";
import { Link } from 'react-router-dom';
const imgURL = 'https://i.postimg.cc/44KR9BZZ/merckart.png';


export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section-logo logo-section">
          <img className="logo" src={imgURL} alt="Mercart Logo" />
          <div className='social-icons'>
            <i><FaInstagram/></i>
            <i><FaFacebook/></i>
            <i><FaYoutube /></i>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>AYUDA</h4>
          <ul>
            <li>Centro de ayuda</li>
            <li>Preguntas frecuentes</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>CONTACTO</h4>
          <ul>
            <li>Chatbot</li>
            <li>Email</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>MI CUENTA</h4>
          <ul>
            <Link to='#'><li>Iniciar sesión</li></Link>
            <Link to='#'><li>Carrito de compras</li></Link>
            <Link to='#'><li>Favoritos</li></Link>
            <Link to='/productos'><li>Productos</li></Link>
          </ul>
        </div>
      </div>
      
      <div className="footer-divider"></div>
      
      <div className="footer-bottom">
        <p>2025 Todos los derechos reservados</p>
        <div className="footer-links">
          <span>Política de Privacidad</span>
          <span>Acerca de nosotros</span>
        </div>
      </div>
    </footer>
  );
};

