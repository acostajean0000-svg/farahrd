/* Farah — interacciones mínimas: menú móvil y navegación de secciones */
(function () {
  'use strict';

  // --- Menú móvil ---
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav-principal');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --- Resaltar sección activa en las páginas de menú ---
  var menuNavLinks = document.querySelectorAll('.menu-nav a');
  if (!menuNavLinks.length || !('IntersectionObserver' in window)) return;

  var byId = {};
  var targets = [];

  menuNavLinks.forEach(function (link) {
    var id = link.getAttribute('href').replace('#', '');
    var section = document.getElementById(id);
    if (section) {
      byId[id] = link;
      targets.push(section);
    }
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        menuNavLinks.forEach(function (l) { l.classList.remove('is-active'); });
        var link = byId[entry.target.id];
        if (link) link.classList.add('is-active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  targets.forEach(function (t) { observer.observe(t); });
})();
