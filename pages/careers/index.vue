<template>
  <div class="careers-page">
    <CareersHero />
    <CareersWhyJoin class="why-join-section" />
    <CareersGrow class="grow-section" />
    <CareersPositions class="positions-section" :jobs="data || []" :pending="pending" :error="!!error" />
  </div>
</template>

<script setup lang="ts">
import CareersHero from '~/components/Careers/CareersHero.vue';
import CareersWhyJoin from '~/components/Careers/CareersWhyJoin.vue';
import CareersGrow from '~/components/Careers/CareersGrow.vue';
import CareersPositions from '~/components/Careers/CareersPositions.vue';
import careersSeo from '~/assets/seoMetaTags/careers';
import type { Job } from '~/types/types';

const { data, pending, error } = await useFetch<Job[]>(`${useUrl()}/web/careers`);

const {
  contentMap: pageContentMap,
  isContentEditor: pageIsContentEditor,
  textStyles: pageTextStyles,
  pageMeta: pageMetaData,
} = await usePageContent('careers');
providePageContent('careers', pageContentMap, pageIsContentEditor, pageTextStyles, pageMetaData);

usePageSeo(careersSeo, pageMetaData);
</script>

<style scoped lang="scss">
// Vertical rhythm between sections, from the Figma frame
.careers-page {
  width: 100%;
  overflow: hidden;
  padding-bottom: 12rem;

  // the mobile Figma sits the white sections on a cream page
  @media screen and (max-width: 900px) {
    padding-bottom: 0;
    background-color: $surface-cream;
  }
}

.why-join-section {
  margin-top: 1.5rem;
}

.grow-section {
  margin-top: 6rem;
}

.positions-section {
  margin-top: 11.8rem;
}

@media screen and (max-width: 900px) {
  .why-join-section,
  .grow-section,
  .positions-section {
    margin-top: 0;
  }
}
</style>
