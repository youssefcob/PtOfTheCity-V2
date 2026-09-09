<script setup lang="ts">
import EditableText from '~/components/Admin/EditableText.vue';

const steps = [
  { key: 'submit', number: '01', title: 'Submit', default: "Complete our secure referral form with your patient's information." },
  { key: 'review', number: '02', title: 'Review', default: 'Our care team verifies insurance, reviews clinical details, and contacts your patient.' },
  { key: 'evaluate', number: '03', title: 'Evaluate', default: 'The patient receives a comprehensive evaluation and begins a personalized treatment plan.' },
  { key: 'stay_informed', number: '04', title: 'Stay Informed', default: 'Receive timely progress updates, treatment notes, and discharge summaries when appropriate.' },
];
</script>

<template>
  <div class="how-it-works">
    <div class="intro">
      <EditableText tag="span" class="eyebrow" content-key="physicians-referral.how_it_works.eyebrow"
        default="How It Works" />
      <EditableText tag="p" class="title" content-key="physicians-referral.how_it_works.title"
        default="A simple process for better care" />
    </div>

    <div class="steps">
      <div class="step" v-for="step in steps" :key="step.key">
        <EditableText tag="p" class="step-number" :content-key="`physicians-referral.how_it_works.${step.key}_number`"
          :default="step.number" />
        <EditableText tag="p" class="step-title" :content-key="`physicians-referral.how_it_works.${step.key}_title`"
          :default="step.title" />
        <EditableText tag="p" class="step-description"
          :content-key="`physicians-referral.how_it_works.${step.key}_description`" :default="step.default" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.how-it-works {
  @include pagePadding();
  padding-top: 3.75rem;
  padding-bottom: 3.75rem;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 2rem;
  background-color: $primary-600;

  @media screen and (max-width: 1100px) {
    flex-direction: column;
  }
}

.intro {
  width: 22rem;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media screen and (max-width: 1100px) {
    width: 100%;
  }

  .eyebrow {
    @include type-overline;
    color: $primary-base;
  }

  .title {
    @include type-h3;
    color: $white;
    margin: 0;
  }
}

.steps {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.5rem;

  @media screen and (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media screen and (max-width: 500px) {
    grid-template-columns: 1fr;
  }

  .step {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-left: 1rem;
    border-left: 1px solid $primary-base;

    .step-number {
      @include type-large;
      color: $primary-base;
      text-transform: uppercase;
      margin: 0;
    }

    .step-title {
      @include type-large;
      color: $white;
      font-weight: 700;
      text-transform: uppercase;
      margin: 0;
    }

    .step-description {
      @include type-body;
      color: $white;
      margin: 0;
    }
  }
}
</style>
