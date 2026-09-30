<script setup lang="ts">
import EditableText from '~/components/Admin/EditableText.vue';

const boroughs = [
  { label: 'Manhattan', to: '/clinics/manhattan' },
  { label: 'Brooklyn', to: '/clinics/brooklyn' },
  { label: 'The Bronx', to: '/clinics/the-bronx' },
  { label: 'Queens', to: '/clinics/queens' },
];
</script>

<template>
  <section class="boroughs">
    <EditableText tag="p" class="count" content-key="contact.boroughs.label" default="32 Clinics Across NYC" />

    <nav class="pills" aria-label="Clinics by borough">
      <NuxtLink v-for="borough in boroughs" :key="borough.to" :to="borough.to" class="pill">
        {{ borough.label }}
      </NuxtLink>
    </nav>

    <NuxtLink to="/clinics/all" class="map-link">
      <EditableText tag="span" content-key="contact.boroughs.map_label" default="Map View" />
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <line x1="7" y1="17" x2="17" y2="7" />
        <polyline points="7 7 17 7 17 17" />
      </svg>
    </NuxtLink>
  </section>
</template>

<style scoped lang="scss">
.boroughs {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 2.4rem;
  @include pagePadding();
  padding-top: 4rem;
  padding-bottom: 4rem;
  border-top: 1px solid $surface-cream;
  border-bottom: 1px solid $surface-cream;
  background-color: #ffffff;

  @media screen and (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
    padding-top: 3.2rem;
    border-color: #f0eee8;
  }
}

.count {
  @include type-large;
  text-transform: uppercase;
  color: $primary-600;

  @media screen and (max-width: 900px) {
    font-family: $font-switzer;
    font-weight: 700;
    font-size: 24px;
    line-height: normal;
    text-transform: none;
  }
}

.pills {
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;

  @media screen and (max-width: 900px) {
    gap: 0.8rem;
  }
}

.pill {
  padding: 0.8rem 1.6rem;
  border: 1px solid $primary-400;
  border-radius: 10rem;
  background-color: #ffffff;
  @include type-button;
  color: $primary-700;
  transition: background-color 0.15s ease-in-out;

  &:hover {
    background-color: $surface-teal-pale;
  }

  @media screen and (max-width: 900px) {
    font-size: 16px;
    line-height: normal;
    letter-spacing: 0;
  }
}

.map-link {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1.6rem 0.8rem 0;
  @include type-button;
  color: $primary-700;

  :deep(span) {
    font: inherit;
    color: inherit;
  }

  &:hover {
    color: $primary-400;
  }

  @media screen and (max-width: 900px) {
    margin-top: 0.8rem;
    font-size: 16px;
    letter-spacing: 0.08px;
  }
}
</style>
