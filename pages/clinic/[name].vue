<script setup lang="ts">
import {
  type Clinic,
  type HttpReview,
  type Review,
  type Schedule,
} from "~/types/types";
import Location from "~/sharedComponents/icons/location.vue";
import Phone from "~/sharedComponents/icons/phone.vue";
import Clock from "~/sharedComponents/icons/clock.vue";
import ServicesGrid from "~/components/Clinic/ServicesGrid.vue";
import Gallery from "~/components/Clinic/Gallery.vue";
import Reviews from "~/sharedComponents/Reviews.vue";
import Info from "~/components/Clinic/Info.vue";
import AllLocations from "~/sharedComponents/AllLocations.vue";

definePageMeta({
  middleware: ['slug-redirect']
})
// Get the route parameter
const route = useRoute();
const clinicName = decodeURIComponent(route.params.name as string)
  .toLowerCase()
  .replace(/[^a-z0-9\s-]/g, "") // remove apostrophes and special chars
  .trim()
  .replace(/\s+/g, "-");

const clinicsMetaTags = await import(`~/assets/seoMetaTags/clinics.json`)
  .then((module) => module.default)
  .catch(() => null);

const clinicSeoMetaTags = clinicsMetaTags?.[clinicName] || null;



const clinicSeoSchema = await import(`~/assets/ClinicSeoSchema/${clinicName}.json`).catch(
  () => null,
);



type FilteredClinics = {
  filtered_clinic: Clinic;
  clinics: Clinic[];
};

const { data, pending, error } = await useFetch<FilteredClinics>(
  `${useUrl()}/web/clinic/${clinicName}`,
);
console.log(data.value);

const clinicData: Ref<Clinic> = computed(
  () => data.value?.filtered_clinic || ({} as Clinic),
);
console.log(clinicData.value);

const schedule = computed(() => clinicData.value.schedule);

const dayRanges = computed(() => {
  if (!schedule.value) return "";

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

const {
  data: reviews,
  pending: reviewsPending,
  error: reviewsError,
} = await useFetch<{ reviews: Review[]; rating: number; user_ratings_total: number }>(
  () => `${useUrl()}/web/clinic/reviews/${clinicData.value.id}`,
  {
    server: false,
  },
);
watch(reviews, (val) => console.log('reviews', val));

// Set page title
usePageSeo(
  clinicSeoMetaTags || {},
);

useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify(clinicSeoSchema?.default || { name: "PT" }),
    }
  ],
});
</script>

<template>
  <div class="container">
    <!-- Loading state -->
    <div v-if="pending" class="loading">
      <div class="loading-text">Loading clinic information...</div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="error">
      <div class="error-text">Failed to load clinic information</div>
      <div class="error-details">
        <p>Error: {{ error.message }}</p>
        <p>Searched for: {{ clinicName }}</p>
      </div>
      <NuxtLink to="/" class="btn">Go Home</NuxtLink>
    </div>

    <!-- Clinic not found -->
    <div v-else-if="!clinicData" class="not-found">
      <h1>Clinic Not Found</h1>
      <p>The clinic "{{ clinicName }}" doesn't exist.</p>
      <p>
        Please check the URL or browse our
        <NuxtLink to="/clinics">clinic directory</NuxtLink>.
      </p>
      <NuxtLink to="/" class="btn">Go Home</NuxtLink>
    </div>

    <!-- Clinic details -->
    <div v-else class="clinic-container">
      <div class="clinic-hero" :style="`background-image:url(${clinicData.image})`">
        <div class="hero-wrapper">
          <div class="hero-header">
            <h1 class="regular">PT Of The City
            </h1>
            <h1 class="clinicName">{{ clinicData.name }}</h1>
          </div>
          <ClientOnly>
            <p class="desc white" v-html="clinicData.header"></p>
          </ClientOnly>
          <!-- 
          <div class="info">
            <div class="info-wrapper">
              <Location />
              <a target="_blank" :href="`https://maps.google.com/?q=${clinicData?.lat},${clinicData?.long}`" class="u">
                {{ clinicData.street_address }}
              </a>
            </div>
            <div class="info-wrapper">
              <Phone />
              <a :href="`tel:${clinicData.phone}`" class="u">{{
                clinicData.phone
                }}</a>
            </div>
            <div class="info-wrapper"><span class="u">info@ptofthecity.com</span></div> -->
          <!-- <div class="info-wrapper">
              <Clock /><span>{{ dayRanges }}</span>
            </div>
          </div> -->
          <div class="hero-btns">
            <NuxtLink :to="{
              path: '/booking',
              query: { clinic: clinicData.name, service: 'Initial Check-up' },
            }" class="btn cta">
              Request Appointment
            </NuxtLink>
            <NuxtLink :to="clinicData?.location_link || `https://maps.google.com/?q=${clinicData?.lat},${clinicData?.long}`" class="btn cta outline">
              Get Directions
            </NuxtLink>
          </div>
        </div>
      </div>
      <section class="clinic-section">
        <Info :clinic="clinicData" />
      </section>

      <div class="sections">

        <section v-if="clinicData.media?.length" class="clinic-section">
          <Gallery :media="clinicData.media" />
        </section>


        <section class="clinic-section">
          <ServicesGrid :services="clinicData.services" />
        </section>


        <section v-if="reviews && reviews.reviews && reviews.reviews.length > 0" class="clinic-section">
          <Reviews :reviews="reviews.reviews" :rating="reviews.rating"
            :user_ratings_total="reviews.user_ratings_total" />
        </section>

        <section>

          <BookingFormNew NoParagraph :clinic="clinicData.name" />
        </section>

        <section class="clinic-section">
          <AllLocations />
        </section>


      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$padding-top: 0;

a {
  color: $navy;
  text-decoration: none;
}

.regular {
  font-weight: 400;
  padding: 0;
}

.clinicName {
  font-size: 5.2rem;
  color: $cta !important;
}

.btn.locationBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  @media screen and (min-width: 500px) {
    width: 30%;
  }
}

.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5.56rem;
  // padding-top: $padding-top;
}

.loading,
.error,
.not-found {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  text-align: center;

  .loading-text,
  .error-text {
    font-size: 1.2rem;
    color: $navy;
    margin-bottom: 1rem;
  }
}

.error {
  .error-details {
    margin: 1rem 0;
    padding: 1rem;
    background: rgba(255, 0, 0, 0.1);
    border-radius: 0.5rem;

    p {
      margin: 0.5rem 0;
      font-size: 0.9rem;
      color: $navy;
    }
  }
}

.not-found {
  h1 {
    color: $navy;
    margin-bottom: 1rem;
  }

  p {
    color: $navy;
    margin-bottom: 1rem;

    a {
      color: $blue;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.clinic-container {
  width: 100%;

  .clinic-hero {
    height: 90svh;
    background-position: center;
    background-size: cover;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    // align-items: center;
    // justify-content: center;
    @include pagePadding();
    padding-top: calc($navbarHeight + 6rem) !important;
    padding-bottom: 9rem !important;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(270deg,
          rgba(44, 50, 51, 0) 0%,
          #2c3233 83.17%);
      z-index: 1;

      @media screen and (max-width: 600px) {
        background: linear-gradient(270deg,
            rgba(44, 50, 51, 0) 0%,
            rgba(44, 50, 51, 0.9) 70%);
      }
    }

    >* {
      z-index: 2;
    }

    .hero-wrapper {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      width: 50%;
      min-width: 600px;
      height: 100%;

      @media screen and (max-width: 800px) {
        width: 100%;
        min-width: 0;
      }

      h1 {
        color: white;
        // z-index:2;
        // background-color: red;
        // padding-top: 2rem;
        line-height: 140%;
      }

      p.white {
        // text-overflow:ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 6;
        line-clamp: 6;
        /* number of lines */
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        // height: 20rem;
        // overflow: hidden;
        color: white !important;

        * {
          color: white !important;
        }
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
          gap: 1rem;

          span {
            font-size: 1.4rem;
            color: $white;
          }

          .u {
            text-decoration: underline;
            font-size: 1.4rem;
            color: $white;
          }
        }
      }

      .hero-btns {
        margin-top: auto;
        display: flex;
        flex-direction: row;
        gap: 1rem;

        @media screen and (max-width: 700px) {
          flex-direction: column;
        }

        .btn {
          flex: 1;
          transition: all 0.25s ease;

          &:not(.outline):hover {
            background: transparent;
            border: 2px solid $cta;
            color: $cta;
          }

          &.outline {
            background: transparent;
            border: 2px solid $cta;
            color: $cta;

            &:hover {
              background: $cta;
              border-color: $cta;
              color: white;
            }
          }
        }
      }
    }
  }

  .sections {
    display: flex;
    flex-direction: column;
    gap: 5rem;
    margin-top:5rem;
    padding: 4rem 0;
    @media screen and (min-width: 800px) {
      // gap:10rem;
      
    }
  }
}

.btn {}
</style>
