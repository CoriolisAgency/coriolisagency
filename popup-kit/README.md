# popup-kit v2 (FFL claim pop-up)

Framework-free pop-up copied byte-identical into coriolisagency, gunsearchengine
and ffl-messenger. fflaccelerator stays pinned to v1.

Decision: Paul 2026-11-03 6:56 AM ET via Chief. Board: FFL-CLAIM-POPUP.

## Files

- `VERSION` is `2`.
- `client/coriolis-popup.js`, served as `/popup/coriolis-popup.v2.js`.
- `client/coriolis-popup.css`, served as `/popup/coriolis-popup.v2.css`.
- `server/subscribe-core.ts`, imported by each site's `/api/popup` endpoint.
- `SHA256SUMS` over VERSION, README.md, the two client files and the core.

## Flow

1. Email is required. FFL number is required unless "I don't have an FFL" is
   checked, which hides the field and switches to a plain "Get updates" form.
2. A valid FFL triggers `GET /api/popup?ffl=` (rate-limited). GSE reads its
   `ffl_licenses` index; other sites proxy server-side to GSE. Only
   `found, name, city, state, listed` ever leave the lookup. A miss is silent.
3. `POST /api/popup` validates, then:
   - Mailchimp, create-only: GET the member first. Any existing member (any
     status) is left untouched. New members are POSTed as `pending` with tags
     and merge fields. Missing merge fields are created, never edited.
   - Ops: server-to-server POST to `CORIOLIS_OS_URL/api/forms/claim` with
     Bearer `FORM_INTAKE_SECRET`. Off when either name is missing.
4. Not an account claim. No codes. No sends beyond Mailchimp's own double
   opt-in confirm for new members.

## Mailchimp names

- Tags: `src:popup-claim`, `site:<agency|gse|fflm>`, `has_ffl` or `no_ffl`.
- Merge fields (text): `SITE`, `FFL_PATH` (`claimed_ffl` or `no_ffl`),
  `FFL_NUM` (canonical X-XX-XXX-XX-XX-XXXXX, only when given).

## Config (window.CORIOLIS_POPUP)

`site, endpoint, privacyUrl, denyPaths, theme {band, bandFg, accent, accentFg,
ink, font}, logos [{src, alt, h}] (lead first), peek {src, caption},
copy {headline, badge, body, button, noFfl*, unlocks, listed, next, success}`.

Triggers: desktop exit intent after 5s, mobile 20s or 50% scroll, `?popup=1`
forces. Any click on a `[data-claim-ffl]` element opens it (caps do not apply;
if the endpoint is off the link navigates normally). Seen cap 14 days, done
cap 365 days. Env is read by name only.
