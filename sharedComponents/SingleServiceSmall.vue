<script setup lang="ts">
import { type Service } from '~/types/types';

const props = defineProps({
    service: {
        type: Object as () => Service
    }
});

const emits = defineEmits(['navigate']);
// console.log(props.service);


</script>

<template>


    <NuxtLink :to="`/service/${props.service?.slug}`" class="card"
        :aria-label="`Learn more about ${props.service?.title}`" :title="`${props.service?.title} Service`">
        <div class="image" :style="{ backgroundImage: `url(${useImg(props.service?.path)})` }" />
        <h3 class="title">{{ $props.service?.title }}</h3>
    </NuxtLink>
</template>

<style scoped lang="scss">
.card {
    width: 100%;
    height: 100%;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    text-decoration: none;
}

.image {
    flex: 1;
    background-position: center;
    background-size: cover;
    border-radius: inherit;
}

.title {
    text-align: center;
    color: $black;
    padding: 0.75rem 0.5rem;
    font-weight: 600;
    font-size: 1.2rem;

    @media screen and (max-width: 500px) {
        font-size: 0.9rem;
        padding: 0.6rem 0.5rem;
    }
}
</style>