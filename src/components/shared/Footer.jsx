import '../../styles/Footer.css'; 
import { FaInstagram, FaFacebook, FaTiktok  } from "react-icons/fa";
import { Link } from 'react-router-dom';
const imgURL = 'https://i.postimg.cc/44KR9BZZ/merckart.png';


export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section-logo logo-section">
          <img className="logo" src={imgURL} alt="Mercart Logo" />
          <div className='social-icons'>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram/></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook/></a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>AYUDA</h4>
          <ul>
            <Link to='/help-center'><li>Centro de ayuda</li></Link>
            <Link to ='/faq'><li>Preguntas frecuentes</li></Link>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>CONTACTO</h4>
          <ul>
            <li><a href="https://wa.me/123456789" target="_blank" rel="noopener noreferrer">Chatbot</a></li>
            <li><a href="mailto:info@mercart.com">Email</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>MI CUENTA</h4>
          <ul>
            <Link to='/login'><li>Iniciar sesión</li></Link>
            <Link to='/cart'><li>Carrito de compras</li></Link>
            <Link to='/notfound'><li>Favoritos</li></Link>
            <Link to='/productos'><li>Productos</li></Link>
          </ul>
        </div>
      </div>
      
      <div className="footer-divider"></div>
      
      <div className="footer-bottom">
        <p>2025 Todos los derechos reservados</p>
        <div className="footer-links">
          <Link to = '/privacy'><span>Política de Privacidad</span></Link>
          <Link to = "/nosotros"><span>Acerca de nosotros</span></Link>
        </div>
      </div>
    </footer>
  );
};