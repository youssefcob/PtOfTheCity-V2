<template>
  <div>
    <h2 class="title">Our Services</h2>
    <div class="services-container ">
      <div class="service" v-for="service in services" :key="service.id">
        <SingleServiceSmall :service="service" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Carousel from '~/sharedComponents/Carousel.vue';
import SingleServiceSmall from '~/sharedComponents/SingleServiceSmall.vue';
import type { Service } from '~/types/types';

const props = defineProps({
  services: {
    type: Object as () => Service[],
    required: true
  },

})
</script>

<style scoped lang="scss">
.title {
  color: $navy;
}
.services-container {
  gap: 1rem;
  width: 100vw;

  @media screen and (min-width: 800px) {
    @include pagePadding();
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr));
  }

  @media screen and (max-width: 799px) {
    display: flex;
    align-items: center;
    justify-content: flex-start; // changed from center
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    padding: 0 1rem; // add some padding
  }

  .service {
    aspect-ratio: 1/1;
    border-radius: $border-radius;
    overflow: hidden;

    @media screen and (max-width: 799px) {
      flex: 0 0 auto;
      width: 30rem; // reduced from 30rem for better mobile experience
      margin-right: 1rem;
    }
  }
}

.title{
  margin-left:$pageMargin;
  font-weight:700;
  
  @media screen and (max-width:1100px) {
    margin-left:1rem;
  }
}
</style>