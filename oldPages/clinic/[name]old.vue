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
import MultiStepForm from "~/components/booking/MultiStepForm.vue";
import ServicesGrid from "~/components/Clinic/ServicesGrid.vue";
import Reviews from "~/components/Clinic/Reviews.vue";
import Info from "~/components/Clinic/Info.vue";

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

const clinicSeoMetaTags = await import(`~/assets/seoMetaTags/clinic/${clinicName}.ts`)
  .then((module) => module.default)
  .catch(() => null);
  
  
  
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
// console.log(data.value);

const clinicData: Ref<Clinic> = computed(
  () => data.value?.filtered_clinic || ({} as Clinic),
);

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

const step = ref(1);
const transitionName = ref("slide-left");

const moveToStep = (s: number) => {
  if (s > step.value) {
    transitionName.value = "slide-left";
  } else {
    transitionName.value = "slide-right";
  }
  step.value = s;
};
const {
  data: reviews,
  pending: reviewsPending,
  error: reviewsError,
} = await useFetch<{ reviews: Review[] }>(
  () => `${useUrl()}/web/clinic/reviews/${clinicData.value.id}`,
  {
    server: false,
  },
);
// Set page title
usePageSeo(
    clinicSeoMetaTags || {},
);

useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify(clinicSeoSchema?.default || {name:"PT"}),
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
      <div
        class="clinic-hero"
        :style="`background-image:url(${clinicData.image})`"
      >
        <div class="hero-wrapper">
          <h1>{{ clinicData.name }}</h1>
          <ClientOnly>
            <p class="desc white" v-html="clinicData.summary"></p>
          </ClientOnly>
          <div class="info">
            <div class="info-wrapper">
              <Location />
              <a
                target="_blank"
                :href="`https://maps.google.com/?q=${clinicData?.lat},${clinicData?.long}`"
                class="u"
              >
                {{ clinicData.street_address }}
              </a>
            </div>
            <div class="info-wrapper">
              <Phone />
              <a :href="`tel:${clinicData.phone}`" class="u">{{
                clinicData.phone
              }}</a>
            </div>
            <!-- <div class="info-wrapper"><span class="u">info@ptofthecity.com</span></div> -->
            <div class="info-wrapper">
              <Clock /><span>{{ dayRanges }}</span>
            </div>
          </div>
          <NuxtLink
            :to="{
              path: '/booking',
              query: { clinic: clinicData.name, service: 'Initial Check-up' },
            }"
            class="btn cta"
          >
            Request Appointment
          </NuxtLink>
        </div>
      </div>

      <div class="navigator-wrapper">
        <div class="navigator">
          <span :class="{ active: step === 1 }" @click="moveToStep(1)"
            >Services</span
          >
          <span
            v-if="reviews && reviews.reviews && reviews.reviews.length > 0"
            :class="{ active: step === 2 }"
            @click="moveToStep(2)"
            >Reviews</span
          >
          <span :class="{ active: step === 3 }" @click="moveToStep(3)"
            >Info</span
          >
        </div>
      </div>
      <div class="multi-step-container">
        <MultiStepForm
          :total-steps="3"
          :transitionName="transitionName"
          :step="step"
        >
          <template #step1>
            <ServicesGrid :services="clinicData.services" />
          </template>

          <template
            #step2
            v-if="reviews && reviews.reviews && reviews.reviews.length > 0"
          >
            <Reviews :reviews="reviews.reviews" />
          </template>

          <template #step3>
            <Info :clinic="clinicData" />
          </template>
        </MultiStepForm>
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
    padding-top: calc($navbarHeight + 4rem) !important;
    padding-bottom: 7rem !important;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        270deg,
        rgba(44, 50, 51, 0) 0%,
        #2c3233 83.17%
      );
      z-index: 1;

      @media screen and (max-width: 600px) {
        background: linear-gradient(
          270deg,
          rgba(44, 50, 51, 0) 0%,
          rgba(44, 50, 51, 0.9) 70%
        );
      }
    }

    > * {
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

      .btn {
        margin-top: auto;
        width: 70%;

        @media screen and (max-width: 700px) {
          width: 100%;
        }
      }
    }
  }

  .navigator-wrapper {
    padding: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;

    height: 10svh;

    .navigator {
      background-color: rgba(46, 229, 193, 0.2);

      border-radius: 5rem;
      display: flex;
      justify-content: space-around;
      // width:25rem;
      gap: 2rem;
      padding: 0.4rem 4rem;

      span {
        display: block;
        padding: 0.4rem 1rem;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.2s ease-in-out;

        &.active {
          background-color: $cta;
          transition: all 0.2s ease-in-out;
        }
      }
    }
  }

  .multi-step-container {
  }
}
</style>
