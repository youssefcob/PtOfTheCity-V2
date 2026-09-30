<script setup lang="ts">
import EditableText from '~/components/Admin/EditableText.vue';

const ck = (s: string) => `contact.hero.${s}`;
</script>

<template>
  <section class="contact-hero">
    <!-- empty space where the Figma has a "water caustic" shader fill -->
    <div class="hero-image" aria-hidden="true"></div>

    <div class="hero-content">
      <div class="copy">
        <EditableText tag="p" class="eyebrow" :content-key="ck('eyebrow')" default="Contact Us" />
        <EditableText tag="h1" class="title" :content-key="ck('title')" default="Let's Talk." />
        <EditableText tag="p" class="description" :content-key="ck('description')"
          default="Healing begins with a conversation. Whether you're a new patient or a referring physician, our team is ready to guide your recovery journey." />
      </div>

      <div class="actions">
        <NuxtLink to="/booking" class="cta-btn cta-btn--primary">
          <EditableText tag="span" :content-key="ck('primary_label')" default="Request Appointment" />
        </NuxtLink>
        <a href="tel:+17186480888" class="cta-btn cta-btn--secondary">
          <EditableText tag="span" :content-key="ck('secondary_label')" default="Call Us" />
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.contact-hero {
  position: relative;
  display: flex;
  align-items: flex-start;
  min-height: 53.8rem;
  @include pagePadding();

  // mobile Figma: a white band
  @media screen and (max-width: 900px) {
    min-height: 0;
    padding-top: 4rem;
    padding-bottom: 4rem;
    background-color: #ffffff;
  }
}

// Bleeds off the right edge, level with the top of the page
.hero-image {
  position: absolute;
  top: 0;
  right: 0;
  width: 56.5%;
  height: 47.4rem;

  @media screen and (max-width: 900px) {
    display: none;
  }
}

.hero-content {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  max-width: 43.5rem;
  padding-top: 8rem;

  @media screen and (max-width: 900px) {
    max-width: none;
    gap: 2.4rem;
    padding: 0;
  }

  :deep(span) {
    font: inherit;
    color: inherit;
  }
}

.copy {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  @media screen and (max-width: 900px) {
    gap: 1.2rem;
  }
}

// the Figma's "section tag" here is the Large style, not the overline
.eyebrow {
  @include type-large;
  text-transform: uppercase;
  color: $primary-700;

  @media screen and (max-width: 900px) {
    font-weight: 600;
    font-size: 16px;
    line-height: normal;
    letter-spacing: 1px;
    color: $primary-400;
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
    letter-spacing: -0.32px;
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
  }
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1.6rem;

  // mobile: full-width buttons, stacked
  @media screen and (max-width: 900px) {
    flex-direction: column;
    gap: 1.2rem;
  }
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 5.6rem;
  padding: 1.6rem 2.9rem;
  border-radius: 1.2rem;
  @include type-button;
  transition: background-color 0.15s ease-in-out;

  @media screen and (max-width: 900px) {
    width: 100%;
    height: 5.4rem;
    font-size: 16px;
    letter-spacing: 0.08px;
  }
}

.cta-btn--primary {
  background-color: $primary-400;
  color: #ffffff;

  &:hover {
    background-color: $primary-600;
  }
}

.cta-btn--secondary {
  min-width: 16rem;

  @media screen and (max-width: 900px) {
    height: 5.6rem;
  }

  padding: 1.6rem 3.2rem;
  border: 1px solid $primary-600;
  background-color: rgba(43, 192, 212, 0.2);
  color: $primary-700;

  &:hover {
    background-color: rgba(43, 192, 212, 0.35);
  }
}
</style>
