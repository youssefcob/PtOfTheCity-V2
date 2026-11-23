<script setup lang="ts">
const HERO_IMAGE =
  'https://res.cloudinary.com/dzilc11zf/image/upload/v1790170990/a4a4f48dbb442ca6e2636a81491b8caeb3cbfbb1_cy5c0o.webp';
const CRUNCH_LOGO = 'https://res.cloudinary.com/dzilc11zf/image/upload/v1790170987/crunch-logo_fnoeuj.webp';

const heroSrcset = [640, 1024].map((width) => `${useImg(HERO_IMAGE, width)} ${width}w`).join(', ');
</script>

<template>
  <section class="hero">
    <p class="hero__strip">Crunch Inwood Exclusive</p>

    <div class="hero__media">
      <img
        :src="useImg(HERO_IMAGE, 1024)"
        :srcset="heroSrcset"
        sizes="(max-width: 800px) 100vw, 50vw"
        alt="A PT of the City physical therapist coaching a patient through a step-up exercise"
        width="1024"
        height="1024"
        fetchpriority="high"
        class="hero__image"
      />
    </div>

    <div class="hero__content">
      <div class="hero__logos">
        <NuxtImg
          src="/images/ptLogo.png"
          alt="PT of the City Physical Therapy"
          width="172"
          height="73"
          densities="x1 x2"
          format="webp"
          class="hero__logo hero__logo--ptc"
        />
        <span class="hero__times" aria-hidden="true">&times;</span>
        <img
          :src="useImg(CRUNCH_LOGO, 260)"
          alt="Crunch Fitness"
          width="130"
          height="83"
          class="hero__logo hero__logo--crunch"
        />
      </div>

      <p class="hero__badge">Crunch Inwood Exclusive</p>

      <h1 class="hero__title">Train harder.<br />Recover smarter.</h1>

      <p class="hero__text">
        Don't let aches or injuries slow your gains. Unlock your Complimentary PT Assessment with NYC’s premier
        physical therapy network.
      </p>

      <CrunchButton href="#claim" class="hero__cta">
        Claim my perk now
        <template #icon>
          <CrunchIcon name="arrow-down" :size="16" />
        </template>
      </CrunchButton>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 720px;
  padding: 64px var(--crunch-gutter);
  background: #fff;

  @media screen and (max-width: 800px) {
    display: block;
    min-height: 0;
    padding: 0;
  }
}

// On mobile the "exclusive" pill becomes a full-width strip above the photo.
.hero__strip {
  display: none;

  @media screen and (max-width: 800px) {
    display: block;
    padding: 7px var(--crunch-gutter) 8px;
    background: $crunch-peach;
    font-size: 16px;
    font-weight: 700;
    line-height: 21px;
    text-align: center;
    text-transform: uppercase;
  }
}

.hero__media {
  position: absolute;
  inset: 0 0 0 auto;
  width: 46%;

  // Fades the photo's left edge into the white copy column.
  &::after {
    content: '';
    position: absolute;
    inset: 0 auto 0 0;
    width: 150px;
    background: linear-gradient(90deg, #fff, rgba(255, 255, 255, 0));
  }

  @media screen and (max-width: 800px) {
    position: static;
    width: 100%;
    aspect-ratio: 390 / 310;
    max-height: 420px;

    &::after {
      display: none;
    }
  }
}

.hero__image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__content {
  position: relative;
  width: 100%;
  // Keeps the copy clear of the photo, which covers the right 46%.
  max-width: min(600px, 46vw);

  @media screen and (max-width: 800px) {
    max-width: none;
    padding: 32px var(--crunch-gutter) 48px;
  }
}

.hero__logos {
  display: flex;
  align-items: center;
  gap: 24px;
}

.hero__logo {
  display: block;
  height: auto;

  &--ptc {
    width: 172px;
  }

  &--crunch {
    width: 130px;
  }
}

.hero__times {
  font-size: 22px;
  font-weight: 700;
  line-height: 1;

  @media screen and (max-width: 800px) {
    display: none;
  }
}

.hero__badge {
  width: fit-content;
  margin-top: 26px;
  padding: 8px 16px;
  border-radius: 999px;
  background: $crunch-peach;
  font-size: 16px;
  font-weight: 700;
  line-height: 21px;
  text-transform: uppercase;

  @media screen and (max-width: 800px) {
    display: none;
  }
}

.hero__title {
  margin-top: 24px;
  font-family: $crunch-font-heading;
  font-size: clamp(48px, 5.28vw, 76px);
  font-weight: 700;
  line-height: 0.9;
  text-transform: uppercase;

  @media screen and (max-width: 800px) {
    margin-top: 20px;
    font-size: 44px;
  }
}

.hero__text {
  max-width: 590px;
  margin-top: 24px;
  color: $crunch-muted;
  font-size: 22px;
  line-height: 32px;

  @media screen and (max-width: 800px) {
    margin-top: 20px;
    font-size: 16px;
    line-height: 24px;
  }
}

.hero__cta {
  min-width: 380px;
  margin-top: 24px;

  @media screen and (max-width: 800px) {
    min-width: 0;
    margin-top: 20px;
  }
}
</style>
