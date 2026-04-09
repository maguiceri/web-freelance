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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

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
        setIsMenuOpen(false);
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
      className={`sticky top-0 z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="relative bg-slate-950/40 backdrop-blur border-b border-white/10" aria-label="Primary">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="#top"
              className="inline-block rounded-md text-2xl font-bold tracking-tight bg-gradient-to-r from-teal-300 via-cyan-300 to-sky-300 bg-clip-text text-transparent outline-none transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-teal-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]"
            >
              Magali Cerisola
            </Link>

            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 p-2 text-slate-200 outline-none transition hover:text-teal-200 hover:border-teal-300/40 active:scale-95 focus-visible:ring-2 focus-visible:ring-teal-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5m-16.5 5.25h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>

            <div className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-200/80">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-2 py-1 outline-none transition hover:text-teal-200 focus-visible:text-teal-200 focus-visible:ring-2 focus-visible:ring-teal-400/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {isMenuOpen && (
            <div
              className="md:hidden fixed right-0 top-0 h-dvh w-1/2 min-w-[240px] max-w-[420px] border-l border-white/10 bg-slate-950/85 backdrop-blur-xl shadow-2xl"
              role="dialog"
              aria-label="Mobile navigation"
            >
              <div className="p-4 pt-20">
                <button
                  type="button"
                  className="absolute right-4 top-4 inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 p-2 text-slate-200 hover:text-teal-200 hover:border-teal-300/40 transition"
                  aria-label="Close menu"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="flex flex-col gap-2 text-sm font-medium text-slate-200/85">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-lg px-3 py-2 outline-none transition hover:bg-white/5 hover:text-teal-200 focus-visible:bg-white/10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-400/40"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

