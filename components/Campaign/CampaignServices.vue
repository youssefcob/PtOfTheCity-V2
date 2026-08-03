<script setup lang="ts">
import { useCampaign } from '~/composables/useCampaign';

// Custom pages can override the section content; defaults match the original copy
withDefaults(
  defineProps<{
    eyebrow?: string;
    heading?: string;
    linkText?: string;
  }>(),
  {
    eyebrow: 'Our Services',
    heading: 'Treatment Plans for Every Stage of Recovery',
    linkText: 'Learn More',
  },
);

const { clinic } = useCampaign();

const services = computed(() => clinic.value?.services || []);
</script>

<template>
  <section v-if="services.length" class="section" id="services">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">{{ eyebrow }}</span>
        <h2>{{ heading }}</h2>
      </div>
      <div class="services-grid">
        <NuxtLink
          v-for="service in services"
          :key="service.id"
          :to="`/service/${service.slug}`"
          class="service-card reveal"
        >
          <div class="service-media">
            <img v-if="service.path" :src="service.path" :alt="service.title" loading="lazy" />
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9" /><path d="M9 12l2 2 4-4" /></svg>
          </div>
          <div class="service-body">
            <h3>{{ service.title }}</h3>
            <ul v-if="service.list && service.list.length" class="service-list">
              <li v-for="(item, i) in service.list" :key="i">{{ item }}</li>
            </ul>
            <span class="service-link">
              {{ linkText }}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Image fills the media area the same way the gradient did */
.campaign-page .service-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Make the whole card a clean clickable link */
.campaign-page .service-card {
  text-decoration: none;
  color: inherit;
}

/* Bullet list under each service title */
.campaign-page .service-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 0 0 10px;
  padding-left: 0;
  list-style: none;
}

.campaign-page .service-list li {
  position: relative;
  padding-left: 18px;
  font-family: var(--ff-body);
  font-size: 13.5px;
  line-height: 1.5;
  color: var(--slate);
  margin: 0;
  font-weight: 400;
}

.campaign-page .service-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 7px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--teal-500);
}
</style>

