import { isValidEmail, postOsSubscribe } from "./os";

function json(status: number, payload: { ok: boolean; error?: string }) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

export async function POST(request: Request): Promise<Response> {
  try {
    let body: { email?: unknown; source?: unknown };
    try {
      body = (await request.json()) as { email?: unknown; source?: unknown };
    } catch {
      return json(400, { ok: false, error: "Invalid request." });
    }

    const email = String(body.email ?? "").trim();
    const source = String(body.source ?? "popup_coriolis").trim().slice(0, 40);
    if (!email || !isValidEmail(email)) {
      return json(400, { ok: false, error: "Enter a valid email address." });
    }

    const result = await postOsSubscribe(email, source || "popup_coriolis");
    return json(result.ok ? 200 : 502, result);
  } catch (err) {
    console.error("subscribe: unhandled", err);
    return json(500, { ok: false, error: "Could not subscribe. Try again." });
  }
}
