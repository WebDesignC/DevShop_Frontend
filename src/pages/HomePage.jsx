// HomePage.jsx
import '../styles/Home.css';


function HomePage() {
  
  const categorias = [
    { link: "#", categoria: "Ropa", imagen: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { link: "#", categoria: "Tecnología", imagen: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { link: "#", categoria: "Decoración y Hogar", imagen: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { link: "#", categoria: "Deportes", imagen: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
  ];

  return (
    <>
      <div className="home-container">

        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1>Bienvenido a MercArt</h1>
            <p>Tu tienda de confianza para productos tecnológicos y más</p>
            <button className="cta-button">Explorar Productos</button>
          </div>
          
        </section>
        
        {/* Categorías Section */}
        <section id="categorias" className="categorias-section">
          {/*<h2>Nuestras Categorías</h2> */}
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

        
        
        *{/* Productos Destacados Section */}
        <section className="featured-products">
          <h2>Productos Destacados</h2>
          <div className="productos-grid">
            {/* Aquí iría el listado de productos */}
            <div className="producto-card">
              <img src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Producto 1" />
              <h3>Auriculares Inalámbricos</h3>
              <p>$59.99</p>
              <button className="add-to-cart">Añadir al carrito</button>
            </div>
            <div className="producto-card">
              <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Producto 2" />
              <h3>Smart Watch</h3>
              <p>$129.99</p>
              <button className="add-to-cart">Añadir al carrito</button>
            </div>
            <div className="producto-card">
              <img src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Producto 3" />
              <h3>Zapatillas Deportivas</h3>
              <p>$89.99</p>
              <button className="add-to-cart">Añadir al carrito</button>
            </div>
            <div className="producto-card">
              <img src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Producto 4" />
              <h3>Laptop Ultraligera</h3>
              <p>$899.99</p>
              <button className="add-to-cart">Añadir al carrito</button>
            </div>
          </div>
        </section>
        

       

        

      </div>
      
    </>
  );
}

export default HomePage;