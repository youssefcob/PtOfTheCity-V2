<script setup lang="ts">
import EditableText from '~/components/Admin/EditableText.vue';

// Reusable dark "Find a Clinic Near You" CTA band. `pageKey` scopes the
// editable copy so each page can tune it (defaults match the Figma).
const props = withDefaults(
  defineProps<{
    pageKey?: string;
    to?: string;
  }>(),
  { pageKey: 'shared', to: '/clinics/all' },
);

const ck = (s: string) => `${props.pageKey}.find_clinic.${s}`;
</script>

<template>
  <section class="find-clinic">
    <img class="texture" src="/images/home/texture-pattern.webp" alt="" aria-hidden="true" />
    <div class="content">
      <EditableText
        tag="h2"
        class="heading"
        :content-key="ck('heading')"
        default="Find a Clinic Near You"
      />
      <EditableText
        tag="p"
        class="body"
        :content-key="ck('body')"
        default="Explore our network of clinics across Manhattan, Brooklyn, Queens, New Jersey, Long Island, Westchester, Staten Island, and Connecticut."
      />
      <NuxtLink :to="to" class="link">
        <EditableText
          tag="span"
          :content-key="ck('link_label')"
          default="View All clinics"
        />
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped lang="scss">
.find-clinic {
  position: relative;
  @include pagePadding();
  padding-top: 5rem;
  padding-bottom: 5rem;
  min-height: 33rem;
  display: flex;
  align-items: center;
  background-color: $primary-600;
  overflow: hidden;
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

.content {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 66rem;
}

.heading {
  @include type-h2;
  text-transform: uppercase;
  color: #ffffff;
  margin: 0;
}

.body {
  @include type-body;
  color: #ffffff;
  opacity: 0.9;
  margin: 0;
}

.link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  @include type-button;
  color: #ffffff;

  // the label is a classless EditableText <span>; a global `span` rule would
  // otherwise darken it to near-invisible on this dark band.
  :deep(.cms-editable-text) {
    color: inherit;
  }

  &:hover {
    color: $accent-cyan;
  }
}
</style>
