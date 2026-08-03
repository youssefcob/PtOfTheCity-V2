<script setup lang="ts">
import type { Service } from '~/types/types';
const props = defineProps({
    service: {
        type: Object as () => Service,
    }
});


</script>

<template>
    <div class="ser">
        <h1 class="title">{{ props.service?.title }}</h1>
        <!-- <p class="description">{{ props.service?.listHeader }}</p> -->
            <ul class="list" v-if="props.service?.list">
                <li v-for="list_item in props.service?.list"> {{ list_item }}</li>
            </ul>
        <NuxtLink active-class="navbar-link" class="learn-more btn transparent btnfont"
            :to="`/service/${props.service?.slug}`"
            :aria-label="`Learn more about ${props.service?.title}`" :title="`${props.service?.title} Service`">
            <!-- {{ $translate('learn_more') }} -->
            {{ props.service?.title }} Service
        </NuxtLink>
    </div>
</template>

<style scoped lang="scss">
.ser {
    height: 100%;
    @include backDrop();
    padding: 0 3.13rem;
    padding-top: 3rem;
    padding-bottom: 2.13rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    >.title {
        color: $white;

        @media screen and (max-width: 800px) {
            font-size: 2rem;
            // align-self: center;
            margin: auto;

        }
    }

    >.list li {
        @extend .text;
        color: $white;
        list-style-position: inside;


    }

    .learn-more {
        align-self: flex-end;
        margin-top: auto;
        width: 50%;
        color: $white;

    }

    // >h1,


    @media (max-width: 800px) {

        .description,
        .list {
            display: none;
        }

        .learn-more {
            width: 100%;
            align-self: center;
            margin-bottom: auto;
        }

    }

    @media (max-width: 500px) {
        .learn-more {
            display: none;
        }
    }





}
</style>