import { ProductGrid } from '../components/home/ProductGrid';
import { useFeaturedProducts } from '../hooks/products/useFeaturedProducts';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

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
    { link: "#", categoria: "Ropa", imagen: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { link: "#", categoria: "Tecnología", imagen: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { link: "#", categoria: "Decoración y Hogar", imagen: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { link: "#", categoria: "Deportes", imagen: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
  ];

  return (
    <>
      <div className="home-container">
        <section className="hero-section">
          <div className="hero-video">
            <video src="https://videos.pexels.com/video-files/3253272/3253272-uhd_2560_1440_25fps.mp4" 
              autoPlay
              loop
              muted></video>
          </div>
          <div className="hero-content">
            <h1>Bienvenido a MercArt</h1>
            <Link to="/productos">
              <button className="cta-button">Explorar Productos</button>
            </Link>
          </div>
        </section>

        <section id="categorias" className="categorias-section">
          <h2>Nuestras Categorías</h2> 
          <div className="categorias-contenedor">
            <div className="categorias-grid">
              {categorias.map((categoria, index) => (
                <div key={index} className="categoria-item">
                  <a href={categoria.link}>
                    <div className="categoria-imagen">
                      <img src={categoria.imagen} alt={categoria.categoria} />
                      <div className="overlay">
                        <p>{categoria.categoria}</p>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

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

export default HomePage;