import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '@/i18n/ui';

export type Project = CollectionEntry<'projects'>;

/** "en/vollai" -> "vollai" */
export const projectSlug = (p: Project) => p.id.split('/').slice(1).join('/');

export async function getProjects(lang: Lang): Promise<Project[]> {
  const all = await getCollection('projects', (p) => p.id.startsWith(`${lang}/`) && !(import.meta.env.PROD && p.data.draft));
  return all.sort((a, b) => a.data.order - b.data.order);
}

export async function getExperience() {
  const all = await getCollection('experience');
  return all.sort((a, b) => b.data.start.valueOf() - a.data.start.valueOf());
}

export async function getEducation() {
  const all = await getCollection('education');
  return all.sort((a, b) => b.data.start.valueOf() - a.data.start.valueOf());
}
