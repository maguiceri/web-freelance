import type { MetadataRoute } from "next";
import { BASE_URL } from "./lib/content";

/**
 * `userAgent: "*"` ya alcanzaría para permitirlos a todos, pero los crawlers de
 * IA se listan explícitamente: deja constancia de que el acceso es intencional
 * y no un descuido, que es lo que se revisa cuando un sitio no aparece citado.
 */
const CRAWLERS_IA = [
  "GPTBot", // OpenAI — entrenamiento
  "OAI-SearchBot", // OpenAI — búsqueda en ChatGPT
  "ChatGPT-User", // OpenAI — navegación a pedido del usuario
  "ClaudeBot", // Anthropic
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot", // Perplexity
  "Perplexity-User",
  "Google-Extended", // Gemini / Vertex
  "Applebot-Extended", // Apple Intelligence
  "cohere-ai",
  "Bytespider",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...CRAWLERS_IA.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
