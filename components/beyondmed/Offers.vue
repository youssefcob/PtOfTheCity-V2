<template>
  <section class="offers">
    <div class="offers__header">
      <p class="bm-eyebrow">Member Pricing</p>
      <h2 class="bm-heading">Choose the Right Package for You</h2>
      <p class="bm-sub">Exclusive rates for Beyond Med members. The more sessions you choose, the more you save.</p>
    </div>

    <div class="offers__grid">
      <!-- 5-Session -->
      <div class="offer-card">
        <p class="offer-card__label">5-Session package</p>
        <div class="offer-card__discount">
          <span class="discount-num">-20</span><span class="discount-unit">% off</span>
        </div>
        <p class="offer-card__desc">A flexible option to get started or maintain your progress at your own pace.</p>
        <ul class="offer-card__features">
          <li>5 full sessions with a certified provider</li>
          <li>Flexible scheduling — use within 6 months</li>
          <li>Applicable to all 5 specialties</li>
          <li>Member price locked at booking</li>
          <li>Free 15-min intake consultation</li>
        </ul>
        <button class="offer-card__btn offer-card__btn--outline" @click="navigateTo('/beyondmed/booking?package=5-Session+Package')">Quote 5-Session Offer</button>
      </div>

      <!-- 10-Session -->
      <div class="offer-card offer-card--featured">
        <div class="offer-card__badge">Best Value</div>
        <p class="offer-card__label">10-Session package</p>
        <div class="offer-card__discount">
          <span class="discount-num">-25</span><span class="discount-unit">% off</span>
        </div>
        <p class="offer-card__desc">Ideal for long-term results with greater savings and added priority benefits.</p>
        <ul class="offer-card__features">
          <li>10 full sessions with a certified provider</li>
          <li>Use within 12 months — no rush</li>
          <li>Mix &amp; match across any specialty</li>
          <li>Priority scheduling guaranteed</li>
          <li>Dedicated care coordinator</li>
          <li>Complimentary progress review</li>
        </ul>
        <button class="offer-card__btn offer-card__btn--filled" @click="navigateTo('/beyondmed/booking?package=10-Session+Package')">Quote 10-Session Offer</button>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.offers {
  background: #f0f2f2;
  padding: 7rem 10rem;
  font-family: $montserrat;

  @media (max-width: 1000px) {
    padding: 4rem 2rem;
  }
}

.offers__header {
  margin-bottom: 3.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}


/* ── Cards ── */
.offers__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
}

.offer-card {
  background: #fff;
  border-radius: 1.25rem;
  padding: 2.75rem 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);

  &--featured {
    background: linear-gradient(180deg, rgba(159, 225, 203, 0.3) 0%, #EDE3DD 100%);

  }
}

.offer-card__badge {
  position: absolute;
  top: -1.1rem;
  left: 50%;
  transform: translateX(-50%);
  background: $cta;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border-radius: 999px;
  padding: 0.4rem 1.4rem;
  white-space: nowrap;
}

.offer-card__label {
  font-size: 1.3rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #4a5a5a;
  margin: 0;
}

.offer-card__discount {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  line-height: 1;
}

.discount-num {
  font-family: $helvetica;
  font-size: 7rem;
  font-weight: 500;
  color: #1a2b2b;
}

.discount-unit {
  font-family: $helvetica;
  font-size: 3.3rem;
  font-weight: 300;
  color: #4a5a5a;
}

.offer-card__desc {
  font-size: 1.35rem;
  line-height: 1.6;
  color: #4a5a5a;
  margin: 0;
}

.offer-card__features {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  flex: 1;

  li {
    font-size: 1.3rem;
    color: #2a3a3a;
    padding-left: 1.75rem;
    position: relative;
    line-height: 1.4;
    margin: 0;
    font-weight: 400;

    &::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: black;
      font-weight: 700;
    }
  }
}

.offer-card__btn {
  width: 100%;
  padding: 1.1rem;
  border-radius: 0.75rem;
  font-size: 1.35rem;
  font-weight: 600;
  font-family: $montserrat;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid $cta;


  &--outline {
    background: transparent;
    color: black;

    &:hover {
      background: rgba($cta, 0.08);
    }
  }

  &--filled {
    background: $cta;
    color: #fff;

    &:hover {
      background: darken($cta, 8%);
    }
  }
}
</style>
