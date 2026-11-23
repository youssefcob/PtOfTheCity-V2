<script lang="ts" setup>
import type { Clinic } from '~/types/types';

definePageMeta({ layout: false });

const title = 'Crunch Inwood Member Perk | PT of the City';
const description =
  'Crunch Inwood members: claim a complimentary 1-on-1 physical therapy assessment and redeem it at any PT of the City clinic across NYC.';

usePageSeo({
  title,
  description,
  ogType: 'website',
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://res.cloudinary.com/dzilc11zf/image/upload/v1790170990/a4a4f48dbb442ca6e2636a81491b8caeb3cbfbb1_cy5c0o.webp',
});

useHead({
  htmlAttrs: { lang: 'en' },
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    // Inter for body copy. Arimo is an Arial clone that only downloads where Arial isn't installed (Android, Linux).
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Arimo:wght@700&family=Inter:wght@400;600;700&display=swap' },
  ],
});

const { data: clinicsByBorough } = await useFetch<Record<string, Clinic[]>>(`${useUrl()}/web/clinics`);

// Falls back to the network size in the design copy if the clinics request fails.
const clinicCount = computed(
  () => Object.values(clinicsByBorough.value ?? {}).reduce((sum, clinics) => sum + clinics.length, 0) || 32,
);
</script>

<template>
  <div class="crunch-page">
    <main>
      <CrunchHero />
      <CrunchCoverage />
      <CrunchBenefits :clinic-count="clinicCount" />
      <CrunchUrgencyBar />
      <CrunchClaimForm :clinic-count="clinicCount" />
      <CrunchLocations :clinics-by-borough="clinicsByBorough ?? {}" :clinic-count="clinicCount" />
      <CrunchComebackCta />
    </main>
    <CrunchFooter />
  </div>
</template>

<style lang="scss">
.crunch-page {
  --crunch-gutter: max(72px, calc((100% - 1296px) / 2));

  background: #fff;
  color: $crunch-ink;
  font-family: $crunch-font-body;
  font-size: 16px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;

  @media screen and (max-width: 1100px) {
    --crunch-gutter: 40px;
  }

  @media screen and (max-width: 800px) {
    --crunch-gutter: 20px;
  }
}

// Unscoped on purpose. global.scss is injected into every component's <style scoped>, so the site-wide
// element rules in _classes.scss (h1–h4, p, span, li, a) are re-emitted per component as e.g.
// `p[data-v-…]`, specificity (0,1,1). These `html body .crunch-page …` selectors (0,1,2+) beat those
// while staying below the sections' own class rules (0,2,0).
html body .crunch-page {
  * {
    font-family: inherit;
    line-height: inherit;
  }

  :is(h1, h2, h3, p, span, a, li, label, button, input) {
    margin: 0;
    color: inherit;
    font-size: inherit;
    font-weight: inherit;
    letter-spacing: normal;
  }
}
</style>
