(function () {
  const root = document.documentElement;
  const themeBtn = document.getElementById("themeBtn");

  const ICON_SUN = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';
  const ICON_MOON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 14.5A8.5 8.5 0 0 1 9.5 3 7 7 0 1 0 21 14.5z"/></svg>';
  const ICON_MENU = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
  const ICON_CLOSE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';

  function isDark() {
    return root.getAttribute("data-theme") === "dark";
  }

  function syncThemeIcon() {
    if (themeBtn) themeBtn.innerHTML = isDark() ? ICON_MOON : ICON_SUN;
  }

  const saved = localStorage.getItem("cc-theme");
  if (saved === "dark") root.setAttribute("data-theme", "dark");
  syncThemeIcon();

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      root.setAttribute("data-theme", isDark() ? "light" : "dark");
      localStorage.setItem("cc-theme", isDark() ? "dark" : "light");
      syncThemeIcon();
    });
  }

  const menuBtn = document.getElementById("menuBtn");
  const navMobile = document.getElementById("navMobile");
  if (menuBtn && navMobile) {
    menuBtn.addEventListener("click", () => {
      const open = navMobile.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.innerHTML = open ? ICON_CLOSE : ICON_MENU;
    });
  }

  const field = document.getElementById("searchFieldTop");
  const input = document.getElementById("qTop");
  const clear = document.getElementById("searchClearTop");
  if (field && input && clear) {
    input.addEventListener("input", () => {
      field.classList.toggle("has-text", !!input.value);
    });
    clear.addEventListener("click", () => {
      input.value = "";
      field.classList.remove("has-text");
      input.focus();
    });
  }
})();
