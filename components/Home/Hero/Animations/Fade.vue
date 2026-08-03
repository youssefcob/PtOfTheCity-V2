<script setup lang="ts">
import { ref, onMounted, onUnmounted, type Ref } from 'vue';

const cloudinaryW = (path: string, width: number) => useImg(path, width);

const props = defineProps({
    images: {
        type: Array as () => {path:string}[],
        default: () => [
            '/images/careers.png',
            '/images/contactUs.jpg',
            '/images/eligibilityFormImage.jpg',
        ]
    },
    interval: {
        type: Number,
        default: 3000
    }
});


let currentIndex: Ref<number> = ref(0);

const nextImage = () => {
    currentIndex.value = (currentIndex.value + 1) % props.images.length;
};

let intervalId: number | undefined;

onMounted(() => {
    intervalId = setInterval(nextImage, props.interval) as unknown as number; // Change image every 3 seconds

    // props.images.forEach((i)=>{
    //     useImg(i.path)
    // })
});

onUnmounted(() => {
    if (intervalId) {
        clearInterval(intervalId);
    }
});
</script>

<template>
    <div class="image-container">
        <div class="background-image">
            <img
                :src="cloudinaryW(props.images[currentIndex].path, 800)"
                :srcset="`${cloudinaryW(props.images[currentIndex].path, 480)} 480w, ${cloudinaryW(props.images[currentIndex].path, 800)} 800w, ${cloudinaryW(props.images[currentIndex].path, 1280)} 1280w, ${cloudinaryW(props.images[currentIndex].path, 1920)} 1920w`"
                sizes="100vw"
                fetchpriority="high"
                loading="eager"
                alt=""
                class="hero-img"
            />
            <div class="desc">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.image-container {
    width: 100%;
    height: 100%;
    position: relative;

    .background-image {
        overflow: hidden;
        width: 100%;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;

        .hero-img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
        }

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(270deg, rgba(44, 50, 51, 0.00) 0%, #2C3233 83.17%);
            z-index: 1;
            @media screen and (max-width: 600px) {
                background: linear-gradient(270deg, rgba(44, 50, 51, 0.00) 0%,rgba(44, 50, 51, 0.9) 70%);
            }
        }

        .desc {
            position: relative;
            height: 100%;
            width: 100%;
            z-index: 2;
        }

        ::-webkit-scrollbar {
            display: none;
        }
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s ease-in-out;
}


.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>