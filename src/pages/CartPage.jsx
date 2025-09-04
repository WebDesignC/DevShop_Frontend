import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Separator } from '../components/shared/Separator';
import '../styles/CartPage.css';
import { HiOutlineTrash, HiOutlineArrowLeft } from 'react-icons/hi';
import { useCart } from '../contexts/useCart'; 

export const CartPage = () => {
  const { cartItems, updateQuantity, removeItem, isLoading } = useCart();
  const [localCart, setLocalCart] = useState([]);

  useEffect(() => {
    setLocalCart(cartItems);
  }, [cartItems]);

  const handleQuantityChange = (id, newQuantity) => {
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id) => {
    removeItem(id);
  };

  const calculateTotal = () => {
    return localCart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (isLoading) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando carrito...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="cart-page">
        <div className="cart-header">
          <h1 className="page-title">Carrito de Compras</h1>
          <Link to="/productos" className="continue-shopping">
            <HiOutlineArrowLeft size={20} />
            <span>Seguir comprando</span>
          </Link>
        </div>

        <Separator />

        {localCart.length === 0 ? (
          <div className="empty-cart">
            <h2>Tu carrito está vacío</h2>
            <p>Agrega algunos productos para comenzar</p>
            <Link to="/productos" className="cta-button">
              Ver productos
            </Link>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {localCart.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  
                  <div className="item-details">
                    <h3 className="item-name">{item.name || item.title}</h3>
                    <p className="item-price">${item.price.toFixed(2)}</p>
                    
                    <div className="quantity-controls">
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="quantity-btn"
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="quantity-btn"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className="item-total">
                    <p className="total-price">${(item.price * item.quantity).toFixed(2)}</p>
                    <button 
                      onClick={() => handleRemoveItem(item.id)}
                      className="remove-btn"
                      aria-label="Eliminar producto"
                    >
                      <HiOutlineTrash size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-card">
                <h3>Resumen de compra</h3>
                
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                
                <div className="summary-row">
                  <span>Envío</span>
                  <span>Gratis</span>
                </div>
                
                <Separator />
                
                <div className="summary-row total">
                  <span>Total</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                
                <Link to='/payment'>
                <button className="checkout-btn">
                  Proceder al pago
                </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};