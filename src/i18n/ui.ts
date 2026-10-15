export const languages = { en: 'English', it: 'Italiano' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';

export const ui = {
  en: {
    'meta.title': 'Luca Bissoli — Software Engineer, ML & Backend',
    'meta.description':
      'Software engineer in Verona, Italy, working on machine learning and backend systems: Python, C#/.NET, FastAPI, Docker, Kubernetes. MSc in Computer Science, University of Trento.',
    'skip': 'Skip to content',
    'a11y.newTab': 'opens in a new tab',
    'nav.about': 'About',
    'nav.experience': 'Experience',
    'nav.education': 'Education',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.contact': 'Contact',
    'nav.menu': 'Open menu',
    'nav.home': 'Home',
    'theme.toggle': 'Toggle dark mode',
    'lang.switch': 'Leggi in italiano',
    'hero.role': 'Software engineer — machine learning & backend',
    'hero.pitch':
      'I build ML systems and the backend that runs them in production. MSc in Computer Science (ML & security) at the University of Trento, with industry experience in C#/.NET, Python and Kubernetes.',
    'hero.open': 'Open to opportunities · ML / Software Engineering',
    'hero.location': 'Based in Verona · hybrid in Northern Italy · remote with English-speaking teams',
    'hero.email': 'Email me',
    'hero.cv': 'Download CV',
    'hero.photoAlt': 'Portrait of Luca Bissoli',
    'section.about': 'about',
    'section.experience': 'experience',
    'section.education': 'education',
    'section.projects': 'projects',
    'section.skills': 'skills',
    'section.contact': 'contact',
    'about.p1':
      "I'm a software developer who started on the backend, with C# and .NET in production on tax software and on AI-powered web apps, and moved towards machine learning during my Master's. My thesis, VollAI, turns professional volleyball scouting data into tactical predictions, from the raw match files to a served model.",
    'about.p2':
      "I like owning a problem end to end: getting the data in shape, choosing a model I can explain, and shipping it behind a clean API, in a container. My Master's also covers cybersecurity, from ethical hacking to ML for intrusion detection, so I tend to think about how things break.",
    'about.p3':
      'Outside work, volleyball is a big part of my life: I played in Serie C for Verona Volley and I still play in an amateur league. I enjoy trying new food and sci-fi video games, and I wrote my first programs in BASIC on a Commodore 64.',
    'about.languages': 'Languages',
    'about.languagesValue': 'Italian (native) · English (professional working proficiency, B2)',
    'experience.present': 'Present',
    'education.thesis': 'Thesis',
    'education.expected': 'expected',
    'projects.more': 'Read more',
    'projects.live': 'Live demo',
    'projects.code': 'Source code',
    'projects.back': 'All projects',
    'projects.problem': 'Problem',
    'projects.pipeline': 'Pipeline',
    'projects.stack': 'Stack',
    'projects.role': 'My role',
    'projects.period': 'Period',
    'skills.ml': 'ML & Data',
    'skills.ai': 'AI / LLM',
    'skills.backend': 'Backend',
    'skills.frontend': 'Frontend',
    'skills.devops': 'DevOps & Tools',
    'contact.text':
      "The quickest way to reach me is email. I'm happy to talk about ML engineering, backend or full-stack roles.",
    'footer.privacy': 'No cookies, no tracking. Hosted on GitHub Pages.',
    'footer.built': 'Built with Astro, Tailwind and shadcn/ui.',
    '404.title': 'Page not found',
    '404.text': "The page you're looking for doesn't exist.",
    '404.back': 'Back to the home page',
  },
  it: {
    'meta.title': 'Luca Bissoli — Software Engineer, ML & Backend',
    'meta.description':
      'Software engineer a Verona: machine learning e sistemi backend con Python, C#/.NET, FastAPI, Docker, Kubernetes. Laurea magistrale in Informatica all’Università di Trento.',
    'skip': 'Vai al contenuto',
    'a11y.newTab': 'si apre in una nuova scheda',
    'nav.about': 'Chi sono',
    'nav.experience': 'Esperienza',
    'nav.education': 'Formazione',
    'nav.projects': 'Progetti',
    'nav.skills': 'Competenze',
    'nav.contact': 'Contatti',
    'nav.menu': 'Apri il menu',
    'nav.home': 'Home',
    'theme.toggle': 'Cambia tema chiaro/scuro',
    'lang.switch': 'Read in English',
    'hero.role': 'Software engineer — machine learning e backend',
    'hero.pitch':
      'Costruisco sistemi di machine learning e il backend che li porta in produzione. Laurea magistrale in Informatica (ML e sicurezza) all’Università di Trento, con esperienza in azienda su C#/.NET, Python e Kubernetes.',
    'hero.open': 'Aperto a nuove opportunità · ML / Software Engineering',
    'hero.location': 'Verona · ibrido nel Nord Italia · remoto con team che lavorano in inglese',
    'hero.email': 'Scrivimi',
    'hero.cv': 'Scarica il CV',
    'hero.photoAlt': 'Ritratto di Luca Bissoli',
    'section.about': 'chi-sono',
    'section.experience': 'esperienza',
    'section.education': 'formazione',
    'section.projects': 'progetti',
    'section.skills': 'competenze',
    'section.contact': 'contatti',
    'about.p1':
      'Sono uno sviluppatore partito dal backend, con C# e .NET in produzione su software fiscale e su web app con funzionalità di AI, che durante la magistrale si è spostato verso il machine learning. La mia tesi, VollAI, trasforma i dati di scouting della pallavolo professionistica in previsioni tattiche, dai file grezzi delle partite fino a un modello servito via API.',
    'about.p2':
      'Mi piace seguire un problema dall’inizio alla fine: mettere in ordine i dati, scegliere un modello che so spiegare e rilasciarlo dietro un’API pulita, in un container. La magistrale copre anche la cybersecurity, dall’ethical hacking al ML per l’intrusion detection, quindi tendo a chiedermi come le cose si possono rompere.',
    'about.p3':
      'Fuori dal lavoro la pallavolo è una parte importante della mia vita: ho giocato in Serie C con Verona Volley e gioco ancora in un campionato amatoriale. Mi piace provare cucine nuove e giocare a videogiochi sci-fi, e ho scritto i miei primi programmi in BASIC su un Commodore 64.',
    'about.languages': 'Lingue',
    'about.languagesValue': 'Italiano (madrelingua) · Inglese (B2, uso professionale)',
    'experience.present': 'In corso',
    'education.thesis': 'Tesi',
    'education.expected': 'prevista',
    'projects.more': 'Approfondisci',
    'projects.live': 'Demo online',
    'projects.code': 'Codice sorgente',
    'projects.back': 'Tutti i progetti',
    'projects.problem': 'Problema',
    'projects.pipeline': 'Pipeline',
    'projects.stack': 'Stack',
    'projects.role': 'Il mio ruolo',
    'projects.period': 'Periodo',
    'skills.ml': 'ML & Data',
    'skills.ai': 'AI / LLM',
    'skills.backend': 'Backend',
    'skills.frontend': 'Frontend',
    'skills.devops': 'DevOps & Strumenti',
    'contact.text':
      'Il modo più veloce per contattarmi è l’email. Sono disponibile a parlare di ruoli in ML engineering, backend o full-stack.',
    'footer.privacy': 'Nessun cookie, nessun tracciamento. Ospitato su GitHub Pages.',
    'footer.built': 'Realizzato con Astro, Tailwind e shadcn/ui.',
    '404.title': 'Pagina non trovata',
    '404.text': 'La pagina che cerchi non esiste.',
    '404.back': 'Torna alla home',
  },
} as const;

export type UiKey = keyof (typeof ui)['en'];

export function useTranslations(lang: Lang) {
  return (key: UiKey): string => ui[lang][key] ?? ui[defaultLang][key];
}

export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  return first === 'it' ? 'it' : 'en';
}

/** Path of `path` (written without locale prefix, e.g. "/projects/vollai") in `lang`. */
export function localizePath(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (lang === defaultLang) return clean;
  return clean === '/' ? '/it/' : `/it${clean}`;
}

/** Strip the locale prefix from a pathname: "/it/projects/x" -> "/projects/x". */
export function unlocalizePath(pathname: string): string {
  const stripped = pathname.replace(/^\/it(\/|$)/, '/');
  return stripped || '/';
}

export function formatMonth(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === 'it' ? 'it-IT' : 'en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(date);
}
