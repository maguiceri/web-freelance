"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "../Reveal";
import Highlight from "../Highlight";

/**
 * Carrusel de síntomas de la sección Webs.
 *
 * Este copy vive acá y no en content.ts a propósito: content.ts guarda lo que
 * tiene que coincidir entre página, JSON-LD y llms.txt, y esto es sólo texto de
 * página.
 */
const SINTOMAS = [
  {
    num: "01",
    titulo: 'Te escriben "hola, info" y desaparecen',
    desc: "Llegan sin entender qué hacés, cuánto sale ni cómo es el proceso. Preguntan lo básico y no vuelven a contestar.",
    tag: "se fue",
  },
  {
    num: "02",
    titulo: "Tu publicidad lleva a tu Instagram",
    desc: "La persona cae en un perfil donde la información está desordenada. Empieza una conversación y para irse solo tiene que dejar de responder.",
    tag: "se fue",
  },
  {
    num: "03",
    titulo: "Contestás las mismas preguntas todos los días",
    desc: "Precio, horarios, qué incluye, cómo se empieza. Tu tiempo se va en responder lo que debería estar contestado antes de que te escriban.",
    tag: "tu tiempo",
  },
  {
    num: "04",
    titulo: "El que compara, no tiene con qué elegirte",
    desc: "Está mirando tres opciones. Si no ve trabajos, testimonios ni una cara, elige al que sí se los muestra.",
    tag: "se fue",
  },
  {
    num: "05",
    titulo: "En el celular tarda una eternidad",
    desc: "Ahí llega la mayoría. Si tarda más de tres segundos, se va antes de ver nada. Y nunca te enterás de que estuvo.",
    tag: "se fue",
  },
];

const INTERVALO = 4200;

export default function Sintomas({ z = 11 }: { z?: number }) {
  const [active, setActive] = useState(0);
  const paused = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = (idx: number) => {
    setActive((idx + SINTOMAS.length) % SINTOMAS.length);
    paused.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      paused.current = false;
    }, 5000);
  };

  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) setActive((p) => (p + 1) % SINTOMAS.length);
    }, INTERVALO);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      style={{ zIndex: z }}
      className="stack-card lg:sticky lg:top-[88px] border border-[#1E2A44] bg-[#0B1120] py-[clamp(72px,10vw,130px)]"
    >
      <div className="mx-auto max-w-[1080px] px-[4vw]">
        <Reveal
          as="h2"
          direction="left"
          className="font-display font-extrabold text-[clamp(28px,4vw,44px)] tracking-[-0.03em] leading-[1.12] max-w-[22ch] text-[#EEF2F9]"
        >
          Estás perdiendo clientes{" "}
          <br />
          antes de que te escriban.
        </Reveal>
        <Reveal as="p" delayMs={80} className="text-[#7C89A3] mt-[18px] max-w-[56ch] text-[17px]">
          No los ves, no los contás, y por eso parece que no existen. Pero cada uno de estos
          síntomas es <Highlight delay={200}>alguien que se fue.</Highlight>
        </Reveal>

        <Reveal as="div" delayMs={160} className="mt-[48px]">
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
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {SINTOMAS.map((s) => (
                <article
                  key={s.num}
                  className="min-w-full border border-[#1E2A44] rounded-[16px] bg-[#05070F] p-[36px_32px] flex flex-col gap-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-display font-extrabold text-[13px] text-[var(--accent-ink)] tracking-[0.1em]">
                      {s.num}
                    </span>
                    <span
                      className={`text-[11px] font-semibold uppercase tracking-[0.12em] px-3 py-1 rounded-full border ${
                        s.tag === "se fue"
                          ? "text-red-300/70 border-red-500/20 bg-red-950/25"
                          : "text-amber-300/70 border-amber-500/20 bg-amber-950/25"
                      }`}
                    >
                      {s.tag}
                    </span>
                  </div>
                  <h3 className="font-display font-extrabold text-[clamp(22px,3vw,30px)] tracking-[-0.02em] leading-[1.1] text-[#EEF2F9]">
                    {s.titulo}
                  </h3>
                  <p className="text-[16px] text-[#7C89A3] leading-relaxed max-w-[60ch]">{s.desc}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-5 flex items-center gap-4">
            <button
              onClick={() => goTo(active - 1)}
              aria-label="Síntoma anterior"
              className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-[#1E2A44] text-[#7C89A3] outline-none transition hover:border-[var(--accent)] hover:text-[#EEF2F9] active:scale-90 focus-visible:ring-2 focus-visible:ring-[var(--accent-ink)]/50"
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 12L6 8l4-4" />
              </svg>
            </button>

            <div className="flex gap-2">
              {SINTOMAS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Ir al síntoma ${i + 1}`}
                  aria-current={i === active}
                  className={`h-1.5 rounded-full transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-ink)]/50 ${
                    i === active ? "w-6 bg-[var(--accent)]" : "w-1.5 bg-[#1E2A44] hover:bg-[#2a3a5a]"
                  }`}
                />
              ))}
            </div>

            <div className="flex-1 h-px bg-[#1E2A44] overflow-hidden rounded-full">
              <div key={active} className="h-full bg-[var(--accent)] carousel-progress" />
            </div>

            <button
              onClick={() => goTo(active + 1)}
              aria-label="Síntoma siguiente"
              className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-[#1E2A44] text-[#7C89A3] outline-none transition hover:border-[var(--accent)] hover:text-[#EEF2F9] active:scale-90 focus-visible:ring-2 focus-visible:ring-[var(--accent-ink)]/50"
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 4l4 4-4 4" />
              </svg>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
