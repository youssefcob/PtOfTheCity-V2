<script setup lang="ts">
import HeroSection from '~/components/SensoryFreeway/HeroSection.vue';
import ConceptSection from '~/components/SensoryFreeway/ConceptSection.vue';
import TherapiesSection from '~/components/SensoryFreeway/TherapiesSection.vue';
import BookingSection from '~/components/SensoryFreeway/BookingSection.vue';
import LocationsSection from '~/components/SensoryFreeway/LocationsSection.vue';
import ReviewsSection from '~/components/SensoryFreeway/ReviewsSection.vue';

useSeoMeta({
  title: 'Sensory Freeway | Sponsored by PT of the City',
  description:
    'Sensory Freeway — pediatric therapy services. Accepting new patients with same-week evaluations available.',
});
</script>

<template>
  <div class="sensory-freeway-page">
    <HeroSection image-src="/images/sensory-freeway/Hero.png" image-alt="Sensory Freeway Hero" />
    <ConceptSection image-src="/images/sensory-freeway/Gym.png" image-alt="Sensory Freeway Concept" />
    <TherapiesSection />
    <BookingSection />
    <LocationsSection map-image-src="/images/sensory-freeway/Map-2.png" map-image-alt="Sensory Freeway Map" />
    <ReviewsSection />
  </div>
</template>
