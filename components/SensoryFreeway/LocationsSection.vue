<script setup lang="ts">
// Sensory Freeway locations section — map image + clinic list + contact rows.
// All content is overridable via props; defaults match the design.

interface Clinic {
  name: string;
  address: string;
  /** Renders the clinic inside a bordered card */
  carded?: boolean;
  /** Shows the rotated "Coming Soon" badge + note instead of "Get Directions" */
  comingSoon?: boolean;
  note?: string;
}

const props = withDefaults(
  defineProps<{
    eyebrow?: string;
    heading?: string;
    clinics?: Clinic[];
    hours?: string;
    phone?: string;
    email?: string;
    /** Map image — pass the src when the asset is ready */
    mapImageSrc?: string;
    mapImageAlt?: string;
    overlayLine1?: string;
    overlayLine2?: string;
  }>(),
  {
    eyebrow: 'Find Us Nearby',
    heading: 'Accessible Brooklyn Neighborhood Clinics',
    clinics: () => [
      {
        name: 'Bensonhurst Clinic (Flagship)',
        address: '8746 20th Ave, Brooklyn, NY 11214',
      },
      {
        name: 'Sunset Park Clinic',
        address: '5418 5th Ave, Brooklyn, NY 11220',
        carded: true,
        comingSoon: true,
        note: 'Opening soon - not yet open',
      },
    ],
    hours: 'Mon–Fri 8AM – 7PM | Sat 9AM – 2PM',
    phone: '(718) 555-0192',
    email: 'info@sensoryfreeway.com',
    mapImageSrc: '',
    mapImageAlt: 'Map of Sensory Freeway clinic locations in Brooklyn',
    overlayLine1: 'Now Expanding',
    overlayLine2: 'Across Brooklyn',
  },
);

const directionsLink = (address: string) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(address)}`;

const telLink = computed(() => `tel:+1${props.phone.replace(/\D/g, '')}`);
</script>

<template>
  <section class="sf-locations">
    <div class="locations-inner">
      <span class="eyebrow">{{ eyebrow }}</span>
      <h2 class="heading">{{ heading }}</h2>

      <div class="locations-grid">
        <!-- LEFT: map image -->
        <div class="map-wrap">
          <img v-if="mapImageSrc" :src="mapImageSrc" :alt="mapImageAlt" class="map-image" />
          <div v-else class="map-placeholder">Map image goes here</div>
          <div class="map-overlay">
            <strong>{{ overlayLine1 }}</strong>
            <span>{{ overlayLine2 }}</span>
          </div>
        </div>

        <!-- RIGHT: clinics + contact -->
        <div class="clinics-col">
          <div
            v-for="clinic in clinics"
            :key="clinic.name"
            class="clinic"
            :class="{ carded: clinic.carded }"
          >
            <span v-if="clinic.comingSoon" class="coming-soon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3.5 2" />
              </svg>
              Coming Soon
            </span>

            <h3 class="clinic-name">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="pin-icon">
                <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {{ clinic.name }}
            </h3>
            <p v-if="clinic.comingSoon && clinic.note" class="clinic-note">{{ clinic.note }}</p>
            <p class="clinic-address">{{ clinic.address }}</p>
            <span
              v-if="clinic.comingSoon"
              class="directions-link"
              :class="{ pill: clinic.carded }"
              aria-disabled="true"
            >
              Get Directions
            </span>
            <a
              v-else
              :href="directionsLink(clinic.address)"
              target="_blank"
              rel="noopener"
              class="directions-link"
              :class="{ pill: clinic.carded }"
            >
              Get Directions
            </a>
          </div>

          <!-- Contact rows -->
          <div class="contact-rows">
            <p><strong>Hours:</strong> {{ hours }}</p>
            <p><strong>Phone:</strong> <a :href="telLink">{{ phone }}</a></p>
            <p><strong>Email:</strong> <a :href="`mailto:${email}`">{{ email }}</a></p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.sf-locations {
  --coral: #f26b5e;
  --ink: #16382e;
  --muted: #51655e;
  --mint-bg: #e9f3ec;
  --teal: #4ecdb0;
  --teal-dark: #2fae94;
  --line: #e8e2d8;

  background: #fdfcfa;
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding: clamp(48px, 7vh, 88px) 24px;
}

.locations-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.eyebrow {
  display: inline-block;
  padding: 7px 14px;
  border-radius: 999px;
  background: var(--mint-bg);
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--ink);
  margin-bottom: 16px;
}

.heading {
  margin: 0 0 clamp(28px, 4vh, 44px);
  font-size: clamp(28px, 3.4vw, 44px);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--ink);
}

.locations-grid {
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  gap: clamp(32px, 4vw, 64px);
  align-items: start;
}

/* LEFT: map */
.map-wrap {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
}

.map-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.map-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 4 / 3.1;
  border: 2px dashed #e0d5c6;
  border-radius: 20px;
  background: #fff;
  color: #a8998a;
  font-size: 14px;
  font-weight: 500;
}

.map-overlay {
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 12px 18px;
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 4px 16px rgba(22, 56, 46, 0.12);
}

.map-overlay strong {
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: var(--ink);
}

.map-overlay span {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--ink);
}

/* RIGHT: clinics */
.clinics-col {
  display: flex;
  flex-direction: column;
}

.clinic {
  position: relative;
  padding: 22px 0;
  border-bottom: 1px solid #eee8de;
}

.clinic:first-child {
  padding-top: 0;
}

.clinic.carded {
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 22px 24px;
  margin: 8px 0;
  background: #fff;
}

.clinic-name {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 6px;
  font-size: 16.5px;
  font-weight: 700;
  color: var(--ink);
}

.pin-icon {
  width: 17px;
  height: 17px;
  color: var(--coral);
  flex-shrink: 0;
}

.clinic-note {
  margin: 0 0 2px;
  font-size: 12.5px;
  color: var(--muted);
}

.clinic-address {
  margin: 0 0 10px;
  font-size: 14px;
  color: var(--muted);
}

.directions-link {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--ink);
  text-decoration: none;
}

.directions-link:hover {
  color: var(--coral);
}

.directions-link[aria-disabled='true'] {
  color: #9aa7a2;
  cursor: not-allowed;
  pointer-events: none;
}

.directions-link.pill {
  display: inline-flex;
  padding: 8px 18px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: #fff;
  transition: border-color 0.15s ease, color 0.15s ease;
}

.directions-link.pill:hover {
  border-color: var(--coral);
  color: var(--coral);
}

.directions-link.pill[aria-disabled='true']:hover {
  border-color: var(--line);
  color: #9aa7a2;
}

.coming-soon {
  position: absolute;
  top: 14px;
  right: -6px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 12px;
  border-radius: 999px;
  background: var(--teal);
  color: #0b2b23;
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  transform: rotate(6deg);
  box-shadow: 0 3px 10px rgba(78, 205, 176, 0.4);
}

.coming-soon svg {
  width: 12px;
  height: 12px;
}

/* Contact rows */
.contact-rows {
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.contact-rows p {
  margin: 0;
  font-size: 14px;
  color: var(--muted);
}

.contact-rows strong {
  color: var(--ink);
  font-weight: 700;
}

.contact-rows a {
  color: inherit;
  text-decoration: none;
}

.contact-rows a:hover {
  color: var(--coral);
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .locations-grid {
    grid-template-columns: 1fr;
  }

  .map-placeholder {
    aspect-ratio: 16 / 9;
  }
}

@media (max-width: 480px) {
  .sf-locations {
    padding: 40px 16px 48px;
  }

  .coming-soon {
    right: 8px;
  }
}
</style>
