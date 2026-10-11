"use client";

/**
 * Punto único de entrada a GSAP.
 *
 * Los componentes importan `gsap`, `ScrollTrigger` y `useGSAP` de acá, así los
 * plugins se registran una sola vez y la configuración global vive en un lugar.
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, useGSAP);

// En el navegador interno de Instagram la barra de direcciones aparece y
// desaparece al scrollear, y cada vez dispara un resize. Sin esto, ScrollTrigger
// recalcula en cada uno y las animaciones con scrub pegan un salto.
ScrollTrigger.config({ ignoreMobileResize: true });

/**
 * Condiciones para `gsap.matchMedia()`. Todo lo que sea zoom, pin o scroll
 * horizontal va detrás de `motion`: con "reducir movimiento" activado el sitio
 * queda en su versión estática, que es la que define el CSS por defecto.
 */
export const MQ = {
  motion: "(prefers-reduced-motion: no-preference)",
  desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  mobile: "(max-width: 1023.98px) and (prefers-reduced-motion: no-preference)",
} as const;

export { gsap, ScrollTrigger, useGSAP };
