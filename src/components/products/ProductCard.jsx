import React, { useState, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom';
import '../../styles/ProductCard.css';
import { FaPlus } from 'react-icons/fa';
import { useCart } from '../../hooks/products/useCart';

export const ProductCard = React.memo(({ 
  id, 
  name, 
  price, 
  img, 
  category, 
  description 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();
  
  // Memoizar la descripción procesada
  const truncatedDescription = useMemo(() => {
    const maxLength = 60;
    if (!description || description.length <= maxLength) return description;
    return description.substring(0, maxLength) + '...';
  }, [description]);

  // Memoizar la función para agregar al carrito
  const handleAddToCart = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      id,
      name,
      price,
      img,
      category,
      description,
      image: img 
    });
    
    // Mejor usar una notificación toast en lugar de alert
    alert('Producto agregado al carrito');
  }, [id, name, price, img, category, description, addItem]);

  // Memoizar el manejo de eventos hover
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  // Validación de props requeridas - DESPUÉS de todos los hooks
  if (!id) {
    console.error("Product ID is missing for product:", name);
    return null;
  }
  
  return (
    <div 
      className="card-product"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/productos/${id}`} className="card-link">
        <div className="card-product-image">
          <img 
            src={img} 
            alt={name} 
            loading="lazy"
          />
          {category && (
            <span className="product-category">
              {category}
            </span>
          )}
        </div>
      </Link>
      
      <div className="card-product-info">
        <Link to={`/productos/${id}`} className="card-link">
          <h3 className="card-product-name">{name}</h3>
          {truncatedDescription && (
            <p className="card-product-description">
              {truncatedDescription}
            </p>
          )}
        </Link>
        
        <div className="card-product-footer">
          <p className="card-product-price">
            ${typeof price === 'number' ? price.toFixed(2) : '0.00'}
          </p>
          <button 
            className={`add-to-cart-btn ${isHovered ? 'visible' : ''}`}
            onClick={handleAddToCart}
            aria-label={`Agregar ${name} al carrito`}
          >
            <FaPlus size={16} />
          </button>
        </div>
      </div>
    </div>
  )
});

ProductCard.displayName = 'ProductCard';