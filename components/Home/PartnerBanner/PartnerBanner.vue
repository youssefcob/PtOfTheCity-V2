<script setup lang="ts">
import EditableText from '~/components/Admin/EditableText.vue';
import EditableImage from '~/components/Admin/EditableImage.vue';
</script>

<template>
  <section class="partner-banner">
    <img
      class="texture"
      src="https://res.cloudinary.com/dzilc11zf/image/upload/v1787339591/fluid-flowing_khsmhq.webp"
      alt=""
      aria-hidden="true"
    />
    <div class="scrim" aria-hidden="true"></div>
    <EditableImage
      class="logo"
      content-key="home.partner_banner.logo"
      default-src="/images/home/mount-sinai-mark.webp"
      default-alt="Mount Sinai"
      default-object-fit="contain"
      :width="240"
      :height="253"
    />
    <div class="copy">
      <EditableText tag="h2" class="heading" content-key="home.partner_banner.heading"
        default="Trusted Rehabilitation Provider Network" />
      <EditableText tag="p" class="body" content-key="home.partner_banner.body"
        default="PT of the City is proud to be affiliated with Mount Sinai Health System, connecting our patients to a trusted network of physicians, specialists, and healthcare resources throughout New York City." />
    </div>
  </section>
</template>

<style scoped lang="scss">
.partner-banner {
  position: relative;
  display: flex;
  align-items: center;
  gap: 4rem;
  width: 100%;
  padding: 3.75rem 9.6rem 10rem 9.6rem;
  background-color: $primary-600;
  overflow: hidden;

  @media screen and (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
    padding: 3rem 2rem;
  }
}

.texture {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: .2;
  pointer-events: none;

}

.scrim {
  position: absolute;
  inset: 0;
  background-color: $primary-600;
  opacity: 0.55;
  pointer-events: none;
}

.logo {
  position: relative;
  flex-shrink: 0;
  height: 8rem;
  width: auto;

  :deep(img) {
    height: 100%;
    width: auto;
  }

  @media screen and (max-width: 900px) {
    height: 6rem;
  }
}

.copy {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.heading {
  @include type-h3;
  text-transform: uppercase;
  color: #ffffff;
}

.body {
  @include type-body;
  max-width: 38rem;
  color: #ffffff;
}
</style>
