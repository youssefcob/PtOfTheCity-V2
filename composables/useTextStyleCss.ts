import type { TextStyle, TextStyleFontFamily } from '~/types/content';

type CssRecord = Record<string, string>;

const fontFamilyCss = (family: TextStyleFontFamily): string =>
  family === 'inherit' ? 'inherit' : family === 'switzer' ? "'Switzer', sans-serif" : "'Poppins', sans-serif";

// The one piece of real "design logic" worth preserving exactly: three
// admin-tunable numbers become a CSS clamp(), giving fluid responsive type
// without a media query, entirely from the admin panel.
export const resolveTextStyleCss = (style: TextStyle | null | undefined): CssRecord => {
  if (!style) return {};

  const css: CssRecord = {
    fontSize: `clamp(${style.min_font_size}rem, ${style.font_size_vw}vw, ${style.max_font_size}rem)`,
    fontWeight: String(style.font_weight),
  };

  if (style.font_family !== 'inherit') css.fontFamily = fontFamilyCss(style.font_family);
  if (style.italic) css.fontStyle = 'italic';
  if (style.underline) css.textDecoration = 'underline';
  if (style.color) css.color = style.color;
  if (style.line_height != null) css.lineHeight = String(style.line_height);

  return css;
};

// Matches the site's shared mobile breakpoint (see e.g. Hero.vue's own
// `@media screen and (max-width: 900px)` color swaps) - the one already used
// throughout the codebase for "photo background -> needs light text" cases.
export const TEXT_STYLE_MOBILE_BREAKPOINT = 900;

// Every feature an admin can set for desktop (family, weight, italic,
// underline, color, size clamp, line-height) has a mobile_* counterpart that
// falls back to the desktop value above when null - mobile_color's original
// behavior, generalized to the whole style. The one exception is size:
// min/max/vw only take effect as a group (all three or none), since a
// font-size clamp with only some of its three numbers overridden isn't
// meaningful.
//
// Shared between resolveMobileTextStyleOverrideCss (which turns this into a
// real stylesheet rule for the live site) and the text-styles admin page
// (which merges it straight into an inline style for its mobile preview) so
// the two never drift apart.
export const resolveMobileStyleOverrides = (style: TextStyle | null | undefined): CssRecord => {
  if (!style) return {};

  const css: CssRecord = {};

  if (style.mobile_font_family) css.fontFamily = fontFamilyCss(style.mobile_font_family);
  if (style.mobile_font_weight != null) css.fontWeight = String(style.mobile_font_weight);
  if (style.mobile_italic != null) css.fontStyle = style.mobile_italic ? 'italic' : 'normal';
  if (style.mobile_underline != null) css.textDecoration = style.mobile_underline ? 'underline' : 'none';
  if (style.mobile_color) css.color = style.mobile_color;
  if (style.mobile_line_height != null) css.lineHeight = String(style.mobile_line_height);

  if (style.mobile_min_font_size != null && style.mobile_max_font_size != null && style.mobile_font_size_vw != null) {
    css.fontSize = `clamp(${style.mobile_min_font_size}rem, ${style.mobile_font_size_vw}vw, ${style.mobile_max_font_size}rem)`;
  }

  return css;
};

const CSS_PROP_TO_KEBAB: Record<string, string> = {
  fontSize: 'font-size',
  fontWeight: 'font-weight',
  fontFamily: 'font-family',
  fontStyle: 'font-style',
  textDecoration: 'text-decoration',
  color: 'color',
  lineHeight: 'line-height',
};

// Inline styles can't be conditional on viewport width, so mobile overrides
// can't be applied via the same :style binding as the rest of a resolved
// text style - they need a real stylesheet rule with a @media query.
// Returns the raw CSS text for a <style> tag scoped to one field via an
// attribute selector, or null when there's nothing to override.
// !important is required: it has to beat the field's own component-level
// SCSS (e.g. Hero.vue's `.hero-title { @media {...} }`), which is exactly
// the "CMS override wins" behavior the desktop inline style already gets for
// free via specificity - !important is how that same intent is achieved
// here, since a real stylesheet rule can't otherwise out-specificity a
// same-origin component rule reliably.
export const resolveMobileTextStyleOverrideCss = (
  style: TextStyle | null | undefined,
  contentKey: string,
): string | null => {
  const overrides = resolveMobileStyleOverrides(style);
  const props = Object.keys(overrides);
  if (!props.length) return null;

  const decls = props.map((key) => `${CSS_PROP_TO_KEBAB[key] ?? key}: ${overrides[key]} !important;`).join(' ');
  return `@media screen and (max-width: ${TEXT_STYLE_MOBILE_BREAKPOINT}px) { [data-cms-key="${contentKey}"] { ${decls} } }`;
};
