/**
 * Creates a URL-friendly slug from a string
 * @param title - The string to convert to a slug
 * @returns A URL-friendly slug
 */
export const createSlug = (title: string): string => {
    // return title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    return title.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "") // remove apostrophes and special chars
        .trim()
        .replace(/\s+/g, "-");
};

/**
 * Creates a URL-friendly slug from a string with custom separator
 * @param title - The string to convert to a slug
 * @param separator - The separator to use (default: '-')
 * @returns A URL-friendly slug
 */
export const createSlugWithSeparator = (title: string, separator: string = '-'): string => {
    return title;
    return title.toLowerCase().replace(/[^a-z0-9]/g, separator).replace(new RegExp(`${separator}+`, 'g'), separator).replace(new RegExp(`^${separator}|${separator}$`, 'g'), '');
};

/**
 * Strips HTML tags and collapses whitespace. Used to seed EditableText
 * defaults from API fields that store rich HTML (e.g. clinic.header / summary),
 * since EditableText edits plain text only.
 */
export const stripHtml = (html: string | null | undefined): string => {
    if (!html) return '';
    return html
        .replace(/<[^>]*>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&#39;|&rsquo;|&lsquo;/g, "'")
        .replace(/&quot;|&ldquo;|&rdquo;/g, '"')
        .replace(/\s+/g, ' ')
        .trim();
};
