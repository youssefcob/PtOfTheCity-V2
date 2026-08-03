<script setup lang="ts">
import { onMounted, ref, type Ref, inject, computed } from 'vue';
import Carousel from '~/sharedComponents/Carousel.vue';
// import BackGroundImage from '../landingSection/BackGroundImage.vue';
import Fade from './Animations/Fade.vue';
import Description from './Description/Description.vue';
// import { campaign, getCampaigns } from '~/mixins/Hero';
import type { Campaign } from '~/types/types';

const carousel: Ref<typeof Carousel | null> = ref(null);

const homepageData = inject('homepageData') as Ref<{
    campaigns: Campaign[]
}>;
const homepagePending = inject('homepagePending');
const homepageError = inject('homepageError');

const campaignData = computed(() => homepageData.value?.campaigns as Campaign[]);

const initiateScroll = () => {
    carousel.value?.scroll(1);
}

onMounted(() => {
    // setInterval(initiateScroll, 10000);
})
</script>

<template>
    <div class="container">
        <!-- Loading state -->
        <div v-if="homepagePending" class="hero-loading">
            <div class="loading-text">Loading...</div>
        </div>

        <!-- Error state -->
        <div v-else-if="homepageError" class="hero-error">
            <div class="error-text">Failed to load content</div>
        </div>

        <!-- Carousel with data -->
        <Carousel v-else-if="campaignData" NoIndicator NoButtons ref="carousel" class="carousel">
            <div v-for="(item, index) in campaignData" class="carousel-item" :key="index">
                <Fade :interval="Number(item.animation_interval)" :images="item.images">
                    <div class="description">
                        <Description :title="item.title" :description="item.slogans" :animation="item.slogans_animation"
                            :interval="Number(item.animation_interval)" :buttonLink="item.buttonLink"
                            :buttonText="item.buttonText" />
                    </div>
                </Fade>
            </div>
        </Carousel>
    </div>
</template>

<style scoped lang='scss'>
.hero-loading,
.hero-error {
    display: flex;
    justify-content: center;
    align-items: center;
    height: $landinPageHeight;

    .loading-text,
    .error-text {
        font-size: 1.2rem;
        color: $navy;
    }
}

.carousel-item {
    @include carouselItem2(1);
    height: $landinPageHeight;
}

.description {
    position: relative;
    // top: 40%;
    // left: 13%;
    height: 100%;
}

</style>