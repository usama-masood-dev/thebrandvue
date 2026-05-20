import { NextResponse } from "next/server";

type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  budget: string;
  requirements: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validatePayload(body: unknown): ContactPayload | string {
  if (!body || typeof body !== "object") {
    return "Invalid request body.";
  }

  const data = body as Record<string, unknown>;
  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const phone = typeof data.phone === "string" ? data.phone.trim() : "";
  const budget = typeof data.budget === "string" ? data.budget.trim() : "";
  const requirements =
    typeof data.requirements === "string" ? data.requirements.trim() : "";
  if (!name || name.length < 2) return "Please enter your full name.";
  if (!email || !EMAIL_PATTERN.test(email)) return "Please enter a valid email.";
  if (!budget) return "Please select an estimated budget.";
  if (!requirements || requirements.length < 10) {
    return "Please tell us a bit more about your requirements.";
  }

  return { name, email, phone, budget, requirements };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON." }, { status: 400 });
  }

  const validated = validatePayload(body);
  if (typeof validated === "string") {
    return NextResponse.json({ message: validated }, { status: 400 });
  }

  // Hook up email/CRM (Resend, SendGrid, HubSpot, etc.) here when ready.
  if (process.env.NODE_ENV === "development") {
    console.info("[contact] New proposal request:", validated);
  }

  return NextResponse.json({
    message: "Request received.",
  });
}
