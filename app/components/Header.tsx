"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
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
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-px bg-gradient-to-r from-transparent via-teal-400/45 to-transparent"
      />

      <nav className="relative z-[2] mx-auto max-w-6xl px-3 pt-3 pb-2 sm:px-4 md:px-5 md:pt-4" aria-label="Primary">
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/12 bg-slate-950/65 px-3 py-2.5 shadow-[0_16px_50px_-28px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl sm:gap-4 sm:px-4 sm:py-3 md:px-5">
          <Link
            href="#top"
            className="group flex min-w-0 flex-col gap-0.5 rounded-lg px-1 py-0.5 outline-none transition hover:opacity-95 focus-visible:ring-2 focus-visible:ring-teal-400/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]"
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.26em] text-slate-500 transition group-hover:text-teal-400/85 sm:text-[11px]">
              Fullstack
            </span>
            <span className="bg-gradient-to-r from-teal-200 via-cyan-200 to-sky-200 bg-clip-text text-lg font-bold tracking-tight text-transparent sm:text-xl">
              Magali Cerisola
            </span>
          </Link>

          <button
            type="button"
            className="inline-flex shrink-0 items-center justify-center rounded-xl border border-white/14 bg-white/[0.06] p-2.5 text-slate-200 outline-none transition hover:border-teal-400/35 hover:bg-teal-500/10 hover:text-teal-100 active:scale-95 focus-visible:ring-2 focus-visible:ring-teal-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816] md:hidden"
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

          <div className="hidden items-center gap-0.5 rounded-full border border-white/[0.07] bg-white/[0.04] p-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-pill-link rounded-full px-3.5 py-2 text-[13px] font-medium text-slate-300/90 outline-none transition hover:bg-white/[0.08] hover:text-white focus-visible:text-white focus-visible:ring-2 focus-visible:ring-teal-400/45 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                {item.label}
              </Link>
            ))}
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
                  className="inline-flex items-center justify-center rounded-xl border border-white/14 bg-white/[0.06] p-2 text-slate-200 outline-none transition hover:border-teal-400/35 hover:text-teal-100 focus-visible:ring-2 focus-visible:ring-teal-400/50"
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
                    className="nav-drawer-link flex w-full touch-manipulation items-center justify-center rounded-full border border-white/14 bg-slate-900/55 px-5 py-3.5 text-[15px] font-semibold tracking-wide text-slate-200/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] outline-none transition-[color,background-color,border-color,box-shadow] duration-200 hover:border-teal-400/45 hover:bg-teal-500/[0.12] hover:text-teal-50 hover:shadow-[0_0_0_1px_rgba(45,212,191,0.15),inset_0_1px_0_rgba(255,255,255,0.08)] active:border-teal-400/60 active:bg-teal-500/25 active:text-teal-100 active:shadow-[0_0_20px_-8px_rgba(45,212,191,0.45)] focus-visible:ring-2 focus-visible:ring-teal-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    onClick={() => startCloseMobileMenu()}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="mt-auto border-t border-white/10 px-4 py-5">
                <p className="text-xs leading-relaxed text-slate-500">Scroll the page or pick a section above.</p>
              </div>
            </div>
          </>
        ) : null}
      </nav>
    </header>
  );
}
