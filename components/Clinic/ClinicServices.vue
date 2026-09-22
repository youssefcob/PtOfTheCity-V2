<script setup lang="ts">
import { computed } from 'vue';
import type { Clinic, Service } from '~/types/types';
import EditableText from '~/components/Admin/EditableText.vue';

const props = defineProps<{ clinic: Clinic }>();

// Dynamic content - the list itself is not editable, only the heading is.
const services = computed<Service[]>(() => props.clinic.services ?? []);
</script>

<template>
  <section v-if="services.length" class="clinic-services">
    <EditableText
      tag="h2"
      class="heading"
      :content-key="`clinic.${clinic.slug}.services.heading`"
      default="Service provided"
    />
    <ul class="grid">
      <li v-for="service in services" :key="service.id">
        <NuxtLink v-if="service.slug" :to="`/service/${service.slug}`">{{ service.title }}</NuxtLink>
        <span v-else>{{ service.title }}</span>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
.clinic-services {
  @include pagePadding();
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.heading {
  @include type-h2;
  text-transform: uppercase;
  color: $primary-600;
  margin: 0 0 2.5rem;
}

.grid {
  list-style: none;
  margin: 0;
  padding: 0;
  // Each service sits on its own line and takes exactly its text width; items
  // wrap into as many columns as fit. A rigid grid split long names across
  // two lines.
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem 3.5rem;

  li {
    @include type-large;
    color: $primary-700;
    white-space: nowrap;
  }

  a {
    color: inherit;

    &:hover {
      color: $primary-400;
      text-decoration: underline;
    }
  }
}
</style>
