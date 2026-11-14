/**
 * FFL Filters lead-handoff receiver for coriolisagency.com
 * (/ffl-filters/connect). Implements docs/lead-handoff-contract.md
 * (CoriolisAgency/ffl-filters, FFLF-16).
 *
 * Flow:
 *  1. Cross-site plugin POST is accepted and validated, but not persisted.
 *  2. A signed, HttpOnly, Secure, SameSite=Lax session cookie holds the
 *     contract fields. GET (or a 303 after the handoff) re-displays them
 *     on a confirmation page with a CSRF token.
 *  3. A second, same-site submit persists the lead through the existing
 *     @coriolis/lead-form handler (Ops POST /api/forms/lead), then shows
 *     a thank-you state. No new third-party service or env var.
 *
 * This page is noindex, unlisted, and has no analytics or pixels.
 * Copy strings are placeholders: TODO(Brandy).
 */
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { EMAIL_RE } from "@coriolis/lead-form";

export const CONNECT_PATH = "/ffl-filters/connect";
export const CANONICAL = "https://www.coriolisagency.com/ffl-filters/connect";
export const DELETE_MAILBOX = "support@coriolisagency.com";
export const DELETE_MAILTO = `mailto:${DELETE_MAILBOX}`;

export const MAX_BODY_BYTES = 64 * 1024;
export const HANDOFF_COOKIE = "fflf_handoff";
export const SENT_COOKIE = "fflf_sent";
export const HANDOFF_MAX_AGE_SEC = 30 * 60;
export const SENT_MAX_AGE_SEC = 10 * 60;

export const TOPICS = [
  "setup",
  "speed",
  "catalog",
  "website",
  "other",
] as const;
export type Topic = (typeof TOPICS)[number];

export const PRODUCT_COUNT_BUCKETS = [
  "0-1k",
  "1k-10k",
  "10k-50k",
  "50k-80k",
  "80k+",
] as const;
export type ProductCountBucket = (typeof PRODUCT_COUNT_BUCKETS)[number];

const TOPIC_SET = new Set<string>(TOPICS);

// FFL Filters 1.1.0 sends a slim form (name, email, message, consent) with
// consent_v=2. Store name, store URL and topic are optional only for that
// version; every other consent_v keeps the v1 rules.
export const SLIM_CONSENT_VERSION = "2";
const COMPANY_FALLBACK = "Not given (FFL Filters)";
const BUCKET_SET = new Set<string>(PRODUCT_COUNT_BUCKETS);

const LIMITS = {
  name: 200,
  email: 200,
  store_name: 200,
  store_url: 200,
  topic: 40,
  message: 1000,
  phone: 40,
  consent: 8,
  consent_v: 40,
  include_env: 8,
  plugin_version: 40,
  wp_version: 40,
  woo_version: 40,
  product_count_bucket: 20,
} as const;

export type HandoffFields = {
  name: string;
  email: string;
  store_name: string;
  store_url: string;
  // Empty only on a slim (consent_v=2) handoff.
  topic: Topic | "";
  message: string;
  phone: string;
  consent: "1";
  consent_v: string;
  include_env: boolean;
  plugin_version?: string;
  wp_version?: string;
  woo_version?: string;
  product_count_bucket?: ProductCountBucket;
};

export type FieldErrors = Partial<Record<string, string>>;

type HandoffJar = {
  v: 1;
  exp: number;
  csrf: string;
  fields: HandoffFields;
};

type SentJar = {
  v: 1;
  exp: number;
  ok: true;
};

type RateBucket = { stamps: number[] };
const rateBuckets = new Map<string, RateBucket>();

export function resetConnectRateLimit(): void {
  rateBuckets.clear();
}

function rateSettings(): { max: number; windowMs: number } {
  const max = Number(process.env.LEAD_FORM_RATE_MAX ?? "20");
  const windowMs = Number(process.env.LEAD_FORM_RATE_WINDOW_MS ?? "600000");
  return {
    max: Number.isFinite(max) ? max : 20,
    windowMs: Number.isFinite(windowMs) ? windowMs : 600_000,
  };
}

function allowRequest(ip: string, now: number, max: number, windowMs: number): boolean {
  if (max <= 0 || windowMs <= 0) return true;
  const recent = (rateBuckets.get(ip)?.stamps ?? []).filter(
    (stamp) => now - stamp < windowMs,
  );
  if (recent.length >= max) {
    rateBuckets.set(ip, { stamps: recent });
    return false;
  }
  recent.push(now);
  rateBuckets.set(ip, { stamps: recent });
  if (rateBuckets.size > 5000) {
    rateBuckets.clear();
    rateBuckets.set(ip, { stamps: recent });
  }
  return true;
}

export function clean(value: unknown, max: number): string {
  return String(value ?? "")
    .replace(/\u0000/g, "")
    .trim()
    .slice(0, max);
}

function cleanExact(value: unknown, max: number): { value: string; tooLong: boolean } {
  const raw = String(value ?? "")
    .replace(/\u0000/g, "")
    .trim();
  return { value: raw.slice(0, max), tooLong: raw.length > max };
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function mediaType(request: Request): string {
  return (request.headers.get("content-type") ?? "")
    .split(";")[0]
    .trim()
    .toLowerCase();
}

function requestHost(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-host");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim().toLowerCase() ?? "";
  }
  const host = request.headers.get("host");
  if (host) return host.split(",")[0]?.trim().toLowerCase() ?? "";
  try {
    return new URL(request.url).host.toLowerCase();
  } catch {
    return "";
  }
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim() ?? "";
    if (first) return first.slice(0, 80);
  }
  const real = request.headers.get("x-real-ip");
  if (real?.trim()) return real.trim().slice(0, 80);
  return "unknown";
}

function isForeignOrigin(request: Request, actualHost: string): boolean {
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite === "cross-site") return true;
  // Browsers send `Origin: null` on a same-origin form POST when the page's
  // Referrer-Policy is no-referrer (or for other privacy reasons), while
  // Sec-Fetch-Site still reports the true relationship. Trust same-origin;
  // an opaque "null" origin without it stays foreign.
  if (fetchSite === "same-origin") return false;
  const origin = request.headers.get("origin");
  if (!origin) return false;
  let originHost = "";
  try {
    originHost = new URL(origin).host.toLowerCase();
  } catch {
    return true;
  }
  if (!actualHost) return true;
  return originHost !== actualHost && !originHost.startsWith(`${actualHost}:`);
}

function signingSecret(): string {
  return process.env.FORM_INTAKE_SECRET?.trim() ?? "";
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function encodeJar(data: object, secret: string): string {
  const payload = Buffer.from(JSON.stringify(data), "utf8").toString("base64url");
  return `${payload}.${sign(payload, secret)}`;
}

function decodeJar<T>(value: string, secret: string): T | null {
  const dot = value.lastIndexOf(".");
  if (dot < 1 || !secret) return null;
  const payload = value.slice(0, dot);
  const mac = value.slice(dot + 1);
  const expected = sign(payload, secret);
  const a = Buffer.from(mac);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    return JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as T;
  } catch {
    return null;
  }
}

function cookieHeader(name: string, value: string, maxAge: number): string {
  return `${name}=${value}; Path=${CONNECT_PATH}; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;
}

function clearCookieHeader(name: string): string {
  return `${name}=; Path=${CONNECT_PATH}; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
}

export function readCookie(request: Request, name: string): string {
  const raw = request.headers.get("cookie") ?? "";
  for (const part of raw.split(";")) {
    const trimmed = part.trim();
    const eq = trimmed.indexOf("=");
    if (eq < 1) continue;
    if (trimmed.slice(0, eq) === name) return trimmed.slice(eq + 1);
  }
  return "";
}

function newCsrf(): string {
  return randomBytes(24).toString("base64url");
}

export function parseForm(raw: string): Record<string, string> {
  const params = new URLSearchParams(raw);
  const out: Record<string, string> = {};
  for (const [key, value] of params.entries()) {
    // First value wins; extras of the same name are ignored.
    if (!(key in out)) out[key] = value;
  }
  return out;
}

export function validateHandoff(
  input: Record<string, string>,
): { ok: true; fields: HandoffFields } | { ok: false; errors: FieldErrors } {
  const errors: FieldErrors = {};

  const name = cleanExact(input.name, LIMITS.name);
  const email = cleanExact(input.email, LIMITS.email);
  const storeName = cleanExact(input.store_name, LIMITS.store_name);
  const storeUrl = cleanExact(input.store_url, LIMITS.store_url);
  const topic = cleanExact(input.topic, LIMITS.topic);
  const message = cleanExact(input.message, LIMITS.message);
  const phone = cleanExact(input.phone, LIMITS.phone);
  const consent = cleanExact(input.consent, LIMITS.consent);
  const consentV = cleanExact(input.consent_v, LIMITS.consent_v);
  const includeEnv = cleanExact(input.include_env, LIMITS.include_env);

  if (!name.value) errors.name = "Name is required.";
  else if (name.tooLong) errors.name = "Name must be 200 characters or fewer.";

  if (!email.value) errors.email = "Email is required.";
  else if (email.tooLong) errors.email = "Email must be 200 characters or fewer.";
  else if (!EMAIL_RE.test(email.value)) errors.email = "That email does not look valid.";

  const slim = consentV.value === SLIM_CONSENT_VERSION;

  if (!storeName.value) {
    if (!slim) errors.store_name = "Store name is required.";
  } else if (storeName.tooLong) {
    errors.store_name = "Store name must be 200 characters or fewer.";
  }

  if (!storeUrl.value) {
    if (!slim) errors.store_url = "Store URL is required.";
  } else if (storeUrl.tooLong) errors.store_url = "Store URL must be 200 characters or fewer.";
  else if (!isHttpUrl(storeUrl.value)) {
    errors.store_url = "Store URL must be an http or https address.";
  }

  if (!topic.value) {
    if (!slim) errors.topic = "Topic is required.";
  } else if (!TOPIC_SET.has(topic.value)) {
    errors.topic = "Topic must be setup, speed, catalog, website, or other.";
  }

  if (message.tooLong) errors.message = "Message must be 1000 characters or fewer.";
  if (phone.tooLong) errors.phone = "Phone must be 40 characters or fewer.";

  if (consent.value !== "1") {
    errors.consent = "Consent is required.";
  }
  if (!consentV.value) errors.consent_v = "Consent version is required.";
  else if (consentV.tooLong) {
    errors.consent_v = "Consent version is too long.";
  }

  const wantsEnv = includeEnv.value === "1";
  let pluginVersion: string | undefined;
  let wpVersion: string | undefined;
  let wooVersion: string | undefined;
  let bucket: ProductCountBucket | undefined;

  if (wantsEnv) {
    const plugin = cleanExact(input.plugin_version, LIMITS.plugin_version);
    const wp = cleanExact(input.wp_version, LIMITS.wp_version);
    const woo = cleanExact(input.woo_version, LIMITS.woo_version);
    const count = cleanExact(
      input.product_count_bucket,
      LIMITS.product_count_bucket,
    );
    if (!plugin.value) errors.plugin_version = "Plugin version is required when site info is included.";
    else if (plugin.tooLong) errors.plugin_version = "Plugin version is too long.";
    else pluginVersion = plugin.value;

    if (!wp.value) errors.wp_version = "WordPress version is required when site info is included.";
    else if (wp.tooLong) errors.wp_version = "WordPress version is too long.";
    else wpVersion = wp.value;

    if (woo.tooLong) errors.woo_version = "WooCommerce version is too long.";
    else if (woo.value) wooVersion = woo.value;

    if (!count.value) {
      errors.product_count_bucket =
        "Product count bucket is required when site info is included.";
    } else if (!BUCKET_SET.has(count.value)) {
      errors.product_count_bucket =
        "Product count bucket must be 0-1k, 1k-10k, 10k-50k, 50k-80k, or 80k+.";
    } else {
      bucket = count.value as ProductCountBucket;
    }
  }

  if (Object.keys(errors).length) return { ok: false, errors };

  const fields: HandoffFields = {
    name: name.value,
    email: email.value,
    store_name: storeName.value,
    store_url: storeUrl.value,
    topic: topic.value as Topic | "",
    message: message.value,
    phone: phone.value,
    consent: "1",
    consent_v: consentV.value,
    include_env: wantsEnv,
  };
  if (wantsEnv) {
    fields.plugin_version = pluginVersion;
    fields.wp_version = wpVersion;
    if (wooVersion) fields.woo_version = wooVersion;
    fields.product_count_bucket = bucket;
  }
  return { ok: true, fields };
}

export function buildLeadMessage(fields: HandoffFields): string {
  const lines = ["FFL Filters handoff"];
  if (fields.topic) lines.push(`topic=${fields.topic}`);
  lines.push(`consent=${fields.consent}`, `consent_v=${fields.consent_v}`);
  if (fields.message) {
    lines.push("", fields.message);
  }
  if (fields.include_env) {
    lines.push("");
    lines.push(`plugin_version=${fields.plugin_version ?? ""}`);
    lines.push(`wp_version=${fields.wp_version ?? ""}`);
    if (fields.woo_version) lines.push(`woo_version=${fields.woo_version}`);
    lines.push(`product_count_bucket=${fields.product_count_bucket ?? ""}`);
  }
  return lines.join("\n");
}

function topicLabel(topic: Topic | ""): string {
  switch (topic) {
    case "setup":
      return "Help with setup";
    case "speed":
      return "Help with speed";
    case "catalog":
      return "Help with catalog or feed";
    case "website":
      return "A website project";
    default:
      return "Other";
  }
}

// Copy: Brandy, Nov 10, 2026 (PR #175).
const COPY = {
  titleLanding: "FFL Filters: talk to Coriolis | Coriolis, LLC",
  titleConfirm: "Confirm your FFL Filters request | Coriolis, LLC",
  titleThanks: "FFL Filters request received | Coriolis, LLC",
  titleError: "FFL Filters request not sent | Coriolis, LLC",
  kicker: "FFL Filters",
  landingH1: "Talk to Coriolis about FFL Filters",
  landingP: "This page picks up the request you send from FFL Filters, using the form on the last step of the setup wizard or on the Help tab in your WordPress admin. Opening this page on its own doesn't send us anything, so if you'd like to reach us another way, email support@coriolisagency.com or use the form at https://www.coriolisagency.com/contact.",
  confirmH1: "Check your details and send",
  confirmP: "These are the details FFL Filters passed along from your WordPress admin, and we haven't stored any of them yet. If they look right, click Send to Coriolis and they go to Coriolis only, so we can get in touch with you about FFL Filters.",
  confirmSubmit: "Send to Coriolis",
  thanksH1: "We have your request",
  thanksP: "Thanks for reaching out. Your request is with Coriolis now, and we'll reply to the email address you gave us. If something changes in the meantime, write to support@coriolisagency.com.",
  errorH1: "We couldn't send this request",
  missing: "A required detail was missing or didn't look right, so we didn't receive anything. Check your name, email, store name, store URL and topic on the FFL Filters contact form, then send it once more.",
  consent: "The consent box wasn't ticked, and without it we can't accept the request. Open the form in your WordPress admin, tick the box that lets Coriolis contact you, and click Send to Coriolis.",
  tooLarge: "That request was bigger than this page accepts. Shorten your message in the plugin and try sending it one more time.",
  multipart: "This page doesn't take file uploads. Remove the file and resend your request from the Help tab or the setup wizard in FFL Filters.",
  rateLimited: "We've had a lot of requests from your connection in a short time. Give it a few minutes and try again, or email support@coriolisagency.com.",
  retry: "We couldn't save your request just now, and it hasn't been stored. Click Send to Coriolis again in a moment, or email support@coriolisagency.com if it keeps happening.",
  notConfigured: "Our side of this form isn't working right now, and your request hasn't been stored. Try again later, or email support@coriolisagency.com and we'll take it from there.",
  csrf: "This confirmation has expired or couldn't be checked, so we haven't stored your request. Start over from FFL Filters in your WordPress admin and it will bring you back here.",
  forbidden: "This confirmation only works from the Send to Coriolis button on this page. Your request hasn't been stored, so please start again from the plugin.",
  deleteH2: "Delete a request you sent",
  deleteP1: "If you'd like us to delete a request you sent from FFL Filters, email the address below and include the email address you used on the request. The Forget button in FFL Filters only clears the send date saved on your own site, so this email is how you remove the copy Coriolis has.",
  deleteMailboxLabel: "Send deletion requests to",
  fieldsLegend: "Your request",
  labelName: "Name",
  labelEmail: "Email",
  labelStoreName: "Store name",
  labelStoreUrl: "Store URL",
  labelTopic: "Topic",
  labelMessage: "Message",
  labelPhone: "Phone",
  labelConsent: "Consent wording version",
  labelEnv: "Site info you chose to include",
  labelPlugin: "FFL Filters version",
  labelWp: "WordPress version",
  labelWoo: "WooCommerce version",
  labelCount: "Product count range",
  home: "Home",
  privacy: "Privacy",
} as const;

function layout(opts: {
  title: string;
  heading: string;
  body: string;
  statusNote?: string;
}): string {
  const { title, heading, body, statusNote } = opts;
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, nofollow" />
    <title>${escapeHtml(title)}</title>
    <link rel="canonical" href="${CANONICAL}" />
    <meta name="theme-color" content="#0a1220" />
    <link rel="icon" href="/favicon.ico" sizes="32x32" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <style>
      :root { color-scheme: dark; }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        background: #0a1220;
        color: #e4e4e7;
        font: 16px/1.5 "Segoe UI", ui-sans-serif, system-ui, sans-serif;
      }
      header, main, footer { width: min(40rem, calc(100% - 2.5rem)); margin: 0 auto; }
      header { padding: 1.5rem 0 0; }
      header img { display: block; height: 16px; width: auto; }
      main { padding: 2.5rem 0 3rem; }
      p.kicker {
        margin: 0;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: #c8960c;
      }
      h1 { margin: 0.75rem 0 0; font-size: 1.875rem; color: #fff; font-weight: 600; letter-spacing: -0.02em; }
      h2 { margin: 2.5rem 0 0; font-size: 1.15rem; color: #fff; font-weight: 600; }
      p { margin: 1rem 0 0; color: #a1a1aa; }
      .note { margin-top: 1rem; color: #fcd34d; }
      dl {
        margin: 1.5rem 0 0;
        padding: 1.25rem 1.25rem 0.5rem;
        background: #121a2b;
        border: 1px solid #27272a;
        border-radius: 2px;
      }
      dt { margin: 0; font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #a1a1aa; }
      dd { margin: 0.25rem 0 1rem; color: #f4f4f5; overflow-wrap: anywhere; white-space: pre-wrap; }
      form { margin: 1.5rem 0 0; }
      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #8a6a0a;
        background: #c8960c;
        color: #05080f;
        font: 600 14px/1 "Segoe UI", ui-sans-serif, system-ui, sans-serif;
        padding: 0.75rem 1.25rem;
        border-radius: 2px;
        cursor: pointer;
      }
      button:hover { background: #e0a910; }
      .hp { position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden; }
      a { color: #38bdf8; }
      footer { padding: 0 0 2.5rem; color: #71717a; font-size: 0.875rem; }
      footer a { color: #a1a1aa; }
    </style>
  </head>
  <body>
    <header>
      <a href="/">
        <img src="/brand/coriolis-wordmark-white.svg" alt="Coriolis, LLC" width="215" height="28" />
      </a>
    </header>
    <main>
      <p class="kicker">${escapeHtml(COPY.kicker)}</p>
      <h1>${escapeHtml(heading)}</h1>
      ${statusNote ? `<p class="note">${escapeHtml(statusNote)}</p>` : ""}
      ${body}
      <section id="delete">
        <h2>${escapeHtml(COPY.deleteH2)}</h2>
        <p>${escapeHtml(COPY.deleteP1)}</p>
        <p>${escapeHtml(COPY.deleteMailboxLabel)}: <a href="${DELETE_MAILTO}">${escapeHtml(DELETE_MAILBOX)}</a></p>
      </section>
    </main>
    <footer>
      <a href="/">${escapeHtml(COPY.home)}</a>
      ·
      <a href="/privacy">${escapeHtml(COPY.privacy)}</a>
    </footer>
  </body>
</html>
`;
}

function fieldsDl(fields: HandoffFields): string {
  const rows: Array<[string, string]> = [
    [COPY.labelName, fields.name],
    [COPY.labelEmail, fields.email],
  ];
  // A slim (consent_v=2) handoff may leave these out; show only what was sent.
  if (fields.store_name) rows.push([COPY.labelStoreName, fields.store_name]);
  if (fields.store_url) rows.push([COPY.labelStoreUrl, fields.store_url]);
  if (fields.topic) rows.push([COPY.labelTopic, topicLabel(fields.topic)]);
  if (fields.phone) rows.push([COPY.labelPhone, fields.phone]);
  if (fields.message) rows.push([COPY.labelMessage, fields.message]);
  rows.push([COPY.labelConsent, fields.consent_v]);
  if (fields.include_env) {
    rows.push([
      COPY.labelEnv,
      [
        `${COPY.labelPlugin}: ${fields.plugin_version ?? ""}`,
        `${COPY.labelWp}: ${fields.wp_version ?? ""}`,
        fields.woo_version ? `${COPY.labelWoo}: ${fields.woo_version}` : "",
        `${COPY.labelCount}: ${fields.product_count_bucket ?? ""}`,
      ]
        .filter(Boolean)
        .join("\n"),
    ]);
  }
  const items = rows
    .map(
      ([label, value]) =>
        `<dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd>`,
    )
    .join("");
  return `<dl>${items}</dl>`;
}

function landingBody(): string {
  return `<p>${escapeHtml(COPY.landingP)}</p>`;
}

function confirmBody(fields: HandoffFields, csrf: string, errorNote?: string): string {
  const note = errorNote ? `<p class="note">${escapeHtml(errorNote)}</p>` : "";
  return `${note}
      <p>${escapeHtml(COPY.confirmP)}</p>
      ${fieldsDl(fields)}
      <form method="post" action="${CONNECT_PATH}" accept-charset="UTF-8">
        <input type="hidden" name="confirm" value="1" />
        <input type="hidden" name="csrf" value="${escapeHtml(csrf)}" />
        <div class="hp" aria-hidden="true">
          <label>Company URL <input type="text" name="company_url" value="" tabindex="-1" autocomplete="off" /></label>
        </div>
        <button type="submit">${escapeHtml(COPY.confirmSubmit)}</button>
      </form>`;
}

function thanksBody(): string {
  return `<p>${escapeHtml(COPY.thanksP)}</p>`;
}

function errorBody(detail: string): string {
  return `<p>${escapeHtml(detail)}</p>`;
}

const HTML_HEADERS = {
  "content-type": "text/html; charset=utf-8",
  "cache-control": "no-store",
  "x-robots-tag": "noindex, nofollow",
  // same-origin keeps a real Origin on the confirm POST; nothing leaks cross-site.
  "referrer-policy": "same-origin",
} as const;

function html(
  status: number,
  markup: string,
  extra?: { cookies?: string[]; location?: string },
): Response {
  const headers = new Headers(HTML_HEADERS);
  for (const cookie of extra?.cookies ?? []) headers.append("set-cookie", cookie);
  if (extra?.location) headers.set("location", extra.location);
  return new Response(markup, { status, headers });
}

function redirect(location: string, cookies: string[]): Response {
  const headers = new Headers(HTML_HEADERS);
  for (const cookie of cookies) headers.append("set-cookie", cookie);
  headers.set("location", location);
  return new Response(null, { status: 303, headers });
}

function readHandoff(request: Request): HandoffJar | null {
  const secret = signingSecret();
  if (!secret) return null;
  const raw = readCookie(request, HANDOFF_COOKIE);
  if (!raw) return null;
  const jar = decodeJar<HandoffJar>(raw, secret);
  if (!jar || jar.v !== 1 || typeof jar.exp !== "number" || jar.exp < Date.now()) {
    return null;
  }
  if (!jar.csrf || !jar.fields?.consent) return null;
  return jar;
}

function readSent(request: Request): boolean {
  const secret = signingSecret();
  if (!secret) return false;
  const raw = readCookie(request, SENT_COOKIE);
  if (!raw) return false;
  const jar = decodeJar<SentJar>(raw, secret);
  return Boolean(jar && jar.v === 1 && jar.ok === true && jar.exp >= Date.now());
}

function locationOn(request: Request): string {
  try {
    return new URL(CONNECT_PATH, request.url).pathname;
  } catch {
    return CONNECT_PATH;
  }
}

export function renderLanding(): string {
  return layout({
    title: COPY.titleLanding,
    heading: COPY.landingH1,
    body: landingBody(),
  });
}

export function renderConfirm(fields: HandoffFields, csrf: string, errorNote?: string): string {
  return layout({
    title: COPY.titleConfirm,
    heading: COPY.confirmH1,
    body: confirmBody(fields, csrf, errorNote),
  });
}

export function renderThanks(): string {
  return layout({
    title: COPY.titleThanks,
    heading: COPY.thanksH1,
    body: thanksBody(),
  });
}

export function renderError(detail: string, heading = COPY.errorH1): string {
  return layout({
    title: COPY.titleError,
    heading,
    body: errorBody(detail),
  });
}

async function persistLead(
  request: Request,
  fields: HandoffFields,
): Promise<Response> {
  const { MIN_FILL_MS } = await import("@coriolis/lead-form");
  const { POST: handleLead } = await import("@coriolis/lead-form/handler");
  const body = {
    name: fields.name,
    // The lead store needs a company; a slim handoff may not carry one.
    company: fields.store_name || COMPANY_FALLBACK,
    email: fields.email,
    phone: fields.phone,
    website: fields.store_url,
    pillar: "Ecommerce",
    message: buildLeadMessage(fields),
    company_url: "",
    started_at: Date.now() - MIN_FILL_MS - 1000,
    page: CONNECT_PATH,
    site: "coriolisagency",
  };
  const headers = new Headers();
  headers.set("content-type", "application/json; charset=utf-8");
  const host = request.headers.get("host");
  if (host) headers.set("host", host);
  const origin = request.headers.get("origin");
  // handleConfirm already passed the origin gate. An opaque "null" Origin
  // (same-origin POST from a no-referrer page) would trip the lead handler's
  // own origin check, so only forward a real one.
  if (origin && origin !== "null") headers.set("origin", origin);
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite) headers.set("sec-fetch-site", fetchSite);
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) headers.set("x-forwarded-for", forwarded);
  const forwardedHost = request.headers.get("x-forwarded-host");
  if (forwardedHost) headers.set("x-forwarded-host", forwardedHost);
  const realIp = request.headers.get("x-real-ip");
  if (realIp) headers.set("x-real-ip", realIp);

  const leadRequest = new Request(new URL("/api/lead", request.url), {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  return handleLead(leadRequest);
}

export async function handleConnect(request: Request): Promise<Response> {
  const method = request.method.toUpperCase();

  if (method === "HEAD") {
    const res = await handleConnect(
      new Request(request.url, { method: "GET", headers: request.headers }),
    );
    return new Response(null, { status: res.status, headers: res.headers });
  }

  if (method === "GET") {
    if (readSent(request)) {
      return html(200, renderThanks());
    }
    const handoff = readHandoff(request);
    if (handoff) {
      return html(200, renderConfirm(handoff.fields, handoff.csrf));
    }
    return html(200, renderLanding());
  }

  if (method !== "POST") {
    return html(405, renderError("Open this page in a browser, or reach it from the form inside FFL Filters."));
  }

  const { max, windowMs } = rateSettings();
  if (!allowRequest(clientIp(request), Date.now(), max, windowMs)) {
    return html(429, renderError(COPY.rateLimited));
  }

  const type = mediaType(request);
  if (type.startsWith("multipart/")) {
    return html(400, renderError(COPY.multipart));
  }

  let raw = "";
  try {
    raw = await request.text();
  } catch {
    return html(400, renderError(COPY.missing));
  }
  const bytes = Buffer.byteLength(raw, "utf8");
  if (bytes > MAX_BODY_BYTES) {
    return html(413, renderError(COPY.tooLarge));
  }

  if (type && type !== "application/x-www-form-urlencoded") {
    return html(400, renderError(COPY.missing));
  }
  const form = parseForm(raw);

  // Second, same-site confirmation submit.
  if (form.confirm === "1") {
    return handleConfirm(request, form);
  }

  // First-hand-off POST may be cross-site. Do not persist yet.
  const result = validateHandoff(form);
  if (result.ok === false) {
    const consentProblem =
      Boolean(result.errors.consent) && Object.keys(result.errors).length === 1;
    return html(400, renderError(consentProblem ? COPY.consent : COPY.missing));
  }

  const secret = signingSecret();
  if (!secret) {
    console.error(
      "ffl-filters-connect: FORM_INTAKE_SECRET is required to sign the confirmation cookie",
    );
    return html(503, renderError(COPY.notConfigured));
  }

  const csrf = newCsrf();
  const jar: HandoffJar = {
    v: 1,
    exp: Date.now() + HANDOFF_MAX_AGE_SEC * 1000,
    csrf,
    fields: result.fields,
  };
  return redirect(locationOn(request), [
    cookieHeader(HANDOFF_COOKIE, encodeJar(jar, secret), HANDOFF_MAX_AGE_SEC),
    clearCookieHeader(SENT_COOKIE),
  ]);
}

async function handleConfirm(
  request: Request,
  form: Record<string, string>,
): Promise<Response> {
  if (isForeignOrigin(request, requestHost(request))) {
    return html(403, renderError(COPY.forbidden));
  }

  const secret = signingSecret();
  if (!secret) {
    return html(503, renderError(COPY.notConfigured));
  }

  const handoff = readHandoff(request);
  const csrf = clean(form.csrf, 80);
  if (!handoff || !csrf || csrf !== handoff.csrf) {
    return html(400, renderError(COPY.csrf), {
      cookies: [clearCookieHeader(HANDOFF_COOKIE)],
    });
  }

  // Honeypot: look like success, do not mint a lead.
  if (clean(form.company_url, 200)) {
    const sent: SentJar = { v: 1, exp: Date.now() + SENT_MAX_AGE_SEC * 1000, ok: true };
    return redirect(locationOn(request), [
      clearCookieHeader(HANDOFF_COOKIE),
      cookieHeader(SENT_COOKIE, encodeJar(sent, secret), SENT_MAX_AGE_SEC),
    ]);
  }

  const leadRes = await persistLead(request, handoff.fields);
  let payload: { ok?: boolean; error?: string } = {};
  try {
    payload = (await leadRes.json()) as { ok?: boolean; error?: string };
  } catch {
    payload = {};
  }

  if (leadRes.status === 429) {
    return html(429, renderConfirm(handoff.fields, handoff.csrf, COPY.rateLimited));
  }
  if (leadRes.status === 503) {
    return html(503, renderConfirm(handoff.fields, handoff.csrf, COPY.notConfigured));
  }
  if (!leadRes.ok || payload.ok !== true) {
    return html(
      leadRes.status >= 400 ? leadRes.status : 502,
      renderConfirm(handoff.fields, handoff.csrf, COPY.retry),
    );
  }

  const sent: SentJar = { v: 1, exp: Date.now() + SENT_MAX_AGE_SEC * 1000, ok: true };
  return redirect(locationOn(request), [
    clearCookieHeader(HANDOFF_COOKIE),
    cookieHeader(SENT_COOKIE, encodeJar(sent, secret), SENT_MAX_AGE_SEC),
  ]);
}
