/**
 * Construye el JSON-LD a partir de `content.ts`.
 *
 * Nada de texto hardcodeado acá: todo sale de la misma fuente que renderiza la
 * página, para que el marcado no pueda contradecir lo que se ve en pantalla.
 */

import {
  BASE_URL,
  BIO,
  IDENTITY,
  SERVICIOS,
  type Faq,
  type Servicio,
} from "./content";

const PERSON_ID = `${BASE_URL}/#magali`;
const BUSINESS_ID = `${BASE_URL}/#negocio`;
const SITE_ID = `${BASE_URL}/#sitio`;

function personNode() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: IDENTITY.name,
    alternateName: IDENTITY.alternateName,
    url: BASE_URL,
    image: `${BASE_URL}/perfil.jpg`,
    jobTitle: IDENTITY.jobTitle,
    email: IDENTITY.email,
    description: `${BIO.parrafos[0]} ${BIO.parrafos[1]}`,
    knowsAbout: [...IDENTITY.knowsAbout],
    sameAs: [...IDENTITY.sameAs],
    homeLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: IDENTITY.locality,
        addressCountry: "AR",
      },
    },
  };
}

function businessNode() {
  return {
    "@type": "ProfessionalService",
    "@id": BUSINESS_ID,
    name: IDENTITY.name,
    url: BASE_URL,
    image: `${BASE_URL}/icon.png`,
    description: IDENTITY.tagline,
    email: IDENTITY.email,
    telephone: IDENTITY.phone,
    founder: { "@id": PERSON_ID },
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: IDENTITY.locality,
      addressCountry: "AR",
    },
    areaServed: {
      "@type": "Place",
      name: IDENTITY.areaServed,
    },
    knowsAbout: [...IDENTITY.knowsAbout],
    sameAs: [...IDENTITY.sameAs],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios",
      itemListElement: SERVICIOS.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": `${BASE_URL}/${s.slug}#servicio`,
          name: s.name,
          description: s.standalone,
          url: `${BASE_URL}/${s.slug}`,
          serviceType: s.nav,
          provider: { "@id": BUSINESS_ID },
          areaServed: { "@type": "Place", name: IDENTITY.areaServed },
        },
      })),
    },
    // Sin `review` acá a propósito: este nodo va en el layout, o sea en las
    // tres rutas, y en /sistemas los testimonios de webs no se muestran. Las
    // reviews las emite PruebaSocial, que sabe cuáles renderizó.
  };
}

/**
 * Reviews de los testimonios efectivamente visibles en la página.
 * Se llama desde PruebaSocial con la lista ya filtrada.
 */
export function reviewsSchema(testimonios: { nombre: string; texto: string }[]) {
  if (testimonios.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@graph": testimonios.map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.nombre },
      reviewBody: t.texto,
      itemReviewed: { "@id": BUSINESS_ID },
    })),
  };
}

function siteNode() {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: BASE_URL,
    name: IDENTITY.name,
    description: IDENTITY.tagline,
    inLanguage: "es-AR",
    publisher: { "@id": BUSINESS_ID },
  };
}

/** Grafo base: va en el layout, por lo que aplica a todas las rutas. */
export function siteSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [personNode(), businessNode(), siteNode()],
  };
}

/** FAQPage. Los modelos citan este formato más que ningún otro. */
export function faqSchema(faqs: Faq[], pageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Página de servicio: Service + su FAQPage, en un solo grafo. */
export function servicioSchema(servicio: Servicio) {
  const url = `${BASE_URL}/${servicio.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#servicio`,
        name: servicio.name,
        description: servicio.standalone,
        url,
        serviceType: servicio.nav,
        provider: { "@id": BUSINESS_ID },
        areaServed: { "@type": "Place", name: IDENTITY.areaServed },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `Proceso de trabajo — ${servicio.nav}`,
          itemListElement: servicio.pasos.map((p, i) => ({
            "@type": "Offer",
            position: i + 1,
            name: p.titulo,
            description: p.desc,
          })),
        },
      },
      // La FAQPage NO va acá: la emite el componente <Faq>, que es el que
      // renderiza las preguntas. Emitirla en los dos lados producía dos
      // FAQPage con el mismo @id en la misma página.
    ],
  };
}

/** Serializa para inyectar en un <script type="application/ld+json">. */
export const ldJson = (schema: unknown) => JSON.stringify(schema);
