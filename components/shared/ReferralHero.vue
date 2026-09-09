<script setup lang="ts">
import EditableText from '~/components/Admin/EditableText.vue';
import EditableImage from '~/components/Admin/EditableImage.vue';

const props = defineProps<{
  pageKey: string;
  eyebrowDefault: string;
  titleDefault: string;
  descriptionDefault: string;
  ctaLabelDefault?: string;
  ctaTarget?: string;
}>();

const heroImg = (width: number) => useImg('careers', width);
</script>

<template>
  <div class="hero">
    <div class="hero-content">
      <EditableText tag="span" class="eyebrow" :content-key="`${pageKey}.hero.eyebrow`" :default="eyebrowDefault" />
      <EditableText tag="h1" class="title" :content-key="`${pageKey}.hero.title`" :default="titleDefault" />
      <EditableText tag="p" class="description" :content-key="`${pageKey}.hero.description`"
        :default="descriptionDefault" />
      <NuxtLink v-if="ctaLabelDefault" :to="ctaTarget || '#form'" class="cta-link" aria-label="Go to the referral form">
        <EditableText tag="span" :content-key="`${pageKey}.hero.cta_label`" :default="ctaLabelDefault" />
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      </NuxtLink>
    </div>

    <div class="hero-image">
      <EditableImage :content-key="`${pageKey}.hero.image`" :default-src="heroImg(900)" loading="eager"
        default-alt="A PT of the City physical therapist caring for a patient" />
      <div class="hero-image-fade" aria-hidden="true"></div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.hero {
  display: flex;
  align-items: stretch;
  width: 100%;
  min-height: 34rem;
  position: relative;
  background: $white;
  @include pagePadding();
  padding-top: calc($navbarHeight + 3rem);
  padding-bottom: 3rem;

  @media screen and (max-width: 1100px) {
    padding-top: calc($navbarHeight + 2rem);
  }

  @media screen and (max-width: 900px) {
    position: relative;
    display: block;
    min-height: calc(100vh - $navbarHeight + 1.6rem);
    overflow: hidden;
    padding: 0;
  }
}

.hero-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  width: 50%;
  z-index: 1;

  @media screen and (max-width: 900px) {
    position: absolute;
    inset: 0;
    z-index: 1;
    width: 100%;
    justify-content: flex-end;
    gap: 1.25rem;
    padding: 2.5rem 1.5rem;
    background: linear-gradient(180deg, rgba(3, 41, 46, 0) 30%, rgba(3, 41, 46, 0.75) 100%);
  }

  .eyebrow {
    @include type-overline;
    color: $primary-700;

    @media screen and (max-width: 900px) {
      color: #ffffff;
    }
  }

  .title {
    @include type-display;
    color: $primary-600;
    text-transform: uppercase;
    margin: 0;

    @media screen and (max-width: 900px) {
      color: #ffffff;
    }
  }

  .description {
    @include type-large;
    color: $primary-700;
    margin: 0;

    @media screen and (max-width: 900px) {
      color: rgba(255, 255, 255, 0.8);
    }
  }

  .cta-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    width: fit-content;
    margin-top: 0.5rem;
    color: $primary-700;
    @include type-button;

    &:hover {
      color: $primary-400;
      text-decoration: underline;
    }

    @media screen and (max-width: 900px) {
      color: #ffffff;
    }
  }
}

.hero-image {
  position: relative;
  width: 50%;
  border-radius: 0.5rem;
  overflow: hidden;
  margin-left: 3rem;

  :deep(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
  }

  .hero-image-fade {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, #ffffff 0%, rgba(255, 255, 255, 0) 30%);
    pointer-events: none;
  }

  @media screen and (max-width: 900px) {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    margin-left: 0;
    border-radius: 0;
    z-index: 0;

    .hero-image-fade {
      display: none;
    }
  }
}
</style>
