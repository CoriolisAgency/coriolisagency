import {
  handlePopupLookup,
  handlePopupSubscribe,
  popupStatus,
  publicResult,
  type PopupSubscribeBody,
} from "../popup-kit/server/subscribe-core.js";

// popup-kit v2 (FFL-CLAIM-POPUP). Decision: Paul 2026-11-03 6:56 AM ET via Chief.
// GET            -> status (names only)
// GET ?ffl=      -> FFL lookup, proxied server-side to GSE (name, city, state, listed only)
// POST           -> create-only Mailchimp + signed Ops forward (agency signups mint Ops Leads)
const SITE = "agency" as const;
const LANE = "agency-web";
const WINDOW_MS = 10 * 60 * 1000;
const MAX_POSTS = 10;
const MAX_LOOKUPS = 30;
const hits = new Map<string, number[]>();

function json(status: number, payload: Record<string, unknown>): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function clientIp(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0].trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function limited(key: string, max: number): boolean {
  const now = Date.now();
  const prev = (hits.get(key) || []).filter((t) => now - t < WINDOW_MS);
  if (prev.length >= max) {
    hits.set(key, prev);
    return true;
  }
  prev.push(now);
  hits.set(key, prev);
  return false;
}

export async function GET(request: Request): Promise<Response> {
  const ffl = new URL(request.url).searchParams.get("ffl");
  if (ffl !== null) {
    if (limited("l:" + clientIp(request), MAX_LOOKUPS)) {
      return json(429, { ok: false, error: "Too many attempts. Try again later." });
    }
    const r = await handlePopupLookup(process.env, ffl);
    return json(r.status, r.body);
  }
  const status = popupStatus(process.env, SITE);
  return json(200, {
    ok: true,
    enabled: status.enabled,
    backend: status.backend,
    lane: LANE,
    site: SITE,
    v: status.v,
  });
}

export async function POST(request: Request): Promise<Response> {
  try {
    if (limited("p:" + clientIp(request), MAX_POSTS)) {
      return json(429, { ok: false, error: "Too many attempts. Try again later." });
    }
    let body: PopupSubscribeBody;
    try {
      body = (await request.json()) as PopupSubscribeBody;
    } catch {
      return json(400, { ok: false, error: "Invalid request." });
    }
    const result = await handlePopupSubscribe(process.env, SITE, body);
    return json(result.status, publicResult(result));
  } catch (err) {
    console.error("popup: unhandled", (err as Error).name);
    return json(500, { ok: false, error: "Could not sign you up. Try again." });
  }
}
