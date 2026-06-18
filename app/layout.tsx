import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://maguiceri.dev";

const DESCRIPTION =
  "Freelance fullstack developer with 5+ years of experience — React, Next.js, TypeScript. I build fast, modern websites and automation solutions tailored to your business.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Magali Cerisola | Freelance Fullstack Developer",
  description: DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "Magali Cerisola",
    title: "Magali Cerisola | Freelance Fullstack Developer",
    description: DESCRIPTION,
    images: [
      {
        url: "/cv.jpeg",
        width: 800,
        height: 800,
        alt: "Magali Cerisola – Freelance Fullstack Developer",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Magali Cerisola | Freelance Fullstack Developer",
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#020617] text-slate-100`}
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
      </body>
    </html>
  );
}