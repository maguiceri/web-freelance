"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Subrayado que se dibuja cuando el texto entra en pantalla.
 * Estaba definido dentro de page.tsx; ahora lo comparten las tres rutas.
 */
export default function Highlight({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          obs.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      className={`text-mark ${on ? "text-mark-on" : ""}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </span>
  );
}
