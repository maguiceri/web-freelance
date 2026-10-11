"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Video en loop que no pesa hasta que hace falta.
 *
 * - Arranca con `preload="none"` y sin <source>: lo único que baja es el poster.
 * - Cuando la tarjeta está a menos de un viewport de distancia se montan los
 *   <source>, y recién ahí el navegador puede pedir el archivo.
 * - Reproduce sólo mientras está en pantalla; al salir, pausa.
 * - Con "reducir movimiento" no hay autoplay: queda el poster con controles.
 */
export default function LazyVideo({
  video,
  poster,
  label,
}: {
  video: { mp4: string; webm?: string };
  poster: string;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [cerca, setCerca] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const cargar = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setCerca(true);
          cargar.disconnect();
        }
      },
      { rootMargin: "100% 50%" },
    );
    cargar.observe(el);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.controls = true;
      return () => cargar.disconnect();
    }

    const reproducir = new IntersectionObserver(
      ([e]) => {
        // play() rechaza si el navegador bloquea el autoplay (por ejemplo, en
        // modo ahorro de batería): queda el poster, que es lo esperado.
        if (e.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.4 },
    );
    reproducir.observe(el);

    return () => {
      cargar.disconnect();
      reproducir.disconnect();
    };
  }, []);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      aria-label={label}
      className="absolute inset-0 h-full w-full object-cover"
    >
      {cerca && video.webm ? <source src={video.webm} type="video/webm" /> : null}
      {cerca ? <source src={video.mp4} type="video/mp4" /> : null}
    </video>
  );
}
