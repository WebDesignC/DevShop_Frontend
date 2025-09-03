import React, { useState, useMemo } from "react";
import { ChevronDown, Search, Mail, MessageSquare, Phone } from "lucide-react";

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
    <div className="border border-gray-200 rounded-2xl bg-white shadow-md">
      <button
        onClick={toggle}
        className="w-full flex justify-between items-center p-4 text-left font-medium text-gray-900 hover:bg-gray-50 transition"
      >
        {faq.question}
        <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`} />
      </button>
      {isOpen && <div className="px-4 pb-4 text-gray-700">{faq.answer}</div>}
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
      const matchesQuery = query === "" || f.question.toLowerCase().includes(query.toLowerCase()) || f.answer.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <main className="min-h-screen bg-gray-50 py-12 flex flex-col items-center">
      <div className="w-full max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Preguntas Frecuentes</h1>
        <p className="text-gray-600 mb-8">Encuentra respuestas rápidas sobre pedidos, pagos, envíos y más.</p>

        {/* Buscador + Categorías */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="text"
              placeholder="Busca por palabra clave"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-gray-200"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="border border-gray-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-gray-200"
          >
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Preguntas */}
        <div className="grid gap-4">
          {filteredFaqs.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 p-6 text-gray-600">
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
        <div className="mt-12 p-6 bg-white rounded-2xl border border-gray-200 shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">¿Necesitas más ayuda?</h2>
          <p className="text-gray-600 mb-4">Escríbenos de lunes a viernes, 9:00–18:00 (CDMX).</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="mailto:soporte@devshop.mx" className="flex items-center gap-2 px-4 py-2 border rounded-xl hover:shadow">
              <Mail className="h-4 w-4" /> soporte@devshop.mx
            </a>
            <a href="#chat" className="flex items-center gap-2 px-4 py-2 border rounded-xl hover:shadow">
              <MessageSquare className="h-4 w-4" /> Abrir chat
            </a>
            <a href="tel:+525512345678" className="flex items-center gap-2 px-4 py-2 border rounded-xl hover:shadow">
              <Phone className="h-4 w-4" /> +52 55 1234 5678
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};
