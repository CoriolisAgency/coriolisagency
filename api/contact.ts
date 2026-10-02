import { MIN_FILL_MS } from "@coriolis/lead-form";
import { POST as handleLead } from "@coriolis/lead-form/handler";

/**
 * Legacy alias for `/api/lead`. Old callers never sent `started_at`; the
 * shared handler would silently drop those bodies (200, no lead). Stamp a
 * start time older than MIN_FILL_MS so they still mint.
 */
export async function POST(request: Request): Promise<Response> {
  const raw = await request.text();
  let serialized = raw;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (parsed !== null && typeof parsed === "object" && !Array.isArray(parsed)) {
      const body = parsed as Record<string, unknown>;
      if (body.started_at == null) {
        body.started_at = Date.now() - MIN_FILL_MS - 1000;
      }
      if (body.page == null) {
        body.page = "/contact";
      }
      serialized = JSON.stringify(body);
    }
  } catch {
    serialized = raw;
  }

  const headers = new Headers(request.headers);
  headers.delete("content-length");
  const next = new Request(request.url, {
    method: request.method,
    headers,
    body: serialized,
  });
  return handleLead(next);
}
