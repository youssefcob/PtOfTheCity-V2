<template>
  <div class="blogs-grid">
    <template v-for="blog in blogs">
      <NuxtLink :to="`/blogs/${blog.title}`">
        <blogs-content-blog-card :blog="blog" />
      </NuxtLink>
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { Blog } from '~/types/types';

const props = defineProps({
  blogs: {
    type: Object as () => Blog[]
  }
})
</script>

<style scoped lang="scss">
.blogs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  @media screen and (max-width:860px) {
    grid-template-columns: repeat(2, 1fr);

  }

  @media screen and (max-width:500px) {
    grid-template-columns: repeat(1, 1fr);

  }
}
</style>