<script setup lang="ts">
import { type Ref } from 'vue';
import InfiniteCarousel from '~/sharedComponents/InfiniteCarousel.vue';
import type { TrustedBy } from '~/types/types';




const homepageData = inject('homepageData') as Ref<{
    trustedBy: TrustedBy[]
}>;
const homepagePending = inject('homepagePending');
const homepageError = inject('homepageError');

const trustedBy = computed(() => homepageData.value?.trustedBy as TrustedBy[]);




</script>

<template>
    <div class="trustedBy-container">
        <h1 class="sectionHeader-m">{{ $translate('trusted_by') }}</h1>
        <InfiniteCarousel :animationDuration="20">
            <div class="item" v-for="(item, index) in trustedBy" :key="index"
            :style="`background-image: url(${item.path})`"></div>
        </InfiniteCarousel>
    </div>
</template>

<style scoped lang="scss">
.trustedBy-container {

    >.trustBy-carousel {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        overflow-x: scroll;
        @include scrollBar;

        @media screen and (max-width: 500px) {
            margin-left: $resMargin;
        }

        >.item {

            // @include image();
            background-position: 0%;
            background-size: 100% 100%;
            // background-size: ;
            width: 21rem;
            height: 21rem;
            // background-color: $darkgrey;
            border-radius: $border-radius;
            flex: 0 0 auto;
            box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);

        }
    }

    .item {

        background-position: 0%;
        background-size: 100% 100%;
        width: 19rem;
        aspect-ratio: 1/1;
        border-radius: $border-radius;
        flex: 0 0 auto;

    }
}
</style>