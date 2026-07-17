document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const navbar = document.querySelector(".navbar");
  const menu = document.querySelector(".navbar__menu");
  const menuToggle = document.querySelector(".navbar__toggle");
  const mobileBreakpoint = window.matchMedia("(max-width: 720px)");

  const closeMobileMenu = () => {
    if (!menu || !menuToggle) return;

    menu.classList.remove("is-open");
    menuToggle.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Buka menu navigasi");
  };

  if (menu && menuToggle) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");

      menuToggle.classList.toggle("is-open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"
      );
    });

    document.addEventListener("click", (event) => {
      if (navbar && !navbar.contains(event.target)) closeMobileMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMobileMenu();
    });

    mobileBreakpoint.addEventListener("change", closeMobileMenu);
  }

  document
    .querySelectorAll('.navbar__brand[href^="#"], .navbar__menu a[href^="#"]')
    .forEach((link) => {
      const targetId = link.getAttribute("href");

      link.addEventListener("click", (event) => {
        const target = targetId && targetId !== "#"
          ? document.querySelector(targetId)
          : null;

        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
          block: "start"
        });
        closeMobileMenu();
      });
    });

  document.querySelectorAll(".faq-item").forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;

      document.querySelectorAll(".faq-item[open]").forEach((openItem) => {
        if (openItem !== item) openItem.open = false;
      });
    });
  });

  const updateHeader = () => {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 16);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const whatsappUrl = new URL("https://wa.me/6281234567890");
  whatsappUrl.searchParams.set(
    "text",
    "Halo, saya tertarik dengan AI Business OS."
  );

  document
    .querySelectorAll(
      '.button[href="#cta"], .cta .button, .site-footer__link--whatsapp'
    )
    .forEach((link) => {
      link.href = whatsappUrl.toString();
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.setAttribute("aria-label", `${link.textContent.trim()} via WhatsApp`);
    });
});
