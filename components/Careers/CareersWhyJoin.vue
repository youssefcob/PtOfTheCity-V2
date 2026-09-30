<script setup lang="ts">
import EditableText from '~/components/Admin/EditableText.vue';
import { vReveal } from '~/composables/useScrollReveal';

const pillars = [
  { id: 'patient_first', title: 'Patient-First Care', body: 'Join a team that puts compassionate, evidence-based care at the center of everything we do.' },
  { id: 'growth', title: 'Professional Growth', body: 'Develop your skills through mentorship, continuing education, and leadership.' },
  { id: 'culture', title: 'Supportive Culture', body: 'Work alongside experienced clinicians who value teamwork, respect, and collaboration.' },
  { id: 'community', title: 'Community Impact', body: 'Help improve the health and well-being of the communities we proudly serve across New York City.' },
];

const ck = (s: string) => `careers.why_join.${s}`;
</script>

<template>
  <section class="why-join">
    <img class="texture" src="/images/home/texture-pattern.webp" alt="" aria-hidden="true" />

    <div class="intro">
      <EditableText v-reveal="'drop'" tag="p" class="eyebrow" :content-key="ck('eyebrow')" default="Why Join PTOC?" />
      <EditableText v-reveal="'rise'" tag="h2" class="heading" :content-key="ck('heading')"
        default="A Career With Purpose." />
      <EditableText v-reveal="'rise'" tag="p" class="body" :content-key="ck('body')"
        default="We invest in our people just as much as we invest in our patients. Through mentorship, continuing education, and a collaborative culture, we help every team member grow with confidence." />
    </div>

    <div v-for="(pillar, i) in pillars" :key="pillar.id" v-reveal="'slide-in'" class="pillar">
      <p class="pillar-number">{{ String(i + 1).padStart(2, '0') }}</p>
      <EditableText tag="h3" class="pillar-title" :content-key="ck(`${pillar.id}.title`)" :default="pillar.title" />
      <EditableText tag="p" class="pillar-body" :content-key="ck(`${pillar.id}.body`)" :default="pillar.body" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.why-join {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 2.4rem;
  @include pagePadding();
  padding-top: 6rem;
  padding-bottom: 6rem;
  background-color: $primary-600;
  overflow: hidden;
  color: #ffffff;

  @media screen and (max-width: 1100px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding-top: 4.8rem;
    padding-bottom: 4.8rem;
  }

  // mobile Figma: one column, 2rem gaps between pillars, no intro paragraph
  // and no pillar numbers or borders
  @media screen and (max-width: 900px) {
    grid-template-columns: minmax(0, 1fr);
    row-gap: 2rem;
    padding: 2rem 1.6rem;
  }

  > :not(.texture) {
    position: relative;
  }

  :deep(span) {
    color: inherit;
  }
}

.texture {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.2;
  pointer-events: none;
}

.intro {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  flex: 0 0 35rem;

  @media screen and (max-width: 1100px) {
    grid-column: 1 / -1;
  }

  @media screen and (max-width: 900px) {
    gap: 0.6rem;
    margin-bottom: 0.4rem;
  }
}

.eyebrow {
  @include type-overline;
  color: $primary-base;

  @media screen and (max-width: 900px) {
    letter-spacing: 0.08em;
    color: #ffffff;
  }
}

.heading {
  @include type-h3;
  text-transform: uppercase;
  color: inherit;

  @media screen and (max-width: 900px) {
    font-weight: 700;
    font-size: 28px;
    line-height: 34px;
  }
}

.body {
  @include type-body;
  color: inherit;

  @media screen and (max-width: 900px) {
    display: none;
  }
}

.pillar {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  flex: 1 1 0;
  min-width: 0;
  padding: 0 1.6rem;
  border-left: 1px solid $primary-base;

  @media screen and (max-width: 900px) {
    gap: 0.6rem;
    padding: 0.4rem 0 0.4rem 1.6rem;
    border-left: 0;
  }
}

.pillar-number {
  @include type-large;
  color: $primary-base;

  @media screen and (max-width: 900px) {
    display: none;
  }
}

.pillar-title {
  @include type-large;
  text-transform: uppercase;
  color: inherit;

  @media screen and (max-width: 900px) {
    font-weight: 600;
    font-size: 18px;
    line-height: normal;
    text-transform: none;
  }
}

.pillar-body {
  @include type-body;
  color: inherit;

  @media screen and (max-width: 900px) {
    font-size: 16px;
    line-height: 22px;
  }
}
</style>
