# Project brief — sito personale di Luca Bissoli

Fonte principale dei contenuti: CV `Bissoli_cv_postMaster.pdf` (Europass, ottobre 2026) + repo `RAG_warframe`.

## Fase 1 — Decisioni developer

| # | Tema | Decisione |
|---|------|-----------|
| Q1 | Obiettivo | Portfolio per la ricerca di lavoro (candidature, LinkedIn) |
| Q2 | Posizionamento | ML engineer / software engineer con solide basi backend; pubblico: recruiter e hiring manager tech IT/UE |
| Q3 | Lingue | Bilingue: EN predefinito, IT con selettore |
| Q4 | Struttura | Home one-page + pagine di dettaglio dei progetti |
| Q5 | Stack | Astro (statico) + Tailwind + componenti shadcn/ui |
| Q6 | Hosting | GitHub Pages (`bissochan.github.io`) con GitHub Actions; dominio custom in seguito |
| Q7 | Privacy | Pubblici solo nome, città, email personale, LinkedIn, GitHub. Mai indirizzo, telefono, data di nascita, email SEAC |
| Q8 | Contenuti extra | Rimandati: segnaposto `TODO` in `src/data/site.ts` |
| Q9 | Esperienze minori | Cameriere fuori dalla timeline; BASIC/C64 come aneddoto nell'About |
| Q10 | Contatti | `mailto:` + LinkedIn, nessun form |
| Q11 | Analytics | Nessuna nell'MVP (eventualmente cookieless in seguito) |
| Q12 | Riservatezza VollAI | Mai db/dati di partenza; descrizione "chill" ad alto livello, niente metriche né snippet per ora |
| Q13 | Stile | Minimal tipografico + tocchi da terminale |
| Q14 | Vincoli / successo | Budget zero; chiaro in 30 s, Lighthouse ≥ 95, mobile-friendly, aggiornamento con un file per lingua |
| Q15 | Blog | Non nell'MVP |
| Q16 | shadcn | Integrazione React ufficiale di Astro + CLI shadcn; HTML statico, isole JS solo dove serve |
| Q17 | Visual | Sans (Inter/Geist) per i testi, mono per etichette/tag/date, prompt `whoami`, titoli `// section`, palette zinc + accento emerald, light/dark (sistema + toggle) |
| Q18 | URL | EN alla radice, IT sotto `/it/`, `hreflang` |
| Q19 | Segnaposto | `TODO` centralizzati, foto estratta dal CV, progetti come file Markdown |
| Q20 | Pagina VollAI | Problema, pipeline (diagramma), stack, cosa ho imparato |
| Q21 | Skills | Per gruppi (ML & Data, Backend, Frontend, DevOps, AI/LLM), senza livelli; esclusi Office, Blender, blockchain |
| Q22 | Badge | "Open to opportunities", attivabile/disattivabile |
| Q23 | Refusi | Corretti sul sito (engineering, VollAI, University of Trento) |
| Q24 | Repo | `C:\Users\bissochan\Desktop\coding\github\personal-site` (spostato da `source\repos` il 16/10/2026), git locale, npm; repo GitHub `bissochan.github.io` |

## Fase 2 — Requisiti dai personaggi del target

- **[Recruiter]** Località: "Based in Verona · hybrid in Northern Italy · remote with English-speaking teams".
- **[Recruiter]** Badge "Open to opportunities · ML / Software Engineering", senza specificare il tipo di contratto (né stage né indeterminato).
- **[Recruiter]** Tag nell'hero: Python, Machine Learning, C# / .NET, FastAPI, Docker, Kubernetes. Inglese mostrato come "Professional working proficiency (B2)".
- **[Recruiter]** MSc: discussione il **16/12/2026** → "MSc · Dec 2026".
- **[ML manager]** VollAI predice la **distribuzione dell'alzatore** dai parametri di gioco; **split per partita** contro il leakage; **unico sviluppatore**, owner end-to-end.
- **[ML manager]** Codenotion valorizzato come esperienza LLM precoce, con un filo conduttore fino a Semantic Kernel/MCP in mSoft.
- **[ML manager]** Cybersecurity come interesse secondario (About + card della magistrale).
- **[ML manager]** Nuovo progetto personale: **Warframe Wiki RAG assistant**, secondo dopo VollAI. Pipeline completa: crawler etico, pulizia, chunking, ricerca ibrida BM25 + bge-m3 con RRF, LLM locale via Ollama, supporto alle domande in italiano, eval suite. Repo privato → nessun link per ora.
- **[EM backend]** SEAC descritto in modo qualitativo (nessuna cifra inventata).
- **[EM backend]** Codenotion: "Nicosia, Cyprus (remote)".
- **[EM backend]** Migrazione Kubernetes su **Akamai Cloud** (Docker + Kubernetes + Helm).

## Fase 3 — Revisione esperti

Profili approvati: UX/accessibility, Privacy (GDPR), Performance, SEO/content, Software architect, Security engineer, DevOps, personaggi della Fase 2.

### UX / accessibility
- **[must] UX1** Al primo colpo d'occhio, anche a 375 px: nome, ruolo, badge, località, tag e CTA (Email, LinkedIn, CV).
- **[must] UX2** Contrasto WCAG AA per l'accento in entrambi i temi (emerald-700 in light, emerald-400 in dark); monospace solo per etichette brevi, mai per i paragrafi.
- **[must] UX3** Struttura accessibile: landmark semantici, skip link, focus visibile, navigazione completa da tastiera, `prefers-reduced-motion`, `lang` corretto su ogni pagina.
- **[must] UX4** Il cambio tema non deve mostrare un lampo del tema sbagliato (script inline in `<head>`); il cambio lingua porta alla stessa pagina nell'altra lingua.
- **[should] UX5** Header sticky con ancore alle sezioni; date nel formato della lingua attiva.
- **[could] UX6** Effetto di digitazione sul prompt dell'hero, disattivato con reduced-motion.

### Privacy (GDPR)
- **[must] PR1** Nessuna richiesta a terze parti: font self-hosted (`@fontsource`), niente CDN, embed o tracker → non serve il cookie banner.
- **[must] PR2** Foto senza metadati EXIF/GPS; CV scaricabile solo in versione ripulita (senza indirizzo, telefono, data di nascita, clausola di consenso). Finché non c'è, il bottone resta nascosto.
- **[should] PR3** Nota breve nel footer: "No cookies, no tracking. Hosted on GitHub Pages."

### Performance
- **[must] PE1** Isole React solo dove servono, con `client:media`/`client:idle`. Il toggle del tema è uno script vanilla minuscolo; il selettore di lingua è un semplice link (con 2 lingue un dropdown non serve).
- **[must] PE2** Immagini con `astro:assets` (AVIF/WebP, `sizes`); font variabili, subset latin, `font-display: swap`, al massimo 2 famiglie.
- **[should] PE3** Lighthouse CI in GitHub Actions con soglia 95.

### SEO / content
- **[must] SE1** Per ogni pagina e lingua: `<title>`/description unici, canonical, `hreflang` + `x-default`, `sitemap.xml`, `robots.txt`.
- **[must] SE2** Immagine Open Graph 1200×630 per le anteprime su LinkedIn; JSON-LD `Person` (jobTitle, alumniOf, sameAs, knowsAbout).
- **[must] SE3** Copy orientato all'impatto: headline "Software engineer — machine learning & backend", progetti con lo schema Problem / Approach / Stack / What I learned.

### Software architect
- **[must] SA1** Modello dei contenuti con schemi zod: `projects` come Markdown per lingua (`src/content/projects/{en,it}/*.md`); esperienze e formazione come dati con campi `{en, it}`; `src/data/site.ts` per configurazione e TODO; `src/i18n/` per le stringhe di interfaccia. Uno schema non valido fa fallire la build.
- **[must] SA2** TypeScript strict, alias `@/`, componenti shadcn in `src/components/ui`, sezioni come componenti `.astro`.
- **[should] SA3** Ordinamento per data e flag `draft` sui progetti, per preparare un progetto senza pubblicarlo.

### Security engineer
- **[must] SC1** Lockfile committato, dipendenze minime, `npm audit --audit-level=high` in CI; workflow con permessi minimi (`contents: read`, `pages: write`, `id-token: write`).
- **[must] SC2** Link esterni con `rel="noopener noreferrer"`.
- **[should] SC3** Dependabot per npm e GitHub Actions.
- **[should] SC4** CSP tramite `<meta http-equiv>` (GitHub Pages non permette intestazioni): `default-src 'self'`, script solo self + hash dello script inline del tema.
- **[could] SC5** `/.well-known/security.txt`, un tocco coerente col profilo security.

### DevOps
- **[must] DO1** Workflow `withastro/action` → `actions/deploy-pages`: build su ogni PR, deploy su `main`. `SITE_URL` letto da env (`.env` in locale, variabile del repo in CI).
- **[should] DO2** README con i passi per il dominio custom (`public/CNAME`, record DNS, Enforce HTTPS).

### Personaggi della Fase 2 (rilettura dei testi)
- **[must] PS1 Recruiter**: l'hero risponde a chi / cosa / dove / disponibilità in una sola schermata.
- **[must] PS2 ML manager**: la pagina di VollAI dichiara il target (distribuzione dell'alzatore), lo split per partita, SHAP e l'ownership; la pagina del RAG mostra il metodo di valutazione (hit@k, MRR, evidenza) senza numeri inventati.
- **[must] PS3 EM backend**: le card SEAC e Codenotion mostrano produzione e lavoro in team (Agile, Azure DevOps, microservizi); mSoft cita Akamai Cloud.

### Lista d'azione consolidata

1. **Must**: UX1–UX4, PR1–PR2, PE1–PE2, SE1–SE3, SA1–SA2, SC1–SC2, DO1, PS1–PS3
2. **Should**: UX5, PR3, PE3, SA3, SC3, SC4, DO2
3. **Could**: UX6, SC5

**Adottate**: tutte (must + should + could). PE1 confermata: selettore di lingua come link, tema in vanilla JS.

## Fase 4 — Realizzazione (16/10/2026)

- Astro 7 + Tailwind 4 + shadcn/ui (preset Nova, Radix). Font Geist / Geist Mono self-hosted, latin precaricato.
- Unica isola React: `MobileNav` (Sheet), caricata solo sotto i 768 px (`client:media`).
- In Astro l'`asChild` di shadcn non raggiunge il figlio (Astro avvolge gli slot): per i link si usa `buttonVariants()` direttamente sull'`<a>`.
- La CLI `shadcn` non è una dipendenza (portava 7 vulnerabilità high): CSS di base copiato in `src/styles/shadcn.css`, componenti aggiunti con `npx shadcn@latest add`.
- CSP via meta tag generata da Astro (`security.csp`): script solo self + hash; stili con `'unsafe-inline'` perché Radix inietta un `<style>` per bloccare lo scroll del menu mobile.
- Foto estratta dal CV come pixel puri (nessun metadato). Immagine Open Graph statica in `public/og.png`.
- Verifiche: `astro check` 0 errori; Lighthouse mobile 99/100/100/100 su home EN, VollAI e RAG IT, CLS 0; nessuna risorsa di terze parti.

### TODO per l'utente
- `src/data/site.ts`: URL di LinkedIn; percorso del CV PDF ripulito (senza indirizzo, telefono, data di nascita, consenso).
- Rileggere i testi generati, in particolare le pagine VollAI e RAG Warframe e l'About.
- Rendere pubblico `RAG_warframe` (README in inglese) e aggiungere `repo:` nel front matter.
- Aggiungere altri progetti universitari in `src/content/projects/{en,it}/`.
- Pubblicazione: repo `bissochan.github.io`, Pages da GitHub Actions, variabile `SITE_URL` (vedi README).
