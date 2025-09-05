import React, { useState } from 'react';
import '../styles/HelpCenter.css';
import { 
  FaSearch, 
  FaChevronDown, 
  FaEnvelope, 
  FaPhone, 
  FaComments,
  FaShippingFast,
  FaCreditCard,
  FaUserShield,
  FaExchangeAlt,
  FaBoxOpen,
  FaQuestionCircle
} from 'react-icons/fa';

export const HelpCenter = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState({});

  // Datos de ejemplo para las FAQs
  const faqData = {
    all: [
      {
        id: 1,
        question: "¿Cómo crear una cuenta en MercArt?",
        answer: "Para crear una cuenta, ve a la página de registro, completa tus datos personales y verifica tu correo electrónico."
      },
      {
        id: 2,
        question: "¿Qué métodos de pago aceptan?",
        answer: "Aceptamos tarjetas de crédito/débito, transferencias bancarias y pagos en efectivo a través de convenios con establecimientos autorizados."
      },
      {
        id: 3,
        question: "¿Cuánto tarda en llegar mi pedido?",
        answer: "El tiempo de entrega varía según tu ubicación. Generalmente entre 3-7 días hábiles para envíos nacionales."
      },
      {
        id: 4,
        question: "¿Cómo puedo realizar una devolución?",
        answer: "Puedes solicitar una devolución dentro de los 30 días posteriores a la recepción de tu producto contactando a nuestro servicio al cliente."
      },
      {
        id: 5,
        question: "¿Cómo protegen mis datos personales?",
        answer: "Implementamos medidas de seguridad avanzadas y cumplimos con todas las regulaciones de protección de datos personales."
      }
    ],
    account: [
      {
        id: 6,
        question: "¿Cómo recupero mi contraseña?",
        answer: "Haz clic en 'Olvidé mi contraseña' en la página de login y sigue las instrucciones que llegarán a tu correo electrónico."
      },
      {
        id: 7,
        question: "¿Cómo actualizo mi información personal?",
        answer: "Inicia sesión y ve a 'Mi cuenta' > 'Información personal' donde podrás editar tus datos."
      }
    ],
    payments: [
      {
        id: 8,
        question: "¿Por qué mi tarjeta fue rechazada?",
        answer: "Esto puede deberse a fondos insuficientes, datos incorrectos o restricciones de tu banco. Te recomendamos contactar a tu institución bancaria."
      },
      {
        id: 9,
        question: "¿Ofrecen pagos a meses sin intereses?",
        answer: "Sí, contamos con promociones de meses sin intereses con tarjetas de crédito participantes."
      }
    ],
    shipping: [
      {
        id: 10,
        question: "¿Hacen envíos internacionales?",
        answer: "Actualmente solo realizamos envíos dentro de México."
      },
      {
        id: 11,
        question: "¿Puedo cambiar la dirección de envío?",
        answer: "Sí, siempre y cuando el pedido no haya sido marcado como 'en camino'. Contacta a nuestro servicio al cliente para asistencia."
      }
    ]
  };

  const categories = [
    { id: 'all', name: 'Todas las categorías', icon: <FaQuestionCircle /> },
    { id: 'account', name: 'Cuenta', icon: <FaUserShield /> },
    { id: 'payments', name: 'Pagos', icon: <FaCreditCard /> },
    { id: 'shipping', name: 'Envíos', icon: <FaShippingFast /> },
    { id: 'returns', name: 'Devoluciones', icon: <FaExchangeAlt /> },
    { id: 'products', name: 'Productos', icon: <FaBoxOpen /> }
  ];

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredFaqs = () => {
    let questions = [];
    
    if (activeCategory === 'all') {
      Object.values(faqData).forEach(category => {
        questions = [...questions, ...category];
      });
    } else {
      questions = faqData[activeCategory] || [];
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return questions.filter(q => 
        q.question.toLowerCase().includes(term) || 
        q.answer.toLowerCase().includes(term)
      );
    }
    
    return questions;
  };

  return (
    <main className="help-center-container">
      <div className="help-center-content">
        <h1 className="help-center-title">Centro de Ayuda</h1>
        <p className="help-center-subtitle">¿En qué podemos ayudarte hoy?</p>
        
        <div className="help-center-search-container">
          <div className="help-center-search-input">
            <FaSearch className="help-center-search-icon" />
            <input
              type="text"
              placeholder="Buscar en ayuda..."
              className="help-center-search-input-field"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select 
            className="help-center-category-select"
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="help-center-categories-grid">
          {categories.filter(cat => cat.id !== 'all').map(category => (
            <div 
              key={category.id} 
              className={`help-center-category-card ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              <div className="help-center-category-icon">
                {category.icon}
              </div>
              <h3>{category.name}</h3>
            </div>
          ))}
        </div>
        
        <div className="help-center-list">
          {filteredFaqs().length > 0 ? (
            filteredFaqs().map(item => (
              <div key={item.id} className="help-center-item">
                <button 
                  className="help-center-question"
                  onClick={() => toggleItem(item.id)}
                >
                  {item.question}
                  <FaChevronDown className={`help-center-chevron ${openItems[item.id] ? 'open' : ''}`} />
                </button>
                {openItems[item.id] && (
                  <div className="help-center-answer">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="help-center-empty">
              <p>No encontramos resultados para "{searchTerm}"</p>
              <p>Intenta con otras palabras clave o revisa nuestra sección de categorías.</p>
            </div>
          )}
        </div>
        
        <div className="help-center-contact">
          <h2 className="help-center-contact-title">¿No encontraste lo que buscabas?</h2>
          <p className="help-center-contact-text">Contáctanos directamente</p>
          <div className="help-center-contact-options">
            <a href="mailto:mercart@mcarkart.com" className="help-center-contact-link">
              <FaEnvelope className="help-center-icon" />
              Enviar un correo
            </a>
            <a href="tel:+525512345678" className="help-center-contact-link">
              <FaPhone className="help-center-icon" />
              Llamar por teléfono
            </a>
            <a href="#" className="help-center-contact-link">
              <FaComments className="help-center-icon" />
              Chat en vivo
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};