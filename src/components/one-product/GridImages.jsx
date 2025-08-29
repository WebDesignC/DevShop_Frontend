import React, { useState, useCallback, useMemo } from 'react';
import '../../styles/GridImages.css';

export const GridImages = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  // Función memoizada para manejar el cambio de imagen
  const handleImageSelect = useCallback((image) => {
    setSelectedImage(image);
  }, []);

  // Memoizar el cálculo de las miniaturas para evitar rerenders innecesarios
  const thumbnails = useMemo(() => 
    images.map((image, index) => (
      <div 
        key={index} 
        className={`thumbnail ${image === selectedImage ? 'active' : ''}`}
        onClick={() => handleImageSelect(image)}
        role="button"
        tabIndex={0}
        aria-label={`Ver imagen ${index + 1}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleImageSelect(image);
          }
        }}
      >
        <img 
          src={image} 
          alt={`Thumbnail ${index + 1}`} 
          loading="lazy"
        />
      </div>
    )), 
  [images, selectedImage, handleImageSelect]);

  return (
    <div className="grid-images">
      <div className="main-image">
        <img 
          src={selectedImage} 
          alt="Product" 
          loading="eager"
        />
      </div>
      <div className="thumbnails">
        {thumbnails}
      </div>
    </div>
  );
};