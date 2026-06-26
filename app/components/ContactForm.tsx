"use client";

import { useState, type FormEvent } from "react";

const CONTACT_ENDPOINT = "/api/contact";

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
    const website = String(fd.get("website") ?? "");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);

    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name, email, message, website }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      const data = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        error?: string;
      };

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || "Could not send. Try again later.");
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
      (window as any).ttq?.track("SubmitForm");
    } catch (err) {
      clearTimeout(timeout);
      if (err instanceof Error && err.name === "AbortError") {
        setErrorMessage("Request timed out. Try again later.");
      } else {
        setErrorMessage("Network error. Check your connection and try again.");
      }
      setStatus("error");
    }
  }

  return (
    <form
      className="mt-8 space-y-5"
      onSubmit={handleSubmit}
      aria-busy={status === "sending"}
    >
      {/* honeypot: hidden from real users, bots fill it and get silently rejected */}
      <label aria-hidden="true" className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden opacity-0">
        <span>Website</span>
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      <label className="block">
        <span className="text-xs text-slate-200/70">Name</span>
        <input
          name="name"
          type="text"
          required
          className="mt-2 w-full min-h-[44px] rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-400 outline-none transition-colors duration-200 focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/20 focus-visible:border-blue-400/60"
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
          className="mt-2 w-full min-h-[44px] rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-400 outline-none transition-colors duration-200 focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/20 focus-visible:border-blue-400/60"
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
          className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-400 outline-none transition-colors duration-200 focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/20 focus-visible:border-blue-400/60"
          placeholder="Tell me what you need help with..."
        />
      </label>

      {status === "success" && (
        <p className="text-sm text-blue-300" role="status">
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
        className="min-h-[48px] w-full touch-manipulation rounded-xl bg-gradient-to-r from-blue-400 to-blue-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-blue-500/20 outline-none transition duration-200 hover:brightness-110 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-blue-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:opacity-60 disabled:pointer-events-none disabled:active:scale-100"
      >
        {status === "sending" ? "Sending..." : "Send request"}
      </button>
    </form>
  );
}
