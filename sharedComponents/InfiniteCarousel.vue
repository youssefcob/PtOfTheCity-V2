<script setup lang="ts">
import { onMounted } from 'vue';

const props = defineProps(
    {
        animationDuration: {
            type: Number,
            default: 10,
        },
        reverse: {
            type: Boolean,
            default: false,
        },
    }
);


</script>


<template>
    <div class="infinite-carousel">
        <div class="carousel-inner" :class="`${props.reverse ? 'reverse' : ''}`"
            :style="{ animationDuration: `${props.animationDuration}s` }">
            <slot></slot>
            <slot></slot>

        </div>
    </div>
</template>

<style lang="scss" scoped>
.infinite-carousel {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: relative;

    .carousel-inner {
        display: flex;
        flex-wrap: nowrap;

        &:not(.reverse) {
            animation: move47aj 10s linear infinite;

            @keyframes move47aj {
                0% {
                    transform: translateX(0);
                }

                100% {
                    transform: translateX(calc(-50% - 1rem));
                }
            }
        }

        &.reverse {
            animation: move-reverse28734j 10s linear infinite;

            @keyframes move-reverse28734j {
                0% {
                    transform: translateX(-50%);
                }

                100% {
                    transform: translateX(calc(0% - 1rem));
                }
            }
        }




    }
}
</style>