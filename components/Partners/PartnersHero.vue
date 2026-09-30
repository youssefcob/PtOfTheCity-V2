<script setup lang="ts">
import EditableText from '~/components/Admin/EditableText.vue';
import EditableImage from '~/components/Admin/EditableImage.vue';

const ck = (s: string) => `partnerships.hero.${s}`;
</script>

<template>
  <!-- desktop: copy beside a photo -->
  <section class="hero hero--desktop">
    <div class="copy">
      <EditableText tag="p" class="eyebrow" :content-key="ck('eyebrow')" default="Our Partnerships & Affiliations" />
      <EditableText tag="h1" class="title" :content-key="ck('title')" default="Our Partnerships & Affiliations" />
      <EditableText tag="p" class="description" :content-key="ck('description')"
        default="At PT of The City Physical Therapy, we believe that exceptional patient care extends beyond our clinic walls. We are proud to collaborate with leading hospitals, wellness facilities, and professional service organizations to provide a comprehensive, high-quality rehabilitation experience for our community." />
    </div>
    <div class="photo">
      <EditableImage :content-key="ck('image')" default-src="/images/partners/hero.webp" loading="eager"
        default-alt="PT of the City clinicians meeting with partner physicians" />
    </div>
  </section>

  <!-- mobile: a dark block with its own copy (the Figma's shader background is
       left out as everywhere on the site; its water color stands in) -->
  <section class="hero hero--mobile">
    <EditableText tag="p" class="m-eyebrow" :content-key="ck('mobile.eyebrow')" default="Partnerships" />
    <EditableText tag="h1" class="m-title" :content-key="ck('mobile.title')"
      default="Stronger Together. Better for Every Community." />
    <EditableText tag="p" class="m-description" :content-key="ck('mobile.description')"
      default="From hospitals and physicians to schools, employers, and community organizations, PT of the City partners with leaders across New York to expand access to exceptional physical therapy." />
    <NuxtLink to="/contact#message" class="m-link">
      <EditableText tag="span" :content-key="ck('mobile.link_label')" default="Request a Partnership" />
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <line x1="7" y1="17" x2="17" y2="7" />
        <polyline points="7 7 17 7 17 17" />
      </svg>
    </NuxtLink>
  </section>
</template>

<style scoped lang="scss">
$mobile: 900px;

.hero--desktop {
  display: flex;
  align-items: center;
  gap: 4.8rem;
  @include pagePadding();
  padding-top: 4rem;
  padding-bottom: 8rem;

  @media screen and (max-width: $mobile) {
    display: none;
  }
}

.copy {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  flex: 0 1 58.8rem;
  min-width: 0;
  text-transform: uppercase;
}

.eyebrow {
  @include type-overline;
  color: $primary-700;
}

.title {
  @include type-h2;
  color: $primary-600;
}

.description {
  @include type-large;
  color: $primary-700;
}

.photo {
  flex: 0 1 56.4rem;
  min-width: 0;
  height: 33.85rem;

  :deep(img) {
    display: block;
    object-fit: cover;
  }
}

.hero--mobile {
  display: none;

  @media screen and (max-width: $mobile) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
    padding: 4.8rem 1.6rem;
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), $primary-600;
    color: #ffffff;
  }

  :deep(span) {
    font: inherit;
    color: inherit;
  }
}

.m-eyebrow,
.m-description {
  font-family: $font-poppins;
  font-weight: 600;
  font-size: 16px;
  line-height: normal;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: inherit;
}

.m-title {
  font-family: $font-switzer;
  font-weight: 600;
  font-size: 36px;
  line-height: 44px;
  letter-spacing: -0.18px;
  text-transform: uppercase;
  color: inherit;
}

.m-link {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1.6rem 0.8rem 0;
  @include type-button;
  color: #ffffff;

  &:hover {
    color: $primary-base;
  }
}
</style>
