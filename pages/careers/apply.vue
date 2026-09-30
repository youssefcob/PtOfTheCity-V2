<template>
  <CareerApplyForm :jobs="data || []" :initial-position="initialPosition" />
</template>

<script setup lang="ts">
import CareerApplyForm from '~/components/Careers/CareerApplyForm.vue';
import careersSeo from '~/assets/seoMetaTags/careers';
import type { Job } from '~/types/types';

const route = useRoute();
const initialPosition = typeof route.query.position === 'string' ? route.query.position : undefined;

const { data } = await useFetch<Job[]>(`${useUrl()}/web/careers`);

const {
  contentMap: pageContentMap,
  isContentEditor: pageIsContentEditor,
  textStyles: pageTextStyles,
  pageMeta: pageMetaData,
} = await usePageContent('careers');
providePageContent('careers', pageContentMap, pageIsContentEditor, pageTextStyles, pageMetaData);

// Not passed pageMetaData: the "careers" CMS meta belongs to the listing page
// and would otherwise override this page's own title and canonical.
usePageSeo({
  ...careersSeo,
  title: 'Apply | Careers at PT of the City',
  ogTitle: 'Apply | Careers at PT of the City',
  twitterTitle: 'Apply | Careers at PT of the City',
  canonical: 'https://www.ptofthecity.com/careers/apply',
  ogUrl: 'https://www.ptofthecity.com/careers/apply',
  twitterUrl: 'https://www.ptofthecity.com/careers/apply',
});
</script>
