import Link from "next/link";
import Reveal from "../Reveal";
import { SERVICIOS } from "../../lib/content";

function IconWeb() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6" aria-hidden>
      <rect x="2.5" y="4" width="19" height="15" rx="2" />
      <path d="M2.5 8.5h19" strokeLinecap="round" />
      <circle cx="5.6" cy="6.3" r=".7" fill="currentColor" stroke="none" />
      <circle cx="7.9" cy="6.3" r=".7" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconSistema() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6" aria-hidden>
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3.4" />
    </svg>
  );
}

const ICONOS = { webs: IconWeb, sistemas: IconSistema } as const;

/**
 * Bloque de dos caminos. Es la primera decisión que toma la persona que entra,
 * y también el punto donde un modelo de lenguaje ve que hay dos servicios
 * distintos con URL propia.
 */
export default function Bifurcacion({ z = 11 }: { z?: number }) {
  return (
    // Sin lg:sticky a propósito: el apilado sólo funciona en secciones que
    // llenan el viewport. Esta mide ~700px, así que al fijarse quedaba tapada
    // por la siguiente antes de poder leer las tarjetas.
    <section
      id="servicios"
      style={{ zIndex: z }}
      className="stack-card relative border border-[#1E2A44] bg-[#0B1120] py-[clamp(72px,10vw,130px)] scroll-mt-20"
    >
      <div className="mx-auto max-w-[1080px] px-[4vw]">
        <Reveal
          as="h2"
          direction="left"
          className="font-display font-extrabold text-[clamp(28px,4vw,44px)] tracking-[-0.03em] leading-[1.12] text-[#EEF2F9]"
        >
          ¿Qué necesitás?
        </Reveal>
        <Reveal as="p" delayMs={80} className="text-[#7C89A3] mt-[18px] max-w-[56ch] text-[17px]">
          Dos problemas distintos, dos soluciones distintas. Elegí por dónde te aprieta el zapato.
        </Reveal>

        <div className="mt-[48px] grid grid-cols-1 md:grid-cols-2 gap-[20px]">
          {SERVICIOS.map((s, i) => {
            const Icono = ICONOS[s.slug];
            return (
              <Reveal
                as="article"
                key={s.slug}
                delayMs={i * 100}
                className="card-tile border border-[#1E2A44] rounded-[16px] bg-[#05070F] flex"
              >
                <Link
                  href={`/${s.slug}`}
                  className="flex flex-col gap-4 p-[32px] outline-none rounded-[16px] focus-visible:ring-2 focus-visible:ring-[var(--accent-ink)]/60"
                >
                  <span className="text-[var(--accent-ink)]">
                    <Icono />
                  </span>

                  <h3 className="font-display font-extrabold text-[clamp(21px,2.6vw,27px)] tracking-[-0.02em] leading-[1.15] text-[#EEF2F9]">
                    {s.nav === "Webs" ? "Páginas web" : "Sistemas a medida"}
                  </h3>

                  <p className="text-[16px] text-[#7C89A3] leading-relaxed flex-1">
                    {s.bifurcacion}
                  </p>

                  <span className="inline-flex items-center gap-2 text-[15px] font-semibold text-[var(--accent-ink)] mt-2">
                    Ver {s.nav.toLowerCase()}
                    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 4l4 4-4 4" />
                    </svg>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
