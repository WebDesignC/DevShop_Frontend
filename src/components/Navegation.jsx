// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navegation.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <img 
            src="https://i.postimg.cc/44KR9BZZ/merckart.png" 
            alt="MercArt Logo" 
          />
          MercArt
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Inicio</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">Nosotros</Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;