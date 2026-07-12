"use client";

import { useRef, useEffect } from "react";

interface Props {
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function LogoMark({ height = 40, className = "", style }: Props) {
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef  = useRef<SVGCircleElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!path || !dot || !ring) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // — círculo —
    const circumference = 2 * Math.PI * 56;
    ring.style.strokeDasharray  = String(circumference);
    ring.style.strokeDashoffset = String(circumference);

    // — m —
    const mLen = path.getTotalLength();
    path.style.strokeDasharray  = String(mLen);
    path.style.strokeDashoffset = String(mLen);

    // — punto —
    dot.style.opacity = "0";

    void ring.getBoundingClientRect(); // fuerza reflow

    // 1. dibuja el círculo (arranca inmediatamente, desde las 12h)
    ring.style.transition = "stroke-dashoffset 1.1s cubic-bezier(0.4,0,0.2,1) 0.05s";
    ring.style.strokeDashoffset = "0";

    // 2. dibuja la m cuando el círculo está casi terminado
    path.style.transition = "stroke-dashoffset 1.0s cubic-bezier(0.4,0,0.2,1) 0.55s";
    path.style.strokeDashoffset = "0";

    // 3. aparece el punto al final
    const t = setTimeout(() => {
      dot.style.transition = "opacity 0.2s ease-out";
      dot.style.opacity = "1";
    }, 1650);

    return () => clearTimeout(t);
  }, []);

  return (
    <svg
      width={height}
      height={height}
      viewBox="0 0 120 120"
      fill="none"
      aria-label="m."
      role="img"
      className={className}
      style={{
        filter: "drop-shadow(0 0 8px rgba(59,123,255,0.45))",
        ...style,
      }}
    >
      {/* fondo oscuro dentro del círculo */}
      <circle cx="60" cy="60" r="56" fill="#030C1A" />

      {/* borde azul — rotado -90° para arrancar desde arriba (12h) */}
      <circle
        ref={ringRef}
        cx="60" cy="60" r="56"
        stroke="#3B7BFF"
        strokeWidth="2.5"
        transform="rotate(-90 60 60)"
      />

      {/* m — más espacio respecto al borde, patas llegan al fondo */}
      <path
        ref={pathRef}
        d="M31 84 L31 54 C31 36 55 36 55 54 L55 84 L55 54 C55 36 79 36 79 54 L79 84"
        stroke="#3B7BFF"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* punto */}
      <circle ref={dotRef} cx="90" cy="84" r="4.5" fill="#3B7BFF" />
    </svg>
  );
}
