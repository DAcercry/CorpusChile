(function () {
  const PASS = "pichos";
  const STORAGE_KEY = "cc-banner-panels";

  const DEFAULTS = [
    {
      tag: "Contenido editorial",
      tagType: "editorial",
      title: "Cómo leer una edición del Diario Oficial",
      meta: "12 mar 2026 · Administración pública",
      text: "Guía práctica para identificar tipos de actos, fechas de vigencia y la diferencia entre el texto publicado y el texto consolidado en la práctica administrativa cotidiana.",
      href: "actualidad/"
    },
    {
      tag: "Fuente externa",
      tagType: "external",
      title: "Actualización de normas en Ley Chile",
      meta: "10 mar 2026 · Legislación",
      text: "La Biblioteca del Congreso Nacional mantiene actualizado el repositorio de normas vigentes y derogadas. Acceso directo a la fuente oficial.",
      href: "https://www.bcn.cl/leychile"
    },
    {
      tag: "Contenido editorial",
      tagType: "editorial",
      title: "Trazabilidad: original, OCR y metadatos",
      meta: "5 mar 2026 · Transparencia",
      text: "Cada resultado en CorpusChile distingue el documento oficial, el texto extraído automáticamente y los metadatos añadidos por la plataforma.",
      href: "transparencia/"
    }
  ];

  function loadPanels() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return DEFAULTS.map((p) => ({ ...p }));
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) || parsed.length !== 3) return DEFAULTS.map((p) => ({ ...p }));
      return parsed;
    } catch {
      return DEFAULTS.map((p) => ({ ...p }));
    }
  }

  function savePanels(panels) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(panels));
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function isExternal(href) {
    return /^https?:\/\//i.test(href);
  }

  function render() {
    const grid = document.getElementById("contentBannerGrid");
    if (!grid) return;
    const panels = loadPanels();

    grid.innerHTML = panels
      .map((p) => {
        const ext = isExternal(p.href);
        const tagClass = p.tagType === "external" ? "tag-external" : "tag-editorial";
        return `
        <a class="banner-panel" href="${escapeHtml(p.href)}"${ext ? ' target="_blank" rel="noopener"' : ""}>
          <div class="banner-panel-inner">
            <span class="tag ${tagClass}">${escapeHtml(p.tag)}</span>
            <h3>${escapeHtml(p.title)}</h3>
            <div class="meta">${escapeHtml(p.meta)}</div>
            <div class="fade-text">${escapeHtml(p.text)}</div>
          </div>
        </a>`;
      })
      .join("");
  }

  // —— Admin UI ——
  const masterBtn = document.getElementById("bannerMasterBtn");
  const admin = document.getElementById("bannerAdmin");
  const authBox = document.getElementById("bannerAdminAuth");
  const formBox = document.getElementById("bannerAdminForm");
  const passInput = document.getElementById("bannerAdminPass");
  const unlockBtn = document.getElementById("bannerAdminUnlock");
  const errorEl = document.getElementById("bannerAdminError");
  const fieldsEl = document.getElementById("bannerAdminFields");
  const saveBtn = document.getElementById("bannerAdminSave");
  const closeBtn = document.getElementById("bannerAdminClose");

  let unlocked = false;

  function openAdmin() {
    if (!admin) return;
    admin.hidden = false;
    unlocked = false;
    if (authBox) authBox.hidden = false;
    if (formBox) formBox.hidden = true;
    if (errorEl) errorEl.hidden = true;
    if (passInput) {
      passInput.value = "";
      passInput.focus();
    }
  }

  function closeAdmin() {
    if (admin) admin.hidden = true;
    unlocked = false;
  }

  function buildForm() {
    const panels = loadPanels();
    if (!fieldsEl) return;
    fieldsEl.innerHTML = panels
      .map(
        (p, i) => `
      <label>Panel ${i + 1} — título</label>
      <input type="text" data-i="${i}" data-k="title" value="${escapeHtml(p.title)}">
      <label>Panel ${i + 1} — enlace (URL)</label>
      <input type="url" data-i="${i}" data-k="href" value="${escapeHtml(p.href)}" placeholder="https://… o ruta local">
    `
      )
      .join("");
  }

  function unlock() {
    const val = (passInput && passInput.value) || "";
    if (val === PASS) {
      unlocked = true;
      if (errorEl) errorEl.hidden = true;
      if (authBox) authBox.hidden = true;
      if (formBox) formBox.hidden = false;
      buildForm();
    } else {
      unlocked = false;
      if (errorEl) errorEl.hidden = false;
    }
  }

  function save() {
    if (!unlocked || !fieldsEl) return;
    const panels = loadPanels();
    fieldsEl.querySelectorAll("input").forEach((input) => {
      const i = Number(input.getAttribute("data-i"));
      const k = input.getAttribute("data-k");
      if (!Number.isNaN(i) && k && panels[i]) {
        panels[i][k] = input.value.trim() || panels[i][k];
      }
    });
    savePanels(panels);
    render();
    closeAdmin();
  }

  if (masterBtn) masterBtn.addEventListener("click", openAdmin);
  if (closeBtn) closeBtn.addEventListener("click", closeAdmin);
  if (unlockBtn) unlockBtn.addEventListener("click", unlock);
  if (passInput) {
    passInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") unlock();
    });
  }
  if (saveBtn) saveBtn.addEventListener("click", save);
  if (admin) {
    admin.addEventListener("click", (e) => {
      if (e.target === admin) closeAdmin();
    });
  }

  render();
})();
