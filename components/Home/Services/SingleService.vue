<script setup lang="ts">
// import router from '@/router';
import ServiceDescription from './ServiceDescription.vue';
import type { Service } from '~/types/types';

const props = defineProps({
    service: {
        type: Object as () => Service
    }
});




</script>

<template>
    <div  class="single-service-container">
        <div class="single-service" :style="{ backgroundImage: `url(${useImg(props.service?.path)})` }">
            <div class="service-description">
                <ServiceDescription :service="props.service" />
            </div>
        </div>
        <NuxtLink :to="`/service/${props.service?.slug}`" class="mobile-description"
        :aria-label="`Learn more about ${props.service?.title}`" :title="`${props.service?.title} Service`">
            <div class="header-buttons-wrapper">
                <h2 class="smallHeader">{{ props.service?.title || '' }}</h2>
            </div>
            
        </NuxtLink>
    </div>
</template>

<style scoped lang="scss">
.single-service-container {
    flex-shrink: 0;
    @include carouselItem2(1.03);
    height: 100%;
    overflow: hidden;


    .single-service {
        overflow: hidden;
        @include flex(center, flex-end);
        background-size: cover;
        background-position: center;
        width: 100%;
        border-radius: $border-radius;
        height: 100%;

        @media screen and (max-width: 500px) {
            height: 65%;
        }

        .service-description {
            width: clamp(17rem, 35%, 50rem);
            height: 100%;

            @media screen and (max-width: 500px) {
                display: none;
            }
        }
    }

    .mobile-description {
        display: none;

        @media screen and (max-width: 500px) {
            display: block;
            padding: 1rem;

            .header-buttons-wrapper {
                display: flex;
                align-items: center;

                .btns {
                    display: flex;
                    gap: 1.6rem;

                    >.btn {
                        padding: 1rem 0.75rem;

                        &.left>svg {
                            transform: rotate(90deg);
                        }

                        &.right>svg {
                            transform: rotate(270deg);
                        }
                    }
                }


            }

            .text-s {
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
            }

        }
    }
}
</style>