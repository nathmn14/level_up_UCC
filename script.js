// Header couleur au scroll (et à l'initialisation)
(function () {
  const header = document.getElementById("header");
  if (!header) return;
  function onScroll() {
    if (window.scrollY > 50) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll);
  onScroll();
})();

// Scroll fluide pour les liens d'ancrage (sauf ceux du menu mobile)
document
  .querySelectorAll('a[href^="#"]:not(.mobile-menu a)')
  .forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      // Ne pas gérer les liens vides ou vers #
      if (targetId === "#" || targetId === "") return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();

        // Calculer la position de défilement en tenant compte du header fixe
        const header = document.getElementById("header");
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight -
          20;

        // Défilement fluide
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Mettre à jour l'URL sans ajouter d'entrée dans l'historique
        history.replaceState(null, null, targetId);
      }
    });
  });

// Animations au scroll
const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
);
sections.forEach((section) => observer.observe(section));

// FAQ toggle
document.querySelectorAll(".faq-item").forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.toggle("open");
  });
});

// Menu mobile (burger)
const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobile-menu");
const closeBtn = document.getElementById("closeMenu");
const backdrop = document.getElementById("menuBackdrop");
const links = document.querySelectorAll("[data-mobile-link]");

function openMenu() {
  if (!mobileMenu) return;
  mobileMenu.classList.add("open");
  mobileMenu.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  if (burger) burger.setAttribute("aria-expanded", "true");
  // Accessibilité : focus sur le premier lien du menu mobile
  const firstLink = mobileMenu.querySelector("a[data-mobile-link]");
  if (firstLink) firstLink.focus();
}
function closeMenu() {
  if (!mobileMenu) return;
  mobileMenu.classList.remove("open");
  mobileMenu.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (burger) burger.setAttribute("aria-expanded", "false");
}
// Menu event listeners
if (burger) burger.addEventListener("click", openMenu);
if (closeBtn) closeBtn.addEventListener("click", closeMenu);
if (backdrop) backdrop.addEventListener("click", closeMenu);

// Gestion des clics sur les liens du menu mobile
document.querySelectorAll('.mobile-menu a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    // Empêcher le comportement par défaut
    e.preventDefault();

    // Fermer le menu
    closeMenu();

    // Attendre que le menu soit fermé avant de naviguer
    const targetId = this.getAttribute("href");
    if (targetId && targetId !== "#") {
      setTimeout(() => {
        // Scroll manuel en tenant compte du header fixe
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const header = document.getElementById("header");
          const headerHeight = header ? header.offsetHeight : 0;
          const targetPosition =
            targetElement.getBoundingClientRect().top +
            window.pageYOffset -
            headerHeight -
            20;
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
          // Mettre à jour l'URL
          history.pushState(null, "", targetId);
        }
      }, 300); // Délai pour permettre l'animation de fermeture du menu
    }
  });
});
