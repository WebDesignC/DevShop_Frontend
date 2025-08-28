import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Search, ShoppingBag, User } from "lucide-react";
import "../../styles/Navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        
        <Link to="/" className="navbar-logo" aria-label="Ir al inicio">
          MERCART
        </Link>

        <nav className="navbar-menu">
          <NavLink
            to="/productos"
            className={({ isActive }) =>
              `navbar-link${isActive ? " is-active" : ""}`
            }
          >
            PRODUCTOS
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `navbar-link${isActive ? " is-active" : ""}`
            }
          >
            NOSOTROS
          </NavLink>
        </nav>

        <div className="navbar-icons">
          <Link to="/productos" aria-label="Buscar">
            <Search className="icon" />
          </Link>
          <Link to="/cart" aria-label="Carrito">
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