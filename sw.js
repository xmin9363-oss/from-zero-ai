const VERSION = 'v1.0.1';
const CACHE = `zeroone-${VERSION}`;

// 安装时只装壳（首页+课程索引），激活后在后台补齐全部课程数据——离线学习全量可用
const PRECACHE = ['./', './manifest.json', './data/manifest.js'];
const DATA_FILES = [
  './data/p00.js', './data/p01.js', './data/p02.js', './data/p03.js', './data/p04.js',
  './data/p05.js', './data/p06.js', './data/p07.js', './data/p08.js', './data/p09.js',
  './data/p10.js', './data/p11.js', './data/p12.js', './data/p13.js', './data/p14.js',
  './data/p15.js', './data/p16.js', './data/p17.js', './data/p18.js', './data/p19.js',
  './data/cert-claude.js', './data/cert-mcpa.js', './assets/hero-bg.jpg'
];

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    await Promise.allSettled(PRECACHE.map(async (u) => {
      const r = await fetch(u, { cache: 'reload' });
      if (r.ok) await c.put(u, r);
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    await self.clients.claim();
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    const c = await caches.open(CACHE);
    await Promise.allSettled(DATA_FILES.map(async (u) => {
      if (await c.match(u)) return;
      const r = await fetch(u, { cache: 'reload' });
      if (r.ok) await c.put(u, r);
    }));
  })());
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  if (url.pathname.endsWith('sw.js') || url.pathname.endsWith('manifest.webmanifest')) return;

  if (req.mode === 'navigate') {
    // 文档网络优先：内容更新即时生效；断网回退到缓存的壳
    e.respondWith((async () => {
      try {
        const r = await fetch(req, { cache: 'reload' });
        if (r.ok) {
          const c = await caches.open(CACHE);
          c.put('./', r.clone());
          return r;
        }
      } catch {}
      const c = await caches.open(CACHE);
      return (await c.match('./', { ignoreSearch: true })) || (await c.match(req)) || Response.error();
    })());
    return;
  }

  // 其余同源资源：缓存优先 + 后台更新（stale-while-revalidate）
  e.respondWith((async () => {
    const c = await caches.open(CACHE);
    const hit = await c.match(req, { ignoreSearch: true });
    const fresh = fetch(req).then(r => { if (r.ok) c.put(req, r.clone()); return r; }).catch(() => null);
    return hit || (await fresh) || Response.error();
  })());
});
