"use client";

import { getImageProps } from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap, MQ, useGSAP } from "../../lib/gsap";
import { waLink } from "../../lib/content";

/* ── Geometría de las fotos ─────────────────────────────────────────────────
   Hay dos encuadres de la misma toma: vertical para pantallas más altas que
   anchas y horizontal para el resto. Todo en fracciones del tamaño de cada
   imagen, medido sobre su canal alfa. Si cambiás una foto, estos son los
   únicos números que hay que volver a medir. */

type Rect = { x0: number; x1: number; y0: number; y1: number };

type Foto = {
  src: string;
  w: number;
  h: number;
  sizes: string;
  /**
   * La foto siempre cubre el viewport entero. Cuando sobra alto, este es el
   * punto (fracción del alto de la foto) que queda al medio de la pantalla.
   */
  foco: number;
  /** Caja que contiene todo el recorte transparente de la pantalla. */
  pantalla: Rect;
  /**
   * Rectángulos 100% adentro de la pantalla (sin la manga) hacia los que se
   * puede hacer zoom: uno alto y uno ancho. Se usa el que pida menos escala
   * para llenar el viewport.
   */
  destinos: Rect[];
};

const VERTICAL: Foto = {
  src: "/hero/cafe-laptop-mobile.png",
  w: 941,
  h: 1672,
  sizes: "max(100vw, 57vh)",
  foco: 0.55,
  pantalla: { x0: 0.563, x1: 0.965, y0: 0.395, y1: 0.567 },
  destinos: [
    { x0: 0.659, x1: 0.953, y0: 0.415, y1: 0.548 }, // alto
    { x0: 0.575, x1: 0.955, y0: 0.415, y1: 0.482 }, // ancho
  ],
};

const HORIZONTAL: Foto = {
  src: "/hero/cafe-laptop-desktop.png",
  w: 1672,
  h: 941,
  sizes: "max(100vw, 178vh)",
  foco: 0.45,
  pantalla: { x0: 0.547, x1: 0.822, y0: 0.26, y1: 0.578 },
  destinos: [
    { x0: 0.651, x1: 0.811, y0: 0.29, y1: 0.555 }, // alto
    { x0: 0.556, x1: 0.812, y0: 0.3, y1: 0.465 }, // ancho
  ],
};

const APAISADO = "(orientation: landscape)";

const pct = (n: number) => `${(n * 100).toFixed(2)}%`;

/** Variables CSS con la geometría de una foto; las consume `.hero-foto`. */
const variables = (f: Foto) =>
  `--p:${(f.h / f.w).toFixed(4)};--foco:${f.foco};aspect-ratio:${f.w}/${f.h};` +
  `--pl:${pct(f.pantalla.x0)};--pt:${pct(f.pantalla.y0)};` +
  `--pr:${pct(1 - f.pantalla.x1)};--pb:${pct(1 - f.pantalla.y1)}`;

const CSS_FOTO =
  `.hero-foto{${variables(VERTICAL)};--alto:max(calc(100vw*var(--p)),100svh);` +
  `width:max(100vw,calc(100svh/var(--p)));` +
  `top:clamp(100svh - var(--alto),50svh - var(--foco)*var(--alto),0px)}` +
  `@media ${APAISADO}{.hero-foto{${variables(HORIZONTAL)}}}`;

const ALT = "Magali Cerisola tomando un café con su perro en la falda; al lado, su notebook abierta.";

const fuente = (f: Foto) =>
  getImageProps({
    src: f.src,
    width: f.w,
    height: f.h,
    sizes: f.sizes,
    alt: ALT,
    // Es lo primero que se ve: no se difiere. Dentro de <picture> el
    // navegador sólo baja la fuente que corresponde a la orientación.
    loading: "eager",
    fetchPriority: "high",
  }).props;

/* ── Ritmo de la animación ──────────────────────────────────────────────────
   Posiciones sobre el progreso del scroll (0 = arriba, 1 = fin del tramo).
   El largo del tramo es el alto de la sección: `motion-safe:h-[220svh]` son
   100svh de la portada + 120svh de zoom. */
const RITMO = {
  textoFuera: 0.22,
  cartelDesde: 0.5,
  cartelHasta: 0.7,
  /** Desde acá la portada se funde y deja ver la sección de trabajos. */
  salidaDesde: 0.78,
};

export default function HeroZoom() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const zoom = useRef<HTMLDivElement>(null);
  const fondo = useRef<HTMLDivElement>(null);
  const cartel = useRef<HTMLParagraphElement>(null);
  const texto = useRef<HTMLDivElement>(null);
  const velos = useRef<HTMLDivElement>(null);

  const vertical = fuente(VERTICAL);
  const horizontal = fuente(HORIZONTAL);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        // La sección que sigue se mete un viewport abajo de la portada: cuando
        // el zoom termina ya está en su lugar, y al fundirse la foto aparece
        // "adentro" de la pantalla. Se hace por JS y no por CSS para que, si
        // el script no carga, la portada no le tape el comienzo.
        gsap.set(root.current, { marginBottom: "-100svh" });

        /** Escala y desplazamiento para que un destino cubra todo el stage. */
        const destino = () => {
          const s = stage.current!.getBoundingClientRect();
          const f = frame.current!.getBoundingClientRect();
          const { destinos } = window.matchMedia(APAISADO).matches ? HORIZONTAL : VERTICAL;
          let mejor = { scale: 1, x: 0, y: 0 };
          let menor = Infinity;
          for (const d of destinos) {
            // 4% de margen: tapa el redondeo de subpíxeles en los bordes.
            const scale =
              Math.max(s.width / ((d.x1 - d.x0) * f.width), s.height / ((d.y1 - d.y0) * f.height)) *
              1.04;
            if (scale >= menor) continue;
            menor = scale;
            // Centro del destino, en px locales de la foto (transform-origin 0 0).
            const cx = ((d.x0 + d.x1) / 2) * f.width;
            const cy = ((d.y0 + d.y1) / 2) * f.height;
            mejor = {
              scale,
              x: s.width / 2 - (f.left - s.left) - cx * scale,
              y: s.height / 2 - (f.top - s.top) - cy * scale,
            };
          }
          return mejor;
        };

        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.3,
              invalidateOnRefresh: true,
            },
          })
          .to(texto.current, { autoAlpha: 0, y: -24, duration: RITMO.textoFuera }, 0)
          .to(velos.current, { autoAlpha: 0, duration: RITMO.textoFuera }, 0)
          .to(
            zoom.current,
            {
              scale: () => destino().scale,
              x: () => destino().x,
              y: () => destino().y,
              duration: 1,
              ease: "power2.in",
            },
            0,
          )
          .to(
            cartel.current,
            { autoAlpha: 0, duration: RITMO.cartelHasta - RITMO.cartelDesde },
            RITMO.cartelDesde,
          )
          // La pantalla tiene el mismo color que el fondo de trabajos, así
          // que en el fundido lo único que cambia a la vista es el contenido.
          .to(
            [frame.current, fondo.current],
            { autoAlpha: 0, duration: 1 - RITMO.salidaDesde },
            RITMO.salidaDesde,
          );

        return () => gsap.set(root.current, { clearProps: "marginBottom" });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-label="Presentación"
      className="hero-zoom pointer-events-none relative z-10 motion-safe:h-[220svh]"
    >
      <div
        ref={stage}
        className="relative h-svh overflow-hidden motion-safe:sticky motion-safe:top-0"
      >
        <div ref={fondo} aria-hidden className="absolute inset-0 bg-[#05070F]" />

        {/* Foto a pantalla completa, centrada en su foco sin dejar bordes vacíos. */}
        <style>{CSS_FOTO}</style>
        <div ref={frame} className="hero-foto absolute left-1/2 -translate-x-1/2">
          <div ref={zoom} className="relative h-full w-full origin-top-left will-change-transform">
            {/* La pantalla va atrás de la foto y se ve por el recorte transparente. */}
            <div className="@container absolute bottom-[var(--pb)] left-[var(--pl)] right-[var(--pr)] top-[var(--pt)] bg-[#080E1C]">
              <p
                ref={cartel}
                className="absolute left-[50%] top-[44%] landscape:left-[56%] -translate-x-1/2 -translate-y-1/2 -rotate-[3deg] whitespace-nowrap text-center font-display text-[11cqw] font-extrabold leading-[1.15] tracking-[-0.02em] text-[#EEF2F9]"
              >
                Entrá a mi
                <br />
                universo{" "}
                <span aria-hidden className="inline-block text-[var(--accent-ink)] motion-safe:animate-bounce">
                  ↓
                </span>
              </p>
            </div>

            <picture>
              <source media={APAISADO} srcSet={horizontal.srcSet} sizes={horizontal.sizes} />
              <img {...vertical} alt={ALT} className="absolute inset-0 h-full w-full object-cover" />
            </picture>
          </div>
        </div>

        {/* Velos para que el texto se lea sobre la foto: arriba y abajo en
            vertical, a la izquierda (sobre la pared) en apaisado. */}
        <div ref={velos} aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 top-0 h-[38%] bg-gradient-to-b from-[#05070F] from-12% via-[#05070F]/70 via-55% to-transparent landscape:hidden" />
          <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-[#05070F] from-30% via-[#05070F]/80 via-62% to-transparent landscape:hidden" />
          <div className="absolute inset-y-0 left-0 hidden w-[62%] bg-gradient-to-r from-[#05070F]/90 via-[#05070F]/65 via-45% to-transparent landscape:block" />
        </div>

        {/* Texto. Vertical: nombre arriba, propuesta y botón abajo, para no tapar
            las caras. Apaisado: todo junto sobre la pared de la izquierda. */}
        <div
          ref={texto}
          className="pointer-events-auto absolute inset-0 flex flex-col justify-between px-5 pb-6 pt-[84px] landscape:right-auto landscape:w-[31vw] landscape:justify-center landscape:gap-[5svh] landscape:pb-0 landscape:pl-[4vw] landscape:pr-0 landscape:pt-[72px]"
        >
          <div>
            <h1 className="font-display text-[clamp(46px,14vw,104px)] landscape:text-[clamp(34px,min(5.3vw,13svh),104px)] font-extrabold leading-[0.98] tracking-[-0.04em] text-[#EEF2F9]">
              Soy Magui.
            </h1>
            <p className="mt-2 text-[clamp(15px,4vw,20px)] font-medium text-[#EEF2F9]">
              Desarrolladora de software hace 6&nbsp;años.
            </p>
          </div>

          <div>
            <p className="max-w-[22ch] font-display text-[clamp(21px,5.6vw,34px)] landscape:text-[clamp(17px,min(2.2vw,4.6svh),34px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#EEF2F9]">
              Diseño webs animadas que hacen que tu marca{" "}
              <span className="text-[var(--accent-ink)]">no se olvide.</span>
            </p>
            <Link
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-[52px] items-center rounded-[12px] bg-[var(--accent)] px-7 text-[16px] font-semibold text-white outline-none transition-colors duration-200 hover:bg-[var(--accent-hover)] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[var(--accent-ink)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070F]"
            >
              Quiero mi web
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
