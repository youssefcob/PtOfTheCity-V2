<script setup lang="ts">
import type { Clinic } from '~/types/types';

const props = defineProps<{ clinicsByBorough: Record<string, Clinic[]>; clinicCount: number }>();

// Design order, by slug; boroughs the API adds later are appended after these.
const BOROUGH_ORDER = ['manhattan', 'brooklyn', 'queens', 'bronx'];
// Mobile shows this many clinics per borough before "View all".
const VISIBLE_ON_MOBILE = 4;

// The API names the borough "The Bronx" in production but "Bronx" in some environments.
const boroughSlug = (name: string) => name.trim().toLowerCase().replace(/^the\s+/, '').replace(/\s+/g, '-');

const plainQuotes = (value: string) => value.replace(/[‘’]/g, "'");

// street_address is free text from the admin panel: it usually repeats the clinic name up front and
// ends with a phone extension ("Inwood 4875 Broadway, New York, NY 10034, Ext 103."). Keep just the
// street address so each row reads "Inwood - 4875 Broadway, New York, NY 10034".
function formatAddress(clinic: Clinic) {
  let address = plainQuotes(clinic.street_address ?? '').trim();
  const name = plainQuotes(clinic.name);
  if (address.toLowerCase().startsWith(name.toLowerCase())) address = address.slice(name.length);

  return address
    .replace(/[\s,]*\bext\.?\s*\d+\.?\s*$/i, '')
    .replace(/,\s*\d+(?:st|nd|rd|th) floor\b/i, '')
    .replace(/,\s*(\d{5})\b/, ' $1')
    .replace(/\bThe Bronx\b/i, 'Bronx')
    .replace(/^[\s,]+|[\s,]+$/g, '');
}

const rank = (slug: string) => {
  const index = BOROUGH_ORDER.indexOf(slug);
  return index === -1 ? BOROUGH_ORDER.length : index;
};

const boroughs = computed(() =>
  Object.entries(props.clinicsByBorough)
    .map(([name, clinics]) => ({ name, slug: boroughSlug(name), clinics }))
    .sort((a, b) => rank(a.slug) - rank(b.slug))
    .map(({ name, slug, clinics }) => ({
      name,
      slug,
      clinics: [...clinics]
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((clinic) => ({ slug: clinic.slug, name: clinic.name, address: formatAddress(clinic) })),
    })),
);

const expanded = reactive<Record<string, boolean>>({});
</script>

<template>
  <section class="locations">
    <div class="locations__header">
      <h2 class="locations__title">Redeem your perk at any of our {{ clinicCount }} NYC clinics</h2>
      <p class="locations__text">
        We bring top-tier physical therapy right to your neighborhood. Find your closest PT of The City location below:
      </p>
    </div>

    <div class="locations__grid">
      <article
        v-for="borough in boroughs"
        :key="borough.name"
        class="borough"
        :class="[`borough--${borough.slug}`, { 'is-expanded': expanded[borough.name] }]"
      >
        <header class="borough__header">
          <h3 class="borough__name">{{ borough.name }}</h3>
          <p class="borough__count">
            {{ borough.clinics.length }} {{ borough.clinics.length === 1 ? 'location' : 'locations' }}
          </p>
        </header>

        <ul class="borough__list">
          <li
            v-for="(clinic, index) in borough.clinics"
            :key="clinic.slug"
            class="borough__clinic"
            :class="{ 'borough__clinic--extra': index >= VISIBLE_ON_MOBILE }"
          >
            <CrunchIcon name="map-pin" :size="20" :stroke-width="1.75" class="borough__pin" />
            <span>{{ clinic.name }}<template v-if="clinic.address"> - {{ clinic.address }}</template></span>
          </li>
        </ul>

        <button
          v-if="borough.clinics.length > VISIBLE_ON_MOBILE"
          type="button"
          class="borough__toggle"
          :aria-expanded="expanded[borough.name] ? 'true' : 'false'"
          @click="expanded[borough.name] = !expanded[borough.name]"
        >
          {{ expanded[borough.name] ? 'Show fewer locations' : `View all ${borough.clinics.length} locations` }}
        </button>
      </article>
    </div>
  </section>
</template>

<style scoped lang="scss">
$borough-accents: (
  'manhattan': $crunch-teal,
  'brooklyn': #3CA353,
  'queens': #EF7621,
  'bronx': $crunch-red,
);

.locations {
  padding: 100px var(--crunch-gutter) 0;
  background: #fff;

  @media screen and (max-width: 800px) {
    padding-top: 56px;
  }
}

.locations__header {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 555px);
  gap: 24px;
  align-items: start;

  @media screen and (max-width: 1100px) {
    grid-template-columns: minmax(0, 1fr);
  }

  @media screen and (max-width: 800px) {
    gap: 28px;
  }
}

.locations__title {
  font-family: $crunch-font-heading;
  font-size: 50px;
  font-weight: 700;
  line-height: 0.98;
  text-transform: uppercase;

  @media screen and (max-width: 800px) {
    font-size: 34px;
  }
}

.locations__text {
  color: $crunch-muted;
  font-size: 18px;
  line-height: 27px;

  @media screen and (max-width: 800px) {
    font-size: 16px;
    line-height: 24px;
  }
}

.locations__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  margin-top: 40px;

  @media screen and (max-width: 800px) {
    grid-template-columns: minmax(0, 1fr);
    margin-top: 28px;
  }
}

.borough {
  --accent: #{$crunch-teal};
  --accent-soft: #{rgba($crunch-teal, 0.2)};

  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 28px;
  border: 1px solid $crunch-border;
  border-radius: 16px;
  background: #fff;

  @media screen and (max-width: 800px) {
    padding: 20px;
  }
}

@each $slug, $color in $borough-accents {
  .borough--#{$slug} {
    --accent: #{$color};
    --accent-soft: #{rgba($color, 0.2)};
  }
}

.borough__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}

.borough__name {
  padding: 8px 16px;
  border-radius: 999px;
  background: var(--accent-soft);
  font-size: 18px;
  font-weight: 700;
  line-height: 22px;
}

.borough__count {
  color: $crunch-muted;
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  text-transform: uppercase;
}

// Desktop: every clinic in a short scrolling list. Mobile: the first few plus a "View all" toggle.
.borough__list {
  max-height: 188px;
  padding-right: 27px;
  overflow-y: auto;
  list-style: none;
  scrollbar-gutter: stable;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    margin: 10px 0;
    border-radius: 3px;
    background: #EFEBE6;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: #C8C2BB;
  }

  @supports not selector(::-webkit-scrollbar) {
    scrollbar-width: thin;
    scrollbar-color: #C8C2BB #EFEBE6;
  }

  @media screen and (max-width: 800px) {
    max-height: none;
    padding-right: 0;
    overflow: visible;
  }
}

.borough__clinic {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px 0;
  border-bottom: 1px solid $crunch-border;
  color: $crunch-text;
  font-size: 16px;
  line-height: 20px;

  @media screen and (max-width: 800px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    padding: 12px 0;
    line-height: 22px;

    &--extra {
      display: none;

      .is-expanded & {
        display: flex;
      }
    }
  }
}

.borough__pin {
  flex-shrink: 0;
  color: var(--accent);
}

.borough__toggle {
  display: none;

  @media screen and (max-width: 800px) {
    display: block;
    align-self: flex-start;
    margin-top: 16px;
    background: none;
    color: var(--accent);
    font-size: 16px;
    font-weight: 700;
    line-height: 20px;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }

    &:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 2px;
    }
  }
}
</style>
