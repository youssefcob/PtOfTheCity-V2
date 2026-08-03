<script setup lang="ts">
function scrollToBooking() {
  const el = document.getElementById('booking-form');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
const services = [
  {
    title: 'SPORTS PHYSICAL THERAPY',
    text: 'Focused on recovery and athletic performance.',
  },
  {
    title: 'MANUAL THERAPY',
    text: 'To improve movement quality and reduce restrictions.',
  },
  {
    title: 'MOBILITY RESTORATION',
    text: 'For smoother, more efficient motion.',
  },
  {
    title: 'PERSONALIZED RECOVERY SESSIONS',
    text: 'Based on activity demands and performance goals.',
  },
  {
    title: 'POST-SURGICAL REHABILITATION',
    text: 'With a structured return to sport focus.',
  },
  {
    title: 'GOLF-SPECIFIC MOVEMENT RETRAINING',
    text: 'To support swing mechanics and consistency.',
  },
];
</script>

<template>
  <section class="approach-section">
    <div class="approach-overlay"></div>

    <div class="approach-inner">
      <h2 class="approach-heading">OUR APPROACH INCLUDES:</h2>

      <div class="approach-grid">
        <!-- Left 70%: Service cards in 3 rows with varying ratios -->
        <div class="approach-left">
          <!-- Row 1: 2:3 -->
          <div class="card-row row-2-3">
            <div class="service-card">
              <h3 class="service-title">{{ services[0].title }}</h3>
              <p class="service-text">{{ services[0].text }}</p>
            </div>
            <div class="service-card">
              <h3 class="service-title">{{ services[1].title }}</h3>
              <p class="service-text">{{ services[1].text }}</p>
            </div>
          </div>

          <!-- Row 2: 3:2 -->
          <div class="card-row row-3-2">
            <div class="service-card">
              <h3 class="service-title">{{ services[2].title }}</h3>
              <p class="service-text">{{ services[2].text }}</p>
            </div>
            <div class="service-card">
              <h3 class="service-title">{{ services[3].title }}</h3>
              <p class="service-text">{{ services[3].text }}</p>
            </div>
          </div>

          <!-- Row 3: 3:4 -->
          <div class="card-row row-3-4">
            <div class="service-card">
              <h3 class="service-title">{{ services[4].title }}</h3>
              <p class="service-text">{{ services[4].text }}</p>
            </div>
            <div class="service-card">
              <h3 class="service-title">{{ services[5].title }}</h3>
              <p class="service-text">{{ services[5].text }}</p>
            </div>
          </div>
        </div>

        <!-- Right 30%: Advanced Therapies + CTA -->
        <div class="approach-right">
          <div class="service-card featured">
            <h3 class="service-title">ADVANCED THERAPIES</h3>
            <p class="service-text">
              Shockwave therapy for targeted recovery and tissue healing, plus stability & coordination training for improved control and movement efficiency.
            </p>
          </div>

          <div class="service-card payment-note">
            <p class="service-text">
              Flexible self-pay performance sessions and insurance-based treatment options are both available depending on your goals and preferences.
            </p>
          </div>

          <button @click="scrollToBooking" class="btn-cta">
            BOOK MY SESSION →
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
$bc-teal: #4FD1C5;
$bc-teal-dark: #38b2ac;

.approach-section {
  position: relative;
  width: 100%;
  background-image: url('/images/benchcraft/golf-course-bg.jpg');
  background-size: cover;
  background-position: center;
  padding: 5rem 6.25rem;
  opacity: 1;

  @media screen and (max-width: 1100px) {
    padding: 4rem 2rem;
  }

  @media screen and (max-width: 600px) {
    padding: 3rem 1.2rem;
  }
}

.approach-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 0;
}

.approach-inner {
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
}

.approach-heading {
  font-family: 'Encode Sans Expanded', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  text-align: center;
  margin: 0 0 3rem;

  @media screen and (max-width: 600px) {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
}

.approach-grid {
  display: grid;
  grid-template-columns: 7fr 3fr;
  gap: 1.5rem;

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

/* ── Left: 3 rows with varying ratios ── */
.approach-left {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card-row {
  display: flex;
  gap: 1rem;

  > .service-card {
    flex: 1;
  }

  &.row-2-3 > .service-card:first-child { flex: 2; }
  &.row-2-3 > .service-card:last-child { flex: 3; }

  &.row-3-2 > .service-card:first-child { flex: 3; }
  &.row-3-2 > .service-card:last-child { flex: 2; }

  &.row-3-4 > .service-card:first-child { flex: 3; }
  &.row-3-4 > .service-card:last-child { flex: 4; }

  @media screen and (max-width: 700px) {
    flex-direction: column;

    > .service-card {
      flex: 1 !important;
    }
  }
}

/* ── Right: Featured card + CTA ── */
.approach-right {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* ── Card styles ── */
.service-card {
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1.75rem;
  padding: 2rem 2rem;

  &.featured {
    flex: 1;
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.25);
  }

  &.payment-note {
    background: rgba(79, 209, 197, 0.12);
    border: 1px solid rgba(79, 209, 197, 0.3);
  }
}

.service-title {
  font-family: 'DM Sans', sans-serif;
  font-size: 1.9rem;
  font-weight: 700;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin: 0 0 0.6rem;
  line-height: 1.3;
}

.service-text {
  font-family: 'DM Sans', sans-serif;
  font-size: 1.5rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.55;
  margin: 0;
}

/* ── CTA Button ── */
.btn-cta {
  display: block;
  width: 100%;
  padding: 0.9rem 1.5rem;
  background: $bc-teal;
  color: #1a202c;
  font-family: 'DM Sans', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  text-align: center;
  text-decoration: none;
  letter-spacing: 0.04em;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: $bc-teal-dark;
  }
}
</style>