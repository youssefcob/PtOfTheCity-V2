import type { StudioEnvelope, StudioFolder } from '~/types/types';

// Fetches the published Studio (headless CMS) page for a folder + slug through
// the site's own proxy (server/api/studio) and applies its stylesheet, fonts,
// script and head data. `doc` is null when Studio has nothing published for
// that slug, so callers fall back to their API-driven layout.
//
// Studio's own canonical points at the Studio server and its jsonLd is always
// empty, so neither is used - pages keep their own.
export const useStudioDoc = async (folder: StudioFolder, slug: MaybeRefOrGetter<string | null | undefined>) => {
  const request = useAsyncData<StudioEnvelope | null>(
    `studio:${folder}:${toValue(slug) || ''}`,
    async () => {
      const value = toValue(slug);
      if (!value) return null;
      try {
        return await $fetch<StudioEnvelope>(`/api/studio/${folder}/${encodeURIComponent(value)}`);
      } catch {
        return null;
      }
    },
  );

  const doc = request.data;

  // Registered before the await below: after it this composable no longer
  // has the component context useHead needs.
  useHead(computed(() => {
    const envelope = doc.value;
    if (!envelope) return {};

    const stylesheets = [...(envelope.theme?.fontStylesheets || []), envelope.assets?.css].filter(Boolean) as string[];
    const head = envelope.head || {};

    return {
      ...(head.title ? { title: head.title } : {}),
      meta: [
        ...(head.description ? [{ name: 'description', content: head.description }] : []),
        ...(head.meta || []).map((meta) => ({ name: meta.name, content: meta.value })),
      ],
      link: stylesheets.map((href) => ({ rel: 'stylesheet', href, key: href })),
      // A classic script that binds on execution; StudioContent re-runs its
      // idempotent init after each mount for client-side navigation.
      script: envelope.assets?.js ? [{ src: envelope.assets.js, defer: true, key: envelope.assets.js }] : [],
    };
  }));

  await request;

  return { doc };
};
