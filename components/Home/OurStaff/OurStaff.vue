<script setup lang="ts">
import StaffMember from '~/components/Home/OurStaff/StaffMember.vue';
import Carousel from '~/sharedComponents/Carousel.vue';
import EditableText from '~/components/Admin/EditableText.vue';
import type { Staff } from '~/types/types';

const homepageData = inject('homepageData') as Ref<{
  staff: Staff[];
} | null>;

const homepagePending = inject('homepagePending');
const homepageError = inject('homepageError');

const staff = computed(() => homepageData.value?.staff as Staff[]);

const carouselRef = ref<InstanceType<typeof Carousel> | null>(null);
const carouselIndex = ref(0);
const carouselTotal = ref(0);

const onCarouselChange = (payload: { index: number; total: number }) => {
    carouselIndex.value = payload.index;
    carouselTotal.value = payload.total;
};
</script>

<template>
    <div class="trust-team">
        <div class="intro-row">
            <div class="intro">
                <EditableText tag="p" class="overline" content-key="home.staff.overline" default="Meet Us" />
                <EditableText tag="h2" class="heading" content-key="home.staff.heading" default="Experience You Can Trust" />
                <EditableText tag="p" class="body" content-key="home.staff.body"
                    default="Not sure if your insurance covers physical therapy? We'll verify your coverage and explain your options." />
            </div>

            <div class="controls" v-if="carouselTotal > 1">
                <button class="nav-btn" type="button" aria-label="Previous staff member" @click="carouselRef?.scroll(-1)">
                    <img src="/images/home/icon-caret-prev.svg" alt="" aria-hidden="true" />
                </button>
                <div class="dots">
                    <span v-for="n in carouselTotal" :key="n" class="dot" :class="{ active: n - 1 === carouselIndex }"></span>
                </div>
                <button class="nav-btn active" type="button" aria-label="Next staff member" @click="carouselRef?.scroll(1)">
                    <img src="/images/home/icon-caret-next.svg" alt="" aria-hidden="true" />
                </button>
            </div>
        </div>

        <Carousel ref="carouselRef" NoIndicator NoButtons class="staffMembers" @change="onCarouselChange">
            <StaffMember v-for="staffMember in staff" :key="staffMember.id" :staffMember="staffMember" />
        </Carousel>
    </div>
</template>

<style scoped lang="scss">
.trust-team {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    padding: 3.75rem 7.5rem;
    background-color: $grey;

    @media screen and (max-width: 900px) {
        padding: 2.5rem 1.5rem;
    }
}

.intro-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    .controls{
        align-self: flex-end;
    }
}

.intro {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-width: 42rem;
    min-width: 0;
}

.controls {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-shrink: 0;

    @media screen and (max-width: 700px) {
        display: none;
    }
}

.nav-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 50%;
    background-color: #ffffff;
    border: 0.8px solid $border-gray;
    cursor: pointer;

    &.active {
        border-color: $primary-base;
    }

    img {
        width: 1.25rem;
        height: 1.25rem;
    }
}

.dots {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: $border-gray;

    &.active {
        width: 2rem;
        background-color: $primary-base;
        border-radius: 100px;
    }
}

.overline {
    @include type-overline;
    color: $primary-700;
}

.heading {
    @include type-h2;
    text-transform: uppercase;
    color: $primary-600;
}

.body {
    @include type-body;
    color: $primary-700;
    background-color: $white;
    padding:1rem;
    border-radius: 1rem;
}

.staffMembers {
    // height: 22rem;

    @media screen and (max-width: 500px) {
        margin-left: $resMargin;
    }
}
</style>
