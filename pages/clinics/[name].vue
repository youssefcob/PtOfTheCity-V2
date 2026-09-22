<script setup lang="ts">
import { onMounted, ref, computed, watch, defineAsyncComponent } from "vue";
import type { Clinic } from "~/types/types";
import type { FAQs } from "~/sharedComponents/FAQs/FAQs";
import ClinicResultCard from "~/components/Clinic/ClinicResultCard.vue";
import BoroughIntro from "~/components/Clinic/BoroughIntro.vue";
import FaqSection from "~/components/shared/FaqSection.vue";
import EditableText from "~/components/Admin/EditableText.vue";
import brooklynSeoSchema from "~/assets/BoroughSeoSchema/brooklyn.json";
import ManhattanSeoSchema from "~/assets/BoroughSeoSchema/manhattan.json";
import queensSeoSchema from "~/assets/BoroughSeoSchema/queens.json";
import theBronxSeoSchema from "~/assets/BoroughSeoSchema/the-bronx.json";
import allClinicsSeoMetaTags from "~/assets/seoMetaTags/clinics/all";
import brooklynSeoMetaTags from "~/assets/seoMetaTags/clinics/brooklyn";
import manhattanSeoMetaTags from "~/assets/seoMetaTags/clinics/manhattan";
import queensSeoMetaTags from "~/assets/seoMetaTags/clinics/queens";
import bronxSeoMetaTags from "~/assets/seoMetaTags/clinics/bronx";

const ClinicsMap = defineAsyncComponent(() => import("~/sharedComponents/Map.vue"));

const route = useRoute();
definePageMeta({
  middleware: ["slug-redirect"],
});

// "all" -> "all"; "the-bronx" -> "The Bronx"
const decodedBoroughName = computed(() => {
  if (route.params.name === "all") return "all";
  return route.params.name
    ? (route.params.name as string)
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "all";
});
const isAll = computed(() => decodedBoroughName.value === "all");
// Kept in the "All Clinics" / "<Borough>" shape the SEO lookups below expect.
const borough = ref(isAll.value ? "All Clinics" : decodedBoroughName.value);

type ClinicsGroupedByCity = Record<string, Clinic[]>;

const { data: clinicsData } = await useFetch<ClinicsGroupedByCity>(
  `${useUrl()}/web/clinics`,
);

// FAQs come from the shared /web/home payload (same source the other redesigned
// pages use for their FAQ section).
const { data: homeData } = await useFetch<{ FAQs: FAQs[] }>(
  `${useUrl()}/web/home`,
);

const {
  contentMap: pageContentMap,
  isContentEditor: pageIsContentEditor,
  textStyles: pageTextStyles,
  pageMeta: pageMetaData,
} = await usePageContent("clinics");
providePageContent(
  "clinics",
  pageContentMap,
  pageIsContentEditor,
  pageTextStyles,
  pageMetaData,
);

// Normalised borough slug so "The Bronx" / "Bronx" / "the-bronx" all line up
// regardless of how the API labels the group (used for matching, not routing).
const boroughSlug = (name: string) => createSlug(name).replace(/^the-/, "");

// The /web/clinics endpoint groups by the clinic's raw `city` value, which for
// the Bronx comes back as "Bronx" - but the borough page, its SEO schema and
// sitemap entry all use "The Bronx" / /clinics/the-bronx. Canonicalise both the
// display label and the route slug so it reads "THE BRONX" regardless of how
// the payload spells it.
const canonical: Record<string, { label: string; slug: string }> = {
  bronx: { label: "The Bronx", slug: "the-bronx" },
  "the-bronx": { label: "The Bronx", slug: "the-bronx" },
};
const displayName = (name: string) => canonical[createSlug(name)]?.label ?? name;
const routeSlug = (name: string) =>
  canonical[createSlug(name)]?.slug ?? createSlug(name);

// Borough nav (left column). Each links to its own /clinics/<slug> page.
const boroughNav = computed(() => {
  if (!clinicsData.value) return [];
  return Object.entries(clinicsData.value).map(([name, list]) => ({
    label: displayName(name),
    slug: routeSlug(name),
    count: Array.isArray(list) ? list.length : 0,
  }));
});

const activeBoroughSlug = computed(() =>
  isAll.value ? "" : boroughSlug(decodedBoroughName.value),
);
// Canonical route slug for the current borough, for the nav's active state.
const activeRouteSlug = computed(() =>
  isAll.value ? "" : routeSlug(decodedBoroughName.value),
);

// Clinics for the active view, before the zip-radius filter.
const baseClinics = computed<Clinic[]>(() => {
  if (!clinicsData.value) return [];
  if (isAll.value) return Object.values(clinicsData.value).flat();

  const key = Object.keys(clinicsData.value).find(
    (k) => boroughSlug(k) === activeBoroughSlug.value,
  );
  return key ? clinicsData.value[key] : [];
});

const allPositions = computed(() => baseClinics.value);

// ---- Zip-code radius filter -------------------------------------------------
const config = useRuntimeConfig();
const googleApiKey = config.public.googleApiKey as string;

const zipCode = ref("");
const displayedClinics = ref<Clinic[]>([]);

const deg2rad = (deg: number) => deg * (Math.PI / 180);
function distanceKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

async function zipToLatLng(zip: string) {
  if (!zip || !googleApiKey) return null;
  try {
    const res = await $fetch<any>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=${googleApiKey}`,
    );
    return res?.results?.[0]?.geometry?.location ?? null;
  } catch (err) {
    console.error("Error converting zip to position:", err);
    return null;
  }
}

const debounce = (fn: (...args: any[]) => void, ms = 400) => {
  let t: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
};

async function applyZipFilter() {
  const zip = zipCode.value.trim();
  if (zip.length < 5) {
    displayedClinics.value = baseClinics.value;
    return;
  }
  const pos = await zipToLatLng(zip);
  if (!pos) {
    displayedClinics.value = baseClinics.value;
    return;
  }
  const { lat, lng } = pos;
  const radius = 8; // km
  displayedClinics.value = baseClinics.value
    .filter(
      (c) =>
        distanceKm(lat, lng, Number(c.lat), Number(c.long)) <= radius,
    )
    .sort(
      (a, b) =>
        distanceKm(lat, lng, Number(a.lat), Number(a.long)) -
        distanceKm(lat, lng, Number(b.lat), Number(b.long)),
    );
}
const debouncedZipFilter = debounce(applyZipFilter);

watch(baseClinics, (list) => (displayedClinics.value = list), {
  immediate: true,
});

const resultCount = computed(() => displayedClinics.value.length);

// ---- Map ------------------------------------------------------------------
const showMap = ref(false);
onMounted(() => {
  if (typeof window !== "undefined" && "requestIdleCallback" in window) {
    (window as any).requestIdleCallback(() => (showMap.value = true));
  } else {
    setTimeout(() => (showMap.value = true), 800);
  }
});

// ---- SEO (unchanged behaviour) ------------------------------------------------
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
};
const seoSchema = boroughSeoSchemas[borough.value];
const boroughMetaTags = boroughsSeoMetaTags[borough.value];

useHead({
  title: isAll.value
    ? "All Clinics - PT of the City"
    : `Clinics in ${decodedBoroughName.value} - PT of the City`,
  meta: [
    {
      name: "description",
      content: isAll.value
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
              isPartOf: { "@id": "https://www.ptofthecity.com/#website" },
              about: { "@id": "https://www.ptofthecity.com/#organization" },
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
    ? [{ type: "application/ld+json", innerHTML: JSON.stringify(seoSchema) }]
    : [],
});

if (borough.value === "All Clinics") {
  usePageSeo(allClinicsSeoMetaTags, pageMetaData);
} else {
  usePageSeo(boroughMetaTags, pageMetaData);
}
</script>

<template>
  <div class="clinics-page">
    <!-- Hero -->
    <section class="hero">
      <div class="hero-copy">
        <div class="hero-heading">
          <EditableText
            tag="h1"
            class="title"
            content-key="clinics.hero.title"
            default="Find your clinic"
          />
          <EditableText
            tag="p"
            class="lede"
            content-key="clinics.hero.body"
            default="Our expanding network of convenient locations throughout Manhattan, Brooklyn, Queens, New Jersey, Long Island, Westchester, Staten Island, and Connecticut mean you'll never be far from the nation's best physical therapists."
          />
        </div>

        <div class="search">
          <label class="search-label" for="clinic-zip">Search for a location</label>
          <div class="search-field">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M12 21s-7-6.3-7-11a7 7 0 0 1 14 0c0 4.7-7 11-7 11z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            <input
              id="clinic-zip"
              v-model="zipCode"
              type="text"
              inputmode="numeric"
              autocomplete="postal-code"
              placeholder="Enter your zip code"
              @input="debouncedZipFilter()"
            />
          </div>
        </div>
      </div>

      <div class="hero-map">
        <ClinicsMap
          v-if="showMap"
          :zoom="isAll ? 9.8 : 11.5"
          :positions="allPositions"
        />
      </div>
    </section>

    <!-- Results -->
    <section class="results">
      <aside class="borough-nav">
        <NuxtLink
          v-for="b in boroughNav"
          :key="b.slug"
          :to="`/clinics/${b.slug}`"
          class="borough-row"
          :class="{ active: b.slug === activeRouteSlug }"
        >
          <span class="borough-name">{{ b.label }}</span>
          <span class="borough-count">{{ b.count }} Clinics</span>
        </NuxtLink>
      </aside>

      <div class="results-list">
        <p v-if="zipCode.trim().length >= 5" class="results-count">
          {{ resultCount }} {{ resultCount === 1 ? "clinic" : "clinics" }} near
          {{ zipCode.trim() }}
        </p>

        <ClinicResultCard
          v-for="clinic in displayedClinics"
          :key="clinic.id"
          :clinic="clinic"
        />

        <p v-if="!displayedClinics.length" class="empty">
          No clinics match that search. Try a different zip code.
        </p>
      </div>
    </section>

    <!-- Borough intro (borough pages only) -->
    <BoroughIntro
      v-if="!isAll"
      :borough-key="activeBoroughSlug"
      :borough-name="decodedBoroughName"
    />

    <!-- FAQs -->
    <FaqSection
      page-key="clinics"
      title-default="FAQs"
      subtitle-default="Our team will contact you within 30 minutes"
      :faqs="homeData?.FAQs || []"
    />
  </div>
</template>

<style scoped lang="scss">
.clinics-page {
  width: 100%;
  display: flex;
  flex-direction: column;
}

/* ---- Hero ---- */
.hero {
  @include pagePadding();
  padding-top: calc(#{$navbarHeight} + 3rem);
  padding-bottom: 4rem;
  display: flex;
  // stretch so .hero-copy takes the same height as .hero-map (its 41rem)
  align-items: stretch;
  gap: 2.3rem;

  @media screen and (max-width: 1000px) {
    flex-direction: column;
    padding-top: calc(#{$navbarHeight} + 2rem);
  }
}

.hero-copy {
  width: 50%;
  display: flex;
  flex-direction: column;
  // heading block pinned to the top, search bar to the bottom of the
  // map-matched height; gap is just a minimum if the column ever shrinks
  justify-content: space-between;
  gap: 2rem;

  @media screen and (max-width: 1000px) {
    width: 100%;
    justify-content: flex-start;
    gap: 3rem;
  }
}

.hero-heading {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .title {
    @include type-h2;
    text-transform: uppercase;
    color: $primary-600;
    margin: 0;
  }

  .lede {
    @include type-large;
    color: $primary-700;
    margin: 0;
  }
}

.search {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.search-label {
  @include type-body;
  color: $primary-700;
}

.search-field {
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 5.6rem;
  padding: 0 2rem;
  border: 1px solid rgba(3, 41, 46, 0.2);
  color: $primary-700;

  svg {
    flex-shrink: 0;
  }

  input {
    flex: 1;
    height: 100%;
    border: none;
    outline: none;
    background: transparent;
    @include type-body;
    color: $primary-700;

    &::placeholder {
      color: $primary-700;
      opacity: 0.7;
    }
  }
}

.hero-map {
  width: 50%;
  height: 41rem;
  background-color: $surface-teal-pale;
  overflow: hidden;

  @media screen and (max-width: 1000px) {
    width: 100%;
    height: 28rem;
  }
}

/* ---- Results ---- */
.results {
  @include pagePadding();
  padding-bottom: 4rem;
  display: flex;
  align-items: flex-start;
  gap: 10rem;

  @media screen and (max-width: 1100px) {
    gap: 5rem;
  }

  @media screen and (max-width: 900px) {
    flex-direction: column;
    gap: 2rem;
  }
}

.borough-nav {
  position: sticky;
  top: calc(#{$navbarHeight} + 1rem);
  flex-shrink: 0;
  width: 35rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  @media screen and (max-width: 900px) {
    position: static;
    width: 100%;
  }
}

.borough-row {
  display: flex;
  align-items: baseline;
  gap: 1.6rem;
  padding: 1.6rem 2rem;
  border-bottom: 1px solid $primary-300;

  .borough-name {
    @include type-h3;
    text-transform: uppercase;
    color: $primary-600;
    white-space: nowrap;
  }

  .borough-count {
    @include type-body;
    color: $primary-700;
    white-space: nowrap;
  }

  &.active {
    background-color: $surface-cream;
  }

  &:hover .borough-name {
    color: $primary-400;
  }
}

.results-list {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
}

.results-count {
  @include type-body;
  color: $primary-700;
  margin: 0;
}

.empty {
  @include type-large;
  color: $primary-700;
}
</style>
