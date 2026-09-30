<script setup lang="ts">
import EditableText from '~/components/Admin/EditableText.vue';
import type { Service } from '~/types/types';

const props = defineProps<{ services: Service[] }>();

// The six programs the Figma features, in its order. Each links to its
// service page when a service with that slug exists (Hand Therapy has none
// yet, so it renders as a plain card).
const programs = [
  { id: 'pelvic', slug: 'pelvic-floor-rehabilitation', title: 'Pelvic Floor Therapy', description: 'Specialized care for pelvic health', icon: '/images/home/icon-badge-1.svg', accent: '#255bf0' },
  { id: 'lymphedema', slug: 'lymphedema-treatment', title: 'Lymphedema Therapy', description: 'Reduce swelling and improve flow', icon: '/images/home/icon-badge-2.svg', accent: '#cb38e8' },
  { id: 'vestibular', slug: 'vestibular-rehabilitation', title: 'Vestibular Therapy', description: 'Balance and dizziness disorders', icon: '/images/home/icon-badge-3.svg', accent: '#7f26ec' },
  { id: 'neuro', slug: 'stroke-and-neurological-rehabilitation', title: 'Neurological Rehabilitation', description: 'Regaining function after events', icon: '/images/home/icon-badge-4.svg', accent: '#912ec3' },
  { id: 'hand', slug: 'hand-therapy', title: 'Hand Therapy', description: 'Recovery for upper extremity', icon: '/images/home/icon-badge-5.svg', accent: '#2b7ad4' },
  { id: 'fce', slug: 'functional-capacity-evaluation', title: 'Functional Capacity Evaluations', description: 'Objective work capacity assessment', icon: '/images/home/icon-clipboard.svg', accent: '#0e899a' },
];

const NuxtLink = resolveComponent('NuxtLink');

const serviceSlugs = computed(() => new Set(props.services.map((s) => s.slug)));

const ck = (s: string) => `about.programs.${s}`;
</script>

<template>
  <section class="about-programs">
    <div class="header">
      <EditableText tag="p" class="subtitle" :content-key="ck('subtitle')"
        default="Specialized care tailored to your needs." />
      <EditableText tag="h2" class="heading" :content-key="ck('heading')" default="Our Programs" />
    </div>

    <div class="cards-grid">
      <component :is="serviceSlugs.has(program.slug) ? NuxtLink : 'div'"
        v-for="program in programs" :key="program.id" :to="serviceSlugs.has(program.slug) ? `/service/${program.slug}` : undefined"
        class="program-card">
        <div class="program-card-body">
          <img class="program-icon" :src="program.icon" width="40" height="40" alt="" aria-hidden="true" />
          <div class="program-copy">
            <EditableText tag="p" class="program-title" :content-key="ck(`${program.id}.title`)"
              :default="program.title" />
            <EditableText tag="p" class="program-description" :content-key="ck(`${program.id}.description`)"
              :default="program.description" />
          </div>
        </div>
        <div class="accent-strip" :style="{ backgroundColor: program.accent }"></div>
      </component>
    </div>
  </section>
</template>

<style scoped lang="scss">
.about-programs {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  @include pagePadding();

  // mobile: an inset grey panel with rounded corners behind the cards
  @media screen and (max-width: 700px) {
    gap: 2.4rem;
    margin: 0 $resMargin;
    padding: 3.2rem 1.6rem;
    border-radius: 1.6rem;
    background-color: $surface-gray;
  }

  :deep(span) {
    color: inherit;
  }
}

.header {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  text-transform: uppercase;
}

.subtitle {
  @include type-overline;
  color: $primary-700;
}

.heading {
  @include type-h2;
  color: $primary-600;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 37.2rem));
  gap: 1.6rem;

  @media screen and (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media screen and (max-width: 700px) {
    grid-template-columns: minmax(0, 1fr);
  }
}

.program-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #ffffff;
  border-radius: 1.2rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  color: $primary-700;
  transition: transform 0.2s ease-in-out;

  &[href]:hover {
    transform: translateY(-2px);
  }
}

.program-card-body {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 2.4rem 2.4rem 2rem;
}

.program-icon {
  width: 4rem;
  height: 4rem;
}

.program-copy {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.program-title {
  // global h2/h3/p rules in _classes.scss would otherwise set their own color
  color: inherit;
  @include type-button;
}

.program-description {
  color: inherit;
  @include type-caption;
}

.accent-strip {
  height: 3px;
  width: 100%;
}
</style>
