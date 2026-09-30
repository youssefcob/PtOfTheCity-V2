import { readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { defineNuxtModule } from '@nuxt/kit';

// Collects every static page route (no [param] segments) from pages/ at
// startup and exposes it as runtimeConfig.sitemapStaticPages, so the sitemap
// (server/utils/sitemap.ts) always lists current pages without a hand-kept
// list. Admin pages are never included. Restart the dev server after adding
// a page file.
const collectRoutes = (dir: string, root: string): string[] => {
  const routes: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      routes.push(...collectRoutes(full, root));
      continue;
    }
    if (!entry.endsWith('.vue')) continue;
    const route = '/' + relative(root, full).replace(/\\/g, '/').replace(/\.vue$/, '').replace(/(^|\/)index$/, '');
    if (route.includes('[')) continue;
    routes.push(route.replace(/\/+$/, '') || '/');
  }
  return routes;
};

export default defineNuxtModule({
  meta: { name: 'sitemap-pages' },
  setup(_options, nuxt) {
    const pagesDir = join(nuxt.options.srcDir, 'pages');
    const routes = collectRoutes(pagesDir, pagesDir)
      .filter((route) => route !== '/admin' && !route.startsWith('/admin/'))
      .sort();
    nuxt.options.runtimeConfig.sitemapStaticPages = routes;
  },
});
