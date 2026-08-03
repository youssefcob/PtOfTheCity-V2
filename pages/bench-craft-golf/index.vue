<script setup lang="ts">
import HeroSection from '~/components/Benchcraft/HeroSection.vue';
import HeroStrap from '~/components/Benchcraft/HeroStrap.vue';
import AboutSection from '~/components/Benchcraft/AboutSection.vue';
import GolfersElbow from '~/components/Benchcraft/GolfersElbow.vue';
import Evaluation from '~/components/Benchcraft/Evaluation.vue';
import OurApproach from '~/components/Benchcraft/OurApproach.vue';
import OurServices from '~/components/Benchcraft/OurServices.vue';
import OurClinics from '~/components/Benchcraft/OurClinics.vue';
import SelfPay from '~/components/Benchcraft/SelfPay.vue';
import TrustedBy from '~/components/Benchcraft/TrustedBy.vue';
import MemberAccess from '~/components/Benchcraft/MemberAccess.vue';
const pageSeoSchema = await import(`~/assets/BenchcraftSeoSchema/benchcraft.json`).catch(
  () => null,
);
const pageSeoMetaTags = await import(`~/assets/seoMetaTags/benchcraft/benchcraft`)
  .then((module) => module.default)
  .catch(() => null);

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(pageSeoSchema?.default || { name: 'PT' }),
    },
  ],
});
usePageSeo(
  pageSeoMetaTags || {},
);
</script>

<template>
  <div class="benchcraft-container">
    <HeroSection id="booking-form" />
    <!-- <HeroStrap /> -->
    <AboutSection />
    <GolfersElbow />
    <Evaluation />
    <OurApproach />
    <OurServices />
    <OurClinics />
    <SelfPay />
    <TrustedBy />
    <MemberAccess />
  </div>
</template>

<style scoped lang="scss">
.benchcraft-container {
  width: 100%;
  // padding-top: calc($navbarHeight + 2vh);
  overflow: hidden;
}
</style>
