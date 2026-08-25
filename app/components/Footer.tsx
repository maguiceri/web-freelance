import Link from "next/link";
import { IDENTITY, SERVICIOS } from "../lib/content";

export default function Footer() {
  return (
    <footer className="relative z-[20] border-t border-[#1E2A44] py-10 bg-[#05070F]">
      <div className="mx-auto max-w-[1080px] px-[4vw] flex flex-wrap items-start justify-between gap-8 text-[13px] text-[#7C89A3]">
        <div className="min-w-[220px]">
          <p className="font-semibold text-[#EEF2F9]">{IDENTITY.name}</p>
          <p className="mt-1 max-w-[38ch] leading-relaxed">
            {IDENTITY.jobTitle} en {IDENTITY.locality}. Trabajo remoto con negocios de{" "}
            {IDENTITY.areaServed}.
          </p>
        </div>

        <nav aria-label="Servicios" className="flex flex-col gap-2">
          <span className="text-[11px] uppercase tracking-[0.14em] text-[#5C6880]">Servicios</span>
          {SERVICIOS.map((s) => (
            <Link
              key={s.slug}
              href={`/${s.slug}`}
              className="hover:text-[#EEF2F9] transition outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-ink)]/50 rounded"
            >
              {s.nav}
            </Link>
          ))}
        </nav>

        <nav aria-label="Redes" className="flex flex-col gap-2">
          <span className="text-[11px] uppercase tracking-[0.14em] text-[#5C6880]">Contacto</span>
          <a
            href={`mailto:${IDENTITY.email}`}
            className="hover:text-[#EEF2F9] transition outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-ink)]/50 rounded"
          >
            {IDENTITY.email}
          </a>
          {IDENTITY.sameAs.map((url) => (
            <Link
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#EEF2F9] transition outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-ink)]/50 rounded capitalize"
            >
              {new URL(url).hostname.replace("www.", "").split(".")[0]}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mx-auto max-w-[1080px] px-[4vw] mt-8 pt-6 border-t border-[#1E2A44] text-[12px] text-[#5C6880]">
        <span suppressHydrationWarning>&copy; {new Date().getFullYear()} {IDENTITY.name}</span>
      </div>
    </footer>
  );
}
