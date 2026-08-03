<script setup lang="ts">
import HeroSection from "~/components/Telehealth/HeroSection.vue";
import ConditionsSection from "~/components/Telehealth/ConditionsSection.vue";
import HowItWorksSection from "~/components/Telehealth/HowItWorksSection.vue";
import ServicesSection from "~/components/Telehealth/ServicesSection.vue";
import CoverageSection from "~/components/Telehealth/CoverageSection.vue";
import FaqSection from "~/components/Telehealth/FaqSection.vue";

usePageSeo({

})

const pageSeoSchema = await import(`~/assets/TeletherapySeoSchema/teletherapy.json`).catch(
  () => null,
);
const pageSeoMetaTags = await import(`~/assets/seoMetaTags/teletherapy/teletherapy`)
  .then((module) => module.default)
  .catch(() => null);
useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify(pageSeoSchema?.default || {name:"PT"}),
    }
  ],
});
usePageSeo(
  pageSeoMetaTags || {},
);
</script>

<template>
  <div style="background-color: white;">
    <HeroSection />
    <div style="margin-top: 7rem;">
      <HowItWorksSection />
    </div>
    <!-- <div style="margin-top: 7rem;">
      <ConditionsSection />
    </div> -->
    <div style="margin-top: 7rem;">
      <ServicesSection />
    </div>
    <div style="margin-top: 4rem;">
      <CoverageSection />
    </div>
    <div style="margin-top: 7rem; padding-bottom: 7rem;">
      <FaqSection />
      </div>
  </div>
</template>
