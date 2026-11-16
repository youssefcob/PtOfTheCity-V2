<script setup lang="ts">
import EditableText from '~/components/Admin/EditableText.vue';
import StaffMember from '~/components/Home/OurStaff/StaffMember.vue';
import Carousel from '~/sharedComponents/Carousel.vue';
import type { Staff } from '~/types/types';

defineProps<{ staff: Staff[] }>();

const carouselRef = ref<InstanceType<typeof Carousel> | null>(null);
const carouselIndex = ref(0);
const carouselTotal = ref(0);

const onCarouselChange = (payload: { index: number; total: number }) => {
  carouselIndex.value = payload.index;
  carouselTotal.value = payload.total;
};
</script>

<template>
  <section v-if="staff.length" class="staff-team">
    <div class="intro-row">
      <div class="intro">
        <EditableText tag="p" class="overline" content-key="staff.team.overline" default="Meet Us" />
        <EditableText tag="h2" class="heading" content-key="staff.team.heading" default="Meet the Rest of the Team" />
      </div>

      <div v-if="carouselTotal > 1" class="controls">
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

    <Carousel ref="carouselRef" NoIndicator NoButtons class="members" @change="onCarouselChange">
      <StaffMember v-for="member in staff" :key="member.id" :staffMember="member" />
    </Carousel>
  </section>
</template>

<style scoped lang="scss">
.staff-team {
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  background-color: $surface-cream;
  @include pagePadding();
  padding-top: 6.4rem;
  padding-bottom: 6.4rem;

  @media screen and (max-width: 900px) {
    gap: 2.4rem;
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
}

.intro-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.6rem;
}

.intro {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  min-width: 0;

  :deep(span) {
    color: inherit;
    font: inherit;
    letter-spacing: inherit;
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
  width: 4.4rem;
  height: 4.4rem;
  border-radius: 50%;
  background-color: $white;
  border: 1px solid $border-gray;
  cursor: pointer;

  &.active {
    border-color: $primary-base;
  }

  img {
    width: 2rem;
    height: 2rem;
  }
}

.dots {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.dot {
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  background-color: $border-gray;

  &.active {
    width: 3.2rem;
    border-radius: 10rem;
    background-color: $primary-base;
  }
}
</style>
