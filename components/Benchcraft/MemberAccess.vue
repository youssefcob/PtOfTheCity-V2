<script setup lang="ts">

</script>

<template>
  <section class="access-section">
    <!-- Dark overlay -->
    <div class="access-overlay" />

    <div class="access-inner">
      <!-- Left: Content -->
      <div class="access-content">
        <h2 class="access-title">
          AN INSIDE LOOK AT HOW<br />
          PT OF THE CITY<br />
          SUPPORTS YOUR GAME
        </h2>

        <p class="access-subtitle">
          You are invited to experience PT of The City through a performance-focused introduction
          to our approach in movement, recovery, sports injuries, and golf performance care.
        </p>

        <p class="access-subtitle">
          Designed for golfers who value longevity, consistency, and high-level performance, our
          focus is on helping you understand how your body impacts your game — and how to continue
          performing at your best both on and off the course.
        </p>

        <p class="access-eyebrow">NOW GOLFERS CAN ACCESS</p>

        <ul class="access-list">
          <li>
            <span class="check">✓</span>
            <span class="access-list-item">Golf-focused movement & injury screenings</span>
          </li>
          <li>
            <span class="check">✓</span>
            <span class="access-list-item">One-on-one performance consultations with our clinical team</span>
          </li>
          <li>
            <span class="check">✓</span>
            <span class="access-list-item">Priority scheduling across our NYC locations</span>
          </li>
          <li>
            <span class="check">✓</span>
            <span class="access-list-item">Access to self-pay performance sessions and recovery care</span>
          </li>
          <li>
            <span class="check">✓</span>
            <span class="access-list-item">Sports performance and golf mobility education events</span>
          </li>
          <li>
            <span class="check">✓</span>
            <span class="access-list-item">Wellness-focused programs for members and families</span>
          </li>
        </ul>
      </div>

      <!-- Right: Booking form slot -->
      <div class="access-form-slot">
        <BenchcraftBookingForm transparent />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
$bc-teal: #3ECFCF;
$bc-text: #ffffff;
$bc-text-muted: rgba(255, 255, 255, 0.82);

.access-section {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;

  background-image: url('/images/benchcraft/access-bg.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
}

.access-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    110deg,
    rgba(5, 30, 40, 0.82) 0%,
    rgba(10, 60, 65, 0.72) 50%,
    rgba(8, 50, 55, 0.65) 100%
  );
  z-index: 0;
}

.access-inner {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 5rem 6.25rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;

  @media screen and (max-width: 1100px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    padding: 4rem 2rem;
  }

  @media screen and (max-width: 600px) {
    padding: 3rem 1.2rem;
  }
}

/* ── Left content ── */
.access-content {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.access-title {
  font-family: 'Encode Sans Expanded', sans-serif;
  font-size: 5rem;
  font-weight: 800;
  color: $bc-text;
  text-transform: uppercase;
  line-height: 1.1;
  letter-spacing: -0.5px;
  margin: 0;

  @media screen and (max-width: 800px) {
    font-size: 2.2rem;
  }

  @media screen and (max-width: 500px) {
    font-size: 1.75rem;
  }
}

.access-subtitle {
  font-family: 'DM Sans', sans-serif;
  font-size: 1.55rem;
  color: $bc-text-muted;
  line-height: 1.75;
  margin: 0;
}

.access-eyebrow {
  font-family: 'Encode Sans Expanded', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: $bc-teal;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0;
}

/* ── Checklist ── */
.access-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;

  li {
    display: flex;
    align-items: flex-start;
    gap: 0.85rem;
    font-family: 'DM Sans', sans-serif;
    line-height: 1.65;

    strong {
      color: $bc-text;
      font-weight: 600;
    }
  }
}

.access-list-item {
  color: white;
  font-size: 1.55rem;
}

.check {
  flex-shrink: 0;
  margin-top: 0.15rem;
  color: #E4C97A;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.65;
}

/* ── Right: form slot ── */
.access-form-slot {
  display: flex;
  justify-content: center;
  align-items: center;

  :deep(> *) {
    width: 100%;
  }

  :deep(.booking-card) {
    margin: 0 auto;
  }
}
@media screen and (min-width: 1330px) {
  .access-section {
    width: 100vw;
    margin-left: 0;
    margin-right: 0;
  }

  .access-inner {
    margin: 0 auto;
    padding-left: 0px;
    padding-right: 0px;
  }
}
</style>