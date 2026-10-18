# Riccardo Pala — Portfolio

Portfolio personale di Riccardo Pala, Software Engineer. Presenta esperienze, competenze, formazione e progetti in italiano, inglese e spagnolo.

**[Apri il portfolio](https://riccardo-pala.github.io/riccardo-pala-portfolio/)** · [LinkedIn](https://www.linkedin.com/in/riccardo-pala/) · [Email](mailto:riccardo.pala98@outlook.it)

## Contenuti

- Profilo professionale orientato a backend Java/Spring, sistemi distribuiti e AI applicata.
- Selezione di progetti personali con repository e, per MuSeek e Financial RAG Assistant, gallerie consultabili dal browser.
- Formazione, pubblicazione ACM RecSys 2022 e certificazione Confluent Certified Developer for Apache Kafka.
- Curriculum AI in formato HTML, accessibile dalla sezione iniziale del sito.

## Progetti in evidenza

| Progetto | Descrizione | Repository / demo |
| --- | --- | --- |
| Financial RAG Assistant | Applicazione locale per interrogare documenti PDF con parsing, embeddings, ricerca vettoriale e generazione delle risposte. | [Repository](https://github.com/riccardo-pala/financial-rag) · [Galleria](https://riccardo-pala.github.io/riccardo-pala-portfolio/apps/financial-rag/index.html) |
| MuSeek | App Android e community per musicisti e band. | [Repository](https://github.com/riccardo-pala/MuSeek) · [Galleria](https://riccardo-pala.github.io/riccardo-pala-portfolio/apps/museek/index.html) |
| Pricing Optimization | Simulazione di pricing dinamico e raccomandazione con strategie multi-armed bandit. | [Repository](https://github.com/riccardo-pala/eCommerce-Website) |
| Industrial Defect Classification | Classificazione di difetti su superfici d'acciaio con transfer learning. | [Repository](https://github.com/riccardo-pala/industrial-defect-classification) |
| CLup — Customer Line-up | Prototipo Java EE per prenotazioni di accesso al supermercato e gestione delle code. | [Repository](https://github.com/riccardo-pala/CLup) |
| Galactic Journeys | Portale web con account, prenotazioni e contenuti editoriali. | [Repository](https://github.com/riccardo-pala/gj) |

## Sviluppo e pubblicazione

Il sito è statico: HTML, CSS, JavaScript e dati dei progetti in JSON. Non richiede installazione di dipendenze o compilazione.

Per visualizzare il sito in locale dalla directory del repository:

```bash
python3 -m http.server 8000 --directory dist
```

Apri poi `http://localhost:8000`. La pubblicazione su GitHub Pages è gestita dal workflow [`.github/workflows/pages.yml`](.github/workflows/pages.yml): ogni push su `main` distribuisce il contenuto di `dist/`.

I file principali sono `dist/index.html`, `dist/styles.css`, `dist/app.js` e `dist/projects.json`. Le gallerie dei progetti si trovano in `dist/apps/`.

---

## English

Personal portfolio of Riccardo Pala, Software Engineer. It presents professional experience, skills, education and selected projects in Italian, English and Spanish.

**[View the portfolio](https://riccardo-pala.github.io/riccardo-pala-portfolio/)** · [LinkedIn](https://www.linkedin.com/in/riccardo-pala/) · [Email](mailto:riccardo.pala98@outlook.it)

The site is a static HTML, CSS and JavaScript project, with project metadata in JSON. It includes selected project repositories, browser galleries for MuSeek and Financial RAG Assistant, education, research, the Confluent Certified Developer for Apache Kafka credential, and an HTML resume.

To preview it locally, run `python3 -m http.server 8000 --directory dist` from the repository root and open `http://localhost:8000`. GitHub Actions deploys `dist/` to GitHub Pages on every push to `main`.
