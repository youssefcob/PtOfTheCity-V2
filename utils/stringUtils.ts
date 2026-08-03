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