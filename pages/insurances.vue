<template>
  <section class="heroSection">
    <Hero />
  </section>
  <section id="eligibility" class="eligibilitySection">
    <EligibilityForm />
  </section>
  <section class="coverageSection">
    <Coverage />
  </section>
  <section class="faqSection">
    <FaqSection page-key="insurances" title-default="FAQs" subtitle-default="Our team will contact you within 30 minutes"
      :faqs="data?.FAQs || []" />
  </section>
</template>

<script lang="ts" setup>
import Hero from '~/components/Insurances/Hero.vue';
import EligibilityForm from '~/components/Insurances/EligibilityForm.vue';
import Coverage from '~/components/Insurances/Coverage.vue';
import FaqSection from '~/components/shared/FaqSection.vue';
import insurancesSeo from '~/assets/seoMetaTags/insurances';
import type { FAQs } from '~/sharedComponents/FAQs/FAQs';
import type { Blog, Campaign, Career, Content, HttpClinics, Insurance, Service, Staff, TrustedBy } from '~/types/types';

type HomeData = {
  clinics: HttpClinics[];
  services: Service[];
  campaigns: Campaign[];
  insurances: Insurance[];
  whoWeAre: Content;
  staff: Staff[];
  careers: Career[];
  trustedBy: TrustedBy[];
  FAQs: FAQs[];
  blogs: Blog[];
};

const { data, pending, error } = await useFetch<HomeData>(
  `${useUrl()}/web/home`,
);

provide('homepageData', data);
provide('homepagePending', pending);
provide('homepageError', error);

const {
  contentMap: pageContentMap,
  isContentEditor: pageIsContentEditor,
  textStyles: pageTextStyles,
  pageMeta: pageMetaData,
} = await usePageContent('insurances');
providePageContent('insurances', pageContentMap, pageIsContentEditor, pageTextStyles, pageMetaData);

usePageSeo(insurancesSeo, pageMetaData);
</script>

<style scoped lang="scss">
.heroSection,
.eligibilitySection,
.coverageSection,
.faqSection {
  width: 100%;
}
</style>
