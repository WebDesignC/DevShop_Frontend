import React, { useState, useEffect } from 'react';
import { ProductCard } from '../components/products/ProductCard';
import { ContainerFilter } from '../components/products/ContainerFilter';
import { Pagination } from '../components/shared/Pagination';
import '../styles/ProductsPage.css';
import '../styles/PageLayout.css';
import { useProducts } from '../hooks/products/useProducts';

export const ProductsPage = () => {
    const { data: products, isLoading, error } = useProducts();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12; //(3 columnas × 4 filas)

    useEffect(() => {
        if (products) {
            if (selectedCategories.length === 0) {
                setFilteredProducts(products);
            } else {
                setFilteredProducts(products.filter(product => 
                    selectedCategories.includes(product.category)
                ));
            }
            setCurrentPage(1);
        }
    }, [selectedCategories, products]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const handleCategoryChange = (categories) => {
        setSelectedCategories(categories);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (error) {
        return (
            <div className='products-page'>
                <h1 className='page-title'>Productos</h1>
                <div className='error-message'>
                    <p>{error.message}</p>
                    <button 
                        className='retry-button'
                        onClick={() => window.location.reload()}
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='page-container'>
            <h1 className='page-title'>Productos</h1>

            <div className='products-grid'>
                <ContainerFilter onCategoryChange={handleCategoryChange} />
                
                <div className='products-container'>
                    {isLoading ? (
                        <div className='loading-products'>
                            <div className='loading-spinner'></div>
                            <p>Cargando productos...</p>
                        </div>
                    ) : (
                        <>
                            {filteredProducts.length === 0 ? (
                                <div className='error-message'>
                                    <p>No se encontraron productos en las categorías seleccionadas.</p>
                                </div>
                            ) : (
                                <>
                                    <div className='products-list'>
                                        {currentProducts.map(product => (
                                            <ProductCard
                                                key={product.id}
                                                id={product.id}
                                                name={product.title}
                                                price={product.price}
                                                img={product.image}
                                                category={product.category}
                                                description={product.description}
                                            />
                                        ))}
                                    </div>
                                    
                                    {totalPages > 1 && (
                                        <Pagination
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            onPageChange={handlePageChange}
                                        />
                                    )}
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
export default ProductsPage