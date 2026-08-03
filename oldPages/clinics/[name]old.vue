<script setup lang="ts">
import ClinicsMap from '~/sharedComponents/Map.vue';
import DropDownInputField from '~/sharedComponents/DropDownInputField.vue';
import InputField from '~/sharedComponents/InputField.vue';
import { onMounted, ref, computed, watchEffect } from 'vue';
import type { Clinic } from '~/types/types';

// Get the route parameter for borough name
const route = useRoute();
const router = useRouter();

// Decode the borough name if it exists
const decodedBoroughName = computed(() => {
  return route.params.name ? decodeURIComponent(route.params.name as string) : 'all';
});
const borough = ref(decodedBoroughName.value === 'all' ? 'All Clinics' : decodedBoroughName.value);
const zip_code = ref('');
const boroughsRef = ref<InstanceType<typeof DropDownInputField> | null>(null);
onMounted(() => {
  boroughsRef.value?.defaultValue(decodedBoroughName.value === 'all' ? 'All Clinics' : decodedBoroughName.value);
});


type ClinicsGroupedByCity = Record<string, Clinic[]>;

const { data: clinicsData, pending, error } = await useFetch<ClinicsGroupedByCity>(`${useUrl()}/web/clinics`)

const boroughs = computed(() => {
  return clinicsData.value ? Object.keys(clinicsData.value) : []
})


onMounted(() => {
  // console.log(clinicsData.value)
  // console.log(boroughs)
})


const filteredClinicPositions = ref<any[]>([]);

// Filter clinics by borough
const filterClinicsByBorough = (borough: string) => {
  if (!clinicsData.value) return [];
  if (borough === 'All Clinics') {
    // Normalize clinicPositions to match the expected format
    // console.log(filteredClinicPositions.value)
    filteredClinicPositions.value = Object.values(clinicsData.value).flat();
    // console.log(filteredClinicPositions.value)


  } else if (borough) {
    filteredClinicPositions.value = clinicsData.value[borough];
  } else {
    // Case-insensitive fallback search
    const boroughLower = borough.toLowerCase();
    const matchingBorough = Object.keys(clinicsData).find(key =>
      key.toLowerCase() === boroughLower
    );
    if (matchingBorough && clinicsData.value) {
      filteredClinicPositions.value = clinicsData.value[matchingBorough];
    }
  }
};

// Main filter function
const filterClinics = () => {
  filterClinicsByBorough(borough.value);
  debouncedZipToPosition(zip_code.value);
};
// Reactive data

// Google API key
const config = useRuntimeConfig();
const google_api_key = config.public.googleApiKey;

// Debounce function
const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};
const debouncedZipToPosition = debounce(async (zip_code: string) => await filterbyZip(zip_code), 400);

// Convert zip to position
const convertZipToPosition = async (zip_code: string) => {
  if (!zip_code) return;
  try {
    const res = await $fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${zip_code}&key=${google_api_key}`);
    return (res as any).results[0].geometry.location;
  } catch (error) {
    console.error('Error converting zip to position:', error);
    return null;
  }
};

// Calculate distance between two points
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  function deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}

// Filter by zip code
const filterbyZip = async ($event: string) => {
  if ($event.length < 5) return;
  const position = await convertZipToPosition($event);
  if (!position) return;

  const { lat, lng } = position;
  const radius = 8;

  filteredClinicPositions.value = filteredClinicPositions.value
    .filter(location => {
      const distance = calculateDistance(lat, lng, Number(location.lat), Number(location.long));
      return distance <= radius;
    })
    .sort((a, b) => {
      const distanceA = calculateDistance(lat, lng, Number(a.lat), Number(a.long));
      const distanceB = calculateDistance(lat, lng, Number(b.lat), Number(b.long));
      return distanceA - distanceB;
    });
};


// Debounced zip filter



// Initialize filtered positions from the fetched data
watchEffect(() => {
  if (clinicsData.value?.initialFilteredPositions) {
    filteredClinicPositions.value = clinicsData.value.initialFilteredPositions;
  }
});

// Set page title
useHead({
  title: decodedBoroughName.value === 'all'
    ? 'All Clinics - PT of the City'
    : `Clinics in ${decodedBoroughName.value} - PT of the City`,
  meta: [
    {
      name: 'description',
      content: decodedBoroughName.value === 'all'
        ? 'Find PT of the City clinics across all locations'
        : `Find PT of the City clinics in ${decodedBoroughName.value}`
    }
  ]
});
</script>

<template>
  <div class="clinics-wrapper">
    <h1>locate your closest clinic</h1>
    <div class="form-map-wrapper">
      <div class="input-wrapper">
        <div class="input-fields">
          <DropDownInputField ref="boroughsRef" :background="'#C7E3E8'" :placeHolder="'Borough'" :list="['All Clinics', ...boroughs]"
            @input="filterClinics()" v-model="borough"
            :default="decodedBoroughName === 'all' ? 'All Clinics' : decodedBoroughName" />
          <InputField :background="'#C7E3E8'" :placeHolder="'Zip Code'" @input="filterClinics()" v-model="zip_code"
            numbersOnly />
        </div>
        <h2 class="desktop">Results</h2>
      </div>
      <div class="map-wrapper">
        <ClinicsMap :zoom="9.8" :positions="filteredClinicPositions" />
      </div>
      <h2 class="mobile">Results</h2>
    </div>
    <div class="results-wrapper">
      <NuxtLink :to="`/clinic/${$createSlug(clinic.name)}`" class="single-result"
        v-for="(clinic, index) in filteredClinicPositions" :key="clinic.id">
        <span class="name">{{ clinic.name }}</span>
        <br>
        <span class="address ps">{{ clinic.street_address }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.clinics-wrapper {
  @include pagePadding;
  padding-top: calc(10vh + 1rem + 3rem);

  h2 {
    color: $navy;
    font-weight: 400;
    line-height: 100%;

    &.mobile {
      display: none;
    }
  }

  .form-map-wrapper {
    display: grid;
    grid-template-columns: 1fr 3fr;
    margin-top: 1.5rem;

    .input-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 0 0.4rem;

      .input-fields {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
    }

    .map-wrapper {
      background-color: blue;
      height: 35rem;
    }
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
      text-decoration: none;
      color: inherit;

      &:hover {
        background-color: darken($light-green, 10%);
      }

      .name {
        font-weight: 600;
      }

      .address.ps {
        margin: 0;
        font-weight: 500;
        color: $black;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .clinics-wrapper {
    padding-top: calc(10vh + 1rem + 3rem);

    h2 {
      color: $navy;
      font-weight: 400;
      line-height: 100%;

      &.mobile {
        display: block;
        margin-bottom: 1.5rem;
        font-weight: 500;
      }

      &.desktop {
        display: none;
      }
    }

    .form-map-wrapper {
      grid-template-columns: 1fr;
      gap: 2rem;

      .input-wrapper {
        .input-fields {
          gap: 0.5rem;
        }
      }
    }

    .results-wrapper {
      grid-template-columns: 1fr;

      .single-result {
        padding: 1.2rem;
      }
    }
  }
}
</style>