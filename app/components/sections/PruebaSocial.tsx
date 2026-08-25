"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Reveal from "../Reveal";
import {
  CASOS,
  SERVICIOS,
  TESTIMONIOS,
  type Caso,
  type Metrica,
  type Servicio,
  type Testimonio,
} from "../../lib/content";
import { reviewsSchema } from "../../lib/schema";

const INTERVALO = 5200;

/**
 * Número que cuenta desde 0 cuando su tarjeta entra en pantalla.
 *
 * La barra de abajo es un indicador de carga, no un dato: se llena siempre al
 * 100% en el mismo tiempo que tarda el contador. No representa una proporción
 * (12 h sobre qué total sería un dato que no tenemos).
 */
function Contador({ metrica, activo }: { metrica: Metrica; activo: boolean }) {
  const [v, setV] = useState(0);

  useEffect(() => {
    if (!activo) return;
    let raf = 0;
    const dur = 1100;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      // setState dentro de rAF: asíncrono, no dispara renders en cascada
      setV(Math.round(eased * metrica.num));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [activo, metrica.num]);

  return (
    <div className="min-w-[128px]">
      {/* El valor final va en el DOM para lectores de pantalla y crawlers,
          aunque en pantalla se vea el número animando. */}
      {/* Template literal, no expresiones adyacentes: React separa {a} {b} con
          comentarios <!-- --> en el SSR y eso ensucia la extracción de texto. */}
      <span className="sr-only">{`${metrica.num} ${metrica.sufijo} ${metrica.label}`}</span>

      <p aria-hidden className="font-display font-extrabold text-[30px] leading-none text-[var(--accent-ink)]">
        {v}
        <span className="text-[0.6em] align-super ml-0.5">{metrica.sufijo}</span>
      </p>

      <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-[#1E2A44]">
        <div
          className="h-full rounded-full bg-[var(--accent)] transition-[width] duration-[1100ms] ease-out"
          style={{ width: activo ? "100%" : "0%" }}
        />
      </div>

      <p aria-hidden className="mt-2 text-[12px] leading-snug text-[#7C89A3] max-w-[17ch]">
        {metrica.label}
      </p>
    </div>
  );
}

function TarjetaCaso({ caso, activo, nav }: { caso: Caso; activo: boolean; nav: string }) {
  return (
    <article className="h-full border border-[#1E2A44] rounded-[16px] bg-[#0B1120] p-[clamp(24px,3vw,36px)] flex flex-col">
      <span className="self-start text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-ink)] border border-[var(--accent)]/40 rounded-full px-2.5 py-1">
        {nav}
      </span>

      <h3 className="font-display font-extrabold text-[clamp(20px,2.6vw,27px)] tracking-[-0.02em] leading-[1.15] text-[#EEF2F9] mt-5">
        {caso.proyecto}
      </h3>
      <p className="text-[15px] text-[#7C89A3] mt-3 leading-relaxed max-w-[62ch]">{caso.que}</p>

      <div className="mt-7 flex flex-wrap gap-x-10 gap-y-6">
        {caso.metricas.map((m) => (
          <Contador key={m.label} metrica={m} activo={activo} />
        ))}
      </div>

      <blockquote className="mt-7 pt-6 border-t border-[#1E2A44]">
        <p className="text-[15.5px] leading-relaxed text-[#EEF2F9] max-w-[60ch]">
          &ldquo;{caso.testimonio}&rdquo;
        </p>
        <footer className="mt-4 flex items-center gap-3 text-[13px]">
          <Image
            src={caso.img}
            alt={
              caso.fotoDe === caso.autor
                ? `Foto de ${caso.fotoDe}, ${caso.rubro.toLowerCase()}, cliente de Magali Cerisola`
                : `Foto de ${caso.fotoDe}, de ${caso.autor}, cliente de Magali Cerisola`
            }
            width={44}
            height={44}
            className="rounded-full object-cover ring-1 ring-white/10 shrink-0"
          />
          <div>
            <strong className="block font-semibold text-[#EEF2F9]">{caso.autor}</strong>
            <small className="text-[#7C89A3]">{caso.rubro}</small>
          </div>
        </footer>
      </blockquote>
    </article>
  );
}

function TarjetaTestimonio({ t, nav }: { t: Testimonio; nav: string }) {
  return (
    <article className="h-full border border-[#1E2A44] rounded-[16px] bg-[#0B1120] p-[clamp(24px,3vw,36px)] flex flex-col">
      <span className="self-start text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-ink)] border border-[var(--accent)]/40 rounded-full px-2.5 py-1">
        {nav}
      </span>

      {/* Centrado vertical: las tarjetas del carrusel se estiran a la altura
          del caso más alto, y un testimonio corto dejaba un hueco muerto entre
          la cita y la firma. */}
      <blockquote className="mt-5 flex flex-1 flex-col justify-center">
        <p className="font-display font-semibold text-[clamp(19px,2.4vw,26px)] leading-[1.35] tracking-[-0.01em] text-[#EEF2F9] max-w-[46ch]">
          &ldquo;{t.texto}&rdquo;
        </p>
        <footer className="mt-7 flex items-center gap-3 text-[13px]">
          <Image
            src={t.img}
            alt={`Foto de ${t.nombre}, ${t.rol.toLowerCase()}, cliente de Magali Cerisola`}
            width={44}
            height={44}
            className="rounded-full object-cover ring-1 ring-white/10 shrink-0"
          />
          <div>
            <strong className="block font-semibold text-[#EEF2F9]">{t.nombre}</strong>
            <small className="text-[#7C89A3]">{t.rol}</small>
          </div>
        </footer>
      </blockquote>
    </article>
  );
}

export default function PruebaSocial({
  filtrar,
  titulo = "Lo que dicen los clientes",
  bajada,
  z = 13,
}: {
  filtrar?: Servicio["slug"];
  titulo?: string;
  bajada?: string;
  z?: number;
}) {
  const casos = filtrar ? CASOS.filter((c) => c.servicio === filtrar) : CASOS;
  const testimonios = filtrar ? TESTIMONIOS.filter((t) => t.servicio === filtrar) : TESTIMONIOS;
  const navDe = (slug: Servicio["slug"]) => SERVICIOS.find((s) => s.slug === slug)!.nav;

  // Sólo se marcan como Review los testimonios que esta página renderiza.
  const reviews = reviewsSchema(testimonios);

  const slides = [
    ...casos.map((c) => ({ tipo: "caso" as const, key: c.cliente, caso: c })),
    ...testimonios.map((t) => ({ tipo: "testimonio" as const, key: t.nombre, testimonio: t })),
  ];

  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const paused = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const seccionRef = useRef<HTMLElement>(null);

  const goTo = (idx: number) => {
    setActive((idx + slides.length) % slides.length);
    paused.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      paused.current = false;
    }, 6000);
  };

  // El carrusel sólo avanza (y los contadores sólo animan) con la sección a la
  // vista: si no, la persona vuelve y ya se le pasaron todas las tarjetas.
  useEffect(() => {
    const el = seccionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0.25,
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || slides.length < 2) return;
    const id = setInterval(() => {
      if (!paused.current) setActive((p) => (p + 1) % slides.length);
    }, INTERVALO);
    return () => clearInterval(id);
  }, [visible, slides.length]);

  return (
    <section
      ref={seccionRef}
      id="casos"
      style={{ zIndex: z }}
      className="relative stack-card border border-[#1E2A44] bg-[#05070F] py-[clamp(72px,10vw,130px)] scroll-mt-20"
    >
      {reviews && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviews) }}
        />
      )}

      <div className="mx-auto max-w-[1080px] px-[4vw]">
        <Reveal
          as="h2"
          direction="left"
          className="font-display font-extrabold text-[clamp(28px,4vw,44px)] tracking-[-0.03em] leading-[1.12] text-[#EEF2F9]"
        >
          {titulo}
        </Reveal>
        {bajada && (
          <Reveal as="p" delayMs={80} className="text-[#7C89A3] mt-[18px] max-w-[56ch] text-[17px]">
            {bajada}
          </Reveal>
        )}

        <Reveal as="div" delayMs={160} className="mt-[44px]">
          {/* Todas las tarjetas quedan en el DOM: el carrusel sólo las desplaza,
              así que un crawler ve las cinco aunque en pantalla haya una. */}
          <div
            className="overflow-hidden rounded-[16px]"
            onMouseEnter={() => {
              paused.current = true;
            }}
            onMouseLeave={() => {
              paused.current = false;
            }}
          >
            <div
              className="flex items-stretch transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {slides.map((s, i) => (
                <div key={s.key} className="min-w-full md:min-h-[330px]">
                  {s.tipo === "caso" ? (
                    <TarjetaCaso
                      caso={s.caso}
                      nav={navDe(s.caso.servicio)}
                      activo={visible && i === active}
                    />
                  ) : (
                    <TarjetaTestimonio t={s.testimonio} nav={navDe(s.testimonio.servicio)} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {slides.length > 1 && (
            <div className="mt-5 flex items-center gap-4">
              <button
                onClick={() => goTo(active - 1)}
                aria-label="Caso anterior"
                className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-[#1E2A44] text-[#7C89A3] outline-none transition hover:border-[var(--accent)] hover:text-[#EEF2F9] active:scale-90 focus-visible:ring-2 focus-visible:ring-[var(--accent-ink)]/50"
              >
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 12L6 8l4-4" />
                </svg>
              </button>

              <div className="flex gap-2">
                {slides.map((s, i) => (
                  <button
                    key={s.key}
                    onClick={() => goTo(i)}
                    aria-label={`Ir al caso ${i + 1} de ${slides.length}`}
                    aria-current={i === active}
                    className={`h-1.5 rounded-full transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-ink)]/50 ${
                      i === active ? "w-6 bg-[var(--accent)]" : "w-1.5 bg-[#1E2A44] hover:bg-[#2a3a5a]"
                    }`}
                  />
                ))}
              </div>

              <div className="flex-1 h-px bg-[#1E2A44] overflow-hidden rounded-full">
                {visible && (
                  <div
                    key={active}
                    className="h-full bg-[var(--accent)] carousel-progress"
                    style={{ "--carousel-dur": `${INTERVALO}ms` } as React.CSSProperties}
                  />
                )}
              </div>

              <button
                onClick={() => goTo(active + 1)}
                aria-label="Caso siguiente"
                className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-[#1E2A44] text-[#7C89A3] outline-none transition hover:border-[var(--accent)] hover:text-[#EEF2F9] active:scale-90 focus-visible:ring-2 focus-visible:ring-[var(--accent-ink)]/50"
              >
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 4l4 4-4 4" />
                </svg>
              </button>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
