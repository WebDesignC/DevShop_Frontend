import React, { useEffect, useMemo, useState } from "react";
import "../styles/Carrousel.css";

/**
 * ProductCarousel
 * Props:
 * - title: string
 * - products: [{ id, title, image, price, oldPrice?, discountText?, subtitle?, badge? }]
 *
 * Muestra 4 productos a la vez (responsivo) con navegación por flechas y puntos.
 */
export default function ProductCarousel({ title = "Inspirado en lo último que viste", products = [] }) {
  // Datos de ejemplo si no mandas productos (10 items)
  const fallback = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, i) => ({
        id: `p-${i + 1}`,
        title: [
          "Scooter Eléctrico Patín Adultos",
          "Scooter Eléctrico 500W",
          "Monopatín para Niños 3 Ruedas",
          "Scooter Plegable M1",
          "Patinete 30km/h App",
          "Scooter Xiaomi 4 Lite",
          "Scooter Urbano PRO",
          "Scooter Plegable 8.5”",
          "E-Scooter Batería 10Ah",
          "Patín Eléctrico Compacto",
        ][i],
        image: `https://images.unsplash.com/photo-1594007654729-407eedc4be65?q=80&w=800&auto=format&fit=crop`,
        price: [3980, 3950, 999, 4599, 3960, 6724, 4200, 3899, 4990, 3590][i],
        oldPrice: [7961, 5000, 2999, 7998, 7472, 7472, 5200, 4200, 5500, 3990][i],
        discountText: ["50% OFF", "21% OFF", "66% OFF", "42% OFF", "47% OFF", "10% OFF", "20% OFF", "7% OFF", "9% OFF", "10% OFF"][i],
        subtitle: ["3 meses sin intereses de", "6 meses sin intereses de", "3 meses sin intereses de", "15 meses sin intereses de", "3 meses sin intereses de", "3 meses sin intereses de", "6 meses sin intereses de", "3 meses sin intereses de", "9 meses sin intereses de", "3 meses sin intereses de"][i],
        badge: "FULL",
      })),
    []
  );

  const data = products.length ? products.slice(0, 10) : fallback;

  // Items visibles según ancho (4 / 3 / 2 / 1)
  const [visible, setVisible] = useState(4);
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w < 520) setVisible(1);
      else if (w < 768) setVisible(2);
      else if (w < 1100) setVisible(3);
      else setVisible(4);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  // Índice actual (desplaza de 1 en 1 para que funcione bien con cualquier visible)
  const [index, setIndex] = useState(0);
  const maxIndex = Math.max(0, data.length - visible);

  const next = () => setIndex((i) => Math.min(i + 1, maxIndex));
  const prev = () => setIndex((i) => Math.max(i - 1, 0));
  const goTo = (i) => setIndex(i);

  // Ancho del item vía CSS var para calcular el translate
  const trackStyle = {
    transform: `translateX(calc(-${index} * (var(--card-w) + var(--gap))))`,
  };

  return (
    <section className="pcarousel">
      <div className="pcarousel-header">
        <h3>{title}</h3>
        <div className="pcarousel-dots" aria-label="Paginación">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              className={`dot ${i === index ? "is-active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Página ${i + 1}`}
              aria-current={i === index ? "true" : "false"}
            />
          ))}
        </div>
      </div>

      <div className="pcarousel-viewport">
        <div className="pcarousel-track" style={trackStyle}>
          {data.map((p) => (
            <article className="pcard" key={p.id}>
              <div className="pcard-media">
                <img src={p.image} alt={p.title} loading="lazy" />
                {p.badge && <span className="pcard-badge">{p.badge}</span>}
              </div>

              <h4 className="pcard-title" title={p.title}>{p.title}</h4>

              <div className="pcard-prices">
                {p.oldPrice && <span className="old">${p.oldPrice.toLocaleString()}</span>}
                <span className="price">${p.price.toLocaleString()}</span>
                {p.discountText && <span className="discount">{p.discountText}</span>}
              </div>

              {p.subtitle && (
                <p className="pcard-sub">
                  {p.subtitle}{" "}
                  <strong>
                    ${Math.round((p.price / 3) * 100) / 100}
                  </strong>
                </p>
              )}

              <div className="pcard-ship">Llega gratis mañana</div>
            </article>
          ))}
        </div>

        <button className="pcarousel-btn prev" onClick={prev} disabled={index === 0} aria-label="Anterior">
          ‹
        </button>
        <button className="pcarousel-btn next" onClick={next} disabled={index === maxIndex} aria-label="Siguiente">
          ›
        </button>
      </div>
    </section>
  );
}
