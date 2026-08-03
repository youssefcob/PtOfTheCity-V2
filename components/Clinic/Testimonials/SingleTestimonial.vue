<script setup lang="ts">
import type { Review } from '~/types/types';



const props = defineProps({
    review: {
        type: Object as () => Review
    }
});

// console.log(props.review)

</script>

<template>

    <div class="testimonial">
        <div class="header">
            <div class="image" :style="`background-image: url(${props.review?.profile_photo_url})`"></div>
            <div class="headline">
                {{ $props.review?.author_name }}<br>
                <span class="ps">{{ $props.review?.relative_time_description }}</span>
            </div>
        </div>
      
        <div class="content">
            <p>{{$props.review?.text}} </p>
        </div>
    </div>
</template>

<style scoped lang="scss">
.testimonial {
    // width: 32.5%;
    @include carouselItem2(2.01);
    scroll-snap-align: start;
    height: 100%;
    flex-shrink: 0;
    border-radius: $border-radius;
    background: #FFF;
    padding:1rem;
    @media screen and (max-width: 800px) {
        @include carouselItem2(2);

    }

    @media screen and (max-width: 500px) {
        @include carouselItem2(1);
        display:flex;

    }

   
    @media screen and (max-width: 500px) {
                padding:2rem;
    }

    >.header {
        display: flex;
        align-items: center;
        padding-bottom:10px;
        @media screen and (max-width: 500px) {
        display:flex;
        flex-direction: column;
        padding-right:1rem;


    }

        >.image {
            width: 5rem;
            height: 5rem;
            // background-color: $blue;
            border-radius: 1.125rem;
            background-size: cover;
            background-position: center;
            @media screen and (max-width: 500px) {
                width: 10rem;
                height: 10rem;
    }

        }

        >.headline {
            margin-left: 1rem;
            font-weight: bolder;
            color:$navy;
            @extend .text;
            @media screen and (max-width: 500px) {
                margin-top:1rem;
    }
        }

    }

    >.content {
        height: 65%;
        overflow-y: scroll;
        @include scrollBar;
        @media screen and (max-width: 500px) {
                height:90%;
    }
       

        p {
            // font-size: 1rem;
            // font-family: $montserrat;
            // color: $black;
            @extend .text-s;
            @media screen and (max-width: 500px) {
                font-size:14px;
                // margin-top:1rem;
    }
        }
    }
}
</style>