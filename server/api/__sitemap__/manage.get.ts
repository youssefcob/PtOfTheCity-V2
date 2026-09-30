// Every sitemap url with its source, effective settings and defaults,
// including excluded ones, for the /admin/sitemap page. Read-only; changes go
// to the API's editor-only sitemap-entries endpoints.
export default defineEventHandler(async (event) => {
  setHeader(event, 'Cache-Control', 'no-store');
  return buildSitemapRows();
});
