// page.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import Reveal from "./components/Reveal";
import ContactForm from "./components/ContactForm";
import Header from "./components/Header";
import { useState, useEffect, useRef } from "react";

const SERVICE_CARDS = [
  {
    title: "Custom Website Development",
    body: "I build modern, high-quality websites from scratch tailored to your business needs. Clean code, scalable architecture, and a strong focus on user experience.",
  },
  {
    title: "Responsive & Mobile-First Design",
    body: "Your website will look and work perfectly across all devices - mobile, tablet, and desktop - ensuring a seamless user experience everywhere.",
  },
  {
    title: "Pixel-Perfect UI Implementation",
    body: "I transform your designs (Figma or similar) into clean, accurate, and interactive interfaces with attention to detail in layout, spacing, and typography.",
  },
  {
    title: "Performance & UX Optimization",
    body: "I optimize your website for speed, smooth interactions, and better user experience, improving load times and overall usability.",
  },
  {
    title: "Ongoing Maintenance & Support",
    body: "I provide continuous support, updates, and improvements to keep your website secure, up to date, and running smoothly.",
  },
  {
    title: "Hosting & Deployment Setup",
    body: "I handle deployment and hosting setup so your website is live, secure, and accessible with reliable performance.",
  },
  {
    title: "Website Review & Improvements",
    body: "I analyze your existing website and provide actionable improvements in design, performance, and usability.",
  },
] as const;

function IconReact() {
  return (
    <svg viewBox="0 0 24 24" className="h-[13px] w-[13px]" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="1.85" className="fill-current" />
      <ellipse cx="12" cy="12" rx="10" ry="3.95" stroke="currentColor" strokeWidth="1.25" className="opacity-[0.92]" />
      <ellipse cx="12" cy="12" rx="10" ry="3.95" stroke="currentColor" strokeWidth="1.25" className="opacity-[0.92]" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="3.95" stroke="currentColor" strokeWidth="1.25" className="opacity-[0.92]" transform="rotate(120 12 12)" />
    </svg>
  );
}

function IconNext() {
  return (
    <svg viewBox="0 0 24 24" className="h-[13px] w-[13px]" fill="currentColor" aria-hidden>
      <path d="M8.25 6.75h2.2l5.85 9.9V6.75h1.95v10.5h-2.15l-5.9-9.95v9.95H8.25V6.75Z" />
    </svg>
  );
}

function IconTypeScript() {
  return (
    <svg viewBox="0 0 24 24" className="h-[13px] w-[13px]" aria-hidden>
      <rect x="4.75" y="4.75" width="14.5" height="14.5" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.35" />
      <text
        x="12"
        y="15.75"
        textAnchor="middle"
        fill="currentColor"
        fontSize="8.25"
        fontWeight="700"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        TS
      </text>
    </svg>
  );
}

function IconTailwind() {
  return (
    <svg viewBox="0 0 24 24" className="h-[13px] w-[13px]" fill="currentColor" aria-hidden>
      <path d="M12 6.25c-2.05 0-3.33 1.02-3.8 3.08.78-1.02 1.68-1.4 2.72-1.12.52.13.88.48 1.3.88.48.5 1.04 1.08 2.28 1.08 2.05 0 3.33-1.02 3.8-3.08-.78 1.02-1.68 1.4-2.72 1.12-.52-.13-.88-.48-1.3-.88-.48-.5-1.04-1.08-2.28-1.08zm-3.8 5.42c-.78 1.02-1.68 1.4-2.72 1.12-.52-.13-.88-.48-1.3-.88-.48-.5-1.04-1.08-2.28-1.08-2.05 0-3.33 1.02-3.8 3.08.78-1.02 1.68-1.4 2.72-1.12.52.13.88.48 1.3.88.48.5 1.04 1.08 2.28 1.08 2.05 0 3.33-1.02 3.8-3.08z" />
    </svg>
  );
}

const HERO_STACK = [
  { label: "React", pillClass: "hero-stack-pill--react", Icon: IconReact },
  { label: "Next.js", pillClass: "hero-stack-pill--next", Icon: IconNext },
  { label: "TypeScript", pillClass: "hero-stack-pill--ts", Icon: IconTypeScript },
  { label: "Tailwind CSS", pillClass: "hero-stack-pill--tailwind", Icon: IconTailwind },
] as const;


export default function Home() {
  const [showHeader, setShowHeader] = useState(true);
  const [heroVideoMounted, setHeroVideoMounted] = useState(false);
  const [heroVideoReady, setHeroVideoReady] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let cancelled = false;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (nav.connection?.saveData) {
      return;
    }

    const enable = () => {
      if (!cancelled) setHeroVideoMounted(true);
    };

    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (typeof w.requestIdleCallback === "function") {
      const id = w.requestIdleCallback(enable, { timeout: 1800 });
      return () => {
        cancelled = true;
        w.cancelIdleCallback?.(id);
      };
    }

    const t = window.setTimeout(enable, 500);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
  
      if (currentScrollY < lastScrollY.current) {
        setShowHeader(true); // SUBE → aparece
      } else {
        setShowHeader(false); // BAJA → desaparece
      }
  
      if (currentScrollY === 0) {
        setShowHeader(true); // arriba del todo → siempre visible
      }
  
      lastScrollY.current = currentScrollY;
    };
  
    window.addEventListener("scroll", handleScroll);
  
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id="main-content"
      tabIndex={-1}
      className="min-h-screen text-slate-900 relative overflow-hidden outline-none"
    >
        <div className={`fixed top-0 left-0 w-full z-50 transition-transform duration-200 ${showHeader ? "translate-y-0" : "-translate-y-full"}`}>
  <Header />
</div>
      {/* Video tal cual el archivo; opacidad moderada + velo ligero para legibilidad */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_90%_at_50%_-25%,rgba(45,212,191,0.1),transparent_55%),radial-gradient(ellipse_70%_55%_at_100%_20%,rgba(56,189,248,0.07),transparent_50%),#050816]" />

        {heroVideoMounted ? (
          <video
            className={`absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 scale-105 object-cover opacity-0 ${heroVideoReady ? "hero-video-ready" : ""}`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedData={() => setHeroVideoReady(true)}
          >
            <source src="/14134130_1920_1080_30fps.mp4" type="video/mp4" />
          </video>
        ) : null}

        <div className="absolute inset-0 bg-gradient-to-b from-[#050816]/62 via-[#050816]/28 to-[#050816]/68" />
        <div className="absolute inset-0 bg-[#050816]/14" />

        <div className="blob-drift absolute -top-32 left-[5%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.16),transparent_62%)] blur-3xl" />
        <div className="blob-drift-slow absolute bottom-[5%] right-[-5%] h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.11),transparent_62%)] blur-3xl" />
      </div>
     

      {/* Hero: full viewport feel, glass panel + portrait */}
      <section
        id="top"
        className="relative isolate mx-auto flex min-h-[calc(100dvh-5rem)] max-w-6xl scroll-mt-28 flex-col justify-center px-4 pb-16 pt-24 text-slate-100 md:min-h-[calc(100dvh-4rem)] md:pb-24 md:pt-28"
      >
        <div
          aria-hidden
          className="hero-grid-bg pointer-events-none absolute inset-0 -z-[1]"
        />

        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
          <div
            style={{ animationDelay: "0.08s" }}
            className="fadeDown hero-glass-panel relative overflow-hidden rounded-[1.75rem] p-8 backdrop-blur-xl md:rounded-2xl md:p-10"
          >
            <span className="hero-glass-panel-corner hero-glass-panel-corner--tl" aria-hidden />
            <span className="hero-glass-panel-corner hero-glass-panel-corner--br" aria-hidden />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-teal-400/15 blur-3xl md:h-72 md:w-72"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-sky-400/12 blur-3xl"
            />

            <p
              style={{ animationDelay: "0.14s" }}
              className="hero-kicker fadeDown relative mb-5 inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-500/[0.12] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-100/95 sm:text-[11px] sm:tracking-[0.22em]"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400 shadow-[0_0_12px_rgb(45,212,191)]" />
              Available for freelance
            </p>

            <h1
              style={{ animationDelay: "0.2s" }}
              className="fadeDown relative text-balance font-semibold tracking-tight"
            >
              <span className="block text-sm font-medium uppercase tracking-[0.18em] text-slate-400/95">
                Magali Cerisola
              </span>
              <span className="hero-title-gradient mt-3 block text-[2.1rem] font-extrabold leading-[1.06] sm:text-5xl md:text-6xl lg:text-[3.35rem] lg:leading-[1.05]">
                Interfaces that feel fast, clear, and human
              </span>
              <span className="mt-5 block max-w-xl text-base leading-relaxed text-slate-300/92 sm:text-lg">
                Frontend developer focused on React, Next.js, and TypeScript. I turn designs into resilient UI, smooth
                motion, and accessible UX—so your product feels as good as it looks.
              </span>
            </h1>

            <ul
              style={{ animationDelay: "0.28s" }}
              className="fadeDown relative mt-7 flex flex-wrap gap-2.5 sm:gap-3"
              aria-label="Core stack"
            >
              {HERO_STACK.map((item, i) => {
                const Icon = item.Icon;
                return (
                  <li
                    key={item.label}
                    className={`hero-stack-pill ${item.pillClass} text-xs sm:text-[13px]`}
                    style={{ animationDelay: `${i * 0.22}s` }}
                  >
                    <span className="hero-stack-pill-icon">
                      <Icon />
                    </span>
                    <span className="hero-stack-pill-label">{item.label}</span>
                  </li>
                );
              })}
            </ul>

            <p style={{ animationDelay: "0.34s" }} className="fadeDown relative mt-5 text-sm leading-relaxed text-slate-400/95 sm:text-[15px]">
              +5 years shipping production work—from marketing sites to data-heavy dashboards.
            </p>

            <div style={{ animationDelay: "0.42s" }} className="fadeDown relative mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 px-7 py-3 text-sm font-semibold text-slate-950 shadow-[0_12px_40px_-18px_rgba(45,212,191,0.55)] outline-none transition duration-150 hover:brightness-110 motion-safe:hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-teal-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:px-8 sm:text-[15px]"
              >
                Start a project
              </Link>
              <Link
                href="#projects"
                className="inline-flex items-center justify-center rounded-full border border-white/18 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-slate-100 outline-none transition duration-150 hover:border-teal-300/35 hover:bg-white/[0.07] focus-visible:ring-2 focus-visible:ring-teal-200/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:px-7 sm:text-[15px]"
              >
                View work
              </Link>
            </div>
          </div>

          <div className="flex justify-center pb-10 lg:justify-end">
            <div style={{ animationDelay: "0.18s" }} className="fadeDown relative">
              <div
                aria-hidden
                className="blob-drift-slow absolute left-1/2 top-1/2 h-[min(28rem,85vw)] w-[min(28rem,85vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.22),transparent_68%)] blur-2xl"
              />
              <div className="relative mx-auto w-[min(20rem,88vw)] sm:w-72 md:w-80">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-1 rounded-[2.15rem] bg-gradient-to-br from-teal-400/20 via-transparent to-indigo-500/15 opacity-80 blur-xl motion-reduce:opacity-50"
                />
                <div className="hero-portrait-ring relative">
                  <div className="hero-portrait-inner">
                    <div className="overflow-hidden rounded-[1.65rem] ring-1 ring-white/12">
                      <Image
                        src="/avatar.jpeg"
                        alt="Portrait of Magali Cerisola"
                        width={320}
                        height={320}
                        className="aspect-square w-full object-cover"
                        priority
                        sizes="(max-width: 768px) 88vw, 320px"
                      />
                    </div>
                  </div>
                </div>
                <div className="pointer-events-none absolute -bottom-1 left-1/2 z-10 w-[max(12rem,85%)] -translate-x-1/2 translate-y-1/2 rounded-full border border-teal-400/35 bg-slate-950/85 px-4 py-1.5 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-100/95 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.6)] backdrop-blur-md sm:text-[11px]">
                  Frontend · UI
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="max-w-6xl mx-auto scroll-mt-28 px-4 py-20 text-slate-100">
        <Reveal as="h2" delayMs={0} className="text-center text-2xl font-semibold mb-4 text-slate-100">
          Services
        </Reveal>
        <Reveal
          as="p"
          delayMs={150}
          className="mx-auto max-w-2xl text-center text-slate-200/75 text-lg mb-12"
        >
          From idea to production, I help you ship user-friendly interfaces with consistent design and strong UX.
        </Reveal>

        <div className="flex flex-wrap justify-center gap-8">
          {SERVICE_CARDS.map((card, i) => (
            <Reveal
              key={card.title}
              as="article"
              delayMs={90 + i * 38}
              className="card-tile card-tile-shine group relative w-full max-w-sm rounded-2xl border border-white/10 bg-slate-950/40 p-6 text-left shadow-[0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur motion-safe:hover:border-teal-400/20 motion-safe:hover:bg-slate-950/55"
            >
              <div className="service-card-bob" style={{ animationDelay: `${i * 0.42}s` }}>
                <h3 className="text-lg font-semibold text-teal-200 transition duration-150 group-hover:text-teal-100">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-200/75">{card.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="max-w-5xl mx-auto scroll-mt-28 px-4 py-20 text-slate-100">
        <Reveal as="h2" delayMs={0} className="text-2xl font-semibold mb-10 text-slate-100">
          Projects
        </Reveal>
        <div className="grid gap-8 md:grid-cols-2 md:items-stretch">
          <Reveal
            as="article"
            delayMs={150}
            className="card-tile card-tile-amber group relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl border border-amber-500/25 bg-slate-950/70 p-6 shadow-[0_0_0_1px_rgba(251,191,36,0.08),inset_0_1px_0_0_rgba(255,255,255,0.04)] backdrop-blur motion-safe:hover:border-amber-400/45"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(-33deg, transparent, transparent 12px, rgba(251, 191, 36, 0.9) 12px, rgba(251, 191, 36, 0.9) 13px)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full border border-amber-500/20"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-6 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-amber-500/5 blur-2xl"
            />

            <div className="relative flex items-start justify-between gap-3">
              <div className="inline-flex items-center gap-2 rounded-md border border-amber-500/30 bg-amber-950/40 px-2.5 py-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  className="h-3.5 w-3.5 shrink-0 text-amber-400/90"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 0 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-200/90">
                  Confidential
                </span>
              </div>
              <span className="font-mono text-[10px] leading-none text-slate-500">NDA</span>
            </div>

            <h3 className="relative mt-5 text-lg font-semibold text-slate-100">Banking Platform UI</h3>
            <p className="relative mt-1 text-xs text-amber-200/55">Client work - restricted disclosure</p>

            <div className="relative mt-5 space-y-2.5" aria-hidden>
              <div className="h-2.5 w-full rounded-sm bg-slate-800/90" />
              <div className="h-2.5 w-[92%] rounded-sm bg-slate-800/80" />
 
            </div>

            <p className="relative mt-5 text-[11px] leading-relaxed text-slate-400">
            Contributed to the development and modernization of a large-scale banking platform, building and refactoring complex frontend features using React and modern technologies.

Focused on performance optimization, reusable component architecture, and improving user experience across critical user flows.

Collaborated closely with product, design, and backend teams in an Agile environment.
            </p>

            <p className="relative mt-auto pt-4 font-mono text-[10px] tracking-wide text-slate-600">
              REF: <span className="text-slate-500">XX-XXXX-BANK</span>
            </p>
          </Reveal>
          <Reveal
            as="article"
            delayMs={300}
            className="card-tile group relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] outline-none focus-within:ring-2 focus-within:ring-teal-400/35 focus-within:ring-offset-2 focus-within:ring-offset-[#050816] motion-safe:hover:border-teal-400/25"
          >
            <div className="relative min-h-[240px] w-full min-h-0 flex-1">
              <Image
                src="/proyect.png"
                alt="Featured project screenshot"
                fill
                className="object-cover transition-transform duration-[450ms] ease-out motion-safe:group-hover:scale-[1.04] motion-safe:group-focus-within:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
              />

              {/* Always-on bottom fade so title reads on the image */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent"
              />

              {/* Hover / focus: teal-cyan veil so the image stays slightly visible behind */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-teal-500/25 via-slate-950/55 to-cyan-500/20 opacity-0 backdrop-blur-[0px] transition-all duration-200 group-hover:opacity-100 group-hover:backdrop-blur-[6px] group-focus-within:opacity-100 group-focus-within:backdrop-blur-[6px]"
              />

              <div className="pointer-events-none absolute inset-0 flex flex-col justify-end p-6">
                <div className="pointer-events-auto text-left">
                  <Link
                    href="https://atucasa.net/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-md outline-none transition hover:opacity-95 focus-visible:ring-2 focus-visible:ring-teal-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    aria-label="Import Services Web Application - visit Atucasa (opens in a new tab)"
                  >
                    <h3 className="text-lg font-semibold text-teal-200 drop-shadow-md underline-offset-4 transition group-hover:underline">
                      Import Services Web Application
                    </h3>
                  </Link>
                  <p className="mt-2 max-w-prose text-sm leading-relaxed text-slate-100/95 opacity-0 translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0">
                    Built a responsive web platform for an import services business, including a cost calculator, user
                    authentication, and key sections like services, process, and contact to enhance user experience and
                    conversion.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>


        </div>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-3xl mx-auto scroll-mt-28 px-4 py-16 text-slate-100">
        <div className="card-tile relative rounded-2xl border border-white/10 bg-slate-950/40 p-8 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur motion-safe:hover:border-white/18 md:p-10">
          <Reveal as="h2" delayMs={0} className="text-2xl font-semibold mb-4 text-slate-100">
            About Me
          </Reveal>
          <Reveal as="p" delayMs={150} className="text-slate-200/75 text-lg">
          Hi, I'm Magali Cerisola — a frontend developer with over 5 years of experience building web applications for real businesses, including the banking sector.

I help clients create modern, responsive, and high-quality websites that are fast, easy to use, and designed to deliver results.

My goal is to turn your ideas into a functional and professional product that meets your needs and provides a great experience for your users.

I'm passionate about development and always focused on writing clean, efficient code.

Let’s work together to bring your project to life.
          </Reveal>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="max-w-6xl mx-auto scroll-mt-28 px-4 py-20 text-slate-100">
        <Reveal as="h2" delayMs={0} className="text-center text-2xl font-semibold mb-4 text-slate-100">
          Reviews
        </Reveal>
        <Reveal
          as="p"
          delayMs={150}
          className="mx-auto max-w-2xl text-center text-slate-200/75 text-lg mb-12"
        >
          Here&apos;s what clients say about working together.
        </Reveal>

        <div className="flex flex-wrap justify-center gap-8">
          <Reveal
            as="article"
            delayMs={180}
            className="card-tile card-tile-shine group relative w-full max-w-sm rounded-2xl border border-white/10 bg-slate-950/45 px-8 pb-8 pt-10 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur motion-safe:hover:border-teal-400/30"
          >
              <div className="relative mx-auto mb-6 flex h-24 w-24 shrink-0 items-center justify-center">
                <div
                  aria-hidden
                  className="absolute -inset-2 rounded-full bg-gradient-to-br from-teal-400/50 via-cyan-400/20 to-sky-500/30 opacity-50 blur-lg transition-opacity duration-200 group-hover:opacity-90"
                />
                <Image
                  src="/mar.jpeg"
                  alt="Martina Vega, client review"
                  width={96}
                  height={96}
                  className="relative z-[1] h-24 w-24 rounded-full object-cover ring-2 ring-white/15 ring-offset-2 ring-offset-[#050816] transition-transform duration-200 motion-safe:group-hover:scale-105 group-hover:ring-teal-400/40"
                />
              </div>
              <p className="text-sm leading-relaxed text-slate-200/85">
              “Working with Magali was a great experience. She translated my designs into a clean, pixel-perfect interface while maintaining attention to detail in spacing, typography, and responsiveness. Communication was smooth, and the final result matched the design perfectly.”
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                <Link
                  href="https://linktr.ee/m.dagos?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAdGRleARLpbZleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAafJ-l41L_EfCsd4nxU_CdeBlSX4AbWTgru4REtjrwRtxt_rKGYQQ-ZeYXHPsg_aem_4pDjRnYeDZmv3x2OZyZhQQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md text-sm font-semibold text-teal-200/95 outline-none transition hover:text-teal-100 focus-visible:ring-2 focus-visible:ring-teal-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]"
                  aria-label="Martina Vega on Linktree (opens in a new tab)"
                >
                  <span>Martina Vega</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 shrink-0 text-teal-300/90"
                    aria-hidden
                  >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                </Link>
              </div>
              <p className="text-xs text-slate-400">UI/UX Designer</p>
          </Reveal>

          <Reveal
            as="article"
            delayMs={260}
            className="card-tile card-tile-shine group relative w-full max-w-sm rounded-2xl border border-white/10 bg-slate-950/45 px-8 pb-8 pt-10 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur motion-safe:hover:border-teal-400/30"
          >
              <div className="relative mx-auto mb-6 flex h-24 w-24 shrink-0 items-center justify-center">
                <div
                  aria-hidden
                  className="absolute -inset-2 rounded-full bg-gradient-to-br from-teal-400/50 via-cyan-400/20 to-sky-500/30 opacity-50 blur-lg transition-opacity duration-200 group-hover:opacity-90"
                />
                <Image
                  src="/fran.jpeg"
                  alt="Francisco Piaggio, client review"
                  width={96}
                  height={96}
                  className="relative z-[1] h-24 w-24 rounded-full object-cover ring-2 ring-white/15 ring-offset-2 ring-offset-[#050816] transition-transform duration-200 motion-safe:group-hover:scale-105 group-hover:ring-teal-400/40"
                />
              </div>
              <p className="text-sm leading-relaxed text-slate-200/85">
              “Magali writes clean, maintainable code and has a strong grasp of modern frontend practices. She builds reusable components and always pays attention to performance and detail.”
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                <Link
                  href="https://www.linkedin.com/in/francisco-piaggio-224730b9/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md text-sm font-semibold text-teal-200/95 outline-none transition hover:text-teal-100 focus-visible:ring-2 focus-visible:ring-teal-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]"
                  aria-label="Francisco Piaggio on LinkedIn (opens in a new tab)"
                >
                  <span>Francisco Piaggio</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4 shrink-0 text-teal-300/90"
                    aria-hidden
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </Link>
              </div>
              <p className="text-xs text-slate-400">Frontend Developer</p>
          </Reveal>

          <Reveal
            as="article"
            delayMs={340}
            className="card-tile card-tile-shine group relative w-full max-w-sm rounded-2xl border border-white/10 bg-slate-950/45 px-8 pb-8 pt-10 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur motion-safe:hover:border-teal-400/30"
          >
              <div className="relative mx-auto mb-6 flex h-24 w-24 shrink-0 items-center justify-center">
                <div
                  aria-hidden
                  className="absolute -inset-2 rounded-full bg-gradient-to-br from-teal-400/50 via-cyan-400/20 to-sky-500/30 opacity-50 blur-lg transition-opacity duration-200 group-hover:opacity-90"
                />
                <Image
                  src="/jp.jpeg"
                  alt="Juan Pablo Saraceno, client review"
                  width={96}
                  height={96}
                  className="relative z-[1] h-24 w-24 rounded-full object-cover ring-2 ring-white/15 ring-offset-2 ring-offset-[#050816] transition-transform duration-200 motion-safe:group-hover:scale-105 group-hover:ring-teal-400/40"
                />
              </div>
              <p className="text-sm leading-relaxed text-slate-200/85">
              “Magali delivered a high-quality website that met both our design and performance expectations. She was reliable, easy to work with, and always communicated clearly throughout the process. The final product feels fast, modern, and user-friendly.”
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                <Link
                  href="https://www.linkedin.com/in/juan-pablo-saraceno-49656b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md text-sm font-semibold text-teal-200/95 outline-none transition hover:text-teal-100 focus-visible:ring-2 focus-visible:ring-teal-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]"
                  aria-label="Juan Pablo Saraceno on LinkedIn (opens in a new tab)"
                >
                  <span>Juan Pablo Saraceno</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4 shrink-0 text-teal-300/90"
                    aria-hidden
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </Link>
              </div>
              <p className="text-xs text-slate-400">Product Lead / Business Owner</p>
          </Reveal>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-5xl mx-auto scroll-mt-28 px-4 py-20 text-slate-100">
        <Reveal as="h2" delayMs={0} className="text-2xl font-semibold mb-10 text-slate-100">
          Contact
        </Reveal>

        <div className="rounded-3xl border border-white/10 bg-slate-950/35 backdrop-blur shadow-[0_0_0_1px_rgba(255,255,255,0.06)] overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Left gradient panel */}
            <div className="relative p-10 md:p-12">
              <div aria-hidden className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_20%_20%,rgba(45,212,191,0.55),transparent_55%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_70%_80%,rgba(56,189,248,0.35),transparent_55%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(700px_circle_at_60%_35%,rgba(99,102,241,0.22),transparent_55%)]" />
                <div className="absolute inset-0 bg-slate-950/35" />
              </div>

              <Reveal as="div" delayMs={150} className="relative">
                <p className="text-teal-200/90 text-sm font-medium tracking-wide">Get in touch</p>
                <h3 className="mt-3 text-4xl font-semibold text-white">Let&apos;s build something</h3>
                <p className="mt-3 max-w-sm text-slate-200/80">
                  Tell me about your product, timeline, and goals. I usually reply within 24-48 hours.
                </p>

                <div className="mt-8 text-sm text-slate-200/80">
                  <span className="text-slate-200/60">Email</span>
                  <div className="mt-1">
                    <a
                      className="text-teal-200 underline underline-offset-4 outline-none transition rounded-sm hover:text-teal-100 focus-visible:ring-2 focus-visible:ring-teal-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]"
                      href="mailto:magui.cerisola@gmail.com"
                    >
                      magui.cerisola@gmail.com
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right form panel */}
            <div className="p-10 md:p-12 bg-slate-950/60">
              <Reveal as="div" delayMs={200} className="">
                <p className="text-center text-slate-200/80 text-sm font-medium">Send a message</p>

                <ContactForm />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <footer className="text-center text-xs text-slate-200/40 py-10">
        &copy; {new Date().getFullYear()} Magali Cerisola. All rights reserved.
      </footer>
    </div>
  );
}