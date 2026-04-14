// page.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import Reveal from "./components/Reveal";
import ContactForm from "./components/ContactForm";
import Header from "./components/Header";
import { useState, useEffect, useRef } from "react";


export default function Home() {
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  console.log("hola")

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
       <div className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${showHeader ? "translate-y-0" : "-translate-y-full"}`}>
  <Header />
</div>
      {/* Abstract background (visual-only) */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* dark base */}
        <div className="absolute inset-0 bg-[#050816]" />

        {/* glow blobs */}
        <div className="absolute -top-32 left-[5%] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.28),transparent_60%)] blur-3xl" />
        <div className="absolute top-[30%] right-[0%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.22),transparent_60%)] blur-3xl" />
        <div className="absolute bottom-[0%] left-[30%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.18),transparent_60%)] blur-3xl" />

        {/* organic shape */}
        <div className="absolute top-[10%] left-[10%] w-[350px] h-[700px] bg-gradient-to-b from-teal-400/20 to-sky-500/10 blur-2xl rotate-12 rounded-[45%_55%_60%_40%/40%_45%_55%_60%]" />
      </div>
     

      {/* Hero Section */}
      <section
        id="top"
        className="relative flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto scroll-mt-28 py-28 px-4 text-slate-100"
      >
        <div className="flex-1 text-left">
          <h1
            style={{ animationDelay: "0.25s" }}
            className="fadeDown text-balance text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-teal-200 via-cyan-200 to-sky-200 bg-clip-text text-transparent"
          >
            Web Developer building modern web applications
          </h1>
          <p style={{ animationDelay: "0.40s" }} className="fadeDown max-w-md text-lg md:text-xl text-slate-200/80 mb-8">
          Hi, I'm Magali Cerisola — a freelance web developer.

          I build modern, responsive websites and web applications focused on performance and user experience.
          
          +4 years of experience.
          </p>
          <Link
            href="#contact"
            style={{ animationDelay: "0.55s" }}
            className="fadeDown inline-block rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 px-8 py-3 text-center text-slate-950 font-semibold shadow-lg outline-none transition duration-200 hover:brightness-110 hover:shadow-teal-500/25 motion-safe:hover:scale-[1.03] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-teal-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]"
          >
            Let&apos;s work together
          </Link>
        </div>
        <div className="flex-1 flex justify-center md:justify-end mt-12 md:mt-0">
        <div
  style={{ animationDelay: "0.25s" }}
  className="fadeDown w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full overflow-hidden border border-white/15 shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_25px_70px_-35px_rgba(0,255,210,0.45)]"
>
            <Image
              src="/avatar.jpeg" // Uses the avatar from /public
              alt="Portrait of Magali Cerisola"
              width={192}
              height={192}
              className="object-cover w-full h-full"
              priority
            />
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

        <Reveal as="div" delayMs={200} className="w-full">
          <div className="flex flex-wrap justify-center gap-8">
            <article className="w-full max-w-sm rounded-2xl border border-white/10 bg-slate-950/35 backdrop-blur p-6 text-left shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition hover:bg-slate-950/45">
              <h3 className="text-lg font-semibold mb-2 text-teal-200">Custom Website Development</h3>
              <p className="text-sm leading-7 text-slate-200/75">
                I build modern, high-quality websites from scratch tailored to your business needs. Clean code,
                scalable architecture, and a strong focus on user experience.
              </p>
            </article>

            <article className="w-full max-w-sm rounded-2xl border border-white/10 bg-slate-950/35 backdrop-blur p-6 text-left shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition hover:bg-slate-950/45">
              <h3 className="text-lg font-semibold mb-2 text-teal-200">Responsive &amp; Mobile-First Design</h3>
              <p className="text-sm leading-7 text-slate-200/75">
                Your website will look and work perfectly across all devices - mobile, tablet, and desktop - ensuring a
                seamless user experience everywhere.
              </p>
            </article>

            <article className="w-full max-w-sm rounded-2xl border border-white/10 bg-slate-950/35 backdrop-blur p-6 text-left shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition hover:bg-slate-950/45">
              <h3 className="text-lg font-semibold mb-2 text-teal-200">Pixel-Perfect UI Implementation</h3>
              <p className="text-sm leading-7 text-slate-200/75">
                I transform your designs (Figma or similar) into clean, accurate, and interactive interfaces with
                attention to detail in layout, spacing, and typography.
              </p>
            </article>

            <article className="w-full max-w-sm rounded-2xl border border-white/10 bg-slate-950/35 backdrop-blur p-6 text-left shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition hover:bg-slate-950/45">
              <h3 className="text-lg font-semibold mb-2 text-teal-200">Performance &amp; UX Optimization</h3>
              <p className="text-sm leading-7 text-slate-200/75">
                I optimize your website for speed, smooth interactions, and better user experience, improving load times
                and overall usability.
              </p>
            </article>

            <article className="w-full max-w-sm rounded-2xl border border-white/10 bg-slate-950/35 backdrop-blur p-6 text-left shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition hover:bg-slate-950/45">
              <h3 className="text-lg font-semibold mb-2 text-teal-200">Ongoing Maintenance &amp; Support</h3>
              <p className="text-sm leading-7 text-slate-200/75">
                I provide continuous support, updates, and improvements to keep your website secure, up to date, and
                running smoothly.
              </p>
            </article>

            <article className="w-full max-w-sm rounded-2xl border border-white/10 bg-slate-950/35 backdrop-blur p-6 text-left shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition hover:bg-slate-950/45">
              <h3 className="text-lg font-semibold mb-2 text-teal-200">Hosting &amp; Deployment Setup</h3>
              <p className="text-sm leading-7 text-slate-200/75">
                I handle deployment and hosting setup so your website is live, secure, and accessible with reliable
                performance.
              </p>
            </article>

            <article className="w-full max-w-sm rounded-2xl border border-white/10 bg-slate-950/35 backdrop-blur p-6 text-left shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition hover:bg-slate-950/45">
              <h3 className="text-lg font-semibold mb-2 text-teal-200">Website Review &amp; Improvements</h3>
              <p className="text-sm leading-7 text-slate-200/75">
                I analyze your existing website and provide actionable improvements in design, performance, and
                usability.
              </p>
            </article>
          </div>
        </Reveal>
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
            className="relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl border border-amber-500/25 bg-slate-950/70 p-6 shadow-[0_0_0_1px_rgba(251,191,36,0.08),inset_0_1px_0_0_rgba(255,255,255,0.04)] backdrop-blur transition hover:border-amber-400/35"
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
            className="group relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] outline-none focus-within:ring-2 focus-within:ring-teal-400/35 focus-within:ring-offset-2 focus-within:ring-offset-[#050816]"
          >
            <div className="relative min-h-[240px] w-full min-h-0 flex-1">
              <Image
                src="/proyect.png"
                alt="Featured project screenshot"
                fill
                className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04] motion-safe:group-focus-within:scale-[1.04]"
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
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-teal-500/25 via-slate-950/55 to-cyan-500/20 opacity-0 backdrop-blur-[0px] transition-all duration-300 group-hover:opacity-100 group-hover:backdrop-blur-[6px] group-focus-within:opacity-100 group-focus-within:backdrop-blur-[6px]"
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
                  <p className="mt-2 max-w-prose text-sm leading-relaxed text-slate-100/95 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0">
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
        <div className="rounded-2xl border border-white/10 bg-slate-950/35 backdrop-blur p-8 md:p-10 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] text-center">
          <Reveal as="h2" delayMs={0} className="text-2xl font-semibold mb-4 text-slate-100">
            About Me
          </Reveal>
          <Reveal as="p" delayMs={150} className="text-slate-200/75 text-lg">
          Hi, I'm Magali Cerisola — a frontend developer with over 4 years of experience building web applications for real businesses, including the banking sector.

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

        <Reveal as="div" delayMs={200} className="w-full">
          <div className="flex flex-wrap justify-center gap-8">
            <article className="group relative w-full max-w-sm rounded-2xl border border-white/10 bg-slate-950/40 backdrop-blur px-8 pb-8 pt-10 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition-all duration-300 hover:border-teal-400/25 hover:shadow-[0_24px_56px_-24px_rgba(45,212,191,0.35)] motion-safe:hover:-translate-y-1">
              <div className="relative mx-auto mb-6 flex h-24 w-24 shrink-0 items-center justify-center">
                <div
                  aria-hidden
                  className="absolute -inset-2 rounded-full bg-gradient-to-br from-teal-400/50 via-cyan-400/20 to-sky-500/30 opacity-50 blur-lg transition-opacity duration-300 group-hover:opacity-90"
                />
                <Image
                  src="/mar.jpeg"
                  alt="Martina Vega, client review"
                  width={96}
                  height={96}
                  className="relative z-[1] h-24 w-24 rounded-full object-cover ring-2 ring-white/15 ring-offset-2 ring-offset-[#050816] transition-transform duration-300 motion-safe:group-hover:scale-105 group-hover:ring-teal-400/40"
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
            </article>

            <article className="group relative w-full max-w-sm rounded-2xl border border-white/10 bg-slate-950/40 backdrop-blur px-8 pb-8 pt-10 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition-all duration-300 hover:border-teal-400/25 hover:shadow-[0_24px_56px_-24px_rgba(45,212,191,0.35)] motion-safe:hover:-translate-y-1">
              <div className="relative mx-auto mb-6 flex h-24 w-24 shrink-0 items-center justify-center">
                <div
                  aria-hidden
                  className="absolute -inset-2 rounded-full bg-gradient-to-br from-teal-400/50 via-cyan-400/20 to-sky-500/30 opacity-50 blur-lg transition-opacity duration-300 group-hover:opacity-90"
                />
                <Image
                  src="/fran.jpeg"
                  alt="Francisco Piaggio, client review"
                  width={96}
                  height={96}
                  className="relative z-[1] h-24 w-24 rounded-full object-cover ring-2 ring-white/15 ring-offset-2 ring-offset-[#050816] transition-transform duration-300 motion-safe:group-hover:scale-105 group-hover:ring-teal-400/40"
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
            </article>

            <article className="group relative w-full max-w-sm rounded-2xl border border-white/10 bg-slate-950/40 backdrop-blur px-8 pb-8 pt-10 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition-all duration-300 hover:border-teal-400/25 hover:shadow-[0_24px_56px_-24px_rgba(45,212,191,0.35)] motion-safe:hover:-translate-y-1">
              <div className="relative mx-auto mb-6 flex h-24 w-24 shrink-0 items-center justify-center">
                <div
                  aria-hidden
                  className="absolute -inset-2 rounded-full bg-gradient-to-br from-teal-400/50 via-cyan-400/20 to-sky-500/30 opacity-50 blur-lg transition-opacity duration-300 group-hover:opacity-90"
                />
                <Image
                  src="/jp.jpeg"
                  alt="Juan Pablo Saraceno, client review"
                  width={96}
                  height={96}
                  className="relative z-[1] h-24 w-24 rounded-full object-cover ring-2 ring-white/15 ring-offset-2 ring-offset-[#050816] transition-transform duration-300 motion-safe:group-hover:scale-105 group-hover:ring-teal-400/40"
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
            </article>
          </div>
        </Reveal>
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