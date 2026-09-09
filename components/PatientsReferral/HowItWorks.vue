<script setup lang="ts">
import EditableText from '~/components/Admin/EditableText.vue';

const steps = [
  { key: 'submit', title: 'Submit Your Request', default: 'Tell us about your injury, symptoms, and insurance information.' },
  { key: 'contact_provider', title: 'We Contact Your Provider', default: "If needed, we'll work with your physician's office to obtain the required referral." },
  { key: 'verification', title: 'Insurance Verification', default: "We'll verify your benefits and confirm your coverage before your appointment." },
  { key: 'schedule', title: 'Schedule Your Visit', default: "Once everything is ready, we'll help you book your evaluation at the location most convenient for you." },
];
</script>

<template>
  <div class="how-it-works">
    <div class="intro">
      <div class="intro-header">
        <EditableText tag="span" class="eyebrow" content-key="patients-referral.how_it_works.eyebrow"
          default="How It Works" />
        <EditableText tag="h2" class="title" content-key="patients-referral.how_it_works.title"
          default="A Simple Path to Care." />
      </div>
      <EditableText tag="p" class="description" content-key="patients-referral.how_it_works.description"
        default="If your insurance requires a referral, we'll help make the process as easy as possible—from contacting your physician to scheduling your first appointment." />

      <div class="requirements">
        <EditableText tag="p" class="requirements-title" content-key="patients-referral.how_it_works.requirements_title"
          default="Referral Requirements Depend on Your Insurance." />
        <EditableText tag="p" class="requirements-description"
          content-key="patients-referral.how_it_works.requirements_description"
          default="Not every insurance plan requires a referral for physical therapy. Our team will review your plan and let you know exactly what's needed before your first visit." />
      </div>
    </div>

    <div class="steps">
      <div class="step" v-for="(step, index) in steps" :key="step.key">
        <EditableText tag="p" class="step-number" :content-key="`patients-referral.how_it_works.${step.key}_number`"
          :default="String(index + 1).padStart(2, '0')" />
        <EditableText tag="p" class="step-title" :content-key="`patients-referral.how_it_works.${step.key}_title`"
          :default="step.title" />
        <EditableText tag="p" class="step-description"
          :content-key="`patients-referral.how_it_works.${step.key}_description`" :default="step.default" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.how-it-works {
  @include pagePadding();
  padding-top: 4rem;
  padding-bottom: 4rem;
  display: flex;
  gap: 2.5rem;
  background-color: $white;

  @media screen and (max-width: 1100px) {
    flex-direction: column;
  }
}

.intro {
  width: 65%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border-left: 1px solid $primary-base;
  padding: 1rem 1.5rem;

  @media screen and (max-width: 1100px) {
    width: 100%;
  }
}

.intro-header {
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
}

.description {
  @include type-body;
  color: $primary-700;
  margin: 0;
}

.requirements {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .requirements-title {
    @include type-large;
    color: $primary-600;
    text-transform: uppercase;
    margin: 0;
  }

  .requirements-description {
    @include type-body;
    color: $primary-700;
    margin: 0;
  }
}

.steps {
  width: 35%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media screen and (max-width: 1100px) {
    width: 100%;
  }

  @media screen and (max-width: 700px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .step {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border-left: 1px solid $primary-base;
    padding: 1rem 1.5rem;

    .step-number {
      @include type-body;
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
