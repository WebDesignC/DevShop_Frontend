import React from 'react';
import { useParams } from 'react-router-dom';
import { ProductGrid } from '../components/home/ProductGrid';
import { useCategoryProducts } from '../hooks/products/useCategoryProducts';
import '../styles/CategoryPage.css';

export const CategoryPage = () => {
    const { categoryName } = useParams();

    // Mapeo de URLs normalizadas a nombres legibles
    const categoryNameMap = {
        "ropa": "Ropa",
        "tecnologia": "Tecnología",
        "decoracion-y-hogar": "Decoración y Hogar",
        "deportes": "Deportes"
    };

    const formattedCategoryName = categoryNameMap[categoryName] ||
        categoryName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    const { data: categoryProducts, isLoading, error } = useCategoryProducts(categoryName);

    const formattedProducts = categoryProducts ? categoryProducts.map(product => ({
        id: product.id,
        name: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image,
        images: [product.image]
    })) : [];

    return (
        <div className="category-page">
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

            {!isLoading && !error && formattedProducts.length > 0 && (
                <ProductGrid
                    products={formattedProducts}
                    showTitle={false}
                />
            )}

            {!isLoading && !error && formattedProducts.length === 0 && (
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