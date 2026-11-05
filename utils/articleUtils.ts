import type { Blog } from '~/types/types';

// Display helpers shared by the /blogs listing components.

export type ArticleFilterState = { search: string; author: string; tags: string[] };

export const articlePath = (blog: Blog) => `/blogs/${blog.title}`;

export const articleAuthor = (blog: Blog): string => {
    const s = blog.staff;
    if (!s) return '';
    return [s.title, s.first_name, s.last_name].filter(Boolean).join(' ');
};

// ~200 words per minute. Returns null when the listing payload carries no
// body (Studio-hosted articles), so callers can just omit the read time.
export const articleReadMinutes = (blog: Blog): number | null => {
    const words = stripHtml(blog.html_content).split(' ').filter(Boolean).length;
    return words ? Math.max(1, Math.round(words / 200)) : null;
};

export const articleDate = (blog: Blog): string => {
    const d = new Date(blog.created_at);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};
