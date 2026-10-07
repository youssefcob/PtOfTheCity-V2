<script setup lang="ts">
import ServiceDetail from '~/components/Service/ServiceDetail.vue';

definePageMeta({
  middleware: ['slug-redirect']
})

const route = useRoute();
</script>

<template>
  <ServiceDetail kind="program" :slug="(route.params.slug as string)" :key="(route.params.slug as string)" />
</template>
