<script setup lang="ts">
import { ref } from 'vue'

const currentSlide = ref(0)
const steps = [
  {
    number: '01',
    title: 'GOLF PERFORMANCE ASSESSMENT',
    image: '/images/benchcraft/eval-1.jpg',
    alt: 'Golf Performance Assessment',
    items: ['Golf fitness assessment', 'Full swing movement pattern review']
  },
  {
    number: '02',
    title: 'MOVEMENT & MOBILITY ANALYSIS',
    image: '/images/benchcraft/eval-2.jpg',
    alt: 'Movement & Mobility Analysis',
    items: ['Posture & alignment analysis', 'Hip mobility testing for golf performance', 'Thoracic spine rotation assessment']
  },
  {
    number: '03',
    title: 'STRENGTH & STABILITY EVALUATION',
    image: '/images/benchcraft/eval-3.jpg',
    alt: 'Strength & Stability Evaluation',
    items: ['Balance training for golf evaluation', 'Rotational strength evaluation', 'Core & glute activation testing']
  }
]

const touchStartX = ref(0)
const touchDeltaX = ref(0)
const isSwiping = ref(false)
const SWIPE_THRESHOLD = 50

function onTouchStart(e: TouchEvent) {
  touchStartX.value = e.touches[0].clientX
  touchDeltaX.value = 0
  isSwiping.value = true
}

function onTouchMove(e: TouchEvent) {
  if (!isSwiping.value) return
  touchDeltaX.value = e.touches[0].clientX - touchStartX.value
}

function onTouchEnd() {
  if (!isSwiping.value) return
  isSwiping.value = false

  if (touchDeltaX.value < -SWIPE_THRESHOLD && currentSlide.value < steps.length - 1) {
    currentSlide.value++
  } else if (touchDeltaX.value > SWIPE_THRESHOLD && currentSlide.value > 0) {
    currentSlide.value--
  }

  touchDeltaX.value = 0
}
</script>

<template>
  <section class="eval-section">
    <!-- Header -->
    <div class="eval-header">
      <span class="eval-label">THE CLINICAL BLUEPRINT</span>
      <h2 class="eval-title">EVALUATION & TREATMENT</h2>
      <p class="eval-subtitle">
        We don't just help golfers recover—we help athletes move better, perform stronger, and stay
        active longer. Our approach combines sports rehabilitation, advanced performance care, and
        sports physical therapy to reduce injury risk, improve movement efficiency, and support a
        confident return to peak performance.
      </p>
    </div>

    <!-- Desktop Steps -->
    <div class="eval-steps desktop-only">

      <!-- Step 01: number+text LEFT, image RIGHT -->
      <div class="eval-row row-normal">
        <div class="eval-row-info">
          <span class="eval-number">01</span>
          <div class="eval-row-text">
            <h3 class="eval-step-title">GOLF PERFORMANCE<br />ASSESSMENT</h3>
            <ul class="eval-list">
              <li>Golf fitness assessment</li>
              <li>Full swing movement pattern review</li>
            </ul>
          </div>
        </div>
        <div class="eval-row-image">
          <img src="/images/benchcraft/eval-1.jpg" alt="Golf Performance Assessment" />
        </div>
      </div>

      <!-- Step 02: image LEFT, number+text RIGHT -->
      <div class="eval-row row-reverse">
        <div class="eval-row-image">
          <img src="/images/benchcraft/eval-2.jpg" alt="Movement & Mobility Analysis" />
        </div>
        <div class="eval-row-info">
          <span class="eval-number">02</span>
          <div class="eval-row-text">
            <h3 class="eval-step-title">MOVEMENT & MOBILITY ANALYSIS</h3>
            <ul class="eval-list">
              <li>Posture & alignment analysis</li>
              <li>Hip mobility testing for golf performance</li>
              <li>Thoracic spine rotation assessment</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Step 03: number+text LEFT, image RIGHT -->
      <div class="eval-row row-normal">
        <div class="eval-row-info">
          <span class="eval-number">03</span>
          <div class="eval-row-text">
            <h3 class="eval-step-title">STRENGTH & STABILITY<br />EVALUATION</h3>
            <ul class="eval-list">
              <li>Balance training for golf evaluation</li>
              <li>Rotational strength evaluation</li>
              <li>Core & glute activation testing</li>
            </ul>
          </div>
        </div>
        <div class="eval-row-image">
          <img src="/images/benchcraft/eval-3.jpg" alt="Strength & Stability Evaluation" />
        </div>
      </div>

    </div>

    <!-- Mobile Swiper -->
    <div class="mobile-swiper mobile-only">
      <div
  class="swiper-track"
  :style="{
    transform: `translateX(calc(${currentSlide} * (-85vw - 1rem) + ${isSwiping ? touchDeltaX : 0}px))`,
    transition: isSwiping ? 'none' : 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
  }"
  @touchstart="onTouchStart"
  @touchmove="onTouchMove"
  @touchend="onTouchEnd"
>
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="swiper-card"
          :style="{ backgroundImage: `url(${step.image})` }"
        >
          <div class="swiper-card-overlay" />
          <div class="swiper-card-content">
            <h3 class="swiper-card-title">{{ step.title }}</h3>
            <ul class="swiper-card-pills">
              <li v-for="(item, i) in step.items" :key="i" class="swiper-pill">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Dots -->
      <div class="swiper-dots">
        <button
          v-for="(_, index) in steps"
          :key="index"
          class="swiper-dot"
          :class="{ active: currentSlide === index }"
          @click="currentSlide = index"
          :aria-label="`Go to slide ${index + 1}`"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
$bc-teal: #3AAFAF;
$bc-dark: #1C2B3A;
$bc-text: #4A5568;
$bc-label: #3AAFAF;
$bc-bg: #ffffff;
$bc-number-color: rgba(28, 43, 58, 0.12);

.eval-section {
  width: 100%;
  background: $bc-bg;
  padding: 5rem 6.25rem;

  @media screen and (max-width: 1100px) {
    padding: 4rem 2rem;
  }

  @media screen and (max-width: 900px) {
    padding: 3rem 1.2rem;
  }
}

/* ── Visibility helpers ── */
.desktop-only {
  @media screen and (max-width: 900px) {
    display: none !important;
  }
}

.mobile-only {
  display: none;

  @media screen and (max-width: 900px) {
    display: block;
  }
}

/* ── Header ── */
.eval-header {
  max-width: 540px;
  margin-bottom: 4rem;
}

.eval-label {
  font-family: 'DM Sans', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: $bc-label;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.eval-title {
  font-family: 'Encode Sans Expanded', sans-serif;
  font-size: 2.4rem;
  font-weight: 800;
  color: $bc-dark;
  text-transform: uppercase;
  letter-spacing: -0.5px;
  line-height: 1.1;
  margin: 0 0 1.2rem;

  @media screen and (max-width: 700px) {
    font-size: 1.8rem;
  }
}

.eval-subtitle {
  font-family: 'DM Sans', sans-serif;
  font-size: 1.5rem;
  color: $bc-text;
  line-height: 1.75;
  margin: 0;
}

/* ── Desktop Steps ── */
.eval-steps {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.eval-row {
  display: grid;
  align-items: center;
  gap: 2rem;
  margin-bottom: 5rem;

  &.row-normal {
    grid-template-columns: 1fr 1.6fr;
  }

  &.row-reverse {
    grid-template-columns: 1.6fr 1fr;
  }
}

.eval-row-info {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 2.5rem 1rem;
}

.eval-number {
  font-family: 'Encode Sans Expanded', sans-serif;
  font-size: 6rem;
  font-weight: 800;
  line-height: 1;
  color: transparent;
  -webkit-text-stroke: 2px $bc-number-color;
  letter-spacing: -2px;
  flex-shrink: 0;
  user-select: none;
  margin-top: -0.5rem;
}

.eval-row-text {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.eval-step-title {
  font-family: 'Encode Sans Expanded', sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  color: $bc-dark;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  line-height: 1.35;
  margin: 0;
}

.eval-list {
  list-style: disc;
  padding-left: 1.1rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;

  li {
    font-family: 'DM Sans', sans-serif;
    font-size: 1.25rem;
    color: $bc-text;
    line-height: 1.6;
    padding-left: 0.2rem;
  }
}

.eval-row-image {
  width: 100%;
  height: 280px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 1rem;
    display: block;
  }
}

/* ── Mobile Swiper ── */
.mobile-swiper {
  overflow: hidden;
  padding-bottom: 1.5rem;
}

.swiper-track {
  display: flex;
  gap: 1rem;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}

.swiper-card {
  position: relative;
  flex-shrink: 0;
  width: 85vw;
  height: 480px;
  border-radius: 1.25rem;
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

.swiper-card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.08) 0%,
    rgba(0, 0, 0, 0.45) 45%,
    rgba(0, 0, 0, 0.72) 100%
  );
  border-radius: inherit;
}

.swiper-card-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.75rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.swiper-card-title {
  font-family: 'Encode Sans Expanded', sans-serif;
  font-size: 1.4rem;
  font-weight: 800;
  color: #ffffff;
  text-transform: uppercase;
  line-height: 1.3;
  margin: 0;
}

.swiper-card-pills {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.swiper-pill {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
  color: #ffffff;
  border: 1.5px solid $bc-teal;
  border-radius: 2rem;
  padding: 0.5rem 1rem;
  display: inline-block;
  width: fit-content;
  line-height: 1.4;
  backdrop-filter: blur(4px);
  background: rgba(255, 255, 255, 0.06);
}

/* ── Swiper Dots ── */
.swiper-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.25rem;
}

.swiper-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: rgba($bc-dark, 0.2);
  padding: 0;
  cursor: pointer;
  transition: background 0.25s ease, transform 0.25s ease;

  &.active {
    background: $bc-teal;
    transform: scale(1.3);
  }
}
</style>