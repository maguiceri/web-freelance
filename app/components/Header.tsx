"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import LogoMark from "./LogoMark";
import { SERVICIOS, waLink } from "../lib/content";

const WA = waLink("general");

const navItems = [
  ...SERVICIOS.map((s) => ({ href: `/${s.slug}`, label: s.nav })),
  { href: "/#quien-soy", label: "Quién soy" },
  { href: "/#casos", label: "Casos" },
];

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  /** El drawer sigue montado durante "closing" para que corra la animación de salida. */
  const [mobileNav, setMobileNav] = useState<"idle" | "open" | "closing">("idle");

  const isDrawerMounted = mobileNav !== "idle";
  const isClosing = mobileNav === "closing";

  const openMobileMenu = () => setMobileNav("open");
  const startCloseMobileMenu = () => setMobileNav((s) => (s === "open" ? "closing" : s));

  useEffect(() => {
    document.body.style.overflow = isDrawerMounted ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerMounted]);

  useEffect(() => {
    if (mobileNav !== "closing") return;
    const id = window.setTimeout(() => setMobileNav("idle"), 260);
    return () => window.clearTimeout(id);
  }, [mobileNav]);

  useEffect(() => {
    if (!isDrawerMounted) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") startCloseMobileMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isDrawerMounted]);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      if (currentY <= 80) setIsVisible(true);
      else setIsVisible(currentY < lastY);
      lastY = currentY;
    };

    const onResize = () => {
      if (window.innerWidth >= 768) setMobileNav("idle");
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-[rgba(5,7,15,0.82)] backdrop-blur-[14px] border-b border-[#1E2A44] transition-transform duration-200 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="relative z-[2] mx-auto max-w-[1080px] px-[4vw] py-4" aria-label="Principal">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            aria-label="Inicio — Magali Cerisola"
            className="outline-none transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[var(--accent-ink)]/60 rounded shrink-0"
          >
            <LogoMark height={52} />
          </Link>

          {/* Nav de escritorio */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-[14px] font-medium text-[#7C89A3] rounded-lg outline-none transition-colors duration-200 hover:text-[#EEF2F9] focus-visible:ring-2 focus-visible:ring-[var(--accent-ink)]/50"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            className="inline-flex shrink-0 items-center justify-center p-2 outline-none active:scale-95 focus-visible:ring-2 focus-visible:ring-[var(--accent-ink)]/60 rounded-lg md:hidden"
            aria-label={mobileNav === "open" ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileNav === "open"}
            onClick={() => {
              if (mobileNav === "closing") return;
              if (mobileNav === "open") startCloseMobileMenu();
              else openMobileMenu();
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--accent-ink)"
              strokeWidth="2"
              strokeLinecap="round"
              className="h-6 w-6"
              aria-hidden
            >
              {mobileNav === "open" || mobileNav === "closing" ? (
                <path d="M6 18 18 6M6 6l12 12" />
              ) : (
                <>
                  <line x1="3" y1="7" x2="21" y2="7" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="17" x2="21" y2="17" />
                </>
              )}
            </svg>
          </button>

          <Link
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-block shrink-0 bg-[var(--accent)] text-white font-semibold text-[14px] px-[18px] py-[10px] rounded-[8px] outline-none transition-colors duration-200 hover:bg-[var(--accent-hover)] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[var(--accent-ink)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070F]"
          >
            Escribime
          </Link>
        </div>

        {isDrawerMounted ? (
          <>
            <button
              type="button"
              className={`nav-mobile-overlay fixed inset-0 z-[60] bg-slate-950/55 backdrop-blur-sm md:hidden ${isClosing ? "nav-mobile-overlay--exit" : ""}`}
              aria-label="Cerrar menú"
              onClick={() => startCloseMobileMenu()}
            />
            <div
              className={`nav-drawer-panel fixed right-0 top-0 z-[70] flex h-dvh w-[min(100%,22rem)] flex-col border-l border-[#1E2A44] bg-slate-950/92 backdrop-blur-2xl md:hidden ${isClosing ? "nav-drawer-panel--exit" : ""}`}
              role="dialog"
              aria-modal="true"
              aria-label="Navegación"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Menú</p>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-xl border border-[#1E2A44] bg-white/[0.06] p-2 text-slate-200 outline-none transition-colors hover:border-[var(--accent)] hover:text-[#EEF2F9] focus-visible:ring-2 focus-visible:ring-[var(--accent-ink)]/50"
                  aria-label="Cerrar menú"
                  onClick={() => startCloseMobileMenu()}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex flex-col gap-2.5 px-4 py-6">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="nav-drawer-link flex w-full touch-manipulation items-center justify-center rounded-full border border-[#1E2A44] bg-slate-900/55 px-5 py-3.5 text-[15px] font-medium tracking-wide text-slate-200/95 outline-none transition-colors duration-200 hover:border-[var(--accent)] hover:bg-[var(--accent)]/15 hover:text-[#EEF2F9] active:bg-[var(--accent)]/25 focus-visible:ring-2 focus-visible:ring-[var(--accent-ink)]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    onClick={() => startCloseMobileMenu()}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="mt-auto border-t border-white/10 px-4 py-5 flex flex-col gap-3">
                <Link
                  href={WA}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => startCloseMobileMenu()}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-[15px] font-semibold text-white outline-none transition-[filter,transform] hover:brightness-110 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-green-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                  </svg>
                  Escribime por WhatsApp
                </Link>
                <p className="text-xs text-slate-600 text-center">Diagnóstico gratis · Sin compromiso</p>
              </div>
            </div>
          </>
        ) : null}
      </nav>
    </header>
  );
}
