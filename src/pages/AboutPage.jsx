import React from 'react'
import '../styles/AboutPage.css'
import '../styles/PageLayout.css'
import { FaRocket, FaLeaf, FaUsers, FaHeart, FaEye, FaBullseye } from 'react-icons/fa'

export const AboutPage = () => {
    return (
        <div className='page-container'>
            <h1 className='page-title'>Acerca de Nosotros</h1>

            <section className='about-hero'>
                <div className='hero-content'>
                    <div className='logo-container'>
                        <img
                            src='https://i.postimg.cc/PfBszYrD/mercart.png'
                            alt='Mercart Logo'
                            className='hero-logo'
                        />
                        <div className='logo-connection'></div>
                    </div>
                    <div className='hero-text'>
                        <p>
                            Somos una plataforma de e-commerce apasionada por la tecnología, la innovación y el bienestar de nuestros clientes. Ofrecemos productos tecnológicos de alta calidad, artículos de moda y estilo de vida, con un enfoque amigable con el medio ambiente.
                        </p>
                        <p>
                            Creemos que comprar en línea debe ser una experiencia cómoda, confiable y humana.
                        </p>
                    </div>
                </div>
            </section>

            <div className='values-grid'>
                <div className='value-item'>
                    <FaLeaf className='value-icon' />
                    <h3>Sostenibilidad</h3>
                    <p>Productos ecológicos y prácticas responsables con el medio ambiente.</p>
                </div>
                <div className='value-item'>
                    <FaUsers className='value-icon' />
                    <h3>Enfoque Humano</h3>
                    <p>Trato personalizado y cercano con cada uno de nuestros clientes.</p>
                </div>
                <div className='value-item'>
                    <FaRocket className='value-icon' />
                    <h3>Innovación</h3>
                    <p>Siempre a la vanguardia con los últimos productos tecnológicos.</p>
                </div>
            </div>

            <section className='about-section'>
                <div className='mission-vision-container'>
                    <div className='mission-vision-item'>
                        <div className='icon-title-wrapper'>
                            <FaBullseye className='mv-icon' />
                            <h2>Nuestra misión</h2>
                        </div>
                        <p>
                            Brindar una experiencia de compra excepcional con productos cuidadosamente seleccionados, trato personalizado y prácticas ambientalmente responsables.
                        </p>
                    </div>
                    
                    <div className='mission-vision-item'>
                        <div className='icon-title-wrapper'>
                            <FaEye className='mv-icon' />
                            <h2>Nuestra visión</h2>
                        </div>
                        <p>
                            Ser la plataforma líder en comercio electrónico que redefine la relación entre tecnología, sostenibilidad y cercanía humana.
                        </p>
                    </div>
                </div>
            </section>

            <section className='commitment-section'>
                <h2>Nuestro Compromiso</h2>
                <div className='commitment-grid'>
                    <div className='commitment-item'>
                        <FaHeart className='commitment-icon' />
                        <h3>Calidad Garantizada</h3>
                        <p>Seleccionamos cuidadosamente cada producto para asegurar su calidad y durabilidad.</p>
                    </div>
                    <div className='commitment-item'>
                        <FaLeaf className='commitment-icon' />
                        <h3>Sostenibilidad</h3>
                        <p>Priorizamos productos ecológicos y procesos de envío responsables con el planeta.</p>
                    </div>
                    <div className='commitment-item'>
                        <FaUsers className='commitment-icon' />
                        <h3>Comunidad</h3>
                        <p>Creemos en construir relaciones duraderas con nuestros clientes, no solo transacciones.</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AboutPage;