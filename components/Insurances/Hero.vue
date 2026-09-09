<script setup lang="ts">
import { ref, computed, inject, type Ref } from 'vue';
import EditableText from '~/components/Admin/EditableText.vue';
import EditableImage from '~/components/Admin/EditableImage.vue';
import type { Insurance } from '~/types/types';

const bannerImg = (width: number) => useImg('careers', width);

const homepageData = inject('homepageData') as Ref<{ insurances: Insurance[] }>;
const insurances = computed(() => homepageData.value?.insurances || []);

const search = ref('');
const filteredInsurances = computed(() => {
  const q = search.value.trim().toLowerCase();
  if (!q) return insurances.value;
  return insurances.value.filter((insurance) => insurance.title.toLowerCase().includes(q));
});

const initials = (title: string) => title.trim().slice(0, 2).toUpperCase();
</script>

<template>
  <div class="hero">
    <div class="hero-copy">
      <EditableText tag="span" class="eyebrow" content-key="insurances.hero.eyebrow" default="Check Eligibility" />
      <EditableText tag="h1" class="title" content-key="insurances.hero.title"
        default="Let's Make Sure You're Covered." />
      <EditableText tag="p" class="description" content-key="insurances.hero.description"
        default="Understanding your insurance shouldn't be stressful. We'll verify your benefits, explain your coverage, and help you know exactly what to expect before your first visit." />
      <NuxtLink to="#eligibility" class="cta-link" aria-label="Check your insurance eligibility">
        <EditableText tag="span" content-key="insurances.hero.cta_label" default="Check Eligibility" />
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      </NuxtLink>
    </div>

    <div class="coverage-row">
      <div class="coverage-banner">
        <div class="banner-background">
          <EditableImage content-key="insurances.hero.banner_background_image" :default-src="bannerImg(900)"
            default-alt="" default-object-fit="cover" loading="lazy" />
        </div>
        <div class="banner-overlay" aria-hidden="true"></div>

        <div class="banner-content">
          <EditableImage class="banner-logo" content-key="insurances.hero.banner_logo"
            default-src="/images/logo-white.png" default-alt="PT of the City" default-object-fit="contain"
            :width="240" :height="90" loading="lazy" />
          <EditableText tag="h2" class="banner-title" content-key="insurances.hero.banner_title"
            default="Coverage You Can Count On." />
          <EditableText tag="p" class="banner-description" content-key="insurances.hero.banner_description"
            default="We proudly work with a wide range of commercial insurance plans, Medicare, Medicaid, Workers' Compensation, and No-Fault carriers. Don't see your provider? Contact us—we're happy to help verify your coverage." />
        </div>
      </div>

      <div class="insurance-finder">
        <div class="search-box">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input v-model="search" type="text" placeholder="Find your Insurance" aria-label="Find your insurance" />
        </div>
        <div class="insurance-list">
          <div class="insurance-card" v-for="insurance in filteredInsurances" :key="insurance.id">
            <div class="brand">
              <div v-if="insurance.path" class="logo" :style="`background-image:url(${insurance.path})`"
                aria-hidden="true"></div>
              <div v-else class="logo initials" aria-hidden="true">{{ initials(insurance.title) }}</div>
              <span class="name">{{ insurance.title }}</span>
            </div>
            <span class="badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"
                stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              In-Network
            </span>
          </div>
          <p v-if="!filteredInsurances.length" class="empty">No matching insurance found.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hero {
  padding-top: calc($navbarHeight + 3rem);
  // padding-bottom: 4rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  background-color: $white;

  @media screen and (max-width: 1100px) {
    padding-top: calc($navbarHeight + 2rem);
  }
}

.hero-copy {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  // max-width: 37rem;
  @include pagePadding();

  

  @media screen and (min-width: 900px) {
    max-width: 50%;
  }

  .eyebrow {
    @include type-overline;
    color: $primary-700;
  }

  .title {
    @include type-display;
    color: $primary-600;
    text-transform: uppercase;
    margin: 0;
  }

  .description {
    @include type-large;
    color: $primary-700;
    margin: 0;
  }

  .cta-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    width: fit-content;
    padding: 0.5rem 1rem 0.5rem 0;
    margin-top: 0.5rem;
    color: $primary-700;
    @include type-button;

    &:hover {
      color: $primary-400;
      text-decoration: underline;
    }
  }
}

.coverage-row {
  display: flex;
  align-items: stretch;
  gap: 2rem;

  @media screen and (max-width: 900px) {
    flex-direction: column;
  }
}

.insurance-finder {
  width: 42%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding-right:10rem;
  @media screen and (max-width: 900px) {
    width: 100%;
  padding-right:0;

  }

  @media screen and (max-width: 900px) {
    .insurance-list {
      flex: none;
      max-height: 26rem;
    }
  }

  .search-box {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    height: 3.75rem;
    padding: 0 1.5rem;
    border: 1px solid rgba(3, 41, 46, 0.2);
    border-radius: 0.5rem;
    color: $primary-700;

    input {
      flex: 1;
      border: none;
      outline: none;
      background: transparent;
      @include type-button;
      color: $primary-700;

      &::placeholder {
        color: rgba(3, 41, 46, 0.5);
      }
    }
  }

  .insurance-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    padding-right: 0.25rem;
  }

  .empty {
    @include type-body;
    color: $primary-700;
  }

  .insurance-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.75rem 1rem;
    background-color: $white;
    border-left: 1px solid $border-gray;
    border-radius: 0.5rem;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
    flex-shrink: 0;

    .brand {
      display: flex;
      align-items: center;
      gap: 0.625rem;
      min-width: 0;

      .logo {
        width: 1.75rem;
        height: 1.75rem;
        flex-shrink: 0;
        border-radius: 0.5rem;
        background-color: $surface-teal-pale;
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;

        &.initials {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: $primary-400;
          color: $white;
          font-size: 0.75rem;
          font-weight: 600;
        }
      }

      .name {
        @include type-button;
        color: $primary-700;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .badge {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      flex-shrink: 0;
      padding: 0.375rem 0.625rem;
      border-radius: 999px;
      background-color: #10b981;
      color: $white;
      font-size: 0.85rem;
      white-space: nowrap;
    }
  }
}

.coverage-banner {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem;
  background-color: $primary-base;
  overflow: hidden;
  @include pagePadding();
  padding-top: 10rem;
  padding-bottom: 10rem;



  @media screen and (max-width: 700px) {
    padding: 2rem;
  }

  .banner-background {
    position: absolute;
    inset: 0;
    z-index: 0;

    :deep(.cms-editable-image) {
      width: 100%;
      height: 100%;
    }
  }

  .banner-overlay {
    position: absolute;
    inset: 0;
    z-index: 1;
    background: linear-gradient(180deg, rgba(3, 41, 46, 0.65) 0%, rgba(3, 41, 46, 0.75) 100%);
    pointer-events: none;
  }

  .banner-content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .banner-logo {
    width: 13rem;
    // height: 3.75rem;

    :deep(img) {
      object-position: left center;
    }
  }

  .banner-title {
    @include type-h1;
    color: $white;
    text-transform: uppercase;
    margin: 0;
    max-width: 30rem;
  }

  .banner-description {
    @include type-body;
    color: rgba(255, 255, 255, 0.85);
    margin: 0;
    max-width: 34rem;
  }
}
</style>
