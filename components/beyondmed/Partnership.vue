<template>
  <section class="partnership">
    <div class="partnership__image-col">
      <div class="img-bg" />
      <img
        src="https://res.cloudinary.com/dzilc11zf/image/upload/f_auto,q_auto/v1778151497/Rectangle_10_ucfra9.webp"
        alt="Beyond Med members"
        class="img-photo"
      />
    </div>

    <div class="partnership__content">
      <p class="bm-eyebrow">A Trusted Partnership Designed for Your Care</p>

      <h2 class="bm-heading">
        You're in the right place—<br />this offer is made exclusively for you.
      </h2>

      <p class="bm-sub">
        As a Beyond Med member, you now have seamless access to premier physical therapy services
        at PT of The City. We've partnered to bridge the gap between wellness and affordability,
        ensuring you get the hands-on, expert care you deserve without the financial stress.
      </p>
      <p class="bm-sub">
        Whether you are recovering from an injury, managing chronic pain, or looking to improve
        your mobility, our certified therapists are ready to welcome you at any of our neighborhood clinics.
      </p>

      <div class="partnership__features">
        <div class="feature">
          <span class="feature__title">Exclusive Member Pricing</span>
          <span class="feature__desc">Instant savings applied automatically when you book through this page.</span>
        </div>
        <div class="feature">
          <span class="feature__title">Personalized Care Plans</span>
          <span class="feature__desc">One-on-one sessions tailored entirely to your body's needs and recovery goals.</span>
        </div>
        <div class="feature">
          <span class="feature__title">Frictionless Booking</span>
          <span class="feature__desc">No complicated referral loops—just pick your nearest location, claim your offer, and schedule your visit.</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.partnership {
  display: flex;
  align-items: center;
  gap: 6rem;
    padding: 7rem 10rem;

  background: #fff;
  font-family: $montserrat;

  @media (max-width: 1000px) {
    flex-direction: column;
    padding: 4rem 2rem;
    gap: 3rem;
  }
}

/* ── Image column ── */
.partnership__image-col {
  position: relative;
  flex-shrink: 0;
  width: 480px;
  height: 500px;

  @media (max-width: 1000px) {
    width: 100%;
    height: 420px;
  }
}

.img-bg {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 82%;
  height: 88%;
  background: #91dbc3;
  border-radius: 1rem;
  opacity: 0.55;
}

.img-photo {
  position: absolute;
  top: 0;
  right: 0;
  width: 86%;
  height: 92%;
  object-fit: cover;
  border-radius: 1rem;
  box-shadow: -47px 40px 40px rgba(0, 0, 0, 0.2);
}

/* ── Content column ── */
.partnership__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}


/* ── Features ── */
.partnership__features {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  margin-top: 0.5rem;

  @media (max-width: 1000px) {
    flex-direction: column;
    gap: 1.5rem;
  }
}

.feature {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
}

.feature__title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a2b2b;

  @media (max-width: 1000px) {
    font-size: 1.5rem;
  }
}

.feature__desc {
  font-size: 1.1rem;
  color: #6b7a7a;
  line-height: 1.6;

  @media (max-width: 1000px) {
    font-size: 1.35rem;
  }
}

/* ── Stats ── */
.partnership__stats {
  display: flex;
  gap: 3rem;
  margin-top: 1rem;

  @media (max-width: 500px) {
    gap: 2rem;
  }
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  justify-content: flex-end;

}

.stat__value {
  font-family: $helvetica;
  font-size: 4rem;
  font-weight: 400;
  color: #1a2b2b;
  line-height: 1;
  text-align: center;
  @media (max-width: 500px) {
    font-size: 2.8rem;
  }
}

.stat__star {
  font-size: 2.4rem;
  color: #1a2b2b;
}

.stat__label {
  font-size: 1.15rem;
  color: #7a8c8c;
  text-align: center;
}
</style>
