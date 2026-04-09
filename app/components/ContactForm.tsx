"use client";

import { useState, type FormEvent } from "react";

const FORMSUBMIT_ENDPOINT =
  "https://formsubmit.co/ajax/magui.cerisola@gmail.com";

export default function ContactForm() {
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
    const message = String(fd.get("message") ?? "").trim();

    try {
      const res = await fetch(FORMSUBMIT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `Portfolio contact from ${name || "visitor"}`,
          name,
          email,
          message,
          _replyto: email,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        success?: string;
        message?: string;
        error?: string;
      };

      if (!res.ok) {
        setErrorMessage(
          data.message || data.error || "Could not send. Try again later."
        );
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setErrorMessage("Network error. Check your connection and try again.");
      setStatus("error");
    }
  }

  return (
    <form
      className="mt-8 space-y-5"
      onSubmit={handleSubmit}
      aria-busy={status === "sending"}
    >
      <label className="block">
        <span className="text-xs text-slate-200/70">Name</span>
        <input
          name="name"
          type="text"
          required
          className="mt-2 w-full min-h-[44px] rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-400 outline-none transition-colors duration-200 focus:border-teal-400/60 focus:ring-2 focus:ring-teal-400/20 focus-visible:border-teal-400/60"
          placeholder="Your name"
          autoComplete="name"
        />
      </label>

      <label className="block">
        <span className="text-xs text-slate-200/70">Email</span>
        <input
          name="email"
          type="email"
          required
          className="mt-2 w-full min-h-[44px] rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-400 outline-none transition-colors duration-200 focus:border-teal-400/60 focus:ring-2 focus:ring-teal-400/20 focus-visible:border-teal-400/60"
          placeholder="you@company.com"
          autoComplete="email"
        />
      </label>

      <label className="block">
        <span className="text-xs text-slate-200/70">Message</span>
        <textarea
          name="message"
          rows={4}
          required
          className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-400 outline-none transition-colors duration-200 focus:border-teal-400/60 focus:ring-2 focus:ring-teal-400/20 focus-visible:border-teal-400/60"
          placeholder="Tell me what you need help with..."
        />
      </label>

      {status === "success" && (
        <p className="text-sm text-teal-300" role="status">
          Message sent. I will get back to you soon.
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
        className="min-h-[48px] w-full touch-manipulation rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-teal-500/20 outline-none transition duration-200 hover:brightness-110 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-teal-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:opacity-60 disabled:pointer-events-none disabled:active:scale-100"
      >
        {status === "sending" ? "Sending..." : "Send request"}
      </button>
    </form>
  );
}
