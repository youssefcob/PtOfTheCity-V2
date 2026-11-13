<script setup lang="ts">
import EditableText from '~/components/Admin/EditableText.vue';
import EditableImage from '~/components/Admin/EditableImage.vue';

const BG_IMAGE =
  'https://res.cloudinary.com/dzilc11zf/image/upload/v1788185531/ptofthecity/xfibmalheislxgoxrm6t.webp';
const LOGO =
  'https://res.cloudinary.com/dzilc11zf/image/upload/v1778861676/LogoPt_ildwod.webp';
const NETWORK_LOGO =
  'https://res.cloudinary.com/dzilc11zf/image/upload/v1788185698/ptofthecity/yy4mhrlq2q6w2attcehx.webp';
</script>

<template>
  <section class="free-offer-hero">
    <EditableImage
      class="bg"
      content-key="free_offer.hero.bg"
      :default-src="BG_IMAGE"
      default-alt="Physical therapist working with a patient"
      :width="1600"
      :height="800"
      loading="eager"
    />
    <div class="scrim" aria-hidden="true"></div>

    <div class="inner">
      <span class="logo-pill">
        <EditableImage
          class="logo"
          content-key="free_offer.hero.logo"
          :default-src="LOGO"
          default-alt="PT of the City Physical Therapy"
          default-object-fit="contain"
          :width="300"
          :height="56"
          loading="eager"
        />
      </span>

      <EditableImage
        class="network"
        content-key="free_offer.hero.network_logo"
        :default-src="NETWORK_LOGO"
        default-alt="Mount Sinai Trusted Rehabilitation Provider Network"
        default-object-fit="contain"
        :width="560"
        :height="200"
        loading="eager"
      />

      <h1 class="heading">
        <EditableText
          tag="span"
          class="line"
          content-key="free_offer.hero.heading_1"
          default="Hospital-grade physical therapy."
        />
        <EditableText
          tag="span"
          class="line"
          content-key="free_offer.hero.heading_2"
          default="Neighborhood convenience."
        />
      </h1>

      <EditableText
        tag="p"
        class="sub"
        content-key="free_offer.hero.subheading"
        default="Five of our locations—Sunset, Riverdale, Midtown, Greenpoint, and Cobble Hill—are official members of the Mount Sinai Trusted Rehabilitation Provider Network. Receive NYC's highest rehabilitation standards right in your community."
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.free-offer-hero {
  position: relative;
  isolation: isolate;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: clamp(52rem, 62vh, 68rem);
  padding: calc(#{$navbarHeight} + 4rem) 2.4rem 10rem;
  overflow: hidden;
  background-color: $primary-600;

  @media screen and (max-width: 720px) {
    min-height: clamp(56rem, 85vh, 76rem);
    padding: calc(#{$navbarHeight} + 3rem) 2rem 8rem;
  }
}

.bg {
  position: absolute;
  inset: 0;
  z-index: -2;

  :deep(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}

.scrim {
  position: absolute;
  inset: 0;
  z-index: -1;
  background-color: $primary-600;
  opacity: 0.75;
  pointer-events: none;
}

.inner {
  width: 100%;
  max-width: 96rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: $white;
}

.logo-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: $white;
  border-radius: 99.9rem;
  padding: 1.4rem 3.2rem;
  margin-bottom: 3.2rem;

  @media screen and (max-width: 720px) {
    padding: 1.2rem 2.6rem;
    margin-bottom: 2.4rem;
  }
}

.logo {
  height: 5.6rem;

  @media screen and (max-width: 720px) {
    height: 4rem;
  }

  :deep(img) {
    height: 100%;
    width: auto;
    display: block;
  }
}

.network {
  width: 56rem;
  max-width: 92%;
  margin-bottom: 2.8rem;

  @media screen and (max-width: 720px) {
    width: 32rem;
    margin-bottom: 2.4rem;
  }

  :deep(img) {
    width: 100%;
    height: auto;
    display: block;
  }
}

.heading {
  @include type-h1;
  display: flex;
  flex-direction: column;
  margin: 0 0 2.4rem;
  color: $white;

  .line {
    display: block;
    color: inherit;
  }

  @media screen and (max-width: 720px) {
    display: block;

    .line {
      display: inline;
    }
  }
}

.sub {
  @include type-body;
  max-width: 80rem;
  margin: 0;
  color: $white;
  opacity: 0.85;
}
</style>
