<template>
  <div class="about-page">
    <AboutHero />
    <AboutValues class="values-section" />
    <AboutLeadership class="leadership-section" />
    <AboutPrograms class="programs-section" :services="data?.services || []" />
    <AboutCommunity class="community-section" />
    <FindClinicBand class="find-clinic-section" page-key="about" to="/clinics/all"
      image-src="/images/about/nyc-street-signs.webp"
      image-alt="New York street signs for The Bronx, Brooklyn, Queens and Manhattan" />
  </div>
</template>

<script setup lang="ts">
import AboutHero from '~/components/About/AboutHero.vue';
import AboutValues from '~/components/About/AboutValues.vue';
import AboutLeadership from '~/components/About/AboutLeadership.vue';
import AboutPrograms from '~/components/About/AboutPrograms.vue';
import AboutCommunity from '~/components/About/AboutCommunity.vue';
import FindClinicBand from '~/components/shared/FindClinicBand.vue';
import aboutSeo from '~/assets/seoMetaTags/about';
import type { Service } from '~/types/types';

type AboutPage = {
  services: Service[];
};

const { data } = await useFetch<AboutPage>(`${useUrl()}/web/about`);

const {
  contentMap: pageContentMap,
  isContentEditor: pageIsContentEditor,
  textStyles: pageTextStyles,
  pageMeta: pageMetaData,
} = await usePageContent('about');
providePageContent('about', pageContentMap, pageIsContentEditor, pageTextStyles, pageMetaData);

usePageSeo(aboutSeo, pageMetaData);
</script>

<style scoped lang="scss">
// Vertical rhythm between sections, from the Figma frame
.about-page {
  width: 100%;
  overflow: hidden;
}

.values-section {
  margin-top: 13.8rem;
}

.leadership-section {
  margin-top: 12.4rem;
}

.programs-section {
  margin-top: 4.7rem;
}

.community-section {
  margin-top: 10.4rem;
}

.find-clinic-section {
  margin-top: 11.8rem;
}

@media screen and (max-width: 900px) {
  .values-section,
  .leadership-section,
  .programs-section,
  .community-section,
  .find-clinic-section {
    margin-top: 6.4rem;
  }
}
</style>
