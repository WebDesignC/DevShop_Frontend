import React, { useState } from 'react';
import '../../styles/GridImages.css';

export const GridImages = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="grid-images">
      <div className="main-image">
        <img src={selectedImage} alt="Product" />
      </div>
      <div className="thumbnails">
        {images.map((image, index) => (
          <div 
            key={index} 
            className={`thumbnail ${image === selectedImage ? 'active' : ''}`}
            onClick={() => setSelectedImage(image)}
          >
            <img src={image} alt={`Thumbnail ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};