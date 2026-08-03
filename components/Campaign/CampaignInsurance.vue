<script setup lang="ts">
const { apiFetch } = useApi();

// Custom pages can override the section content; defaults match the original copy
const props = withDefaults(
  defineProps<{
    eyebrow?: string;
    heading?: string;
    subtext?: string;
    initialCount?: number;
    /** Whitelist of insurance titles to show (matched against the API response) */
    insuranceOnly?: string[];
  }>(),
  {
    eyebrow: 'Insurance Accepted',
    heading: 'We Work With Most Major Insurance Plans',
    subtext: "Not sure if you're covered? Our front desk verifies your benefits before your first visit — at no cost to you.",
    initialCount: 12,
  },
);

interface InsuranceProvider {
  id: number;
  path: string;
  title: string;
  created_at: string;
  updated_at: string;
}

const providers = ref<InsuranceProvider[]>([]);

const fetchInsurance = async () => {
  try {
    providers.value = (await apiFetch('/images/insurance').catch(() => [])) as InsuranceProvider[] || [];
  } catch (e) {
    console.error('Failed to load insurance providers:', e);
  }
};

onMounted(fetchInsurance);

const showAll = ref(false);

// Whitelist filter — case-insensitive title match; empty prop = show everything
const filteredProviders = computed(() => {
  if (!props.insuranceOnly?.length) return providers.value;
  const wanted = new Set(props.insuranceOnly.map((t) => t.trim().toLowerCase()));
  return providers.value.filter((p) => wanted.has(p.title.trim().toLowerCase()));
});

const visibleProviders = computed(() => {
  return showAll.value ? filteredProviders.value : filteredProviders.value.slice(0, props.initialCount);
});

const hasMore = computed(() => filteredProviders.value.length > props.initialCount);
</script>

<template>
  <section class="section section-alt">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">{{ eyebrow }}</span>
        <h2>{{ heading }}</h2>
        <p>{{ subtext }}</p>
      </div>

      <div class="insurance-grid">
        <div v-for="provider in visibleProviders" :key="provider.id" class="insurance-card">
          <img :src="provider.path" :alt="provider.title" loading="lazy" />
        </div>
      </div>

      <div v-if="hasMore" class="insurance-toggle">
        <button type="button" class="btn btn-outline btn-sm" @click="showAll = !showAll">
          {{ showAll ? 'Show Less' : `Show All` }}
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.insurance-card {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
}

.insurance-card img {
  /* Increase logo size — tune these two values to taste */
  width: 100%;
  max-width: 160px;
  height: auto;
  max-height: 110px;
  object-fit: contain;
}

.insurance-toggle {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
}
</style>
