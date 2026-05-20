"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

type Direction = "up" | "down" | "left" | "right" | "fade";

type RevealProps = {
  as?: ElementType;
  delayMs?: number;
  direction?: Direction;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

const initialTransform: Record<Direction, string> = {
  up: "translate3d(0, 28px, 0)",
  down: "translate3d(0, -28px, 0)",
  left: "translate3d(-28px, 0, 0)",
  right: "translate3d(28px, 0, 0)",
  fade: "translate3d(0, 0, 0)",
};

export default function Reveal({
  as: Tag = "div",
  delayMs = 0,
  direction = "up",
  className = "",
  style,
  children,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Element = Tag as ElementType;

  return (
    <Element
      ref={ref as React.Ref<HTMLElement>}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translate3d(0,0,0)" : initialTransform[direction],
        transition: "opacity 700ms ease-out, transform 700ms ease-out",
        transitionDelay: `${delayMs}ms`,
        willChange: shown ? "auto" : "opacity, transform",
        ...style,
      }}
    >
      {children}
    </Element>
  );
}
