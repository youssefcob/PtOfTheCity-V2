<script setup lang="ts">
import EditableText from '~/components/Admin/EditableText.vue';
import EditableImage from '~/components/Admin/EditableImage.vue';

const img = (width: number) => useImg('careers', width);
</script>

<template>
  <div class="teasers">
    <div class="teaser">
      <EditableText tag="h3" class="title" content-key="new-patients-guide.teasers.coverage_title"
        default="Not sure about your coverage?" />
      <div class="photo">
        <EditableImage content-key="new-patients-guide.teasers.coverage_image" :default-src="img(700)" loading="lazy"
          default-alt="Insurance coverage" />
      </div>
      <EditableText tag="p" class="description" content-key="new-patients-guide.teasers.coverage_description"
        default="We've designed every step of the process to be simple, transparent, and focused on helping you move with confidence." />
      <NuxtLink to="/insurances#eligibility" class="teaser-link" aria-label="Check your insurance eligibility">
        <EditableText tag="span" content-key="new-patients-guide.teasers.coverage_cta" default="Check eligibility" />
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      </NuxtLink>
    </div>

    <div class="teaser">
      <EditableText tag="h3" class="title" content-key="new-patients-guide.teasers.referral_title"
        default="Do you need a referral?" />
      <div class="photo">
        <EditableImage content-key="new-patients-guide.teasers.referral_image" :default-src="img(700)" loading="lazy"
          default-alt="Patient referral" />
      </div>
      <EditableText tag="p" class="description" content-key="new-patients-guide.teasers.referral_description"
        default="We've designed every step of the process to be simple, transparent, and focused on helping you move with confidence." />
      <NuxtLink to="/patients-referral" class="teaser-link" aria-label="Request a patient referral">
        <EditableText tag="span" content-key="new-patients-guide.teasers.referral_cta" default="Request a Referral" />
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.teasers {
  @include pagePadding();
  padding-top: 3rem;
  padding-bottom: 3rem;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2.5rem;
  background-color: $white;

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.teaser {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .title {
    @include type-h3;
    color: $primary-600;
    text-transform: uppercase;
    margin: 0;
  }

  .photo {
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 0.75rem;
    overflow: hidden;

    :deep(.cms-editable-image),
    :deep(img) {
      width: 100%;
      height: 100%;
    }

    :deep(img) {
      object-fit: cover;
    }
  }

  .description {
    @include type-body;
    color: $primary-700;
    margin: 0;
  }

  .teaser-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    width: fit-content;
    color: $primary-700;
    @include type-button;

    &:hover {
      color: $primary-400;
      text-decoration: underline;
    }
  }
}
</style>
