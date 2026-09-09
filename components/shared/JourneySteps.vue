<script setup lang="ts">
import EditableText from '~/components/Admin/EditableText.vue';

const props = defineProps<{
  pageKey: string;
}>();

const steps = [
  { key: 'schedule', title: 'Schedule Your Visit', default: "Call us or request an appointment online. We'll help you find the clinic and time that works best for you." },
  { key: 'verify_benefits', title: 'Verify Your Benefits', default: 'Our team reviews your insurance coverage and explains your benefits before your first visit.' },
  { key: 'meet_therapist', title: 'Meet Your Therapist', default: "During your evaluation, we'll learn about your goals, assess your condition, and create a treatment plan." },
  { key: 'start_recovery', title: 'Start Your Recovery', default: 'Begin treatment with personalized exercises, hands-on care, and ongoing support from your therapy team.' },
];
</script>

<template>
  <div class="journey-steps">
    <div class="intro">
      <EditableText tag="span" class="eyebrow" :content-key="`${pageKey}.journey.eyebrow`" default="Your Journey" />
      <EditableText tag="h3" class="title" :content-key="`${pageKey}.journey.title`"
        default="From Your First Call to Recovery." />
      <EditableText tag="p" class="description" :content-key="`${pageKey}.journey.description`"
        default="We've designed every step of the process to be simple, transparent, and focused on helping you move with confidence." />
    </div>

    <div class="steps">
      <div class="step" v-for="(step, index) in steps" :key="step.key">
        <EditableText tag="p" class="step-number" :content-key="`${pageKey}.journey.${step.key}_number`"
          :default="String(index + 1).padStart(2, '0')" />
        <EditableText tag="p" class="step-title" :content-key="`${pageKey}.journey.${step.key}_title`"
          :default="step.title" />
        <EditableText tag="p" class="step-description" :content-key="`${pageKey}.journey.${step.key}_description`"
          :default="step.default" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.journey-steps {
  @include pagePadding();
  padding-top: 3.75rem;
  padding-bottom: 3.75rem;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 2rem;
  background-color: $white;

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
    color: $primary-700;
  }

  .title {
    @include type-h3;
    color: $primary-600;
    text-transform: uppercase;
    margin: 0;
  }

  .description {
    @include type-body;
    color: $primary-700;
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
      color: $primary-700;
      text-transform: uppercase;
      margin: 0;
    }

    .step-title {
      @include type-large;
      color: $primary-600;
      font-weight: 700;
      text-transform: uppercase;
      margin: 0;
    }

    .step-description {
      @include type-body;
      color: $primary-700;
      margin: 0;
    }
  }
}
</style>
