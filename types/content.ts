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
