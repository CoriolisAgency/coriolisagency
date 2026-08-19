import { postOsUnsubscribe } from "../src/lib/os-subscribe";

function redirectTo(path: string) {
  return new Response(null, {
    status: 303,
    headers: { location: path },
  });
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
