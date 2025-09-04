import { ProductGrid } from '../components/home/ProductGrid';
import { Banner } from '../components/home/Banner';
import '../styles/HomePage.css';
import { useFeaturedProducts } from '../hooks/products/useFeaturedProducts';
import { useCategories } from '../hooks/products/useCategories';
import { Link } from 'react-router-dom';
import CategoryGrid from '../components/home/CategoryGrid';
import { useState, useEffect } from 'react';

export const HomePage = () => {
  const { data: featuredProducts, isLoading, error } = useFeaturedProducts();
  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useCategories();
  const [formattedCategories, setFormattedCategories] = useState([]);

  const generateSlug = (name) => {
    return name.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '') 
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');
  };

  useEffect(() => {
    if (categories) {
      const formatted = categories.map(category => ({
        _id: category._id,
        nombre: category.nombre,
        slug: generateSlug(category.nombre),
        imagen: getCategoryImage(category.nombre)
      }));
      setFormattedCategories(formatted);
    }
  }, [categories]);

  function getCategoryImage(categoryName) {
    const imageMap = {
      "Ropa y Accesorios": "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "Tecnología": "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "Decoración y Hogar": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "Deportes": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    };

    return imageMap[categoryName] || "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
  }

  const formattedProducts = featuredProducts ? featuredProducts.map(product => ({
    _id: product._id,
    nombre: product.nombre,
    precio: product.precio,
    descripcion: product.descripcion,
    categoria: product.categoria,
    imagen: product.imagen
  })) : [];
  
  return (
    <>
      <Banner />
      <div className='home-page'>
        <section className="hero-banner">
          <h1>Bienvenido a Mercart</h1>
          <p>Descubre los mejores productos con las mejores ofertas</p>
          <Link
            to="/productos"
            className="cta-button"
          >Ver Productos</Link>
        </section>

        {categoriesLoading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Cargando categorías...</p>
          </div>
        )}

        {categoriesError && (
          <div className="error-container">
            <p>Error al cargar las categorías</p>
          </div>
        )}

        {!categoriesLoading && !categoriesError && formattedCategories.length > 0 && (
          <CategoryGrid categories={formattedCategories} />
        )}

        {isLoading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Cargando productos...</p>
          </div>
        )}

        {error && (
          <div className="error-container">
            <p>{error.message}</p>
            <button
              className="cta-button"
              onClick={() => window.location.reload()}
            >
              Reintentar
            </button>
          </div>
        )}

        {!isLoading && !error && (
          <ProductGrid
            title="Productos Destacados"
            products={formattedProducts}
          />
        )}
      </div>
    </>
  );
};