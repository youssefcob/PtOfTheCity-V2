<script setup lang="ts">
import EditableText from '~/components/Admin/EditableText.vue';
import { vReveal } from '~/composables/useScrollReveal';

// `tall` alternates the card heights (32rem / 28rem) as in the Figma's masonry row.
const steps = [
  { id: 'fast_response', title: 'Fast Response', body: 'Our intake specialists monitor inquiries live, ensuring you hear back within 2 hours.', tall: true },
  { id: 'friendly_staff', title: 'Friendly Staff', body: "No automated phone trees. You'll talk to real New Yorkers who care about your care.", tall: false },
  { id: 'insurance_help', title: 'Insurance Help', body: 'We verify your coverage immediately so there are no surprises at checkout.', tall: true, dark: true },
  { id: 'flexible_times', title: 'Flexible Times', body: 'Same-day and next-day appointments available at most locations.', tall: false },
  { id: 'personalized_support', title: 'Personalized Support', body: 'From referral to discharge, your coordinator manages every step.', tall: true },
];

const ck = (s: string) => `contact.expect.${s}`;
</script>

<template>
  <section class="expect">
    <div class="header">
      <div class="header-main">
        <EditableText v-reveal="'drop'" tag="p" class="eyebrow" :content-key="ck('eyebrow')" default="Service Protocol" />
        <EditableText v-reveal="'rise'" tag="h2" class="heading" :content-key="ck('heading')"
          default="What to expect when you reach out" />
      </div>
      <EditableText v-reveal="'rise'" tag="p" class="intro" :content-key="ck('intro')"
        default="We've optimized our intake process to be as painless as the physical therapy is productive." />
    </div>

    <div class="cards">
      <div v-for="(step, i) in steps" :key="step.id" v-reveal="'slide-in'" class="card"
        :class="{ 'card--tall': step.tall, 'card--dark': step.dark }">
        <p class="number">{{ String(i + 1).padStart(2, '0') }}</p>
        <div class="card-copy">
          <EditableText tag="p" class="card-title" :content-key="ck(`${step.id}.title`)" :default="step.title" />
          <EditableText tag="p" class="card-body" :content-key="ck(`${step.id}.body`)" :default="step.body" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.expect {
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  @include pagePadding();
  padding-top: 12rem;
  padding-bottom: 12rem;
  background-color: #ffffff;

  // mobile Figma: sits on the cream page, no white band
  @media screen and (max-width: 900px) {
    gap: 2.4rem;
    padding-top: 4.8rem;
    padding-bottom: 4.8rem;
    background-color: transparent;
  }
}

.header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 3.2rem;

  @media screen and (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
  }
}

.header-main {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  max-width: 62.4rem;

  @media screen and (max-width: 900px) {
    gap: 0.8rem;
  }
}

.eyebrow {
  @include type-large;
  text-transform: uppercase;
  color: $primary-700;

  @media screen and (max-width: 900px) {
    font-weight: 600;
    font-size: 16px;
    line-height: normal;
    letter-spacing: 1px;
    opacity: 0.6;
  }
}

.heading {
  @include type-h2;
  text-transform: uppercase;
  color: $primary-600;

  @media screen and (max-width: 900px) {
    font-weight: 700;
    font-size: 32px;
    line-height: 38px;
    letter-spacing: -0.32px;
  }
}

.intro {
  max-width: 40.5rem;
  @include type-body;
  color: $primary-700;

  @media screen and (max-width: 900px) {
    max-width: none;
    font-size: 16px;
    line-height: 26px;
  }
}

.cards {
  display: flex;
  align-items: flex-start;
  gap: 3.2rem;

  @media screen and (max-width: 1100px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2.4rem;
  }

  @media screen and (max-width: 900px) {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 2rem;
  }
}

.card {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  flex: 1 1 0;
  min-width: 0;
  height: 28rem;
  padding: 3.2rem;
  border: 1px solid $primary-base;
  background-color: #ffffff;
  color: $primary-700;

  @media screen and (max-width: 1100px) {
    height: auto !important;
  }

  // mobile: white cards with a 4px teal bar on the left (all five, including 03)
  @media screen and (max-width: 900px) {
    flex: none;
    gap: 0.8rem;
    padding: 1.6rem 1.6rem 1.6rem 2rem;
    border: 0;
    border-left: 4px solid $primary-300;
    border-radius: 0 0.8rem 0.8rem 0;
    background-color: #ffffff !important;
    color: $primary-700 !important;

    .card-body {
      opacity: 1 !important;
    }
  }
}

// the dark card's border-color would otherwise recolor its mobile teal bar
.card.card--dark {
  @media screen and (max-width: 900px) {
    border-left-color: $primary-300;
  }
}

.card--tall {
  height: 32rem;
}

.card--dark {
  border-color: $primary-700;
  background-color: $primary-700;
  color: #ffffff;

  .card-body {
    opacity: 0.8;
  }
}

.number {
  @include type-h1;
  text-transform: uppercase;
  color: $primary-600;
  opacity: 0.4;

  .card--dark & {
    color: #ffffff;
  }

  @media screen and (max-width: 900px) {
    font-size: 24px;
    line-height: normal;
    letter-spacing: 0;

    .card--dark & {
      color: $primary-600;
    }
  }
}

.card-copy {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.card-title {
  @media screen and (max-width: 900px) {
    line-height: normal !important;
    letter-spacing: 0 !important;
  }
}

.card-title {
  @include type-button;
  color: inherit;
}

.card-body {
  @include type-caption;
  color: inherit;

  @media screen and (max-width: 900px) {
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0;
  }
}
</style>
