import React from 'react'
import '../styles/AboutUs.css'
import '../styles/PageLayout.css'

export const AboutPage = () => {
    return (
        <div className='page-container'>
            <h1 className='page-title'>Acerca de Nosotros</h1>

            <section className='about-hero'>
                <div className='hero-content'>
                    <img
                        src='https://i.postimg.cc/PfBszYrD/mercart.png'
                        alt='Mercart Logo'
                        className='hero-logo'
                    />
                    <div className='hero-text'>
                        <p>
                            Somos una plataforma de e-commerce apasionada por la tecnología, la innovación y el bienestar de nuestros clientes. Nos especializamos en ofrecer productos tecnológicos de alta calidad, además de artículos de moda y estilo de vida, todo con un enfoque amigable con el medio ambiente.
                        </p>
                        <p>
                            Creemos que comprar en línea debe ser una experiencia cómoda, confiable y humana.
                        </p>
                    </div>
                </div>
            </section>

            <section className='about-section'>
                <h2>Nuestra misión</h2>
                <div className='content-block'>
                    <div className='text-content'>
                        <p>
                            Brindar a nuestros clientes una experiencia de compra excepcional, ofreciendo productos tecnológicos y de consumo cuidadosamente seleccionados, con un trato cálido y personalizado, promoviendo prácticas responsables con el medio ambiente.
                        </p>
                    </div>
                    <img 
                        src='https://i.postimg.cc/GmxWCfPP/mision.jpg'
                        alt='Misión'
                        className='content-image'  
                    />
                </div>
            </section>

            <section className='about-section'>
                <h2>Nuestra visión</h2>
                <div className='content-block reversed'>
                    
                    <div className='text-content'>
                        <p>
                            Ser la plataforma líder en comercio electrónico que redefine la relación entre tecnología, sostenibilidad y cercanía humana, creando una comunidad de clientes que se sientan valorados, cómodos y conectados.
                        </p>
                    </div>
                    <img
                        src='https://i.postimg.cc/t4jK8b6C/vision.jpg'
                        alt='Visión'
                        className='content-image'
                    />
                </div>
            </section>
        </div>
    )
}

export default AboutPage;