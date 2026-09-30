<template>
  <JobDetail v-if="job" :job="job" />
</template>

<script setup lang="ts">
import JobDetail from '~/components/Careers/JobDetail.vue';
import type { Job } from '~/types/types';

const route = useRoute();
const slug = String(route.params.slug);

const { data: job, error } = await useFetch<Job>(`${useUrl()}/web/careers/${encodeURIComponent(slug)}`, {
  key: `career-${slug}`,
});

if (error.value || !job.value) {
  throw createError({ statusCode: 404, statusMessage: 'Position not found', fatal: true });
}

const description = computed(() => job.value?.description?.slice(0, 160) || `Apply for ${job.value?.title} at PT of the City.`);

useSeoMeta({
  title: () => `${job.value?.title} | Careers at PT of the City`,
  description,
  ogTitle: () => `${job.value?.title} | Careers at PT of the City`,
  ogDescription: description,
});
</script>
