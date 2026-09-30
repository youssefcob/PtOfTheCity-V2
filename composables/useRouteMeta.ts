import type { PageMeta } from '~/types/content';

// Per-URL meta tags. Editors set them from the page itself (Manage Meta Tags
// in the editor toolbar → PageMetaPanel), keyed by the URL path, so every
// dynamic page (each clinic, job, blog post, campaign…) can have its own.
//
// Precedence, lowest to highest:
//   1. the page's own SEO (assets/seoMetaTags/* or page code)
//   2. legacy per-page-type CMS meta applied by usePageSeo (e.g. "home")
//   3. this per-URL meta, pushed with tagPriority "critical" so it wins no
//      matter which component registered its tags first.
// Fields left empty fall through to the layers below.

/** "/clinic/foo/" → "/clinic/foo"; "" → "/". No query or hash. */
export const routeMetaKey = (path: string) => path.split(/[?#]/)[0].replace(/\/+$/, '') || '/';

/** Shared store of loaded per-URL meta, so the panel's saves show up at once. */
export const useRouteMetaStore = () => useState<Record<string, PageMeta | null>>('route-meta', () => ({}));

export const useRouteMeta = async () => {
  const route = useRoute();
  const config = useRuntimeConfig();
  const baseUrl = config.public.siteUrl || 'https://www.ptofthecity.com';
  const { fetchPageMeta } = useContentApi();
  const store = useRouteMetaStore();

  const key = computed(() => routeMetaKey(route.path));

  const current = computed(() => store.value[key.value] ?? null);

  useHead(
    () => {
      const meta = current.value;
      if (!meta) return {};

      const tags: Record<string, string>[] = [];
      const add = (attr: 'name' | 'property', key: string, content?: string | null) => {
        if (content) tags.push({ [attr]: key, content });
      };

      add('name', 'description', meta.description);
      add('property', 'og:title', meta.title);
      add('property', 'og:description', meta.description);
      add('name', 'twitter:title', meta.title);
      add('name', 'twitter:description', meta.description);
      add('property', 'og:image', meta.og_image);
      add('name', 'twitter:image', meta.og_image);
      for (const tag of meta.customTags || []) add(tag.attribute, tag.meta_key, tag.content);

      const canonical = meta.canonical
        ? meta.canonical.startsWith('http') ? meta.canonical : `${baseUrl}${meta.canonical}`
        : null;

      return {
        ...(meta.title ? { title: meta.title } : {}),
        meta: tags,
        link: canonical ? [{ rel: 'canonical', href: canonical }] : [],
      };
    },
    { tagPriority: 'critical' },
  );

  // Awaited last: useHead above has to register before this await, because
  // after it the component context is gone and useHead can't find the head.
  // Runs during SSR and again whenever the path changes on the client. The
  // store is useState, so SSR results reach the client in the payload.
  await useAsyncData(
    'route-meta',
    // returns an object, never null: a null result makes Nuxt refetch on the client
    async () => {
      const path = key.value;
      if (!(path in store.value)) {
        const meta = await fetchPageMeta(path).catch(() => null);
        store.value = { ...store.value, [path]: meta };
      }
      return { path, meta: store.value[path] };
    },
    { watch: [key] },
  );

  return { key, meta: current };
};
