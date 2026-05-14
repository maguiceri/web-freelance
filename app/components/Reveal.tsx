"use client";

import React, { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  /**
   * Delay to sync the order (in ms).
   * Applied only when the element enters the viewport.
   */
  delayMs?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
};

export default function Reveal({
  children,
  delayMs = 0,
  className = "",
  as = "div",
}: RevealProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (reduceMotion.matches) {
        setVisible(true);
        return;
      }
    }

    if (!ref.current) return;

    const el = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      // Trigger on the "first scroll" (before fully visible).
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Comp = as as unknown as React.ElementType;

  return (
    <Comp
      ref={ref as unknown as React.Ref<HTMLElement>}
      className={
        visible
          ? `fadeDown ${className}`.trim()
          : `opacity-0 -translate-y-8 blur-sm ${className}`.trim()
      }
      style={
        visible
          ? ({
              animationDelay: `${delayMs / 1000}s`,
            } as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </Comp>
  );
}

