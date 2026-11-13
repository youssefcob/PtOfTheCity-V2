<script setup lang="ts">
import EditableText from '~/components/Admin/EditableText.vue';
import EditableImage from '~/components/Admin/EditableImage.vue';
import { placeholderImage } from '~/composables/useContentPlaceholders';
</script>

<template>
  <section class="about-hero">
    <div class="hero-content">
      <EditableText tag="p" class="eyebrow" content-key="about.hero.eyebrow" default="About PT of the City" />
      <EditableText tag="h1" class="title" content-key="about.hero.title"
        default="More Than Physical Therapy. We're Part of Your Community." />
      <EditableText tag="p" class="description" content-key="about.hero.description"
        default="Every recovery journey is personal. That's why we combine clinical expertise with compassionate care, helping New Yorkers move better, recover stronger, and live healthier—one patient, one neighborhood, and one community at a time." />
      <NuxtLink to="/booking" class="cta-link">
        <EditableText tag="span" content-key="about.hero.cta_label" default="Request appointment" />
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      </NuxtLink>
    </div>

    <div class="hero-image">
      <EditableImage content-key="about.hero.image" :default-src="placeholderImage(1100, 664, 'About hero')"
        default-alt="PT of the City team caring for patients in the community" :width="1100" :height="664"
        loading="eager" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.about-hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
  min-height: 46.4rem;
  @include pagePadding();

  @media screen and (max-width: 900px) {
    flex-direction: column;
    align-items: stretch;
    gap: 2.4rem;
  }
}

// Editable image (placeholder until a real one is uploaded) where the Figma has
// a "water caustic" shader fill. Sits in the flex row beside the text, inside
// the page padding, so it can never overlap the copy
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
  padding: 5.8rem 0 3.2rem;

  @media screen and (max-width: 900px) {
    padding: 5.4rem 0 0;
  }

  :deep(span) {
    color: inherit;
  }
}

.eyebrow {
  @include type-overline;
  color: $primary-700;
}

.title {
  @include type-h2;
  text-transform: uppercase;
  color: $primary-600;
}

.description {
  @include type-large;
  text-transform: uppercase;
  color: $primary-700;
}

.cta-link {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1.6rem 0.8rem 0;
  @include type-button;
  font-size: 20px;
  font-weight: 700;
  color: $primary-700;

  // the global `span` rule in _classes.scss would otherwise shrink the label to 14px regular
  :deep(span) {
    font: inherit;
  }

  &:hover {
    color: $primary-400;
  }
}
</style>
