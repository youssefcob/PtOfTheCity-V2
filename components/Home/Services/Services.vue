<script setup lang="ts">
import SingleService from './SingleService.vue';
import { getServices } from '~/mixins/Services';
import Carousel from '~/sharedComponents/Carousel.vue';
import type { Service } from '~/types/types';

const props = defineProps({
    NoTitle: Boolean,
});

// Pre-fetch services data during SSR
const homepageData = inject('homepageData') as Ref<{
    services: Service[]
}>;

const services = computed(() => (homepageData.value.services || []).filter(service =>
    service.title?.toLowerCase() !== 'initial check-up'
) || [])
// console.log('services', services.value);

const pending = inject('homepagePending');
const error = inject('homepageError');
</script>

<template>
    <div class="container">
        <h1 class="sectionHeader-m" v-if="!NoTitle">{{ $translate('services') }}</h1>

        <div v-if="pending" class="services-loading">
            <div class="loading-text">Loading services...</div>
        </div>

        <div v-else-if="error" class="services-error">
            <div class="error-text">Failed to load services</div>
        </div>

        <Carousel v-else-if="services" NoIndicator class="carousel" v-slot="scope">

            <SingleService class="singleService" v-for="service in services" :key="service.id" :service="service" />
        </Carousel>
    </div>
</template>

<style scoped lang="scss">
.services-loading,
.services-error {
    display: flex;
    justify-content: center;
    align-items: center;
    height: clamp(35rem, 30vw, 70rem);

    .loading-text,
    .error-text {
        font-size: 1.2rem;
        color: $navy;
    }
}

.container {
    .carousel {
        height: clamp(35rem, 30vw, 70rem);

        @media screen and (max-width: 500px) {
            @include padding(left);
        }

        .singleService {
            @media screen and (min-width: 500px) {
                @include carouselItem2(1);
            }
        }
    }
}
</style>