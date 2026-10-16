const slides = [
  { image: "main-app.jpg", alt: ["Interfaccia principale del Financial RAG Assistant", "Financial RAG Assistant main interface", "Interfaz principal de Financial RAG Assistant"], title: ["Interfaccia principale", "Main interface", "Interfaz principal"], description: ["Dashboard e PDF campione.", "Dashboard and sample PDF.", "Panel principal y PDF de ejemplo."] },
  { image: "reindexing.jpg", alt: ["Schermata durante la ricostruzione dell’indice", "Screen while rebuilding the document index", "Pantalla durante la reconstrucción del índice"], title: ["Indicizzazione dei documenti", "Document indexing", "Indexación de documentos"], description: ["Stato di aggiornamento e ricostruzione dell’indice.", "Index update and rebuild status.", "Estado de actualización y reconstrucción del índice."] },
  { image: "rag-answer.jpg", alt: ["Risposte del Financial RAG Assistant a domande sui documenti", "Financial RAG Assistant answers to document questions", "Respuestas de Financial RAG Assistant a preguntas sobre documentos"], title: ["Risposte basate sul contesto", "Context-grounded answers", "Respuestas basadas en el contexto"], description: ["La risposta collega la domanda ai passaggi recuperati.", "Answers connect questions to retrieved passages.", "Las respuestas conectan las preguntas con los fragmentos recuperados."] },
  { image: "after-reindexing.jpg", alt: ["Applicazione pronta dopo la ricostruzione dell’indice", "Application ready after rebuilding the index", "Aplicación lista tras reconstruir el índice"], title: ["Indice aggiornato", "Index refreshed", "Índice actualizado"], description: ["La conversazione riprende dopo la reindicizzazione.", "The conversation resumes after reindexing.", "La conversación continúa después de volver a indexar."] },
  { image: "document-management.jpg", alt: ["Finestra di selezione di un PDF da caricare", "File picker for selecting a PDF to upload", "Ventana para seleccionar un PDF y cargarlo"], title: ["Gestione dei PDF", "PDF management", "Gestión de PDF"], description: ["Selezione di un documento da aggiungere.", "Selecting a document to add.", "Selección de un documento para añadir."] }
];

const languageNames = { it: "Italiano", en: "English", es: "Español" };
const languageSelect = document.querySelector("#language");
const image = document.querySelector("#slide-image");
const captionTitle = document.querySelector("#caption-title");
const captionDescription = document.querySelector("#caption-description");
const currentNumber = document.querySelector("#current-number");
const captionNumber = document.querySelector("#caption-number");
const dots = document.querySelector("#slide-dots");
const autoplayButton = document.querySelector("#autoplay");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let language = new URLSearchParams(location.search).get("lang");
if (!Object.hasOwn(languageNames, language)) language = "it";
let currentSlide = 0;
let isPlaying = !prefersReducedMotion.matches;
let timer;

document.querySelector("#total-number").textContent = String(slides.length).padStart(2, "0");
languageSelect.value = language;

function translatePage() {
  document.documentElement.lang = language;
  document.title = language === "it" ? "Financial RAG · Galleria screenshot" : language === "en" ? "Financial RAG · Screenshot gallery" : "Financial RAG · Galería de capturas";
  languageSelect.setAttribute("aria-label", languageNames[language]);
  document.querySelectorAll('a[href^="../../index.html"]').forEach(link => {
    link.href = `../../index.html?lang=${language}#progetti`;
  });
  document.querySelectorAll("[data-it][data-en][data-es]").forEach(element => {
    element.innerHTML = element.dataset[language];
  });
  document.querySelector(".arrow.previous").setAttribute("aria-label", language === "it" ? "Schermata precedente" : language === "en" ? "Previous screen" : "Pantalla anterior");
  document.querySelector(".arrow.next").setAttribute("aria-label", language === "it" ? "Schermata successiva" : language === "en" ? "Next screen" : "Pantalla siguiente");
  dots.setAttribute("aria-label", language === "it" ? "Seleziona una schermata" : language === "en" ? "Choose a screen" : "Elige una pantalla");
  renderSlide();
  updateAutoplayButton();
}

function renderSlide() {
  const slide = slides[currentSlide];
  image.src = `screenshots/${slide.image}`;
  image.alt = slide.alt[{ it: 0, en: 1, es: 2 }[language]];
  captionTitle.textContent = slide.title[{ it: 0, en: 1, es: 2 }[language]];
  captionDescription.textContent = slide.description[{ it: 0, en: 1, es: 2 }[language]];
  currentNumber.textContent = String(currentSlide + 1).padStart(2, "0");
  captionNumber.textContent = String(currentSlide + 1).padStart(2, "0");
  dots.querySelectorAll("button").forEach((button, index) => {
    button.setAttribute("aria-current", String(index === currentSlide));
    button.setAttribute("aria-label", `${language === "it" ? "Schermata" : language === "en" ? "Screen" : "Pantalla"} ${index + 1}: ${slides[index].title[{ it: 0, en: 1, es: 2 }[language]]}`);
  });
}

function setSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  renderSlide();
  restartTimer();
}

function updateAutoplayButton() {
  autoplayButton.setAttribute("aria-pressed", String(isPlaying));
  const label = autoplayButton.querySelector("[data-it]");
  label.dataset.it = isPlaying ? "Pausa presentazione" : "Riprendi presentazione";
  label.dataset.en = isPlaying ? "Pause slideshow" : "Resume slideshow";
  label.dataset.es = isPlaying ? "Pausar presentación" : "Reanudar presentación";
  label.textContent = label.dataset[language];
  autoplayButton.querySelector(".pause-icon").textContent = isPlaying ? "Ⅱ" : "▶";
}

function restartTimer() {
  window.clearInterval(timer);
  if (isPlaying && !document.hidden) timer = window.setInterval(() => setSlide(currentSlide + 1), 7000);
}

slides.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.className = "slide-dot";
  dot.addEventListener("click", () => setSlide(index));
  dots.append(dot);
});

document.querySelector(".arrow.previous").addEventListener("click", () => setSlide(currentSlide - 1));
document.querySelector(".arrow.next").addEventListener("click", () => setSlide(currentSlide + 1));
autoplayButton.addEventListener("click", () => {
  isPlaying = !isPlaying;
  updateAutoplayButton();
  restartTimer();
});
languageSelect.addEventListener("change", event => {
  language = event.target.value;
  const url = new URL(location.href);
  url.searchParams.set("lang", language);
  history.replaceState(null, "", url);
  translatePage();
});
document.addEventListener("visibilitychange", restartTimer);
document.addEventListener("keydown", event => {
  if (event.altKey || event.ctrlKey || event.metaKey || event.target.closest("button, select, input, textarea")) return;
  if (event.key === "ArrowLeft") setSlide(currentSlide - 1);
  if (event.key === "ArrowRight") setSlide(currentSlide + 1);
});

translatePage();
restartTimer();
