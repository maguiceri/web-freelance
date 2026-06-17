import { Resend } from "resend";
import { NextRequest } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 5000;

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await req.json() as Record<string, unknown>;
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const honeypot = typeof body.website === "string" ? body.website : "";

    if (honeypot) {
      return Response.json({ success: true });
    }

    if (!name || !email || !message) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    if (name.length > MAX_NAME) {
      return Response.json({ error: "Name is too long" }, { status: 400 });
    }

    if (email.length > MAX_EMAIL || !EMAIL_RE.test(email)) {
      return Response.json({ error: "Invalid email address" }, { status: 400 });
    }

    if (message.length > MAX_MESSAGE) {
      return Response.json({ error: "Message is too long (max 5000 characters)" }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "magui.cerisola@gmail.com",
      replyTo: email,
      subject: `Portfolio contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    if (error) {
      console.error("Resend error:", error.message);
      return Response.json({ error: "Could not send message. Try again later." }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
