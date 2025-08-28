// ProductCard.jsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import '../styles/ProductCard.css';
import { FaPlus } from 'react-icons/fa';

const addToCartLocal = (product) => {
  const existingCart = JSON.parse(localStorage.getItem('fakeStoreCart') || '[]');
  const existingItemIndex = existingCart.findIndex(item => item.id === product.id);
  
  if (existingItemIndex >= 0) {
    existingCart[existingItemIndex].quantity += 1;
  } else {
    existingCart.push({
      ...product,
      quantity: 1,
      image: product.image || product.img,
      name: product.name || product.title
    });
  }
  
  localStorage.setItem('fakeStoreCart', JSON.stringify(existingCart));
  alert('Producto agregado al carrito');
};

export const ProductCard = ({ id, name, price, img, category, description }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    if (!id) {
        console.error("Product ID is missing for product:", name);
        return null;
    }
    
    const productDescription = (text, maxLength = 60) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        addToCartLocal({
            id,
            name,
            price,
            img,
            category,
            description,
            image: img 
        });
    };

    return (
        <div 
            className="card-product"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link to={`/productos/${id}`} className="card-link">
                <div className="card-product-image">
                    <img src={img} alt={name} />
                    {category && <span className="product-category">{category}</span>}
                </div>
            </Link>
            
            <div className="card-product-info">
                <Link to={`/productos/${id}`} className="card-link">
                    <h3 className="card-product-name">{name}</h3>
                    {description && (
                        <p className="card-product-description">
                            {productDescription(description)}
                        </p>
                    )}
                </Link>
                
                <div className="card-product-footer">
                    <p className="card-product-price">${price.toFixed(2)}</p>
                    {isHovered && (
                        <button className="add-to-cart-btn" onClick={handleAddToCart}>
                            <FaPlus size={16} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}