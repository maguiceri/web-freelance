/**
 * Fuente única de verdad del sitio.
 *
 * Todo lo que se muestre en pantalla, se marque en JSON-LD o se sirva en
 * /llms.txt sale de acá. No dupliques strings en los componentes: importalos
 * de este archivo.
 *
 * Lo que tiene que coincidir entre las tres superficies son los HECHOS —
 * nombre, servicios, plazos, métricas, ubicación —, no la redacción literal.
 * Por eso los servicios tienen dos versiones del mismo contenido: `intro` en
 * primera persona para la página, y `standalone` en tercera para las máquinas.
 * Un JSON-LD que diga "hago webs" sin sujeto no sirve; una página que hable de
 * Magali en tercera persona suena a folleto ajeno.
 */

export const BASE_URL = "https://www.maguiceri.dev";

export const IDENTITY = {
  name: "Magali Cerisola",
  alternateName: "Magui",
  jobTitle: "Desarrolladora freelance",
  email: "magui.cerisola@gmail.com",
  phone: "+5491178230346",
  locality: "Buenos Aires",
  country: "Argentina",
  areaServed: "Latinoamérica",
  /** Nombre del servicio en schema.org. */
  servicio: "Diseño y desarrollo de webs animadas",
  /** Una sola frase que define el negocio. Se repite igual en schema y llms.txt. */
  tagline:
    "Desarrolladora freelance en Buenos Aires. Diseño y programo webs animadas, con scroll interactivo, para marcas de toda Latinoamérica.",
  sameAs: [
    "https://www.instagram.com/magui.dev",
    "https://www.linkedin.com/in/magali-cerisola-1a5111167/",
    "https://github.com/maguiceri",
  ],
  knowsAbout: [
    "Desarrollo web",
    "Diseño web orientado a conversión",
    "Animaciones web con scroll",
    "React",
    "Next.js",
    "TypeScript",
  ],
} as const;

/** Link a WhatsApp con el mensaje precargado. */
export function waLink() {
  const texto = "Hola Magali, vi tu web y quiero consultarte.";
  return `https://wa.me/${IDENTITY.phone.replace("+", "")}?text=${encodeURIComponent(texto)}`;
}

export type Faq = { q: string; a: string };

/* ── Quién soy ──────────────────────────────────────────────────────────── */

export const BIO = {
  titulo: "Soy Magui (y ella es mi compañera de oficina 🐶).",
  parrafos: [
    "Programo hace 6 años, 5 de ellos en el Banco Santander Argentina. Un día me di cuenta de que lo que más disfrutaba era hacer que las cosas se movieran, sorprendieran y se sintieran vivas.",
    "Ahora me dedico a eso: webs animadas para marcas que quieren que las recuerden.",
  ],
} as const;

/* ── Cómo trabajo (home) ────────────────────────────────────────────────── */

/**
 * Paradas del camino de la home, en orden. El dominio no es un paso: va por un
 * camino paralelo que arranca junto al primero y se une en el último.
 */
export const CAMINO = {
  /**
   * `quien`: a quién le toca ese paso (se muestra como etiqueta).
   * `destacado`: parte del título que va resaltada; tiene que estar escrita
   * igual que en `titulo`.
   */
  pasos: [
    {
      quien: "vos",
      titulo: "Me contás tu idea",
      destacado: "tu idea",
      desc: "Me mandás la identidad de tu marca (logo, colores, tipografías), webs que te gusten y la idea que tengas en mente.",
    },
    {
      quien: "yo",
      titulo: "Maqueta en 2 días",
      destacado: "2 días",
      desc: "Te muestro cómo se va a ver la home, con sus animaciones.",
    },
    {
      quien: "vos",
      titulo: "Me pasás el contenido",
      destacado: "el contenido",
      desc: "Si la maqueta te gusta, me enviás los textos e imágenes para completar la web.",
    },
    {
      quien: "yo",
      titulo: "Tu web online en 6 a 7 días",
      destacado: "6 a 7 días",
      desc: "La desarrollo a medida y queda publicada.",
    },
  ],
  dominio: {
    titulo: "Tu dominio",
    desc: "En paralelo te envío una guía en PDF para sacar tu dominio si todavía no lo tenés. Siempre queda a tu nombre.",
  },
} as const;

/* ── Preguntas frecuentes ──────────────────────────────────────────────────── */

export const FAQS_GENERALES: Faq[] = [
  {
    q: "¿Qué tipo de webs hacés?",
    a: "Webs con animaciones y scroll interactivo, pensadas para que tu marca se recuerde y la información sea fácil de recorrer. Para tiendas online también trabajo con Shopify y Tiendanube, según lo que necesite cada proyecto.",
  },
  {
    q: "¿Cómo se paga?",
    a: "50% al empezar el proyecto y 50% al entregarlo.",
  },
  {
    q: "¿El dominio queda a mi nombre?",
    a: "Sí, siempre. Además te dejo una guía para que puedas administrarlo.",
  },
  {
    q: "¿Incluye SEO?",
    a: "Sí. Incluye SEO básico (títulos, descripciones y velocidad de carga) y optimización para que tu web aparezca en buscadores con inteligencia artificial como ChatGPT (GEO).",
  },
  {
    q: "¿Hay costos mensuales?",
    a: "Podés elegir entre dos opciones: un mantenimiento mensual fijo, que incluye cambios chicos y monitoreo para que todo funcione bien, o pagar solo cuando necesites un cambio puntual.",
  },
  {
    q: "¿Las animaciones hacen lenta la web?",
    a: "No. Están optimizadas y se cargan solo cuando hacen falta, así que la web es rápida también en el celular.",
  },
  {
    q: "¿Cómo empiezo?",
    a: "Escribime por WhatsApp o Instagram contándome de qué se trataría tu web y qué información te gustaría que muestre.",
  },
];
