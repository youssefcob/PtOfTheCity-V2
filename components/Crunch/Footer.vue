<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
  <footer class="crunch-footer">
    <div class="crunch-footer__top">
      <NuxtImg
        src="/images/ptLogo.png"
        alt="PT of the City Physical Therapy"
        width="227"
        height="96"
        densities="x1 x2"
        format="webp"
        loading="lazy"
        class="crunch-footer__logo"
      />
      <p class="crunch-footer__tagline">Move better. Stay strong.</p>
    </div>

    <h2 class="crunch-footer__heading">Terms &amp; Conditions</h2>
    <p class="crunch-footer__terms">
      Exclusive offer valid only for active members of Crunch Fitness Inwood. Must provide a valid Crunch Membership ID
      upon registration. The complimentary physical therapy assessment is a one-time offer per member, holds no cash
      value, and cannot be combined with other promotions. Spots are limited and subject to clinic availability. By
      submitting this form, you consent to be contacted by PT of The City via email or phone regarding your assessment
      and future treatments. Your membership status will be verified prior to your appointment.
    </p>

    <p class="crunch-footer__copyright">Copyright {{ year }} PT of The City. All Rights Reserved.</p>
  </footer>
</template>

<style scoped lang="scss">
.crunch-footer {
  padding: 76px var(--crunch-gutter) 62px;
  background: $crunch-ink;
  color: #fff;

  @media screen and (max-width: 800px) {
    padding-top: 56px;
    padding-bottom: 48px;
  }
}

.crunch-footer__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding-bottom: 52px;
  border-bottom: 1px solid #383838;

  @media screen and (max-width: 800px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 40px;
    padding-bottom: 32px;
  }
}

.crunch-footer__logo {
  display: block;
  width: 227px;
  height: auto;

  @media screen and (max-width: 800px) {
    width: 164px;
  }
}

.crunch-footer__tagline {
  color: $crunch-teal;
  font-family: $crunch-font-heading;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.2;
  text-transform: uppercase;

  @media screen and (max-width: 800px) {
    font-size: 22px;
  }
}

.crunch-footer__heading {
  margin-top: 24px;
  font-size: 16px;
  font-weight: 700;
}

.crunch-footer__terms {
  margin-top: 10px;
  line-height: 26px;
}

.crunch-footer__copyright {
  margin-top: 36px;
  color: #8E8A85;

  @media screen and (max-width: 800px) {
    line-height: 20px;
  }
}
</style>
