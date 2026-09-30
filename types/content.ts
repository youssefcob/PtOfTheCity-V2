export type EditableTag = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'a';
export type LinkTarget = '_self' | '_blank';
export type TextStyleFontFamily = 'poppins' | 'switzer' | 'inherit';
export type TextStyleFontWeight = 400 | 500 | 600 | 700;

export interface PageContentEntry {
  value: string;
  type: 'text' | 'image';
  image_public_id?: string | null;
  alt?: string | null;
  text_style_id?: number | null;
  tag?: EditableTag | null;
  href?: string | null;
  target?: LinkTarget | null;
  object_fit?: string | null;
  object_position?: string | null;
}

export type PageContentMap = Record<string, PageContentEntry>;

export interface TextStyle {
  id: number;
  name: string;
  font_family: TextStyleFontFamily;
  // Every mobile_* field below is applied only below the site's shared 900px
  // mobile breakpoint and falls back to its desktop counterpart when null -
  // the same "white text on a photo background at mobile widths" pattern
  // mobile_color originally covered, generalized to every style feature so
  // mobile can differ in font, weight, italic/underline, color, size (its
  // own independent clamp), and line-height all at once.
  mobile_font_family: TextStyleFontFamily | null;
  font_weight: TextStyleFontWeight;
  mobile_font_weight: TextStyleFontWeight | null;
  italic: boolean;
  mobile_italic: boolean | null;
  underline: boolean;
  mobile_underline: boolean | null;
  color: string | null;
  mobile_color: string | null;
  min_font_size: number;
  // The mobile clamp is all-or-nothing: min/max/vw only take effect together
  // (see resolveMobileStyleOverrides) - a font-size clamp with only some of
  // its three numbers overridden isn't meaningful.
  mobile_min_font_size: number | null;
  max_font_size: number;
  mobile_max_font_size: number | null;
  font_size_vw: number;
  mobile_font_size_vw: number | null;
  line_height: number | null;
  mobile_line_height: number | null;
}

export interface PageMetaCustomTag {
  id: number;
  attribute: 'name' | 'property';
  meta_key: string;
  content: string;
}

export interface PageMeta {
  title: string | null;
  description: string | null;
  canonical: string | null;
  og_image: string | null;
  og_image_public_id?: string | null;
  customTags: PageMetaCustomTag[];
}

// A row in GET /page-meta/index: one page key that has custom meta.
export interface PageMetaIndexRow {
  page: string;
  title: string | null;
  description: string | null;
  has_og_image: boolean;
  custom_tag_count: number;
  updated_at: string | null;
}

export interface PageBootstrapResponse {
  content: PageContentMap;
  isContentEditor: boolean;
  textStyles: TextStyle[];
  pageMeta: PageMeta | null;
}

export interface ImageUploadResponse {
  url: string;
  public_id: string;
}

// Admin-managed redirects (API: /admin/redirects).
export interface RedirectRule {
  id: number;
  source: string;
  destination: string;
  status_code: 301 | 302;
  enabled: boolean;
  hits: number;
  last_hit_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface RedirectInput {
  source: string;
  destination: string;
  status_code?: 301 | 302;
  enabled?: boolean;
}

export type SitemapChangefreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

// A sitemap override or manual url (API: /admin/sitemap-entries).
export interface SitemapEntry {
  id: number;
  url: string;
  priority: number | null;
  changefreq: SitemapChangefreq | null;
  lastmod: string | null;
  excluded: boolean;
  is_manual: boolean;
}

export interface SitemapEntryInput {
  url: string;
  priority?: number | null;
  changefreq?: SitemapChangefreq | null;
  lastmod?: string | null;
  excluded?: boolean;
  is_manual?: boolean;
}

// A row from /api/__sitemap__/manage (Nuxt): every sitemap url with its
// effective settings and, for automatic pages, the defaults.
export interface SitemapManageRow {
  url: string;
  source: 'auto' | 'manual';
  priority: number;
  changefreq: SitemapChangefreq;
  lastmod: string | null;
  excluded: boolean;
  entryId: number | null;
  defaults: { priority: number; changefreq: SitemapChangefreq; lastmod: string | null; excluded: boolean } | null;
  // raw admin-set values; null = follows the default
  override: { priority: number | null; changefreq: SitemapChangefreq | null; lastmod: string | null };
}
