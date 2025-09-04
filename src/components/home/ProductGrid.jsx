import React, { useRef, useState, useEffect } from 'react'
import { ProductCard } from '../products/ProductCard'
import '../../styles/ProductGrid.css'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

export const ProductGrid = ({ title, products }) => {
    const scrollContainer = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);

    useEffect(() => {
        const checkScroll = () => {
            if (scrollContainer.current) {
                const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.current;
                setShowLeftArrow(scrollLeft > 0);
                setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
            }
        };

        const container = scrollContainer.current;
        if (container) {
            container.addEventListener('scroll', checkScroll);
            window.addEventListener('resize', checkScroll);
            setTimeout(checkScroll, 100);
        }
        
        return () => {
            if (container) {
                container.removeEventListener('scroll', checkScroll);
            }
            window.removeEventListener('resize', checkScroll);
        };
    }, [products]);

    const scroll = (direction) => {
        if (scrollContainer.current) {
            const scrollAmount = 400;
            scrollContainer.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className='product-grid'>
            <h2 className='product-grid-title'>
                {title}
            </h2>

            <div className='product-grid-wrapper'>
                {showLeftArrow && (
                    <button 
                        className='scroll-btn scroll-left'
                        onClick={() => scroll('left')}
                        aria-label="Desplazar izquierda"
                    >
                        <HiChevronLeft />
                    </button>
                )}
                
                <div className='product-grid-container' ref={scrollContainer}>
                    {products.map(product => (
                        <ProductCard
                            key={product._id}
                            id={product._id}
                            name={product.nombre}
                            price={product.precio}
                            img={product.imagen}
                            category={product.categoria?.nombre}
                            description={product.descripcion}
                        />
                    ))}
                </div>

                {showRightArrow && (
                    <button 
                        className='scroll-btn scroll-right'
                        onClick={() => scroll('right')}
                        aria-label="Desplazar derecha"
                    >
                        <HiChevronRight />
                    </button>
                )}
            </div>
        </div>
    )
}