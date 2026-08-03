export const usePageSeo = (seo: any) => {
  const route = useRoute();
  const config = useRuntimeConfig();

  const baseUrl = config.public.siteUrl || "https://www.ptofthecity.com";

  const currentUrl = computed(() => seo.canonical || `${baseUrl}${route.path}`);

  useSeoMeta({
    title: seo.title,
    description: seo.description,

    ...(seo.ogType && { ogType: seo.ogType }),
    ...(seo.ogTitle && { ogTitle: seo.ogTitle }),
    ...(seo.ogDescription && { ogDescription: seo.ogDescription }),
    ...(seo.ogImage && { ogImage: seo.ogImage }),
    ...(seo.ogUrl && { ogUrl: seo.ogUrl }),
    ...(seo.type && { type: seo.type }),
    ...(seo.robots && { robots: seo.robots }),
    ...(seo.twitterCard && { twitterCard: seo.twitterCard }),
    ...(seo.twitterTitle && { twitterTitle: seo.twitterTitle }),
    ...(seo.twitterDescription && { twitterDescription: seo.twitterDescription }),
    ...(seo.twitterUrl && { twitterUrl: seo.twitterUrl }),
    ...(seo.twitterTitle && { twitterTitle: seo.twitterTitle }),
    ...(seo.twitterImage && { twitterImage: seo.twitterImage }),
    ...(seo.twitterSite && { twitterSite: seo.twitterSite }),
  });

  useHead({
    link: [
      {
        rel: "canonical",
        href: currentUrl,
      },
    ],
  });
};