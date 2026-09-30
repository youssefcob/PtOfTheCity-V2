<script setup lang="ts">
import EditableText from '~/components/Admin/EditableText.vue';

const ck = (s: string) => `contact.closing.${s}`;
</script>

<template>
  <section class="closing">
    <img class="texture" src="/images/home/texture-pattern.webp" alt="" aria-hidden="true" />
    <div class="copy">
      <EditableText tag="h2" class="heading" :content-key="ck('heading')" default="We're Here When You're Ready." />
      <EditableText tag="p" class="body" :content-key="ck('body')"
        default="Don't let pain define your New York story. Reach out today and take the first step toward moving better and living stronger." />
    </div>
    <div class="actions">
      <a href="#message" class="cta-btn cta-btn--primary">
        <EditableText tag="span" :content-key="ck('primary_label')" default="Start the Conversation" />
      </a>
      <NuxtLink to="/clinics/all" class="cta-btn cta-btn--outline">
        <EditableText tag="span" :content-key="ck('secondary_label')" default="Find a Clinic" />
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped lang="scss">
.closing {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
  @include pagePadding();
  padding-top: 6rem;
  padding-bottom: 6rem;
  background-color: $primary-600;
  overflow: hidden;
  text-align: center;

  > :not(.texture) {
    position: relative;
  }

  @media screen and (max-width: 900px) {
    gap: 2.8rem;
    padding: 4.8rem 2.4rem;
  }

  :deep(span) {
    font: inherit;
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

.copy {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  max-width: 80rem;
  color: #ffffff;

  @media screen and (max-width: 900px) {
    gap: 1.6rem;
    width: 100%;
  }
}

.heading {
  @include type-h2;
  text-transform: uppercase;
  color: inherit;

  @media screen and (max-width: 900px) {
    font-weight: 700;
    font-size: 32px;
    line-height: 38px;
    letter-spacing: -0.32px;
  }
}

.body {
  @include type-body;
  color: inherit;
  opacity: 0.8;

  @media screen and (max-width: 900px) {
    font-size: 16px;
    line-height: 26px;
  }
}

.actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2.4rem;

  // mobile: full-width buttons, stacked
  @media screen and (max-width: 900px) {
    flex-direction: column;
    gap: 1.2rem;
    width: 100%;
  }
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 5.6rem;
  padding: 1.6rem 3.2rem;
  border-radius: 1.2rem;
  @include type-button;
  color: #ffffff;
  transition: background-color 0.15s ease-in-out;

  @media screen and (max-width: 900px) {
    width: 100%;
    font-size: 16px;
    letter-spacing: 0.08px;
  }
}

.cta-btn--primary {
  padding: 1.6rem 2.9rem;
  background-color: $primary-400;

  @media screen and (max-width: 900px) {
    height: 5.4rem;
  }


  &:hover {
    background-color: $primary-300;
  }
}

.cta-btn--outline {
  border: 1px solid #ffffff;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
}
</style>
