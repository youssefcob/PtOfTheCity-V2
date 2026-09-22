<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';
import type { Clinic, Schedule } from '~/types/types';
import EditableText from '~/components/Admin/EditableText.vue';

const ClinicsMap = defineAsyncComponent(() => import('~/sharedComponents/Map.vue'));

const props = defineProps<{ clinic: Clinic }>();

const ck = (s: string) => `clinic.${props.clinic.slug}.location.${s}`;

const days: (keyof Schedule)[] = [
  'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday',
];

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const toAmPm = (time: string) => {
  if (!time) return '—';
  const [h, m] = time.split(':');
  const hour = parseInt(h, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const h12 = hour % 12 || 12;
  return m && m !== '00' ? `${h12}:${m} ${ampm}` : `${h12}:00 ${ampm}`;
};

// off/isOff have both been seen in the payload over time.
const isOff = (d: Schedule[keyof Schedule]) =>
  (d as unknown as { off?: boolean; isOff?: boolean }).off ||
  (d as unknown as { off?: boolean; isOff?: boolean }).isOff;

const rows = computed(() =>
  days.map((day) => {
    const d = props.clinic.schedule?.[day];
    return {
      day,
      label: capitalize(day),
      text: !d ? 'Closed' : isOff(d) ? 'Closed' : `${toAmPm(d.start)} – ${toAmPm(d.end)}`,
    };
  }),
);

// street_address from the API is already a full formatted address
// ("732 Allerton Ave, Bronx, NY 10467, United States"), so just prefix the
// clinic name rather than re-appending city/state/zip.
const addressLine1 = computed(() => props.clinic.name);
const addressLine2 = computed(() =>
  (props.clinic.street_address || '').replace(/,?\s*United States\s*$/i, ''),
);
</script>

<template>
  <section class="clinic-location">
    <div class="map">
      <ClinicsMap
        :positions="[clinic]"
        :zoom="12"
        :center="{ lat: Number(clinic.lat), lng: Number(clinic.long) }"
      />
    </div>

    <!-- Mobile: the clinic name sits directly under the map (Figma 455:565).
         Same content key as ClinicHero's name so an edit syncs both. -->
    <EditableText
      tag="h1"
      class="mobile-name"
      :content-key="`clinic.${clinic.slug}.hero.name`"
      :default="clinic.name"
    />

    <div class="details">
      <div class="block">
        <EditableText tag="p" class="label desktop" :content-key="ck('address_label')" default="Clinic address" />
        <address class="value">
          <!-- <span>{{ addressLine1 }}</span> -->
          <span>{{ addressLine2 }}</span>
          <span>{{ clinic.phone }}</span>
        </address>
      </div>

      <div class="block">
        <EditableText tag="p" class="label" :content-key="ck('hours_label')" default="Working hours" />
        <ul class="hours">
          <li v-for="r in rows" :key="r.day">
            <span class="day">{{ r.label }}</span>
            <span class="time">{{ r.text }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.clinic-location {
  @include pagePadding();
  padding-top: 2rem;
  padding-bottom: 4rem;
  display: flex;
  align-items: flex-start;
  gap: 4rem;

  // Mobile: this section leads the page. The map sits flush under the fixed
  // navbar (exactly its height, no extra gap) and goes full-bleed.
  @media screen and (max-width: 900px) {
    flex-direction: column;
    gap: 1.75rem;
    padding-top: #{$navbarHeight};
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 2.5rem;
  }
}

.mobile-name {
  display: none;

  @media screen and (max-width: 900px) {
    display: block;
    @include type-h1;
    text-transform: uppercase;
    color: $primary-600;
    margin: 0;
    padding: 0 1.5rem;
  }
}

.map {
  position: relative;
  flex: 1;
  align-self: stretch;
  min-height: 42rem;
  background-color: $surface-teal-pale;
  overflow: hidden;

  :deep(> div) {
    width: 100%;
    height: 100%;
    min-height: 42rem;
  }

  @media screen and (max-width: 900px) {
    width: 100%;
    flex: none;
    // an explicit height (not just min-height) is required here: GoogleMap's
    // inner div is height:100% and can't resolve a percentage against a
    // min-height-only parent in the mobile column layout -> blank map.
    height: 30rem;
    min-height: 30rem;

    :deep(> div),
    :deep(> div > div) {
      height: 30rem;
      min-height: 30rem;
    }
  }
}

.details {
  flex-shrink: 0;
  width: 32rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media screen and (max-width: 900px) {
    width: 100%;
    padding: 0 1.5rem;
    gap: 2rem;
  }
}

.label {
  @include type-large;
  text-transform: uppercase;
  color: $primary-600;
  margin: 0 0 0.75rem;
}

.value {
  @include type-large;
  font-style: normal;
  color: $primary-700;
  display: flex;
  flex-direction: column;
}

.hours {
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.35rem 0;
    @include type-body;
    color: $primary-700;
  }

  .time {
    white-space: nowrap;
  }
}
</style>
