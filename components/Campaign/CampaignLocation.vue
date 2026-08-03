<script setup lang="ts">
import { useCampaign } from '~/composables/useCampaign';

// Custom pages can override the section content; defaults match the original copy
withDefaults(
  defineProps<{
    eyebrow?: string;
    /** Falls back to the clinic's name when empty */
    heading?: string;
  }>(),
  {
    eyebrow: 'Visit Us',
    heading: '',
  },
);

const { clinic, displayPhone, telLink } = useCampaign();

const address = computed(() => {
  const c = clinic.value;
  if (!c) return '';
  return [c.street_address, [c.city, c.state].filter(Boolean).join(', ')].filter(Boolean).join(', ');
});

const mapQuery = computed(() => {
  const c = clinic.value;
  if (!c) return '';
  const q = [c.street_address, c.city, c.state].filter(Boolean).join(', ');
  return `https://maps.google.com/maps?q=${encodeURIComponent(q)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
});

const mapLink = computed(() => {
  const c = clinic.value;
  if (!c) return '';
  const q = [c.street_address, c.city, c.state].filter(Boolean).join(', ');
  return `https://maps.google.com/maps?q=${encodeURIComponent(q)}`;
});

const hours = computed(() => {
  const schedule = clinic.value?.schedule;
  if (!schedule) return null;
  return schedule;
});
</script>

<template>
  <section v-if="clinic" class="section" id="location">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">{{ eyebrow }}</span>
        <h2>{{ heading || clinic.name }}</h2>
      </div>
      <div class="location-grid">
        <div class="map-wrap reveal">
          <iframe
            v-if="mapQuery"
            :src="mapQuery"
            title="Map showing clinic location"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div class="location-info reveal">
          <div v-if="address" class="info-row">
            <div class="info-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
            </div>
            <div>
              <h4>Address</h4>
              <p>{{ address }}</p>
            </div>
          </div>
          <div v-if="telLink" class="info-row">
            <div class="info-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
            </div>
            <div>
              <h4>Phone</h4>
              <p><a :href="telLink">{{ displayPhone }}</a></p>
            </div>
          </div>
          <a v-if="mapLink" :href="mapLink" target="_blank" rel="noopener" class="btn btn-outline">Get Directions</a>
        </div>
      </div>
    </div>
  </section>
</template>
