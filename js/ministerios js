/* CorpusChile — Ministerios */
(function () {
  const LOGO_SVG = `
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="32" cy="32" r="32" fill="currentColor"/>
      <circle cx="32" cy="32" r="18" fill="none" stroke="#fff" stroke-width="7" stroke-dasharray="28 85" stroke-dashoffset="8" stroke-linecap="butt"/>
      <circle cx="32" cy="32" r="18" fill="none" stroke="#fff" stroke-width="7" stroke-dasharray="28 85" stroke-dashoffset="72" stroke-linecap="butt"/>
      <path d="M32 22.5l2.1 6.5h6.8l-5.5 4 2.1 6.5-5.5-4-5.5 4 2.1-6.5-5.5-4h6.8z" fill="#fff"/>
    </svg>`;

  const MINISTERIOS = [
    {
      id: "interior",
      nombre: "Ministerio del Interior",
      abarca: "Conducción política del gobierno interior, descentralización, desarrollo regional y coordinación del gabinete. (Sus funciones de seguridad pública fueron traspasadas a una nueva cartera especializada).",
      creacion: "1817 (como Ministerio de Gobierno)",
      subsecretarias: [
        { nombre: "Subsecretaría del Interior", url: "https://subinterior.gob.cl/" },
        { nombre: "Subsecretaría de Desarrollo Regional y Administrativo (SUBDERE)", url: "https://www.subdere.gov.cl/" }
      ],
      utilidad: "Fondos de desarrollo vecinal, coordinación de ayudas estatales en catástrofes y trámites de pensiones de gracia o extranjería.",
      fuente: "https://www.interior.gob.cl/"
    },
    {
      id: "seguridad",
      nombre: "Ministerio de Seguridad Pública",
      abarca: "Dirección de la seguridad ciudadana, control del orden público, prevención del delito y combate al crimen organizado, narcotráfico y terrorismo. De él dependen Carabineros y la PDI.",
      creacion: "2025 (Ley N° 21.730, separándose de Interior)",
      subsecretarias: [
        { nombre: "Subsecretaría de Seguridad Pública", url: null },
        { nombre: "Subsecretaría de Prevención del Delito", url: "https://www.seguridadpublica.gob.cl/" }
      ],
      utilidad: "Programas comunitarios contra la delincuencia, sistema de emergencia unificado, denuncias seguras y protección de víctimas.",
      fuente: "https://www.gob.cl/ministerios/ministerio-de-seguridad-publica/"
    },
    {
      id: "rr-ee",
      nombre: "Ministerio de Relaciones Exteriores",
      abarca: "Planificación, dirección y ejecución de la política exterior del país y de las relaciones internacionales.",
      creacion: "1871",
      subsecretarias: [
        { nombre: "Subsecretaría de Relaciones Exteriores", url: null },
        { nombre: "Subsecretaría de Relaciones Económicas Internacionales (SUBREI)", url: "https://www.subrei.gob.cl/" }
      ],
      utilidad: "Pasaportes y visas en el extranjero, legalización y apostilla de documentos, defensa de chilenos en el exterior y voto en el extranjero.",
      fuente: "https://www.minrel.gob.cl/"
    },
    {
      id: "defensa",
      nombre: "Ministerio de Defensa Nacional",
      abarca: "Gestión de las Fuerzas Armadas (Ejército, Armada y Fuerza Aérea) y resguardo de la soberanía nacional.",
      creacion: "1811 (como Secretaría de Guerra)",
      subsecretarias: [
        { nombre: "Subsecretaría de Defensa", url: null },
        { nombre: "Subsecretaría para las Fuerzas Armadas", url: null }
      ],
      utilidad: "Regula el Servicio Militar Obligatorio, la DGMN y provee ayuda humanitaria a través de las FF.AA. en zonas aisladas o emergencias.",
      fuente: "https://www.defensa.cl/"
    },
    {
      id: "hacienda",
      nombre: "Ministerio de Hacienda",
      abarca: "Dirección de la política financiera, fiscal y macroeconómica del Estado.",
      creacion: "1817",
      subsecretarias: [
        { nombre: "Subsecretaría de Hacienda", url: null }
      ],
      utilidad: "Supervisa la recaudación de impuestos (SII) y facilita la postulación y pago de subsidios o beneficios económicos masivos.",
      fuente: "https://www.hacienda.cl/"
    },
    {
      id: "segpres",
      nombre: "Ministerio Secretaría General de la Presidencia (SEGPRES)",
      abarca: "Coordinación de la agenda legislativa del Ejecutivo con el Congreso Nacional y asesoría técnica al Presidente.",
      creacion: "1990",
      subsecretarias: [
        { nombre: "Subsecretaría General de la Presidencia", url: null }
      ],
      utilidad: "Plataformas digitales de participación ciudadana y portal normativo del Estado para consultar leyes e iniciativas vigentes.",
      fuente: "https://www.segpres.gob.cl/"
    },
    {
      id: "segegob",
      nombre: "Ministerio Secretaría General de Gobierno (SEGEGOB)",
      abarca: "Comunicación oficial del Gobierno y fomento de los vínculos con las organizaciones de la sociedad civil.",
      creacion: "1976",
      subsecretarias: [
        { nombre: "Subsecretaría General de Gobierno", url: null }
      ],
      utilidad: "Fondos concursables para organizaciones sociales y comunitarias (juntas de vecinos, clubes de ancianos) y difusión de planes estatales.",
      fuente: "https://www.msgg.gob.cl/"
    },
    {
      id: "economia",
      nombre: "Ministerio de Economía, Fomento y Turismo",
      abarca: "Impulso de la competitividad nacional, apoyo a las MiPyMEs, y regulación del mercado y el turismo.",
      creacion: "1941",
      subsecretarias: [
        { nombre: "Subsecretaría de Economía y Empresas de Menor Tamaño", url: null },
        { nombre: "Subsecretaría de Turismo", url: null },
        { nombre: "Subsecretaría de Pesca y Acuicultura (SUBPESCA)", url: "https://www.subpesca.cl/" }
      ],
      utilidad: "Creación rápida de negocios (Tu Empresa en un Día), protección del consumidor (SERNAC), rutas turísticas e innovación.",
      fuente: "https://www.economia.gob.cl/"
    },
    {
      id: "desarrollo-social",
      nombre: "Ministerio de Desarrollo Social y Familia",
      abarca: "Políticas, programas y beneficios para la erradicación de la pobreza, protección social y apoyo a familias vulnerables o grupos prioritarios.",
      creacion: "1990 (como MIDEPLAN)",
      subsecretarias: [
        { nombre: "Subsecretaría de Evaluación Social", url: null },
        { nombre: "Subsecretaría de Servicios Sociales", url: null },
        { nombre: "Subsecretaría de la Niñez", url: null }
      ],
      utilidad: "Registro Social de Hogares (RSH), postulación a bonos estatales, Registro Nacional de Discapacidad y ayudas de emergencia (FIBE).",
      fuente: "https://www.desarrollosocialyfamilia.gob.cl/"
    },
    {
      id: "educacion",
      nombre: "Ministerio de Educación (MINEDUC)",
      abarca: "Sistema educativo inclusivo y de calidad desde el nivel parvulario hasta la educación superior.",
      creacion: "1837",
      subsecretarias: [
        { nombre: "Subsecretaría de Educación", url: null },
        { nombre: "Subsecretaría de Educación Parvularia", url: null },
        { nombre: "Subsecretaría de Educación Superior", url: null }
      ],
      utilidad: "Sistema de Admisión Escolar (SAE), becas, créditos y Gratuidad (FUAS), validación de títulos y bonos escolares.",
      fuente: "https://www.mineduc.cl/"
    },
    {
      id: "justicia",
      nombre: "Ministerio de Justicia y Derechos Humanos",
      abarca: "Relación del Ejecutivo con el Poder Judicial, administración del sistema penitenciario y fomento de los derechos humanos.",
      creacion: "1837",
      subsecretarias: [
        { nombre: "Subsecretaría de Justicia", url: null },
        { nombre: "Subsecretaría de Derechos Humanos", url: null }
      ],
      utilidad: "Registro Civil (cédulas, pasaportes, certificados), Servicio Médico Legal y asistencia judicial gratuita.",
      fuente: "https://www.minjusticia.gob.cl/"
    },
    {
      id: "trabajo",
      nombre: "Ministerio del Trabajo y Previsión Social",
      abarca: "Relaciones laborales, fomento del empleo formal, fiscalización del trabajo y administración de pensiones y seguridad social.",
      creacion: "1932",
      subsecretarias: [
        { nombre: "Subsecretaría del Trabajo", url: null },
        { nombre: "Subsecretaría de Previsión Social", url: null }
      ],
      utilidad: "Conflictos laborales (Dirección del Trabajo), Seguro de Cesantía, capacitación (SENCE) y consultas de pensiones.",
      fuente: "https://www.mintrab.gob.cl/"
    },
    {
      id: "mop",
      nombre: "Ministerio de Obras Públicas (MOP)",
      abarca: "Planificación, construcción y mantención de infraestructura pública (carreteras, puentes, aeropuertos) y gestión de recursos hídricos.",
      creacion: "1887",
      subsecretarias: [
        { nombre: "Subsecretaría de Obras Públicas", url: null }
      ],
      utilidad: "Conectividad vial, derechos de agua (Dirección General de Aguas) y planes de agua potable rural (APR).",
      fuente: "https://www.mop.gob.cl/"
    },
    {
      id: "salud",
      nombre: "Ministerio de Salud (MINSAL)",
      abarca: "Coordinación, regulación y ejecución de las políticas de salud pública y del sistema sanitario nacional.",
      creacion: "1924",
      subsecretarias: [
        { nombre: "Subsecretaría de Salud Pública", url: null },
        { nombre: "Subsecretaría de Redes Asistenciales", url: null }
      ],
      utilidad: "Cobertura FONASA, vacunación, fiscalización sanitaria y administración de hospitales públicos.",
      fuente: "https://www.minsal.cl/"
    },
    {
      id: "minvu",
      nombre: "Ministerio de Vivienda y Urbanismo (MINVU)",
      abarca: "Planificación urbana, construcción de viviendas sociales y mejoramiento del entorno habitacional.",
      creacion: "1965",
      subsecretarias: [
        { nombre: "Subsecretaría de Vivienda y Urbanismo", url: null }
      ],
      utilidad: "Subsidios habitacionales (DS49, DS19) y financiamiento para mejoramiento o aislamiento de viviendas.",
      fuente: "https://www.minvu.gob.cl/"
    },
    {
      id: "agricultura",
      nombre: "Ministerio de Agricultura (MINAGRI)",
      abarca: "Fomento de la producción agrícola, ganadera y forestal, protección fitosanitaria y desarrollo rural.",
      creacion: "1930",
      subsecretarias: [
        { nombre: "Subsecretaría de Agricultura", url: null }
      ],
      utilidad: "Apoyo a pequeños agricultores (INDAP), control fronterizo de plantas y animales (SAG) y prevención de incendios (CONAF).",
      fuente: "https://www.minagri.gob.cl/"
    },
    {
      id: "mineria",
      nombre: "Ministerio de Minería",
      abarca: "Regulación y fomento de la actividad minera (gran, mediana y pequeña minería).",
      creacion: "1953",
      subsecretarias: [
        { nombre: "Subsecretaría de Minería", url: null }
      ],
      utilidad: "Capacitación y apoyo financiero a pequeños mineros (ENAMI) y cartografía geológica (SERNAGEOMIN).",
      fuente: "https://www.minmineria.cl/"
    },
    {
      id: "mtt",
      nombre: "Ministerio de Transportes y Telecomunicaciones (MTT)",
      abarca: "Regulación del transporte público y privado, seguridad vial y conectividad digital o telefónica.",
      creacion: "1974",
      subsecretarias: [
        { nombre: "Subsecretaría de Transportes", url: null },
        { nombre: "Subsecretaría de Telecomunicaciones (SUBTEL)", url: "https://www.subtel.gob.cl/" }
      ],
      utilidad: "Tarifas y recorridos de buses, subsidio al transporte en zonas aisladas, denuncias de internet/telefonía y plantas de revisión técnica.",
      fuente: "https://www.mtt.gob.cl/"
    },
    {
      id: "bienes-nacionales",
      nombre: "Ministerio de Bienes Nacionales",
      abarca: "Gestión, administración y regularización de los bienes y terrenos de propiedad fiscal.",
      creacion: "1977 (como Ministerio de Tierras y Colonización)",
      subsecretarias: [
        { nombre: "Subsecretaría de Bienes Nacionales", url: null }
      ],
      utilidad: "Regularización de títulos de dominio (saneamiento) y mapas públicos de rutas patrimoniales.",
      fuente: "https://www.bienesnacionales.cl/"
    },
    {
      id: "energia",
      nombre: "Ministerio de Energía",
      abarca: "Políticas de suministro energético, eficiencia energética y transición hacia energías limpias.",
      creacion: "2010",
      subsecretarias: [
        { nombre: "Subsecretaría de Energía", url: null }
      ],
      utilidad: "Subsidio de la luz para sectores vulnerables y programas de paneles solares o aislamiento térmico.",
      fuente: "https://www.energia.gob.cl/"
    },
    {
      id: "medio-ambiente",
      nombre: "Ministerio del Medio Ambiente (MMA)",
      abarca: "Protección del medio ambiente, desarrollo sustentable, conservación de la biodiversidad y políticas contra el cambio climático.",
      creacion: "2010 (reemplazó a la CONAMA)",
      subsecretarias: [
        { nombre: "Subsecretaría del Medio Ambiente", url: null }
      ],
      utilidad: "Alertas de contaminación del aire, fondos de protección ambiental y denuncias por daño al ecosistema (SMA).",
      fuente: "https://mma.gob.cl/"
    },
    {
      id: "deporte",
      nombre: "Ministerio del Deporte (MINDEP)",
      abarca: "Fomento de la actividad física, el deporte recreativo y el alto rendimiento.",
      creacion: "2013",
      subsecretarias: [
        { nombre: "Subsecretaría del Deporte", url: null }
      ],
      utilidad: "Talleres deportivos gratuitos, becas de rendimiento y financiamiento para clubes de barrio (IND).",
      fuente: "https://www.mindep.cl/"
    },
    {
      id: "mujer",
      nombre: "Ministerio de la Mujer y la Equidad de Género",
      abarca: "Políticas para eliminar la discriminación de género, promover la autonomía de la mujer y erradicar la violencia intrafamiliar.",
      creacion: "2016 (reemplazó al SERNAM)",
      subsecretarias: [
        { nombre: "Subsecretaría de la Mujer y la Equidad de Género", url: null }
      ],
      utilidad: "Centros de la Mujer (apoyo psicológico y legal), programas de inserción laboral y casas de acogida de emergencia.",
      fuente: "https://www.minmujeryeg.gob.cl/"
    },
    {
      id: "culturas",
      nombre: "Ministerio de las Culturas, las Artes y el Patrimonio",
      abarca: "Fomento de las artes, las industrias culturales, la memoria histórica y la protección del patrimonio cultural.",
      creacion: "2018 (reemplazó al Consejo de la Cultura)",
      subsecretarias: [
        { nombre: "Subsecretaría de las Culturas y las Artes", url: null },
        { nombre: "Subsecretaría del Patrimonio Cultural", url: null }
      ],
      utilidad: "Fondos artísticos (Fondart, Fondo del Libro), red de Bibliotecas Públicas, Museos Nacionales y Día del Patrimonio.",
      fuente: "https://www.cultura.gob.cl/"
    },
    {
      id: "ciencia",
      nombre: "Ministerio de Ciencia, Tecnología, Conocimiento e Innovación",
      abarca: "Coordinación y fomento de la investigación científica, el desarrollo tecnológico y la innovación de base científico-tecnológica.",
      creacion: "2018",
      subsecretarias: [
        { nombre: "Subsecretaría de Ciencia, Tecnología, Conocimiento e Innovación", url: null }
      ],
      utilidad: "Becas de magíster y doctorado (ANID), divulgación científica en colegios (Explora) y apoyo a startups tecnológicas.",
      fuente: "https://www.minciencia.gob.cl/"
    }
  ];

  const grid = document.getElementById("minGrid");
  const shell = document.getElementById("shell");
  const panelInner = document.getElementById("panelInner");

  if (!grid) return;

  function renderCards() {
    grid.innerHTML = MINISTERIOS.map((m) => `
      <button type="button" class="min-card" data-id="${m.id}" role="listitem" aria-label="${m.nombre}">
        <span class="min-card-name">${m.nombre}</span>
        <span class="min-card-logo">${LOGO_SVG}</span>
      </button>
    `).join("");
  }

  function openDetail(m) {
    const subs = m.subsecretarias.map((s) => {
      if (s.url) {
        return `<li><a href="${s.url}" target="_blank" rel="noopener">${s.nombre}</a></li>`;
      }
      return `<li>${s.nombre}</li>`;
    }).join("");

    panelInner.innerHTML = `
      <div class="panel-head">
        <span class="panel-eyebrow">Ministerio</span>
        <button type="button" class="panel-close" id="panelClose" aria-label="Cerrar">×</button>
      </div>
      <h2 class="panel-title">${m.nombre}</h2>
      <div class="panel-min-section">
        <strong>Qué abarca</strong>
        <p class="panel-desc" style="margin:0">${m.abarca}</p>
      </div>
      <div class="panel-min-section">
        <strong>Creación</strong>
        <p class="panel-meta" style="margin:0">${m.creacion}</p>
      </div>
      <div class="panel-min-section">
        <strong>Subsecretarías</strong>
        <ul class="panel-min-list">${subs}</ul>
      </div>
      <div class="panel-min-section">
        <strong>Utilidad para el ciudadano</strong>
        <p class="panel-desc" style="margin:0">${m.utilidad}</p>
      </div>
      <div class="panel-trace">
        <strong>Fuente:</strong>
        <a href="${m.fuente}" target="_blank" rel="noopener">${m.fuente.replace(/^https?:\/\//, "")}</a>
      </div>
    `;

    shell.classList.add("panel-open");
    document.querySelectorAll(".min-card").forEach((c) => {
      c.classList.toggle("active", c.dataset.id === m.id);
    });

    const closeBtn = document.getElementById("panelClose");
    if (closeBtn) {
      closeBtn.addEventListener("click", closePanel);
    }
  }

  function closePanel() {
    shell.classList.remove("panel-open");
    panelInner.innerHTML = `<div class="panel-placeholder">Selecciona un ministerio para ver su cobertura, subsecretarías y utilidad para el ciudadano.</div>`;
    document.querySelectorAll(".min-card").forEach((c) => c.classList.remove("active"));
  }

  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".min-card");
    if (!card) return;
    const m = MINISTERIOS.find((x) => x.id === card.dataset.id);
    if (m) openDetail(m);
  });

  renderCards();
})();
