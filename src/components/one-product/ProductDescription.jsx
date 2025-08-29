import React, { useMemo } from 'react';
import '../../styles/ProductDescription.css';

export const ProductDescription = ({ content, title = "Descripción del Producto" }) => {

  const processedContent = useMemo(() => {
    if (!content) return null;
    
    if (typeof content === 'string') {
      const paragraphs = content.split('\n').filter(paragraph => paragraph.trim() !== '');
      
      if (paragraphs.length > 1) {
        return paragraphs.map((paragraph, index) => (
          <p key={index} className="description-paragraph">
            {paragraph}
          </p>
        ));
      }
      
      return content;
    }
    return content;
  }, [content]);

  return (
    <section className="product-description-section" aria-labelledby="product-description-title">
      <h2 id="product-description-title" className="description-title">
        {title}
      </h2>
      <div className="description-content">
        {processedContent}
      </div>
    </section>
  );
};