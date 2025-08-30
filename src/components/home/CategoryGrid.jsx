import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/CategoryGrid.css';

export default function CategoryGrid({ categories }) {

  const categoryUrlMap = {
    "Ropa": "ropa",
    "Tecnología": "tecnologia",
    "Decoración y Hogar": "decoracion-y-hogar",
    "Deportes": "deportes"
  };

  return (
    <section className="category-grid-section">
      <h2>Nuestras Categorías</h2>
      <div className="category-grid-container">
        {categories.map((categoria, index) => (
          <div key={index} className="category-grid-item">
            <Link
              to={`/products/category/${categoryUrlMap[categoria.categoria]}`}
              className="category-grid-link"
            >
              <div className="category-grid-image">
                <img src={categoria.imagen} alt={categoria.categoria} />
                <div className="category-grid-overlay">
                  <p>{categoria.categoria}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};