import React, { useState} from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProductCard } from '../components/products/ProductCard';
import { Pagination } from '../components/shared/Pagination';
import { useCategoryProducts } from '../hooks/products/useCategoryProducts';
import '../styles/CategoryPage.css';
import '../styles/ProductsPage.css';

export const CategoryPage = () => {
    const { categoryName } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    const categoryNameMap = {
        "ropa": "Ropa",
        "tecnologia": "Tecnología",
        "decoracion-y-hogar": "Decoración y Hogar",
        "deportes": "Deportes"
    };

    const formattedCategoryName = categoryNameMap[categoryName];

    const { data: categoryProducts, isLoading, error } = useCategoryProducts(categoryName);

    // Lógica de paginación
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = categoryProducts ? categoryProducts.slice(indexOfFirstProduct, indexOfLastProduct) : [];
    const totalPages = categoryProducts ? Math.ceil(categoryProducts.length / productsPerPage) : 0;

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="category-page-container">
            <div className="page-header">
                <h1>{formattedCategoryName}</h1>
                <p>Explora nuestra selección de {formattedCategoryName.toLowerCase()}</p>
            </div>

            {isLoading && (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Cargando productos...</p>
                </div>
            )}

            {error && (
                <div className="error-container">
                    <p>Error al cargar los productos: {error.message}</p>
                    <button
                        className="cta-button"
                        onClick={() => window.location.reload()}
                    >
                        Reintentar
                    </button>
                </div>
            )}

            {!isLoading && !error && categoryProducts && categoryProducts.length > 0 && (
                <>
                    <div className="category-products-list">
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
                    
                    {totalPages > 0 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}
                </>
            )}

            {!isLoading && !error && (!categoryProducts || categoryProducts.length === 0) && (
                <div className="no-products-message">
                    <p>Actualmente no tenemos productos disponibles en esta categoría.</p>
                    <p>Pronto agregaremos más artículos. ¡Vuelve a visitarnos!</p>
                    <Link
                        to="/productos"
                        className="cta-button"
                    >Ver Productos</Link>
                </div>
            )}
        </div>
    );
};