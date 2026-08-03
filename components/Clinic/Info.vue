<template>
  <div class="info-wrapper">


    <!-- Location & Hours -->
    <div class="location-section">
      <h2 class="section-title">Location & Hours</h2>
      <div class="schedule-map-flex">
        <div class="schedule-wrapper">
          <!-- Address card -->
          <div class="info-card">
            <p class="card-title">Clinic Address</p>
            <p class="address-text">{{ clinic.street_address }}</p>
            <p class="address-text">{{ clinic.city }}, {{ clinic.state }} {{ clinic.zip_code }}</p>
            <p class="underline" v-if="clinic.location_link"><a :href="clinic.location_link"
                target="_blank">View on Map</a></p>
          </div>

          <!-- Hours card -->
          <div class="info-card">
            <div class="card-title-row">
              <p class="card-title">Working Hours</p>
              <div v-if="isOpenNow" class="open-now-badge">
                <span class="open-dot" />
                Open Now
              </div>
            </div>
            <ul class="hours-list">
              <li v-for="day in daysOfWeek" :key="day" class="hours-row" :class="{ 'is-today': isToday(day) }">
                <span class="day-label">{{ capitalize(day) }}</span>
                <span v-if="clinic.schedule[day as keyof typeof clinic.schedule].off" class="closed-label">Closed</span>
                <span v-else class="hours-range">
                  {{ toAmPm(clinic.schedule[day as keyof typeof clinic.schedule].start) }} – {{
                    toAmPm(clinic.schedule[day as keyof typeof clinic.schedule].end) }}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div class="map-wrapper">
          <Map :positions="[clinic]" :zoom="12" :center="{ lat: Number(clinic.lat), lng: Number(clinic.long) }" />
        </div>
      </div>
    </div>

    <!-- contact info -->
    <div class="contact-section">
      <!-- <p class="contact-eyebrow">Get in Touch</p> -->
      <h2 class="section-title" style="color:white">Contact Information</h2>
      <div class="contact-grid">
        <a :href="`tel:${clinic.phone}`" class="contact-card">
          <div class="contact-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path
                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12.7 19.79 19.79 0 0 1 1.63 4.1 2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.1 6.1l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17.92z" />
            </svg>
          </div>
          <p class="contact-label">Main Phone</p>
          <p class="contact-value">{{ clinic.phone }}</p>
          <p class="contact-desc">Tap to call</p>
        </a>

        <a href="tel:+18559553899" class="contact-card">
          <div class="contact-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
          </div>
          <p class="contact-label">Fax</p>
          <p class="contact-value">(855) 955-3899</p>
          <p class="contact-desc">Documents &amp; referrals</p>
        </a>

        <a href="mailto:info@ptofthecity.com" class="contact-card">
          <div class="contact-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
          <p class="contact-label">General Email</p>
          <p class="contact-value">info@ptofthecity.com</p>
          <p class="contact-desc">General inquiries</p>
        </a>

        <a href="mailto:referrals@ptofthecity.com" class="contact-card">
          <div class="contact-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <p class="contact-label">Referrals</p>
          <p class="contact-value">referrals@ptofthecity.com</p>
          <p class="contact-desc">Provider referrals</p>
        </a>
      </div>
    </div>

    <!-- About Us -->
    <div class="about-section">
      <h2 class="section-title">Where Exceptional Care Begins </h2>
      <ClientOnly>
        <p class="summary" v-html="props.clinic.summary"></p>
      </ClientOnly>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Map from '~/sharedComponents/Map.vue';
import type { Clinic } from '~/types/types';

const props = defineProps({
  clinic: {
    type: Object as () => Clinic,
    required: true,
  },
});

const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const todayIndex = new Date().getDay(); // 0 = Sunday
const isToday = (day: string) => daysOfWeek.indexOf(day) === (todayIndex === 0 ? 6 : todayIndex - 1);

const isOpenNow = computed(() => {
  const nyNow = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }));
  const nyDay = nyNow.getDay();
  const todayKey = daysOfWeek[nyDay === 0 ? 6 : nyDay - 1];
  const s = props.clinic.schedule?.[todayKey as keyof typeof props.clinic.schedule];
  if (!s || s.off) return false;
  const currentMins = nyNow.getHours() * 60 + nyNow.getMinutes();
  const toMins = (t: string) => { const [h, m] = t.split(':'); return Number(h) * 60 + (Number(m) || 0); };
  return currentMins >= toMins(s.start) && currentMins < toMins(s.end);
});

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const toAmPm = (time: string) => {
  if (!time) return '—';
  const [h, m] = time.split(':');
  const hour = parseInt(h);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const h12 = hour % 12 || 12;
  return m ? `${h12}:${m} ${ampm}` : `${h12} ${ampm}`;
};
</script>

<style scoped lang="scss">
.info-wrapper {
  @include pagePadding();
  display: flex;
  flex-direction: column;
  gap: 5rem;
  margin-top: 3rem;

  @media screen and (min-width: 800px) {
    gap: 10rem;
    padding-top: 5rem;
    margin-top: 5rem;
  }
}

.about-section {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.section-title {
  font-weight: 700;
  margin-bottom: 2rem;
}

.summary {
  // text-align: center;
  // background-color: red;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // max-width: 70ch;
  // line-height: 1.7;
}

.schedule-map-flex {
  display: flex;
  gap: 4rem;
  align-items: flex-start;

  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
}

.schedule-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  flex-shrink: 0;
  min-width: 26rem;

  @media screen and (max-width: 800px) {
    min-width: unset;
    width: 100%;
  }
}

.info-card {
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  padding: 1.25rem 1.5rem;
}

.card-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.card-title {
  font-weight: 700;
  font-size: 1.5rem;
  margin-bottom: 0;
}

.open-now-badge {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: #16a34a;
}

.open-dot {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  background-color: #22c55e;
  box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.6);
  animation: pulse-green 1.8s ease-out infinite;
  flex-shrink: 0;
}

@keyframes pulse-green {
  0% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.6);
  }

  70% {
    box-shadow: 0 0 0 7px rgba(34, 197, 94, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
  }
}

.address-text {
  color: #555;
  font-size: 1.2rem;
  line-height: 1.6;

}

.underline {
  text-decoration: underline;
  margin-top: 0.5rem;
  font-size: 1.2rem;
  line-height: 1.6;
}

.hours-list {
  list-style: none;
  padding: 0 !important;
  margin: 0;
}

.hours-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.55rem 0;
  font-size: 0.9rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  margin: 0;

  &:last-child {
    border-bottom: none;
  }

  &.is-today .day-label {
    color: $cta;
    font-weight: 600;
  }
}

.day-label {
  color: #333;
}

.closed-label {
  color: #aaa;
  font-size: 1.4rem;
}

.hours-range {
  color: #333;
}

.contact-section {
  margin-left: -$pageMargin;
  margin-right: -$pageMargin;
  padding: 4rem $pageMargin;
  background: #174b61;

  @media screen and (max-width: 1100px) {
    margin-left: -$resMargin;
    margin-right: -$resMargin;
    padding: 3rem $resMargin;
  }
}

.contact-eyebrow {
  color: $cta;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 0.6rem;
}

.contact-title {
  color: #fff;
  font-weight: 700;
  font-size: 2rem;
  margin-bottom: 2.5rem;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;

  @media screen and (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 480px) {
    grid-template-columns: 1fr;
  }
}

.contact-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 1.75rem;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
}

.contact-icon {
  width: 3rem;
  height: 3rem;
  background: rgba(46, 229, 193, 0.12);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $cta;
  margin-bottom: 1rem;
}

.contact-label {
  color: rgba(255, 255, 255, 0.4);
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.contact-value {
  color: #fff;
  font-weight: 700;
  font-size: 1.4rem;
}

.contact-desc {
  color: rgba(255, 255, 255, 0.4);
  font-size: 1.4rem;
}

.map-wrapper {
  flex: 1;
  height: 40rem;

  :deep(> div) {
    height: 100%;
    width: 100%;
  }

  @media screen and (max-width: 800px) {
    flex: none;
    width: calc(100vw);
    height: 40vh;
  }
}

.section-title {
  color: $navy;
}
</style>
