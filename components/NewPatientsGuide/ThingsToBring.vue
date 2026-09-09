<script setup lang="ts">
import EditableText from '~/components/Admin/EditableText.vue';
import EditableImage from '~/components/Admin/EditableImage.vue';

const items = [
  { key: 'photo_id', title: 'Photo ID', default: 'A valid government-issued photo ID.' },
  { key: 'insurance_card', title: 'Insurance Card', default: 'Your current medical insurance card.' },
  { key: 'physician_referral', title: 'Physician Referral', default: 'If required by your insurance plan.' },
  { key: 'comfortable_clothing', title: 'Comfortable Clothing', default: 'Wear clothing that allows you to move comfortably during your evaluation.' },
  { key: 'medication_list', title: 'Medication List', default: 'A list of your current medications and any relevant medical history.' },
];

const img = (width: number) => useImg('careers', width);
</script>

<template>
  <div class="things-to-bring">
    <div class="checklist">
      <div class="item" v-for="(item, index) in items" :key="item.key">
        <EditableText tag="p" class="item-number" :content-key="`new-patients-guide.bring.${item.key}_number`"
          :default="String(index + 1).padStart(2, '0')" />
        <EditableText tag="p" class="item-title" :content-key="`new-patients-guide.bring.${item.key}_title`"
          :default="item.title" />
        <EditableText tag="p" class="item-description" :content-key="`new-patients-guide.bring.${item.key}_description`"
          :default="item.default" />
      </div>
    </div>

    <div class="intro-photo">
      <div class="intro">
        <EditableText tag="span" class="eyebrow" content-key="new-patients-guide.bring.eyebrow" default="Be Prepared" />
        <EditableText tag="h2" class="title" content-key="new-patients-guide.bring.title"
          default="A Few Things to Bring." />
        <EditableText tag="p" class="description" content-key="new-patients-guide.bring.description"
          default="Having these items ready will help us make your first visit as smooth and efficient as possible." />
      </div>
      <div class="photo">
        <EditableImage content-key="new-patients-guide.bring.image" :default-src="img(900)" loading="lazy"
          default-alt="A PT of the City physical therapist caring for a patient" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.things-to-bring {
  @include pagePadding();
  padding-top: 4rem;
  padding-bottom: 4rem;
  display: flex;
  gap: 1.5rem;
  background-color: $white;

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
</style>
