// Rechenzeitreise: Offline-Betrieb. Die Seite kommt zuerst aus dem Netz (neue Versionen sind sofort da)
// und fällt ohne Netz auf die gespeicherte Fassung zurück. Welpenfotos und Schriften werden gemerkt.
const CACHE = "rechenzeitreise-2.3.1";
const CORE = ["./", "./index.html", "./manifest.webmanifest", "./icon-180.png", "./icon-192.png", "./icon-512.png", "./welpen/golden-retriever.jpg", "./welpen/pudel.jpg", "./welpen/yorkshire-terrier.jpg", "./welpen/dackel.jpg", "./welpen/labrador.jpg", "./welpen/border-collie.jpg", "./welpen/jack-russell.jpg", "./welpen/beagle.jpg", "./welpen/australian-shepherd.jpg", "./welpen/zwergspitz.jpg", "./welpen/franzoesische-bulldogge.jpg", "./welpen/cocker-spaniel.jpg", "./welpen/mops.jpg", "./welpen/rottweiler.jpg", "./welpen/zwergschnauzer.jpg", "./welpen/toller.jpg", "./welpen/dogge.jpg", "./welpen/deutsch-kurzhaar.jpg", "./welpen/basset.jpg", "./welpen/cavalier.jpg", "./welpen/berner-sennenhund.jpg", "./welpen/boston-terrier.jpg", "./welpen/chow-chow.jpg", "./welpen/westie.jpg", "./welpen/collie.jpg", "./welpen/malamute.jpg", "./welpen/shiba.jpg", "./welpen/eurasier.jpg", "./welpen/ridgeback.jpg", "./welpen/airedale.jpg", "./welpen/wolfsspitz.jpg", "./welpen/sheltie.jpg", "./welpen/whippet.jpg", "./welpen/samojede.jpg", "./welpen/kuvasz.jpg", "./welpen/windspiel.jpg", "./welpen/cairn.jpg", "./welpen/english-setter.jpg", "./welpen/coton.jpg", "./welpen/golden-retriever-2.jpg", "./welpen/pudel-2.jpg", "./welpen/yorkshire-terrier-2.jpg", "./welpen/beagle-2.jpg", "./welpen/labrador-2.jpg", "./welpen/samojede-2.jpg", "./welpen/basset-2.jpg", "./welpen/berner-sennenhund-2.jpg", "./welpen/toller-2.jpg", "./welpen/boston-terrier-2.jpg", "./welpen/chow-chow-2.jpg"];
const FONT_HOSTS = ["fonts.googleapis.com", "fonts.gstatic.com"];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", (e) => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== "GET") return;
  if (FONT_HOSTS.includes(url.hostname) || url.pathname.includes("/welpen/")) {
    e.respondWith(caches.open(CACHE).then(async (c) => { const hit = await c.match(req); if (hit) return hit; const r = await fetch(req); if (r.ok || r.type === "opaque") c.put(req, r.clone()); return r; }));
  } else if (url.origin === location.origin) {
    e.respondWith(fetch(req, { cache: "no-cache" }).then((r) => { if (r.ok) { const copy = r.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); } return r; })
      .catch(() => caches.match(req, { ignoreSearch: true }).then((r) => r || caches.match("./index.html"))));
  }
});
