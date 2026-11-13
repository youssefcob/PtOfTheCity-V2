<script setup lang="ts">
import EditableText from '~/components/Admin/EditableText.vue';
import EditableImage from '~/components/Admin/EditableImage.vue';
import { placeholderImage } from '~/composables/useContentPlaceholders';

const ck = (s: string) => `careers.hero.${s}`;
</script>

<template>
  <section class="careers-hero">
    <div class="hero-content">
      <EditableText tag="p" class="eyebrow" :content-key="ck('eyebrow')" default="Careers" />
      <EditableText tag="h1" class="title" :content-key="ck('title')" default="Build Your Career. Change Lives." />
      <EditableText tag="p" class="description desktop-only" :content-key="ck('description')"
        default="At PT of the City, we're more than a workplace—we're a community of clinicians committed to helping New Yorkers move better. Whether you're just beginning your career or looking to take the next step, you'll find opportunities to grow, lead, and make a lasting impact." />
      <!-- the mobile Figma uses a shorter version of the intro -->
      <EditableText tag="p" class="description mobile-only" :content-key="ck('description_mobile')"
        default="At PT of the City, we're more than a workplace—we're a community of clinicians committed to helping New Yorkers move better. Grow, lead, and make a lasting impact." />
      <a href="#positions" class="cta-link">
        <EditableText tag="span" :content-key="ck('cta_label')" default="View Open Positions" />
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      </a>
    </div>

    <!-- placeholder until a real image is uploaded; the Figma has a "water caustic" shader fill here -->
    <div class="hero-image">
      <EditableImage :content-key="ck('image')" :default-src="placeholderImage(1100, 664, 'Careers hero')"
        default-alt="PT of the City clinicians at work" :width="1100" :height="664" loading="eager" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.careers-hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
  min-height: 46.4rem;
  @include pagePadding();

  // mobile: a dark block with white copy. The Figma's background is a dark
  // water-caustic shader under a 50% black scrim; the shader is left out
  // (as everywhere on the site) so its water color stands in as a solid fill.
  @media screen and (max-width: 900px) {
    min-height: 0;
    padding: 4.8rem 1.6rem;
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), $primary-600;
  }
}

.mobile-only {
  display: none;

  @media screen and (max-width: 900px) {
    display: block;
  }
}

.desktop-only {
  @media screen and (max-width: 900px) {
    display: none;
  }
}

// Sits in the flex row beside the copy, inside the page padding, so it can
// never overlap the text
.hero-image {
  flex: 0 0 46%;
  min-width: 0;
  height: 46.4rem;
  overflow: hidden;

  @media screen and (max-width: 900px) {
    display: none;
  }
}

.hero-content {
  position: relative;
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.6rem;
  max-width: 58.8rem;
  padding: 1.5rem 0 3.2rem;

  @media screen and (max-width: 900px) {
    gap: 2rem;
    padding: 0;
  }

  :deep(span) {
    color: inherit;
  }
}

.eyebrow {
  @include type-overline;
  color: $primary-700;

  @media screen and (max-width: 900px) {
    letter-spacing: 0.08em;
    color: $primary-base;
  }
}

.title {
  @include type-h2;
  text-transform: uppercase;
  color: $primary-600;

  @media screen and (max-width: 900px) {
    font-weight: 700;
    font-size: 32px;
    line-height: 38px;
    letter-spacing: 0;
    color: #ffffff;
  }
}

.description {
  @include type-large;
  text-transform: uppercase;
  color: $primary-700;

  @media screen and (max-width: 900px) {
    font-size: 16px;
    line-height: 26px;
    text-transform: none;
    color: rgba(255, 255, 255, 0.6);
  }
}

.cta-link {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1.6rem 0.8rem 0;
  @include type-button;
  color: $primary-700;

  // the global `span` rule in _classes.scss would otherwise shrink the label to 14px regular
  :deep(span) {
    font: inherit;
  }

  &:hover {
    color: $primary-400;
  }

  @media screen and (max-width: 900px) {
    color: #ffffff;

    &:hover {
      color: $primary-base;
    }
  }
}
</style>
