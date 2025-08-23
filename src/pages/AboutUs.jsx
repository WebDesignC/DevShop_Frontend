import '../styles/AboutUs.css';

export default function AboutUs() {
  return (
    <div className="about-container">
      <h1>🌱 Acerca de Nosotros</h1>

      <section className="about-section">
        <img
          src="https://i.postimg.cc/PfBszYrD/mercart.png"
          alt="DevShop Logo"
          className="about-logo"
        />
        <p className="about-text">
          Somos una plataforma de e-commerce apasionada por la tecnología, la innovación y el bienestar de nuestros clientes. Nos especializamos en ofrecer productos tecnológicos de alta calidad, además de artículos de moda y estilo de vida, todo con un enfoque amigable con el medio ambiente. <br />
          Creemos que comprar en línea debe ser una experiencia cómoda, confiable y humana.
        </p>
      </section>

      <section className="about-subsection">
        <div>
          <h1>Nuestra misión</h1>
          <div className="about-subcontent">
            <p>
              Brindar a nuestros clientes una experiencia de compra excepcional, ofreciendo productos tecnológicos y de consumo cuidadosamente seleccionados, con un trato cálido y personalizado, promoviendo prácticas responsables con el medio ambiente.
            </p>
            <img
              src="https://i.postimg.cc/GmxWCfPP/mision.jpg"
              alt="Misión"
            />
          </div>
        </div>

        <div>
          <h1>Nuestra visión</h1>
          <div className="about-subcontent">
            <img
              src="https://i.postimg.cc/t4jK8b6C/vision.jpg"
              alt="Visión"
            />
            <p>
              Ser la plataforma líder en comercio electrónico que redefine la relación entre tecnología, sostenibilidad y cercanía humana, creando una comunidad de clientes que se sientan valorados, cómodos y conectados.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
