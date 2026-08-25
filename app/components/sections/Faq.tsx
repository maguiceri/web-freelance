import Reveal from "../Reveal";
import { faqSchema } from "../../lib/schema";
import type { Faq } from "../../lib/content";

/**
 * FAQ visible + marcado FAQPage.
 *
 * Usa <details>/<summary> nativos: funciona sin JavaScript, que es justo lo que
 * necesitan los crawlers que no ejecutan JS. El texto de la respuesta está en
 * el HTML aunque el acordeón esté cerrado.
 */
export default function Faq({
  faqs,
  pageUrl,
  titulo = "Preguntas frecuentes",
  z = 14,
}: {
  faqs: Faq[];
  pageUrl: string;
  titulo?: string;
  z?: number;
}) {
  return (
    <section
      id="faq"
      style={{ zIndex: z }}
      className="relative stack-card border border-[#1E2A44] bg-[#080E1C] py-[clamp(72px,10vw,130px)] scroll-mt-20"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs, pageUrl)) }}
      />
      <div className="mx-auto max-w-[1080px] px-[4vw]">
        <Reveal
          as="h2"
          direction="left"
          className="font-display font-extrabold text-[clamp(28px,4vw,44px)] tracking-[-0.03em] leading-[1.12] text-[#EEF2F9]"
        >
          {titulo}
        </Reveal>

        <div className="mt-[40px] divide-y divide-[#1E2A44] border-y border-[#1E2A44]">
          {faqs.map((f, i) => (
            <Reveal as="div" key={f.q} delayMs={i * 60}>
              <details className="faq-item group">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-ink)]/50 rounded">
                  <h3 className="font-display font-semibold text-[clamp(17px,2vw,20px)] leading-snug text-[#EEF2F9]">
                    {f.q}
                  </h3>
                  <span
                    aria-hidden
                    className="mt-1 shrink-0 text-[var(--accent-ink)] transition-transform duration-200 group-open:rotate-45"
                  >
                    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" d="M8 3v10M3 8h10" />
                    </svg>
                  </span>
                </summary>
                <p className="pb-6 pr-10 text-[16px] leading-relaxed text-[#7C89A3] max-w-[70ch]">
                  {f.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
