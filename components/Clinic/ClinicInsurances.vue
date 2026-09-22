<script setup lang="ts">
import type { Clinic, InsuranceImage } from '~/types/types';
import EditableText from '~/components/Admin/EditableText.vue';

const props = defineProps<{
  clinic: Clinic;
  // Full site-wide in-network list (same data as /web/home.insurances).
  insurances: InsuranceImage[];
}>();

const ck = (s: string) => `clinic.${props.clinic.slug}.insurances.${s}`;
</script>

<template>
  <section v-if="insurances.length" class="clinic-insurances">
    <div class="header">
      <EditableText
        tag="h2"
        class="heading"
        :content-key="ck('heading')"
        default="In-network insurances"
      />
      <EditableText
        tag="p"
        class="subtitle"
        :content-key="ck('subtitle')"
        default="99% of patients have successfully booked with these insurances"
      />
    </div>

    <ul class="grid">
      <li v-for="ins in insurances" :key="ins.id" class="item">
        <span class="logo">
          <img v-if="ins.path" :src="ins.path" :alt="ins.title" loading="lazy" />
        </span>
        <span class="name">{{ ins.title }}</span>
      </li>
    </ul>

    <NuxtLink to="/insurances" class="view-all">
      200+ more in-network plans — View All
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <line x1="7" y1="17" x2="17" y2="7" />
        <polyline points="7 7 17 7 17 17" />
      </svg>
    </NuxtLink>
  </section>
</template>

<style scoped lang="scss">
.clinic-insurances {
  @include pagePadding();
  padding-top: 3rem;
  padding-bottom: 3rem;
  @media screen and (max-width: 1000px) {
    background-color: $surface-cream;
    
  }
}

.header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2.5rem;
}

.heading {
  @include type-h2;
  text-transform: uppercase;
  color: $primary-600;
  margin: 0;
}

.subtitle {
  @include type-body;
  color: $primary-700;
  margin: 0;
}

.grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem 4rem;

  @media screen and (max-width: 700px) {
    grid-template-columns: 1fr;
  }
}

.item {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.logo {
  flex-shrink: 0;
  width: 3.2rem;
  height: 3.2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
}

.name {
  @include type-button;
  color: $primary-700;
}

.view-all {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
  @include type-body;
  color: $primary-700;

  &:hover {
    color: $primary-400;
    text-decoration: underline;
  }
}
</style>
