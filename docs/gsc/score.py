import csv
from collections import Counter, defaultdict
from urllib.parse import urlparse

pages_path = r"c:\Users\paula\Downloads\coriolisagency.com-Performance-on-Search-2026-08-16\Pages.csv"
queries_path = r"c:\Users\paula\Downloads\coriolisagency.com-Performance-on-Search-2026-08-16\Queries.csv"


def parse_num(s):
    return float(s.replace("%", "").replace(",", ""))


pages = []
with open(pages_path, encoding="utf-8") as f:
    for row in csv.DictReader(f):
        pages.append(
            {
                "url": row["Top pages"],
                "clicks": int(row["Clicks"]),
                "impr": int(row["Impressions"]),
                "ctr": parse_num(row["CTR"]),
                "pos": parse_num(row["Position"]),
            }
        )

queries = []
with open(queries_path, encoding="utf-8") as f:
    for row in csv.DictReader(f):
        queries.append(
            {
                "q": row["Top queries"],
                "clicks": int(row["Clicks"]),
                "impr": int(row["Impressions"]),
                "ctr": parse_num(row["CTR"]),
                "pos": parse_num(row["Position"]),
            }
        )

pc = sum(p["clicks"] for p in pages)
pi = sum(p["impr"] for p in pages)
qc = sum(q["clicks"] for q in queries)
qi = sum(q["impr"] for q in queries)
print("PAGES", len(pages), "clicks", pc, "impr", pi)
print("QUERIES", len(queries), "clicks", qc, "impr", qi)
print("pages with clicks", sum(1 for p in pages if p["clicks"] > 0))
print("pages >=10 clicks", sum(1 for p in pages if p["clicks"] >= 10))
print("pages >=5 clicks", sum(1 for p in pages if p["clicks"] >= 5))
print("queries with clicks", sum(1 for q in queries if q["clicks"] > 0))

hosts = defaultdict(lambda: [0, 0])
for p in pages:
    h = urlparse(p["url"]).netloc
    hosts[h][0] += p["clicks"]
    hosts[h][1] += p["impr"]
print("HOSTS")
for h, (c, i) in sorted(hosts.items(), key=lambda x: -x[1][0]):
    print(f"  {h}: {c} clicks, {i} impr")

paths = defaultdict(lambda: [0, 0])
for p in pages:
    u = urlparse(p["url"])
    if u.netloc != "www.coriolisagency.com":
        continue
    path = u.path.rstrip("/") or "/"
    paths[path][0] += p["clicks"]
    paths[path][1] += p["impr"]

www_clicks = sum(v[0] for v in paths.values())
print("WWW UNIQUE PATHS", len(paths), "clicks", www_clicks)
print(
    "www homepage share",
    paths["/"][0],
    f"{100 * paths['/'][0] / www_clicks:.1f}%",
)

clicked = [(p, c, i) for p, (c, i) in paths.items() if c > 0]
print("www paths with clicks", len(clicked))
print("TOP 50 www paths")
for p, c, i in sorted(clicked, key=lambda x: -x[1])[:50]:
    print(f"{c:4} c / {i:6} i  {p}")

print("\nALL CLICK QUERIES")
for q in queries:
    if q["clicks"] > 0:
        print(f"{q['clicks']:3} c / {q['impr']:5} i  pos {q['pos']:5.1f}  {q['q']}")

brand_kw = ("coriolis", "coreolis", "corriolis", "corialis")


def cluster(q):
    s = q.lower()
    if any(k in s for k in brand_kw) or s.startswith("site:"):
        return "brand"
    if any(
        k in s
        for k in (
            "email marketing",
            "email roi",
            "roi of email",
            "roi for email",
            "klaviyo",
            "sms marketing",
        )
    ):
        return "email"
    if any(
        k in s
        for k in (
            "seo",
            "marketing agency",
            "digital marketing",
            "advertising agency",
            "organic search agency",
        )
    ):
        return "agency/seo"
    if any(k in s for k in ("dropship", "drop ship")):
        return "dropshipping"
    if any(
        k in s
        for k in (
            "woocommerce",
            "ffl ecommerce",
            "ecommerce",
            "e-commerce",
            "website builder",
            "website plans",
            "gun store ecommerce",
            "gun-friendly website",
        )
    ):
        return "ffl ecommerce"
    if any(k in s for k in ("ammoready", "ammo ready", "gearfire")):
        return "competitor alt"
    if any(k in s for k in ("ffl cockpit", "fflcockpit")):
        return "ffl cockpit"
    if any(k in s for k in ("orchid", "fastbound", "ebound", "bound book", "4473", "a&d")):
        return "compliance software"
    if any(k in s for k in ("pos", "point of sale")):
        return "pos"
    if any(
        k in s
        for k in (
            "manufacturer",
            "manufacturers",
            "gun makers",
            "gun companies",
            "gun brands",
        )
    ):
        return "manufacturers listicle"
    if any(
        k in s
        for k in (
            "bullpup",
            "diablo",
            "xcr",
            "scar",
            "shadowsmith",
            "nightshade",
            "black aces",
        )
    ):
        return "product/editorial"
    return "other"


qc_c = Counter()
qc_i = Counter()
for q in queries:
    c = cluster(q["q"])
    qc_c[c] += q["clicks"]
    qc_i[c] += q["impr"]
print("\nQUERY CLUSTERS clicks / impressions")
for k in sorted(qc_c, key=lambda k: -qc_c[k]):
    print(f"  {k:40} {qc_c[k]:4} c  {qc_i[k]:6} i")
