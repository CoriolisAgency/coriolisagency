const OS_TIMEOUT_MS = 8000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email);
}

export async function postOsSubscribe(
  email: string,
  source: string
): Promise<{ ok: boolean; error?: string }> {
  const osUrl = process.env.CORIOLIS_OS_URL?.trim().replace(/\/$/, "");
  const secret = process.env.FORM_INTAKE_SECRET?.trim();
  if (!osUrl || !secret) {
    console.error("subscribe: CORIOLIS_OS_URL / FORM_INTAKE_SECRET not set");
    return { ok: false, error: "Subscribe is not configured yet." };
  }

  try {
    const res = await fetch(`${osUrl}/api/forms/subscribe`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${secret}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, source }),
      signal: AbortSignal.timeout(OS_TIMEOUT_MS),
    });
    if (res.ok) return { ok: true };
    const detail = await res.text();
    console.error("subscribe: OS rejected", res.status, detail.slice(0, 240));
    if (res.status === 400) {
      return { ok: false, error: "Enter a valid email address." };
    }
    return { ok: false, error: "Could not subscribe. Try again." };
  } catch (err) {
    console.error("subscribe: OS failed", err);
    return { ok: false, error: "Could not subscribe. Try again." };
  }
}

export async function postOsUnsubscribe(
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
