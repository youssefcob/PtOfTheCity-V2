import type { Job } from '~/types/types';
import { createSlug } from '~/utils/stringUtils';

// Positions created before the API added `slug` fall back to a slug built
// from the title, which the detail page also accepts (see findJobBySlug).
export const jobSlug = (job: Job): string => job.slug || createSlug(job.title);

export const findJobBySlug = (jobs: Job[], slug: string): Job | undefined =>
    jobs.find((job) => jobSlug(job) === slug || String(job.id) === slug);

export const jobStatusLabel = (job: Job): string =>
    job.hiring_status === 'soon' ? 'Hiring soon' : 'Currently Hiring';

// "2026-10-24T…" -> "Oct 24, 2026"
export const formatPostedDate = (iso: string | null | undefined): string => {
    if (!iso) return '';
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
};

export const applyLink = (job: Job) => ({ path: '/careers/apply', query: { position: jobSlug(job) } });
