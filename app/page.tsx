import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "./components/Reveal";
import Highlight from "./components/Highlight";
import LogoMark from "./components/LogoMark";
import Bifurcacion from "./components/sections/Bifurcacion";
import PruebaSocial from "./components/sections/PruebaSocial";
import QuienSoy from "./components/sections/QuienSoy";
import Faq from "./components/sections/Faq";
import Cierre from "./components/sections/Cierre";
import { BASE_URL, FAQS_GENERALES, IDENTITY, waLink } from "./lib/content";

export const metadata: Metadata = {
  title: "Webs y sistemas a medida para negocios | Magali Cerisola",
  description: IDENTITY.tagline,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: BASE_URL,
    title: "Webs y sistemas a medida para negocios | Magali Cerisola",
    description: IDENTITY.tagline,
  },
};

export default function Home() {
  return (
    <>
      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1080px] px-[4vw] pt-[clamp(56px,8vw,96px)] pb-[clamp(56px,8vw,96px)]">
        <div className="flex items-center gap-10 lg:gap-16">
          <div className="flex-1 min-w-0">
            <Reveal
              as="p"
              className="text-[12px] font-semibold tracking-[0.18em] uppercase text-[var(--accent-ink)] mb-[22px]"
            >
              Desarrolladora freelance · {IDENTITY.locality}
            </Reveal>

            <h1 className="font-display font-extrabold text-[clamp(38px,6.4vw,72px)] leading-[1.03] tracking-[-0.035em] text-[#EEF2F9]">
              {/* El {" "} separa las dos líneas para quien extrae el texto plano
                  del h1 (crawlers, lectores de pantalla). Sin él se lee
                  "Tecnología quete hace vender más". Visualmente no cambia nada:
                  los span son display:block. */}
              <span className="block word-in" style={{ animationDelay: "60ms" }}>
                Tecnología que
              </span>{" "}
              <span className="block word-in" style={{ animationDelay: "220ms" }}>
                te hace vender más.
              </span>
            </h1>

            <Reveal
              as="p"
              delayMs={140}
              className="text-[#7C89A3] text-[clamp(16px,2vw,19px)] max-w-[54ch] mt-[26px] leading-relaxed"
            >
              Webs que convierten visitas en clientes, y sistemas a medida que{" "}
              <Highlight delay={400}>automatizan lo que hoy hacés a mano.</Highlight>
            </Reveal>

            <Reveal
              as="div"
              delayMs={300}
              className="mt-[36px] flex flex-wrap items-center gap-x-5 gap-y-3"
            >
              <Link
                href={waLink("general")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[var(--accent)] text-white font-semibold text-[15px] px-[26px] py-[14px] rounded-[10px] outline-none transition-colors duration-200 hover:bg-[var(--accent-hover)] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[var(--accent-ink)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070F]"
              >
                Quiero mi presupuesto
              </Link>
              <p className="text-[13px] text-[#7C89A3]">Respondo en menos de 24 hs</p>
            </Reveal>
          </div>

          <div className="hidden lg:flex shrink-0 items-center justify-center">
            <LogoMark height={260} className="hero-logo-float" />
          </div>
        </div>
      </section>

      <Bifurcacion z={11} />

      <PruebaSocial
        z={13}
        titulo="Resultados, no promesas"
        bajada="Casos de los dos servicios, con lo que cambió medido en horas y en consultas."
      />

      <QuienSoy z={14} />

      <Faq faqs={FAQS_GENERALES} pageUrl={BASE_URL} z={15} />

      <Cierre contexto="general" z={16} />
    </>
  );
}
