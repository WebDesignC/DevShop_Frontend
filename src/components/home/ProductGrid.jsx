import React, { useRef, useState, useCallback, useEffect } from 'react';
import { ProductCard } from '../products/ProductCard';
import '../../styles/ProductGrid.css';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

export const ProductGrid = ({ title, products }) => {
    const scrollContainer = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);
    const scrollAmount = 400;
    const scrollThreshold = 10; 

    const checkScroll = useCallback(() => {
        if (scrollContainer.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - scrollThreshold);
        }
    }, [scrollThreshold]);

    useEffect(() => {
        const container = scrollContainer.current;
        if (!container) return;
        
        const timeoutId = setTimeout(checkScroll, 100);
        
        container.addEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);
        
        return () => {
            clearTimeout(timeoutId);
            container.removeEventListener('scroll', checkScroll);
            window.removeEventListener('resize', checkScroll);
        };
    }, [products, checkScroll]); 

    const scroll = useCallback((direction) => {
        if (scrollContainer.current) {
            scrollContainer.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    }, [scrollAmount]);


    const productCards = React.useMemo(() => 
        products.map(product => (
            <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                img={product.images[0]}
                category={product.category}
                description={product.description}
            />
        )), 
    [products]);

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
                    {productCards}
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
    );
};