// Matthew Cranford  https://matthewcranford.com/restaurant-reviews-app-walkthrough-part-4-service-workers/

const siteFiles = [
  '/',
  '/index.html',
  '/styles.css',
  '/restaurants.json',
  '/dbhelper.js',
  '/main.js',
  '/restaurant_info.js',
  '1.jpg',
  '2.jpg',
  '3.jpg',
  '4.jpg',
  '5.jpg',
  '6.jpg',
  '7.jpg',
  '8.jpg',
  '9.jpg',
  '10.jpg'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('cache 1.0')
    .then(function(cache) {
      cache.addAll(siteFiles);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
    .then(function(response) {
      if (response) {
        // console.log(`Found ${event.request} in cache`);
        return response;
      }
      else {
        // console.log(`Could not find ${event.request} in cache, fetching...`);
        return fetch(event.request)
        .then(function(response) {
          const responseCopy = response.clone();
          caches.open('cache 1.0')
          .then(function(cache) {
            cache.put(event.request, responseCopy);
          })
          return response;
        })
        .catch(function(error) {
          console.log(error);
        });
      }
    })
  );
});
