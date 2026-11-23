/**
 * EGGNOG-RICKROLL-MODAL: in-page player for links marked data-rickroll. Binds one delegated click handler.
 * The iframe is created inside the click handler so the click's user gesture lets playback start with sound.
 * Official YouTube nocookie embed only; no self-hosted video, no dependency. Unmarked links are never touched.
 * Without JS the anchor stays a normal YouTube link (target=_blank rel=noopener).
 */
export const RICKROLL_CLOSE_LABEL = "Close video";

const ID_RE = /^[A-Za-z0-9_-]{11}$/;

function videoIdFrom(href: string): string | null {
  try {
    const id = new URL(href).searchParams.get("v");
    return id && ID_RE.test(id) ? id : null;
  } catch {
    return null;
  }
}

export function bindRickroll(doc: Document = document): () => void {
  let open: { root: HTMLElement; link: HTMLElement; prevOverflow: string; close: () => void } | null = null;

  function openModal(link: HTMLAnchorElement, id: string) {
    if (open) return;
    const win = doc.defaultView!;
    const root = doc.createElement("div");
    root.setAttribute("data-rickroll-modal", "");
    root.setAttribute("role", "dialog");
    root.setAttribute("aria-modal", "true");
    root.setAttribute("aria-label", link.textContent?.trim() || "Video");
    root.style.cssText =
      "position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(0,0,0,0.82);";
    const box = doc.createElement("div");
    box.style.cssText = "position:relative;width:min(960px,100%);max-height:100%;";
    const btn = doc.createElement("button");
    btn.type = "button";
    btn.setAttribute("aria-label", RICKROLL_CLOSE_LABEL);
    btn.textContent = "\u00d7";
    btn.style.cssText =
      "position:absolute;right:0;top:-44px;width:40px;height:40px;border:0;border-radius:9999px;background:#fff;color:#111;font:700 26px/40px system-ui,sans-serif;cursor:pointer;padding:0;";
    const frameWrap = doc.createElement("div");
    frameWrap.style.cssText = "position:relative;width:100%;aspect-ratio:16/9;background:#000;";
    const frame = doc.createElement("iframe");
    const params = new URLSearchParams({ autoplay: "1", playsinline: "1", enablejsapi: "1", rel: "0" });
    if (win.location.origin && win.location.origin !== "null") params.set("origin", win.location.origin);
    frame.src = `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
    frame.setAttribute("allow", "autoplay; encrypted-media; picture-in-picture");
    frame.setAttribute("allowfullscreen", "");
    frame.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
    frame.title = link.textContent?.trim() || "Video";
    frame.style.cssText = "position:absolute;inset:0;width:100%;height:100%;border:0;";
    frameWrap.appendChild(frame);
    box.appendChild(btn);
    box.appendChild(frameWrap);
    root.appendChild(box);

    const prevOverflow = doc.body.style.overflow;
    doc.body.style.overflow = "hidden";

    const close = () => {
      if (!open) return;
      doc.removeEventListener("keydown", onKey, true);
      root.remove(); // removes the iframe, so playback stops
      doc.body.style.overflow = prevOverflow;
      const l = open.link;
      open = null;
      l.focus();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "Tab") {
        e.preventDefault();
        btn.focus();
      }
    };
    btn.addEventListener("click", close);
    root.addEventListener("click", (e) => {
      if (e.target === root) close();
    });
    doc.addEventListener("keydown", onKey, true);
    doc.body.appendChild(root);
    open = { root, link, prevOverflow, close };
    btn.focus();
  }

  function onClick(e: MouseEvent) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const t = e.target as Element | null;
    const link = t && "closest" in t ? (t.closest("a[data-rickroll]") as HTMLAnchorElement | null) : null;
    if (!link) return;
    const id = videoIdFrom(link.href);
    if (!id) return;
    e.preventDefault();
    openModal(link, id);
  }

  doc.addEventListener("click", onClick);
  return () => {
    doc.removeEventListener("click", onClick);
    open?.close();
  };
}
