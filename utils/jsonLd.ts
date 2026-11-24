// JSON-LD helpers shared by page code and the CMS schema editor.

// Every page's built-in JSON-LD <script> uses this unhead `key`. When an
// editor ticks "replace the built-in schema", useRouteMeta pushes its own
// script under the same key at higher priority, so unhead drops the built-in one.
export const PAGE_SCHEMA_KEY = 'page-schema';

/** Parsed JSON-LD (object or array), or null when the text isn't valid. */
export const parseJsonLd = (text: string): Record<string, unknown> | unknown[] | null => {
  try {
    const value = JSON.parse(text);
    return value && typeof value === 'object' ? value : null;
  } catch {
    return null;
  }
};

/**
 * Serialize for a <script type="application/ld+json"> body. `<` is escaped
 * so editor-supplied text can never close the script tag early.
 */
export const serializeJsonLd = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c');

/** "FAQPage", "MedicalClinic, BreadcrumbList", … for list labels. */
export const jsonLdTypes = (value: unknown): string => {
  const types = new Set<string>();
  const visit = (node: unknown) => {
    if (Array.isArray(node)) return node.forEach(visit);
    if (!node || typeof node !== 'object') return;
    const t = (node as Record<string, unknown>)['@type'];
    if (typeof t === 'string') types.add(t);
    else if (Array.isArray(t)) t.forEach((x) => typeof x === 'string' && types.add(x));
    visit((node as Record<string, unknown>)['@graph']);
  };
  visit(value);
  return [...types].join(', ');
};
