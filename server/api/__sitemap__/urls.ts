// The only source for /sitemap.xml (nuxt.config: excludeAppSources: true).
// Pages found automatically + admin overrides + manual urls, minus excluded
// ones; see server/utils/sitemap.ts.
export default defineSitemapEventHandler(async () => {
  const rows = await buildSitemapRows();
  return rows
    .filter((row) => !row.excluded)
    .map((row) =>
      asSitemapUrl({
        loc: row.url,
        priority: row.priority as 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1,
        changefreq: row.changefreq,
        ...(row.lastmod ? { lastmod: row.lastmod } : {}),
      }),
    );
});
