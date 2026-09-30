<script setup lang="ts">
import EditableText from '~/components/Admin/EditableText.vue';
import { vReveal } from '~/composables/useScrollReveal';

// Gallery tiles are empty spaces where the Figma has "water caustic" shader
// fills. Their Figma widths (px) are used as flex-grow ratios so each row
// keeps the design's proportions at any width. Row 1 shares its width with
// the intro copy (38.4 units).
const rows = [
  [180, 283, 283],
  [384, 282, 180, 283],
];

const ck = (s: string) => `about.community.${s}`;
</script>

<template>
  <section class="about-community">
    <div class="row">
      <div class="intro">
        <EditableText v-reveal="'drop'" tag="p" class="eyebrow" :content-key="ck('eyebrow')" default="Our Community" />
        <EditableText v-reveal="'rise'" tag="h2" class="heading" :content-key="ck('heading')"
          default="Proud to Give Back." />
        <EditableText v-reveal="'rise'" tag="p" class="body" :content-key="ck('body')"
          default="Our commitment extends beyond the clinic. We proudly partner with schools, healthcare organizations, local businesses, and community events to promote healthier, stronger communities." />
      </div>
      <div v-for="(width, i) in rows[0]" :key="`r1-${i}`" class="tile" :style="{ flexGrow: width }" aria-hidden="true"></div>
    </div>

    <div class="row">
      <div v-for="(width, i) in rows[1]" :key="`r2-${i}`" class="tile" :style="{ flexGrow: width }" aria-hidden="true"></div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.about-community {
  display: flex;
  flex-direction: column;
  gap: 1.7rem;
  @include pagePadding();

  :deep(span) {
    color: inherit;
  }
}

.row {
  display: flex;
  gap: 2.4rem;

  // the tiles are hidden on mobile, leaving the intro copy on its own
  @media screen and (max-width: 900px) {
    display: block;

    &:not(:first-child) {
      display: none;
    }
  }
}

.intro {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  flex: 384 1 0;
  min-width: 0;
  color: $primary-700;
}

.eyebrow {
  // global h2/h3/p rules in _classes.scss would otherwise set their own color
  color: inherit;
  @include type-overline;
}

.heading {
  @include type-h3;
  text-transform: uppercase;
  color: $primary-600;
}

.body {
  color: inherit;
  @include type-body;
}

.tile {
  flex-shrink: 1;
  flex-basis: 0;
  min-width: 0;
  height: 22.9rem;

  @media screen and (max-width: 900px) {
    display: none;
  }
}
</style>
