"use client";

import Image from "next/image";
import Reveal from "../ui/Reveal";
import Highlight from "../ui/Highlight";
import { BIO } from "../../lib/content";

export default function QuienSoy({ z = 14 }: { z?: number }) {
  return (
    <section
      id="quien-soy"
      style={{ zIndex: z }}
      className="relative stack-card border border-[#1E2A44] bg-[#080E1C] py-[clamp(72px,10vw,130px)] scroll-mt-20"
    >
      <div className="mx-auto max-w-[1080px] px-[4vw]">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          <div className="shrink-0 mx-auto lg:mx-0">
            <div className="relative aspect-[4/5] rounded-[20px] overflow-hidden w-[260px] lg:w-[320px]">
              {/* La foto es más alta que el marco: se encuadra en las dos caras. */}
              <Image
                src="/perfil.png"
                alt="Magali Cerisola sonriendo junto a su perra, que le apoya el hocico en la cara"
                fill
                sizes="(min-width: 1024px) 320px, 260px"
                className="object-cover object-[50%_30%]"
              />
              {/* Dónde está la cara de la perra dentro del marco. Ahí termina el
                  camino de "Cómo trabajo": si cambia la foto o el encuadre,
                  hay que mover este punto. */}
              <span data-perra aria-hidden className="absolute left-[32%] top-[62%]" />
{/* Velo que tapa la foto. Por defecto no se dibuja (la foto se ve);
                  el camino de "Cómo trabajo" lo muestra y lo levanta de abajo
                  hacia arriba cuando la perra llega. */}
              <div data-velo aria-hidden className="invisible absolute inset-0 bg-[#080E1C]" />
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
              {BIO.titulo}
            </Reveal>

            <Reveal
              as="p"
              delayMs={80}
              className="text-[#EEF2F9] text-[clamp(16px,1.8vw,18px)] leading-relaxed mb-5"
            >
              Programo hace 6 años,{" "}
              <Highlight delay={200}>5 de ellos en el Banco Santander Argentina.</Highlight> Un día me di cuenta
              de que lo que más disfrutaba era hacer que las cosas se movieran, sorprendieran y se
              sintieran vivas.
            </Reveal>

            <Reveal
              as="p"
              delayMs={140}
              className="text-[#EEF2F9] text-[clamp(15px,1.6vw,17px)] leading-relaxed font-medium border-l-2 border-[var(--accent)] pl-4"
            >
              Ahora me dedico a eso: webs animadas para marcas que quieren{" "}
              <Highlight delay={300}>que las recuerden.</Highlight>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
