import React from "react";
import "../styles/carrousel.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Carrousel = () => {
    return (
        <div className="carrousel-container">
        <button className="carrousel-btn left-btn">
            <ChevronLeft size={18} />
        </button>

        <div className="carrousel-content">
            <span>Ofertas exclusivas para ti <i class="fa-solid fa-credit-card"></i> |</span>
            <a href="/" className="carrousel-link">¡Revisa aquí!</a>
        </div>
        
        <button className="carrousel-btn right-btn">
            <ChevronRight size={18} />
        </button>
        </div>
    );
};

export default Carrousel;