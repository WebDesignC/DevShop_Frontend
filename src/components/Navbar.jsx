// Navbar.jsx
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Search, ShoppingBag, User } from "lucide-react";
import "../styles/Navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        
        {/* Logo -> Home */}
        <Link to="/" className="navbar-logo" aria-label="Ir al inicio">
          MERCART
        </Link>

        {/* Menú centrado (una sola línea) */}
        <nav className="navbar-menu">
          <NavLink
            to="/ropa"
            className={({ isActive }) =>
              `navbar-link${isActive ? " is-active" : ""}`
            }
          >
            ROPA
          </NavLink>

          <NavLink
            to="/tecnologia"
            className={({ isActive }) =>
              `navbar-link${isActive ? " is-active" : ""}`
            }
          >
            TECNOLOGÍA
          </NavLink>

          <NavLink
            to="/decoracion-y-hogar"
            className={({ isActive }) =>
              `navbar-link${isActive ? " is-active" : ""}`
            }
          >
            {/* NBSP para no partir el texto */}
            DECORACIÓN&nbsp;Y&nbsp;HOGAR
          </NavLink>

          <NavLink
            to="/deportes"
            className={({ isActive }) =>
              `navbar-link${isActive ? " is-active" : ""}`
            }
          >
            DEPORTES
          </NavLink>
        </nav>

        {/* Iconos a la derecha */}
        <div className="navbar-icons">
          <Link to="/buscar" aria-label="Buscar">
            <Search className="icon" />
          </Link>
          <Link to="/carrito" aria-label="Carrito">
            <ShoppingBag className="icon" />
          </Link>
          <Link to="/login" aria-label="Cuenta / Login">
            <User className="icon" />
          </Link>
        </div>
      </div>
    </header>
  );
}
