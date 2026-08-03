<script setup lang="ts">
import ClinicsMap from "~/sharedComponents/Map.vue";
import DropDownInputField from "~/sharedComponents/DropDownInputField.vue";
import InputField from "~/sharedComponents/InputField.vue";
import { onMounted, ref, computed, watchEffect } from "vue";
import type { Clinic } from "~/types/types";
import DropDownMobile from "~/sharedComponents/DropDownMobile.vue";
import brooklynSeoSchema from "~/assets/BoroughSeoSchema/brooklyn.json";
import ManhattanSeoSchema from "~/assets/BoroughSeoSchema/manhattan.json";
import queensSeoSchema from "~/assets/BoroughSeoSchema/queens.json";
import theBronxSeoSchema from "~/assets/BoroughSeoSchema/the-bronx.json";
import allClinicsSeoMetaTags from "~/assets/seoMetaTags/clinics/all";
import brooklynSeoMetaTags from "~/assets/seoMetaTags/clinics/brooklyn";
import manhattanSeoMetaTags from "~/assets/seoMetaTags/clinics/manhattan";
import queensSeoMetaTags from "~/assets/seoMetaTags/clinics/queens";
import bronxSeoMetaTags from "~/assets/seoMetaTags/clinics/bronx";

// Get the route parameter for borough name
const route = useRoute();
const router = useRouter();
definePageMeta({
  middleware: ['slug-redirect']
})

// Decode the borough name if it exists
const decodedBoroughName = computed(() => {
  if(route.params.name === "all"){
    return "all"
  }
  return route.params.name
    ? (route.params.name as string)
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "all";
});
const borough = ref(
  decodedBoroughName.value === "all" ? "All Clinics" : decodedBoroughName.value,
);
const zip_code = ref("");
const boroughsRef = ref<InstanceType<typeof DropDownInputField> | null>(null);

const boroughsRefMobile = ref<InstanceType<typeof DropDownMobile> | null>(null);
onMounted(() => {
  boroughsRef.value?.defaultValue(
    decodedBoroughName.value === "all"
      ? "All Clinics"
      : decodedBoroughName.value,
  );
});

type ClinicsGroupedByCity = Record<string, Clinic[]>;

const {
  data: clinicsData,
  pending,
  error,
} = await useFetch<ClinicsGroupedByCity>(`${useUrl()}/web/clinics`);

const boroughs = computed(() => {
  return clinicsData.value ? Object.keys(clinicsData.value) : [];
});

const boroughSeoSchemas: Record<string, object> = {
  Brooklyn: brooklynSeoSchema,
  Manhattan: ManhattanSeoSchema,
  Queens: queensSeoSchema,
  "The Bronx": theBronxSeoSchema,
};

const boroughsSeoMetaTags: Record<string, object> = {
  Brooklyn: brooklynSeoMetaTags,
  Manhattan: manhattanSeoMetaTags,
  Queens: queensSeoMetaTags,
  "The Bronx": bronxSeoMetaTags,
}

const seoSchema = boroughSeoSchemas[borough.value];
const boroughMetaTags = boroughsSeoMetaTags[borough.value];
// console.log("SEO Schema for", borough.value, ":", seoSchema);

const filteredClinicPositions = ref<any[]>([]);

// Filter clinics by borough
const filterClinicsByBorough = (borough: string) => {
  if (!clinicsData.value) return [];
  if (borough === "All Clinics") {
    // Normalize clinicPositions to match the expected format
    // console.log(filteredClinicPositions.value)
    filteredClinicPositions.value = Object.values(clinicsData.value).flat();
    // console.log(filteredClinicPositions.value)
  } else if (borough) {
    filteredClinicPositions.value = clinicsData.value[borough];
  } else {
    // Case-insensitive fallback search
    const boroughLower = borough.toLowerCase();
    const matchingBorough = Object.keys(clinicsData).find(
      (key) => key.toLowerCase() === boroughLower,
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
const debouncedZipToPosition = debounce(
  async (zip_code: string) => await filterbyZip(zip_code),
  400,
);

// Convert zip to position
const convertZipToPosition = async (zip_code: string) => {
  if (!zip_code) return;
  try {
    const res = await $fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${zip_code}&key=${google_api_key}`,
    );
    return (res as any).results[0].geometry.location;
  } catch (error) {
    console.error("Error converting zip to position:", error);
    return null;
  }
};

// Calculate distance between two points
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) {
  function deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
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
    .filter((location) => {
      const distance = calculateDistance(
        lat,
        lng,
        Number(location.lat),
        Number(location.long),
      );
      return distance <= radius;
    })
    .sort((a, b) => {
      const distanceA = calculateDistance(
        lat,
        lng,
        Number(a.lat),
        Number(a.long),
      );
      const distanceB = calculateDistance(
        lat,
        lng,
        Number(b.lat),
        Number(b.long),
      );
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
  title:
    decodedBoroughName.value === "all"
      ? "All Clinics - PT of the City"
      : `Clinics in ${decodedBoroughName.value} - PT of the City`,
  meta: [
    {
      name: "description",
      content:
        decodedBoroughName.value === "all"
          ? "Find PT of the City clinics across all locations"
          : `Find PT of the City clinics in ${decodedBoroughName.value}`,
    },
  ],
});
if (borough.value === "All Clinics") {
  useHead({
    script: [
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CollectionPage",
              "@id": "https://www.ptofthecity.com/clinics/all",
              url: "https://www.ptofthecity.com/clinics/all",
              name: "All PT of the City Clinics – NYC",
              description:
                "Browse all PT of the City clinics in New York City by region: Manhattan, Brooklyn, Queens, and The Bronx.",
              isPartOf: {
                "@id": "https://www.ptofthecity.com/#website",
              },
              about: {
                "@id": "https://www.ptofthecity.com/#organization",
              },
              mainEntity: {
                "@type": "ItemList",
                numberOfItems: 4,
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    item: {
                      "@type": "WebPage",
                      name: "Manhattan Clinics",
                      url: "https://www.ptofthecity.com/clinics/Manhattan",
                    },
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    item: {
                      "@type": "WebPage",
                      name: "Brooklyn Clinics",
                      url: "https://www.ptofthecity.com/clinics/Brooklyn",
                    },
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    item: {
                      "@type": "WebPage",
                      name: "Queens Clinics",
                      url: "https://www.ptofthecity.com/clinics/Queens",
                    },
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    item: {
                      "@type": "WebPage",
                      name: "The Bronx Clinics",
                      url: "https://www.ptofthecity.com/clinics/The%20Bronx",
                    },
                  },
                ],
              },
            },

            {
              "@type": "BreadcrumbList",
              "@id": "https://www.ptofthecity.com/clinics/all#breadcrumb",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://www.ptofthecity.com/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "All Clinics",
                  item: "https://www.ptofthecity.com/clinics/all",
                },
              ],
            },
          ],
        }),
      },
    ],
  });
}
useHead({
  script: seoSchema
    ? [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify(seoSchema),
        },
      ]
    : [],
});
if(borough.value === "All Clinics"){
  usePageSeo(allClinicsSeoMetaTags)
}
else{
  usePageSeo(boroughMetaTags)
}
</script>

<template>
  <div class="clinics-wrapper">
    <h1>Locate your closest clinic</h1>
    <br />
    <div class="form-map-wrapper">
      <div class="input-results-wrapper">
        <div class="input-wrapper">
          <div class="input-fields">
            <div class="mobile">
              <DropDownMobile
                ref="boroughsRef"
                :placeHolder="'Borough'"
                :list="['All Clinics', ...boroughs]"
                @input="filterClinics()"
                :default="
                  decodedBoroughName === 'all'
                    ? 'All Clinics'
                    : decodedBoroughName
                "
              />
            </div>
            <div class="desktop">
              <DropDownInputField
                ref="boroughsRefMobile"
                :placeHolder="'Borough'"
                :list="['All Clinics', ...boroughs]"
                @input="filterClinics()"
                v-model="borough"
                :default="
                  decodedBoroughName === 'all'
                    ? 'All Clinics'
                    : decodedBoroughName
                "
              />
            </div>
            <InputField
              :placeHolder="'Zip Code'"
              @input="filterClinics()"
              v-model="zip_code"
              numbersOnly
            />
          </div>
          <div class="text-fields">
            <span>{{ filteredClinicPositions.length }} clinics</span>
            <span
              class="u"
              @click="
                boroughsRef?.defaultValue('All Clinics');
                boroughsRefMobile?.defaultValue('All Clinics');
              "
            >
              show results for all clinics</span
            >
          </div>
        </div>
        <div class="results-wrapper">
          <ClinicCard
            v-for="(clinic, index) in filteredClinicPositions"
            :key="clinic.id"
            :clinic="clinic"
          />
        </div>
      </div>

      <div class="map-wrapper">
        <ClinicsMap :zoom="9.8" :positions="filteredClinicPositions" />
      </div>
      <!-- <h2 class="mobile">Results</h2> -->
    </div>
  </div>
</template>

<style scoped lang="scss">
$gap: 2rem;

.clinics-wrapper {
  @include pagePadding;
  padding-top: calc(10vh + 1rem + 3rem);

  @media screen and (max-width: 1100px) {
    padding-top: calc(8vh);
  }

  h2 {
    color: $navy;
    font-weight: 400;
    line-height: 100%;

    &.mobile {
      display: none;
    }
  }

  .input-wrapper {
    border-radius: 18px;
    background-color: $lowOpacityGrey;
    padding: 3rem;
    padding-bottom: 1.5rem;

    // display:flex;
    > .input-fields {
      // background-color:red;
      width: 100%;
      display: flex;
      gap: $gap;

      > * {
        width: 50%;
      }
    }

    .text-fields {
      margin-top: 2rem;
      display: flex;
      justify-content: space-between;

      .u {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }

  .form-map-wrapper {
    display: flex;
    gap: $gap;

    .map-wrapper {
      background-color: blue;
      height: 50rem;
      width: 100%;
    }
  }

  .results-wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    padding-top: 1rem;
  }

  .input-results-wrapper {
    display: flex;
    flex-direction: column;
    gap: $gap;
  }
}

@media screen and (max-width: 880px) {
  .map-wrapper {
    display: none;
  }

  .input-results-wrapper {
    width: 100%;
  }
}
</style>
