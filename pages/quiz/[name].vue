<script lang="ts" setup>
import quizzes from '~/data/quizzes';
import quizSeo from '~/assets/seoMetaTags/quiz/pelvic';

const route = useRoute();
const quizSlug = decodeURIComponent(route.params.name as string);
const currentQuiz = quizzes[quizSlug];

// IDK what's the difference between this and the one in the component, but when I removed this, I got 
// 500
// Cannot read properties of undefined (reading 'title'), So I'm leaving it for now. 
if (!currentQuiz) {
  throw createError({ statusCode: 404, statusMessage: 'Quiz not found' });
}

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Quiz',
        name: currentQuiz.title,
        description: currentQuiz.description,
        url: `https://www.ptofthecity.com${route.fullPath}`,
        provider: {
          '@type': 'Organization',
          name: 'PT of the City',
          url: 'https://www.ptofthecity.com/',
        },
      }),
    },
  ],
});
usePageSeo(quizSeo)
</script>

<template>
  <Quiz />
</template>