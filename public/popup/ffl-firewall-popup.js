/* CA-FFLF-POPUP: FFL Firewall promo pop-up behaviour. No tracking, no network calls. */
(function () {
  "use strict";
  var D = document, W = window;
  var root = D.getElementById("ffw-popup-root");
  var cfgEl = D.getElementById("ffw-popup-cfg");
  if (!root || !cfgEl) return;
  var cfg;
  try { cfg = JSON.parse(cfgEl.textContent); } catch (e) { return; }

  var path = (W.location.pathname.replace(/\/+$/, "") || "/").toLowerCase();
  for (var i = 0; i < cfg.deny.length; i++) {
    if (path === cfg.deny[i] || path.indexOf(cfg.deny[i] + "/") === 0) return;
  }

  var DAY = 864e5, opened = false, lastFocus = null, mode = "modal", dlg = null;

  // Storage: localStorage if it works, otherwise once per session.
  var ls = null;
  try { W.localStorage.setItem("ffw_t", "1"); W.localStorage.removeItem("ffw_t"); ls = W.localStorage; } catch (e) { ls = null; }
  function ss(k, v) {
    try { if (v === undefined) return W.sessionStorage.getItem(k); W.sessionStorage.setItem(k, v); } catch (e) {}
    return null;
  }

  function suppressed() {
    if (ss(cfg.sessionKey)) return true; // once per visit at most
    if (ls) {
      if (ls.getItem(cfg.clickedKey)) return true;
      var until = Number(ls.getItem(cfg.dismissKey)) || 0;
      if (until > Date.now()) return true;
    }
    return false;
  }
  if (suppressed()) return;

  function blocked() {
    var a = D.activeElement;
    if (a && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)) return true; // a form is being filled
    if (D.querySelector("[data-fflf-dl-gate]:not([hidden])")) return true; // download gate open
    var nav = D.getElementById("nav-drawer");
    if (nav && !nav.hidden) return true;
    return false;
  }

  function loadImages(scope) {
    var imgs = scope.querySelectorAll("img[data-src]");
    for (var j = 0; j < imgs.length; j++) {
      imgs[j].src = imgs[j].getAttribute("data-src");
      imgs[j].removeAttribute("data-src");
    }
  }

  function focusables() {
    return Array.prototype.slice.call(
      dlg.querySelectorAll('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])')
    ).filter(function (el) { return el.offsetParent !== null; });
  }

  function onKey(e) {
    if (e.key === "Escape" || e.key === "Esc") { e.preventDefault(); dismiss(); return; }
    if (e.key !== "Tab" || mode !== "modal") return;
    var f = focusables();
    if (!f.length) { e.preventDefault(); dlg.focus(); return; }
    var first = f[0], last = f[f.length - 1], a = D.activeElement;
    if (e.shiftKey && (a === first || a === dlg)) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && a === last) { e.preventDefault(); first.focus(); }
    else if (!dlg.contains(a)) { e.preventDefault(); first.focus(); }
  }

  function open() {
    if (opened) return;
    if (blocked()) { setTimeout(open, 2000); return; }
    opened = true;
    detach();
    ss(cfg.sessionKey, "1");
    mode = W.matchMedia("(max-width: 639px)").matches ? "sheet" : "modal";
    dlg = D.getElementById(mode === "modal" ? "ffw-modal" : "ffw-sheet");
    lastFocus = D.activeElement;
    root.setAttribute("data-mode", mode);
    root.hidden = false;
    loadImages(dlg);
    // force a frame so the transition runs
    W.requestAnimationFrame(function () {
      root.setAttribute("data-open", "");
      if (mode === "modal") dlg.focus();
    });
    D.addEventListener("keydown", onKey, true);
  }

  function close() {
    D.removeEventListener("keydown", onKey, true);
    root.removeAttribute("data-open");
    root.hidden = true;
    if (mode === "modal" && lastFocus && lastFocus.focus && D.contains(lastFocus)) {
      try { lastFocus.focus(); } catch (e) {}
    }
  }

  function dismiss() {
    if (ls) { try { ls.setItem(cfg.dismissKey, String(Date.now() + cfg.days * DAY)); } catch (e) {} }
    close();
  }

  // Triggers: 8-10 s or 40% scroll (first wins); desktop exit intent.
  var timer = setTimeout(open, 8000 + Math.round(Math.random() * 2000));
  function onScroll() {
    var de = D.documentElement, room = de.scrollHeight - W.innerHeight;
    if (room > 0 && (W.pageYOffset || de.scrollTop) / room >= 0.4) open();
  }
  function onOut(e) {
    if (e.clientY <= 0 && !e.relatedTarget && !W.matchMedia("(max-width: 639px)").matches) open();
  }
  function detach() {
    clearTimeout(timer);
    W.removeEventListener("scroll", onScroll);
    D.removeEventListener("mouseout", onOut);
  }
  W.addEventListener("scroll", onScroll, { passive: true });
  if (W.matchMedia("(hover: hover) and (pointer: fine)").matches) D.addEventListener("mouseout", onOut);

  // Buttons. Close and Not now only dismiss; the CTA is a plain link.
  root.addEventListener("click", function (e) {
    var t = e.target;
    if (!t.closest) return;
    if (t.closest("[data-ffw-close]")) { e.preventDefault(); dismiss(); return; }
    if (t.closest("[data-ffw-cta]")) { if (ls) { try { ls.setItem(cfg.clickedKey, String(Date.now())); } catch (er) {} } return; }
    if (t.closest("[data-ffw-scrim]")) dismiss();
  });

  // Phones: swipe down on the sheet to dismiss.
  var sheet = D.getElementById("ffw-sheet"), y0 = null, dy = 0;
  sheet.addEventListener("touchstart", function (e) { y0 = e.touches[0].clientY; dy = 0; }, { passive: true });
  sheet.addEventListener("touchmove", function (e) {
    if (y0 === null) return;
    dy = Math.max(0, e.touches[0].clientY - y0);
    sheet.style.transition = "none";
    sheet.style.transform = "translateY(" + dy + "px)";
  }, { passive: true });
  sheet.addEventListener("touchend", function () {
    if (y0 === null) return;
    sheet.style.transition = "";
    sheet.style.transform = "";
    var go = dy > 60; y0 = null; dy = 0;
    if (go) dismiss();
  });
})();
