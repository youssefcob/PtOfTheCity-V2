<script setup lang="ts">
const clinics = [
  { name: 'QUEENS', count: 3, slug: 'queens', gradient: 'linear-gradient(135deg, #0B3B5C 0%, #0B8B8B 100%)', image: '/images/benchcraft/queens.jpg' },
  { name: 'MANHATTAN', count: 6, slug: 'manhattan', gradient: 'linear-gradient(135deg, #0D1F35 0%, #0B8B8B 100%)', image: '/images/benchcraft/manhattan.jpg' },
  { name: 'BROOKLYN', count: 13, slug: 'brooklyn', gradient: 'linear-gradient(135deg, #152A45 0%, #3A8550 100%)', image: '/images/benchcraft/brooklyn.jpg' },
  { name: 'BRONX', count: 5, slug: 'bronx', gradient: 'linear-gradient(135deg, #0D1F35 0%, #2E6B3E 100%)', image: '/images/benchcraft/bronx.jpg' },
];
</script>

<template>
  <section class="clinics-section">
    <div class="clinics-inner">
      <!-- Header -->
      <div class="clinics-header">
        <span class="clinics-label">OUR CLINICS</span>
        <h2 class="clinics-title">
          32 LOCATIONS ACROSS<br />
          NEW YORK CITY
        </h2>
        <p class="clinics-description">
          Every PT of the City clinic is staffed by licensed therapists and open for golf member bookings. Find the one closest to your course.
        </p>
      </div>

      <!-- 2x2 Borough Cards -->
      <div class="clinics-grid">
        <NuxtLink
          v-for="clinic in clinics"
          :key="clinic.slug"
          :to="`/clinics/${clinic.slug}`"
          class="clinic-card"
          :style="{ backgroundImage: `url(${clinic.image}), ${clinic.gradient}` }"
        >
          <span class="clinic-count">{{ clinic.count }} Clinics</span>
          <div class="clinic-name-row">
            <span class="clinic-name">{{ clinic.name }}</span>
            <span class="clinic-arrow">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
$bc-teal: #2D8B8B;
$bc-heading: #2D3748;
$bc-text: #718096;
$bc-label: #3AAFAF;

.clinics-section {
  width: 100%;
  background: #ffffff;
  padding: 5rem 6.25rem;

  @media screen and (max-width: 1100px) {
    padding: 4rem 2rem;
  }

  @media screen and (max-width: 600px) {
    padding: 3rem 1.2rem;
  }
}

.clinics-inner {
  max-width: 1400px;
  margin: 0 auto;
}

.clinics-header {
  margin-bottom: 3rem;
}

.clinics-label {
  // font-family: 'DM Sans', sans-serif;
  // font-size: 0.9rem;
  // font-weight: 500;
  // color: $bc-teal;
  // letter-spacing: 0.1em;
  // text-transform: uppercase;
  font-family: 'DM Sans', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: $bc-label;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.clinics-title {
  font-family: 'Encode Sans Expanded', sans-serif;
  font-size: 2.5rem;
  font-weight: 800;
  color: $bc-heading;
  line-height: 1.15;
  letter-spacing: -0.3px;
  margin: 0.75rem 0 1rem;

  @media screen and (max-width: 800px) {
    font-size: 2rem;
  }

  @media screen and (max-width: 500px) {
    font-size: 1.5rem;
  }
}

.clinics-description {
  font-family: 'DM Sans', sans-serif;
  font-size: 1.25rem;
  color: $bc-text;
  line-height: 1.65;
  margin: 0;
  max-width: 600px;
}

/* ── 2x2 Grid ── */
.clinics-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  max-width: 700px;
  max-width: 60%;
  margin: 0 auto;

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    max-width: 100%;
  }
}

.clinic-card {
  border-radius: 0.75rem;
  padding: 2rem 1.75rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 220px;

  @media screen and (max-width: 600px) {
    min-height: 200px;
  }
  text-decoration: none;
  position: relative;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }
}

.clinic-count {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 0.3rem;
}

.clinic-name-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.clinic-name {
  font-family: 'DM Sans', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 0.04em;
}

.clinic-arrow {
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.7);
  transition: transform 0.2s, color 0.2s;
}

.clinic-card:hover .clinic-arrow {
  transform: translate(2px, -2px);
  color: #ffffff;
}
</style>
