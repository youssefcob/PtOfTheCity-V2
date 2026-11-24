<script setup lang="ts">
import ServiceDetail from '~/components/Service/ServiceDetail.vue';

definePageMeta({
  middleware: ['slug-redirect']
})

const route = useRoute();
</script>

<template>
  <ServiceDetail :slug="(route.params.name as string)" :key="(route.params.name as string)" />
</template>
