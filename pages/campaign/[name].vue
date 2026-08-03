<script setup lang="ts">
import DefaultCampaignLayout from '~/components/Campaign/DefaultCampaignLayout.vue';
import { customCampaignPages } from '~/custom-campaign-pages/registry';
import { provideCampaign } from '~/composables/useCampaign';

// Route param identifies which campaign to render (URL-encoded for the API call)
const route = useRoute();
const rawName = computed(() => (route.params.name as string) || '');
const encodedName = computed(() => encodeURIComponent(rawName.value));

// Campaigns with a custom layout (see custom-pages/registry.ts) render their
// own section composition; everything else uses the default layout.
const activeLayout = computed(() => customCampaignPages[encodedName.value] ?? DefaultCampaignLayout);

// Resolve the API base URL once, here in setup (composables that touch the
// Nuxt instance can't be called inside useFetch's lazy URL getter).
const apiBase = useUrl() as string;
const { data: campaignPage, error } = await useFetch(
  () => `${apiBase}/campaign-pages/${encodedName.value}`,
  {
    headers: { Accept: 'application/json' },
    // A 404 is a valid outcome (campaign not found) — don't throw the page.
    onResponseError({ response }) {
      if (response.status === 404) {
        // handled via `error` ref below
      }
    },
  },
);
// console.log( error, campaignPage);

// Expose campaign data to child components via provide/inject
provideCampaign(campaignPage as Ref<any>);

const notFound = computed(() => !!error.value || !campaignPage.value);

// SEO — driven by the fetched campaign title when available
useSeoMeta({
  title: () => campaignPage.value?.title || 'Campaign | PT of the City',
  description: () =>
    campaignPage.value?.clinic
      ? `Book a same-day physical therapy appointment. Most insurance accepted. ${campaignPage.value.clinic.rating ?? ''}${campaignPage.value.clinic.rating ? '★' : ''} rated.`
      : 'Book a same-day physical therapy appointment. Most insurance accepted.',
  ogType: 'website',
});

useHead({
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap',
    },
  ],
});

// JSON-LD: MedicalClinic when the campaign has a clinic, else a basic WebPage
useHead(() => {
  const clinic = campaignPage.value?.clinic;
  if (clinic) {
    return {
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalClinic',
            name: clinic.name,
            medicalSpecialty: 'Physical Therapy',
            address: {
              '@type': 'PostalAddress',
              streetAddress: clinic.street_address,
              addressLocality: clinic.city,
              addressRegion: clinic.state,
            },
            telephone: clinic.phone || campaignPage.value?.campaign_phone,
            ...(clinic.rating
              ? {
                  aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: clinic.rating,
                    reviewCount: clinic.user_ratings_total,
                  },
                }
              : {}),
          }),
        },
      ],
    };
  }
  return { script: [] };
});

// Scroll reveal — observes all `.reveal` elements across the page (including child components)
let observer: IntersectionObserver | null = null;

onMounted(() => {
  if (notFound.value) return;
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    revealEls.forEach((el) => observer!.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }
});

onBeforeUnmount(() => {
  observer?.disconnect();
});
</script>

<template>
  <div class="campaign-page">
    <!-- 404 / not-found state -->
    <div v-if="notFound" class="not-found">
      <div class="not-found-inner">
        <h1>Campaign not found</h1>
        <p>We couldn't find the campaign you're looking for. It may have ended or the link is incorrect.</p>
        <a href="https://www.ptofthecity.com" class="btn btn-primary">Back to Home</a>
      </div>
    </div>

    <!-- Campaign content — custom layout when registered, default otherwise -->
    <component :is="activeLayout" v-else />
  </div>
</template>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  font-family: 'Inter', sans-serif;
  color: #0E2328;
}
.not-found-inner {
  max-width: 460px;
}
.not-found h1 {
  font-family: 'Sora', sans-serif;
  font-size: clamp(28px, 5vw, 42px);
  margin-bottom: 14px;
}
.not-found p {
  color: #4C6469;
  font-size: 17px;
  margin-bottom: 26px;
  line-height: 1.6;
}
.not-found .btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 15.5px;
  padding: 15px 28px;
  border-radius: 100px;
  background: #FF6F5B;
  color: #fff;
  text-decoration: none;
}
</style>
