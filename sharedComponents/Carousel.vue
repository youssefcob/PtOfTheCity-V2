<script setup lang="ts">

import { ref, onMounted, type Ref } from 'vue';

const wheel: Ref<HTMLElement | null> = ref(null);

let currentIndex = ref(0);
let carouselItemsNo = ref(0);


const props = defineProps({
    NoIndicator: Boolean,
    NoButtons: Boolean,
    behavior: String,
});

onMounted(() => {
    if (wheel.value) {
        wheel.value.addEventListener('scroll', updateCurrentIndexBasedOnScroll);
    }
    carouselItemsNo.value = wheel.value?.childElementCount || 0;

});

const updateCurrentIndexBasedOnScroll = () => {
    if (!wheel.value) return;
    const el = wheel.value;
    const totalScroll = el.scrollWidth - el.clientWidth;
    const currentScroll = el.scrollLeft;
    // Update currentIndex based on the scroll position
    // For simplicity, dividing the scrollable area into equal parts based on the number of services
    const parts = carouselItemsNo.value;
    if (!parts) return;
    const scrollPerPart = totalScroll / parts;
    currentIndex.value = Math.min(parts - 1, Math.floor(currentScroll / scrollPerPart));

};

const scroll = (direction: number) => {
    if (wheel.value) {
        const el = wheel.value as HTMLElement;
        if (el) {
            const width = el.clientWidth;

            const threshold = 100;
            const isNearEnd = el.scrollLeft + threshold >= el.scrollWidth - el.clientWidth;

            if (direction === 1 && (isNearEnd || el.scrollLeft + el.clientWidth >= el.scrollWidth)) {
                currentIndex.value = 0;
                el.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                if (direction === -1 && currentIndex.value === 0) {
                    currentIndex.value = 0;
                } else if (direction === 1 && carouselItemsNo.value && currentIndex.value === carouselItemsNo.value - 1) {
                    currentIndex.value = 0;
                } else {
                    currentIndex.value += direction;
                }
                el.scrollTo({
                    left: el.scrollLeft + ((width * direction) - width / 4),
                    behavior: 'smooth'
                });

            }
        }
    }
};

defineExpose({
    scroll,
})


</script>

<template>
    <div class="carousel-wrapper">
        <div class="carousel">

            <div class="btn left" v-if="!NoButtons" @click="scroll(-1)"> <svg xmlns="http://www.w3.org/2000/svg"
                    width="18" height="10.5" viewBox="0 0 12 7" fill="none">
                    <path d="M1 1L6 6L11 1" stroke="black" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg></div>

            <div class="carousel-items" ref="wheel">
                <slot></slot>


            </div>

            <div class="btn right" v-if="!NoButtons" @click="scroll(1)"> <svg xmlns="http://www.w3.org/2000/svg"
                    width="18" height="10.5" viewBox="0 0 12 7" fill="none">
                    <path d="M1 1L6 6L11 1" stroke="black" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg></div>

        </div>
        <div class="indicator-container" v-if="!NoIndicator">
            <div class="indicator" v-for="i in carouselItemsNo" :key="i" :class="{ active: i - 1 === currentIndex }">
            </div>

        </div>
    </div>
</template>




<style scoped lang="scss">
$btnPadding :1.7rem;
.carousel-wrapper {
    display: flex;
    flex-direction: column;

    .indicator-container {
        align-self: center;
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        margin-top: 1rem;

        .indicator {
            width: 0.5rem;
            height: 0.5rem;
            margin-top: 0.5rem;
            border-radius: 50%;
            background-color: $darkgrey;
            transition: background-color 0.3s ease-in-out;

            &.active {
                background-color: $blue;
            }
        }
    }

    >.carousel {
        height: 100%;
        display: flex;
        justify-content: space-between;
        gap: calc($pageMargin - ($btnPadding * 2) - 1rem);


        >.carousel-items {
            width: fit-content;
            width: 100%;
            display: flex;
            scroll-snap-type: x mandatory;
            overflow-x: auto;
            justify-content: flex-start;

            @include scrollBar;

            gap: 1rem;

            &::-webkit-scrollbar {
                @media screen and (min-width: 800px) {
                    display: none;
                }
            }

        }

        >.btn {
            // width: 4.2rem;
            padding:1.7rem;
            background-color: $navy;
            color: $white;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: background-color 0.3s ease-in-out;

            @media screen and (max-width: 500px) {
                display: none;
            }

            &:hover {
                background-color: darken($navy, 10%);
                transition: background-color 0.3s ease-in-out;
            }

            &.left {
                border-radius: 0 1.25rem 1.25rem 0;

                &>svg {
                    transform: rotate(90deg);

                    >path {
                        stroke: $grey;

                    }
                }
            }

            &.right {
                border-radius: 1.125rem 0rem 0rem 1.125rem;

                &>svg {
                    transform: rotate(270deg);

                    >path {
                        stroke: $grey;

                    }
                }
            }
        }
    }
}
</style>