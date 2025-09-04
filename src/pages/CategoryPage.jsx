import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { ProductCard } from '../components/products/ProductCard';
import { Pagination } from '../components/shared/Pagination';
import { useCategoryProducts } from '../hooks/products/useCategoryProducts';
import { useCategories } from '../hooks/products/useCategories';
import '../styles/CategoryPage.css';
import '../styles/ProductsPage.css';

export const CategoryPage = () => {
    const { categorySlug } = useParams();
    const location = useLocation();
    const [resolvedCategoryId, setResolvedCategoryId] = useState(location.state?.categoryId);
    const [resolvedCategoryName, setResolvedCategoryName] = useState(location.state?.categoryName);
    const { data: categories } = useCategories();
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    const generateSlug = (name) => {
        return name.toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '');
    };

    useEffect(() => {
        if (!resolvedCategoryId && categories) {
            const category = categories.find(cat => generateSlug(cat.nombre) === categorySlug);
            if (category) {
                setResolvedCategoryId(category._id);
                setResolvedCategoryName(category.nombre);
            }
        }
    }, [categorySlug, categories, resolvedCategoryId]);

    const { data: categoryProducts, isLoading, error } = useCategoryProducts(resolvedCategoryId);

    const formatCategoryName = (slug) => {
        if (!slug) return 'Categoría';
        return slug
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const formattedCategoryName = resolvedCategoryName || formatCategoryName(categorySlug);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = categoryProducts ? categoryProducts.slice(indexOfFirstProduct, indexOfLastProduct) : [];
    const totalPages = categoryProducts ? Math.ceil(categoryProducts.length / productsPerPage) : 0;

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!resolvedCategoryId && categories) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Cargando categoría...</p>
            </div>
        );
    }

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
                    
                    {totalPages > 0 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}
                </>
            )}

            {!isLoading && !error && categoryProducts && categoryProducts.length === 0 && (
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