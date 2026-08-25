import type { Metadata } from "next";
import { Geist, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";
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
    default: "Webs y sistemas a medida para negocios | Magali Cerisola",
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
    images: [
      {
        url: "/cv.jpeg",
        width: 800,
        height: 800,
        alt: `${IDENTITY.name}, ${IDENTITY.jobTitle.toLowerCase()} en ${IDENTITY.locality}`,
      },
    ],
  },
  twitter: {
    card: "summary",
    images: ["/cv.jpeg"],
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

        <a className="skip-link" href="#main-content">
          Ir al contenido
        </a>

        <Header />

        <main id="main-content" tabIndex={-1} className="outline-none">
          {children}
        </main>

        <Footer />

        <WhatsAppFloat />
      </body>
    </html>
  );
}
