<script setup lang="ts">
import { computed } from 'vue';
import type { Clinic, SubwayLine } from '~/types/types';
import EditableImage from '~/components/Admin/EditableImage.vue';
import { subwayLineColor } from '~/composables/useSubwayLines';

const props = defineProps<{
  clinic: Clinic;
}>();

// Image priority: a CMS override for this clinic (keyed by slug so it's shared
// across /clinics/all and the borough pages) -> the image on the API payload
// -> a generic clinic photo. EditableImage handles the first hop itself.
const fallbackImage = computed(
  () => props.clinic.image || useImg('careers', 700),
);

// Full street address as shown in the design: "<name> <street>, <city>, <state> <zip>"
const addressLines = computed(() => {
  const c = props.clinic;
  const line1 = [c.name, c.street_address].filter(Boolean).join(' ');
  const line2 = [c.city, [c.state, c.zip_code].filter(Boolean).join(' ')]
    .filter(Boolean)
    .join(', ');
  return [line1, line2].filter(Boolean);
});

// Directory cards only show the badge row when the clinic actually has
// subway_lines data - no placeholder here (unlike the single-clinic page).
const subwayLines = computed<SubwayLine[]>(() => {
  const raw = props.clinic.subway_lines;
  if (!Array.isArray(raw)) return [];
  return raw
    .map((entry) =>
      typeof entry === 'string' ? { line: entry } : (entry as SubwayLine),
    )
    .filter((entry) => entry && entry.line);
});
const lineColor = subwayLineColor;

const directionsHref = computed(() => {
  if (props.clinic.location_link) return props.clinic.location_link;
  const { lat, long } = props.clinic;
  if (lat && long) {
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${long}`;
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    addressLines.value.join(', '),
  )}`;
});

const bookingTarget = computed(() => ({
  path: '/booking',
  query: { clinic: props.clinic.name, service: 'Initial Check-up' },
}));
</script>

<template>
  <article class="clinic-result">
    <div class="thumb">
      <EditableImage
        :content-key="`clinics.clinic.${clinic.slug}.image`"
        :default-src="fallbackImage"
        :default-alt="`${clinic.name} clinic`"
        :width="560"
        :height="610"
        loading="lazy"
      />
    </div>

    <div class="details">
      <div class="text">
        <NuxtLink :to="`/clinic/${clinic.slug}`" class="name">{{ clinic.name }}</NuxtLink>
        <address class="address">
          <span v-for="(line, i) in addressLines" :key="i">{{ line }}</span>
        </address>
      </div>

      <ul v-if="subwayLines.length" class="subway">
        <li v-for="(l, i) in subwayLines" :key="i" class="line" :style="{ backgroundColor: lineColor(l) }">
          {{ l.line }}
        </li>
      </ul>

      <div class="actions">
        <NuxtLink :to="bookingTarget" class="request-btn">Request appointment</NuxtLink>

        <div class="links">
          <NuxtLink :to="`/clinic/${clinic.slug}`" class="text-link">
            Learn More
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </NuxtLink>
          <a :href="directionsHref" target="_blank" rel="noopener" class="text-link">
            Get direction
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
.clinic-result {
  display: flex;
  align-items: flex-start;
  gap: 2.5rem;
  width: 100%;

  @media screen and (max-width: 640px) {
    flex-direction: column;
    gap: 1.5rem;
  }
}

.thumb {
  flex-shrink: 0;
  width: 28rem;
  height: 30.5rem;
  background-color: $surface-teal-pale;
  overflow: hidden;

  :deep(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  @media screen and (max-width: 900px) {
    width: 22rem;
    height: 26rem;
  }

  @media screen and (max-width: 640px) {
    width: 100%;
    height: auto;
    aspect-ratio: 4 / 3;
  }
}

.details {
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  flex: 1;
  min-width: 0;

  @media screen and (max-width: 640px) {
    gap: 1.75rem;
  }
}

.text {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.name {
  @include type-large;
  text-transform: uppercase;
  color: $primary-600;

  &:hover {
    text-decoration: underline;
  }
}

.address {
  @include type-large;
  font-style: normal;
  text-transform: uppercase;
  color: $primary-700;
  display: flex;
  flex-direction: column;
}

.subway {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
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
  flex-direction: column;
  gap: 1rem;
  margin-top: auto;
}

.request-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 40rem;
  padding: 1.6rem 2.9rem;
  border-radius: 1.2rem;
  background-color: $primary-400;
  color: #ffffff;
  @include type-button;

  &:hover {
    background-color: $primary-600;
  }

  @media screen and (max-width: 640px) {
    max-width: none;
  }
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
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
</style>
