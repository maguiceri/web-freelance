"use client";

import { useEffect, useRef, useState } from "react";
import Header from "./Header";

export default function FixedHeader() {
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = typeof window !== "undefined" ? window.scrollY : 0;
    let rafId = 0;

    const flush = () => {
      rafId = 0;
      const currentScrollY = window.scrollY;
      let next = true;
      if (currentScrollY < lastScrollY.current) {
        next = true;
      } else if (currentScrollY > lastScrollY.current) {
        next = false;
      }
      if (currentScrollY === 0) {
        next = true;
      }
      lastScrollY.current = currentScrollY;
      setShowHeader((prev) => (prev === next ? prev : next));
    };

    const handleScroll = () => {
      if (!rafId) rafId = window.requestAnimationFrame(flush);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      className={`fixed left-0 top-0 z-50 w-full transition-transform duration-200 ${showHeader ? "translate-y-0" : "-translate-y-full"}`}
    >
      <Header />
    </div>
  );
}
