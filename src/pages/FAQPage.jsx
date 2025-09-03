import React, { useState, useMemo } from "react";
import { ChevronDown, Search, Mail, MessageSquare, Phone } from "lucide-react";
import '../styles/FAQPage.css';

const faqs = [
  {
    id: "ped-1",
    category: "Pedidos",
    question: "¿Cómo realizo un pedido?",
    answer: "Explora los productos, añádelos al carrito y procede al pago. Te guiaremos paso a paso para completar tu compra de forma segura.",
  },
  {
    id: "pag-1",
    category: "Pagos",
    question: "¿Qué métodos de pago aceptan?",
    answer: "Aceptamos tarjetas de crédito/débito, transferencias SPEI y pagos en efectivo en tiendas participantes (OXXO, etc.), según disponibilidad.",
  },
  {
    id: "env-1",
    category: "Envíos",
    question: "¿Cuáles son los tiempos de entrega?",
    answer: "El envío estándar tarda de 2 a 5 días hábiles dentro de México. Envío exprés disponible en zonas seleccionadas.",
  },
  {
    id: "dev-1",
    category: "Devoluciones",
    question: "¿Cuál es la política de devoluciones?",
    answer: "Tienes 30 días naturales a partir de la entrega para solicitar una devolución. El producto debe estar en su empaque original y sin uso.",
  },
];

const categories = ["Todos", "Pedidos", "Pagos", "Envíos", "Devoluciones"];

function AccordionItem({ faq, isOpen, toggle }) {
  return (
    <div className="faq-item">
      <button
        onClick={toggle}
        className="faq-question"
      >
        {faq.question}
        <ChevronDown className={`chevron-icon ${isOpen ? "open" : ""}`} />
      </button>
      {isOpen && <div className="faq-answer">{faq.answer}</div>}
    </div>
  );
}

export const FAQPage = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");
  const [openId, setOpenId] = useState(null);

  const filteredFaqs = useMemo(() => {
    return faqs.filter(f => {
      const matchesCategory = category === "Todos" || f.category === category;
      const matchesQuery = query === "" || 
        f.question.toLowerCase().includes(query.toLowerCase()) || 
        f.answer.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <main className="faq-container">
      <div className="faq-content">
        <h1 className="faq-title">Preguntas Frecuentes</h1>
        <p className="faq-subtitle">Encuentra respuestas rápidas sobre pedidos, pagos, envíos y más.</p>

        {/* Buscador + Categorías */}
        <div className="faq-search-container">
          <div className="faq-search-input">
            <span className="faq-search-icon">
              <Search className="faq-icon" />
            </span>
            <input
              type="text"
              placeholder="Busca por palabra clave"
              className="faq-search-input-field"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="faq-category-select"
          >
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Preguntas */}
        <div className="faq-list">
          {filteredFaqs.length === 0 ? (
            <div className="faq-empty">
              No encontramos resultados para "{query}" en "{category}".
            </div>
          ) : (
            filteredFaqs.map(faq => (
              <AccordionItem
                key={faq.id}
                faq={faq}
                isOpen={openId === faq.id}
                toggle={() => setOpenId(prev => (prev === faq.id ? null : faq.id))}
              />
            ))
          )}
        </div>

        {/* Contacto */}
        <div className="faq-contact">
          <h2 className="faq-contact-title">¿Necesitas más ayuda?</h2>
          <p className="faq-contact-text">Escríbenos de lunes a viernes, 9:00–18:00 (CDMX).</p>
          <div className="faq-contact-options">
            <a href="mailto:soporte@devshop.mx" className="faq-contact-link">
              <Mail className="faq-icon" /> soporte@devshop.mx
            </a>
            <a href="#chat" className="faq-contact-link">
              <MessageSquare className="faq-icon" /> Abrir chat
            </a>
            <a href="tel:+525512345678" className="faq-contact-link">
              <Phone className="faq-icon" /> +52 55 1234 5678
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};