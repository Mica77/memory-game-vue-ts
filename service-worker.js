const CACHE_NAME = 'memogame-version-1'

const assets = ['./manifest.json', './img/cardFaceDown.jfif', './cards.json', './img/cards/*']

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    self.skipWaiting().then(() => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(assets).catch((err) => {
          console.log('Failed to cache assets:', err)
        })
      })
    }),
  )
  console.log('Service worker установлен')
})

self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    clients.claim().then(() => {
      return caches.keys().then((keys) => {
        return Promise.all(
          keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)),
        )
      })
    }),
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Если ресурс найден в кэше, возвращаем его
      if (response) {
        return response
      }

      // Если ресурс не найден в кэше, пытаемся получить его из сети
      return fetch(event.request).catch(() => {
        // Если запрос не удался (например, оффлайн), возвращаем резервную страницу
        return caches.match('./fallback.html')
      })
    }),
  )
})
