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
  "¿Invertís en publicidad y la gente no compra? El problema casi nunca es el anuncio: es la web. Hago webs para negocios argentinos que convierten visitas en clientes.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Magali Cerisola | Webs que convierten para negocios argentinos",
  description: DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "Magali Cerisola",
    title: "Magali Cerisola | Webs que convierten para negocios argentinos",
    description: DESCRIPTION,
    images: [
      {
        url: "/cv.jpeg",
        width: 800,
        height: 800,
        alt: "Magali Cerisola – Webs que convierten para negocios argentinos",
      },
    ],
    locale: "es_AR",
  },
  twitter: {
    card: "summary",
    title: "Magali Cerisola | Webs que convierten para negocios argentinos",
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
      jobTitle: "Freelance Fullstack Developer",
      email: "magui.cerisola@gmail.com",
      knowsAbout: [
        "React",
        "Next.js",
        "TypeScript",
        "Fullstack Development",
        "Frontend Development",
        "Web Automation",
      ],
      sameAs: [
        "https://www.linkedin.com/in/magali-cerisola-1a5111167/",
        "https://github.com/maguiceri",
        "https://www.instagram.com/magui.dev",
      ],
    },
    {
      "@type": "ProfessionalService",
      name: "Magali Cerisola – Freelance Development",
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
            "Working with Magali was a great experience. She translated my designs into a clean, pixel-perfect interface while maintaining attention to detail in spacing, typography, and responsiveness. Communication was smooth, and the final result matched the design perfectly.",
        },
        {
          "@type": "Review",
          reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
          author: { "@type": "Person", name: "Francisco Piaggio" },
          reviewBody:
            "Magali writes clean, maintainable code and has a strong grasp of modern fullstack practices. She builds reusable components and always pays attention to performance and detail.",
        },
        {
          "@type": "Review",
          reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
          author: { "@type": "Person", name: "Juan Pablo Saraceno" },
          reviewBody:
            "Magali delivered a high-quality website that met both our design and performance expectations. She was reliable, easy to work with, and always communicated clearly throughout the process. The final product feels fast, modern, and user-friendly.",
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