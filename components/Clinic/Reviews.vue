<template>
  <div>
    <h2 class="title">Patient Reviews</h2>
    <Carousel v-if="reviews" class="carousel">
      <SingleTestimonial v-for="review in reviews" :review="review" />

    </Carousel>
  </div>
</template>

<script lang="ts" setup>
import type { Review } from '~/types/types';
import SingleTestimonial from './Testimonials/SingleTestimonial.vue';
import Carousel from '~/sharedComponents/Carousel.vue';

// const reviews = ref<Review[] | null>([])

const props = defineProps({
  reviews: {
    type: Object as () => Review[] | null,
    required: true
  },

})


</script>

<style scoped lang="scss">
.title {
  margin-left: $pageMargin;
  font-weight: 700;


}
</style>