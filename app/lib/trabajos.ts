/**
 * Trabajos que se muestran en la galería de la home.
 *
 * Para sumar uno: copiá los archivos a /public/trabajos y agregá un objeto a la
 * lista. Para sacarlo, borrá el objeto. El orden de la lista es el orden en
 * pantalla.
 *
 * Video: corto (5 a 10 s), sin sonido, pensado para loop. Proporción 16:10,
 * unos 1280 px de ancho alcanzan. Idealmente los dos formatos; si hay uno solo,
 * que sea el mp4.
 * Poster: una captura del video donde ya se vea la web armada (no el primer
 * cuadro si arranca vacío), en la misma proporción. Es lo que se ve hasta que
 * el video carga, y lo único que se ve con "reducir movimiento" activado.
 *
 * Los videos salen de una grabación de pantalla pasada por ffmpeg:
 *   ffmpeg -i grabacion.mov -an -vf "fps=30,scale=1280:-2" -c:v libx264 \
 *     -preset slow -crf 27 -pix_fmt yuv420p -movflags +faststart cliente.mp4
 *   ffmpeg -i grabacion.mov -an -vf "fps=30,scale=1280:-2" -c:v libvpx-vp9 \
 *     -crf 38 -b:v 0 cliente.webm
 * El webm sólo vale la pena si pesa menos que el mp4.
 */

export type Trabajo = {
  /** Identificador único, sin espacios. */
  slug: string;
  cliente: string;
  rubro: string;
  poster: string;
  /** Sin `video` la tarjeta muestra sólo el poster. */
  video?: { mp4: string; webm?: string };
  /** Sólo si la web está publicada. */
  url?: string;
  /** Perfil del cliente, sin parámetros de seguimiento (`?...`). */
  instagram?: string;
};

export const TRABAJOS: Trabajo[] = [
  {
    slug: "artina-cafe",
    cliente: "Artina Café",
    rubro: "Cafetería y pastelería",
    poster: "/trabajos/artina.jpg",
    video: { mp4: "/trabajos/artina.mp4", webm: "/trabajos/artina.webm" },
    url: "https://www.artinacafe.com",
    instagram: "https://instagram.com/artinacafe",
  },
  {
    slug: "automarket-pro",
    cliente: "AutoMarket Pro",
    rubro: "Inspección vehicular",
    poster: "/trabajos/automarket.jpg",
    video: { mp4: "/trabajos/automarket.mp4", webm: "/trabajos/automarket.webm" },
    instagram: "https://instagram.com/automarketpro.ar",
  },
  {
    slug: "ni-idea-universo-creativo",
    cliente: "Ni Idea! Universo Creativo",
    rubro: "Tienda de objetos personalizados",
    poster: "/trabajos/niideauniverso.jpg",
    video: { mp4: "/trabajos/niideauniverso.mp4" },
    url: "https://www.niideauniversocreativo.com",
    instagram: "https://instagram.com/niideauniversocreativo",
  },
];
