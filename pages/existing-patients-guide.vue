<template>
  <section class="heroSection">
    <ReferralHero page-key="existing-patients-guide" eyebrow-default="Existing Patients"
      title-default="Everything You Need for Your Next Visit."
      description-default="Whether you're continuing treatment or preparing for your next appointment, we're here to make every visit smooth, convenient, and focused on your recovery."
      cta-label-default="Manage Your Appointment" cta-target="/booking" />
  </section>
  <section class="journeySection">
    <JourneySteps page-key="existing-patients-guide" />
  </section>
  <section class="prepSection">
    <AppointmentPreparation />
  </section>
  <section class="faqSection">
    <FaqSection page-key="existing-patients-guide" title-default="FAQs"
      subtitle-default="Our team will contact you within 30 minutes" :faqs="data?.FAQs || []" />
  </section>
</template>

<script lang="ts" setup>
import ReferralHero from '~/components/shared/ReferralHero.vue';
import JourneySteps from '~/components/shared/JourneySteps.vue';
import AppointmentPreparation from '~/components/ExistingPatientsGuide/AppointmentPreparation.vue';
import FaqSection from '~/components/shared/FaqSection.vue';
import existingPatientsGuideSeo from '~/assets/seoMetaTags/existing-patients-guide';
import type { FAQs } from '~/sharedComponents/FAQs/FAQs';

type HomeData = {
  FAQs: FAQs[];
};

const { data } = await useFetch<HomeData>(`${useUrl()}/web/home`);

const {
  contentMap: pageContentMap,
  isContentEditor: pageIsContentEditor,
  textStyles: pageTextStyles,
  pageMeta: pageMetaData,
} = await usePageContent('existing-patients-guide');
providePageContent('existing-patients-guide', pageContentMap, pageIsContentEditor, pageTextStyles, pageMetaData);

usePageSeo(existingPatientsGuideSeo, pageMetaData);
</script>

<style scoped lang="scss">
.heroSection,
.journeySection,
.prepSection,
.faqSection {
  width: 100%;
}
</style>
