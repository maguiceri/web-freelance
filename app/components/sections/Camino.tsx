"use client";

import Image from "next/image";
import { useRef } from "react";
import Reveal from "../ui/Reveal";
import Highlight from "../ui/Highlight";
import { gsap, MQ, useGSAP } from "../../lib/gsap";
import { CAMINO } from "../../lib/content";

type Punto = { x: number; y: number };

/** Tramo en S entre dos puntos: sale y llega en vertical. */
const curva = (a: Punto, b: Punto) => {
  const medio = ((a.y + b.y) / 2).toFixed(1);
  return ` C ${a.x.toFixed(1)},${medio} ${b.x.toFixed(1)},${medio} ${b.x.toFixed(1)},${b.y.toFixed(1)}`;
};

/** Cuánto antes de que la línea llegue a una parada empieza a encenderse (fracción del recorrido). */
const PRENDE = 0.05;

/**
 * "Cómo trabajo": un camino que se dibuja con el scroll y para en cada paso.
 *
 * El camino no tiene coordenadas fijas: se arma midiendo dónde quedaron los
 * marcadores en el layout, así que sigue al contenido en cualquier ancho. En
 * mobile los marcadores alternan dentro de un margen angosto a la izquierda y
 * el camino baja serpenteando; en desktop alternan a los lados del centro y el
 * camino hace un zigzag amplio.
 *
 * Después de la última parada el camino sigue hasta la foto de "Quién soy" (la
 * sección de abajo), así que esta sección tiene que quedar por encima de esa:
 * su `z` debe ser mayor.
 *
 * Cada paso es una tarjeta: se enciende cuando la línea llega y se atenúa
 * cuando se enciende la siguiente, para que siempre haya un solo paso en foco.
 *
 * El dominio va por un camino más fino que sale de su tarjeta, corre al lado
 * del principal y se le une en la última parada.
 *
 * Reducir movimiento: el camino se dibuja entero y los pasos quedan como una
 * lista común. Sin JS: la lista, sin camino.
 */
export default function Camino({ z = 13 }: { z?: number }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const principal = useRef<SVGPathElement>(null);
  const guia = useRef<SVGPathElement>(null);
  const dominio = useRef<SVGPathElement>(null);
  const medidor = useRef<SVGPathElement>(null);
  const tarjeta = useRef<HTMLDivElement>(null);
  const brote = useRef<HTMLSpanElement>(null);
  const perro = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add({ motion: MQ.motion, quieto: "(prefers-reduced-motion: reduce)" }, (ctx) => {
        const animar = Boolean(ctx.conditions?.motion);
        const paradas = gsap.utils.toArray<HTMLElement>("[data-parada]", track.current);
        const textos = gsap.utils.toArray<HTMLElement>("[data-texto]", track.current);
        const velo = document.querySelector<HTMLElement>("[data-perra] ~ [data-velo]");
        const animados = [...paradas, ...textos, tarjeta.current, perro.current, velo];
        const lineas = [principal.current, guia.current, dominio.current];
        let tl: gsap.core.Timeline | null = null;

        const limpiar = () => {
          tl?.scrollTrigger?.kill();
          tl?.kill();
          tl = null;
          gsap.set(animados, { clearProps: "all" });
          gsap.set(lineas, { clearProps: "strokeDasharray,strokeDashoffset" });
        };

        const armar = () => {
          limpiar();

          const caja = track.current!.getBoundingClientRect();
          const centro = (el: Element): Punto => {
            const r = el.getBoundingClientRect();
            return { x: r.left + r.width / 2 - caja.left, y: r.top + r.height / 2 - caja.top };
          };
          const p = paradas.map(centro);
          const ultima = p[p.length - 1];

          const desktop = window.matchMedia("(min-width: 1024px)").matches;

          // Camino principal: entra desde arriba y pasa por todas las paradas.
          const inicio = { x: p[0].x + (p[1].x - p[0].x) * 0.3, y: -56 };
          const base = `M ${inicio.x.toFixed(1)},${inicio.y}`;
          const tramos = p.map((punto, i) => curva(i ? p[i - 1] : inicio, punto));

          // Después sigue hasta la foto de "Quién soy", donde la perra del
          // camino se funde con la de la foto: baja por la izquierda del marco
          // y entra de costado a la altura de la perra, para no cruzar la
          // cara. Con movimiento reducido (o si esa foto no está en la página)
          // termina en la última parada.
          const destino = animar ? document.querySelector("[data-perra]") : null;
          const marco = destino?.parentElement?.getBoundingClientRect();
          if (destino && marco) {
            const perra = centro(destino);
            const costado = marco.left - caja.left - 28;
            const arriba = { x: costado, y: marco.top - caja.top - 48 };
            tramos.push(
              curva(ultima, arriba),
              ` L ${costado.toFixed(1)},${(perra.y - 40).toFixed(1)}`,
              ` Q ${costado.toFixed(1)},${perra.y.toFixed(1)} ${perra.x.toFixed(1)},${perra.y.toFixed(1)}`,
            );
          }
          const d = base + tramos.join("");
          guia.current!.setAttribute("d", d);
          principal.current!.setAttribute("d", d);

          // En qué fracción del recorrido cae cada parada.
          const largos = tramos.map((_, i) => {
            medidor.current!.setAttribute("d", base + tramos.slice(0, i + 1).join(""));
            return medidor.current!.getTotalLength();
          });
          const total = largos[largos.length - 1];
          const llegada = largos.map((l) => l / total);

          // Camino del dominio: sale de su tarjeta, acompaña al principal
          // corrido unos px y termina en la última parada.
          const separacion = desktop ? 26 : 20;
          const ruta = [
            centro(brote.current!),
            ...p.slice(1, -1).map((punto) => ({ x: punto.x + separacion, y: punto.y })),
            ultima,
          ];
          dominio.current!.setAttribute(
            "d",
            `M ${ruta[0].x.toFixed(1)},${ruta[0].y.toFixed(1)}` +
              ruta.slice(1).map((punto, i) => curva(ruta[i], punto)).join(""),
          );

          if (!animar) return;

          // La línea se corta en el borde de la foto; adentro sigue sólo el
          // medallón. Se busca desde el final dónde el camino sale del marco.
          let visible = total;
          if (marco) {
            const adentro = (l: number) => {
              const pt = principal.current!.getPointAtLength(l);
              return pt.x + caja.left >= marco.left && pt.y + caja.top >= marco.top;
            };
            while (visible > 0 && adentro(visible)) visible -= 4;
          }
          const borde = visible / total;

          const largoDominio = dominio.current!.getTotalLength();
          gsap.set(principal.current, { strokeDasharray: total, strokeDashoffset: total });
          gsap.set(guia.current, { strokeDasharray: `${visible} ${total}` });
          gsap.set(dominio.current, { strokeDasharray: largoDominio, strokeDashoffset: largoDominio });

          tl = gsap
            .timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: track.current,
                start: "top 65%",
                // Termina cuando la punta llega a la foto de "Quién soy".
                ...(destino
                  ? { endTrigger: destino, end: "center 55%" }
                  : { end: "bottom 55%" }),
                scrub: 0.4,
              },
            })
            .to(principal.current, { strokeDashoffset: total - visible, duration: borde }, 0)
            // El perro va en la punta de la línea.
            .to(
              perro.current,
              {
                motionPath: {
                  path: principal.current!,
                  align: principal.current!,
                  alignOrigin: [0.5, 0.5],
                },
                duration: 1,
              },
              0,
            )
            .fromTo(perro.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.02 }, 0);

          // Adentro de la foto, el medallón crece y se desvanece sobre la
          // perra de verdad.
          if (destino) {
            tl.to(perro.current, { autoAlpha: 0, scale: 1.9, duration: 1 - borde, ease: "power1.in" }, borde);
          }

          // La foto está tapada hasta que la perra dobla hacia ella; ahí se
          // destapa de abajo hacia arriba, que es hacia donde mira.
          if (destino && velo) {
            const dobla = largos[largos.length - 2] / total;
            gsap.set(velo, { visibility: "visible" });
            tl.fromTo(velo, { yPercent: 0 }, { yPercent: -101, duration: 1 - dobla }, dobla);
          }

          paradas.forEach((parada, i) => {
            const cuando = Math.max(0, llegada[i] - PRENDE);
            tl!
              .fromTo(
                parada,
                { backgroundColor: "#0B1120", borderColor: "#1E2A44", color: "#3A4A6B", scale: 0.85 },
                { backgroundColor: "#2F5FD0", borderColor: "#5B8DEF", color: "#FFFFFF", scale: 1, duration: PRENDE },
                cuando,
              )
              .fromTo(
                textos[i],
                { autoAlpha: 0, y: 16, borderColor: "#1E2A44" },
                { autoAlpha: 1, y: 0, borderColor: "#5B8DEF", duration: PRENDE },
                cuando,
              );
            // Cuando se enciende la siguiente, esta pasa a segundo plano para
            // que la mirada vaya al paso actual. Al pasar el mouse vuelve.
            const siguiente = llegada[i + 1];
            if (siguiente !== undefined && i < paradas.length - 1) {
              tl!.to(
                textos[i],
                { autoAlpha: 0.6, borderColor: "#1E2A44", duration: PRENDE },
                siguiente - PRENDE,
              );
            }
          });

          const sale = llegada[0] + PRENDE;
          tl.fromTo(tarjeta.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: PRENDE }, llegada[0]).to(
            dominio.current,
            { strokeDashoffset: 0, duration: llegada[paradas.length - 1] - sale },
            sale,
          );
        };

        armar();

        // Si cambia el tamaño (rotación, fuentes que terminan de cargar), el
        // camino se vuelve a medir.
        let medida = "";
        let espera = 0;
        const ro = new ResizeObserver(([e]) => {
          const nueva = `${Math.round(e.contentRect.width)}x${Math.round(e.contentRect.height)}`;
          if (!medida) medida = nueva;
          if (nueva === medida) return;
          medida = nueva;
          window.clearTimeout(espera);
          espera = window.setTimeout(armar, 150);
        });
        ro.observe(track.current!);

        return () => {
          ro.disconnect();
          window.clearTimeout(espera);
          limpiar();
        };
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="como-trabajo"
      aria-labelledby="como-trabajo-titulo"
      style={{ zIndex: z }}
      className="stack-card relative scroll-mt-20 overflow-x-clip border border-[#1E2A44] bg-[#080E1C] py-[clamp(72px,10vw,130px)]"
    >
      <div className="mx-auto max-w-[1080px] px-5 lg:px-[4vw]">
        <Reveal
          as="p"
          className="mb-[14px] text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-ink)]"
        >
          Cómo trabajo
        </Reveal>
        <Reveal
          as="h2"
          delayMs={60}
          direction="left"
          className="font-display text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.12] tracking-[-0.03em] text-[#EEF2F9]"
        >
          <span id="como-trabajo-titulo">
            De tu idea a <Highlight delay={300}>tu web online.</Highlight>
          </span>
        </Reveal>

        <div ref={track} className="relative mt-24 lg:mt-28">
          <svg
            aria-hidden
            fill="none"
            strokeLinecap="round"
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          >
            <path ref={medidor} />
            <path ref={guia} stroke="#1E2A44" strokeWidth="2" />
            <path ref={dominio} stroke="var(--accent-ink)" strokeOpacity="0.7" strokeWidth="1.5" />
            <path ref={principal} stroke="var(--accent)" strokeWidth="3" />
          </svg>

          <ol className="relative list-none">
            {CAMINO.pasos.map((paso, i) => {
              const par = i % 2 === 1;
              const ultimo = i === CAMINO.pasos.length - 1;
              const [antes, despues] = paso.titulo.split(paso.destacado);
              return (
                <li
                  key={paso.titulo}
                  className={`relative lg:grid lg:grid-cols-[36%_28%_36%] lg:pl-0 ${par ? "pl-[86px]" : "pl-[54px]"} ${ultimo ? "" : "pb-14 lg:min-h-[300px] lg:pb-0"}`}
                >
                  <span
                    data-parada
                    className={`absolute top-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--accent-ink)] bg-[var(--accent)] font-display text-[12px] font-extrabold text-white lg:h-11 lg:w-11 lg:-translate-x-1/2 lg:text-[13px] ${par ? "left-[38px] lg:left-[64%]" : "left-[6px] lg:left-[36%]"}`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className={`lg:row-start-1 ${par ? "lg:col-start-3 lg:pl-14" : "lg:col-start-1 lg:pr-14"}`}>
                    <div
                      data-texto
                      className="rounded-[16px] border border-[#1E2A44] bg-[#0B1326] p-4 hover:border-[var(--accent-ink)]! hover:opacity-100! lg:p-6"
                    >
                      <p
                        className={`mb-2.5 inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${paso.quien === "yo" ? "bg-[var(--accent)] text-white" : "border border-[#2A3A5A] text-[#B8C2D6]"}`}
                      >
                        {paso.quien === "yo" ? "Mi parte" : "Tu parte"}
                      </p>
                      <h3 className="font-display text-[clamp(21px,2.4vw,27px)] font-bold leading-[1.15] tracking-[-0.02em] text-[#EEF2F9]">
                        {antes}
                        <span className="text-[var(--accent-ink)]">{paso.destacado}</span>
                        {despues}
                      </h3>
                      <p className="mt-2.5 text-[16px] leading-relaxed text-[#B8C2D6] lg:text-[17px]">
                        {paso.desc}
                      </p>
                    </div>
                  </div>

                  {i === 0 ? (
                    <div
                      ref={tarjeta}
                      className="relative ml-[36px] mt-7 rounded-[12px] border border-dashed border-[#2A3A5A] bg-[#05070F] px-4 py-3.5 lg:col-start-3 lg:row-start-1 lg:ml-10 lg:mt-16 lg:self-start lg:px-5 lg:py-4"
                    >
                      <span
                        ref={brote}
                        aria-hidden
                        className="absolute -left-[22px] top-4 h-3 w-3 rounded-full border-2 border-[var(--accent-ink)] bg-[#080E1C]"
                      />
                      <p className="font-display text-[17px] font-semibold text-[#EEF2F9]">
                        {CAMINO.dominio.titulo}
                      </p>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-[#B8C2D6]">
                        {CAMINO.dominio.desc}
                      </p>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ol>

          <div
            ref={perro}
            aria-hidden
            className="pointer-events-none invisible absolute left-0 top-0 z-10 h-10 w-10 overflow-hidden rounded-full border-2 border-[var(--accent-ink)] bg-[#0B1120] motion-reduce:hidden lg:h-14 lg:w-14"
          >
            {/* eager: el medallón se mueve con transform y la carga diferida no
                siempre lo detecta a tiempo. Pesa 12 KB. */}
            <Image
              src="/perro.jpg"
              alt=""
              width={56}
              height={56}
              loading="eager"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
