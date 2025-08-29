import { Link, NavLink } from 'react-router-dom';
import { navbarLinks } from '../../constants/links';
import { HiOutlineSearch, HiOutlineShoppingBag } from 'react-icons/hi';
import { FaUser } from "react-icons/fa";
import '../../styles/Navbar.css';

export const Navbar = () => {
    return (
        <header className="navbar-header">
            <Link to="/" className="navbar-logo">MERCART</Link>

            <nav className="navbar-nav">
                {
                    navbarLinks.map(link => (
                        <NavLink
                            key={link.id}
                            to={link.href}
                            className={({ isActive }) =>
                                `nav-link ${isActive ? 'nav-link-active' : ''}`
                            }
                        >
                            {link.title}
                        </NavLink>
                    ))
                }
            </nav>

            <div className="navbar-actions">
                <Link
                    to="/search" 
                    className="icon-btn" 
                    aria-label="Buscar">
                    <HiOutlineSearch size={25} />
                </Link>

                <Link
                    to="/cart"
                    className="icon-btn cart-btn"
                    aria-label="Carrito de compras"
                >
                    <HiOutlineShoppingBag size={25} />
                    <span className="cart-badge">2</span>
                </Link>


                <Link
                    to="/login"
                    className="icon-btn"
                    aria-label="Mi cuenta"
                >
                    <FaUser size={25}/>
                </Link>

            </div>

        </header>
    );
};