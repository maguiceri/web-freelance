/**
 * Construye el JSON-LD a partir de `content.ts`.
 *
 * Nada de texto hardcodeado acá: todo sale de la misma fuente que renderiza la
 * página, para que el marcado no pueda contradecir lo que se ve en pantalla.
 */

import { BASE_URL, BIO, IDENTITY, type Faq } from "./content";

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
    image: `${BASE_URL}/perfil.png`,
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
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            "@id": `${BASE_URL}/#servicio`,
            name: IDENTITY.servicio,
            description: IDENTITY.tagline,
            url: BASE_URL,
            provider: { "@id": BUSINESS_ID },
            areaServed: { "@type": "Place", name: IDENTITY.areaServed },
          },
        },
      ],
    },
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

/** Serializa para inyectar en un <script type="application/ld+json">. */
export const ldJson = (schema: unknown) => JSON.stringify(schema);
