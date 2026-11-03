/* popup-kit v2: FFL claim pop-up. Framework-free. Config: window.CORIOLIS_POPUP. */
(function () {
  "use strict";
  var C = window.CORIOLIS_POPUP;
  if (!C || !C.site || !C.endpoint || window.__cpop2) return;
  window.__cpop2 = 1;
  var D = document, W = window, L = W.location;
  var K = "cpop:" + C.site + ":", DAY = 864e5, CAP = 14 * DAY;
  var copy = C.copy || {}, th = C.theme || {};
  var force = /[?&]popup=1\b/.test(L.search);
  var deny = ["/privacy", "/terms", "/unsubscribe", "/confirmed", "/api"].concat(C.denyPaths || []);
  function denied(p) {
    for (var i = 0; i < deny.length; i++) if (p === deny[i] || p.indexOf(deny[i] + "/") === 0) return true;
    return false;
  }
  function get(k) { try { return +localStorage.getItem(K + k) || 0; } catch (e) { return 0; } }
  function set(k) { try { localStorage.setItem(K + k, String(Date.now())); } catch (e) {} }
  var capped = !force && (denied(L.pathname) || Date.now() - get("done") < 365 * DAY || Date.now() - get("seen") < CAP);
  function ev(name, extra) {
    var d = { event: "cpop_" + name, cpop_site: C.site, cpop_v: "2" };
    for (var k in extra || {}) d[k] = extra[k];
    try { (W.dataLayer = W.dataLayer || []).push(d); } catch (e) {}
    try { if (W.plausible) W.plausible("cpop_" + name, { props: { site: C.site } }); } catch (e) {}
  }
  function el(tag, attrs, kids) {
    var n = D.createElement(tag);
    for (var a in attrs || {}) {
      if (a === "text") n.textContent = attrs[a];
      else if (a === "html") n.innerHTML = attrs[a];
      else n.setAttribute(a, attrs[a]);
    }
    (kids || []).forEach(function (c) { if (c) n.appendChild(c); });
    return n;
  }
  function ffl15(v) {
    var s = String(v || "").toUpperCase().trim();
    if (/-/.test(s)) { var p = s.split(/-+/); return p.length === 6 && p[5].length > 0; }
    return s.replace(/[^0-9A-Z]/g, "").length === 15;
  }
  var t0 = Date.now(), open = false, last = null, root, form, fEmail, fFfl, fNo, wrap, welcome, err, btn, hd, lede, badge, peek;
  var unlockItems = copy.unlocks || ["Your GunSearchEngine.com seller listing", "FFL Messenger for your shop team", "Transfer status between shops"];

  function build() {
    var vars = "";
    var map = { band: "--cp-band", bandFg: "--cp-band-fg", accent: "--cp-accent", accentFg: "--cp-accent-fg", font: "--cp-font", ink: "--cp-ink" };
    for (var k in map) if (th[k]) vars += map[k] + ":" + th[k] + ";";
    root = el("div", { class: "cpop", "data-site": C.site, style: vars, hidden: "" });
    var scrim = el("div", { class: "cpop-scrim", "data-close": "1" });
    var logos = el("div", { class: "cpop-logos" });
    (C.logos || []).forEach(function (lg, i) {
      logos.appendChild(el("img", { src: lg.src, alt: lg.alt || "", class: i ? "cpop-logo cpop-logo-2" : "cpop-logo", height: String(lg.h || 36), decoding: "async" }));
    });
    var close = el("button", { type: "button", class: "cpop-x", "aria-label": "Close", "data-close": "1", html: "&times;" });
    var band = el("div", { class: "cpop-band" }, [logos, close]);
    badge = el("p", { class: "cpop-badge", text: copy.badge || "Free for every licensed FFL" });
    hd = el("h2", { id: "cpop-title", class: "cpop-h", text: copy.headline || "Licensed dealers only. Claim your FFL." });
    lede = el("p", { id: "cpop-lede", class: "cpop-lede", text: copy.body || "" });
    fFfl = el("input", { id: "cpop-ffl", name: "ffl", type: "text", inputmode: "text", autocomplete: "off", spellcheck: "false", placeholder: "1-23-456-78-9A-12345", "aria-describedby": "cpop-ffl-hint", required: "" });
    var lFfl = el("label", { for: "cpop-ffl", class: "cpop-l", text: copy.fflLabel || "FFL number" });
    var hint = el("p", { id: "cpop-ffl-hint", class: "cpop-hint", text: copy.fflHint || "From your license. Dashes optional." });
    welcome = el("div", { class: "cpop-welcome", "aria-live": "polite", hidden: "" });
    wrap = el("div", { class: "cpop-fflwrap" }, [lFfl, fFfl, hint, welcome]);
    fEmail = el("input", { id: "cpop-email", name: "email", type: "email", autocomplete: "email", required: "", placeholder: "you@yourshop.com" });
    var lEmail = el("label", { for: "cpop-email", class: "cpop-l", text: copy.emailLabel || "Email" });
    fNo = el("input", { id: "cpop-noffl", name: "no_ffl", type: "checkbox" });
    var lNo = el("label", { for: "cpop-noffl", class: "cpop-check" }, [fNo, el("span", { text: copy.noFflLabel || "I don't have an FFL" })]);
    var hp = el("input", { name: "website", type: "text", tabindex: "-1", autocomplete: "off", class: "cpop-hp", "aria-hidden": "true" });
    btn = el("button", { type: "submit", class: "cpop-btn", text: copy.button || "Claim my FFL" });
    err = el("p", { class: "cpop-err", role: "alert" });
    var consent = el("p", { class: "cpop-consent" });
    consent.appendChild(D.createTextNode((copy.consent || "By submitting you agree to get email from Coriolis sites. Unsubscribe anytime.") + " "));
    consent.appendChild(el("a", { href: C.privacyUrl || "/privacy", text: "Privacy policy" }));
    form = el("form", { class: "cpop-form", novalidate: "" }, [wrap, el("div", { class: "cpop-f" }, [lEmail, fEmail]), lNo, hp, btn, err, consent]);
    var main = el("div", { class: "cpop-main" }, [badge, hd, lede, form]);
    var side = null;
    if (C.peek && C.peek.src) {
      side = el("div", { class: "cpop-peek", "aria-hidden": "true" }, [
        el("img", { src: C.peek.src, alt: "", decoding: "async", loading: "lazy" }),
        el("span", { class: "cpop-peek-lock", text: C.peek.caption || "Shop-floor chat, inside FFL Messenger" })
      ]);
    }
    peek = side;
    var body = el("div", { class: "cpop-body" }, [main, side]);
    var card = el("div", { class: "cpop-card", role: "dialog", "aria-modal": "true", "aria-labelledby": "cpop-title", "aria-describedby": "cpop-lede", tabindex: "-1" }, [band, body]);
    root.appendChild(scrim);
    root.appendChild(card);
    D.body.appendChild(root);
    root.addEventListener("click", function (e) { if (e.target && e.target.getAttribute && e.target.getAttribute("data-close")) hide("close"); });
    root.addEventListener("keydown", onKey);
    fNo.addEventListener("change", mode);
    fFfl.addEventListener("input", onFfl);
    form.addEventListener("submit", submit);
  }

  function mode() {
    var no = fNo.checked;
    wrap.hidden = no;
    fFfl.required = !no;
    badge.hidden = no;
    if (peek) peek.hidden = no;
    root.classList.toggle("cpop-plain", no);
    hd.textContent = no ? copy.noFflHeadline || "Get updates" : copy.headline || "Licensed dealers only. Claim your FFL.";
    lede.textContent = no ? copy.noFflBody || "News and updates from GunSearchEngine.com and FFL Messenger. No spam." : copy.body || "";
    btn.textContent = no ? copy.noFflButton || "Get updates" : copy.button || "Claim my FFL";
    err.textContent = "";
    ev(no ? "no_ffl" : "has_ffl");
  }

  var lookT = 0, lookV = "";
  function onFfl() {
    clearTimeout(lookT);
    var v = fFfl.value;
    if (!ffl15(v)) { showWelcome(null); return; }
    lookT = setTimeout(function () {
      if (v === lookV) return;
      lookV = v;
      fetch(C.endpoint + "?ffl=" + encodeURIComponent(v), { headers: { accept: "application/json" } })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (j) { if (fFfl.value === v) showWelcome(j && j.found ? j : null); })
        .catch(function () {});
    }, 450);
  }

  function place(j) { return j.city ? j.city + (j.state ? " " + j.state : "") : j.state || ""; }

  function showWelcome(j) {
    welcome.textContent = "";
    if (!j || !j.name) { welcome.hidden = true; return; }
    var p = place(j);
    welcome.appendChild(el("p", { class: "cpop-hi", text: "Welcome, " + j.name + (p ? ", " + p : "") }));
    var ul = el("ul", { class: "cpop-unlocks" });
    unlockItems.forEach(function (u) { ul.appendChild(el("li", { text: u })); });
    welcome.appendChild(el("p", { class: "cpop-ul-h", text: copy.unlockHead || "Your claim opens up:" }));
    welcome.appendChild(ul);
    if (j.listed) welcome.appendChild(el("p", { class: "cpop-listed", text: copy.listed || "Your shop is already listed on GunSearchEngine.com" }));
    welcome.hidden = false;
    ev("ffl_found");
  }

  function utm() {
    var q = new URLSearchParams(L.search), o = {};
    ["source", "medium", "campaign", "term", "content"].forEach(function (k) { var v = q.get("utm_" + k); if (v) o[k] = v.slice(0, 120); });
    return o;
  }

  function submit(e) {
    e.preventDefault();
    err.textContent = "";
    var no = fNo.checked, email = fEmail.value.trim();
    if (!no && !ffl15(fFfl.value)) { err.textContent = copy.fflError || "Enter your FFL number, or check I don't have an FFL."; fFfl.focus(); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { err.textContent = "Enter a valid email address."; fEmail.focus(); return; }
    btn.disabled = true;
    var q = new URLSearchParams(L.search);
    var body = { email: email, ffl: no ? "" : fFfl.value, no_ffl: no, website: form.website.value, t: Date.now() - t0, page: L.pathname, landing: (sessionStorage.getItem("cpop:landing") || L.pathname), referrer: D.referrer.slice(0, 300), utm: utm(), gclid: q.get("gclid") || "" };
    fetch(C.endpoint, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) })
      .then(function (r) { return r.json().catch(function () { return { ok: false }; }); })
      .then(function (j) {
        btn.disabled = false;
        if (!j || !j.ok) { err.textContent = (j && j.error) || "Could not sign you up. Try again."; ev("error"); return; }
        set("done");
        ev("submit", { cpop_path: no ? "no_ffl" : "claimed_ffl" });
        done(j, no);
      })
      .catch(function () { btn.disabled = false; err.textContent = "Could not sign you up. Try again."; });
  }

  function done(j, no) {
    var s = copy.success || {};
    hd.textContent = no ? s.noFflHeadline || "You're on the list." : j.welcome && j.welcome.name ? "Claim received, " + j.welcome.name + "." : s.headline || "Claim received.";
    lede.textContent = s.body || "Check your inbox. If you're new here, confirm your email from the link we send.";
    badge.hidden = true;
    form.hidden = true;
    var main = form.parentNode;
    if (!no) {
      var ul = el("ul", { class: "cpop-unlocks cpop-next" });
      (copy.next || []).forEach(function (n) { ul.appendChild(el("li", {}, [el("a", { href: n.href, text: n.label })])); });
      if (ul.children.length) main.appendChild(ul);
    }
    main.appendChild(el("button", { type: "button", class: "cpop-btn cpop-btn-2", "data-close": "1", text: s.close || "Close" }));
  }

  function focusables() {
    return [].slice.call(root.querySelectorAll("a[href],button:not([disabled]),input:not([type=hidden]):not(.cpop-hp)")).filter(function (n) { return n.offsetParent !== null; });
  }
  function onKey(e) {
    if (e.key === "Escape") { e.preventDefault(); hide("esc"); return; }
    if (e.key !== "Tab") return;
    var f = focusables(); if (!f.length) return;
    var a = f[0], z = f[f.length - 1];
    if (e.shiftKey && D.activeElement === a) { e.preventDefault(); z.focus(); }
    else if (!e.shiftKey && D.activeElement === z) { e.preventDefault(); a.focus(); }
  }

  function show(why) {
    if (open) return;
    if (!root) build();
    open = true; last = D.activeElement;
    root.hidden = false;
    D.documentElement.classList.add("cpop-lock");
    set("seen");
    ev("open", { cpop_trigger: why });
    setTimeout(function () { (fNo.checked ? fEmail : fFfl).focus(); }, 30);
    detach();
  }
  function hide(why) {
    if (!open) return;
    open = false; root.hidden = true;
    D.documentElement.classList.remove("cpop-lock");
    ev("close", { cpop_how: why });
    try { if (last && last.focus) last.focus(); } catch (e) {}
  }

  var mobile = W.matchMedia && W.matchMedia("(max-width: 640px), (pointer: coarse)").matches, timer = 0;
  function onOut(e) { if (Date.now() - t0 > 5000 && !e.relatedTarget && e.clientY <= 0) show("exit"); }
  function onScroll() { var h = D.documentElement; if ((h.scrollTop + W.innerHeight) / h.scrollHeight >= 0.5) show("scroll"); }
  function detach() { D.removeEventListener("mouseout", onOut); W.removeEventListener("scroll", onScroll); clearTimeout(timer); }

  var enabled = false;
  D.addEventListener("click", function (e) {
    var t = e.target && e.target.closest ? e.target.closest("[data-claim-ffl]") : null;
    if (!t || !enabled) return;
    e.preventDefault();
    show("cta");
  });

  function arm() {
    enabled = true;
    if (capped) return;
    try { if (!sessionStorage.getItem("cpop:landing")) sessionStorage.setItem("cpop:landing", L.pathname); } catch (e) {}
    if (force) { show("force"); return; }
    if (mobile) { timer = setTimeout(function () { show("timer"); }, 20000); W.addEventListener("scroll", onScroll, { passive: true }); }
    else D.addEventListener("mouseout", onOut);
  }

  fetch(C.endpoint, { headers: { accept: "application/json" } })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (j) { if (j && j.ok && j.enabled) arm(); })
    .catch(function () {});
  W.CoriolisPopup = { open: function () { show("api"); }, close: function () { hide("api"); } };
})();
