import type { Metadata } from "next";
import { Geist, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { BASE_URL, IDENTITY } from "./lib/content";
import { siteSchema } from "./lib/schema";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["600", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  // Cada ruta define su propio título; esto es el respaldo y el sufijo común.
  title: {
    default: "Webs animadas para tu marca | Magali Cerisola",
    template: "%s",
  },
  description: IDENTITY.tagline,
  authors: [{ name: IDENTITY.name, url: BASE_URL }],
  creator: IDENTITY.name,
  verification: {
    google: "cdjeC_vMaSnvlgajrz3vN06pAlIjZFn3ipQ972tZifw",
  },
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: IDENTITY.name,
    locale: "es_AR",
  },
  // La imagen de la previsualización sale de app/opengraph-image.jpg y
  // app/twitter-image.jpg (una captura de la portada a 1200 × 630), que Next
  // aplica a todas las rutas.
  twitter: {
    card: "summary_large_image",
  },
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema()) }}
        />

        {/* Sin JavaScript no hay zoom: que el hero no reserve scroll vacío. */}
        <noscript>
          <style>{`.hero-zoom{height:auto!important}`}</style>
        </noscript>

        <a className="skip-link" href="#main-content">
          Ir al contenido
        </a>

        <Header />

        <main id="main-content" tabIndex={-1} className="outline-none">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
