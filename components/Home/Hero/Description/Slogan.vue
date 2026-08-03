<script setup lang="ts">

import { ref, onMounted, type Ref } from 'vue';


const wheel: Ref<HTMLElement | null> = ref(null);

let currentIndex = ref(0);
let carouselItemsNo = ref(0);

const props = defineProps({
    description: {
        type: Array as () => string[],
        default: ['Default Description']
    },
    animation: {
        type: String,
        default: 'default-animation'
    },
    interval: {
        type: Number,
        default: 3000
    }
})

const docState = ref(props.description[currentIndex.value])

onMounted(() => {
    setInterval(() => {
        currentIndex.value++;
        if (currentIndex.value >= props.description.length) {
            currentIndex.value = 0
        }
        docState.value = props.description[currentIndex.value]

    }, props.interval)
})

</script>

<template>
    <div class="slogan-container">
        <transition-group name="slide-up">
            <template v-for="(item, index) in props.description" :key="index">
                <h2 class="slogan" v-if="docState == item">{{ item }}</h2>

            </template>
        </transition-group>
    </div>
</template>



<style lang="scss" scoped>
.slogan-container {
    position: relative;
    height: 4rem;
}

.slogan {
    position: absolute;
    display: inline-block;
    color: white;
    line-height: 100%;
    font-weight: 400;
    display: block;
    padding-bottom: 10px;
    // background: linear-gradient(70deg, #ffffff, $blue );
    // /* Gradient colors */
    // -webkit-background-clip: text;
    // -webkit-text-fill-color: transparent;

    @media only screen and (max-width: 600px) {
        font-weight:600;
        font-size:3rem;
    }
}

// .slogan {
//     position: absolute;
//     display: inline-block;
//     color: white;
//     line-height: 100%;
//     font-weight: 400;
//     display: block;
//     padding-bottom: 10px;
//     background: linear-gradient(70deg, #ffffff, $blue );
//     /* Gradient colors */
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;

//     @media only screen and (max-width: 600px) {
//         font-weight:600;
//         font-size:5rem;
//     }
// }

.slide-up-enter-active,
.slide-up-leave-active {
    transition: all 0.25s ease-out;
}

.slide-up-enter-from {
    opacity: 0;
    transform: translateY(30px);
}

.slide-up-leave-to {
    opacity: 0;
    transform: translateY(-30px);
}
</style>