<script setup lang="ts">
import Carousel from '~/sharedComponents/Carousel.vue';
import type { Blog } from '~/types/types';

const props = defineProps({
  NoTitle: Boolean,
});

// Pre-fetch services data during SSR
const homepageData = inject<Ref<{ blogs: Blog[] }>>('homepageData', ref({ blogs: [] }));


const blogs = computed(() => (homepageData.value?.blogs || []))

const pending = inject('homepagePending');
const error = inject('homepageError');
</script>

<template>
  <div class="container">
    <h1 class="sectionHeader-m" v-if="!NoTitle && blogs && blogs.length">Resources</h1>

    <div v-if="pending" class="loading">
      <div class="loading-text">Loading services...</div>
    </div>

    <div v-else-if="error" class="error">
      <div class="error-text">Failed to load services</div>
    </div>

    <Carousel v-else-if="blogs && blogs.length" NoIndicator class="carousel">

      <template v-for="blog in blogs">
        <NuxtLink class="singleBlog" :to="`/blogs/${blog.title}`">
          <blogs-content-blog-card :blog="blog" />
        </NuxtLink>
      </template>
    </Carousel>
  </div>
</template>

<style scoped lang="scss">
.loading,
.error {
  display: flex;
  justify-content: center;
  align-items: center;
  height: clamp(35rem, 30vw, 70rem);

  .loading-text,
  .error-text {
    font-size: 1.2rem;
    color: $navy;
  }
}

.container {
  .carousel {
    // height: clamp(35rem, 30vw, 70rem);

    @media screen and (max-width: 500px) {
      @include padding(left);
    }

    .singleBlog {
      @include carouselItem2(3);

      @media screen and (max-width: 1300px) {
        @include carouselItem2(2);
      }

      @media screen and (max-width: 900px) {
        @include carouselItem2(1);
      }
    }
  }
}
</style>