/*
Reference Taken From:
Google Developer's Article: Caching Files with Service Worker
https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker
*/
const cacheName = "restaurantReview";
/*  Cache All the website files during SW installation.*/
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(
        [
          '/css/styles.css',
          '/js/dbhelper.js',
          '/js/restaurant_info.js',
          '/js/main.js',
          '/index.html',
          '/restaurant.html'
        ]
      );
    })
  );
  console.log("Cached All Files")
});

/*
* Respond for all files from cache,
* If the response is not found in cache
  - Send a network request
  - Cache the response
  - Return the network response
*/

self.addEventListener('fetch',(event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || cacheIt(event);
    })
  );
});


const cacheIt = (event) => caches.open(cacheName).then((cache) => {
  return fetch(event.request).then((response) => {
    cache.put(event.request, response.clone());
    return response;
  })
})
