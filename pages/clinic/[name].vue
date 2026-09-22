<script setup lang="ts">
import { computed } from "vue";
import type { Clinic, ClinicResponse, InsuranceImage, Review } from "~/types/types";
import type { FAQs } from "~/sharedComponents/FAQs/FAQs";
import ClinicHero from "~/components/Clinic/ClinicHero.vue";
import ClinicLocation from "~/components/Clinic/ClinicLocation.vue";
import ClinicContact from "~/components/Clinic/ClinicContact.vue";
import ClinicAbout from "~/components/Clinic/ClinicAbout.vue";
import Gallery from "~/components/Clinic/Gallery.vue";
import ClinicServices from "~/components/Clinic/ClinicServices.vue";
import ClinicInsurances from "~/components/Clinic/ClinicInsurances.vue";
import ClinicTestimonials from "~/components/Clinic/ClinicTestimonials.vue";
import BookingFormNew from "~/components/booking/BookingFormNew.vue";
import FindClinicBand from "~/components/shared/FindClinicBand.vue";
import FaqSection from "~/components/shared/FaqSection.vue";

definePageMeta({
  middleware: ["slug-redirect"],
});

const route = useRoute();
const clinicName = decodeURIComponent(route.params.name as string)
  .toLowerCase()
  .replace(/[^a-z0-9\s-]/g, "")
  .trim()
  .replace(/\s+/g, "-");

const clinicsMetaTags = await import(`~/assets/seoMetaTags/clinics.json`)
  .then((module) => module.default)
  .catch(() => null);
const clinicSeoMetaTags =
  (clinicsMetaTags as Record<string, object> | null)?.[clinicName] || null;

const clinicSeoSchema = await import(
  `~/assets/ClinicSeoSchema/${clinicName}.json`
).catch(() => null);

const { data, pending, error } = await useFetch<ClinicResponse>(
  `${useUrl()}/web/clinic/${clinicName}`,
);

const clinicData = computed<Clinic>(
  () => data.value?.filtered_clinic || ({} as Clinic),
);

// Reviews: separate, cacheable call keyed by clinic id (the `reviews` key on the
// clinic payload is hardcoded []). Can be null on Google API failure.
const { data: reviewsData } = await useFetch<{
  reviews: Review[];
  rating: number;
  user_ratings_total: number;
} | null>(() => `${useUrl()}/web/clinic/reviews/${clinicData.value.id}`, {
  server: false,
});
const reviews = computed<Review[]>(() => reviewsData.value?.reviews ?? []);
const reviewsUrl = computed(() =>
  clinicData.value.place_id
    ? `https://search.google.com/local/reviews?placeid=${clinicData.value.place_id}`
    : clinicData.value.location_link || null,
);

// In-network insurances + FAQs. Insurances come with the clinic payload now;
// fall back to /web/home. FAQs always from /web/home (same as other pages).
const { data: homeData } = await useFetch<{
  insurances: InsuranceImage[];
  FAQs: FAQs[];
}>(`${useUrl()}/web/home`);

const insurances = computed<InsuranceImage[]>(
  () => data.value?.insurances ?? homeData.value?.insurances ?? [],
);

const {
  contentMap: pageContentMap,
  isContentEditor: pageIsContentEditor,
  textStyles: pageTextStyles,
  pageMeta: pageMetaData,
} = await usePageContent("clinic");
providePageContent(
  "clinic",
  pageContentMap,
  pageIsContentEditor,
  pageTextStyles,
  pageMetaData,
);

usePageSeo(clinicSeoMetaTags || {}, pageMetaData);

useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify(clinicSeoSchema?.default || { name: "PT" }),
    },
  ],
});
</script>

<template>
  <div class="clinic-page">
    <div v-if="pending" class="state">
      <p>Loading clinic information…</p>
    </div>

    <div v-else-if="error" class="state">
      <p>Failed to load clinic information.</p>
      <NuxtLink to="/clinics/all" class="state-link">Browse all clinics</NuxtLink>
    </div>

    <div v-else-if="!clinicData.id" class="state">
      <h1>Clinic not found</h1>
      <p>The clinic “{{ clinicName }}” doesn’t exist.</p>
      <NuxtLink to="/clinics/all" class="state-link">Browse all clinics</NuxtLink>
    </div>

    <template v-else>
      <ClinicHero :clinic="clinicData" />
      <ClinicLocation :clinic="clinicData" />
      <ClinicContact :clinic="clinicData" />
      <ClinicAbout :clinic="clinicData" />

      <Gallery v-if="clinicData.media?.length" :media="clinicData.media" />

      <ClinicServices :clinic="clinicData" />
      <ClinicInsurances :clinic="clinicData" :insurances="insurances" />
      <ClinicTestimonials
        :clinic="clinicData"
        :reviews="reviews"
        :reviews-url="reviewsUrl"
      />

      <section class="booking">
        <BookingFormNew NoParagraph :clinic="clinicData.name" />
      </section>

      <FindClinicBand page-key="clinic" to="/clinics/all" />

      <FaqSection
        page-key="clinic"
        title-default="Frequently Asked Questions"
        subtitle-default="Our team will contact you within 30 minutes"
        :faqs="homeData?.FAQs || []"
      />
    </template>
  </div>
</template>

<style scoped lang="scss">
.clinic-page {
  width: 100%;
  display: flex;
  flex-direction: column;
}

// Mobile: the map leads the page (Figma node 455:565). ClinicLocation carries
// the map + address + hours; pull it above the hero.
@media screen and (max-width: 900px) {
  .clinic-page > :deep(.clinic-location) {
    order: -1;
  }
}

.state {
  @include pagePadding();
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  text-align: center;

  p,
  h1 {
    @include type-large;
    color: $primary-700;
  }

  h1 {
    @include type-h2;
    color: $primary-600;
  }
}

.state-link {
  @include type-button;
  color: $primary-400;
  text-decoration: underline;
}

/* ---- Booking ---- */
.booking {
  padding-top: 2rem;
  padding-bottom: 2rem;
}
</style>
