// page.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "./components/ContactForm";
import FixedHeader from "./components/FixedHeader";
import NeuralCanvas from "./components/NeuralCanvas";
import { useLayoutEffect } from "react";
import Reveal from "./components/Reveal";

const SERVICE_CARDS = [
  {
    title: "Custom Website Development",
    body: "I build modern, high-quality websites from scratch tailored to your business needs. Clean code, scalable architecture, and a strong focus on user experience.",
  },
    {
    title: "Automation Consulting",
    body: "Tell me about your business and repetitive tasks. I’ll help you design smarter automated workflows powered by AI and modern tools.",
  },
  {
    title: "Responsive & Mobile-First Design",
    body: "Your website will look and work perfectly across all devices - mobile, tablet, and desktop - ensuring a seamless user experience everywhere.",
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



export default function Home() {
  // Recarga con #sección: el navegador hace scroll al id; volvemos arriba para que arranque en el hero.
  useLayoutEffect(() => {
    const [entry] = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
    if (entry?.type === "reload" && window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div
      id="main-content"
      tabIndex={-1}
      className="min-h-screen text-slate-900 relative overflow-hidden outline-none"
    >
      <FixedHeader />
      <NeuralCanvas />

      {/* Hero: text panel + portrait side by side, centered */}
      <section
        id="top"
        className="relative isolate mx-auto mt-16 flex min-h-[calc(100dvh-4rem)] max-w-5xl scroll-mt-28 flex-col items-center justify-center px-4 py-8 text-slate-100 md:mt-0 md:min-h-[calc(100dvh-4rem)] md:pb-24 md:pt-28"
      >
        <div className="flex w-full flex-col gap-5 lg:flex-row lg:items-stretch">

          {/* Text card */}
          <div className="hero-text-card relative flex-1 overflow-hidden rounded-[2rem] p-8 text-center lg:text-left lg:p-12">
            <span className="hero-glass-panel-corner hero-glass-panel-corner--tl" aria-hidden />
            <span className="hero-glass-panel-corner hero-glass-panel-corner--br" aria-hidden />
            <h1 className="relative text-balance font-light tracking-tight">
              <span className="hero-title-gradient mt-3 block text-[2.1rem] font-light leading-[1.06] sm:text-5xl lg:text-[2.75rem] lg:leading-[1.07]">
                Modern web experiences, automation & AI-powered interfaces.
              </span>
              <span className="mx-auto mt-5 block max-w-xl text-base leading-relaxed text-slate-300/92 sm:text-lg lg:mx-0">
                5+ years building scalable frontend applications,
                interactive interfaces and automation solutions.
              </span>
            </h1>
            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:justify-start">
              <Link
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-blue-500 px-7 py-3 text-sm font-semibold text-slate-950 shadow-[0_12px_40px_-18px_rgba(59,130,246,0.55)] outline-none transition duration-150 hover:brightness-110 motion-safe:hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:px-8 sm:text-[15px]"
              >
                Start a project
              </Link>

              <div className="flex items-center gap-2">
                <Link
                  href="https://www.linkedin.com/in/magali-cerisola-1a5111167/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile (opens in a new tab)"
                  className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.05] p-2.5 text-slate-300 outline-none transition hover:border-blue-400/40 hover:bg-blue-500/10 hover:text-blue-200 focus-visible:ring-2 focus-visible:ring-blue-400/55 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </Link>
                <Link
                  href="https://github.com/maguiceri"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile (opens in a new tab)"
                  className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.05] p-2.5 text-slate-300 outline-none transition hover:border-blue-400/40 hover:bg-blue-500/10 hover:text-blue-200 focus-visible:ring-2 focus-visible:ring-blue-400/55 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </Link>
                <Link
                  href="https://www.instagram.com/magui.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram profile (opens in a new tab)"
                  className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.05] p-2.5 text-slate-300 outline-none transition hover:border-blue-400/40 hover:bg-blue-500/10 hover:text-blue-200 focus-visible:ring-2 focus-visible:ring-blue-400/55 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Photo card */}
          <div className="hero-photo-card relative hidden w-[260px] shrink-0 flex-col items-center justify-center overflow-hidden rounded-[2rem] p-8 lg:flex">
            <div className="relative h-[200px] w-[200px] overflow-hidden rounded-full border-2 border-blue-400/40 shadow-[0_0_0_8px_rgba(59,130,246,0.07),0_0_60px_rgba(59,130,246,0.2),0_20px_50px_rgba(0,0,0,0.5)]">
              <Image
                src="/cv.jpeg"
                alt="Portrait of Magali Cerisola"
                fill
                className="object-cover"
                sizes="200px"
                priority
              />
            </div>
          </div>

        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="max-w-6xl mx-auto scroll-mt-28 px-4 py-20 text-slate-100">
        <Reveal as="h2" delayMs={0} className="text-center text-2xl font-light mb-4 text-slate-100">
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
              className="card-tile card-tile-shine group relative w-full max-w-sm rounded-2xl border border-white/10 bg-slate-950/40 p-6 text-left shadow-[0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur motion-safe:hover:border-blue-400/20 motion-safe:hover:bg-slate-950/55"
            >
              <div className="service-card-bob" style={{ animationDelay: `${i * 0.42}s` }}>
                <h3 className="text-lg font-medium text-blue-200 transition duration-150 group-hover:text-blue-100">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-200/75">{card.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      {false && <section id="projects" className="max-w-5xl mx-auto scroll-mt-28 px-4 py-20 text-slate-100">
        <Reveal as="h2" delayMs={0} className="text-2xl font-light mb-10 text-slate-100">
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

            <h3 className="relative mt-5 text-lg font-medium text-slate-100">Banking Platform UI</h3>
            <p className="relative mt-1 text-xs text-amber-200/55">Client work - restricted disclosure</p>

            <div className="relative mt-5 space-y-2.5" aria-hidden>
              <div className="h-2.5 w-full rounded-sm bg-slate-800/90" />
              <div className="h-2.5 w-[92%] rounded-sm bg-slate-800/80" />
 
            </div>

            <p className="relative mt-5 text-[11px] leading-relaxed text-slate-400">
            Contributed to the development and modernization of a large-scale banking platform, building and refactoring complex fullstack features using React and modern technologies.

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
            className="card-tile group relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] outline-none focus-within:ring-2 focus-within:ring-blue-400/35 focus-within:ring-offset-2 focus-within:ring-offset-slate-950 motion-safe:hover:border-blue-400/25"
          >
            <div className="relative min-h-[240px] w-full min-h-0 flex-1">
              <Image
                src="/proyect.jpg"
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

              {/* Hover / focus: indigo-blue veil so the image stays slightly visible behind */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/25 via-slate-950/55 to-blue-500/20 opacity-0 backdrop-blur-[0px] transition-all duration-200 group-hover:opacity-100 group-hover:backdrop-blur-[6px] group-focus-within:opacity-100 group-focus-within:backdrop-blur-[6px]"
              />

              <div className="pointer-events-none absolute inset-0 flex flex-col justify-end p-6">
                <div className="pointer-events-auto text-left">
                  <Link
                    href="https://atucasa.net/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-md outline-none transition hover:opacity-95 focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    aria-label="Import Services Web Application - visit Atucasa (opens in a new tab)"
                  >
                    <h3 className="text-lg font-medium text-blue-200 drop-shadow-md underline-offset-4 transition group-hover:underline">
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
      </section>}
      {/* About Section */}
      <section id="about" className="max-w-3xl mx-auto scroll-mt-28 px-4 py-16 text-slate-100">
        <div className="card-tile relative rounded-2xl border border-white/10 bg-slate-950/40 p-8 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur motion-safe:hover:border-white/18 md:p-10">
          <Reveal as="h2" delayMs={0} className="text-2xl font-light mb-4 text-slate-100">
            About Me
          </Reveal>
          <Reveal as="p" delayMs={150} className="text-slate-200/75 text-lg">
          Hi, I'm Magali Cerisola — a fullstack developer with over 5 years of experience building web applications for real businesses, including the banking sector.

I help clients create modern, responsive, and high-quality websites that are fast, easy to use, and designed to deliver results.

My goal is to turn your ideas into a functional and professional product that meets your needs and provides a great experience for your users.

I'm passionate about development and always focused on writing clean, efficient code.

Let’s work together to bring your project to life.
          </Reveal>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="max-w-6xl mx-auto scroll-mt-28 px-4 py-20 text-slate-100">
        <Reveal as="h2" delayMs={0} className="text-center text-2xl font-light mb-4 text-slate-100">
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
            className="card-tile card-tile-shine group relative w-full max-w-sm rounded-2xl border border-white/10 bg-slate-950/45 px-8 pb-8 pt-10 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur motion-safe:hover:border-blue-400/30"
          >
              <div className="relative mx-auto mb-6 flex h-24 w-24 shrink-0 items-center justify-center">
                <div
                  aria-hidden
                  className="absolute -inset-2 rounded-full bg-gradient-to-br from-blue-400/50 via-blue-400/20 to-blue-600/30 opacity-50 blur-lg transition-opacity duration-200 group-hover:opacity-90"
                />
                <Image
                  src="/mar.jpeg"
                  alt="Martina Vega, client review"
                  width={96}
                  height={96}
                  className="relative z-[1] h-24 w-24 rounded-full object-cover ring-2 ring-white/15 ring-offset-2 ring-offset-slate-950 transition-transform duration-200 motion-safe:group-hover:scale-105 group-hover:ring-blue-400/40"
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
                  className="inline-flex items-center gap-2 rounded-md text-sm font-semibold text-blue-200/95 outline-none transition hover:text-blue-100 focus-visible:ring-2 focus-visible:ring-blue-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
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
                    className="h-4 w-4 shrink-0 text-blue-300/90"
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
            className="card-tile card-tile-shine group relative w-full max-w-sm rounded-2xl border border-white/10 bg-slate-950/45 px-8 pb-8 pt-10 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur motion-safe:hover:border-blue-400/30"
          >
              <div className="relative mx-auto mb-6 flex h-24 w-24 shrink-0 items-center justify-center">
                <div
                  aria-hidden
                  className="absolute -inset-2 rounded-full bg-gradient-to-br from-blue-400/50 via-blue-400/20 to-blue-600/30 opacity-50 blur-lg transition-opacity duration-200 group-hover:opacity-90"
                />
                <Image
                  src="/fran.jpeg"
                  alt="Francisco Piaggio, client review"
                  width={96}
                  height={96}
                  className="relative z-[1] h-24 w-24 rounded-full object-cover ring-2 ring-white/15 ring-offset-2 ring-offset-slate-950 transition-transform duration-200 motion-safe:group-hover:scale-105 group-hover:ring-blue-400/40"
                />
              </div>
              <p className="text-sm leading-relaxed text-slate-200/85">
              “Magali writes clean, maintainable code and has a strong grasp of modern fullstack practices. She builds reusable components and always pays attention to performance and detail.”
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                <Link
                  href="https://www.linkedin.com/in/francisco-piaggio-224730b9/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md text-sm font-semibold text-blue-200/95 outline-none transition hover:text-blue-100 focus-visible:ring-2 focus-visible:ring-blue-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                  aria-label="Francisco Piaggio on LinkedIn (opens in a new tab)"
                >
                  <span>Francisco Piaggio</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4 shrink-0 text-blue-300/90"
                    aria-hidden
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </Link>
              </div>
              <p className="text-xs text-slate-400">Fullstack Developer</p>
          </Reveal>

          <Reveal
            as="article"
            delayMs={340}
            className="card-tile card-tile-shine group relative w-full max-w-sm rounded-2xl border border-white/10 bg-slate-950/45 px-8 pb-8 pt-10 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur motion-safe:hover:border-blue-400/30"
          >
              <div className="relative mx-auto mb-6 flex h-24 w-24 shrink-0 items-center justify-center">
                <div
                  aria-hidden
                  className="absolute -inset-2 rounded-full bg-gradient-to-br from-blue-400/50 via-blue-400/20 to-blue-600/30 opacity-50 blur-lg transition-opacity duration-200 group-hover:opacity-90"
                />
                <Image
                  src="/jp.jpeg"
                  alt="Juan Pablo Saraceno, client review"
                  width={96}
                  height={96}
                  className="relative z-[1] h-24 w-24 rounded-full object-cover ring-2 ring-white/15 ring-offset-2 ring-offset-slate-950 transition-transform duration-200 motion-safe:group-hover:scale-105 group-hover:ring-blue-400/40"
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
                  className="inline-flex items-center gap-2 rounded-md text-sm font-semibold text-blue-200/95 outline-none transition hover:text-blue-100 focus-visible:ring-2 focus-visible:ring-blue-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                  aria-label="Juan Pablo Saraceno on LinkedIn (opens in a new tab)"
                >
                  <span>Juan Pablo Saraceno</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4 shrink-0 text-blue-300/90"
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
        <Reveal as="h2" delayMs={0} className="text-2xl font-light mb-10 text-slate-100">
          Contact
        </Reveal>

        <div className="rounded-3xl border border-white/10 bg-slate-950/72 backdrop-blur-sm shadow-[0_0_0_1px_rgba(255,255,255,0.06)] overflow-hidden antialiased">
          <div className="grid md:grid-cols-2">
            {/* Left gradient panel */}
            <div className="relative p-10 md:p-12">
              <div aria-hidden className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_20%_20%,rgba(59,130,246,0.55),transparent_55%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_70%_80%,rgba(56,189,248,0.35),transparent_55%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(700px_circle_at_60%_35%,rgba(99,102,241,0.22),transparent_55%)]" />
                <div className="absolute inset-0 bg-slate-950/35" />
              </div>

              <Reveal as="div" delayMs={150} className="relative">
                <p className="text-blue-200/90 text-sm font-medium tracking-wide">Get in touch</p>
                <h3 className="mt-3 text-4xl font-light text-white">Let&apos;s build something</h3>
                <p className="mt-3 max-w-sm text-slate-200/80">
                  Tell me about your product, timeline, and goals. I usually reply within 24-48 hours.
                </p>

                <div className="mt-8 text-sm text-slate-200/80">
                  <span className="text-slate-200/60">Email</span>
                  <div className="mt-1">
                    <a
                      className="text-blue-200 underline underline-offset-4 outline-none transition rounded-sm hover:text-blue-100 focus-visible:ring-2 focus-visible:ring-blue-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
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

      <footer className="flex flex-col items-center gap-4 py-10 text-xs text-slate-200/40">
        <div className="flex items-center gap-3">
          <Link
            href="https://www.linkedin.com/in/magali-cerisola-1a5111167/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition hover:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/55 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </Link>
          <Link
            href="https://github.com/maguiceri"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition hover:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/55 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </Link>
          <Link
            href="https://www.instagram.com/magui.dev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="transition hover:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/55 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
            </svg>
          </Link>
        </div>
        <span>&copy; {new Date().getFullYear()} Magali Cerisola. All rights reserved.</span>
      </footer>
    </div>
  );
}