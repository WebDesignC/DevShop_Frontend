import { ProductGrid } from '../components/home/ProductGrid';
import { Banner } from '../components/home/Banner';
import '../styles/HomePage.css';
import { useFeaturedProducts } from '../hooks/products/useFeaturedProducts';
import { Link } from 'react-router-dom';
import  CategoryGrid  from '../components/home/CategoryGrid';

export const HomePage = () => {
  const { data: featuredProducts, isLoading, error } = useFeaturedProducts();

  const formattedProducts = featuredProducts ? featuredProducts.map(product => ({
    id: product.id,
    name: product.title,
    price: product.price,
    description: product.description,
    category: product.category,
    images: [product.image]
  })) : [];

  const categorias = [
    {
      categoria: "Ropa",
      imagen: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      categoria: "Tecnología",
      imagen: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      categoria: "Decoración y Hogar",
      imagen: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      categoria: "Deportes",
      imagen: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

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

        <CategoryGrid categories={categorias} />

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