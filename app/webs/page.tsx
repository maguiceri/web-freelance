import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../components/Reveal";
import Highlight from "../components/Highlight";
import Sintomas from "../components/sections/Sintomas";
import Proceso from "../components/sections/Proceso";
import PruebaSocial from "../components/sections/PruebaSocial";
import Faq from "../components/sections/Faq";
import Cierre from "../components/sections/Cierre";
import { BASE_URL, servicioBySlug, waLink } from "../lib/content";
import { servicioSchema } from "../lib/schema";

const servicio = servicioBySlug("webs");
const URL_PAGINA = `${BASE_URL}/webs`;

export const metadata: Metadata = {
  title: servicio.metaTitle,
  description: servicio.metaDescription,
  alternates: { canonical: "/webs" },
  openGraph: {
    type: "website",
    url: URL_PAGINA,
    title: servicio.metaTitle,
    description: servicio.metaDescription,
  },
};

export default function WebsPage() {
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
          Servicio · Páginas web
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
            href={waLink("webs")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[var(--accent)] text-white font-semibold text-[15px] px-[26px] py-[14px] rounded-[10px] outline-none transition-colors duration-200 hover:bg-[var(--accent-hover)] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[var(--accent-ink)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070F]"
          >
            Quiero mi presupuesto
          </Link>
          <Link
            href="/sistemas"
            className="text-[14px] text-[var(--accent-ink)] underline underline-offset-4 transition hover:text-[#EEF2F9] outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-ink)]/50 rounded"
          >
            ¿Buscabas sistemas a medida?
          </Link>
        </Reveal>
      </section>

      <Sintomas z={11} />

      <Proceso
        z={12}
        pasos={servicio.pasos}
        rotulo="Cómo trabajo"
        titulo={<>Tu web online en <Highlight delay={300}>4 días hábiles.</Highlight></>}
        bajada={
          <>
            <Highlight>El reloj arranca cuando me pasás el contenido.</Highlight> De ahí en
            adelante, me ocupo yo.
          </>
        }
      >
        <Reveal
          as="div"
          delayMs={200}
          className="mt-10 border border-[#1E2A44] rounded-[12px] bg-[#05070F] px-7 py-6"
        >
          <p className="font-semibold text-[#EEF2F9] text-[15px]">
            El dominio siempre queda a tu nombre.
          </p>
          <p className="text-[#7C89A3] text-[14px] mt-2 leading-relaxed">
            Tu web es tuya. Si mañana querés seguir con otra persona, te la llevás. Nadie te la
            retiene.
          </p>
        </Reveal>
      </Proceso>

      <PruebaSocial
        z={13}
        filtrar="webs"
        titulo="Lo que dicen los clientes"
        bajada="Negocios que ya tenían tráfico y no lo estaban convirtiendo."
      />

      <Faq faqs={servicio.faqs} pageUrl={URL_PAGINA} titulo="Preguntas sobre webs" z={14} />

      <Cierre
        z={15}
        contexto="webs"
        titulo={<>¿Querés una web que <Highlight delay={400}>traiga clientes?</Highlight></>}
        bajada="Contame de tu negocio. En 30 minutos de llamada te digo qué haría y cuánto saldría. Sin costo, sin compromiso."
      />
    </>
  );
}
