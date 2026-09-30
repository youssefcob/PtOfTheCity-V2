<script setup lang="ts">
import EditableText from '~/components/Admin/EditableText.vue';
</script>

<template>
  <section class="about-hero">
    <div class="hero-image" aria-hidden="true"></div>

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
  </section>
</template>

<style scoped lang="scss">
.about-hero {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 46.4rem;
  @include pagePadding();

  @media screen and (max-width: 900px) {
    flex-direction: column;
    align-items: stretch;
    gap: 2.4rem;
  }
}

// Empty space where the Figma has a "water caustic" shader fill; bleeds off
// the right edge of the page, flush under the navbar
.hero-image {
  position: absolute;
  top: 0;
  right: 0;
  width: 53.7%;
  height: 46.4rem;

  @media screen and (max-width: 900px) {
    display: none;
  }
}

.hero-content {
  position: relative;
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
