<script setup lang="ts">
import type { Condition } from '~/types/types';
import StudioContent from '~/components/shared/StudioContent.vue';
import { bodyParts } from '~/mixins/Conditions';

definePageMeta({
  middleware: ['slug-redirect']
})

const route = useRoute();
const slug = decodeURIComponent(route.params.slug as string);

// Body-part pages are served from Studio by their slug; no Laravel row is required.
const knownPart = bodyParts.find((part) => part.slug === slug);

const { data: condition } = await useFetch<Condition>(`${useUrl()}/web/conditions/${slug}`);

// Studio owns the page body. Studio is tried with the route slug first, so the
// nine body-part pages render even when the API has no row for them.
const { doc } = await useStudioDoc('conditions', () => condition.value?.cms_slug || slug);

if (!doc.value && !condition.value && !knownPart) {
  throw createError({ statusCode: 404, statusMessage: 'Condition not found', fatal: true })
}

const title = condition.value?.title || knownPart?.label || '';
useHead({
  title: `${title} - PT of the City`,
  meta: condition.value?.summary ? [{ name: 'description', content: condition.value.summary.substring(0, 160) }] : [],
})
</script>

<template>
  <StudioContent v-if="doc" :doc="doc" />

  <div v-else-if="condition || knownPart" class="condition-container">
    <h1 class="condition-title">{{ condition?.title || knownPart?.label }}</h1>
    <div v-if="condition" class="condition-body">
      <p v-if="condition.summary" class="condition-summary">{{ condition.summary }}</p>
      <img v-if="condition.image" class="condition-image" :src="condition.image" :alt="condition.title" />
    </div>
    <NuxtLink to="/conditions" class="condition-back">All conditions</NuxtLink>
  </div>
</template>

<style scoped lang="scss">
.condition-container {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;
  min-height: 60vh;
  @include pagePadding;
  padding-top: $navbarHeight !important;
  padding-bottom: 6rem;
}

.condition-container .condition-title {
  @include type-h1;
  color: $primary-600;
}

.condition-body {
  display: flex;
  gap: 3rem;

  @media screen and (max-width: 900px) {
    flex-direction: column;
  }
}

.condition-container .condition-summary {
  flex: 1;
  @include type-body;
  color: $primary-700;
}

.condition-image {
  flex: 1;
  max-width: 50%;
  border-radius: 0.75rem;
  object-fit: cover;

  @media screen and (max-width: 900px) {
    max-width: 100%;
  }
}

.condition-container .condition-back {
  @include type-button;
  color: $primary-700;
  text-decoration: underline;
}
</style>
