import "../../styles/BarraOfertas.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaRegCreditCard } from "react-icons/fa";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";

export default function PromoBanner() {
  const mensajes = [
    <>
      Ofertas exclusivas para ti <FaRegCreditCard /> &nbsp;|&nbsp;
      <Link to="/ofertas">¡Revisa aquí!</Link>
    </>,
    <>
      Envíos gratis desde $999 &nbsp;|&nbsp;
      <Link to="/envios">Ver términos y condiciones</Link>
    </>,
    <>
      Hasta 12 MSI en Tecnología &nbsp;|&nbsp;
      <Link to="/msi">Conoce los bancos participantes</Link>
    </>,
    <>
      Nuevo drop en deportes &nbsp;|&nbsp;
      <Link to="/deportes">Explorar</Link>
    </>,
  ];

  const [i, setI] = useState(0);
  const timer = useRef(null);

  const next = useCallback(
    () => setI((v) => (v + 1) % mensajes.length),
    [mensajes.length]
  );
  const prev = useCallback(
    () => setI((v) => (v - 1 + mensajes.length) % mensajes.length),
    [mensajes.length]
  );

  const start = useCallback(() => {
    if (timer.current) return;
    timer.current = setInterval(next, 3500);
  }, [next]);

  const stop = useCallback(() => {
    clearInterval(timer.current);
    timer.current = null;
  }, []);

  useEffect(() => {
    start();
    return stop;
  }, [start, stop]);

  return (
    <div
      className="promo-banner"
      onMouseEnter={stop}
      onMouseLeave={start}
      role="region"
      aria-label="Mensajes promocionales"
    >
      <button
        className="banner-btn left"
        onClick={prev}
        aria-label="Mensaje anterior"
        type="button"
      >
        <ChevronLeft size={18} />
      </button>

      <div className="banner-track">
        <div key={i} className="banner-slide">
          <p className="banner-text">{mensajes[i]}</p>
        </div>
      </div>

      <button
        className="banner-btn right"
        onClick={next}
        aria-label="Mensaje siguiente"
        type="button"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
