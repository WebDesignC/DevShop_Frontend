import React from 'react';
import '../../styles/ProductDescription.css';

export const ProductDescription = ({ content }) => {

  return (
    <div className="product-description-section">
      <h2 className="description-title">Descripción del Producto</h2>
      <div className="description-content">
        {content}
      </div>
    </div>
  );
};
