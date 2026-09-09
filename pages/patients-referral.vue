<template>
  <section class="heroSection">
    <ReferralHero page-key="patients-referral" eyebrow-default="Patient Referrals"
      title-default="Need a Referral? We'll Help You Get Started."
      description-default="Some insurance plans require a physician referral before beginning physical therapy. Our team is here to guide you through the process and help you take the next step toward recovery." />
  </section>
  <section class="formSection">
    <ReferralForm />
  </section>
  <section class="howItWorksSection">
    <HowItWorks />
  </section>
  <section class="faqSection">
    <FaqSection page-key="patients-referral" title-default="FAQs"
      subtitle-default="Our team will contact you within 30 minutes" :faqs="data?.FAQs || []" />
  </section>
</template>

<script lang="ts" setup>
import ReferralHero from '~/components/shared/ReferralHero.vue';
import ReferralForm from '~/components/PatientsReferral/ReferralForm.vue';
import HowItWorks from '~/components/PatientsReferral/HowItWorks.vue';
import FaqSection from '~/components/shared/FaqSection.vue';
import patientsReferralSeo from '~/assets/seoMetaTags/patients-referral';
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
} = await usePageContent('patients-referral');
providePageContent('patients-referral', pageContentMap, pageIsContentEditor, pageTextStyles, pageMetaData);

usePageSeo(patientsReferralSeo, pageMetaData);
</script>

<style scoped lang="scss">
.heroSection,
.formSection,
.howItWorksSection,
.faqSection {
  width: 100%;
}
</style>
