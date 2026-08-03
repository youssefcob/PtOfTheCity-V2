<script setup lang="ts">
import { useCampaign } from '~/composables/useCampaign';

// Custom pages can override the header content; defaults match the original copy
withDefaults(
  defineProps<{
    logoSrc?: string;
    logoAlt?: string;
    ctaText?: string;
    callText?: string;
  }>(),
  {
    logoSrc: '/images/logo.png',
    logoAlt: 'PT of the City',
    ctaText: 'Request Appointment',
    callText: 'Call',
  },
);

const { telLink } = useCampaign();

const scrolled = ref(false);

const onScroll = () => {
  scrolled.value = (window.scrollY || window.pageYOffset) > 8;
};

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll);
});
</script>

<template>
  <header id="site-header" :class="{ scrolled }">
    <div class="header-row">
      <NuxtLink to="/" class="logo" aria-label="PT of the City — Home">
        <img :src="logoSrc" :alt="logoAlt" class="logo-img" />
      </NuxtLink>
      <div class="header-actions">
        <a v-if="telLink" :href="telLink" class="call-pill">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
          <span>{{ callText }}</span>
        </a>
        <a href="#appointment-form" class="btn btn-primary btn-sm">{{ ctaText }}</a>
      </div>
    </div>
  </header>
</template>
