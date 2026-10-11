import LazyVideo from "./LazyVideo";
import type { Trabajo } from "../../../lib/trabajos";

export default function TrabajoCard({ trabajo }: { trabajo: Trabajo }) {
  const label = `Web animada de ${trabajo.cliente}`;
  const enlaces = [
    trabajo.url ? { href: trabajo.url, texto: "Ver web", aria: "Ver la web" } : null,
    trabajo.instagram ? { href: trabajo.instagram, texto: "Instagram", aria: "Ver el Instagram" } : null,
  ].filter((e) => e !== null);

  return (
    <article className="overflow-hidden rounded-[20px] border border-[#1E2A44] bg-[#0B1326]">
      <div className="relative aspect-[16/10] bg-[#0B1326]">
        {trabajo.video ? (
          <LazyVideo video={trabajo.video} poster={trabajo.poster} label={label} />
        ) : (
          // <img> y no next/image: los posters pueden ser SVG y ya vienen al
          // tamaño de la tarjeta, no hay nada que optimizar.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={trabajo.poster}
            alt={label}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </div>

      <div className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-6 lg:py-5">
        <div className="min-w-0">
          <h3 className="font-display text-[clamp(19px,2vw,24px)] font-semibold leading-tight tracking-[-0.02em] text-[#EEF2F9]">
            {trabajo.cliente}
          </h3>
          <p className="mt-1 text-[14px] text-[#7C89A3]">{trabajo.rubro}</p>
        </div>

        {enlaces.length ? (
          <div className="flex shrink-0 flex-wrap gap-2 sm:justify-end">
            {enlaces.map((e) => (
              <a
                key={e.href}
                href={e.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${e.aria} de ${trabajo.cliente} (se abre en otra pestaña)`}
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-[10px] border border-[#1E2A44] px-4 text-[14px] font-semibold text-[var(--accent-ink)] outline-none transition-colors duration-200 hover:border-[var(--accent)] hover:text-[#EEF2F9] focus-visible:ring-2 focus-visible:ring-[var(--accent-ink)]"
              >
                {e.texto} <span aria-hidden>↗</span>
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
