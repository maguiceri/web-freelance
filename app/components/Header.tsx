"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const WA =
  "https://wa.me/5491178230346?text=" +
  encodeURIComponent("Hola Magali, vi tu web y quiero consultarte.");

const navItems = [
  { href: "#trabajos", label: "Trabajos" },
  { href: "#proceso", label: "Proceso" },
  { href: "#testimonios", label: "Testimonios" },
];

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  /** Mobile drawer: keep mounted during "closing" so exit CSS can run */
  const [mobileNav, setMobileNav] = useState<"idle" | "open" | "closing">("idle");

  const isDrawerMounted = mobileNav !== "idle";
  const isClosing = mobileNav === "closing";

  const openMobileMenu = () => setMobileNav("open");
  const startCloseMobileMenu = () => setMobileNav((s) => (s === "open" ? "closing" : s));

  useEffect(() => {
    if (isDrawerMounted) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
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

      if (currentY <= 80) {
        setIsVisible(true);
      } else {
        setIsVisible(currentY < lastY);
      }

      lastY = currentY;
    };

    const onResize = () => {
      if (window.innerWidth >= 768) {
        setMobileNav("idle");
      }
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
      className={`sticky top-0 z-50 overflow-visible transition-transform duration-200 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-px bg-gradient-to-r from-transparent via-blue-400/45 to-transparent"
      />

      <nav className="relative z-[2] mx-auto max-w-6xl px-3 pt-3 pb-2 sm:px-4 md:px-5 md:pt-4" aria-label="Primary">
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/12 bg-slate-950/65 px-3 py-2.5 shadow-[0_16px_50px_-28px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl sm:gap-4 sm:px-4 sm:py-3 md:px-5">
          <Link
            href="#top"
            aria-label="Back to top of page"
            className="group flex min-w-0 flex-col gap-0.5 rounded-lg px-1 py-0.5 outline-none transition hover:opacity-95 focus-visible:ring-2 focus-visible:ring-blue-400/55 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            onClick={(e) => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
              e.preventDefault();
              const instant = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
              window.scrollTo({ top: 0, left: 0, behavior: instant ? "auto" : "smooth" });
              const path = window.location.pathname || "/";
              if (window.location.hash) {
                window.history.replaceState(null, "", path);
              }
            }}
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.26em] text-slate-500 transition group-hover:text-blue-400/85 sm:text-[11px]">
              Fullstack
            </span>
            <span className="bg-gradient-to-r from-slate-100 via-blue-200 to-blue-300 bg-clip-text text-lg font-light tracking-tight text-transparent sm:text-xl">
              Magali Cerisola
            </span>
          </Link>

          <button
            type="button"
            className="inline-flex shrink-0 items-center justify-center rounded-xl border border-white/14 bg-white/[0.06] p-2.5 text-slate-200 outline-none transition hover:border-blue-400/35 hover:bg-blue-500/10 hover:text-blue-100 active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileNav === "open"}
            onClick={() => {
              if (mobileNav === "closing") return;
              if (mobileNav === "open") startCloseMobileMenu();
              else openMobileMenu();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
              aria-hidden
            >
              {mobileNav === "open" || mobileNav === "closing" ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5m-16.5 5.25h16.5m-16.5 5.25h16.5"
                />
              )}
            </svg>
          </button>

          <div className="hidden items-center gap-1 md:flex">
            <div className="flex items-center gap-0.5 rounded-full border border-white/[0.07] bg-white/[0.04] p-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-pill-link rounded-full px-3.5 py-2 text-[13px] font-medium text-slate-300/90 outline-none transition hover:bg-white/[0.08] hover:text-white focus-visible:text-white focus-visible:ring-2 focus-visible:ring-blue-400/45 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <Link
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => (window as any).ttq?.track("Contact")}
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-[13px] font-semibold text-white shadow-[0_4px_16px_rgba(37,211,102,0.28)] outline-none transition hover:brightness-110 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-green-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
              </svg>
              Escribime
            </Link>
          </div>
        </div>

        {isDrawerMounted ? (
          <>
            <button
              type="button"
              className={`nav-mobile-overlay fixed inset-0 z-[60] bg-slate-950/55 backdrop-blur-sm md:hidden ${isClosing ? "nav-mobile-overlay--exit" : ""}`}
              aria-label="Close menu"
              onClick={() => startCloseMobileMenu()}
            />
            <div
              className={`nav-drawer-panel fixed right-0 top-0 z-[70] flex h-dvh w-[min(100%,22rem)] flex-col border-l border-white/12 bg-slate-950/92 shadow-[-24px_0_60px_-20px_rgba(0,0,0,0.85)] backdrop-blur-2xl md:hidden ${isClosing ? "nav-drawer-panel--exit" : ""}`}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Menu</p>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-xl border border-white/14 bg-white/[0.06] p-2 text-slate-200 outline-none transition hover:border-blue-400/35 hover:text-blue-100 focus-visible:ring-2 focus-visible:ring-blue-400/50"
                  aria-label="Close menu"
                  onClick={() => startCloseMobileMenu()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                    aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col gap-2.5 px-4 py-6">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="nav-drawer-link flex w-full touch-manipulation items-center justify-center rounded-full border border-white/14 bg-slate-900/55 px-5 py-3.5 text-[15px] font-medium tracking-wide text-slate-200/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] outline-none transition-[color,background-color,border-color,box-shadow] duration-200 hover:border-blue-400/45 hover:bg-blue-500/[0.12] hover:text-blue-50 hover:shadow-[0_0_0_1px_rgba(59,130,246,0.15),inset_0_1px_0_rgba(255,255,255,0.08)] active:border-blue-400/60 active:bg-blue-500/25 active:text-blue-100 active:shadow-[0_0_20px_-8px_rgba(59,130,246,0.45)] focus-visible:ring-2 focus-visible:ring-blue-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
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
                  onClick={() => {
                    (window as any).ttq?.track("Contact");
                    startCloseMobileMenu();
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-[15px] font-semibold text-white shadow-[0_4px_20px_rgba(37,211,102,0.3)] outline-none transition hover:brightness-110 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-green-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5" aria-hidden>
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
