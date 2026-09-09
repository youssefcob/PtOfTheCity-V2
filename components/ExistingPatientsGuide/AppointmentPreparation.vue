<script setup lang="ts">
import EditableText from '~/components/Admin/EditableText.vue';
import EditableImage from '~/components/Admin/EditableImage.vue';

const img = (width: number) => useImg('careers', width);
</script>

<template>
  <div class="preparation">
    <div class="row-top">
      <div class="checklist">
        <div class="item">
          <EditableText tag="p" class="item-number" content-key="existing-patients-guide.prep.arrive_early_number"
            default="01" />
          <EditableText tag="p" class="item-title" content-key="existing-patients-guide.prep.arrive_early_title"
            default="Arrive Early" />
          <EditableText tag="p" class="item-description"
            content-key="existing-patients-guide.prep.arrive_early_description"
            default="Please arrive 10–15 minutes before your scheduled appointment if you have any paperwork or insurance updates." />
        </div>
        <div class="item">
          <EditableText tag="p" class="item-number" content-key="existing-patients-guide.prep.comfortable_number"
            default="02" />
          <EditableText tag="p" class="item-title" content-key="existing-patients-guide.prep.comfortable_title"
            default="Wear Comfortable Clothing" />
          <EditableText tag="p" class="item-description"
            content-key="existing-patients-guide.prep.comfortable_description"
            default="Choose clothing that allows easy movement and access to the area being treated." />
        </div>
        <div class="item">
          <EditableText tag="p" class="item-number" content-key="existing-patients-guide.prep.updates_number"
            default="03" />
          <EditableText tag="p" class="item-title" content-key="existing-patients-guide.prep.updates_title"
            default="Bring Updates" />
          <EditableText tag="p" class="item-description" content-key="existing-patients-guide.prep.updates_description"
            default="Let your therapist know about any changes in your symptoms, medications, or recent medical visits." />
        </div>
      </div>

      <div class="intro-photo">
        <div class="intro">
          <EditableText tag="span" class="eyebrow" content-key="existing-patients-guide.prep.eyebrow"
            default="Before Your Visit" />
          <EditableText tag="h2" class="title" content-key="existing-patients-guide.prep.title"
            default="Appointment Preparation" />
          <EditableText tag="p" class="description" content-key="existing-patients-guide.prep.description"
            default="A few simple steps can help you get the most from every appointment." />
        </div>
        <div class="photo">
          <EditableImage content-key="existing-patients-guide.prep.image" :default-src="img(900)" loading="lazy"
            default-alt="A PT of the City physical therapist caring for a patient" />
        </div>
      </div>
    </div>

    <div class="row-bottom">
      <div class="item">
        <EditableText tag="p" class="item-number" content-key="existing-patients-guide.prep.hydrated_number"
          default="04" />
        <EditableText tag="p" class="item-title" content-key="existing-patients-guide.prep.hydrated_title"
          default="Stay Hydrated" />
        <EditableText tag="p" class="item-description" content-key="existing-patients-guide.prep.hydrated_description"
          default="Drink water before and after your session to support recovery and movement." />
      </div>
      <div class="item grow">
        <EditableText tag="p" class="item-number" content-key="existing-patients-guide.prep.exercises_number"
          default="05" />
        <EditableText tag="p" class="item-title" content-key="existing-patients-guide.prep.exercises_title"
          default="Complete Your Home Exercises" />
        <EditableText tag="p" class="item-description" content-key="existing-patients-guide.prep.exercises_description"
          default="Your progress between visits is just as important as the time you spend in the clinic." />
      </div>

      <div class="reschedule-card">
        <EditableText tag="h3" class="reschedule-title" content-key="existing-patients-guide.prep.reschedule_title"
          default="Need to Reschedule?" />
        <EditableText tag="p" class="reschedule-description"
          content-key="existing-patients-guide.prep.reschedule_description"
          default="Contact your clinic or call our team if you need to change your appointment." />
        <a href="tel:+17186480888" class="reschedule-link" aria-label="Call PT of the City to reschedule">
          <EditableText tag="span" content-key="existing-patients-guide.prep.reschedule_cta" default="Contact us" />
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.preparation {
  @include pagePadding();
  padding-top: 4rem;
  padding-bottom: 4rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: $white;
}

.row-top {
  display: flex;
  gap: 1.5rem;

  @media screen and (max-width: 1100px) {
    flex-direction: column;
  }
}

.checklist {
  width: 24rem;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media screen and (max-width: 1100px) {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
  }

  @media screen and (max-width: 700px) {
    flex-direction: column;
  }
}

.item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-left: 1px solid $primary-base;
  padding: 1rem 1.5rem;

  @media screen and (max-width: 1100px) {
    flex: 1;
    min-width: 15rem;
  }

  .item-number {
    @include type-large;
    color: $primary-700;
    margin: 0;
  }

  .item-title {
    @include type-large;
    color: $primary-600;
    font-weight: 700;
    text-transform: uppercase;
    margin: 0;
  }

  .item-description {
    @include type-body;
    color: $primary-700;
    margin: 0;
  }
}

.intro-photo {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border-left: 1px solid $primary-base;
  padding: 1rem 1.5rem;

  .intro {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .eyebrow {
      @include type-overline;
      color: $primary-700;
    }

    .title {
      @include type-h2;
      color: $primary-600;
      margin: 0;
    }

    .description {
      @include type-body;
      color: $primary-700;
      margin: 0;
    }
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
}

.row-bottom {
  display: flex;
  gap: 2rem;
  align-items: stretch;

  @media screen and (max-width: 1100px) {
    flex-direction: column;
  }

  .item {
    width: 20rem;
    flex-shrink: 0;
    justify-content: center;

    @media screen and (max-width: 1100px) {
      width: 100%;
    }

    &.grow {
      flex: 1;
      width: auto;
    }
  }
}

.reschedule-card {
  width: 22rem;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem 2rem;
  border-radius: 0.75rem;
  background-color: $primary-600;

  @media screen and (max-width: 1100px) {
    width: 100%;
  }

  .reschedule-title {
    @include type-h3;
    color: $white;
    text-transform: uppercase;
    overflow-wrap: break-word;
    margin: 0;
  }

  .reschedule-description {
    @include type-body;
    color: $white;
    margin: 0;
  }

  .reschedule-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    width: fit-content;
    color: $white;
    @include type-button;

    &:hover {
      color: $primary-base;
      text-decoration: underline;
    }
  }
}
</style>
