// Builds the sitemap: pages found automatically (static pages + records from
// the API) with admin overrides applied, plus admin-added manual URLs.
// Used by the public sitemap source (server/api/__sitemap__/urls.ts) and the
// /admin/sitemap page (server/api/__sitemap__/manage.get.ts).

export type Changefreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

export interface SitemapDefaults {
  priority: number;
  changefreq: Changefreq;
  lastmod: string | null;
  excluded: boolean;
}

export interface SitemapOverride {
  id: number;
  url: string;
  priority: number | string | null;
  changefreq: Changefreq | null;
  lastmod: string | null;
  excluded: boolean | number;
  is_manual: boolean | number;
}

export interface SitemapRow {
  url: string;
  source: 'auto' | 'manual';
  priority: number;
  changefreq: Changefreq;
  lastmod: string | null;
  excluded: boolean;
  /** the admin override for this url, if any */
  entryId: number | null;
  /** what the url would use without an override (null for manual urls) */
  defaults: SitemapDefaults | null;
  /** the raw admin-set values (null = follows the default) */
  override: { priority: number | null; changefreq: Changefreq | null; lastmod: string | null };
}

/** Same rule as the API: no query/hash, leading "/", no trailing "/" (except root). */
export const normalizeSitemapPath = (path: string) => {
  const clean = path.split(/[?#]/)[0].trim();
  const withSlash = clean.startsWith('/') ? clean : `/${clean}`;
  return withSlash.replace(/\/+$/, '') || '/';
};

// Static pages that shouldn't be indexed unless an admin turns them back on.
const DEFAULT_EXCLUDED = new Set([
  '/vid',
  '/who-we-are',
  '/bench-craft-golf/booking-old',
  '/beyondmed/booking',
  '/teletherapy/booking',
  '/teletherapy/success',
]);

const KEY_PAGES = new Set([
  '/about', '/careers', '/contact', '/insurances', '/partnerships', '/booking', '/blogs', '/FAQs', '/conditions',
  '/new-patients-guide', '/existing-patients-guide', '/patients-referral', '/physicians-referral', '/teletherapy',
]);

const staticDefaults = (url: string): SitemapDefaults => ({
  priority: url === '/' ? 1 : KEY_PAGES.has(url) ? 0.8 : 0.6,
  changefreq: url === '/' ? 'daily' : KEY_PAGES.has(url) ? 'weekly' : 'monthly',
  lastmod: null,
  excluded: DEFAULT_EXCLUDED.has(url),
});

type Dated = { slug: string; updated_at: string | null };
interface ApiSitemap {
  clinic?: Dated[];
  service?: Dated[];
  blogs?: Dated[];
  staff?: Dated[];
  careers?: Dated[];
  clinics?: string[];
}

const dayOf = (iso: string | null | undefined) => (iso ? iso.slice(0, 10) : null);

/** Every page the site finds on its own, with its default settings. */
export const buildAutoUrls = async (): Promise<Map<string, SitemapDefaults>> => {
  const config = useRuntimeConfig();
  const urls = new Map<string, SitemapDefaults>();

  for (const route of (config.sitemapStaticPages as string[]) || []) urls.set(route, staticDefaults(route));

  const data = await $fetch<ApiSitemap>(`${config.public.url}/sitemap`).catch(() => ({} as ApiSitemap));
  const add = (items: Dated[] | undefined, prefix: string, priority: number, changefreq: Changefreq) => {
    for (const item of items || []) {
      if (item?.slug) urls.set(`${prefix}/${item.slug}`, { priority, changefreq, lastmod: dayOf(item.updated_at), excluded: false });
    }
  };
  add(data.service, '/service', 0.9, 'monthly');
  add(data.clinic, '/clinic', 0.8, 'monthly');
  add(data.blogs, '/blogs', 0.7, 'monthly');
  add(data.careers, '/careers', 0.6, 'weekly');
  add(data.staff, '/staff', 0.6, 'monthly');
  // borough pages; the clinics page serves "The Bronx" at /clinics/the-bronx
  const boroughSlug = (city: string) => {
    const slug = city.toLowerCase().trim().replace(/\s+/g, '-');
    return slug === 'bronx' ? 'the-bronx' : slug;
  };
  urls.set('/clinics/all', { priority: 0.8, changefreq: 'weekly', lastmod: null, excluded: false });
  for (const city of data.clinics || []) {
    if (city) urls.set(`/clinics/${boroughSlug(city)}`, { priority: 0.8, changefreq: 'monthly', lastmod: null, excluded: false });
  }
  return urls;
};

export const fetchSitemapOverrides = async (): Promise<SitemapOverride[]> => {
  const config = useRuntimeConfig();
  return $fetch<SitemapOverride[]>(`${config.public.url}/sitemap/entries`).catch(() => []);
};

/** Auto urls with overrides applied, then manual urls. Includes excluded rows. */
export const buildSitemapRows = async (): Promise<SitemapRow[]> => {
  const [auto, overrides] = await Promise.all([buildAutoUrls(), fetchSitemapOverrides()]);
  const byUrl = new Map(overrides.map((o) => [normalizeSitemapPath(o.url), o]));
  const rows: SitemapRow[] = [];

  for (const [url, defaults] of auto) {
    const o = byUrl.get(url);
    byUrl.delete(url);
    rows.push({
      url,
      source: 'auto',
      priority: o?.priority != null ? Number(o.priority) : defaults.priority,
      changefreq: o?.changefreq || defaults.changefreq,
      lastmod: o?.lastmod ? dayOf(o.lastmod) : defaults.lastmod,
      excluded: o ? Boolean(o.excluded) : defaults.excluded,
      entryId: o?.id ?? null,
      defaults,
      override: {
        priority: o?.priority != null ? Number(o.priority) : null,
        changefreq: o?.changefreq || null,
        lastmod: o?.lastmod ? dayOf(o.lastmod) : null,
      },
    });
  }

  // anything left over matches no real page: an admin-added url
  for (const [url, o] of byUrl) {
    rows.push({
      url,
      source: 'manual',
      priority: o.priority != null ? Number(o.priority) : 0.5,
      changefreq: o.changefreq || 'monthly',
      lastmod: dayOf(o.lastmod),
      excluded: Boolean(o.excluded),
      entryId: o.id,
      defaults: null,
      override: {
        priority: o.priority != null ? Number(o.priority) : null,
        changefreq: o.changefreq || null,
        lastmod: dayOf(o.lastmod),
      },
    });
  }

  return rows.sort((a, b) => b.priority - a.priority || a.url.localeCompare(b.url));
};
