<template>
  <div>
    <HeroSection />
    <PerksSection/>
    <Services />
    <Reviews />
    <FinalCtaSection />
  </div>
</template>

<script lang="ts" setup>
import FinalCtaSection from '~/components/Nyfoundling/FinalCtaSection.vue';
import HeroSection from '~/components/Nyfoundling/HeroSection.vue';
import PerksSection from '~/components/Nyfoundling/PerksSection.vue';
import Reviews from '~/components/Nyfoundling/Reviews.vue';
import Services from '~/components/Nyfoundling/Services.vue';


definePageMeta({ layout: false });
</script>

<style>

</style>