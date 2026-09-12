// Reloj de Santiago
function updateClock() {
  const now = new Date();
  const options = {
    timeZone: 'America/Santiago',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  };
  document.getElementById('clock').textContent =
    now.toLocaleTimeString('es-CL', options) + ' (Santiago)';
}
setInterval(updateClock, 1000);
updateClock();

// Tema oscuro
const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark');
  themeToggle.textContent = '☀️';
}
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Búsqueda y render
const resultsEl = document.getElementById('results');
const countEl = document.getElementById('results-count');
const searchInput = document.getElementById('search-input');
const filterType = document.getElementById('filter-type');

function render(docs) {
  countEl.textContent = `${docs.length} documento${docs.length !== 1 ? 's' : ''} encontrado${docs.length !== 1 ? 's' : ''}`;
  resultsEl.innerHTML = docs.map(doc => `
    <article class="card" data-id="${doc.id}">
      <h3>${doc.title}</h3>
      <div class="meta">${doc.type.toUpperCase()} · ${doc.date} · ${doc.source}</div>
      <p class="excerpt">${doc.excerpt}</p>
    </article>
  `).join('');

  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => openDetail(card.dataset.id));
  });
}

function search() {
  const q = searchInput.value.trim().toLowerCase();
  const type = filterType.value;

  let filtered = DOCUMENTS;

  if (type) {
    filtered = filtered.filter(d => d.type === type);
  }

  if (q) {
    filtered = filtered.filter(d =>
      d.title.toLowerCase().includes(q) ||
      d.excerpt.toLowerCase().includes(q) ||
      d.content.toLowerCase().includes(q) ||
      d.author.toLowerCase().includes(q) ||
      d.source.toLowerCase().includes(q)
    );
  }

  render(filtered);
}

document.getElementById('search-btn').addEventListener('click', search);
searchInput.addEventListener('keyup', e => { if (e.key === 'Enter') search(); });
filterType.addEventListener('change', search);

// Panel de detalle
const panel = document.getElementById('detail-panel');
function openDetail(id) {
  const doc = DOCUMENTS.find(d => d.id == id);
  if (!doc) return;

  document.getElementById('detail-title').textContent = doc.title;
  document.getElementById('detail-meta').innerHTML = `
    <strong>Tipo:</strong> ${doc.type} &nbsp;|&nbsp;
    <strong>Fecha:</strong> ${doc.date}<br>
    <strong>Fuente:</strong> ${doc.source} &nbsp;|&nbsp;
    <strong>Autor:</strong> ${doc.author}
  `;
  document.getElementById('detail-body').textContent = doc.content;
  panel.classList.remove('hidden');
}

document.getElementById('close-detail').addEventListener('click', () => {
  panel.classList.add('hidden');
});
panel.addEventListener('click', e => {
  if (e.target === panel) panel.classList.add('hidden');
});

// Carga inicial
render(DOCUMENTS);
