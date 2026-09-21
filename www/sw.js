/* Service worker minimal — cukup untuk installable PWA, tanpa cache data. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
/* Jangan cache apa pun — biarkan semua request lewat. */
self.addEventListener('fetch', () => {});