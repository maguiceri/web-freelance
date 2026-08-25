"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Reveal from "../Reveal";
import Highlight from "../Highlight";
import { BIO, IDENTITY } from "../../lib/content";

export default function QuienSoy({ z = 14 }: { z?: number }) {
  const photoRef = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = photoRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="quien-soy"
      style={{ zIndex: z }}
      className="relative stack-card border border-[#1E2A44] bg-[#080E1C] py-[clamp(72px,10vw,130px)] scroll-mt-20"
    >
      <div className="mx-auto max-w-[1080px] px-[4vw]">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          <div ref={photoRef} className="shrink-0 mx-auto lg:mx-0">
            <div className="relative rounded-[20px] overflow-hidden w-[260px] lg:w-[320px]">
              <Image
                src="/perfil.jpg"
                alt="Magali Cerisola, desarrolladora freelance en Buenos Aires"
                width={320}
                height={380}
                className="object-cover w-full h-auto block"
              />
              <div
                className="absolute inset-0 bg-[#080E1C]"
                style={{
                  transform: vis ? "translateX(101%)" : "translateX(0)",
                  transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1)",
                  transitionDelay: "0.1s",
                }}
              />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <Reveal
              as="p"
              className="text-[12px] font-semibold tracking-[0.18em] uppercase text-[var(--accent-ink)] mb-4"
            >
              Quién soy
            </Reveal>

            <Reveal
              as="h2"
              delayMs={40}
              direction="left"
              className="font-display font-extrabold text-[clamp(26px,3.4vw,38px)] tracking-[-0.03em] leading-[1.12] text-[#EEF2F9] mb-6"
            >
              Soy {IDENTITY.name}, {IDENTITY.jobTitle.toLowerCase()}.
            </Reveal>

            <Reveal
              as="p"
              delayMs={80}
              className="text-[#EEF2F9] text-[clamp(16px,1.8vw,18px)] leading-relaxed mb-5"
            >
              Trabajé 6 años como desarrolladora,{" "}
              <Highlight delay={200}>5 de ellos en Banco Santander.</Highlight> Ahí aprendí que la
              tecnología no puede fallar cuando hay gente y plata real del otro lado.
            </Reveal>

            <Reveal
              as="p"
              delayMs={140}
              className="text-[#7C89A3] text-[clamp(15px,1.6vw,17px)] leading-relaxed mb-5"
            >
              Hoy aplico esa misma exigencia a negocios que están creciendo —{" "}
              <Highlight delay={300}>sin la letra chica</Highlight> ni los intermediarios de una
              agencia grande.
            </Reveal>

            <Reveal
              as="p"
              delayMs={200}
              className="text-[#EEF2F9] text-[clamp(15px,1.6vw,17px)] leading-relaxed font-medium border-l-2 border-[var(--accent)] pl-4"
            >
              {BIO.cierre}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
