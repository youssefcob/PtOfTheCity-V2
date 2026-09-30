<script setup lang="ts">
import EditableText from '~/components/Admin/EditableText.vue';
import type { Job } from '~/types/types';
import { applyLink, jobSlug, jobStatusLabel } from '~/utils/jobUtils';

const props = defineProps<{
  jobs: Job[];
  pending?: boolean;
  error?: boolean;
}>();

const route = useRoute();
const router = useRouter();

// Filters live in the URL query so they survive opening a role and coming back.
type FilterKey = 'q' | 'specialty' | 'location' | 'type';
const queryValue = (key: FilterKey) => (typeof route.query[key] === 'string' ? (route.query[key] as string) : '');

const search = ref(queryValue('q'));
const specialty = computed(() => queryValue('specialty'));
const location = computed(() => queryValue('location'));
const jobType = computed(() => queryValue('type'));

const setFilter = (key: FilterKey, value: string) => {
  const query = { ...route.query, [key]: value || undefined };
  router.replace({ query, hash: route.hash });
};

// Debounce the search box so typing doesn't push a history entry per keystroke.
let searchTimer: ReturnType<typeof setTimeout> | null = null;
watch(search, (value) => {
  if (searchTimer) clearTimeout(searchTimer);
  searchTimer = setTimeout(() => setFilter('q', value.trim()), 250);
});

const uniqueValues = (pick: (job: Job) => string | null | undefined) =>
  [...new Set(props.jobs.map(pick).filter((v): v is string => !!v))].sort();

const specialties = computed(() => uniqueValues((job) => job.specialty));
const locations = computed(() => uniqueValues((job) => job.location));
const jobTypes = computed(() => uniqueValues((job) => job.job_type));

const filteredJobs = computed(() => {
  const term = queryValue('q').toLowerCase();
  return props.jobs.filter((job) => {
    if (specialty.value && job.specialty !== specialty.value) return false;
    if (location.value && job.location !== location.value) return false;
    if (jobType.value && job.job_type !== jobType.value) return false;
    if (!term) return true;
    return [job.title, job.specialty, job.location, job.setting, job.job_type]
      .some((field) => field?.toLowerCase().includes(term));
  });
});

const chips = computed(() =>
  ([
    { key: 'specialty', label: specialty.value },
    { key: 'type', label: jobType.value },
    { key: 'location', label: location.value },
  ] as { key: FilterKey; label: string }[]).filter((chip) => chip.label),
);

const hasFilters = computed(() => chips.value.length > 0 || !!queryValue('q'));

const clearFilters = () => {
  search.value = '';
  const { q, specialty, location, type, ...rest } = route.query;
  router.replace({ query: rest, hash: route.hash });
};

const openJob = (job: Job) => router.push(`/careers/${jobSlug(job)}`);

const ck = (s: string) => `careers.positions.${s}`;
</script>

<template>
  <section id="positions" class="careers-positions">
    <div class="header">
      <EditableText tag="p" class="eyebrow" :content-key="ck('eyebrow')" default="Open Positions" />
      <EditableText tag="h2" class="heading desktop-only" :content-key="ck('heading')" default="Find Your Next Opportunity." />
      <EditableText tag="h2" class="heading mobile-only" :content-key="ck('heading_mobile')" default="Find Your Opportunity." />
    </div>

    <div class="filters">
      <div class="filter-row">
        <label class="search">
          <img class="desktop-only" src="/images/careers/search.svg" width="15.5" height="15.5" alt=""
            aria-hidden="true" />
          <img class="mobile-only" src="/images/careers/m-search.svg" width="14.2" height="14.2" alt=""
            aria-hidden="true" />
          <input v-model="search" class="desktop-only" type="search" placeholder="Search by role, specialty, or location"
            aria-label="Search open positions" />
          <input v-model="search" class="mobile-only" type="search" placeholder="Search roles or locations..."
            aria-label="Search open positions" />
        </label>

        <select class="select select--dark" :value="specialty" aria-label="Filter by specialty"
          @change="setFilter('specialty', ($event.target as HTMLSelectElement).value)">
          <option value="">All Specialties</option>
          <option v-for="option in specialties" :key="option" :value="option">{{ option }}</option>
        </select>

        <select v-if="jobTypes.length > 1" class="select desktop-only" :value="jobType" aria-label="Filter by job type"
          @change="setFilter('type', ($event.target as HTMLSelectElement).value)">
          <option value="">All Types</option>
          <option v-for="option in jobTypes" :key="option" :value="option">{{ option }}</option>
        </select>

        <select class="select" :value="location" aria-label="Filter by location"
          @change="setFilter('location', ($event.target as HTMLSelectElement).value)">
          <option value="">All Locations</option>
          <option v-for="option in locations" :key="option" :value="option">{{ option }}</option>
        </select>
      </div>

      <div v-if="chips.length" class="chips">
        <button v-for="chip in chips" :key="chip.key" type="button" class="chip"
          :aria-label="`Remove filter ${chip.label}`" @click="setFilter(chip.key, '')">
          <img src="/images/careers/chip-remove.svg" width="25" height="21.875" alt="" aria-hidden="true" />
          {{ chip.label }}
        </button>
      </div>
    </div>

    <div class="table" role="table" aria-label="Open positions">
      <div class="table-head" role="row">
        <span role="columnheader" class="col-position">Position</span>
        <span role="columnheader">Location</span>
        <span role="columnheader">Type</span>
        <span role="columnheader">Setting</span>
        <span role="columnheader">Action</span>
      </div>

      <p v-if="pending" class="table-message">Loading positions…</p>
      <p v-else-if="error" class="table-message">We couldn't load open positions. Please try again later.</p>
      <p v-else-if="!filteredJobs.length" class="table-message">
        {{ hasFilters ? 'No open positions match your filters.' : 'There are no open positions right now.' }}
        <button v-if="hasFilters" type="button" class="clear-link" @click="clearFilters">Clear filters</button>
      </p>

      <div v-for="job in filteredJobs" v-else :key="job.id" class="table-row" role="row" @click="openJob(job)">
        <div class="col-position" role="cell">
          <NuxtLink :to="`/careers/${jobSlug(job)}`" class="job-title" @click.stop>{{ job.title }}</NuxtLink>
          <span class="job-status">{{ jobStatusLabel(job) }}</span>
        </div>
        <span class="cell" role="cell" data-label="Location">{{ job.location || '—' }}</span>
        <span class="cell" role="cell" data-label="Type">{{ job.job_type || '—' }}</span>
        <span class="cell" role="cell" data-label="Setting">{{ job.setting || '—' }}</span>
        <span class="cell cell-action" role="cell">
          <NuxtLink :to="applyLink(job)" class="apply-link" @click.stop>
            Apply
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </NuxtLink>
        </span>
      </div>
    </div>

    <!-- mobile: one card per role instead of the table -->
    <div class="cards">
      <p v-if="pending" class="table-message">Loading positions…</p>
      <p v-else-if="error" class="table-message">We couldn't load open positions. Please try again later.</p>
      <p v-else-if="!filteredJobs.length" class="table-message">
        {{ hasFilters ? 'No open positions match your filters.' : 'There are no open positions right now.' }}
        <button v-if="hasFilters" type="button" class="clear-link" @click="clearFilters">Clear filters</button>
      </p>

      <article v-for="job in filteredJobs" v-else :key="job.id" class="job-card" @click="openJob(job)">
        <div class="job-card-head">
          <NuxtLink :to="`/careers/${jobSlug(job)}`" class="job-card-title" @click.stop>{{ job.title }}</NuxtLink>
          <span class="status-pill" :class="{ 'status-pill--soon': job.hiring_status === 'soon' }">
            {{ jobStatusLabel(job) }}
          </span>
        </div>
        <ul class="job-card-meta">
          <li v-if="job.location"><img src="/images/careers/map-pin.svg" width="16" height="16" alt="" />{{ job.location }}</li>
          <li v-if="job.job_type"><img src="/images/careers/clock.svg" width="16" height="16" alt="" />{{ job.job_type }}</li>
          <li v-if="job.setting"><img src="/images/careers/briefcase.svg" width="16" height="16" alt="" />{{ job.setting }}</li>
        </ul>
        <NuxtLink :to="applyLink(job)" class="apply-link" @click.stop>
          Apply Now
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </NuxtLink>
      </article>
    </div>
  </section>
</template>

<style scoped lang="scss">
$mobile: 900px;

.careers-positions {
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  @include pagePadding();

  @media screen and (max-width: $mobile) {
    gap: 2.4rem;
    padding: 4.8rem 2rem;
  }
  // keep the heading clear of the fixed navbar when jumped to via #positions
  scroll-margin-top: calc($navbarHeight + 2rem);

  :deep(span) {
    color: inherit;
  }
}

.mobile-only {
  display: none !important;

  @media screen and (max-width: $mobile) {
    display: block !important;
  }
}

.desktop-only {
  @media screen and (max-width: $mobile) {
    display: none !important;
  }
}

.header {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  @media screen and (max-width: $mobile) {
    gap: 0.6rem;
  }
}

.eyebrow {
  @include type-overline;
  color: $primary-700;

  @media screen and (max-width: $mobile) {
    letter-spacing: 0.08em;
    color: $primary-400;
  }
}

.heading {
  @include type-h3;
  text-transform: uppercase;
  color: $primary-600;

  @media screen and (max-width: $mobile) {
    font-weight: 700;
    font-size: 28px;
    line-height: 34px;
    color: $primary-700;
  }
}

.filters {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  @media screen and (max-width: $mobile) {
    gap: 1.2rem;
  }
}

// mobile: the search box on its own row, then the dropdowns as pills
.filter-row {
  display: flex;
  gap: 2.4rem;

  @media screen and (max-width: $mobile) {
    flex-wrap: wrap;
    gap: 0.8rem;
  }
}

.search {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 2 1 0;
  height: 6rem;
  padding: 1rem 2.4rem;
  border: 1px solid rgba(3, 41, 46, 0.2);
  border-radius: 0.8rem;
  cursor: text;

  input {
    flex: 1;
    min-width: 0;
    border: 0;
    outline: none;
    background: transparent;
    @include type-body;
    color: $primary-700;

    &::placeholder {
      color: $primary-700;
    }
  }

  &:focus-within {
    border-color: $primary-400;
  }

  @media screen and (max-width: $mobile) {
    flex: 1 1 100%;
    min-width: 0;
    height: auto;
    margin-bottom: 0.4rem;
    padding: 1.2rem 1.6rem;
    border-color: rgba(3, 41, 46, 0.12);
    background-color: #ffffff;

    input {
      font-size: 16px;
      line-height: normal;
      color: $primary-400;

      &::placeholder {
        color: $primary-400;
      }
    }
  }
}

.select {
  flex: 1 1 0;
  min-width: 0;
  height: 6rem;
  padding: 1rem 5.6rem 1rem 2.4rem;
  border: 1px solid rgba(34, 34, 34, 0.2);
  border-radius: 0.8rem;
  background: #ffffff url('/images/careers/chevron-down.svg') no-repeat right 2.4rem center / 2.4rem;
  appearance: none;
  @include type-button;
  color: $primary-700;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: $primary-400;
  }

  @media screen and (max-width: $mobile) {
    flex: none;
    height: auto;
    padding: 0.8rem 3.6rem 0.8rem 1.4rem;
    border-color: rgba(3, 41, 46, 0.12);
    border-radius: 10rem;
    background: #ffffff url('/images/careers/m-chevron-dark.svg') no-repeat right 1.4rem center / 1.6rem;
    font-weight: 500;
    font-size: 16px;
    line-height: normal;
    letter-spacing: 0;
  }
}

// the mobile Figma shows the specialty pill filled dark
.select--dark {
  @media screen and (max-width: $mobile) {
    border-color: $primary-600;
    background-color: $primary-600;
    background-image: url('/images/careers/m-chevron-white.svg');
    color: #ffffff;
  }
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 0.4rem 1rem;
  border: 0;
  border-radius: 4rem;
  background-color: $primary-base;
  @include type-body;
  color: #ffffff;
  cursor: pointer;

  &:hover {
    background-color: $primary-400;
  }
}

// Table: header 9.2rem tall, 14rem rows, cream body inside a rounded border.
.table {
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(34, 34, 34, 0.1);
  border-radius: 0.8rem;
  background-color: $surface-cream;
  overflow: hidden;

  @media screen and (max-width: $mobile) {
    display: none;
  }
}

.table-head,
.table-row {
  display: grid;
  grid-template-columns: minmax(0, 38.4rem) repeat(3, minmax(0, 1fr)) minmax(0, 12.2rem);
  align-items: center;
  column-gap: 2.4rem;
  padding-right: 2.4rem;
}

.table-head {
  min-height: 9.2rem;
  background-color: $primary-400;
  @include type-button;
  color: #ffffff;
  text-align: center;

  .col-position {
    padding-left: 2.4rem;
    text-align: left;
  }

  // the global `span` rule in _classes.scss would otherwise shrink these to 14px
  span {
    font: inherit;
    letter-spacing: inherit;
  }
}

.table-row {
  min-height: 14rem;
  border-bottom: 1px solid rgba(34, 34, 34, 0.1);
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;

  &:last-child {
    border-bottom: 0;
  }

  &:hover {
    background-color: $surface-sand;
  }
}

.col-position {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1rem 2.4rem;
}

.job-title {
  @include type-button;
  color: $primary-700;

  &:hover {
    color: $primary-400;
  }
}

.job-status {
  @include type-body;
  color: $primary-700;
}

.cell {
  @include type-button;
  color: $primary-700;
  text-align: center;
}

.apply-link {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1.6rem 0.8rem 0;
  @include type-button;
  color: $primary-700;

  &:hover {
    color: $primary-400;
  }
}

.cards {
  display: none;

  @media screen and (max-width: $mobile) {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  }
}

.job-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.6rem;
  padding: 2rem;
  border: 1px solid rgba(3, 41, 46, 0.12);
  border-radius: 1.6rem;
  background-color: #ffffff;
  cursor: pointer;
}

.job-card-head {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.6rem;
  width: 100%;
}

.job-card-title {
  max-width: 100%;
  overflow: hidden;
  font-family: $font-poppins;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: $primary-700;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.status-pill {
  padding: 0.4rem 1rem;
  border-radius: 10rem;
  background-color: rgba(43, 192, 212, 0.13);
  font-family: $font-poppins;
  font-weight: 500;
  font-size: 16px;
  line-height: normal;
  color: $primary-400 !important;
}

.status-pill--soon {
  background-color: rgba(21, 112, 124, 0.1);
}

.job-card-meta {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 100%;
  list-style: none;

  li {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin: 0;
    font-family: $font-poppins;
    font-weight: 400;
    font-size: 16px;
    line-height: normal;
    color: $primary-700;
  }

  img {
    flex-shrink: 0;
    width: 1.6rem;
    height: 1.6rem;
  }
}

.table-message {
  padding: 4rem 2.4rem;
  @include type-body;
  color: $primary-700;
  text-align: center;
}

.clear-link {
  margin-left: 0.8rem;
  border: 0;
  background: none;
  @include type-button;
  color: $primary-400;
  text-decoration: underline;
  cursor: pointer;
}
</style>
