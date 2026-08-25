"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "../Reveal";
import Highlight from "../Highlight";
import type { Paso } from "../../lib/content";

/**
 * Timeline de 4 pasos. Antes vivía embebida en page.tsx con los pasos de Webs
 * hardcodeados; ahora la comparten Webs y Sistemas.
 */
export default function Proceso({
  pasos,
  rotulo,
  titulo,
  bajada,
  id = "proceso",
  z = 12,
  children,
}: {
  pasos: Paso[];
  rotulo: string;
  titulo: React.ReactNode;
  bajada?: React.ReactNode;
  id?: string;
  z?: number;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id={id}
      style={{ zIndex: z }}
      className="stack-card lg:sticky lg:top-[94px] border border-[#1E2A44] bg-[#080E1C] py-[clamp(72px,10vw,130px)] scroll-mt-20"
    >
      <div className="mx-auto max-w-[1080px] px-[4vw]">
        <Reveal
          as="p"
          className="text-[12px] font-semibold tracking-[0.18em] uppercase text-[var(--accent-ink)] mb-[14px]"
        >
          {rotulo}
        </Reveal>
        <Reveal
          as="h2"
          delayMs={60}
          direction="left"
          className="font-display font-extrabold text-[clamp(28px,4vw,44px)] tracking-[-0.03em] leading-[1.12] text-[#EEF2F9]"
        >
          {titulo}
        </Reveal>
        {bajada && (
          <Reveal as="p" delayMs={120} className="text-[#7C89A3] mt-[18px] max-w-[56ch] text-[17px]">
            {bajada}
          </Reveal>
        )}

        <div ref={ref} className="relative mt-14">
          {/* Línea horizontal — desktop */}
          <div className="hidden md:block absolute top-5 left-[12.5%] right-[12.5%] h-px bg-[#1E2A44] overflow-hidden">
            <div
              className="h-full bg-[var(--accent)] transition-[width] duration-[2000ms] ease-out"
              style={{ width: vis ? "100%" : "0%" }}
            />
          </div>

          {/* Línea vertical — mobile */}
          <div
            className="md:hidden absolute left-5 top-0 bottom-0 w-px bg-[#1E2A44] overflow-hidden"
            style={{ transform: "translateX(-50%)" }}
          >
            <div
              className="w-full bg-[var(--accent)] transition-[height] duration-[2000ms] ease-out"
              style={{ height: vis ? "100%" : "0%" }}
            />
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 list-none">
            {pasos.map((paso, i) => {
              const delay = i * 450;
              return (
                <li key={paso.titulo} className="flex md:flex-col md:items-center gap-4 md:gap-0">
                  <div
                    className="relative z-10 shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center font-display font-extrabold text-[13px] transition-all duration-700"
                    style={{
                      transitionDelay: `${delay}ms`,
                      borderColor: vis ? "var(--accent)" : "#1E2A44",
                      color: vis ? "var(--accent-ink)" : "#2a3a5a",
                      background: "#0B1120",
                    }}
                  >
                    {i + 1}
                  </div>
                  <div
                    className="md:mt-6 md:text-center transition-all duration-500"
                    style={{
                      transitionDelay: `${delay + 250}ms`,
                      opacity: vis ? 1 : 0,
                      transform: vis ? "translateY(0)" : "translateY(12px)",
                    }}
                  >
                    <small className="block text-[var(--accent-ink)] text-[11px] font-semibold uppercase tracking-[0.1em]">
                      {paso.cuando}
                    </small>
                    <h3 className="font-display font-semibold text-[17px] tracking-[-0.01em] mt-1 text-[#EEF2F9]">
                      {paso.titulo}
                    </h3>
                    <p className="text-[14px] text-[#7C89A3] mt-2 leading-relaxed">{paso.desc}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {children}
      </div>
    </section>
  );
}

export { Highlight };
