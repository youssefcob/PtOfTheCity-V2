<script setup lang="ts">
const screeningItems = [
  'Golf fitness assessment',
  'Posture & alignment analysis',
  'Hip mobility testing for golf performance',
  'Thoracic spine rotation assessment',
  'Balance training for golf evaluation',
  'Rotational strength evaluation',
  'Core & glute activation testing',
  'Full swing movement pattern review',
];
</script>

<template>
  <section class="about-section">
    <div class="about-inner">
      <!-- Left: Image with geometric background block -->
      <div class="about-image-wrapper">
        <div class="about-image-bg"></div>
        <div class="about-image-frame">
          <img src="/images/benchcraft/about.png" alt="PT of The City × BenchCraft Partnership" />
        </div>
      </div>

      <!-- Right: Text Content -->
      <div class="about-content">
        <!-- <span class="about-label">WHY BENCH CRAFT MEMBERS TRUST PT OF THE CITY</span> -->

        <h2 class="about-title">
          GOLF PERFORMANCE<br />
          SCREENING
        </h2>

        <div class="about-text">
          <p>
            A detailed golf performance screening designed to evaluate how your body moves through
            the swing — and how those movement patterns impact mobility, consistency, performance,
            and injury risk.
          </p>
          <p>
            This process helps identify physical limitations early, allowing golfers and active
            individuals to improve movement quality, reduce stress on the body, and perform more
            efficiently.
          </p>

          <p class="about-list-label">WHAT'S INCLUDED</p>

          <ul class="about-list">
            <li v-for="item in screeningItems" :key="item">
              <span class="about-list-check">✓</span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
$bc-accent: #4ABFBF;
$bc-dark-teal: #1E6B6B;
$bc-bg: #f5f6f8;
$bc-heading: #1C2B3A;
$bc-text: #4A5568;
$bc-label: #3AAFAF;

.about-section {
  width: 100%;
  background: $bc-bg;
  padding: 5rem 6.25rem;

  @media screen and (max-width: 1100px) {
    padding: 4rem 2rem;
  }

  @media screen and (max-width: 500px) {
    padding: 3rem 1rem;
  }
}

.about-inner {
  max-width: 1400px;
  margin: 10rem 10rem;
  display: flex;
  align-items: flex-start;
  gap: 5rem;

  @media screen and (max-width: 1100px) {
    flex-direction: column;
    gap: 2.5rem;
    margin: 0 auto;
  }
}

/* ─── Image block ─── */
.about-image-wrapper {
  flex: 0 0 48%;
  position: relative;
  padding-bottom: 2rem;

  @media screen and (max-width: 1100px) {
    width: 100%;
    flex: none;
  }
}

.about-image-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 78%;
  height: 92%;
  background: linear-gradient(160deg, #2AADAD 0%, #17606B 55%, #0F3D4A 100%);
  border-radius: 0.25rem;
  z-index: 0;
}

.about-image-frame {
  position: relative;
  z-index: 1;
  margin-left: 8%;
  margin-top: 5.5%;

  img {
    width: 100%;
    display: block;
    border-radius: 0.25rem;
    object-fit: cover;
    aspect-ratio: 4 / 3.2;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  }
}

/* ─── Text block ─── */
.about-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.about-label {
  font-family: 'DM Sans', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: $bc-label;
  letter-spacing: 0.12em;
  text-transform: uppercase;

  @media screen and (max-width: 500px) {
    font-size: 1rem;
    font-weight: 800;
  }
}

.about-title {
  font-family: 'Encode Sans Expanded', sans-serif;
  font-size: 3.5rem;
  font-weight: 800;
  color: $bc-heading;
  line-height: 1.15;
  letter-spacing: -0.5px;
  text-transform: uppercase;
  margin: 0;

  @media screen and (max-width: 800px) {
    font-size: 1.7rem;
  }

  @media screen and (max-width: 500px) {
    font-size: 3.35rem;
  }
}

.about-text {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  margin-top: 2rem;

  p {
    font-family: 'DM Sans', sans-serif;
    font-size: 1.48rem;
    font-weight: 400;
    color: $bc-text;
    line-height: 1.7;
    margin: 0;
  }
}

.about-list-label {
  font-family: 'Encode Sans Expanded', sans-serif;
  font-size: 1.1rem !important;
  font-weight: 700 !important;
  color: $bc-label !important;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-top: 0.5rem !important;
}

.about-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;

  li {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    font-family: 'DM Sans', sans-serif;
    font-size: 1.48rem;
    color: $bc-text;
    line-height: 1.6;
  }
}

.about-list-check {
  flex-shrink: 0;
  color: $bc-accent;
  font-weight: 700;
  margin-top: 0.1rem;
}
</style>