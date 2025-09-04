import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/CategoryGrid.css';

export default function CategoryGrid({ categories }) {
  return (
    <section className="category-grid-section">
      <h2>Nuestras Categorías</h2>
      <div className="category-grid-container">
        {categories.map((category, index) => (
          <div key={category._id || index} className="category-grid-item">
            <Link
              to={`/products/category/${category.slug}`}
              state={{ 
                categoryId: category._id, 
                categoryName: category.nombre 
              }}
              className="category-grid-link"
            >
              <div className="category-grid-image">
                <img src={category.imagen} alt={category.nombre} />
                <div className="category-grid-overlay">
                  <p>{category.nombre}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};