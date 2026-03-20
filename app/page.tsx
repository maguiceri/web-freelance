// page.tsx

import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-pink-200 text-pink-900">
      {/* Navbar */}
      <nav style={{ animationDelay: "0.10s" }} className="fadeDown sticky top-0 z-50 bg-pink-50/80 backdrop-blur border-b border-pink-200">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
          <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-pink-500 to-pink-700 bg-clip-text text-transparent">
            Jane Doe
          </span>
          <div className="space-x-6 text-sm font-medium">
            <Link href="#work" className="hover:text-pink-600 transition">Proyectos</Link>
            <Link href="#about" className="hover:text-pink-600 transition">Sobre mí</Link>
            <Link href="#contact" className="hover:text-pink-600 transition">Contacto</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto py-28 px-4">
        <div className="flex-1 text-left">
          <h1 className="fadeDown text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 bg-clip-text text-transparent">
            Desarrollo Frontend Moderno
          </h1>
          <p className="fadeDown max-w-md text-lg md:text-xl text-pink-800/80 mb-8">
            Soy Jane Doe, especialista freelance en React, Next.js y TypeScript. Construyo interfaces web atractivas, rápidas y escalables con lo último en desarrollo frontend.
          </p>
          <Link
            href="#contact"
            className="fadeDown inline-block px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-pink-700 text-white font-semibold shadow-lg hover:scale-105 transition"
          >
            Trabajemos juntos
          </Link>
        </div>
        <div className="flex-1 flex justify-center md:justify-end mt-12 md:mt-0">
          <div className="fadeDown w-95 h-95 rounded-full overflow-hidden border-4 border-pink-400 shadow-lg">
            <Image
              src="/avatar.jpeg" // Cambia por la ruta de tu imagen
              alt="Avatar de Jane Doe"
              width={192}
              height={192}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="max-w-5xl mx-auto px-4 py-20">
        <h2 className="text-2xl font-bold mb-10 text-pink-800/90">Proyectos Destacados</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <article className="rounded-2xl border border-pink-200 bg-gradient-to-br from-pink-50 via-pink-100 to-pink-50 p-6 shadow-lg hover:shadow-xl transition">
            <h3 className="text-lg font-semibold mb-2 text-pink-700">Plataforma Bancaria</h3>
            <p className="text-sm leading-7 text-pink-800/70">
              Modernización de interfaces y experiencia de usuario para una plataforma bancaria, asegurando consistencia y rendimiento.
            </p>
          </article>
          <article className="rounded-2xl border border-pink-200 bg-gradient-to-br from-pink-50 via-pink-100 to-pink-50 p-6 shadow-lg hover:shadow-xl transition">
            <h3 className="text-lg font-semibold mb-2 text-pink-700">Interfaces Responsivas</h3>
            <p className="text-sm leading-7 text-pink-800/70">
              Desarrollo de páginas y componentes reutilizables con React, TypeScript y estilos modernos.
            </p>
          </article>
          <article className="rounded-2xl border border-pink-200 bg-gradient-to-br from-pink-50 via-pink-100 to-pink-50 p-6 shadow-lg hover:shadow-xl transition">
            <h3 className="text-lg font-semibold mb-2 text-pink-700">Soluciones Freelance</h3>
            <p className="text-sm leading-7 text-pink-800/70">
              Entrega de landing pages, portfolios y UIs con código limpio y visuales pulidos para clientes exigentes.
            </p>
          </article>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4 text-pink-800/90">Sobre mí</h2>
        <p className="text-pink-800/80 text-lg">
          Soy desarrolladora frontend freelance con experiencia en React, Next.js y TypeScript. Ayudo a empresas y agencias a crear aplicaciones web modernas, eficientes y visualmente atractivas.
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4 text-pink-800/90">Contacto</h2>
        <p className="text-pink-800/80 mb-6">
          ¿Listo para potenciar tu presencia digital?<br />
          <a href="mailto:jane@email.com" className="text-pink-600 underline hover:text-pink-500">jane@email.com</a>
        </p>
      </section>

      <footer className="text-center text-xs text-pink-800/40 py-8">
        &copy; {new Date().getFullYear()} Jane Doe. Todos los derechos reservados.
      </footer>
    </div>
  );
}