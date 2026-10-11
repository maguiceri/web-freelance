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
 * - Un botón permite pausarlo; si se pausa a mano, no se reanuda solo.
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
  const [reproduciendo, setReproduciendo] = useState(false);
  /** Si la persona lo pausó a mano, no se reanuda solo al volver a pantalla. */
  const pausadoAMano = useRef(false);

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
        if (!e.isIntersecting) el.pause();
        else if (!pausadoAMano.current) el.play().catch(() => {});
      },
      { threshold: 0.4 },
    );
    reproducir.observe(el);

    return () => {
      cargar.disconnect();
      reproducir.disconnect();
    };
  }, []);

  const alternar = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      pausadoAMano.current = false;
      el.play().catch(() => {});
    } else {
      pausadoAMano.current = true;
      el.pause();
    }
  };

  return (
    <>
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="none"
        poster={poster}
        aria-label={label}
        onPlay={() => setReproduciendo(true)}
        onPause={() => setReproduciendo(false)}
        className="absolute inset-0 h-full w-full object-cover"
      >
        {cerca && video.webm ? <source src={video.webm} type="video/webm" /> : null}
        {cerca ? <source src={video.mp4} type="video/mp4" /> : null}
      </video>

      {/* Un loop que no se puede frenar molesta a quien quiere leer la
          tarjeta. Con "reducir movimiento" el video ya trae sus controles. */}
      <button
        type="button"
        onClick={alternar}
        aria-label={reproduciendo ? `Pausar el video de ${label}` : `Reproducir el video de ${label}`}
        className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#05070F]/70 text-white outline-none backdrop-blur-sm transition-colors hover:bg-[#05070F]/90 focus-visible:ring-2 focus-visible:ring-[var(--accent-ink)] motion-reduce:hidden"
      >
        <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4" aria-hidden>
          {reproduciendo ? (
            <path d="M4 2.5h3v11H4zM9 2.5h3v11H9z" />
          ) : (
            <path d="M4.5 2.2v11.6L13.5 8z" />
          )}
        </svg>
      </button>
    </>
  );
}
