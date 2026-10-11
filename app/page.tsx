import type { Metadata } from "next";
import HeroZoom from "./components/sections/HeroZoom";
import Trabajos from "./components/sections/trabajos/Trabajos";
import Camino from "./components/sections/Camino";
import QuienSoy from "./components/sections/QuienSoy";
import Faq from "./components/sections/Faq";
import Cierre from "./components/sections/Cierre";
import Highlight from "./components/ui/Highlight";
import { BASE_URL, FAQS_GENERALES, IDENTITY } from "./lib/content";

export const metadata: Metadata = {
  title: "Webs y sistemas a medida para negocios | Magali Cerisola",
  description: IDENTITY.tagline,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: BASE_URL,
    title: "Webs y sistemas a medida para negocios | Magali Cerisola",
    description: IDENTITY.tagline,
  },
};

export default function Home() {
  return (
    <>
      <HeroZoom />

      <Trabajos />

      {/* Camino va por encima de QuienSoy: su línea termina sobre esa foto. */}
      <Camino z={14} />

      <QuienSoy z={13} />

      <Faq faqs={FAQS_GENERALES} pageUrl={BASE_URL} z={15} />

      <Cierre
        contexto="general"
        z={16}
        titulo={<>¿Sumamos tu marca a <Highlight delay={400}>este universo?</Highlight></>}
        bajada="Escribime con tu idea y armamos juntos una web que no se olvide."
        boton="Empezar mi web"
      />
    </>
  );
}
