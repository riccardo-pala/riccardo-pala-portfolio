const projectGrid = document.querySelector("#project-grid");
const filters = document.querySelector("#filters");
const languagePicker = document.querySelector("#language-picker");
const langButton = document.querySelector("#language-switch");
const languageMenu = document.querySelector("#language-menu");
let language = "it";
let activeFilter = "all";
let projects = [];

const labels = {
  it: { all: "Tutti", repo: "Esplora il repository", cv: "Dettagli nel CV", selected: "PROGETTO PERSONALE", filters: "Filtra i progetti", gallery: "Guarda le schermate" },
  en: { all: "All", repo: "Explore repository", cv: "More details in CV", selected: "PERSONAL PROJECT", filters: "Filter projects", gallery: "View screenshots" },
  es: { all: "Todos", repo: "Explorar repositorio", cv: "Más detalles en el CV", selected: "PROYECTO PERSONAL", filters: "Filtrar proyectos", gallery: "Ver capturas" }
};
const languageNames = { it: "Italiano", en: "English", es: "Español" };
const pageTitles = {
  it: "Riccardo Pala — Software & AI Engineer",
  en: "Riccardo Pala — Software & AI Engineer",
  es: "Riccardo Pala — Ingeniero de software e IA"
};
const localized = (project, field) => language === "it" ? project[field] : project[`${field}${language === "en" ? "En" : "Es"}`];

function setLanguage(nextLanguage) {
  language = nextLanguage;
  document.documentElement.lang = language;
  document.title = pageTitles[language];
  document.querySelector('meta[property="og:title"]').content = pageTitles[language];
  document.querySelector(".main-nav").setAttribute("aria-label", language === "it" ? "Navigazione principale" : language === "en" ? "Main navigation" : "Navegación principal");
  document.querySelector(".hero-art").setAttribute("aria-label", language === "it" ? "Ritratto professionale di Riccardo Pala in una grafica connessa a backend, dati e sistemi AI" : language === "en" ? "Professional portrait of Riccardo Pala within a graphic of connected backend, data and AI systems" : "Retrato profesional de Riccardo Pala en una gráfica conectada de backend, datos y sistemas de IA");
  document.querySelectorAll("[data-it][data-en][data-es]").forEach(element => {
    element.innerHTML = element.dataset[language];
  });
  const flag = { it: "🇮🇹", en: "🇬🇧", es: "🇪🇸" }[language];
  langButton.innerHTML = `<span class="language-flag" aria-hidden="true">${flag}</span><span>${language.toUpperCase()}</span><span aria-hidden="true">⌄</span>`;
  langButton.setAttribute("aria-label", language === "it" ? "Seleziona la lingua" : language === "en" ? "Select language" : "Seleccionar idioma");
  languageMenu.setAttribute("aria-label", language === "it" ? "Seleziona la lingua" : language === "en" ? "Select language" : "Seleccionar idioma");
  languageMenu.querySelectorAll("[data-language]").forEach(option => {
    const selected = option.dataset.language === language;
    option.setAttribute("aria-pressed", String(selected));
    option.classList.toggle("selected", selected);
  });
  filters.setAttribute("aria-label", labels[language].filters);
  renderFilters();
  renderProjects();
}

function renderFilters() {
  const categories = ["all", ...new Set(projects.map(project => project.category))];
  filters.innerHTML = categories.map(category => {
    const project = projects.find(item => item.category === category);
    const label = category === "all" ? labels[language].all : localized(project, "category") || (language === "it" ? category : project.categoryEn);
    return `<button class="filter-button${activeFilter === category ? " active" : ""}" type="button" data-filter="${category}" aria-pressed="${activeFilter === category}">${label}</button>`;
  }).join("");
}

function renderProjects() {
  const visible = activeFilter === "all" ? projects : projects.filter(project => project.category === activeFilter);
  projectGrid.innerHTML = visible.map((project, index) => `
    <article class="project-card ${index === 0 && activeFilter === "all" ? "featured" : ""}">
      <div class="project-visual visual-${project.visual}" aria-hidden="true">
        ${project.cover ? `<img class="project-cover" src="${project.cover}" alt="">` : visualMarkup(project.visual)}
        <span class="visual-index">0${projects.indexOf(project) + 1}</span>
      </div>
      <div class="project-info">
        <div class="project-meta"><span>${localized(project, "category") || (language === "it" ? project.category : project.categoryEn)}</span><span class="${project.status ? "project-status" : ""}">${localized(project, "status") || labels[language].selected}</span></div>
        <h3>${project.title}</h3>
        <p class="project-subtitle">${localized(project, "subtitle") || (language === "it" ? project.subtitle : project.subtitleEn)}</p>
        <p class="project-description">${localized(project, "description") || (language === "it" ? project.description : project.descriptionEn)}</p>
        <p class="project-focus">${localized(project, "focus") || (language === "it" ? project.focus : project.focusEn)}</p>
        <div class="tag-list">${project.stack.map(tag => `<span>${tag}</span>`).join("")}</div>
        <div class="project-actions">${project.gallery ? `<a class="project-demo" href="${project.gallery}?lang=${language}"><span>${labels[language].gallery}</span><span aria-hidden="true">↗</span></a>` : ""}<a class="project-link" href="${project.repo}" target="_blank" rel="noreferrer"><span>${localized(project, "repoLabel") || (language === "it" ? project.repoLabel || labels[language].repo : project.repoLabelEn || labels[language].repo)}</span><span aria-hidden="true">↗</span></a></div>
      </div>
    </article>`).join("");
}

function visualMarkup(visual) {
  const markup = {
    rag: `<div class="rag-window"><div class="window-dots"><i></i><i></i><i></i></div><div class="rag-query">Ask your documents<span>↵</span></div><div class="rag-lines"><i></i><i></i><i></i></div><div class="rag-sources"><span>PDF</span><span>CHROMA</span><span>LLM</span></div></div><div class="rag-orb"></div>`,
    graph: `<div class="graph-grid"><i></i><i></i><i></i><i></i><i></i></div><div class="graph-line"></div><div class="graph-node gn-one">UCB</div><div class="graph-node gn-two">TS</div><div class="graph-node gn-three">€</div>`,
    queue: `<div class="clup-board"><div class="clup-brand"><b>CLup</b><span>SUPERMARKET<br>BOOKING</span></div><div class="clup-ticket"><small>REAL-TIME TICKET</small><strong>024</strong><span>EST. ENTRY · 10:35</span></div><div class="clup-slot"><span>PLANNED VISIT</span><b>09:30</b><i>AVAILABLE</i></div></div><div class="clup-marker clup-marker-one"></div><div class="clup-marker clup-marker-two"></div>`,
    music: `<div class="music-disc disc-one"></div><div class="music-disc disc-two"></div><div class="music-note">♫</div><div class="music-caption">FIND YOUR<br>PEOPLE</div>`,
    vision: `<div class="vision-sheet"><span></span><span></span><span></span><span></span><span></span><span></span></div><div class="vision-lens"></div><div class="vision-label">NEU / 06</div>`,
    space: `<div class="space-planet"></div><div class="space-ring"></div><div class="space-star star-one">✳</div><div class="space-star star-two">✳</div><div class="space-title">GALACTIC<br>JOURNEYS</div>`
  };
  return markup[visual] || "";
}

filters.addEventListener("click", event => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  activeFilter = button.dataset.filter;
  renderFilters();
  renderProjects();
});

langButton.addEventListener("click", () => {
  const expanded = langButton.getAttribute("aria-expanded") === "true";
  langButton.setAttribute("aria-expanded", String(!expanded));
  languageMenu.hidden = expanded;
});
languageMenu.addEventListener("click", event => {
  const option = event.target.closest("[data-language]");
  if (!option) return;
  setLanguage(option.dataset.language);
  langButton.setAttribute("aria-expanded", "false");
  languageMenu.hidden = true;
});
document.addEventListener("click", event => {
  if (!languagePicker.contains(event.target)) {
    langButton.setAttribute("aria-expanded", "false");
    languageMenu.hidden = true;
  }
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    langButton.setAttribute("aria-expanded", "false");
    languageMenu.hidden = true;
    langButton.focus();
  }
});

const requestedLanguage = new URLSearchParams(window.location.search).get("lang");
if (["it", "en", "es"].includes(requestedLanguage)) setLanguage(requestedLanguage);

fetch("projects.json?v=20261027-kairos-subtitle")
  .then(response => {
    if (!response.ok) throw new Error("Unable to load project data");
    return response.json();
  })
  .then(data => {
    projects = data;
    renderFilters();
    renderProjects();
  })
  .catch(() => {
    projectGrid.innerHTML = `<p class="load-error">${language === "es" ? "Los proyectos no están disponibles en este momento." : language === "it" ? "I progetti non sono al momento disponibili." : "Projects are temporarily unavailable."}</p>`;
  });
