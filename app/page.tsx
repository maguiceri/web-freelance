"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import Reveal from "./components/Reveal";
import LogoMark from "./components/LogoMark";

const WA =
  "https://wa.me/5491178230346?text=" +
  encodeURIComponent("Hola Magali, vi tu web y quiero consultarte.");

function trackWA() {
  (window as any).ttq?.track("Contact");
}

function IconWA({ size = 5 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`h-${size} w-${size} shrink-0`}
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

const SINTOMAS = [
  {
    num: "01",
    titulo: 'Te escriben "hola, info" y desaparecen',
    desc: "Llegan sin entender qué hacés, cuánto sale ni cómo es el proceso. Preguntan lo básico y no vuelven a contestar.",
    tag: "se fue",
  },
  {
    num: "02",
    titulo: "Tu publicidad lleva a tu Instagram",
    desc: "La persona cae en un perfil donde la información está desordenada. Empieza una conversación y para irse solo tiene que dejar de responder.",
    tag: "se fue",
  },
  {
    num: "03",
    titulo: "Contestás las mismas preguntas todos los días",
    desc: "Precio, horarios, qué incluye, cómo se empieza. Tu tiempo se va en responder lo que debería estar contestado antes de que te escriban.",
    tag: "tu tiempo",
  },
  {
    num: "04",
    titulo: "El que compara, no tiene con qué elegirte",
    desc: "Está mirando tres opciones. Si no ve trabajos, testimonios ni una cara, elige al que sí se los muestra.",
    tag: "se fue",
  },
  {
    num: "05",
    titulo: "En el celular tarda una eternidad",
    desc: "Ahí llega la mayoría. Si tarda más de tres segundos, se va antes de ver nada. Y nunca te enterás de que estuvo.",
    tag: "se fue",
  },
];

const PASOS = [
  {
    cuando: "Día 1",
    titulo: "Hablamos",
    desc: "Me contás qué vendés, a quién, y qué querés que pase cuando alguien entra. Salimos con el objetivo de la web definido.",
  },
  {
    cuando: "Día 2",
    titulo: "Diseño",
    desc: "Te muestro cómo va a estar armada y te explico por qué cada sección está donde está. Nada queda librado al gusto.",
  },
  {
    cuando: "Día 3",
    titulo: "Desarrollo",
    desc: "La construyo a medida. Sin plantillas, sin piezas que se rompan. Pensada para que la persona que entra sepa exactamente qué hacer.",
  },
  {
    cuando: "Día 4",
    titulo: "Online",
    desc: "Queda publicada, funcionando y con soporte.",
  },
];

// TODO: reemplazar con testimonios nuevos que hablen del impacto en el negocio
const TESTIMONIOS = [
  {
    texto:
      "La web quedó rapidísima y por fin se entiende qué hacemos. Las consultas que llegan ahora vienen con la decisión tomada.",
    nombre: "Juan Pablo Saraceno",
    rol: "Dueño de negocio",
    img: "/jp.jpeg",
  },
  {
    texto:
      "Cumplió los tiempos, comunicó todo con claridad y el resultado superó lo que teníamos en la cabeza.",
    nombre: "Martina Vega",
    rol: "Diseñadora",
    img: "/mar.jpeg",
  },
  {
    texto:
      "Antes vivía contestando las mismas preguntas por WhatsApp. Ahora la web las contesta sola.",
    nombre: "Francisco Piaggio",
    rol: "Colaborador de proyecto",
    img: "/fran.jpeg",
  },
];

const CAROUSEL_INTERVAL = 4200;

function Highlight({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <span ref={ref} className={`text-mark ${on ? "text-mark-on" : ""}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </span>
  );
}

export default function Home() {
  const [active, setActive] = useState(0);
  const paused = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = (idx: number) => {
    setActive((idx + SINTOMAS.length) % SINTOMAS.length);
    paused.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => { paused.current = false; }, 5000);
  };

  const procesoRef = useRef<HTMLDivElement>(null);
  const [procesoVis, setProcesoVis] = useState(false);

  const photoRef = useRef<HTMLDivElement>(null);
  const [photoVis, setPhotoVis] = useState(false);

  const statRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(0);
  const [statStarted, setStatStarted] = useState(false);


  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) setActive(p => (p + 1) % SINTOMAS.length);
    }, CAROUSEL_INTERVAL);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const el = statRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        obs.disconnect();
        setStatStarted(true);
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!statStarted) return;
    const target = 200;
    const dur = 1800;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setPct(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [statStarted]);

  useEffect(() => {
    const el = photoRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setPhotoVis(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);


  useEffect(() => {
    const el = procesoRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setProcesoVis(true); obs.disconnect(); } },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div id="main-content" tabIndex={-1} className="outline-none">
      <Header />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1080px] px-[4vw] pt-[clamp(56px,8vw,96px)] pb-[clamp(56px,8vw,96px)]">
        <div className="flex items-center gap-10 lg:gap-16">

          {/* Copy */}
          <div className="flex-1 min-w-0">
            <Reveal as="p" className="text-[12px] font-semibold tracking-[0.18em] uppercase text-[#3B7BFF] mb-[22px]">
              Páginas web para negocios
            </Reveal>

            <h1 className="font-display font-extrabold text-[clamp(38px,6.4vw,72px)] leading-[1.03] tracking-[-0.035em] text-[#EEF2F9]">
              <span className="block word-in" style={{ animationDelay: "60ms" }}>Webs que convierten</span>
              <span className="block word-in" style={{ animationDelay: "220ms" }}>visitas en clientes.</span>
            </h1>

            <Reveal as="p" delayMs={140} className="text-[#7C89A3] text-[clamp(16px,2vw,19px)] max-w-[52ch] mt-[26px]">
              Diseño y programo webs para negocios que ya invierten en publicidad y{" "}
              <Highlight delay={400}>no venden.</Highlight>
            </Reveal>

            <Reveal as="div" delayMs={300} className="mt-[36px] flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackWA}
                className="inline-block bg-[#3B7BFF] text-white font-semibold text-[15px] px-[26px] py-[14px] rounded-[10px] outline-none transition hover:-translate-y-0.5 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070F]"
              >
                Quiero mi web
              </Link>
              <p className="text-[13px] text-[#7C89A3]">Respondo en menos de 24 hs</p>
            </Reveal>
          </div>

          {/* Logo con animación — solo desktop */}
          <div className="hidden lg:flex shrink-0 items-center justify-center">
            <LogoMark height={260} className="hero-logo-float" />
          </div>

        </div>
      </section>

      {/* ── PROBLEMA ─────────────────────────────────────────────────────── */}
      <section className="stack-card lg:sticky lg:top-[88px] z-[11] border border-[#1E2A44] bg-[#0B1120] py-[clamp(72px,10vw,130px)]">
        <div className="mx-auto max-w-[1080px] px-[4vw]">

          {/* Header */}
          <Reveal as="h2" direction="left" className="font-display font-extrabold text-[clamp(28px,4vw,44px)] tracking-[-0.03em] leading-[1.12] max-w-[22ch] text-[#EEF2F9]">
            Estás perdiendo clientes<br />antes de que te escriban.
          </Reveal>
          <Reveal as="p" delayMs={80} className="text-[#7C89A3] mt-[18px] max-w-[56ch] text-[17px]">
            No los ves, no los contás, y por eso parece que no existen. Pero cada uno de estos síntomas es <Highlight delay={200}>alguien que se fue.</Highlight>
          </Reveal>

          {/* Carousel */}
          <Reveal as="div" delayMs={160} className="mt-[48px]">
            {/* Track */}
            <div
              className="overflow-hidden rounded-[16px]"
              onMouseEnter={() => { paused.current = true; }}
              onMouseLeave={() => { paused.current = false; }}
            >
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${active * 100}%)` }}
              >
                {SINTOMAS.map((s) => (
                  <div
                    key={s.num}
                    className="min-w-full border border-[#1E2A44] rounded-[16px] bg-[#05070F] p-[36px_32px] flex flex-col gap-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="font-display font-extrabold text-[13px] text-[#3B7BFF] tracking-[0.1em]">
                        {s.num}
                      </span>
                      <span className={`text-[11px] font-semibold uppercase tracking-[0.12em] px-3 py-1 rounded-full border ${
                        s.tag === "se fue"
                          ? "text-red-300/70 border-red-500/20 bg-red-950/25"
                          : "text-amber-300/70 border-amber-500/20 bg-amber-950/25"
                      }`}>
                        {s.tag}
                      </span>
                    </div>
                    <h3 className="font-display font-extrabold text-[clamp(22px,3vw,30px)] tracking-[-0.02em] leading-[1.1] text-[#EEF2F9]">
                      {s.titulo}
                    </h3>
                    <p className="text-[16px] text-[#7C89A3] leading-relaxed max-w-[60ch]">
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress + dots + arrows */}
            <div className="mt-5 flex items-center gap-4">
              {/* Flecha anterior */}
              <button
                onClick={() => goTo(active - 1)}
                aria-label="Anterior"
                className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-[#1E2A44] text-[#7C89A3] outline-none transition hover:border-[#3B7BFF]/50 hover:text-[#EEF2F9] active:scale-90 focus-visible:ring-2 focus-visible:ring-[#3B7BFF]/50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 12L6 8l4-4" />
                </svg>
              </button>

              <div className="flex gap-2">
                {SINTOMAS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Síntoma ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#3B7BFF]/50 ${
                      i === active ? "w-6 bg-[#3B7BFF]" : "w-1.5 bg-[#1E2A44] hover:bg-[#2a3a5a]"
                    }`}
                  />
                ))}
              </div>

              {/* Progress bar */}
              <div className="flex-1 h-px bg-[#1E2A44] overflow-hidden rounded-full">
                <div
                  key={active}
                  className="h-full bg-[#3B7BFF]/50 carousel-progress"
                />
              </div>

              {/* Flecha siguiente */}
              <button
                onClick={() => goTo(active + 1)}
                aria-label="Siguiente"
                className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-[#1E2A44] text-[#7C89A3] outline-none transition hover:border-[#3B7BFF]/50 hover:text-[#EEF2F9] active:scale-90 focus-visible:ring-2 focus-visible:ring-[#3B7BFF]/50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 4l4 4-4 4" />
                </svg>
              </button>
            </div>
          </Reveal>


        </div>
      </section>

      {/* ── PROCESO ──────────────────────────────────────────────────────── */}
      <section
        id="proceso"
        className="stack-card lg:sticky lg:top-[94px] z-[12] border border-[#1E2A44] bg-[#080E1C] py-[clamp(72px,10vw,130px)] scroll-mt-20"
      >
        <div className="mx-auto max-w-[1080px] px-[4vw]">
          <Reveal as="p" className="text-[12px] font-semibold tracking-[0.18em] uppercase text-[#3B7BFF] mb-[14px]">
            Cómo trabajo
          </Reveal>
          <Reveal as="h2" delayMs={60} direction="left" className="font-display font-extrabold text-[clamp(28px,4vw,44px)] tracking-[-0.03em] leading-[1.12] text-[#EEF2F9]">
            Tu web online en <Highlight delay={300}>4 días hábiles.</Highlight>
          </Reveal>
          <Reveal as="p" delayMs={120} className="text-[#7C89A3] mt-[18px] max-w-[52ch] text-[17px]">
            <Highlight>El reloj arranca cuando me pasás el contenido.</Highlight>{" "}De ahí en adelante, me ocupo yo.
          </Reveal>

          {/* Timeline horizontal */}
          <div ref={procesoRef} className="relative mt-14">

            {/* Línea horizontal — desktop */}
            <div className="hidden md:block absolute top-5 left-[12.5%] right-[12.5%] h-px bg-[#1E2A44] overflow-hidden">
              <div
                className="h-full bg-[#3B7BFF]/60 transition-[width] duration-[2000ms] ease-out"
                style={{ width: procesoVis ? "100%" : "0%" }}
              />
            </div>

            {/* Línea vertical — mobile */}
            <div className="md:hidden absolute left-5 top-0 bottom-0 w-px bg-[#1E2A44] overflow-hidden" style={{ transform: "translateX(-50%)" }}>
              <div
                className="w-full bg-[#3B7BFF]/60 transition-[height] duration-[2000ms] ease-out"
                style={{ height: procesoVis ? "100%" : "0%" }}
              />
            </div>

            {/* Pasos */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
              {PASOS.map((paso, i) => {
                const delay = i * 450;
                return (
                  <div key={paso.titulo} className="flex md:flex-col md:items-center gap-4 md:gap-0">
                    {/* Nodo */}
                    <div
                      className="relative z-10 shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center font-display font-extrabold text-[13px] transition-all duration-700"
                      style={{
                        transitionDelay: `${delay}ms`,
                        borderColor: procesoVis ? "#3B7BFF" : "#1E2A44",
                        color: procesoVis ? "#3B7BFF" : "#2a3a5a",
                        background: "#0B1120",
                      }}
                    >
                      {i + 1}
                    </div>
                    {/* Contenido */}
                    <div
                      className="md:mt-6 md:text-center transition-all duration-500"
                      style={{
                        transitionDelay: `${delay + 250}ms`,
                        opacity: procesoVis ? 1 : 0,
                        transform: procesoVis ? "translateY(0)" : "translateY(12px)",
                      }}
                    >
                      <small className="block text-[#3B7BFF] text-[11px] font-semibold uppercase tracking-[0.1em]">
                        {paso.cuando}
                      </small>
                      <h3 className="font-display font-semibold text-[17px] tracking-[-0.01em] mt-1 text-[#EEF2F9]">
                        {paso.titulo}
                      </h3>
                      <p className="text-[14px] text-[#7C89A3] mt-2 leading-relaxed">{paso.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recuadro: dominio */}
          <Reveal as="div" delayMs={200} className="mt-10 border border-[#1E2A44] rounded-[12px] bg-[#05070F] px-7 py-6">
            <p className="font-semibold text-[#EEF2F9] text-[15px]">
              El dominio siempre queda a tu nombre.
            </p>
            <p className="text-[#7C89A3] text-[14px] mt-2 leading-relaxed">
              Tu web es tuya. Si mañana querés seguir con otra persona, te la llevás. Nadie te la retiene.
            </p>
          </Reveal>

        </div>
      </section>

      {/* ── TESTIMONIOS ──────────────────────────────────────────────────── */}
      <section id="testimonios" className="relative stack-card z-[13] border border-[#1E2A44] bg-[#05070F] py-[clamp(72px,10vw,130px)] scroll-mt-20">
        <div className="mx-auto max-w-[1080px] px-[4vw]">
          <Reveal
            as="h2"
            direction="left"
            className="font-display font-extrabold text-[clamp(28px,4vw,44px)] tracking-[-0.03em] leading-[1.12] text-[#EEF2F9]"
          >
            Lo que dicen los clientes
          </Reveal>

          <div ref={statRef}>
            <Reveal as="div" delayMs={80} className="mt-[40px] mb-[40px] border border-[#1E2A44] rounded-[16px] bg-[#0B1120] px-8 py-8 text-center">
              <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#7C89A3] mb-3">
                Resultado real · primer mes
              </p>
              <div className="font-display font-extrabold leading-none tracking-[-0.04em] text-[#3B7BFF] stat-number-glow"
                style={{ fontSize: "clamp(64px,10vw,96px)" }}>
                +{pct}<span style={{ fontSize: "0.5em", verticalAlign: "super", marginLeft: "2px" }}>%</span>
              </div>
              <p className="font-semibold text-[#EEF2F9] text-[17px] mt-4 leading-snug">
                de consultas al mes de lanzar la web.
              </p>
              {/* Barras antes / después */}
              <div className="mt-6 flex items-end justify-center gap-8">
                <div className="flex flex-col items-center gap-2">
                  <div className="relative w-10 h-20 bg-[#111A2E] rounded-lg overflow-hidden flex items-end">
                    <div
                      className="w-full bg-[#1E2A44] rounded-b-lg transition-all duration-700 ease-out"
                      style={{ height: statStarted ? "33%" : "0%" }}
                    />
                  </div>
                  <small className="text-[#7C89A3] text-[11px] uppercase tracking-wider">Antes</small>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="relative w-10 h-20 bg-[#111A2E] rounded-lg overflow-hidden flex items-end">
                    <div
                      className="w-full bg-[#3B7BFF] rounded-b-lg transition-all duration-[1200ms] ease-out"
                      style={{ height: statStarted ? "100%" : "0%", transitionDelay: statStarted ? "300ms" : "0ms" }}
                    />
                  </div>
                  <small className="text-[#3B7BFF] text-[11px] uppercase tracking-wider">Después</small>
                </div>
              </div>
              <p className="text-[#7C89A3] text-[13px] mt-5 leading-relaxed max-w-[40ch] mx-auto">
                Mismo presupuesto. Mismo producto. Solo cambió a dónde llegaba la gente.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[20px]">
            {TESTIMONIOS.map((t, i) => (
              <Reveal
                key={t.nombre}
                as="blockquote"
                delayMs={i * 80}
                className="card-tile card-tile-shine border border-[#1E2A44] rounded-[14px] p-[28px] bg-[#0B1120] flex flex-col"
              >
                <p className="text-[15.5px] leading-relaxed text-[#EEF2F9] flex-1">
                  &ldquo;{t.texto}&rdquo;
                </p>
                <footer className="mt-[20px] flex items-center gap-3 text-[13px]">
                  <Image
                    src={t.img}
                    alt={t.nombre}
                    width={38}
                    height={38}
                    className="rounded-full object-cover ring-1 ring-white/10 shrink-0"
                  />
                  <div>
                    <strong className="block font-semibold text-[#EEF2F9]">{t.nombre}</strong>
                    <small className="text-[#7C89A3]">{t.rol}</small>
                  </div>
                </footer>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUIÉN SOY ────────────────────────────────────────────────────── */}
      <section id="quien-soy" className="relative stack-card z-[14] border border-[#1E2A44] bg-[#080E1C] py-[clamp(72px,10vw,130px)] scroll-mt-20">
        <div className="mx-auto max-w-[1080px] px-[4vw]">
          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">

            {/* Foto — strip reveal */}
            <div ref={photoRef} className="shrink-0 mx-auto lg:mx-0">
              <div className="relative rounded-[20px] overflow-hidden w-[260px] lg:w-[320px]">
                <Image
                  src="/perfil.jpg"
                  alt="Magali Cerisola"
                  width={320}
                  height={380}
                  className="object-cover w-full h-auto block"
                />
                <div
                  className="absolute inset-0 bg-[#080E1C]"
                  style={{
                    transform: photoVis ? "translateX(101%)" : "translateX(0)",
                    transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1)",
                    transitionDelay: "0.1s",
                  }}
                />
              </div>
            </div>

            {/* Texto */}
            <div className="flex-1 min-w-0">
              <Reveal as="p" className="text-[12px] font-semibold tracking-[0.18em] uppercase text-[#3B7BFF] mb-4">
                Quién soy
              </Reveal>

              <Reveal as="p" delayMs={60} className="text-[#EEF2F9] text-[clamp(16px,1.8vw,18px)] leading-relaxed mb-5">
                Soy Magui. Trabajo en sistemas hace más de seis años,{" "}
                <Highlight delay={200}>cinco de ellos en el Banco Santander</Highlight>{" "}
                — donde una web lenta o un formulario que falla le cuesta plata a la empresa todos los días. Aprendí a hacer las cosas bien porque <Highlight delay={600}>no había margen para hacerlas mal.</Highlight>
              </Reveal>

              <Reveal as="p" delayMs={120} className="text-[#7C89A3] text-[clamp(15px,1.6vw,17px)] leading-relaxed mb-5">
                Empecé a hacer webs para negocios porque me di cuenta de algo: la gente que no es del rubro no tiene forma de saber si le están haciendo las cosas bien o si le están vendiendo humo. Y{" "}
                <Highlight delay={300}>hay muchos chantas dando vueltas.</Highlight>
              </Reveal>

              <Reveal as="p" delayMs={180} className="text-[#7C89A3] text-[clamp(15px,1.6vw,17px)] leading-relaxed mb-5">
                Te cobran una fortuna por una plantilla. Te retienen el dominio. Te entregan una web que se ve linda y no vende nada. Y vos no tenés cómo darte cuenta.
              </Reveal>

              <Reveal as="p" delayMs={240} className="text-[#7C89A3] text-[clamp(15px,1.6vw,17px)] leading-relaxed mb-5">
                Por eso trabajo así: te explico cada decisión, te muestro por qué cada sección está donde está, y{" "}
                <Highlight delay={300}>el dominio queda siempre a tu nombre.</Highlight>
              </Reveal>

              <Reveal as="p" delayMs={300} className="text-[#EEF2F9] text-[clamp(15px,1.6vw,17px)] leading-relaxed font-medium border-l-2 border-[#3B7BFF] pl-4">
                No estás comprando una web. Estás contratando a alguien que entiende de esto y está de tu lado.
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* ── CIERRE ───────────────────────────────────────────────────────── */}
      <section
        id="contacto"
        className="relative stack-card z-[15] border border-[#1E2A44] bg-[#05070F] py-[clamp(72px,10vw,130px)] scroll-mt-20 text-center"
        style={{
          backgroundImage:
            "radial-gradient(1000px 400px at 50% 0%, rgba(59,123,255,.12), transparent)",
        }}
      >
        <div className="mx-auto max-w-[1080px] px-[4vw]">
          <Reveal
            as="h2"
            direction="fade"
            className="font-display font-extrabold text-[clamp(28px,4vw,44px)] tracking-[-0.03em] leading-[1.12] max-w-[18ch] mx-auto text-[#EEF2F9]"
          >
            ¿Querés una web que <Highlight delay={400}>traiga clientes?</Highlight>
          </Reveal>
          <Reveal as="p" delayMs={80} className="text-[#7C89A3] mt-[18px] max-w-[48ch] mx-auto text-[17px]">
            Contame de tu negocio. En 30 minutos de llamada te digo qué haría y cuánto saldría.
            Sin costo, sin compromiso.
          </Reveal>

          <Reveal as="div" delayMs={160}>
            <Link
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackWA}
              className="mt-[36px] inline-flex items-center gap-[10px] bg-[#3B7BFF] text-white font-semibold text-[16px] px-[34px] py-[17px] rounded-[11px] outline-none transition hover:-translate-y-0.5 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070F]"
            >
              <IconWA size={5} />
              Escribime por WhatsApp
            </Link>
            <p className="mt-[18px] text-[13px] text-[#7C89A3]">
              O si preferís:{" "}
              <a
                href="mailto:magui.cerisola@gmail.com"
                className="underline underline-offset-4 transition hover:text-[#EEF2F9]"
              >
                magui.cerisola@gmail.com
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="relative z-[16] border-t border-[#1E2A44] py-8 bg-[#05070F]">
        <div className="mx-auto max-w-[1080px] px-[4vw] flex flex-wrap justify-between items-center gap-3 text-[13px] text-[#7C89A3]">
          <span suppressHydrationWarning>&copy; {new Date().getFullYear()} Magali Cerisola</span>
          <span className="flex items-center">
            <Link
              href="https://www.instagram.com/magui.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="px-[18px] py-1 hover:text-[#EEF2F9] transition outline-none focus-visible:ring-1 focus-visible:ring-blue-400/50 rounded"
            >
              Instagram
            </Link>
            <Link
              href="https://www.linkedin.com/in/magali-cerisola-1a5111167/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-[18px] py-1 hover:text-[#EEF2F9] transition outline-none focus-visible:ring-1 focus-visible:ring-blue-400/50 rounded"
            >
              LinkedIn
            </Link>
          </span>
        </div>
      </footer>
    </div>
  );
}
