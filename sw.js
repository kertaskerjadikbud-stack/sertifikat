self.addEventListener("fetch",e=>{
  e.respondWith(caches.open("v1").then(c=>c.match(e.request)||fetch(e.request)));
});
