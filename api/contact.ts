const PILLARS = new Set([
  "Ecommerce",
  "AI Studio",
  "AI Factory",
  "Demand Intelligence",
]);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PILLAR_INTENT: Record<string, "make" | "distribute" | "sell"> = {
  Ecommerce: "sell",
  "AI Studio": "sell",
  "AI Factory": "sell",
  "Demand Intelligence": "make",
};

const OS_TIMEOUT_MS = 8000;

type Body = {
  name?: unknown;
  company?: unknown;
  email?: unknown;
  phone?: unknown;
  website?: unknown;
  pillar?: unknown;
  message?: unknown;
  company_url?: unknown;
};

function text(value: unknown, max: number): string {
  return String(value ?? "").trim().slice(0, max);
}

function json(status: number, payload: { ok: boolean; error?: string }) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

export async function POST(request: Request): Promise<Response> {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return json(400, { ok: false, error: "Invalid request." });
  }

  if (text(body.company_url, 200)) {
    return json(200, { ok: true });
  }

  const name = text(body.name, 200);
  const company = text(body.company, 200);
  const email = text(body.email, 200);
  const phone = text(body.phone, 80);
  const website = text(body.website, 300);
  const pillar = text(body.pillar, 80);
  const message = text(body.message, 8000);

  if (!name || !company || !email || !pillar || !message) {
    return json(400, { ok: false, error: "Name, company, email, topic, and message are required." });
  }
  if (!EMAIL_RE.test(email)) {
    return json(400, { ok: false, error: "That email does not look valid." });
  }
  if (!PILLARS.has(pillar)) {
    return json(400, { ok: false, error: "Pick Ecommerce, AI Studio, or Demand Intelligence." });
  }

  const apiKey = process.env.MAILGUN_API_KEY?.trim();
  const domain = process.env.MAILGUN_DOMAIN?.trim();
  const apiBase = (
    process.env.MAILGUN_API_BASE?.trim() || "https://api.mailgun.net"
  ).replace(/\/$/, "");
  const to = process.env.CONTACT_TO?.trim() || "paul@coriolisagency.com";
  const from =
    process.env.CONTACT_FROM?.trim() ||
    (domain ? `Coriolis <forms@${domain}>` : "");

  if (!apiKey || !domain || !from) {
    console.error("contact: Mailgun env is not set");
    return json(503, { ok: false, error: "Mail is not configured yet." });
  }

  const osError = await mintOsLead({
    name,
    company,
    email,
    phone,
    website,
    pillar,
    message,
  });

  const forwarded = request.headers.get("x-forwarded-for") || "";
  const ip = forwarded.split(",")[0]?.trim() || "unknown";
  const sentAt = new Date().toISOString();

  const lines = [
    `Name: ${name}`,
    `Company: ${company}`,
    `Email: ${email}`,
    `Phone: ${phone || "—"}`,
    `Website: ${website || "—"}`,
    `About: ${pillar}`,
    `IP: ${ip}`,
    `Sent: ${sentAt}`,
    ...(osError ? [`OS Lead: ${osError}`] : []),
    "",
    message,
  ];

  const auth = Buffer.from(`api:${apiKey}`).toString("base64");
  const payload = new URLSearchParams({
    from,
    to,
    subject: `Coriolis — ${pillar} — ${company}`,
    text: lines.join("\n"),
    "h:Reply-To": email,
  });

  let mg: Response;
  try {
    mg = await fetch(`${apiBase}/v3/${domain}/messages`, {
      method: "POST",
      headers: { Authorization: `Basic ${auth}` },
      body: payload,
    });
  } catch (err) {
    console.error("contact: Mailgun fetch failed", err);
    return json(502, { ok: false, error: "Could not reach mail. Try again." });
  }

  if (!mg.ok) {
    const detail = await mg.text();
    console.error("contact: Mailgun rejected", mg.status, detail.slice(0, 400));
    return json(502, { ok: false, error: "Mail was not accepted. Try again." });
  }

  return json(200, { ok: true });
}

async function mintOsLead(opts: {
  name: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  pillar: string;
  message: string;
}): Promise<string | null> {
  const osUrl = process.env.CORIOLIS_OS_URL?.trim().replace(/\/$/, "");
  const secret = process.env.FORM_INTAKE_SECRET?.trim();
  if (!osUrl || !secret) {
    console.warn("contact: CORIOLIS_OS_URL / FORM_INTAKE_SECRET not set; skip Lead");
    return "skipped — CORIOLIS_OS_URL / FORM_INTAKE_SECRET not set";
  }

  const intent = PILLAR_INTENT[opts.pillar] ?? "sell";
  const notes = [
    `door=coriolisagency`,
    `pillar=${opts.pillar}`,
    opts.phone ? `phone=${opts.phone}` : null,
    opts.message,
  ]
    .filter(Boolean)
    .join(" · ");

  try {
    const res = await fetch(`${osUrl}/api/forms/lead`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${secret}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: opts.email,
        name: opts.name,
        companyName: opts.company,
        intent,
        website: opts.website || null,
        phone: opts.phone || null,
        notes,
      }),
      signal: AbortSignal.timeout(OS_TIMEOUT_MS),
    });
    if (res.ok) return null;
    const detail = await res.text();
    const error = `failed — HTTP ${res.status} ${detail.slice(0, 240)}`;
    console.error("contact: OS intake rejected", error);
    return error;
  } catch (err) {
    const error = err instanceof Error ? err.message : "OS intake failed";
    console.error("contact: OS intake failed", err);
    return `failed — ${error}`;
  }
}
