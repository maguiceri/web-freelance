"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "./components/Reveal";
import { useLayoutEffect } from "react";

// ─── WhatsApp ────────────────────────────────────────────────────────────────
const WA =
  "https://wa.me/5491178230346?text=" +
  encodeURIComponent("Hola Magali, vi tu web y quiero consultarte.");

function trackWA() {
  (window as any).ttq?.track("Contact");
}

// ─── Ícono WhatsApp ───────────────────────────────────────────────────────────
function IconWA() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5 shrink-0"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

// ─── Datos ────────────────────────────────────────────────────────────────────
const PROBLEMAS = [
  "Invertís en publicidad. La gente llega, mira y se va sin comprar.",
  "Mandás tráfico a tu Instagram. Preguntan, no concretan.",
  "Tenés web, pero no sabés si trae clientes. No hay forma de saberlo.",
  "La hicieron con una plantilla hace años. 'Quedó linda', no convierte.",
  "Cuando alguien entra, no entiende en 5 segundos qué hacés ni qué tiene que hacer.",
  "Tenés que explicar lo mismo en cada consulta porque la web no lo hace por vos.",
];

const PROCESO = [
  {
    num: "01",
    tiempo: "30 min · Gratis",
    titulo: "Diagnóstico",
    desc: "Hablo con vos. Entiendo tu negocio, tu cliente y qué está fallando ahora.",
  },
  {
    num: "02",
    tiempo: "2 días hábiles",
    titulo: "Propuesta clara",
    desc: "Te mando qué voy a hacer, por qué y cuánto vale. Sin letra chica, sin sorpresas.",
  },
  {
    num: "03",
    tiempo: "3 a 4 semanas",
    titulo: "Diseño y desarrollo",
    desc: "Trabajo. Te muestro avances. Ajustamos juntos. Sabés siempre en qué etapa estamos.",
  },
  {
    num: "04",
    tiempo: "1 semana",
    titulo: "Entrega",
    desc: "La web sale. Te explico cómo funciona. Dominio, código y hosting: todo tuyo.",
  },
];

// TODO: Reemplazar con testimonios de clientes hablando de resultados en su negocio
const TESTIMONIOS = [
  {
    img: "/jp.jpeg",
    texto:
      "Magali entregó una web de alta calidad que cumplió con todo lo que esperábamos. Fue confiable, fácil de tratar y comunicó con claridad durante todo el proceso. El resultado final es rápido, moderno y fácil de usar.",
    nombre: "Juan Pablo Saraceno",
    rol: "Product Lead · Dueño",
  },
  {
    img: "/mar.jpeg",
    texto:
      "Trabajar con Magali fue una muy buena experiencia. Tradujo nuestros diseños en una interfaz limpia y prolija, con atención al detalle en espaciado, tipografía y adaptación mobile. La comunicación fue fluida y el resultado final coincidió exactamente con lo que pedimos.",
    nombre: "Martina Vega",
    rol: "Diseñadora",
  },
  {
    img: "/fran.jpeg",
    texto:
      "Tiene un dominio sólido del trabajo y siempre presta atención al rendimiento y al detalle. Lo que entrega funciona bien, se ve bien y está bien hecho.",
    nombre: "Francisco Piaggio",
    rol: "Colaborador de proyecto",
  },
];

// ─── Componente principal ─────────────────────────────────────────────────────
export default function Home() {
  useLayoutEffect(() => {
    const [entry] = performance.getEntriesByType(
      "navigation"
    ) as PerformanceNavigationTiming[];
    if (entry?.type === "reload" && window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div
      id="main-content"
      tabIndex={-1}
      className="min-h-screen bg-[#020617] text-slate-100 outline-none"
    >
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        id="top"
        className="relative isolate mx-auto flex min-h-[calc(100dvh-4rem)] max-w-4xl scroll-mt-28 flex-col justify-center px-6 pb-16 pt-24 md:pb-24 md:pt-32"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_55%_at_50%_-5%,rgba(59,130,246,0.11),transparent)]"
        />

        <Reveal as="p" delayMs={0} className="font-mono text-[11px] uppercase tracking-[0.26em] text-blue-400/60 mb-7">
          Diseño web · Buenos Aires
        </Reveal>

        <Reveal
          as="h1"
          delayMs={80}
          className="text-[2.75rem] font-light leading-[1.04] tracking-tight sm:text-6xl lg:text-[5rem]"
        >
          El problema<br />
          casi nunca<br />
          es el{" "}
          <span className="text-blue-400">diseño.</span>
        </Reveal>

        <Reveal
          as="p"
          delayMs={200}
          className="mt-7 max-w-lg text-base leading-relaxed text-slate-300/75 sm:text-lg"
        >
          Si invertís en publicidad y la gente no se convierte en clientes, el
          problema es que nadie pensó qué pasa cuando alguien entra a tu web.
          Hago webs para negocios argentinos que convierten visitas en clientes.
        </Reveal>

        <Reveal as="div" delayMs={300} className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <Link
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackWA}
            className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-8 py-4 text-[15px] font-semibold text-white shadow-[0_8px_32px_rgba(37,211,102,0.32)] outline-none transition hover:brightness-110 motion-safe:hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-green-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617]"
          >
            <IconWA />
            Escribime por WhatsApp
          </Link>
          <p className="text-xs text-slate-500">Diagnóstico gratis · Sin compromiso</p>
        </Reveal>
      </section>

      {/* ── EL PROBLEMA ──────────────────────────────────────────────────── */}
      <section id="problema" className="mx-auto max-w-3xl scroll-mt-28 px-6 py-20">
        <Reveal as="h2" delayMs={0} className="text-2xl font-light text-slate-100 mb-2">
          ¿Te suena alguna de estas?
        </Reveal>
        <Reveal as="p" delayMs={100} className="text-slate-400 text-base mb-10">
          Son los síntomas más comunes de una web que no convierte.
        </Reveal>

        <div>
          {PROBLEMAS.map((p, i) => (
            <Reveal
              key={i}
              as="div"
              delayMs={80 + i * 45}
              className="group border-b border-white/[0.06] py-5 first:border-t transition-colors hover:border-blue-500/20"
            >
              <div className="flex items-start gap-4">
                <span className="mt-0.5 shrink-0 w-6 font-mono text-[11px] tabular-nums text-blue-400/35">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[15px] leading-relaxed text-slate-200/80 transition-colors group-hover:text-slate-100">
                  {p}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal as="div" delayMs={420} className="mt-10 rounded-xl border border-blue-500/20 bg-blue-950/25 px-6 py-5">
          <p className="text-sm leading-relaxed text-slate-300/80">
            <span className="font-medium text-blue-300">Si marcaste aunque sea una</span>, tenemos algo
            para hablar. En 30 minutos te digo exactamente qué está frenando tus ventas.
          </p>
        </Reveal>
      </section>

      {/* ── TRABAJOS ─────────────────────────────────────────────────────── */}
      <section id="trabajos" className="mx-auto max-w-5xl scroll-mt-28 px-6 py-20">
        <Reveal as="div" className="mb-12">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.26em] text-blue-400/60">
            Casos reales
          </p>
          <h2 className="text-2xl font-light text-slate-100">
            No mockups. No plantillas. Proyectos terminados.
          </h2>
        </Reveal>

        {/* Caso 1: Atucasa */}
        <Reveal as="article" className="mb-6 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0c1526]">
          <div className="flex items-center justify-between gap-4 border-b border-white/[0.07] px-6 py-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-blue-400/55">
                Servicios de importación
              </p>
              <h3 className="mt-0.5 text-base font-medium text-slate-100">Atucasa</h3>
            </div>
            <Link
              href="https://atucasa.net/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver Atucasa (se abre en nueva pestaña)"
              className="shrink-0 rounded text-xs text-blue-300/65 underline underline-offset-4 outline-none transition hover:text-blue-200 focus-visible:ring-2 focus-visible:ring-blue-400/60"
            >
              ver sitio →
            </Link>
          </div>

          <div className="grid md:grid-cols-2">
            <div className="border-b border-white/[0.07] p-6 md:border-b-0 md:border-r">
              <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-amber-400/60">
                Antes
              </p>
              <ul className="space-y-3 text-sm leading-relaxed text-slate-300/70">
                <li className="flex gap-2.5">
                  <span className="mt-1 shrink-0 text-amber-400/35">—</span>
                  Sin web propia. Todo pasaba por Instagram y WhatsApp.
                </li>
                <li className="flex gap-2.5">
                  <span className="mt-1 shrink-0 text-amber-400/35">—</span>
                  Sin precios visibles ni proceso claro. Cada consulta arrancaba desde cero.
                </li>
                <li className="flex gap-2.5">
                  <span className="mt-1 shrink-0 text-amber-400/35">—</span>
                  Mucho tiempo en consultas que no convertían.
                </li>
              </ul>
            </div>

            <div className="p-6">
              <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-blue-400/60">
                Después
              </p>
              <ul className="mb-6 space-y-3 text-sm leading-relaxed text-slate-300/70">
                <li className="flex gap-2.5">
                  <span className="mt-1 shrink-0 text-blue-400/35">—</span>
                  Web con calculadora de costos, proceso paso a paso y contacto directo.
                </li>
                <li className="flex gap-2.5">
                  <span className="mt-1 shrink-0 text-blue-400/35">—</span>
                  Cada visita entiende qué hacen, para quién y cuánto sale antes de escribir.
                </li>
                <li className="flex gap-2.5">
                  <span className="mt-1 shrink-0 text-blue-400/35">—</span>
                  Consultas más calificadas. Menos tiempo explicando lo mismo.
                </li>
              </ul>
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-white/10">
                <Image
                  src="/proyect.jpg"
                  alt="Plataforma web de Atucasa — servicios de importación"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </Reveal>

        {/* Caso 2: Banca (NDA) */}
        <Reveal as="article" delayMs={120} className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0c1526]">
          <div className="border-b border-white/[0.07] px-6 py-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-blue-400/55">
              Servicios financieros · Confidencial
            </p>
            <h3 className="mt-0.5 text-base font-medium text-slate-100">Plataforma bancaria</h3>
          </div>

          <div className="grid md:grid-cols-2">
            <div className="border-b border-white/[0.07] p-6 md:border-b-0 md:border-r">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-amber-400/60">
                El desafío
              </p>
              <p className="text-sm leading-relaxed text-slate-300/70">
                Plataforma de escala empresarial con flujos críticos: autenticación, onboarding
                y operaciones financieras. Millones de sesiones mensuales. Cero margen de error
                en experiencia de usuario.
              </p>
            </div>

            <div className="p-6">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-blue-400/60">
                El trabajo
              </p>
              <p className="mb-5 text-sm leading-relaxed text-slate-300/70">
                Rediseño y desarrollo de flujos clave. Arquitectura de componentes reutilizables.
                Optimización de rendimiento en pantallas de alta carga de datos.
              </p>
              <span className="inline-flex items-center gap-1.5 rounded-md border border-amber-500/20 bg-amber-950/30 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-amber-200/65">
                NDA · Sin imágenes
              </span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── PROCESO ──────────────────────────────────────────────────────── */}
      <section id="proceso" className="mx-auto max-w-4xl scroll-mt-28 px-6 py-20">
        <Reveal as="div" className="mb-12">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.26em] text-blue-400/60">
            Sin sorpresas
          </p>
          <h2 className="text-2xl font-light text-slate-100">Cómo trabajamos</h2>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESO.map((paso, i) => (
            <Reveal
              key={paso.num}
              as="div"
              delayMs={i * 80}
              className="rounded-xl border border-white/[0.07] bg-[#0c1526] p-6"
            >
              <div className="mb-5 flex items-start justify-between gap-2">
                <span className="font-mono text-3xl font-light leading-none text-blue-400/18">
                  {paso.num}
                </span>
                <span className="text-right font-mono text-[10px] leading-tight text-slate-500">
                  {paso.tiempo}
                </span>
              </div>
              <h3 className="mb-2 text-sm font-semibold text-slate-100">{paso.titulo}</h3>
              <p className="text-xs leading-relaxed text-slate-400">{paso.desc}</p>
            </Reveal>
          ))}
        </div>

        <Reveal as="p" delayMs={360} className="mt-6 text-center text-xs text-slate-500">
          El primer paso es gratis.{" "}
          <Link
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackWA}
            className="text-blue-400 underline underline-offset-4 transition hover:text-blue-300"
          >
            Agendalo por WhatsApp →
          </Link>
        </Reveal>
      </section>

      {/* ── TESTIMONIOS ──────────────────────────────────────────────────── */}
      <section id="testimonios" className="mx-auto max-w-5xl scroll-mt-28 px-6 py-20">
        <Reveal as="div" className="mb-12">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.26em] text-blue-400/60">
            Clientes
          </p>
          <h2 className="text-2xl font-light text-slate-100">Lo que dicen</h2>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIOS.map((t, i) => (
            <Reveal
              key={t.nombre}
              as="blockquote"
              delayMs={i * 80}
              className="flex flex-col rounded-2xl border border-white/[0.07] bg-[#0c1526] p-6"
            >
              <p className="flex-1 text-sm leading-relaxed text-slate-300/80">
                &ldquo;{t.texto}&rdquo;
              </p>
              <footer className="mt-6 flex items-center gap-3">
                <Image
                  src={t.img}
                  alt={t.nombre}
                  width={40}
                  height={40}
                  className="rounded-full object-cover ring-1 ring-white/10"
                />
                <div>
                  <p className="text-sm font-medium text-slate-100">{t.nombre}</p>
                  <p className="text-xs text-slate-500">{t.rol}</p>
                </div>
              </footer>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CIERRE ────────────────────────────────────────────────────────── */}
      <section id="contacto" className="mx-auto max-w-3xl scroll-mt-28 px-6 py-20">
        <Reveal as="div" className="overflow-hidden rounded-3xl border border-white/[0.07] bg-[#0c1526]">
          <div className="relative p-8 md:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-10%,rgba(59,130,246,0.09),transparent)]"
            />

            <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
              <div>
                <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.26em] text-blue-400/60">
                  Diagnóstico gratis
                </p>
                <h2 className="text-3xl font-light leading-tight text-white sm:text-4xl">
                  ¿Tu web convierte?<br />
                  En 30 minutos<br />
                  lo sabemos.
                </h2>
                <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-300/70">
                  Escribime y coordinamos una llamada. Te digo exactamente qué está frenando
                  tus ventas y qué haría para arreglarlo. Sin costo. Sin obligación de
                  contratar.
                </p>

                <div className="mt-8">
                  <Link
                    href={WA}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={trackWA}
                    className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-8 py-4 text-[15px] font-semibold text-white shadow-[0_8px_32px_rgba(37,211,102,0.28)] outline-none transition hover:brightness-110 motion-safe:hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-green-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c1526]"
                  >
                    <IconWA />
                    Escribirme por WhatsApp
                  </Link>
                  <p className="mt-3 text-xs text-slate-500">
                    O por mail:{" "}
                    <a
                      href="mailto:magui.cerisola@gmail.com"
                      className="text-slate-400 underline underline-offset-4 transition hover:text-slate-300"
                    >
                      magui.cerisola@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Retrato */}
              <div className="hidden md:block">
                <div className="relative h-48 w-40 overflow-hidden rounded-2xl border border-white/10">
                  <Image
                    src="/cv.jpeg"
                    alt="Magali Cerisola"
                    fill
                    className="object-cover object-top"
                    sizes="160px"
                  />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="mx-auto max-w-5xl border-t border-white/[0.05] px-6 py-10 flex flex-col items-center gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="https://www.linkedin.com/in/magali-cerisola-1a5111167/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="rounded-full text-slate-600 transition hover:text-slate-300 outline-none focus-visible:ring-2 focus-visible:ring-blue-400/55"
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
            className="rounded-full text-slate-600 transition hover:text-slate-300 outline-none focus-visible:ring-2 focus-visible:ring-blue-400/55"
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
            className="rounded-full text-slate-600 transition hover:text-slate-300 outline-none focus-visible:ring-2 focus-visible:ring-blue-400/55"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
            </svg>
          </Link>
        </div>
        <p className="text-xs text-slate-700">
          &copy; {new Date().getFullYear()} Magali Cerisola. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}
