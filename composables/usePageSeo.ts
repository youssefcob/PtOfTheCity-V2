import { FEATURES } from '~/config/features';
import type { PageMeta } from '~/types/content';

// Admin-editable SEO overrides layer on top of the existing static seo
// objects (assets/seoMetaTags/*) rather than replacing them - the CMS page
// meta (title/description/canonical/og image/custom tags) wins when set,
// the hardcoded defaults are the fallback, same "never render half-empty"
// rule as the rest of the CMS content. Gated by FEATURES.metaTags so
// disabling it reverts every page to 100% hardcoded defaults.
//
// pageMeta is passed in directly rather than injected: this is always called
// from the same page component that already called providePageContent/holds
// the pageMeta ref locally - inject() always resolves starting from the
// PARENT's provides, never the current instance's own, so a component can
// never inject something it just provided itself.
export const usePageSeo = (seo: any, pageMeta?: Ref<PageMeta | null>) => {
  const route = useRoute();
  const config = useRuntimeConfig();

  const baseUrl = config.public.siteUrl || "https://www.ptofthecity.com";

  const cmsMeta = FEATURES.metaTags ? pageMeta : undefined;

  const effectiveTitle = computed(() => cmsMeta?.value?.title || seo.title);
  const effectiveDescription = computed(() => cmsMeta?.value?.description || seo.description);
  const effectiveOgImage = computed(() => cmsMeta?.value?.og_image || seo.ogImage);

  const currentUrl = computed(() => {
    const override = cmsMeta?.value?.canonical;
    if (override) return override.startsWith('http') ? override : `${baseUrl}${override}`;
    return seo.canonical || `${baseUrl}${route.path}`;
  });

  useSeoMeta({
    title: effectiveTitle,
    description: effectiveDescription,

    ogSiteName: seo.ogSiteName || "PT of the City",
    ...(seo.ogType && { ogType: seo.ogType }),
    ogTitle: computed(() => seo.ogTitle || effectiveTitle.value),
    ogDescription: computed(() => seo.ogDescription || effectiveDescription.value),
    ogImage: effectiveOgImage,
    ...(seo.ogUrl && { ogUrl: seo.ogUrl }),
    ...(seo.type && { type: seo.type }),
    ...(seo.robots && { robots: seo.robots }),
    ...(seo.twitterCard && { twitterCard: seo.twitterCard }),
    twitterTitle: computed(() => seo.twitterTitle || effectiveTitle.value),
    twitterDescription: computed(() => seo.twitterDescription || effectiveDescription.value),
    ...(seo.twitterUrl && { twitterUrl: seo.twitterUrl }),
    twitterImage: computed(() => seo.twitterImage || effectiveOgImage.value),
    ...(seo.twitterSite && { twitterSite: seo.twitterSite }),
  });

  useHead({
    link: [
      {
        rel: "canonical",
        href: currentUrl,
      },
    ],
    meta: computed(() =>
      (cmsMeta?.value?.customTags || []).map((tag) => ({
        [tag.attribute]: tag.meta_key,
        content: tag.content,
      })),
    ),
  });
};
