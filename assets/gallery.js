/*
  DreamOnGames — rastgele oyun galerisi
  games-data.js içindeki listeden her sayfa açılışında rastgele 6 oyun seçer.
  Bu dosyayı düzenlemene gerek yok; oyunları games-data.js'ten yönet.
*/
(function () {
  var COUNT = 6;
  var SHOP = "https://www.etsy.com/shop/DreamOnGames";

  var grid = document.getElementById("games-grid");
  var games = window.DREAMON_GAMES;
  if (!grid || !Array.isArray(games) || games.length === 0) return;

  // Aynı görsel listede birden fazla kez yazılmışsa sadece ilkini tut,
  // böylece aynı oyun sayfada asla iki kez görünmez.
  var seen = {};
  var pool = games.filter(function (g) {
    if (!g || !g.image || !g.title) return false;
    var key = String(g.image).trim().toLowerCase();
    if (seen[key]) return false;
    seen[key] = true;
    return true;
  });
  // Listeyi karıştır (Fisher–Yates) ve ilk 6'yı al.
  for (var i = pool.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = pool[i]; pool[i] = pool[j]; pool[j] = tmp;
  }
  var picked = pool.slice(0, COUNT);

  grid.textContent = "";
  picked.forEach(function (g) {
    var base = "assets/games/" + g.image;

    var a = document.createElement("a");
    a.className = "game";
    a.href = g.link || SHOP;
    a.target = "_blank";
    a.rel = "noopener";

    var paper = document.createElement("span");
    paper.className = "game-paper";
    var img = document.createElement("img");
    img.src = base + "-480.webp";
    img.srcset = base + "-480.webp 480w, " + base + "-900.webp 900w";
    img.sizes = "(max-width: 640px) 45vw, 320px";
    img.width = 480;
    img.height = 621;
    img.loading = "lazy";
    img.alt = g.alt || ("Printable " + g.title + " game card");
    paper.appendChild(img);

    var title = document.createElement("span");
    title.className = "game-title";
    title.textContent = g.title;

    a.appendChild(paper);
    a.appendChild(title);

    grid.appendChild(a);
  });
})();
