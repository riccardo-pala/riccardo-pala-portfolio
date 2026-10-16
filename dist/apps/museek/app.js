const slides = [
  { image: "slide-01.jpg", alt: ["Copertina della presentazione MuSeek", "MuSeek presentation cover", "Portada de la presentación de MuSeek"], title: ["MuSeek", "MuSeek", "MuSeek"], description: ["La presentazione del progetto e la sua identità visiva.", "The project presentation and its visual identity.", "La presentación del proyecto y su identidad visual."] },
  { image: "slide-03.jpg", alt: ["Pagina iniziale con schermate di registrazione e accesso", "Home screen with sign-up and login screens", "Pantalla de inicio con registro e inicio de sesión"], title: ["Accesso e registrazione", "Sign-up and login", "Registro e inicio de sesión"], description: ["Un primo sguardo ai flussi di ingresso nell’app.", "An overview of the app’s entry flows.", "Un vistazo a los flujos de acceso a la app."] },
  { image: "slide-04.jpg", alt: ["Homepage di MuSeek con accesso alle sezioni dell’app", "MuSeek home screen linking to the app’s main sections", "Inicio de MuSeek con acceso a las secciones principales"], title: ["Homepage", "Home screen", "Pantalla de inicio"], description: ["Dal profilo si raggiungono il marketplace e il Villaggio Band.", "The profile links to the marketplace and Band Village.", "Desde el perfil se accede al marketplace y al espacio de bandas."] },
  { image: "slide-05.jpg", alt: ["Sezione del marketplace musicale", "Music marketplace section", "Sección del marketplace musical"], title: ["Mercatino musicale", "Music marketplace", "Marketplace musical"], description: ["Annunci, recensioni e ricerca degli strumenti.", "Listings, reviews and instrument search.", "Anuncios, reseñas y búsqueda de instrumentos."] },
  { image: "slide-08.jpg", alt: ["Ricerca degli strumenti musicali per parola chiave e categoria", "Instrument search by keyword and category", "Búsqueda de instrumentos por palabra clave y categoría"], title: ["Ricerca strumenti", "Instrument search", "Búsqueda de instrumentos"], description: ["Filtri per parola chiave e categoria per trovare lo strumento giusto.", "Keyword and category filters help find the right instrument.", "Filtros por palabra clave y categoría para encontrar el instrumento adecuado."] },
  { image: "slide-10.jpg", alt: ["Schermate del flusso di recensioni dopo un acquisto", "Review flow screens after a purchase", "Pantallas del flujo de reseñas tras una compra"], title: ["Recensioni", "Reviews", "Reseñas"], description: ["Chi acquista può condividere la propria esperienza.", "Buyers can share their experience.", "Quienes compran pueden compartir su experiencia."] },
  { image: "slide-13.jpg", alt: ["Sezione Villaggio Band dedicata alla community musicale", "Band Village section for the music community", "Sección Villaggio Band para la comunidad musical"], title: ["Villaggio Band", "Band Village", "Comunidad de bandas"], description: ["Uno spazio per entrare in contatto con musicisti e band.", "A space to connect with musicians and bands.", "Un espacio para conectar con músicos y bandas."] },
  { image: "slide-15.jpg", alt: ["Annuncio per cercare un musicista o una band", "Listing to find a musician or a band", "Anuncio para encontrar un músico o una banda"], title: ["Nuovo annuncio", "New listing", "Nuevo anuncio"], description: ["Ricerca di musicisti o band attraverso annunci dedicati.", "Find musicians or bands through dedicated listings.", "Busca músicos o bandas mediante anuncios específicos."] },
  { image: "slide-20.jpg", alt: ["Schermata della presentazione dedicata al database Firebase", "Presentation screen about the Firebase database", "Pantalla de la presentación sobre la base de datos Firebase"], title: ["Firebase Realtime Database", "Firebase Realtime Database", "Firebase Realtime Database"], description: ["Una panoramica sulla struttura dati usata dall’app.", "An overview of the app’s data structure.", "Una descripción de la estructura de datos utilizada por la app."] }
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
  document.title = language === "it" ? "MuSeek · Panoramica visiva" : language === "en" ? "MuSeek · Visual overview" : "MuSeek · Recorrido visual";
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
  const languageIndex = { it: 0, en: 1, es: 2 }[language];
  image.src = `slides/${slide.image}`;
  image.alt = slide.alt[languageIndex];
  captionTitle.textContent = slide.title[languageIndex];
  captionDescription.textContent = slide.description[languageIndex];
  currentNumber.textContent = String(currentSlide + 1).padStart(2, "0");
  captionNumber.textContent = String(currentSlide + 1).padStart(2, "0");
  dots.querySelectorAll("button").forEach((button, index) => {
    button.setAttribute("aria-current", String(index === currentSlide));
    button.setAttribute("aria-label", `${language === "it" ? "Schermata" : language === "en" ? "Screen" : "Pantalla"} ${index + 1}: ${slides[index].title[languageIndex]}`);
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
