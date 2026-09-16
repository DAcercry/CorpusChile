(function () {
  const DOCS = [
    {
      id: 1,
      type: "decreto",
      number: "D.S. 240",
      title: "Normas de Seguridad Vial",
      date: "2023-04-12",
      source: "Diario Oficial",
      author: "Ministerio de Transportes",
      excerpt: "Establece normas técnicas para señalización y demarcación de vías urbanas y rurales.",
      content: "Artículo 1°.- Las municipalidades deberán implementar señalética reflectante en un plazo de 18 meses.\n\nArtículo 2°.- Se prohíbe el uso de publicidad en semáforos y señales de tránsito oficiales.\n\nArtículo 3°.- La fiscalización corresponderá a Carabineros e inspectores municipales.",
      pages: 12,
      ocr: "procesado",
      humanReview: false,
      urlOriginal: "https://www.diariooficial.interior.gob.cl/"
    },
    {
      id: 2,
      type: "ley",
      number: "Ley 21.430",
      title: "Garantías y Protección Integral de la Niñez",
      date: "2022-03-15",
      source: "Biblioteca del Congreso Nacional",
      author: "Congreso Nacional",
      excerpt: "Crea el Sistema de Garantías y Protección Integral de los Derechos de la Niñez y Adolescencia.",
      content: "La presente ley tiene por objeto la creación del Sistema de Garantías y Protección Integral de los Derechos de la Niñez y Adolescencia.\n\nPrincipios: interés superior del niño, autonomía progresiva, no discriminación.",
      pages: 48,
      ocr: "procesado",
      humanReview: false,
      urlOriginal: "https://www.bcn.cl/leychile"
    },
    {
      id: 3,
      type: "resolucion",
      number: "Res. Ex. 1.245",
      title: "Actualización de Tasas de Interés",
      date: "2024-01-08",
      source: "CMF",
      author: "Comisión para el Mercado Financiero",
      excerpt: "Fija las tasas máximas convencionales para operaciones de crédito de dinero.",
      content: "Se actualizan las tasas de interés máximas convencionales para el período enero–marzo 2024.",
      pages: 6,
      ocr: "procesado",
      humanReview: true,
      urlOriginal: "#"
    },
    {
      id: 4,
      type: "circular",
      number: "Cir. 3.582",
      title: "Prevención de Lavado de Activos",
      date: "2023-11-22",
      source: "UAF",
      author: "Unidad de Análisis Financiero",
      excerpt: "Actualiza obligaciones de debida diligencia y reporte de operaciones sospechosas.",
      content: "Las entidades obligadas deberán implementar monitoreo continuo y reportar dentro de 24 horas operaciones sospechosas.",
      pages: 22,
      ocr: "procesado",
      humanReview: false,
      urlOriginal: "#"
    },
    {
      id: 5,
      type: "decreto",
      number: "Decreto 15",
      title: "Reglamento del Sistema Nacional de Áreas Protegidas",
      date: "2021-09-30",
      source: "Ministerio del Medio Ambiente",
      author: "MMA",
      excerpt: "Regula la creación, administración y categorías de áreas protegidas del Estado.",
      content: "Categorías: Parque Nacional, Reserva Nacional, Monumento Natural y Santuario de la Naturaleza.",
      pages: 35,
      ocr: "procesado",
      humanReview: false,
      urlOriginal: "#"
    },
    {
      id: 6,
      type: "resolucion",
      number: "Res. 216",
      title: "Lista clasificatoria de vehículos motorizados",
      date: "1993-01-29",
      source: "Ministerio de Hacienda",
      author: "Ministerio de Hacienda",
      excerpt: "Fija lista clasificatoria de vehículos motorizados para los fines que señala.",
      content: "Se establece la clasificación de vehículos motorizados para efectos tributarios y de registro.",
      pages: 8,
      ocr: "procesado",
      humanReview: false,
      urlOriginal: "#"
    }
  ];

  function fichasFor(pages) {
    if (pages <= 30) return 1;
    if (pages <= 50) return 2;
    return Math.ceil(pages / 30);
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // Clock Santiago
  function updateClock() {
    const el = document.getElementById("clockBadge");
    if (!el) return;
    const now = new Date();
    const opts = {
      timeZone: "America/Santiago",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    };
    el.textContent = now.toLocaleTimeString("es-CL", opts) + " · Santiago";
  }
  setInterval(updateClock, 1000);
  updateClock();

  const grid = document.getElementById("docGrid");
  const countEl = document.getElementById("resultsCount");
  const fulltextList = document.getElementById("fulltextList");
  const shell = document.getElementById("shell");
  const panelInner = document.getElementById("panelInner");

  function renderCards(docs) {
    if (!grid) return;
    countEl.innerHTML = docs.length
      ? `<strong>${docs.length}</strong> documento${docs.length !== 1 ? "s" : ""}`
      : "";

    if (!docs.length) {
      grid.innerHTML = `<div class="no-results">No se encontraron documentos.</div>`;
      return;
    }

    grid.innerHTML = docs.map((d, i) => `
      <article class="doc-card${i === 0 ? " tall" : ""}" data-id="${d.id}" tabindex="0" role="button">
        <div class="doc-header">
          <span class="doc-number">${escapeHtml(d.number)}</span>
          <span class="doc-title">${escapeHtml(d.title)}</span>
        </div>
        <div class="doc-body">
          <p>${escapeHtml(d.excerpt)}</p>
          <div>
            <button type="button" class="doc-link" data-id="${d.id}">Ver detalle →</button>
            <div class="doc-meta">${escapeHtml(d.date)} · ${escapeHtml(d.source)} · ${d.pages} pág.</div>
          </div>
        </div>
      </article>
    `).join("");

    grid.querySelectorAll(".doc-card").forEach(card => {
      card.addEventListener("click", () => openPanel(card.dataset.id));
      card.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openPanel(card.dataset.id);
        }
      });
    });
  }

  function openPanel(id) {
    const doc = DOCS.find(d => d.id == id);
    if (!doc || !panelInner || !shell) return;

    grid.querySelectorAll(".doc-card").forEach(c => {
      c.classList.toggle("active", c.dataset.id == id);
    });

    const fichas = fichasFor(doc.pages);
    panelInner.innerHTML = `
      <div class="panel-head">
        <span class="panel-eyebrow">${escapeHtml(doc.number)}</span>
        <button type="button" class="panel-close" id="panelClose" aria-label="Cerrar">×</button>
      </div>
      <h2 class="panel-title">${escapeHtml(doc.title)}</h2>
      <div class="panel-meta">
        <strong>Fecha:</strong> ${escapeHtml(doc.date)}<br>
        <strong>Fuente:</strong> ${escapeHtml(doc.source)}<br>
        <strong>Organismo:</strong> ${escapeHtml(doc.author)}<br>
        <strong>Páginas:</strong> ${doc.pages} · <strong>Fichas:</strong> ${fichas}
      </div>
      <p class="panel-desc">${escapeHtml(doc.content)}</p>
      <div class="panel-trace">
        <strong>Documento original:</strong> ${doc.urlOriginal && doc.urlOriginal !== "#"
          ? `<a href="${escapeHtml(doc.urlOriginal)}" target="_blank" rel="noopener">fuente oficial</a>`
          : "copia digital / no enlazada"}<br>
        <strong>Texto consultable:</strong> generado mediante OCR por CorpusChile<br>
        <strong>Metadatos:</strong> elaborados por CorpusChile<br>
        <strong>Revisión humana:</strong> ${doc.humanReview ? "Sí" : "No"}<br>
        <span style="color:var(--grey);font-size:11px;">OCR sin revisión humana completa — verificar en el original.</span>
      </div>
    `;

    shell.classList.add("panel-open");
    const closeBtn = document.getElementById("panelClose");
    if (closeBtn) closeBtn.addEventListener("click", closePanel);
  }

  function closePanel() {
    if (shell) shell.classList.remove("panel-open");
    if (grid) grid.querySelectorAll(".doc-card").forEach(c => c.classList.remove("active"));
    if (panelInner) {
      panelInner.innerHTML = `<div class="panel-placeholder">Selecciona un documento para ver el detalle, la trazabilidad y el acceso al original.</div>`;
    }
  }

  // Live filter on home search (optional demo)
  const qHome = document.getElementById("qHome");
  if (qHome) {
    let t = null;
    qHome.addEventListener("input", () => {
      clearTimeout(t);
      t = setTimeout(() => {
        const q = qHome.value.trim().toLowerCase();
        if (!q) {
          renderCards(DOCS);
          fulltextList.innerHTML = "";
          return;
        }
        const filtered = DOCS.filter(d =>
          d.title.toLowerCase().includes(q) ||
          d.excerpt.toLowerCase().includes(q) ||
          d.content.toLowerCase().includes(q) ||
          d.number.toLowerCase().includes(q) ||
          d.author.toLowerCase().includes(q)
        );
        renderCards(filtered);
        if (filtered.length) {
          fulltextList.innerHTML = `
            <div style="font-size:11px;color:var(--grey);margin-bottom:6px;text-transform:uppercase;letter-spacing:0.04em;">Coincidencias</div>
            ${filtered.slice(0, 4).map(d => `
              <div class="fulltext-item">
                <span class="fulltext-title" data-id="${d.id}">${escapeHtml(d.number)} — ${escapeHtml(d.title)}</span>
                <span class="fulltext-count">${escapeHtml(d.author)} · ${escapeHtml(d.date)}</span>
                <ul class="fulltext-snippets"><li>…${escapeHtml(d.excerpt.slice(0, 100))}…</li></ul>
              </div>
            `).join("")}
            <a class="fulltext-more-link" href="buscar/?q=${encodeURIComponent(q)}">Ver todos en el buscador completo →</a>
          `;
          fulltextList.querySelectorAll(".fulltext-title").forEach(el => {
            el.addEventListener("click", () => openPanel(el.getAttribute("data-id")));
          });
        } else {
          fulltextList.innerHTML = "";
        }
      }, 180);
    });
  }

  renderCards(DOCS);
})();
