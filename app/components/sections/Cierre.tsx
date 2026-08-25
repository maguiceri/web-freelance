"use client";

import Link from "next/link";
import { useState } from "react";
import Reveal from "../Reveal";
import Highlight from "../Highlight";
import ContactForm from "../ContactForm";
import { IDENTITY, waLink, type Servicio } from "../../lib/content";

function IconWA() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

/**
 * Cierre con dos vías de contacto.
 *
 * WhatsApp es la vía rápida; el formulario existía en el repo pero no estaba
 * conectado a ninguna página. En Sistemas viene abierto por defecto, porque ahí
 * el perfil de cliente suele preferir dejar un mail antes que whatsappear.
 */
export default function Cierre({
  contexto = "general",
  titulo,
  bajada,
  z = 15,
}: {
  contexto?: Servicio["slug"] | "general";
  titulo?: React.ReactNode;
  bajada?: string;
  z?: number;
}) {
  const [formAbierto, setFormAbierto] = useState(contexto === "sistemas");

  const wa = waLink(contexto);

  return (
    <section
      id="contacto"
      style={{ zIndex: z }}
      className="relative stack-card border border-[#1E2A44] bg-[#05070F] py-[clamp(72px,10vw,130px)] scroll-mt-20"
    >
      <div className="mx-auto max-w-[1080px] px-[4vw] text-center">
        <Reveal
          as="h2"
          direction="fade"
          className="font-display font-extrabold text-[clamp(28px,4vw,44px)] tracking-[-0.03em] leading-[1.12] max-w-[20ch] mx-auto text-[#EEF2F9]"
        >
          {titulo ?? (
            <>
              ¿Empezamos por <Highlight delay={400}>tu presupuesto?</Highlight>
            </>
          )}
        </Reveal>

        <Reveal as="p" delayMs={80} className="text-[#7C89A3] mt-[18px] max-w-[52ch] mx-auto text-[17px]">
          {bajada ??
            "Contame de tu negocio. En 30 minutos de llamada te digo qué haría y cuánto saldría. Sin costo, sin compromiso."}
        </Reveal>

        <Reveal as="div" delayMs={160}>
          <Link
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-[36px] inline-flex items-center gap-[10px] bg-[var(--accent)] text-white font-semibold text-[16px] px-[34px] py-[17px] rounded-[11px] outline-none transition-colors duration-200 hover:bg-[var(--accent-hover)] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[var(--accent-ink)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070F]"
          >
            <IconWA />
            Quiero mi presupuesto
          </Link>

          <p className="mt-[18px] text-[13px] text-[#7C89A3]">
            {formAbierto ? "O si preferís, escribime directo:" : "¿Preferís no usar WhatsApp?"}{" "}
            {!formAbierto && (
              <button
                type="button"
                onClick={() => setFormAbierto(true)}
                aria-expanded={formAbierto}
                aria-controls="form-contacto"
                className="underline underline-offset-4 text-[var(--accent-ink)] transition hover:text-[#EEF2F9] outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-ink)]/50 rounded"
              >
                Escribime por mail
              </button>
            )}
          </p>
        </Reveal>

        {formAbierto && (
          <div id="form-contacto" className="mx-auto mt-8 max-w-[520px] text-left">
            <ContactForm contexto={contexto} />
            <p className="mt-5 text-center text-[13px] text-[#7C89A3]">
              O directo a{" "}
              <a
                href={`mailto:${IDENTITY.email}`}
                className="underline underline-offset-4 transition hover:text-[#EEF2F9]"
              >
                {IDENTITY.email}
              </a>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
