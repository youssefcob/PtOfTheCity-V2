<template>
  <div class="clinic-card">
    <NuxtLink :to="{ path: `/clinic/${clinic.slug}` }" class="u">
      <h3>{{ clinic.name }}</h3>
    </NuxtLink>

    <div class="info">
      <div class="info-wrapper">
        <location />
        <NuxtLink :to="{ path: `/clinic/${clinic.slug}` }" class="u">{{
          clinic.street_address
        }}</NuxtLink>
      </div>
      <div class="info-wrapper">
        <Phone />
        <!-- <span class="u">{{ clinic.phone }}</span> -->
        <a class="u" :href="`tel:${clinic.phone}`">{{ clinic.phone }}</a>
      </div>
      <!-- <div class="info-wrapper"><span class="u">info@ptofthecity.com</span></div> -->
      <div class="info-wrapper">
        <Clock /><span>{{ dayRanges }}</span>
      </div>
    </div>
    <!-- <NuxtLink class="btn cta">Book Now</NuxtLink> -->

    <NuxtLink
      :to="{
        path: '/booking',
        query: { clinic: clinic.name, service: 'Initial Check-up' },
      }"
      class="btn cta"
    >
      Book Now
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
import Clock from "~/sharedComponents/icons/clock.vue";
import Location from "~/sharedComponents/icons/location.vue";
import Phone from "~/sharedComponents/icons/phone.vue";
import type { Clinic, Schedule } from "~/types/types";
const schedule = computed(() => props.clinic.schedule);
const props = defineProps({
  clinic: {
    type: Object as () => Clinic,
    required: true,
  },
});

const dayRanges = computed(() => {
  if (!props.clinic.schedule) return "";

  const dayOrder = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  const dayAbbr = {
    monday: "Mon",
    tuesday: "Tue",
    wednesday: "Wed",
    thursday: "Thu",
    friday: "Fri",
    saturday: "Sat",
    sunday: "Sun",
  };

  let openDays = dayOrder.filter((day) => {
    const s = schedule.value[day as keyof Schedule];
    return s && !s.off;
  });

  openDays = openDays.map((o) => dayAbbr[o as keyof typeof dayAbbr]);

  return openDays.join(", ");
});
</script>

<style scoped lang="scss">
.clinic-card {
  background-color: $white;
  padding: 1.3rem;
  border-radius: $border-radius;
  display: flex;
  flex-direction: column;

  h3 {
    color: $navy;
    font-weight: 700;
    font-size: 1.9rem;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
    padding: 1rem 0;

    .info-wrapper {
      // margin-top: 1rem;
      display: flex;
      align-items: center;
      gap: 0.6rem;

      span {
        font-size: 1.4rem;
      }

      .u {
        text-decoration: underline;
        color: black;
        @extend span;
        font-size: 1.4rem;
      }
    }
  }

  .btn {
    margin-top: auto;
  }
}
</style>
