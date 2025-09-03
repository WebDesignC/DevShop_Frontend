import React from 'react';
import '../../styles/Footer.css'; 
import { FaInstagram, FaFacebook, FaTiktok  } from "react-icons/fa";
import {Link} from 'react-router-dom'
const imgURL = 'https://i.postimg.cc/44KR9BZZ/merckart.png';


function Footer() {
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
            <li>
               <Link to='/help-center'>Centro de ayuda </Link> 
            </li>
            <li>
                <Link to="/faq">Preguntas frecuentes</Link>
            </li>
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
            <li><Link to="/login">Iniciar sesión</Link></li>
            <li><Link to="/cart">Carrito de compras</Link></li>
            <li><Link to="/favorites">Favoritos</Link></li>
          </ul>
        </div>
        
      </div>
      
      <div className="footer-divider"></div>
      
      <div className="footer-bottom">
        <p>2025 Todos los derechos reservados</p>
        <div className="footer-links">
          <Link to="/privacy">Política de Privacidad</Link>
          <Link to="/about">Acerca de nosotros</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;