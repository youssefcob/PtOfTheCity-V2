<script setup lang="ts">
import type { Clinic } from '~/types/types';

const props = defineProps({
  clinics: {
    type: Array as () => Clinic[],
    default: () => []
  },
  serviceName: {
    type: String,
    required: true
  }
});

// street_address is a single Google-formatted string ("17 W 125th St, New York,
// NY 10027, United States"); show the street on one line and the rest below,
// without the redundant country.
const addressLines = (clinic: Clinic) => {
  const parts = (clinic.street_address || '')
    .split(',')
    .map(p => p.trim())
    .filter(p => p && !/^(united states|usa)$/i.test(p));
  if (parts.length <= 1) return parts;
  return [parts[0], parts.slice(1).join(', ')];
};

const bookingTarget = (clinic: Clinic) => ({
  path: '/booking',
  query: { clinic: clinic.name, service: props.serviceName },
});
</script>

<template>
  <section v-if="clinics && clinics.length > 0" class="service-clinics">
    <div class="header">
      <p class="overline">Book an appointment</p>
      <h2 class="heading">Book now at your nearest clinic</h2>
    </div>

    <ul class="clinic-grid">
      <li v-for="clinic in props.clinics" :key="clinic.id">
        <NuxtLink :to="bookingTarget(clinic)" class="clinic-card"
          :aria-label="`Request a ${serviceName} appointment at ${clinic.name}`">
          <div class="clinic-copy">
            <span class="clinic-name">{{ clinic.name }}</span>
            <address class="clinic-address">
              <span v-for="(line, i) in addressLines(clinic)" :key="i">{{ line }}</span>
            </address>
          </div>
          <span class="clinic-cta">
            Request appointment
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </span>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
.service-clinics {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  margin-top: 2rem;
}

.header {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

// Two-class selectors: _classes.scss's bare h2/p/span rules are injected into
// every scoped block and would otherwise outrank a single class.
.header .overline {
  @include type-overline;
  color: $primary-400;
  margin: 0;
}

.header .heading {
  @include type-h3;
  text-transform: uppercase;
  color: $primary-600;
  margin: 0;
}

.service-clinics .clinic-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(26rem, 1fr));
  gap: 1.6rem;

  @media screen and (max-width: 640px) {
    grid-template-columns: minmax(0, 1fr);
  }

  li {
    display: flex;
    margin: 0; // global li margin
  }
}

.clinic-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  width: 100%;
  padding: 2rem 2.4rem;
  background: $white;
  border: 1px solid $border-gray;
  border-left: 3px solid $primary-400;
  border-radius: 1.2rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
  color: $primary-700;
  text-decoration: none;
  transition: transform 0.2s ease-in-out, background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    background-color: $surface-mint;
    border-color: $primary-400;

    .clinic-cta svg {
      transform: translate(2px, -2px);
    }
  }

  &:focus-visible {
    outline: 2px solid $primary-400;
    outline-offset: 2px;
  }
}

.clinic-copy {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.clinic-card .clinic-name {
  @include type-button;
  text-transform: uppercase;
  color: $primary-600;
}

.clinic-card .clinic-address {
  @include type-caption;
  font-style: normal;
  color: $primary-700;
  display: flex;
  flex-direction: column;

  span {
    font: inherit;
    color: inherit;
  }
}

.clinic-card .clinic-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  @include type-caption;
  font-weight: 600;
  color: $primary-400;

  svg {
    flex-shrink: 0;
    transition: transform 0.2s ease-in-out;
  }
}
</style>
