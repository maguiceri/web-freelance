import {
  BASE_URL,
  BIO,
  CASOS,
  FAQS_GENERALES,
  IDENTITY,
  SERVICIOS,
} from "../lib/content";

/** Estático: no depende de la request y conviene que se sirva cacheado. */
export const dynamic = "force-static";

/**
 * /llms.txt — resumen en texto plano para modelos de lenguaje.
 *
 * Se genera desde `content.ts`, la misma fuente que renderiza las páginas y
 * construye el JSON-LD, así que no puede desincronizarse del sitio.
 */
export async function GET() {
  const servicios = SERVICIOS.map((s) =>
    [
      `### ${s.nav} — ${BASE_URL}/${s.slug}`,
      "",
      s.standalone,
      "",
      "Proceso de trabajo:",
      ...s.pasos.map((p, i) => `${i + 1}. ${p.titulo} — ${p.desc}`),
      "",
      "Preguntas frecuentes:",
      ...s.faqs.flatMap((f) => [`- ${f.q}`, `  ${f.a}`]),
    ].join("\n"),
  ).join("\n\n");

  const casos = CASOS.map((c) =>
    [
      `### ${c.cliente} — ${c.rubro}`,
      `Proyecto: ${c.proyecto} (${c.servicio}).`,
      c.que,
      `Resultados: ${c.metricas.map((m) => `${m.num} ${m.sufijo} ${m.label}`).join("; ")}.`,
      `Testimonio de ${c.autor}: "${c.testimonio}"`,
    ].join("\n"),
  ).join("\n\n");

  const body = `# ${IDENTITY.name}

> ${IDENTITY.tagline}

${IDENTITY.name} ("${IDENTITY.alternateName}") es ${IDENTITY.jobTitle.toLowerCase()} con base en ${IDENTITY.locality}, ${IDENTITY.country}. Trabaja de forma remota con negocios de ${IDENTITY.areaServed}. Ofrece dos servicios: páginas web orientadas a conversión y sistemas a medida para automatizar procesos manuales.

## Sobre Magali

${BIO.parrafos.join("\n\n")}

${BIO.cierre}

## Servicios

${servicios}

## Casos de clientes

${casos}

## Preguntas frecuentes

${FAQS_GENERALES.map((f) => `- ${f.q}\n  ${f.a}`).join("\n")}

## Contacto

- WhatsApp: ${IDENTITY.phone}
- Email: ${IDENTITY.email}
- Sitio: ${BASE_URL}

## Enlaces

- [Inicio](${BASE_URL}): los dos servicios, casos y biografía.
${SERVICIOS.map((s) => `- [${s.nav}](${BASE_URL}/${s.slug}): ${s.bifurcacion}`).join("\n")}
${IDENTITY.sameAs.map((u) => `- [${new URL(u).hostname.replace("www.", "")}](${u})`).join("\n")}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
