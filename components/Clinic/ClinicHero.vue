<script setup lang="ts">
import { computed } from 'vue';
import type { Clinic } from '~/types/types';
import EditableText from '~/components/Admin/EditableText.vue';
import EditableImage from '~/components/Admin/EditableImage.vue';
import { useSubwayLines, subwayLineColor } from '~/composables/useSubwayLines';
import { stripHtml } from '~/utils/stringUtils';

const props = defineProps<{ clinic: Clinic }>();

const ck = (s: string) => `clinic.${props.clinic.slug}.hero.${s}`;

const heroImage = computed(() => props.clinic.image || useImg('careers', 900));

const lines = useSubwayLines(() => props.clinic.subway_lines);

const directionsHref = computed(
  () =>
    props.clinic.location_link ||
    `https://www.google.com/maps/dir/?api=1&destination=${props.clinic.lat},${props.clinic.long}`,
);

const bookingTarget = computed(() => ({
  path: '/booking',
  query: { clinic: props.clinic.name, service: 'Initial Check-up' },
}));
</script>

<template>
  <section class="clinic-hero">
    <div class="copy">
      <EditableText tag="h1" class="name" :content-key="ck('name')" :default="clinic.name" />
      <EditableText
        tag="p"
        class="blurb"
        :content-key="ck('blurb')"
        :default="stripHtml(clinic.header) || 'Our expanding network of convenient locations means you’ll never be far from the nation’s best physical therapists.'"
      />

      <!-- <ul class="subway" aria-label="Nearby subway lines">
        <li
          v-for="(l, i) in lines"
          :key="i"
          class="line"
          :style="{ backgroundColor: subwayLineColor(l) }"
        >
          {{ l.line }}
        </li>
      </ul> -->

      <div class="actions">
        <NuxtLink :to="bookingTarget" class="request-btn">Request appointment</NuxtLink>
        <a :href="directionsHref" target="_blank" rel="noopener" class="text-link">
          Get direction
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </a>
      </div>
    </div>

    <div class="photo">
      <EditableImage
        :content-key="ck('image')"
        :default-src="heroImage"
        :default-alt="`${clinic.name} clinic`"
        :width="1100"
        :height="920"
        loading="eager"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.clinic-hero {
  @include pagePadding();
  padding-top: calc(#{$navbarHeight} + 4rem);
  padding-bottom: 5rem;
  display: flex;
  align-items: center;
  gap: 4rem;

  @media screen and (max-width: 1000px) {
    flex-direction: column;
    align-items: stretch;
    gap: 2rem;
    padding-top: calc(#{$navbarHeight} + 2rem);
  }

  // Mobile: ClinicLocation leads the page (map -> clinic name -> address ->
  // hours). This section drops to just the CTA row below it.
  @media screen and (max-width: 900px) {
    padding-top: 0;
    padding-bottom: 2.5rem;
    gap: 1.5rem;
  }
}

.copy {
  width: 45%;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media screen and (max-width: 1000px) {
    width: 100%;
  }
}

.name {
  @include type-h1;
  text-transform: uppercase;
  color: $primary-600;
  margin: 0;

  // rendered by ClinicLocation on mobile, right under the map
  @media screen and (max-width: 900px) {
    display: none;
  }
}

.blurb {
  @include type-large;
  text-transform: uppercase;
  color: $primary-700;
  margin: 0;

  // the mobile Figma frame omits the hero blurb
  @media screen and (max-width: 900px) {
    display: none;
  }
}

.subway {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  list-style: none;
  margin: 0;
  padding: 0;

  .line {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 4rem;
    border-radius: 999px;
    color: #ffffff;
    font-family: $font-poppins;
    font-size: 2rem;
    line-height: 1;
    text-transform: uppercase;
  }
}

.actions {
  display: flex;
  align-items: center;
  gap: 3rem;
  flex-wrap: wrap;
  @media screen and (max-width: 900px) {
    justify-content: center;
    >.request-btn {
      flex: 1 1 100%;
    }
    
  }
}

.request-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.6rem 2.9rem;
  border-radius: 1.2rem;
  background-color: $primary-400;
  color: #ffffff;
  @include type-button;

  &:hover {
    background-color: $primary-600;
  }
}

.text-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  @include type-button;
  color: $primary-700;

  &:hover {
    color: $primary-400;
    text-decoration: underline;
  }
}

.photo {
  width: 55%;
  height: 46rem;
  overflow: hidden;
  background-color: $surface-teal-pale;

  @media screen and (max-width: 1000px) {
    width: 100%;
    height: 28rem;
  }

  // the map replaces it on mobile
  @media screen and (max-width: 900px) {
    display: none;
  }

  :deep(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}
</style>
