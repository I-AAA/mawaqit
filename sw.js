// Mawaqit Service Worker v2.0
const CACHE_NAME = 'mawaqit-v2';
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-192-maskable.png',
  './icon-512-maskable.png',
  './apple-touch-icon.png',
  './screenshot1.png',
  './screenshot2.png',
];

// ── INSTALL ──────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// ── ACTIVATE ─────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// ── FETCH ────────────────────────────────────
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Network-only for APIs
  if (url.hostname.includes('aladhan.com') || url.hostname.includes('nominatim.openstreetmap.org')) {
    event.respondWith(
      fetch(event.request).catch(() =>
        new Response(JSON.stringify({ error: 'offline' }), {
          headers: { 'Content-Type': 'application/json' }
        })
      )
    );
    return;
  }

  // Cache-first for static assets
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      });
    })
  );
});

// ── PUSH NOTIFICATIONS ────────────────────────
self.addEventListener('push', event => {
  if (!event.data) return;
  let data = {};
  try { data = event.data.json(); } catch(e) { data = { title: 'Prayer Time', body: event.data.text() }; }

  event.waitUntil(
    self.registration.showNotification(data.title || 'Prayer Time', {
      body: data.body || "It's time to pray",
      icon: './icon-192.png',
      badge: './icon-192.png',
      tag: data.tag || 'prayer',
      requireInteraction: true,
      vibrate: [200, 100, 200, 100, 400],
      data: { url: './' }
    })
  );
});

// ── NOTIFICATION CLICK ────────────────────────
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      for (const client of clientList) {
        if (client.url.includes('mawaqit') && 'focus' in client) return client.focus();
      }
      return clients.openWindow('./');
    })
  );
});

// ── BACKGROUND SYNC (alarm keepalive) ────────
self.addEventListener('sync', event => {
  if (event.tag === 'prayer-alarm-check') {
    event.waitUntil(checkAndFireAlarms());
  }
});

async function checkAndFireAlarms() {
  const clients_list = await clients.matchAll({ includeUncontrolled: true });
  if (clients_list.length > 0) return; // App is open, let it handle alarms itself

  // App is closed — check stored alarms and fire if needed
  // (Alarm data would be posted from the app via postMessage before closing)
}
