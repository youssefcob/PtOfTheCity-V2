<template>
  <section class="heroSection">
    <ReferralHero page-key="physicians-referral" eyebrow-default="For Referring Physicians"
      title-default="Together, we get patients better."
      description-default="When you refer a patient to PT of the City, you're partnering with a team committed to timely communication, evidence-based treatment, and exceptional patient care. From referral to recovery, we keep you informed every step of the way."
      cta-label-default="Refer a Patient" cta-target="#form" />
  </section>
  <section class="howItWorksSection">
    <HowItWorks />
  </section>
  <section class="formSection">
    <ReferralForm />
  </section>
  <section class="faqSection">
    <FaqSection page-key="physicians-referral" title-default="Frequently Asked Questions"
      subtitle-default="Our team will contact you within 30 minutes" :faqs="data?.FAQs || []" />
  </section>
</template>

<script lang="ts" setup>
import ReferralHero from '~/components/shared/ReferralHero.vue';
import HowItWorks from '~/components/PhysiciansReferral/HowItWorks.vue';
import ReferralForm from '~/components/PhysiciansReferral/ReferralForm.vue';
import FaqSection from '~/components/shared/FaqSection.vue';
import physiciansReferralSeo from '~/assets/seoMetaTags/physicians-referral';
import type { FAQs } from '~/sharedComponents/FAQs/FAQs';
import type { Insurance } from '~/types/types';

type HomeData = {
  insurances: Insurance[];
  FAQs: FAQs[];
};

const { data } = await useFetch<HomeData>(`${useUrl()}/web/home`);

provide('homepageData', data);

const {
  contentMap: pageContentMap,
  isContentEditor: pageIsContentEditor,
  textStyles: pageTextStyles,
  pageMeta: pageMetaData,
} = await usePageContent('physicians-referral');
providePageContent('physicians-referral', pageContentMap, pageIsContentEditor, pageTextStyles, pageMetaData);

usePageSeo(physiciansReferralSeo, pageMetaData);
</script>

<style scoped lang="scss">
.heroSection,
.howItWorksSection,
.formSection,
.faqSection {
  width: 100%;
}
</style>
