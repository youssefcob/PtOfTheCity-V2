<script setup lang="ts">
function scrollToBooking() {
  const el = document.getElementById('booking-form');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
</script>

<template>
  <section class="pricing-cta">
    <div class="pricing-content">
      <span class="pricing-label">
        SELF-PAY OPTION
      </span>

      <h2 class="pricing-title">
        TRANSPARENT PRICING.
      </h2>

      <p class="pricing-description">
        No insurance? Our rates are straightforward
      </p>

      <button
        class="pricing-button"
        @click="scrollToBooking"
      >
        BOOK NOW →
      </button>
    </div>
  </section>
</template>

<style scoped lang="scss">
$bc-label: #ffffff;
$bc-heading: #ffffff;
$bc-text: rgba(255, 255, 255, 0.9);
$bc-button: #38dcc5;
$bc-button-text: #0d1f35;

.pricing-cta {
  width: 100%;
  min-height: 380px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 4rem 2rem;

  border-radius: 5px;
  overflow: hidden;
  position: relative;

  background: linear-gradient(
    135deg,
    #0d1f35f2 0%,
    #0b8b8be5 60%,
    #2e6b3ecc 100%
  );

  &::before {
    content: '';
    position: absolute;

    width: 500px;
    height: 500px;

    left: 50%;
    top: 50%;

    transform: translate(-50%, -50%);

    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.16) 0%,
      rgba(255, 255, 255, 0.08) 20%,
      rgba(255, 255, 255, 0.03) 40%,
      transparent 70%
    );

    pointer-events: none;
  }

  @media screen and (max-width: 768px) {
    min-height: 320px;
    padding: 3rem 1.5rem;
  }
}

.pricing-content {
  width: 100%;
  max-width: 900px;

  position: relative;
  z-index: 2;

  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: center;
}

.pricing-label {
  font-family: 'DM Sans', sans-serif;
  font-size: 1rem;
  font-weight: 700;

  color: $bc-label;

  text-transform: uppercase;
  letter-spacing: 0.18em;

  margin-bottom: 1rem;

  @media screen and (max-width: 768px) {
    font-size: 0.9rem;
  }
}

.pricing-title {
  font-family: 'Encode Sans Expanded', sans-serif;
  font-size: 4rem;
  font-weight: 800;

  color: $bc-heading;

  line-height: 1.05;
  letter-spacing: -0.03em;

  margin: 0 0 1rem;

  @media screen and (max-width: 992px) {
    font-size: 3rem;
  }

  @media screen and (max-width: 600px) {
    font-size: 2rem;
  }
}

.pricing-description {
  font-family: 'DM Sans', sans-serif;
  font-size: 1.25rem;
  font-weight: 400;

  color: $bc-text;

  margin: 0 0 2rem;

  @media screen and (max-width: 600px) {
    font-size: 1rem;
  }
}

.pricing-button {
  width: 100%;
  max-width: 540px;
  height: 48px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: $bc-button;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  text-decoration: none;

  font-family: 'DM Sans', sans-serif;
  font-size: 2rem;
  font-weight: 700;

  color: $bc-button-text;

  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.05);
  }

  @media screen and (max-width: 600px) {
    max-width: 100%;
  }
}
</style>