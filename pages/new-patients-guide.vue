<template>
  <section class="heroSection">
    <ReferralHero page-key="new-patients-guide" eyebrow-default="New Patients Guide"
      title-default="Your First Visit Starts Here."
      description-default="Starting physical therapy is an important step toward feeling better. From scheduling your first appointment to beginning your personalized treatment plan, we're here to guide you through every step of the journey."
      cta-label-default="Schedule Your First Visit" cta-target="/booking" />
  </section>
  <section class="journeySection">
    <JourneySteps page-key="new-patients-guide" />
  </section>
  <section class="bringSection">
    <ThingsToBring />
  </section>
  <section class="teasersSection">
    <CoverageReferralTeasers />
  </section>
  <section class="readySection">
    <ReadyToBegin />
  </section>
  <section class="faqSection">
    <FaqSection page-key="new-patients-guide" title-default="FAQs"
      subtitle-default="Our team will contact you within 30 minutes" :faqs="data?.FAQs || []" />
  </section>
</template>

<script lang="ts" setup>
import ReferralHero from '~/components/shared/ReferralHero.vue';
import JourneySteps from '~/components/shared/JourneySteps.vue';
import ThingsToBring from '~/components/NewPatientsGuide/ThingsToBring.vue';
import CoverageReferralTeasers from '~/components/NewPatientsGuide/CoverageReferralTeasers.vue';
import ReadyToBegin from '~/components/NewPatientsGuide/ReadyToBegin.vue';
import FaqSection from '~/components/shared/FaqSection.vue';
import newPatientsGuideSeo from '~/assets/seoMetaTags/new-patients-guide';
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
} = await usePageContent('new-patients-guide');
providePageContent('new-patients-guide', pageContentMap, pageIsContentEditor, pageTextStyles, pageMetaData);

usePageSeo(newPatientsGuideSeo, pageMetaData);
</script>

<style scoped lang="scss">
.heroSection,
.journeySection,
.bringSection,
.teasersSection,
.readySection,
.faqSection {
  width: 100%;
}
</style>
