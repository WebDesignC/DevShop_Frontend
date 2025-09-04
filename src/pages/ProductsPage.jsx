import React, { useState, useMemo, useEffect } from 'react';
import { ProductCard } from '../components/products/ProductCard';
import { ContainerFilter } from '../components/products/ContainerFilter';
import { Pagination } from '../components/shared/Pagination';
import '../styles/ProductsPage.css';
import '../styles/PageLayout.css';
import { useProducts } from '../hooks/products/useProducts';

export const ProductsPage = () => {
    const { data: productsData, isLoading, error } = useProducts();
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    const products = useMemo(() => {
        return Array.isArray(productsData) ? productsData : [];
    }, [productsData]);

    const filteredProducts = useMemo(() => {
        if (selectedCategories.length === 0) {
            return products;
        }
        return products.filter(product => 
            selectedCategories.includes(product.categoria?._id)
        );
    }, [products, selectedCategories]);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategories]);

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