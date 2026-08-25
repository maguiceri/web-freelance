import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../components/Reveal";
import Highlight from "../components/Highlight";
import Proceso from "../components/sections/Proceso";
import PruebaSocial from "../components/sections/PruebaSocial";
import Faq from "../components/sections/Faq";
import Cierre from "../components/sections/Cierre";
import { BASE_URL, servicioBySlug, waLink } from "../lib/content";
import { servicioSchema } from "../lib/schema";

const servicio = servicioBySlug("sistemas");
const URL_PAGINA = `${BASE_URL}/sistemas`;

export const metadata: Metadata = {
  title: servicio.metaTitle,
  description: servicio.metaDescription,
  alternates: { canonical: "/sistemas" },
  openGraph: {
    type: "website",
    url: URL_PAGINA,
    title: servicio.metaTitle,
    description: servicio.metaDescription,
  },
};

/**
 * Cada tarjeta nombra una tarea manual y, en la segunda frase, qué la
 * reemplaza. Los ejemplos concretos (flujo, cotizador, panel) estaban
 * amontonados en una sola oración del hero; bajaron acá, uno por tarjeta.
 */
const PERDIDAS = [
  {
    titulo: "Copiar datos a mano",
    desc: "Pasás a una planilla lo que llega por WhatsApp o por mail, uno por uno. Un flujo automático lo carga solo.",
  },
  {
    titulo: "Armar presupuestos de a uno",
    desc: "Abrís la plantilla, cambiás los números, revisás que no falte nada. Un cotizador lo calcula solo.",
  },
  {
    titulo: "Responder siempre lo mismo",
    desc: "Precio, plazos, qué incluye. Todo eso puede estar contestado antes de que te escriban.",
  },
  {
    titulo: "Buscar información desperdigada",
    desc: "La ficha en un cuaderno, el turno en el celular, el pago en otra planilla. Un panel junta todo en un solo lugar.",
  },
];

export default function SistemasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicioSchema(servicio)) }}
      />

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1080px] px-[4vw] pt-[clamp(48px,7vw,84px)] pb-[clamp(56px,8vw,96px)]">
        <Reveal
          as="p"
          className="text-[12px] font-semibold tracking-[0.18em] uppercase text-[var(--accent-ink)] mb-[22px]"
        >
          Servicio · Sistemas a medida
        </Reveal>

        <h1 className="font-display font-extrabold text-[clamp(34px,5.6vw,62px)] leading-[1.05] tracking-[-0.035em] text-[#EEF2F9] max-w-[18ch]">
          {servicio.heading}
        </h1>

        {/* Primera persona: la version en tercera va al JSON-LD y a llms.txt. */}
        <Reveal
          as="p"
          delayMs={140}
          className="text-[#7C89A3] text-[clamp(16px,2vw,19px)] max-w-[62ch] mt-[26px] leading-relaxed"
        >
          {servicio.intro}
        </Reveal>

        <Reveal as="div" delayMs={280} className="mt-[36px] flex flex-wrap items-center gap-x-5 gap-y-3">
          <Link
            href={waLink("sistemas")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[var(--accent)] text-white font-semibold text-[15px] px-[26px] py-[14px] rounded-[10px] outline-none transition-colors duration-200 hover:bg-[var(--accent-hover)] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[var(--accent-ink)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070F]"
          >
            Quiero mi presupuesto
          </Link>
          <Link
            href="/webs"
            className="text-[14px] text-[var(--accent-ink)] underline underline-offset-4 transition hover:text-[#EEF2F9] outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-ink)]/50 rounded"
          >
            ¿Buscabas una página web?
          </Link>
        </Reveal>
      </section>

      {/* ── EL PROBLEMA ────────────────────────────────────────────────── */}
      <section
        style={{ zIndex: 11 }}
        className="stack-card relative border border-[#1E2A44] bg-[#0B1120] py-[clamp(72px,10vw,130px)]"
      >
        <div className="mx-auto max-w-[1080px] px-[4vw]">
          <Reveal
            as="h2"
            direction="left"
            className="font-display font-extrabold text-[clamp(28px,4vw,44px)] tracking-[-0.03em] leading-[1.12] max-w-[26ch] text-[#EEF2F9]"
          >
            ¿Cuánto tiempo perdés por semana?
          </Reveal>
          <Reveal as="p" delayMs={80} className="text-[#7C89A3] mt-[18px] max-w-[58ch] text-[17px]">
            Sumá las horas que se te van en tareas que se repiten. Ese tiempo{" "}
            <Highlight delay={200}>no vuelve.</Highlight>
          </Reveal>

          <div className="mt-[48px] grid grid-cols-1 md:grid-cols-2 gap-[20px]">
            {PERDIDAS.map((p, i) => (
              <Reveal
                as="article"
                key={p.titulo}
                delayMs={i * 80}
                className="card-tile border border-[#1E2A44] rounded-[14px] bg-[#05070F] p-[28px]"
              >
                <h3 className="font-display font-semibold text-[18px] text-[#EEF2F9] leading-snug">
                  {p.titulo}
                </h3>
                <p className="text-[15px] text-[#7C89A3] mt-2 leading-relaxed">{p.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Proceso
        z={12}
        id="proceso"
        pasos={servicio.pasos}
        rotulo="Cómo trabajo"
        titulo={<>De proceso manual a <Highlight delay={300}>sistema que corre solo.</Highlight></>}
        bajada="Primero medimos cuánto tiempo te está costando el proceso. Recién después escribo código. Si no se justifica automatizarlo, te lo digo."
      />

      <PruebaSocial
        z={13}
        filtrar="sistemas"
        titulo="Casos con resultado medido"
        bajada="Dos negocios que dejaron de hacer a mano lo que ahora hace un sistema."
      />

      <Faq faqs={servicio.faqs} pageUrl={URL_PAGINA} titulo="Preguntas sobre sistemas" z={14} />

      <Cierre
        z={15}
        contexto="sistemas"
        titulo={<>¿Qué proceso te gustaría <Highlight delay={400}>dejar de hacer a mano?</Highlight></>}
        bajada="Contame cómo trabajás hoy. En 30 minutos te digo qué se puede automatizar y qué no conviene. Con precio, sin compromiso."
      />
    </>
  );
}
