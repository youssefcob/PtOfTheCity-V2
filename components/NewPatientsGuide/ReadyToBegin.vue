<script setup lang="ts">
import EditableText from '~/components/Admin/EditableText.vue';
import EditableImage from '~/components/Admin/EditableImage.vue';

const img = (width: number) => useImg('careers', width);
</script>

<template>
  <div class="ready-to-begin">
    <div class="photo">
      <EditableImage content-key="new-patients-guide.ready.image" :default-src="img(700)" loading="lazy"
        default-alt="A PT of the City physical therapist caring for a patient" />
    </div>
    <div class="content">
      <EditableText tag="h3" class="title" content-key="new-patients-guide.ready.title" default="Ready to Begin?" />
      <EditableText tag="p" class="description" content-key="new-patients-guide.ready.description"
        default="Your recovery starts with a single step. Schedule your first appointment today, and let's work together toward better movement, less pain, and a healthier tomorrow." />
      <NuxtLink to="/booking" class="cta-btn" aria-label="Schedule your first visit">
        <EditableText tag="span" content-key="new-patients-guide.ready.cta_label" default="Schedule Your First Visit" />
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ready-to-begin {
  @include pagePadding();
  padding-top: 3rem;
  padding-bottom: 4rem;
  display: flex;
  align-items: center;
  gap: 2.5rem;
  background-color: $white;

  @media screen and (max-width: 900px) {
    flex-direction: column;
    align-items: stretch;
  }
}

.photo {
  width: 40%;
  flex-shrink: 0;
  aspect-ratio: 4 / 3;
  border-radius: 0.75rem;
  overflow: hidden;

  @media screen and (max-width: 900px) {
    width: 100%;
  }

  :deep(.cms-editable-image),
  :deep(img) {
    width: 100%;
    height: 100%;
  }

  :deep(img) {
    object-fit: cover;
  }
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .title {
    @include type-h3;
    color: $primary-600;
    text-transform: uppercase;
    margin: 0;
  }

  .description {
    @include type-body;
    color: $primary-700;
    margin: -1.5rem 0 0;
  }

  .cta-btn {
    width: fit-content;
    padding: 1rem 2rem;
    border-radius: 0.75rem;
    background-color: $primary-400;
    color: $white;
    @include type-button;

    &:hover {
      background-color: darken(#15707c, 8%);
    }
  }
}
</style>
