/**
 * popup-kit v2 core: FFL claim pop-up. Zero framework imports. Node fetch + node:crypto only.
 * Env names are read by name. Never log env values, keys, or full email addresses.
 *
 * Mailchimp is CREATE-ONLY: an existing member (any status) is never edited,
 * tagged, resubscribed, or unsubscribed. New members are added as pending
 * (double opt-in) with tags and merge fields. Ops gets every submit
 * server-to-server via CORIOLIS_OS_URL + FORM_INTAKE_SECRET.
 * Decision: Paul 2026-11-03 6:56 AM ET via Chief. Board: FFL-CLAIM-POPUP.
 */

import { createHash } from "node:crypto";

export type PopupSite = "agency" | "gse" | "fflm";
export type PopupBackend = "mailchimp" | "ops" | "none";
export type PopupEnv = Record<string, string | undefined>;
export type MailchimpOutcome = "created" | "existing_untouched" | "skipped" | "error" | "off";
export type OpsOutcome = "recorded" | "error" | "off";

export type FflLookup = {
  found: boolean;
  name: string | null;
  city: string | null;
  state: string | null;
  listed: boolean;
};

export type PopupDeps = {
  /** FFL index lookup. GSE reads ffl_licenses; other sites proxy to GSE. */
  lookup?: (ffl: string) => Promise<FflLookup>;
};

export type PopupSubscribeBody = {
  email?: unknown;
  ffl?: unknown;
  no_ffl?: unknown;
  website?: unknown;
  t?: unknown;
  page?: unknown;
  landing?: unknown;
  utm?: unknown;
  gclid?: unknown;
};

export type PopupResult = {
  status: number;
  ok: boolean;
  error?: string;
  path?: "claimed_ffl" | "no_ffl";
  welcome?: { name: string; city: string | null; state: string | null } | null;
  listed?: boolean;
  mailchimp?: MailchimpOutcome;
  ops?: OpsOutcome;
};

export const KIT_VERSION = "2";
export const CONSENT_TEXT_VER = "claim-v2";
export const MERGE_FIELDS = [
  { tag: "SITE", name: "Signup site" },
  { tag: "FFL_PATH", name: "Signup path" },
  { tag: "FFL_NUM", name: "FFL number" },
] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TIMEOUT_MS = 8000;
const LOOKUP_TIMEOUT_MS = 3500;
const DEFAULT_LOOKUP_ORIGIN = "https://www.gunsearchengine.com";
const NOT_FOUND: FflLookup = { found: false, name: null, city: null, state: null, listed: false };

function trimStr(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max);
}

function envSet(env: PopupEnv, name: string): boolean {
  const v = env[name];
  return typeof v === "string" && v.trim().length > 0;
}

function emailDomain(email: string): string {
  const i = email.lastIndexOf("@");
  return i >= 0 ? email.slice(i + 1) : "unknown";
}

export function mailchimpReady(env: PopupEnv): boolean {
  return envSet(env, "MAILCHIMP_API_KEY") && envSet(env, "MAILCHIMP_AUDIENCE_ID");
}

export function opsReady(env: PopupEnv): boolean {
  return envSet(env, "CORIOLIS_OS_URL") && envSet(env, "FORM_INTAKE_SECRET");
}

/** Names only. Never values. */
export function popupStatus(
  env: PopupEnv,
  _site: PopupSite
): { enabled: boolean; backend: PopupBackend; mailchimp: boolean; ops: boolean; v: string } {
  const mailchimp = mailchimpReady(env);
  const ops = opsReady(env);
  return {
    enabled: mailchimp || ops,
    backend: mailchimp ? "mailchimp" : ops ? "ops" : "none",
    mailchimp,
    ops,
    v: KIT_VERSION,
  };
}

/** ATF license number to canonical X-XX-XXX-XX-XX-XXXXX, or null. */
export function normalizeFflNumber(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const s = raw.toUpperCase().replace(/[\s\u2010-\u2015]+/g, "-").trim();
  if (!s || s.length > 32) return null;
  let parts: string[];
  if (s.includes("-")) {
    parts = s.split("-").filter(Boolean);
    if (parts.length !== 6) return null;
  } else {
    const a = s.replace(/[^0-9A-Z]/g, "");
    if (a.length !== 15) return null;
    parts = [a.slice(0, 1), a.slice(1, 3), a.slice(3, 6), a.slice(6, 8), a.slice(8, 10), a.slice(10)];
  }
  const [r, d, c, t, e, q] = parts;
  if (!/^\d$/.test(r) || !/^\d{2}$/.test(d) || !/^\d{2}$/.test(t)) return null;
  if (!/^[0-9A-Z]{1,3}$/.test(c) || !/^[0-9A-Z]{2}$/.test(e) || !/^[0-9A-Z]{1,5}$/.test(q)) return null;
  return [r, d, c.padStart(3, "0"), t, e, q.padStart(5, "0")].join("-");
}

/** Stored forms in the GSE index drop leading zeros on county and sequence. */
export function fflCandidates(canonical: string): string[] {
  const p = canonical.split("-");
  if (p.length !== 6) return [canonical];
  const strip = (x: string) => x.replace(/^0+(?=.)/, "");
  const out = new Set<string>();
  for (const c of [p[2], strip(p[2])]) {
    for (const q of [p[5], strip(p[5])]) out.add([p[0], p[1], c, p[3], p[4], q].join("-"));
  }
  return [...out];
}

const UPPER_WORDS = new Set(["LLC", "INC", "LLP", "LP", "FFL", "USA", "II", "III", "IV", "PLLC", "DBA", "CO-OP"]);

export function displayName(raw: string): string {
  return raw
    .toLowerCase()
    .split(/(\s+)/)
    .map((w) => {
      const bare = w.replace(/[^a-z-]/g, "").toUpperCase();
      if (UPPER_WORDS.has(bare)) return w.toUpperCase();
      return w.replace(/(^|[-/&(])([a-z])/g, (_m, a: string, b: string) => a + b.toUpperCase());
    })
    .join("");
}

/** Only name, city, state, listed ever leave the lookup. */
export function sanitizeLookup(raw: unknown): FflLookup {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return { ...NOT_FOUND };
  const o = raw as Record<string, unknown>;
  if (o.found !== true) return { ...NOT_FOUND };
  const name = trimStr(o.name, 120);
  if (!name) return { ...NOT_FOUND };
  const st = trimStr(o.state, 2).toUpperCase();
  const city = trimStr(o.city, 80);
  return {
    found: true,
    name: displayName(name),
    city: city ? displayName(city) : null,
    state: /^[A-Z]{2}$/.test(st) ? st : null,
    listed: o.listed === true,
  };
}

/** Server-side proxy to the GSE lookup endpoint. Errors read as not found. */
export async function proxyFflLookup(env: PopupEnv, ffl: string): Promise<FflLookup> {
  const origin = (trimStr(env.GSE_LOOKUP_ORIGIN, 200) || DEFAULT_LOOKUP_ORIGIN).replace(/\/$/, "");
  try {
    const res = await fetch(origin + "/api/popup?ffl=" + encodeURIComponent(ffl), {
      headers: { accept: "application/json", "x-cpop-proxy": "1" },
      signal: AbortSignal.timeout(LOOKUP_TIMEOUT_MS),
    });
    if (!res.ok) return { ...NOT_FOUND };
    return sanitizeLookup(await res.json());
  } catch {
    return { ...NOT_FOUND };
  }
}

async function safeLookup(deps: PopupDeps, env: PopupEnv, ffl: string): Promise<FflLookup> {
  try {
    const r = deps.lookup ? await deps.lookup(ffl) : await proxyFflLookup(env, ffl);
    return sanitizeLookup(r);
  } catch {
    return { ...NOT_FOUND };
  }
}

/** GET ?ffl= handler body. Site wraps it with its own rate limit. */
export async function handlePopupLookup(
  env: PopupEnv,
  raw: unknown,
  deps: PopupDeps = {}
): Promise<{ status: number; body: FflLookup & { ok: boolean } }> {
  const ffl = normalizeFflNumber(raw);
  if (!ffl) return { status: 200, body: { ok: true, ...NOT_FOUND } };
  return { status: 200, body: { ok: true, ...(await safeLookup(deps, env, ffl)) } };
}

export function buildMailchimpCreate(input: { site: PopupSite; email: string; ffl: string | null }): {
  email_address: string;
  status: "pending";
  merge_fields: Record<string, string>;
  tags: string[];
} {
  const merge_fields: Record<string, string> = {
    SITE: input.site,
    FFL_PATH: input.ffl ? "claimed_ffl" : "no_ffl",
  };
  if (input.ffl) merge_fields.FFL_NUM = input.ffl;
  return {
    email_address: input.email,
    status: "pending",
    merge_fields,
    tags: ["src:popup-claim", "site:" + input.site, input.ffl ? "has_ffl" : "no_ffl"],
  };
}

function mailchimpDc(key: string): string | null {
  const m = /-([a-z]{2}\d+)$/i.exec(key.trim());
  return m ? m[1].toLowerCase() : null;
}

async function readMc(res: Response): Promise<string> {
  const text = await res.text().catch(() => "");
  try {
    const j = JSON.parse(text) as { title?: unknown; detail?: unknown };
    return String(j.title || "") + " " + String(j.detail || "");
  } catch {
    return "";
  }
}

const mergeReady = new Set<string>();

/** Create missing text merge fields. Never edits or deletes existing fields. */
async function ensureMergeFields(base: string, headers: Record<string, string>): Promise<boolean> {
  if (mergeReady.has(base)) return true;
  try {
    const res = await fetch(base + "/merge-fields?count=100&fields=merge_fields.tag", {
      headers,
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) return false;
    const j = (await res.json()) as { merge_fields?: { tag?: string }[] };
    const have = new Set((j.merge_fields || []).map((f) => String(f.tag || "").toUpperCase()));
    for (const f of MERGE_FIELDS) {
      if (have.has(f.tag)) continue;
      const c = await fetch(base + "/merge-fields", {
        method: "POST",
        headers,
        body: JSON.stringify({ tag: f.tag, name: f.name, type: "text", required: false, public: false }),
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      if (!c.ok) return false;
    }
    mergeReady.add(base);
    return true;
  } catch {
    return false;
  }
}

/** Reset the merge-field cache (tests). */
export function resetMergeFieldCache(): void {
  mergeReady.clear();
}

/** Create-only. GET first; any existing member (any status) is left untouched. */
export async function mailchimpCreateOnly(
  env: PopupEnv,
  site: PopupSite,
  email: string,
  ffl: string | null
): Promise<MailchimpOutcome> {
  if (!mailchimpReady(env)) return "off";
  const key = String(env.MAILCHIMP_API_KEY).trim();
  const dc = mailchimpDc(key);
  if (!dc) {
    console.error("popup: mailchimp missing dc");
    return "error";
  }
  const base = "https://" + dc + ".api.mailchimp.com/3.0/lists/" + String(env.MAILCHIMP_AUDIENCE_ID).trim();
  const headers = {
    authorization: "Basic " + Buffer.from("anystring:" + key).toString("base64"),
    "content-type": "application/json",
  };
  const hash = createHash("md5").update(email.toLowerCase()).digest("hex");
  try {
    const got = await fetch(base + "/members/" + hash + "?fields=status", {
      headers,
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (got.status === 200) return "existing_untouched";
    if (got.status !== 404) {
      console.error("popup: mailchimp get", got.status, emailDomain(email));
      return "error";
    }
    const payload = buildMailchimpCreate({ site, email, ffl });
    const withFields = await ensureMergeFields(base, headers);
    const post = (body: Record<string, unknown>) =>
      fetch(base + "/members", {
        method: "POST",
        headers,
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
    const lean = { email_address: payload.email_address, status: payload.status, tags: payload.tags };
    let res = await post(withFields ? { ...lean, merge_fields: payload.merge_fields } : lean);
    if (res.status === 400) {
      const why = await readMc(res);
      if (/member exists/i.test(why)) return "existing_untouched";
      if (/forgotten|compliance|fake|invalid resource/i.test(why)) return "skipped";
      if (withFields && /merge/i.test(why)) {
        res = await post(lean);
        if (res.status === 400) {
          const why2 = await readMc(res);
          if (/member exists/i.test(why2)) return "existing_untouched";
          return "skipped";
        }
      } else {
        return "skipped";
      }
    }
    if (res.ok) return "created";
    console.error("popup: mailchimp create", res.status, emailDomain(email));
    return "error";
  } catch (err) {
    console.error("popup: mailchimp failed", emailDomain(email), (err as Error).name);
    return "error";
  }
}

export async function forwardToOps(
  env: PopupEnv,
  payload: {
    email: string;
    site: PopupSite;
    ffl: string | null;
    page: string;
    utm_src: string;
    utm_cmp: string;
    gclid: string;
    mailchimp: MailchimpOutcome;
    lookup: FflLookup;
  }
): Promise<OpsOutcome> {
  if (!opsReady(env)) return "off";
  const url = String(env.CORIOLIS_OS_URL).trim().replace(/\/$/, "") + "/api/forms/claim";
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        authorization: "Bearer " + String(env.FORM_INTAKE_SECRET).trim(),
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: payload.email,
        site: payload.site,
        has_ffl: !!payload.ffl,
        ffl_number: payload.ffl,
        page: payload.page,
        utm_src: payload.utm_src,
        utm_cmp: payload.utm_cmp,
        gclid: payload.gclid,
        consent_text_ver: CONSENT_TEXT_VER,
        mailchimp_status: payload.mailchimp,
        lookup: payload.lookup,
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (res.ok) return "recorded";
    console.error("popup: ops", res.status, emailDomain(payload.email));
    return "error";
  } catch (err) {
    console.error("popup: ops failed", emailDomain(payload.email), (err as Error).name);
    return "error";
  }
}

function readT(body: PopupSubscribeBody): number {
  const n = typeof body.t === "number" ? body.t : Number(body.t);
  return Number.isFinite(n) ? n : 0;
}

/** POST handler body: claim (FFL) or plain updates (no FFL). */
export async function handlePopupSubscribe(
  env: PopupEnv,
  site: PopupSite,
  body: PopupSubscribeBody,
  deps: PopupDeps = {}
): Promise<PopupResult> {
  if (trimStr(body.website, 200) || readT(body) < 1500) return { status: 200, ok: true };
  const email = trimStr(body.email, 254).toLowerCase();
  if (!EMAIL_RE.test(email)) return { status: 400, ok: false, error: "Enter a valid email address." };
  const noFfl = body.no_ffl === true || body.no_ffl === "1" || body.no_ffl === "on";
  const ffl = noFfl ? null : normalizeFflNumber(body.ffl);
  if (!noFfl && !ffl) {
    return { status: 400, ok: false, error: "Enter your FFL number, or check I don't have an FFL." };
  }
  const st = popupStatus(env, site);
  if (!st.enabled) return { status: 503, ok: false, error: "Sign-up is not open yet." };

  const lookup = ffl ? await safeLookup(deps, env, ffl) : { ...NOT_FOUND };
  const utm =
    body.utm && typeof body.utm === "object" && !Array.isArray(body.utm)
      ? (body.utm as Record<string, unknown>)
      : {};
  const mailchimp = await mailchimpCreateOnly(env, site, email, ffl);
  const ops = await forwardToOps(env, {
    email,
    site,
    ffl,
    page: trimStr(body.page, 300),
    utm_src: trimStr(utm.source, 120),
    utm_cmp: trimStr(utm.campaign, 160),
    gclid: trimStr(body.gclid, 200),
    mailchimp,
    lookup,
  });
  const landed = mailchimp === "created" || mailchimp === "existing_untouched" || ops === "recorded";
  if (!landed) {
    return { status: 502, ok: false, error: "Could not sign you up. Try again.", mailchimp, ops };
  }
  return {
    status: 200,
    ok: true,
    path: ffl ? "claimed_ffl" : "no_ffl",
    welcome: lookup.found && lookup.name ? { name: lookup.name, city: lookup.city, state: lookup.state } : null,
    listed: lookup.listed,
    mailchimp,
    ops,
  };
}

/** Public JSON for the client. Drops internal outcome fields. */
export function publicResult(r: PopupResult): Record<string, unknown> {
  if (!r.ok) return { ok: false, error: r.error };
  return { ok: true, path: r.path, welcome: r.welcome ?? null, listed: !!r.listed };
}
