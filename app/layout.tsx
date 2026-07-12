import type { Metadata } from "next";
import { Geist, Bricolage_Grotesque } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import WhatsAppFloat from "./components/WhatsAppFloat";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["600", "800"],
});

const BASE_URL = "https://maguiceri.dev";

const DESCRIPTION =
  "Diseñadora web freelance. Hago webs para negocios que convierten visitas en clientes. Trabajo remoto con empresas de toda Latinoamérica. Entrega en 4 días hábiles.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Diseñadora Web Freelance | Magali Cerisola",
  description: DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "Magali Cerisola",
    title: "Diseñadora Web Freelance | Magali Cerisola",
    description: DESCRIPTION,
    images: [
      {
        url: "/cv.jpeg",
        width: 800,
        height: 800,
        alt: "Magali Cerisola – Diseñadora Web Freelance",
      },
    ],
    locale: "es_AR",
  },
  twitter: {
    card: "summary",
    title: "Diseñadora Web Freelance | Magali Cerisola",
    description: DESCRIPTION,
    images: ["/cv.jpeg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "Magali Cerisola",
      url: BASE_URL,
      image: `${BASE_URL}/cv.jpeg`,
      jobTitle: "Diseñadora Web Freelance",
      email: "magui.cerisola@gmail.com",
      knowsAbout: [
        "Diseño Web",
        "Desarrollo Web Freelance",
        "React",
        "Next.js",
        "TypeScript",
        "Páginas Web para Negocios",
        "Diseño Web Latinoamérica",
      ],
      sameAs: [
        "https://www.linkedin.com/in/magali-cerisola-1a5111167/",
        "https://github.com/maguiceri",
        "https://www.instagram.com/magui.dev",
      ],
    },
    {
      "@type": "ProfessionalService",
      name: "Magali Cerisola – Diseño Web Freelance",
      areaServed: "Latinoamérica",
      url: BASE_URL,
      image: `${BASE_URL}/cv.jpeg`,
      description: DESCRIPTION,
      priceRange: "$$",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        reviewCount: "3",
        bestRating: "5",
      },
      review: [
        {
          "@type": "Review",
          reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
          author: { "@type": "Person", name: "Martina Vega" },
          reviewBody:
            "Trabajar con Magali fue una experiencia excelente. Tradujo mis diseños en una interfaz limpia y pixel-perfect, con atención al detalle en espaciado, tipografía y adaptación mobile. La comunicación fue fluida y el resultado final coincidió exactamente con lo que necesitaba.",
        },
        {
          "@type": "Review",
          reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
          author: { "@type": "Person", name: "Francisco Piaggio" },
          reviewBody:
            "Magali escribe código limpio y mantenible, y tiene un sólido dominio de las prácticas fullstack modernas. Construye componentes reutilizables y siempre presta atención al rendimiento y los detalles.",
        },
        {
          "@type": "Review",
          reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
          author: { "@type": "Person", name: "Juan Pablo Saraceno" },
          reviewBody:
            "Magali entregó un sitio web de alta calidad que superó nuestras expectativas de diseño y rendimiento. Fue confiable, fácil de trabajar y se comunicó con claridad en todo momento. El resultado final se siente rápido, moderno y fácil de usar.",
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-AR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${bricolage.variable} antialiased bg-[#05070f] text-[#EEF2F9]`}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        {children}
        <WhatsAppFloat />
        <Script
          id="tiktok-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
  ttq.load('D8V8MKJC77U4748KHM90');
  ttq.page();
}(window, document, 'ttq');
            `,
          }}
        />
      </body>
    </html>
  );
}