const closeHeaderMenu = (header) => {
  const toggle = header?.querySelector(".burger-toggle");

  header?.classList.remove("is-menu-open");
  toggle?.setAttribute("aria-expanded", "false");
  toggle?.setAttribute("aria-label", "Відкрити меню");
};

const closeAllHeaderMenus = (exceptHeader = null) => {
  document.querySelectorAll(".site-header.is-menu-open").forEach((header) => {
    if (header !== exceptHeader) {
      closeHeaderMenu(header);
    }
  });
};

document.addEventListener("click", (event) => {
  const toggle = event.target.closest(".burger-toggle");

  if (toggle) {
    const header = toggle.closest(".site-header");
    const isOpen = !header.classList.contains("is-menu-open");

    closeAllHeaderMenus(header);
    header.classList.toggle("is-menu-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Закрити меню" : "Відкрити меню");
    return;
  }

  const navLink = event.target.closest(".main-nav a");

  if (navLink) {
    closeHeaderMenu(navLink.closest(".site-header"));
    return;
  }

  if (!event.target.closest(".site-header")) {
    closeAllHeaderMenus();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeAllHeaderMenus();
  }
});
