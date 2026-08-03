<template>
  <section class="all-locations">
    <div class="locations-header">
      <h2 class="locations-title">All NYC Locations</h2>
      <p class="locations-subtitle">
        {{ totalCount }} clinics across New York City &mdash; find the one closest to you
      </p>
    </div>

    <div v-for="group in grouped" :key="group.borough" class="borough-section">
      <h3 class="borough-title">{{ group.borough }}</h3>
      <div class="locations-grid">
        <NuxtLink
          v-for="clinic in group.clinics"
          :key="clinic.slug"
          :to="`/clinic/${clinic.slug}`"
          class="location-card"
        >
          <div class="card-dot" />
          <div class="card-text">
            <span class="clinic-name">{{ clinic.name }}</span>
            <span class="clinic-address">{{ clinic.street_address }}</span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { Clinic } from '~/types/types';

const { data } = await useFetch<Record<string, Clinic[]>>(`${useUrl()}/web/clinics`);

const BOROUGH_ORDER = ['Manhattan'];

const grouped = computed(() => {
  if (!data.value) return [];
  return Object.entries(data.value)
    .map(([borough, clinicList]) => ({ borough, clinics: clinicList }))
    .sort((a, b) => {
      const ai = BOROUGH_ORDER.indexOf(a.borough);
      const bi = BOROUGH_ORDER.indexOf(b.borough);
      if (ai !== -1 && bi === -1) return -1;
      if (bi !== -1 && ai === -1) return 1;
      return ai - bi;
    });
});

const totalCount = computed(() =>
  grouped.value.reduce((sum, g) => sum + g.clinics.length, 0)
);
</script>

<style scoped lang="scss">


  .locations-title {
    color: $navy;
  }

.all-locations {
  @include pagePadding();
  padding-top: 3rem;
  padding-bottom: 4rem;
}

.locations-header {
  margin-bottom: 2.5rem;
}

.locations-title {
  font-weight: 700;
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
}

.locations-subtitle {
  color: #666;
  font-size: 1rem;
}

.locations-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.75rem;

  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and (max-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 400px) {
    grid-template-columns: 1fr;
  }
}

.location-card {
  background-color: $light-green;
  border-radius: 1rem;
  padding: 1.1rem 1.25rem;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.85rem;
  transition: background-color 0.15s;

  &:hover {
    background-color: darken($light-green, 8%);
  }
}

.card-dot {
  flex-shrink: 0;
  width: 0.65rem;
  height: 0.65rem;
  border-radius: 50%;
  background-color: $cta;
}

.card-text {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
}

.clinic-name {
  font-weight: 600;
  font-size: 1rem;
  color: $black;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.clinic-address {
  font-size: 0.85rem;
  color: #555;
}

.borough-section {
  margin-bottom: 2.5rem;
}

.borough-title {
  font-weight: 700;
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: $black;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
</style>
