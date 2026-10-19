/**
 * Site-wide configuration. Everything marked TODO is a placeholder to fill in:
 * an empty string or `null` hides the related link/button instead of showing a broken one.
 */
export const site = {
  name: 'Luca Bissoli',
  email: 'lucabisso1902@gmail.com',

  /** TODO: full LinkedIn profile URL, e.g. https://www.linkedin.com/in/<handle>/ */
  linkedin: '',
  github: 'https://github.com/bissochan',

  /**
   * TODO: path of a sanitized CV in /public (no address, phone, date of birth, consent clause),
   * e.g. '/Luca_Bissoli_CV.pdf'. `null` hides the download button.
   */
  cvPdf: null as string | null,

  /** "Open to opportunities" badge in the hero. */
  openToWork: true,

  /** Keywords shown under the hero headline (recruiter skim). */
  heroTags: ['Python', 'Machine Learning', 'C# / .NET', 'FastAPI', 'Docker', 'Kubernetes'],
} as const;

/** Skills grouped by area, no proficiency levels. Group titles are translated in i18n/ui.ts. */
export const skills = {
  ml: ['Python', 'XGBoost', 'CatBoost', 'SHAP', 'scikit-learn', 'YOLOv8', 'Reinforcement learning (PPO)'],
  ai: ['RAG', 'Ollama', 'Semantic Kernel', 'MCP', 'GPT / Mistral APIs', 'Fine-tuning', 'sentence-transformers'],
  backend: ['C#', '.NET / ASP.NET', 'Entity Framework', 'FastAPI', 'REST APIs', 'Microservices', 'SQL / MySQL', 'SQLite'],
  frontend: ['TypeScript', 'Angular', 'React', 'HTML / CSS'],
  devops: ['Docker', 'Kubernetes', 'Helm', 'Git', 'Azure DevOps', 'Linux'],
} as const;

export type SkillGroup = keyof typeof skills;
