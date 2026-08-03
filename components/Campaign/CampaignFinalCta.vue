<script setup lang="ts">
import { useCampaign } from '~/composables/useCampaign';

// Custom pages can override the section content; defaults match the original copy
withDefaults(
  defineProps<{
    eyebrow?: string;
    heading?: string;
    text?: string;
    ctaText?: string;
    callText?: string;
  }>(),
  {
    eyebrow: 'Ready When You Are',
    heading: 'Stop Living Around the Pain. Start Moving Past It.',
    text: 'Same-day appointments available. Most insurance accepted. Book your evaluation in under 60 seconds.',
    ctaText: 'Request Appointment',
    callText: 'Call',
  },
);

const { telLink } = useCampaign();
</script>

<template>
  <section class="section" id="final-cta">
    <div class="container">
      <span class="eyebrow eyebrow-light">{{ eyebrow }}</span>
      <h2>{{ heading }}</h2>
      <p>{{ text }}</p>
      <div class="final-cta-actions">
        <a href="#appointment-form" class="btn btn-primary">{{ ctaText }}</a>
        <span></span>
        <a v-if="telLink" :href="telLink" class="btn btn-ghost-white">{{ callText }}</a>
      </div>
    </div>
  </section>
</template>
