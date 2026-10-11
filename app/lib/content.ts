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
  /** Una sola frase que define el negocio. Se repite igual en schema y llms.txt. */
  tagline:
    "Desarrolladora freelance en Buenos Aires. Hago webs que convierten visitas en clientes y sistemas a medida que automatizan procesos manuales, para negocios de toda Latinoamérica.",
  sameAs: [
    "https://www.instagram.com/magui.dev",
    "https://www.linkedin.com/in/magali-cerisola-1a5111167/",
    "https://github.com/maguiceri",
  ],
  knowsAbout: [
    "Desarrollo web",
    "Diseño web orientado a conversión",
    "Sistemas a medida",
    "Automatización de procesos",
    "React",
    "Next.js",
    "TypeScript",
  ],
} as const;

/** Mensaje de WhatsApp precargado según de dónde venga la persona. */
export function waLink(context: "general" | "webs" | "sistemas" = "general") {
  const texts = {
    general: "Hola Magali, vi tu web y quiero mi web animada.",
    webs: "Hola Magali, quiero una web para mi negocio. ¿Me pasás presupuesto?",
    sistemas:
      "Hola Magali, quiero automatizar un proceso de mi negocio. ¿Me pasás presupuesto?",
  };
  return `https://wa.me/${IDENTITY.phone.replace("+", "")}?text=${encodeURIComponent(texts[context])}`;
}

/* ── Servicios ──────────────────────────────────────────────────────────── */

export type Paso = { cuando: string; titulo: string; desc: string };
export type Faq = { q: string; a: string };

export type Servicio = {
  slug: "webs" | "sistemas";
  /** Nombre corto para navegación. */
  nav: string;
  /** Nombre del servicio en schema.org. */
  name: string;
  /** <title> de la ruta dedicada. */
  metaTitle: string;
  /** <meta name="description"> de la ruta dedicada. */
  metaDescription: string;
  /** Titular de la sección/página. */
  heading: string;
  /**
   * Bajada visible del hero. Primera persona: es la voz del sitio, la misma
   * de "Quién soy" y del resto del copy.
   */
  intro: string;
  /**
   * La misma información en tercera persona y con el nombre adelante, para que
   * se entienda citada fuera de contexto. NO se muestra en pantalla: va sólo a
   * JSON-LD y a /llms.txt, donde el sujeto tiene que ser explícito.
   */
  standalone: string;
  /** Copy del bloque "¿Qué necesitás?" en el hub. */
  bifurcacion: string;
  pasos: Paso[];
  faqs: Faq[];
};

export const SERVICIOS: Servicio[] = [
  {
    slug: "webs",
    nav: "Webs",
    name: "Diseño y desarrollo de páginas web para negocios",
    metaTitle: "Páginas web para negocios | Magali Cerisola",
    metaDescription:
      "Diseño y programo páginas web que convierten visitas en clientes. Desarrolladora freelance en Buenos Aires, trabajo remoto con negocios de toda Latinoamérica. Entrega en 4 días hábiles.",
    heading: "Webs que convierten visitas en clientes",
    intro:
      "Diseño y programo páginas web a medida para negocios que ya invierten en publicidad y no logran vender. Te la entrego online y funcionando en 4 días hábiles, y el dominio queda siempre a tu nombre.",
    standalone:
      "Magali Cerisola diseña y programa páginas web a medida para negocios que ya invierten en publicidad y no logran vender. El sitio se entrega online y funcionando en 4 días hábiles, y el dominio queda siempre a nombre del cliente.",
    bifurcacion:
      "Tu web no vende porque no está pensada para convertir. Diseño y desarrollo de páginas que transforman visitas en clientes reales.",
    pasos: [
      {
        cuando: "Día 1",
        titulo: "Hablamos",
        desc: "Me contás qué vendés, a quién, y qué querés que pase cuando alguien entra. Salimos con el objetivo de la web definido.",
      },
      {
        cuando: "Día 2",
        titulo: "Diseño",
        desc: "Te muestro cómo va a estar armada y te explico por qué cada sección está donde está. Nada queda librado al gusto.",
      },
      {
        cuando: "Día 3",
        titulo: "Desarrollo",
        desc: "La construyo a medida. Sin plantillas, sin piezas que se rompan. Pensada para que la persona que entra sepa exactamente qué hacer.",
      },
      {
        cuando: "Día 4",
        titulo: "Online",
        desc: "Queda publicada, funcionando y con soporte.",
      },
    ],
    faqs: [
      {
        q: "¿Cuánto tarda una web?",
        a: "Cuatro días hábiles desde que me pasás el contenido. El primer día definimos el objetivo, el segundo te muestro el diseño, el tercero la programo y el cuarto queda online.",
      },
      {
        q: "¿El dominio queda a mi nombre?",
        a: "Sí, siempre. Tu web es tuya. Si mañana querés seguir con otra persona, te la llevás. Nadie te la retiene.",
      },
      {
        // El mecanismo importa: lo que acelera la carga es el prerenderizado
        // estático (todas las rutas salen como ○ Static en el build), no la
        // elección de framework. React suma JavaScript, no lo saca.
        q: "¿Usás plantillas de WordPress o similares?",
        a: "No. Programo cada sitio a medida, sin plantillas ni plugins. Por eso carga rápido y el diseño no es el mismo que ves en cualquier otra web. Además, al no depender de plugins de terceros hay menos puertas abiertas para que algo falle o se rompa, y el código liviano ayuda a posicionar mejor en Google.",
      },
    ],
  },
  {
    slug: "sistemas",
    nav: "Sistemas",
    name: "Desarrollo de sistemas a medida y automatización de procesos",
    metaTitle: "Sistemas a medida y automatización para negocios | Magali Cerisola",
    metaDescription:
      "Automatizá lo que hoy hacés a mano. Sistemas a medida para negocios: cotizadores, paneles de gestión y flujos que reemplazan el trabajo entre WhatsApp y las planillas. Desarrolladora freelance en Buenos Aires.",
    heading: "Automatizá lo que hoy hacés a mano",
    intro:
      "Sistemas a medida para que tu negocio ahorre horas cada semana. Sin vueltas técnicas.",
    standalone:
      "Magali Cerisola desarrolla sistemas a medida para negocios que quieren dejar de hacer trabajo repetitivo a mano. Automatiza procesos con cotizadores que calculan solos, paneles que centralizan la información de clientes, y flujos que reemplazan el ida y vuelta entre WhatsApp y las planillas de cálculo.",
    bifurcacion:
      "¿Seguís gestionando todo con WhatsApp y planillas? Automatizo procesos repetitivos para que ganes tiempo y evites errores.",
    pasos: [
      {
        cuando: "Paso 1",
        titulo: "Diagnóstico",
        desc: "Miramos juntos cómo trabajás hoy y dónde se te va el tiempo. Salimos con un proceso elegido y medido en horas.",
      },
      {
        cuando: "Paso 2",
        titulo: "Propuesta",
        desc: "Te digo qué conviene automatizar y qué no. Con precio cerrado y las horas que te va a devolver. Sin humo.",
      },
      {
        cuando: "Paso 3",
        titulo: "Desarrollo",
        desc: "Construyo el sistema a medida de tu proceso, no al revés. Vas viendo avances. No hay entrega sorpresa.",
      },
      {
        cuando: "Paso 4",
        titulo: "Entrega y soporte",
        desc: "Te lo dejo funcionando y te enseño a usarlo. Después quedo disponible para ajustes.",
      },
    ],
    faqs: [
      {
        q: "¿Qué diferencia hay entre una web y un sistema a medida?",
        a: "Una web te consigue clientes. Es tu vidriera: la ve gente de afuera y su objetivo es que te contacten. Un sistema a medida te ahorra tiempo. Lo usás vos o tu equipo puertas adentro, para dejar de hacer a mano tareas que se repiten: armar presupuestos, cargar datos, llevar fichas de clientes.",
      },
      {
        q: "¿Qué tipo de procesos se pueden automatizar?",
        a: "Todo lo que hoy hacés copiando y pegando. Armar presupuestos uno por uno, pasar datos de WhatsApp a una planilla, llevar fichas en papel, responder siempre lo mismo. La regla es simple: si lo repetís todas las semanas, probablemente se pueda automatizar.",
      },
      {
        q: "¿Necesito tener conocimientos técnicos para usarlo?",
        a: "No. Te lo entrego funcionando y te enseño a usarlo. La idea es que te saque trabajo de encima, no que te agregue uno nuevo.",
      },
    ],
  },
];

export const servicioBySlug = (slug: Servicio["slug"]) =>
  SERVICIOS.find((s) => s.slug === slug)!;

/* ── Prueba social ──────────────────────────────────────────────────────── */

/**
 * `num` y `sufijo` van separados para que el contador de PruebaSocial pueda
 * animar el número sin parsear strings.
 */
export type Metrica = { num: number; sufijo: string; label: string };

export type Caso = {
  cliente: string;
  rubro: string;
  servicio: Servicio["slug"];
  proyecto: string;
  que: string;
  metricas: Metrica[];
  testimonio: string;
  /** A quién está atribuida la cita. */
  autor: string;
  img: string;
  /** Quién aparece en la foto. En Dagos no coincide con `autor`. */
  fotoDe: string;
};

export const CASOS: Caso[] = [
  {
    cliente: "Dagos Studio",
    rubro: "Diseño gráfico y contenido",
    servicio: "sistemas",
    proyecto: "Cotizador interactivo automatizado",
    que: "El cliente elige planes y extras, el total se calcula solo y queda registrado sin que nadie cargue nada a mano.",
    metricas: [
      { num: 12, sufijo: "h", label: "por semana ahorradas" },
      { num: 94, sufijo: "%", label: "menos errores" },
    ],
    testimonio: "Dejé de perder horas presupuestando. Ahora el cliente lo arma solo.",
    autor: "Dagos Studio",
    // Martina Vega es quien está detrás de Dagos Studio; también dejó
    // testimonio del servicio de Webs, así que reutiliza la misma foto.
    img: "/clientes/mar.jpeg",
    fotoDe: "Martina Vega",
  },
  {
    cliente: "Dra. Mayra González",
    rubro: "Nutrición",
    servicio: "sistemas",
    proyecto: "Panel de gestión de pacientes",
    que: "Fichas de pacientes, seguimiento de peso y medidas, turnos y notas de consulta en un solo lugar.",
    metricas: [
      { num: 20, sufijo: "h", label: "por semana ahorradas" },
      { num: 100, sufijo: "%", label: "del seguimiento automatizado" },
    ],
    testimonio: "Antes vivía juntando datos de mil lados. Ahora abro el panel.",
    autor: "Dra. Mayra González",
    img: "/clientes/mayra.jpeg",
    fotoDe: "Dra. Mayra González",
  },
];

export type Testimonio = {
  texto: string;
  nombre: string;
  rol: string;
  img: string;
  servicio: Servicio["slug"];
};

/**
 * Estos son los testimonios que se muestran en pantalla y los únicos que se
 * marcan como `review` en JSON-LD. Si cambiás uno acá, cambia en las dos
 * superficies a la vez — que es exactamente el punto.
 */
export const TESTIMONIOS: Testimonio[] = [
  {
    texto:
      "La web quedó rapidísima y por fin se entiende qué hacemos. Las consultas que llegan ahora vienen con la decisión tomada.",
    nombre: "Juan Pablo Saraceno",
    rol: "Dueño de negocio",
    img: "/clientes/jp.jpeg",
    servicio: "webs",
  },
  {
    texto:
      "Cumplió los tiempos, comunicó todo con claridad y el resultado superó lo que teníamos en la cabeza.",
    nombre: "Martina Vega",
    rol: "Diseñadora",
    img: "/clientes/mar.jpeg",
    servicio: "webs",
  },
  {
    texto:
      "Antes vivía contestando las mismas preguntas por WhatsApp. Ahora la web las contesta sola.",
    nombre: "Francisco Piaggio",
    rol: "Colaborador de proyecto",
    img: "/clientes/fran.jpeg",
    servicio: "webs",
  },
];

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

/* ── FAQ general (hub) ──────────────────────────────────────────────────── */

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
