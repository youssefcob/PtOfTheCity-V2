<script setup lang="ts">
import { useCampaign } from '~/composables/useCampaign';

// Custom pages can override the button labels; defaults match the original copy
withDefaults(
  defineProps<{
    bookText?: string;
    callText?: string;
  }>(),
  {
    bookText: 'Book Appointment',
    callText: 'Call Now',
  },
);

const { telLink } = useCampaign();

const visible = ref(false);

const onScroll = () => {
  const hero = document.getElementById('hero');
  if (!hero) return;
  const y = window.scrollY || window.pageYOffset;
  const heroBottom = hero.offsetTop + hero.offsetHeight;
  visible.value = y > heroBottom - 200;
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
  <!-- Floating book button (desktop) -->
  <a href="#appointment-form" id="float-book" :class="{ visible }" aria-label="Request an appointment">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" /></svg>
    {{ bookText }}
  </a>

  <!-- Sticky mobile action bar -->
  <div id="mobile-bar">
    <a v-if="telLink" :href="telLink" class="btn btn-outline">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="17" height="17"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
      {{ callText }}
    </a>
    <a href="#appointment-form" class="btn btn-primary">{{ bookText }}</a>
  </div>
</template>
