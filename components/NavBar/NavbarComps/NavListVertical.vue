<script setup lang="ts">
import { ref, computed } from 'vue';
import type { HttpClinics } from '~/types/types';

const props = defineProps<{ clinics?: HttpClinics }>();
const emit = defineEmits(['close']);

const toggleDropDown = () => emit('close');

const BOROUGH_ORDER = ['Manhattan', 'Brooklyn', 'The Bronx', 'Queens'];
const BOROUGH_COLORS = ['#1A56A0', '#2E7D32', '#6A1B9A', '#C62828', '#E65100'];

const rearrangedBoroughs = computed(() => {
  if (!props.clinics) return [];
  return Object.keys(props.clinics).sort((a, b) => {
    const ai = BOROUGH_ORDER.indexOf(a);
    const bi = BOROUGH_ORDER.indexOf(b);
    if (ai === -1 && bi === -1) return 0;
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });
});

const createSlug = (text: string | any) =>
  text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');

const clinicsOpen = ref(false);
const openBorough = ref<string | null>(null);

const toggleBorough = (borough: string) => {
  openBorough.value = openBorough.value === borough ? null : borough;
};

const boroughColor = (borough: string) =>
  BOROUGH_COLORS[rearrangedBoroughs.value.indexOf(borough)] ?? '#374151';
</script>

<template>
  <div class="dropdown" aria-label="Mobile navigation links">
    <ul role="list">

      <!-- Clinics accordion -->
      <li class="no-border">
        <!-- Panel header IS the trigger -->
        <div class="panel-header" :class="{ open: clinicsOpen }" @click="clinicsOpen = !clinicsOpen">
          <div class="panel-header__left">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_mobile)">
                <path
                  d="M13.3332 6.66671C13.3332 9.99537 9.6405 13.462 8.4005 14.5327C8.28499 14.6196 8.14437 14.6665 7.99984 14.6665C7.85531 14.6665 7.71469 14.6196 7.59917 14.5327C6.35917 13.462 2.6665 9.99537 2.6665 6.66671C2.6665 5.25222 3.22841 3.89567 4.2286 2.89547C5.2288 1.89528 6.58535 1.33337 7.99984 1.33337C9.41433 1.33337 10.7709 1.89528 11.7711 2.89547C12.7713 3.89567 13.3332 5.25222 13.3332 6.66671Z"
                  stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                <path
                  d="M8 8.66663C9.10457 8.66663 10 7.7712 10 6.66663C10 5.56206 9.10457 4.66663 8 4.66663C6.89543 4.66663 6 5.56206 6 6.66663C6 7.7712 6.89543 8.66663 8 8.66663Z"
                  stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
              </g>
              <defs>
                <clipPath id="clip0_mobile">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Clinic Locations
          </div>
          <svg class="chevron" :class="{ rotated: clinicsOpen }" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>

        <!-- Content panel: only rendered when open -->
        <div v-if="clinicsOpen" class="clinics-panel">
          <div class="borough-rows">
            <div v-for="(borough, index) in rearrangedBoroughs" :key="borough" class="borough-section">
              <div class="borough-trigger" @click="toggleBorough(borough)" :style="{ color: BOROUGH_COLORS[index] }">
                <span class="borough-dot" :style="{ background: BOROUGH_COLORS[index] }" />
                <span class="borough-name">{{ borough }}</span>
                <span class="borough-count">{{ clinics?.[borough]?.length }}</span>
                <svg class="chevron" :class="{ rotated: openBorough === borough }" width="14" height="14"
                  viewBox="0 0 24 24" fill="none" :stroke="BOROUGH_COLORS[index]" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round" style="margin-left: auto;">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>

              <div v-if="openBorough === borough" class="clinic-list"
                :style="{ borderLeftColor: BOROUGH_COLORS[index] }">
                <NuxtLink v-for="c in clinics?.[borough]" :key="(c as any).id ?? c" :to="`/clinic/${createSlug(c)}`"
                  class="clinic-link" @click="toggleDropDown">
                  <span class="clinic-dot" :style="{ background: boroughColor(borough) }" />
                  {{ c }}
                </NuxtLink>
              </div>
            </div>
          </div>

          <div class="panel-footer">
            <NuxtLink class="view-all-btn" to="/clinics/all" @click="toggleDropDown">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_footer)">
                  <path
                    d="M13.3332 6.66671C13.3332 9.99537 9.6405 13.462 8.4005 14.5327C8.28499 14.6196 8.14437 14.6665 7.99984 14.6665C7.85531 14.6665 7.71469 14.6196 7.59917 14.5327C6.35917 13.462 2.6665 9.99537 2.6665 6.66671C2.6665 5.25222 3.22841 3.89567 4.2286 2.89547C5.2288 1.89528 6.58535 1.33337 7.99984 1.33337C9.41433 1.33337 10.7709 1.89528 11.7711 2.89547C12.7713 3.89567 13.3332 5.25222 13.3332 6.66671Z"
                    stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                  <path
                    d="M8 8.66663C9.10457 8.66663 10 7.7712 10 6.66663C10 5.56206 9.10457 4.66663 8 4.66663C6.89543 4.66663 6 5.56206 6 6.66663C6 7.7712 6.89543 8.66663 8 8.66663Z"
                    stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                </g>
                <defs>
                  <clipPath id="clip0_footer">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              View all clinics on map
            </NuxtLink>
          </div>
        </div>
      </li>

      <li>
        <NuxtLink class="list-item" active-class="navbar-link" @click="toggleDropDown" to="/#Services">{{
          $translate('services') }}</NuxtLink>
      </li>
      <li>
        <NuxtLink class="list-item" active-class="navbar-link" @click="toggleDropDown" to="/insurances">Insurance
          choices</NuxtLink>
      </li>
      <li>
        <NuxtLink class="list-item" active-class="navbar-link" @click="toggleDropDown" to="/#WhoWeAre">{{
          $translate('whoWeAre') }}</NuxtLink>
      </li>
      <li>
        <NuxtLink class="list-item" active-class="navbar-link" @click="toggleDropDown" to="/blogs">Blog</NuxtLink>
      </li>
      <li>
        <NuxtLink class="list-item" active-class="navbar-link" @click="toggleDropDown" to="/#Careers">{{
          $translate('careers') }}</NuxtLink>
      </li>
      <li>
        <NuxtLink class="list-item" active-class="navbar-link" @click="toggleDropDown" to="/#TrustedBy">{{
          $translate('trustedBy') }}</NuxtLink>
      </li>
      <!-- <li>
        <NuxtLink class="list-item" active-class="navbar-link" @click="toggleDropDown" to="/#FAQs">{{ $translate('faqs')
          }}</NuxtLink>
      </li> -->
      <li>
        <NuxtLink class="list-item" active-class="navbar-link" @click="toggleDropDown" to="/teletherapy">Teletherapy</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
ul {
  list-style-type: none;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 0;
  margin: 0;
  // gap: 2rem;

  li {
    padding:  2rem 1rem ;
    padding-left:3rem;
    width: 100%;
    border-bottom: 1px solid rgba(43, 192, 212, 0.4);
    margin:0;
    &.no-border {
      border-bottom: none;
      padding-bottom: 0;
      padding:0;
    }
  }

  a {
    color: $white;
    font-size: 1.7rem;
  }
}

.accordion-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  color: $white;
  font-size: 1.7rem;
  user-select: none;
  padding-bottom: 2rem;
}

.chevron {
  transition: transform 0.25s ease;
  flex-shrink: 0;

  &.rotated {
    transform: rotate(180deg);
  }
}

/* ── Clinics panel ── */
.clinics-panel {
  background: #fff;
  border-radius: 0 0 0.75rem 0.75rem;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
  margin-bottom: 2rem;
}

.panel-header {
  background: linear-gradient(to right, #00000080, #00000080), linear-gradient(to right, #0284C7, #2EE5C1);
  padding: 2rem 1rem ;
  padding-left:3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;
  // border-radius: 0.75rem;
  transition: border-radius 0.2s;
  margin-bottom: 0;

  &.open {
    border-radius: 0.75rem 0.75rem 0 0;
  }

  &__left {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    color: #fff;
    font-size: 1.7rem;
    font-weight: 600;
  }
}

/* ── Borough rows ── */
.borough-rows {
  display: flex;
  flex-direction: column;
}

.borough-section {
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
}

.borough-trigger {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 1.4rem 1.25rem;
  font-size: 1.35rem;
  font-weight: 700;
  cursor: pointer;
  user-select: none;

  &:active {
    background: #F9FAFB;
  }
}

.borough-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.borough-name {
  margin-right: 0.4rem;
}

.borough-count {
  background: #F3F4F6;
  color: #6B7280;
  font-size: 1.1rem;
  font-weight: 500;
  border-radius: 999px;
  padding: 0.15rem 0.6rem;
}

.clinic-list {
  display: flex;
  flex-direction: column;
  margin: 0 1.25rem 0.75rem 1.5rem;
  padding-left: 1rem;
  border-left: 2px solid;
  gap: 0.1rem;
}

.clinic-link {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: #374151 !important;
  font-size: 1.25rem !important;
  padding: 0.75rem 0.5rem;
  border-radius: 0.4rem;
  font-weight: 400;

  &:hover {
    background: #F9FAFB;
  }
}

.clinic-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
  opacity: 0.6;
}

/* ── Footer ── */
.panel-footer {
  padding: 1.5rem 1.25rem;
  background: #F9FAFB;
  border-top: 1px solid #F3F4F6;
}

.view-all-btn {
  display: flex !important;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  width: 100%;
  background: $cta;
  color: #111 !important;
  font-size: 1.3rem !important;
  font-weight: 600;
  padding: 1.25rem 1rem;
  border-radius: 0.75rem;
  text-align: center;
}
</style>
