<script setup lang="ts">
import type { Service } from '~/types/types';
import { vReveal } from '~/composables/useScrollReveal';

const props = defineProps<{
  services: Service[];
}>();

// Same icon + accent cycle as the homepage featured cards.
const cardIcons = [
  '/images/home/icon-badge-1.svg',
  '/images/home/icon-badge-2.svg',
  '/images/home/icon-badge-3.svg',
  '/images/home/icon-badge-4.svg',
  '/images/home/icon-badge-5.svg',
  '/images/home/icon-clipboard.svg',
];
const cardAccentColors = ['#255bf0', '#cb38e8', '#7f26ec', '#912ec3', '#2b7ad4', '#0e899a'];

// "Initial check-up" is a booking type, not a page worth cross-linking
// (the homepage hides it for the same reason).
const items = computed(() =>
  props.services.filter(s => s.title?.toLowerCase() !== 'initial check-up'),
);

// Native scroll-snap track; the arrows just scroll it by one card and disable
// themselves at either end.
const track = ref<HTMLElement | null>(null);
const atStart = ref(true);
const atEnd = ref(false);

const updateEdges = () => {
  const el = track.value;
  if (!el) return;
  atStart.value = el.scrollLeft <= 4;
  atEnd.value = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
};

const scrollByCard = (dir: 1 | -1) => {
  const el = track.value;
  if (!el) return;
  const card = el.querySelector<HTMLElement>('.service-card');
  const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
  el.scrollBy({ left: dir * ((card?.offsetWidth ?? el.clientWidth) + gap), behavior: 'smooth' });
};

onMounted(() => {
  updateEdges();
  window.addEventListener('resize', updateEdges);
});
onBeforeUnmount(() => window.removeEventListener('resize', updateEdges));
</script>

<template>
  <section v-if="items.length" class="other-services">
    <div class="header" v-reveal="'rise'">
      <div class="titles">
        <p class="overline">Keep exploring</p>
        <h2 class="heading">Other Services</h2>
      </div>
      <div class="arrows">
        <button type="button" class="arrow" :disabled="atStart" @click="scrollByCard(-1)"
          :aria-label="'Previous services'">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button type="button" class="arrow" :disabled="atEnd" @click="scrollByCard(1)"
          :aria-label="'Next services'">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>

    <ul ref="track" class="track" @scroll.passive="updateEdges">
      <li v-for="(service, index) in items" :key="service.id" class="slide">
        <NuxtLink :to="servicePath(service)" class="service-card">
          <div class="service-card-body">
            <img class="service-icon" :src="cardIcons[index % cardIcons.length]" width="40" height="40" alt=""
              aria-hidden="true" />
            <div class="service-copy">
              <span class="service-title">{{ service.title }}</span>
              <span v-if="service.description" class="service-description">{{ service.description }}</span>
            </div>
            <span class="service-link">
              Learn more
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </span>
          </div>
          <div class="accent-strip" :style="{ backgroundColor: cardAccentColors[index % cardAccentColors.length] }" />
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
.other-services {
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  width: 100%;
  margin-top: 6rem;
  padding-top: 6rem;
  padding-bottom: 6rem;
  background-color: $surface-cream;

  @media screen and (max-width: 900px) {
    gap: 2.4rem;
    margin-top: 4rem;
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
}

.header {
  @include pagePadding();
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
}

.titles {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.titles .overline {
  @include type-overline;
  color: $primary-700;
  margin: 0;
}

.titles .heading {
  @include type-h2;
  text-transform: uppercase;
  color: $primary-600;
  margin: 0;
}

.arrows {
  display: flex;
  gap: 0.8rem;
  flex-shrink: 0;

  @media screen and (max-width: 640px) {
    display: none; // swipe on touch
  }
}

.arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4.8rem;
  height: 4.8rem;
  border-radius: 999px;
  border: 1.5px solid $primary-400;
  background: $white;
  color: $primary-400;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, opacity 0.2s ease-in-out;

  &:hover:not(:disabled) {
    background: $primary-400;
    color: $white;
  }

  &:disabled {
    opacity: 0.35;
    cursor: default;
  }

  &:focus-visible {
    outline: 2px solid $primary-400;
    outline-offset: 2px;
  }
}

.other-services .track {
  list-style: none;
  margin: 0;
  @include pagePadding();
  display: flex;
  gap: 1.6rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding-inline: $pageMargin;
  scrollbar-width: none;
  // room for the card shadow and hover lift, which overflow-x would clip
  padding-top: 0.4rem;
  padding-bottom: 2rem;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 1100px) {
    scroll-padding-inline: $resMargin;
  }
}

.other-services .slide {
  margin: 0; // global li margin
  flex: 0 0 calc((100% - 2 * 1.6rem) / 3);
  max-width: 37.2rem;
  min-width: 26rem;
  scroll-snap-align: start;
  display: flex;

  @media screen and (max-width: 640px) {
    flex-basis: 82%;
    min-width: 0;
  }
}

.service-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  background: $white;
  border-radius: 1.2rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  color: $primary-700;
  text-decoration: none;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);

    .service-link svg {
      transform: translate(2px, -2px);
    }
  }

  &:focus-visible {
    outline: 2px solid $primary-400;
    outline-offset: 2px;
  }
}

.service-card-body {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  flex: 1;
  padding: 2.4rem 2.4rem 2rem;
}

.service-icon {
  width: 4rem;
  height: 4rem;
}

.service-copy {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  flex: 1;
}

.service-card .service-title {
  @include type-button;
  color: $primary-600;
}

.service-card .service-description {
  @include type-caption;
  color: $primary-700;
}

.service-card .service-link {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  @include type-caption;
  font-weight: 600;
  color: $primary-400;

  svg {
    transition: transform 0.2s ease-in-out;
  }
}

.accent-strip {
  height: 3px;
  width: 100%;
}
</style>
