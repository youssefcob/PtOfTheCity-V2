<script setup lang="ts">
import type { Clinic } from '~/types/types';

const props = defineProps({
  clinics: {
    type: Array as () => Clinic[],
    default: () => []
  },
  serviceName: {
    type: String,
    required: true
  }
});

// Helper function to create URL-friendly clinic names
const createSlug = (title: string) => {
  return title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
};
</script>

<template>
  <div v-if="clinics && clinics.length > 0" class="service-clinics">
    <!-- <h3>Available at:</h3>
    <div class="clinics-list">
      <NuxtLink 
        v-for="clinic in clinics" 
        :key="clinic.id"
        :to="`/clinic/${createSlug(clinic.name)}`"
        class="clinic-link"
      >
        {{ clinic.name }}
      </NuxtLink>
    </div> -->

    <h3>Book Now At Your Nearest Clinic.</h3>

    <div class="results-wrapper">
      <!-- <NuxtLink :to="`/booking/${clinic?.name}/${props.serviceName}`" class="single-result"
        v-for="(clinic, index) in props.clinics">
        <span class="name"> {{ clinic.name }} </span>
        <br>
        <span class="address ps"> {{ clinic.street_address }}</span>
      </NuxtLink> -->


      <NuxtLink :to="{ path: '/booking', query: { clinic: clinic?.name, service: props.serviceName } }"
        class="single-result" v-for="(clinic, index) in props.clinics">
        <span class="name"> {{ clinic.name }} </span>
        <br>
        <span class="address ps"> {{ clinic.street_address }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.service-clinics {
  margin-top: 1rem;


  h3 {
    font-size: 2.2rem;
    font-weight: 600;
    color: $navy;
  }


  .results-wrapper {
    margin-top: 0.5rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(22%, 1fr));
    grid-auto-rows: 1fr;
    gap: 0.5rem;

    width: 100%;


    .single-result {
      background-color: $light-green;
      flex-grow: 1;
      padding: 0.5rem 1rem;
      border-radius: 1rem;
      cursor: pointer;

      &:hover {
        background-color: darken($light-green, 10%);
      }

      .name {
        font-weight: 600
      }

      .address.ps {
        margin: 0;
        font-weight: 500;
        color: $black;

      }

      @media screen and (min-width: 768px) {
        max-width: 25rem;

      }
    }
  }

  @media screen and (max-width: 768px) {

    .results-wrapper {
      grid-template-columns: 1fr;

      .single-result {
        padding: 1.2rem;

      }
    }

  }
}
</style>