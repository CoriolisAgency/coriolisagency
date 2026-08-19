const OS_TIMEOUT_MS = 8000;

function redirectTo(path: string) {
  return new Response(null, {
    status: 303,
    headers: { location: path },
  });
}

async function postOsUnsubscribe(
  token: string
): Promise<{ ok: boolean; error?: string }> {
  const osUrl = process.env.CORIOLIS_OS_URL?.trim().replace(/\/$/, "");
  const secret = process.env.FORM_INTAKE_SECRET?.trim();
  if (!osUrl || !secret) {
    console.error("unsubscribe: CORIOLIS_OS_URL / FORM_INTAKE_SECRET not set");
    return { ok: false, error: "Unsubscribe is not configured yet." };
  }

  try {
    const res = await fetch(`${osUrl}/api/forms/unsubscribe`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${secret}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ token }),
      signal: AbortSignal.timeout(OS_TIMEOUT_MS),
    });
    if (res.ok) return { ok: true };
    const detail = await res.text();
    console.error("unsubscribe: OS rejected", res.status, detail.slice(0, 240));
    return { ok: false, error: "That unsubscribe link is not valid." };
  } catch (err) {
    console.error("unsubscribe: OS failed", err);
    return { ok: false, error: "Could not unsubscribe. Try again." };
  }
}

async function apply(token: string | null) {
  if (!token) return redirectTo("/unsubscribe?error=missing");
  const result = await postOsUnsubscribe(token);
  if (!result.ok) return redirectTo("/unsubscribe?error=invalid");
  return redirectTo("/unsubscribe?done=1");
}

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  return apply(url.searchParams.get("token"));
}

export async function POST(request: Request): Promise<Response> {
  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const body = (await request.json().catch(() => ({}))) as { token?: string };
    return apply(typeof body.token === "string" ? body.token : null);
  }
  const form = await request.formData().catch(() => null);
  const token = form ? String(form.get("token") || "") : "";
  return apply(token || null);
}
