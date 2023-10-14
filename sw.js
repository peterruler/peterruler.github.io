var CACHE_NAME = 'homepage-my-site-cache-v5';

var appShellFiles = [
'/index.html',
'/assets/css/about.css',
'/assets/css/animate.css',
'/assets/css/bootstrap.min.css',
'/assets/css/bootstrap.min.css.map',
'/assets/css/main.css',
'/assets/css/menu_sideslide.css',
'/assets/css/nivo-lightbox.css',
'/assets/css/responsive.css',
'/assets/css/slicknav.css',
'/assets/css/slide-style.css',
'/assets/js/classie.js',
'/assets/js/bootstrap.min.js',
'/assets/js/bootstrap.min.js.map',
'/assets/js/contact-form-script.min.js',
'/assets/js/form-validator.min.js',
'/assets/js/jquery-min.js',
'/assets/js/jquery.counterup.min.js',
'/assets/js/jquery.easing.min.js',
'/assets/js/jquery.mixitup.js',
'/assets/js/jquery.nav.js',
'/assets/js/jquery.slicknav.js',
'/assets/js/main.js',
'/assets/js/map.js',
'/assets/js/menu.js',
'/assets/js/modernizr.custom.js',
'/assets/js/nivo-lightbox.js',
'/assets/js/nivo-lightbox.min.js',
'/assets/js/popper.min.js',
'/assets/js/popper.min.js.map',
'/assets/js/scrolling-nav.js',
'/assets/js/video.js',
'/assets/js/waypoints.min.js',
'/assets/js/wow.js',
'/assets/fonts/font-awesome.min.css',
'/assets/fonts/simple-line-icons.css',
'/assets/fonts/line-icons/Simple-Line-Icons.eot',
'/assets/fonts/line-icons/Simple-Line-Icons.svg',
'/assets/fonts/line-icons/Simple-Line-Icons.ttf',
'/assets/fonts/line-icons/Simple-Line-Icons.woff',
'/assets/fonts/line-icons/Simple-Line-Icons.woff2',
'/assets/fonts/fontawesome-webfont.eot',
'/assets/fonts/fontawesome-webfont.svg',
'/assets/fonts/fontawesome-webfont.ttf',
'/assets/fonts/fontawesome-webfont.woff',
'/assets/fonts/fontawesome-webfont.woff2',
'/assets/fonts/FontAwesome.otf',
'/assets/fonts/glyphicons-halflings-regular.eot',
'/assets/fonts/glyphicons-halflings-regular.svg',
'/assets/fonts/glyphicons-halflings-regular.ttf',
'/assets/fonts/glyphicons-halflings-regular.woff',
'/assets/fonts/glyphicons-halflings-regular.woff2'
];
var imagesList = [
'/apple-touch-icon.png',
'/apple-touch-icon-152x152.png',
"/android-chrome-192x192.png",
'/android-chrome-512x512.png',
'/assets/img/about/about-1.jpg',
'/assets/img/background/bg-1.jpg',
'/assets/img/gallery/img-1.jpg',
'/assets/img/gallery/img-2.jpg',
'/assets/img/gallery/img-3.jpg',
'/assets/img/gallery/img-4.jpg',
'/assets/img/gallery/img-5.jpg',
'/assets/img/gallery/img-6.jpg',
'/assets/img/gallery/img-7.jpg',
'/assets/img/gallery/img-8.jpg',
'/assets/img/gallery/img-9.jpg',
'/assets/img/gallery/img-11.png',
'/assets/img/gallery/img-10.jpg',
'/assets/img/gallery/img-11.jpg',
'/assets/img/gallery/img-12.jpg',
'/assets/img/hero-area.png',
'/assets/img/logo.png',
'/assets/img/map.png',
'/favicon-32x32.png',
'/favicon-96x96.png',
'/favicon.ico',
'/mstile-150x150.png'
];

var urlsToCache = appShellFiles.concat(imagesList);
self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                return fetch(event.request).then(
                    function(response) {
                        // Check if we received a valid response
                        if(!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // IMPORTANT: Clone the response. A response is a stream
                        // and because we want the browser to consume the response
                        // as well as the cache consuming the response, we need
                        // to clone it so we have two streams.
                        var responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(function(cache) {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});