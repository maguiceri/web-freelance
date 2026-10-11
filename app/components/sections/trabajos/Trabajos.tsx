"use client";

import { useRef } from "react";
import { gsap, MQ, ScrollTrigger, useGSAP } from "../../../lib/gsap";
import TrabajoCard from "./TrabajoCard";
import { TRABAJOS } from "../../../lib/trabajos";

/**
 * Galería de trabajos: lo que se ve "adentro" de la pantalla del hero.
 *
 * Desktop: fila horizontal que avanza con el scroll vertical. La sección queda
 *          fija con `position: sticky` y GSAP sólo traslada la fila.
 * Mobile:  tarjetas en columna que se apilan una sobre otra (sticky en CSS, ver
 *          `.trabajo-apilado` en globals.css); GSAP achica la que queda abajo.
 * Reducir movimiento / sin JS: columna en mobile, grilla de dos en desktop.
 */
export default function Trabajos() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  /** Cuánto hay que correr la fila para ver la última tarjeta. 0 = no es horizontal. */
  const recorrido = useRef(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.desktop, () => {
        // El alto de la sección define cuánto scroll vertical dura el paseo:
        // un px de scroll = un px de fila.
        const medir = () => {
          recorrido.current = Math.max(0, track.current!.scrollWidth - stage.current!.clientWidth);
          root.current!.style.height = `${stage.current!.offsetHeight + recorrido.current}px`;
        };
        // Sin JS la fila se puede scrollear a mano; con JS la maneja el scroll.
        stage.current!.style.overflowX = "clip";
        medir();
        ScrollTrigger.addEventListener("refreshInit", medir);

        gsap.to(track.current, {
          x: () => -recorrido.current,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3,
            invalidateOnRefresh: true,
          },
        });

        return () => {
          ScrollTrigger.removeEventListener("refreshInit", medir);
          recorrido.current = 0;
          root.current?.style.removeProperty("height");
          stage.current?.style.removeProperty("overflow-x");
        };
      });

      mm.add(MQ.mobile, () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-card]", track.current);
        cards.slice(0, -1).forEach((card, i) => {
          gsap.to(card, {
            scale: 0.93,
            ease: "none",
            scrollTrigger: {
              trigger: cards[i + 1],
              start: "top bottom",
              end: "top 20%",
              scrub: true,
            },
          });
        });
      });
    },
    { scope: root },
  );

  /** Con teclado: al enfocar una tarjeta fuera de pantalla, llevar el scroll hasta ella. */
  const alEnfocar = (e: React.FocusEvent<HTMLUListElement>) => {
    if (!recorrido.current || !root.current) return;
    const item = (e.target as HTMLElement).closest("li");
    if (!item) return;
    const inicio = root.current.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: inicio + Math.min(item.offsetLeft, recorrido.current) });
  };

  return (
    <section
      ref={root}
      id="trabajos"
      aria-labelledby="trabajos-titulo"
      className="relative bg-[#080E1C]"
    >
      <div
        ref={stage}
        className="pb-16 pt-24 lg:flex lg:flex-col lg:justify-center lg:py-0 lg:pt-[72px] motion-safe:lg:sticky motion-safe:lg:top-0 motion-safe:lg:h-svh motion-safe:lg:overflow-x-auto motion-reduce:lg:py-28"
      >
        <header className="px-5 lg:px-[max(4vw,calc((100vw-1280px)/2))]">
          <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-ink)]">
            Adentro de la pantalla
          </p>
          <h2
            id="trabajos-titulo"
            className="font-display text-[clamp(34px,5vw,60px)] font-extrabold leading-[1.02] tracking-[-0.035em] text-[#EEF2F9]"
          >
            Mis trabajos
          </h2>
        </header>

        <ul
          ref={track}
          onFocus={alEnfocar}
          className="mt-8 flex flex-col gap-5 px-5 lg:mt-10 lg:gap-8 lg:px-[max(4vw,calc((100vw-1280px)/2))] motion-safe:lg:w-max motion-safe:lg:flex-row motion-safe:lg:will-change-transform motion-reduce:lg:grid motion-reduce:lg:grid-cols-2"
        >
          {TRABAJOS.map((t, i) => (
            <li
              key={t.slug}
              style={{ "--i": i } as React.CSSProperties}
              className="trabajo-apilado motion-safe:lg:w-[min(56vw,820px,calc((100svh-390px)*1.6))]"
            >
              <div data-card className="origin-top">
                <TrabajoCard trabajo={t} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
