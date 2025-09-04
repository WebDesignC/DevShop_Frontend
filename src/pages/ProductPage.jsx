import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Separator } from '../components/shared/Separator';
import { ProductDescription } from '../components/one-product/ProductDescription';
import { GridImages } from '../components/one-product/GridImages';
import { CiDeliveryTruck } from 'react-icons/ci';
import { BsChatLeftText } from 'react-icons/bs';
import { LuMinus, LuPlus } from 'react-icons/lu';
import '../styles/ProductPage.css';
import { useProduct } from '../hooks/products/useProduct';
import { useCart } from '../contexts/useCart';
import { PopupMessage } from '../components/shared/PopupMessage';

export const ProductPage = () => {
  const { id } = useParams();
  const { data: product, isLoading, isError, error } = useProduct(id);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (product) {
      console.log("Product data:", product);
    }
  }, [product]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando producto...</p>
      </div>
    );
  }

  if (isError) {
    console.error("Error details:", error);
    return (
      <div className="error-container">
        <p>Error al cargar el producto: {error.message}</p>
        <p>ID del producto: {id}</p>
        <button
          className="cta-button"
          onClick={() => window.location.reload()}
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!product || !product._id) {
    return (
      <div className="error-container">
        <p>Producto no encontrado o datos incompletos</p>
        <p>ID solicitado: {id}</p>
      </div>
    );
  }

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addItem({
      id: product._id, 
      name: product.nombre, 
      price: product.precio, 
      image: product.imagen, 
      category: product.categoria?.nombre, 
      description: product.descripcion 
    });
    
    setShowMessage(true);
  };

  return (
    <div className="product-page">
      <div className="product-container">
        <GridImages images={[product.imagen]} /> 
        
        <div className="product-details">
          <h1 className="product-title">{product.nombre}</h1> 

          <div className="price-container">
            <span className="product-price">${product.precio.toFixed(2)}</span> 
          </div>

          <Separator />

          <ul className="features-list">
            <li className="feature-item">Alta calidad garantizada</li>
            <li className="feature-item">Envío rápido disponible</li>
            <li className="feature-item">Devoluciones gratuitas</li>
          </ul>

          <div className="quantity-selector">
            <p className="quantity-label">Cantidad:</p>
            <div className="quantity-controls">
              <button
                className="quantity-btn"
                onClick={handleDecrease}
                disabled={quantity <= 1}
              >
                <LuMinus size={15} />
              </button>
              <span className="quantity-value">{quantity}</span>
              <button
                className="quantity-btn"
                onClick={handleIncrease}
              >
                <LuPlus size={15} />
              </button>
            </div>
          </div>

          <div className="action-buttons">
            <button className="buy-now-btn" onClick={handleAddToCart}>
              Agregar al carrito
            </button>
          </div>

          <div className="product-info">
            <div className="info-item">
              <CiDeliveryTruck size={35} />
              <p className="info-text">Envío gratis</p>
            </div>
            <div className="info-item">
              <BsChatLeftText size={30} />
              <div className="info-text">
                <span className="info-bold">¿Necesitas ayuda?</span>
                <span>Contáctanos aquí</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductDescription content={product.descripcion} />

      {showMessage && (
        <PopupMessage
          mensaje={"Producto agregado al carrito"}
          tipo={"exito"}
          duracion={3000}
          onCerrar={() => setShowMessage(false)}
        />
      )}
    </div>
  );
};