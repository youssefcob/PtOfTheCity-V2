<script setup lang="ts">

import type { Review } from '~/types/types';
import SingleTestimonial from './SingleTestimonial.vue';
// import { testimonials } from './Testimonial';
import Carousel from '~/sharedComponents/Carousel.vue';

const props = defineProps({
    rating: {
        type: Number
    },
    reviews: {
        type: Object as () => Review[]
    },
    user_ratings_total: {
        type: Number
    }

});

// console.log(props.rating)

</script>

<template>
    <div class="testimonials">
        <h1 class="sectionHeader">{{$translate('Reviews')}}</h1>

        <Carousel class="carousel">
            <SingleTestimonial v-for="review in props.reviews" :review="review" />

        </Carousel>
 
    </div>
</template>

<style scoped lang="scss">
.testimonials {
    width: 100%;
    @include flexDirection(column);
    >.sectionHeader {
        width:100%;
    }
    >h1 {
        color: $navy;
        @include pagePadding;
        align-self: flex-start;
    }

    .carousel{
        height: 24vw;
        min-height: 300px;
        width:100%;
    }


}
</style>