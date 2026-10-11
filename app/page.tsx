import type { Metadata } from "next";
import HeroZoom from "./components/sections/HeroZoom";
import Trabajos from "./components/sections/trabajos/Trabajos";
import Camino from "./components/sections/Camino";
import QuienSoy from "./components/sections/QuienSoy";
import Faq from "./components/sections/Faq";
import Cierre from "./components/sections/Cierre";
import Highlight from "./components/ui/Highlight";
import { BASE_URL, FAQS_GENERALES } from "./lib/content";

const TITULO = "Webs animadas para tu marca | Magali Cerisola";
const DESCRIPCION =
  "Diseño y programo webs animadas, con scroll interactivo, para que tu marca no se olvide.";

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRIPCION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: BASE_URL,
    title: TITULO,
    description: DESCRIPCION,
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
        z={16}
        titulo={<>¿Sumamos tu marca a <Highlight delay={400}>este universo?</Highlight></>}
        bajada="Escribime con tu idea y armamos juntos una web que no se olvide."
        boton="Empezar mi web"
      />
    </>
  );
}
