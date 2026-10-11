import { BASE_URL, BIO, CAMINO, FAQS_GENERALES, IDENTITY } from "../lib/content";

/** Estático: no depende de la request y conviene que se sirva cacheado. */
export const dynamic = "force-static";

/**
 * /llms.txt — resumen en texto plano para modelos de lenguaje.
 *
 * Se genera desde `content.ts`, la misma fuente que renderiza las páginas y
 * construye el JSON-LD, así que no puede desincronizarse del sitio.
 */
export async function GET() {
  const pasos = CAMINO.pasos.map((p, i) => `${i + 1}. ${p.titulo} — ${p.desc}`).join("\n");

  const body = `# ${IDENTITY.name}

> ${IDENTITY.tagline}

${IDENTITY.name} ("${IDENTITY.alternateName}") es ${IDENTITY.jobTitle.toLowerCase()} con base en ${IDENTITY.locality}, ${IDENTITY.country}. Trabaja de forma remota con negocios de ${IDENTITY.areaServed}. Diseña y programa webs animadas, con scroll interactivo, para que las marcas se recuerden.

## Sobre Magali

${BIO.parrafos.join("\n\n")}

## Cómo trabaja

${pasos}

${CAMINO.dominio.titulo}: ${CAMINO.dominio.desc}

## Preguntas frecuentes

${FAQS_GENERALES.map((f) => `- ${f.q}\n  ${f.a}`).join("\n")}

## Contacto

- WhatsApp: ${IDENTITY.phone}
- Email: ${IDENTITY.email}
- Sitio: ${BASE_URL}

## Enlaces

- [Inicio](${BASE_URL}): trabajos, forma de trabajo y biografía.
${IDENTITY.sameAs.map((u) => `- [${new URL(u).hostname.replace("www.", "")}](${u})`).join("\n")}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
