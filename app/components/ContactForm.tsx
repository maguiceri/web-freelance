"use client";

import { useState, type FormEvent } from "react";

const CONTACT_ENDPOINT = "/api/contact";

const ETIQUETA_CONTEXTO: Record<string, string> = {
  webs: "Consulta desde Webs",
  sistemas: "Consulta desde Sistemas a medida",
  general: "Consulta desde el inicio",
};

const inputCls =
  "mt-2 w-full min-h-[44px] rounded-xl border border-[#1E2A44] bg-[#0B1120] px-4 py-3 text-sm text-[#EEF2F9] placeholder:text-[#5C6880] outline-none transition-colors duration-200 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/25";

export default function ContactForm({ contexto = "general" }: { contexto?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");
    setStatus("sending");

    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const mensaje = String(fd.get("message") ?? "").trim();
    const website = String(fd.get("website") ?? "");

    // El endpoint sólo acepta name/email/message, así que el origen de la
    // consulta viaja dentro del mensaje.
    const etiqueta = ETIQUETA_CONTEXTO[contexto] ?? ETIQUETA_CONTEXTO.general;
    const message = `[${etiqueta}]\n\n${mensaje}`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);

    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, message, website }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      const data = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        error?: string;
      };

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || "No se pudo enviar. Probá de nuevo en un rato.");
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      clearTimeout(timeout);
      if (err instanceof Error && err.name === "AbortError") {
        setErrorMessage("La consulta tardó demasiado. Probá de nuevo.");
      } else {
        setErrorMessage("Error de conexión. Revisá tu internet y probá de nuevo.");
      }
      setStatus("error");
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit} aria-busy={status === "sending"}>
      {/* honeypot: invisible para personas, los bots lo completan y se descarta */}
      <label aria-hidden="true" className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden opacity-0">
        <span>Website</span>
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      <label className="block">
        <span className="text-xs text-[#7C89A3]">Nombre</span>
        <input
          name="name"
          type="text"
          required
          className={inputCls}
          placeholder="Tu nombre"
          autoComplete="name"
        />
      </label>

      <label className="block">
        <span className="text-xs text-[#7C89A3]">Email</span>
        <input
          name="email"
          type="email"
          required
          className={inputCls}
          placeholder="vos@tunegocio.com"
          autoComplete="email"
        />
      </label>

      <label className="block">
        <span className="text-xs text-[#7C89A3]">Mensaje</span>
        <textarea
          name="message"
          rows={4}
          required
          className={`${inputCls} resize-none`}
          placeholder="Contame qué necesitás y de qué es tu negocio."
        />
      </label>

      {status === "success" && (
        <p className="text-sm text-[var(--accent-ink)]" role="status">
          Listo, me llegó. Te respondo en menos de 24 hs.
        </p>
      )}
      {status === "error" && errorMessage && (
        <p className="text-sm text-red-300" role="alert">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="min-h-[48px] w-full touch-manipulation rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white outline-none transition-colors duration-200 hover:bg-[var(--accent-hover)] active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-[var(--accent-ink)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070F] disabled:opacity-60 disabled:pointer-events-none disabled:active:scale-100"
      >
        {status === "sending" ? "Enviando…" : "Enviar consulta"}
      </button>
    </form>
  );
}
