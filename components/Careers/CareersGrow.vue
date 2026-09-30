<script setup lang="ts">
import EditableText from '~/components/Admin/EditableText.vue';
import { vReveal } from '~/composables/useScrollReveal';

// `bodyMobile` is set where the mobile Figma words a benefit differently.
const benefits = [
  { id: 'ceu_days', icon: 'calendar-check', mobileIcon: 'm-calendar-check', title: 'Paid CEU Days', body: 'Dedicated time off for your continuing education needs.' },
  { id: 'in_house', icon: 'presentation', mobileIcon: 'm-presentation', title: 'In-House Education', body: 'Regular clinical workshops led by senior specialists.' },
  { id: 'development', icon: 'award', mobileIcon: 'm-award', title: 'Professional Development', body: 'Support for specialty certifications.', bodyMobile: 'Support for specialty certifications and growth.' },
  { id: 'leadership', icon: 'flag-triangle-right', mobileIcon: 'm-flag', title: 'Leadership Pathways', body: 'Career tracks for admin leadership.', bodyMobile: 'Clear career tracks for clinical and administrative leadership.' },
];

const ck = (s: string) => `careers.grow.${s}`;
</script>

<template>
  <section class="careers-grow">
    <div class="header">
      <EditableText v-reveal="'drop'" tag="p" class="eyebrow desktop-only" :content-key="ck('eyebrow')"
        default="Mentorship & Professional Development" />
      <EditableText tag="p" class="eyebrow mobile-only" :content-key="ck('eyebrow_mobile')"
        default="Mentorship & Development" />
      <EditableText v-reveal="'rise'" tag="h2" class="heading" :content-key="ck('heading')"
        default="Grow With Confidence." />
    </div>

    <div class="grid">
      <div v-reveal="'slide-in'" class="block">
        <EditableText tag="h3" class="block-title" :content-key="ck('mentorship.title')" default="Mentorship Programs" />
        <EditableText tag="p" class="block-body" :content-key="ck('mentorship.body')"
          default="Work one-on-one with experienced clinicians who are invested in your professional development and long-term success." />
      </div>

      <div v-reveal="'slide-in'" class="block block--stat">
        <EditableText tag="p" class="stat-prefix" :content-key="ck('ceu.prefix')" default="Up to" />
        <EditableText tag="p" class="stat-value" :content-key="ck('ceu.value')" default="$1,500" />
        <EditableText tag="p" class="stat-label" :content-key="ck('ceu.label')" default="Annual CEU Reimbursement" />
        <EditableText tag="p" class="block-body stat-body" :content-key="ck('ceu.body')"
          default="Supporting your continued education and clinical excellence." />
      </div>

      <div v-reveal="'slide-in'" class="block">
        <EditableText tag="h3" class="block-title" :content-key="ck('education.title')" default="Continuing Education" />
        <EditableText tag="p" class="block-body desktop-only" :content-key="ck('education.body')"
          default="Access CEU reimbursement, in-house training, workshops, and educational opportunities that help you stay current with best practices." />
        <EditableText tag="p" class="block-body mobile-only" :content-key="ck('education.body_mobile')"
          default="Access CEU reimbursement, in-house training, workshops, and educational opportunities." />
      </div>

      <div class="benefits">
        <div v-for="benefit in benefits" :key="benefit.id" class="benefit">
          <div class="benefit-icon">
            <img class="desktop-only" :src="`/images/careers/${benefit.icon}.svg`" width="40" height="40" alt=""
              aria-hidden="true" />
            <img class="mobile-only" :src="`/images/careers/${benefit.mobileIcon}.svg`" width="24" height="24" alt=""
              aria-hidden="true" />
          </div>
          <div class="benefit-copy">
            <EditableText tag="p" class="benefit-title" :content-key="ck(`${benefit.id}.title`)" :default="benefit.title" />
            <EditableText tag="p" class="benefit-body" :class="{ 'desktop-only': benefit.bodyMobile }"
              :content-key="ck(`${benefit.id}.body`)" :default="benefit.body" />
            <EditableText v-if="benefit.bodyMobile" tag="p" class="benefit-body mobile-only"
              :content-key="ck(`${benefit.id}.body_mobile`)" :default="benefit.bodyMobile" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
$mobile: 900px;

.careers-grow {
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  @include pagePadding();

  // mobile Figma: a white band with hairlines above and below, on the cream page
  @media screen and (max-width: $mobile) {
    gap: 2.4rem;
    padding: 4.8rem 2rem 4rem;
    border-top: 1px solid rgba(3, 41, 46, 0.12);
    border-bottom: 1px solid rgba(3, 41, 46, 0.12);
    background-color: #ffffff;
  }

  :deep(span) {
    color: inherit;
  }
}

.mobile-only {
  display: none !important;

  @media screen and (max-width: $mobile) {
    display: block !important;
  }
}

.desktop-only {
  @media screen and (max-width: $mobile) {
    display: none !important;
  }
}

.header {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  @media screen and (max-width: $mobile) {
    gap: 0.6rem;
  }
}

.eyebrow {
  @include type-overline;
  color: $primary-700;

  @media screen and (max-width: $mobile) {
    letter-spacing: 0.08em;
    color: $primary-400;
  }
}

.heading {
  @include type-h3;
  text-transform: uppercase;
  color: $primary-600;

  @media screen and (max-width: $mobile) {
    font-weight: 700;
    font-size: 28px;
    line-height: 34px;
    color: $primary-700;
  }
}

// 38.4rem | 79.2rem columns in the Figma; the second row's benefits sit at
// the bottom of their cell, level with the Continuing Education block.
.grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 2.06fr);
  gap: 2.4rem;
  align-items: end;

  @media screen and (max-width: $mobile) {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
}

.grid > .block:nth-child(-n + 2) {
  align-self: start;

  @media screen and (max-width: $mobile) {
    align-self: stretch;
  }
}

.block {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.6rem 2.4rem;
  border-left: 1px solid $primary-base;

  // mobile: cream cards, the CEU stat as a dark card
  @media screen and (max-width: $mobile) {
    gap: 1rem;
    padding: 2rem;
    border-left: 0;
    background-color: $surface-cream;
  }
}

.block--stat {
  @media screen and (max-width: $mobile) {
    gap: 0.8rem;
    background-color: $primary-600;
  }
}

.block-title {
  @include type-large;
  text-transform: uppercase;
  color: $primary-600;

  @media screen and (max-width: $mobile) {
    font-weight: 600;
    font-size: 18px;
    line-height: normal;
    text-transform: none;
    color: $primary-700;
  }
}

.block-body {
  @include type-body;
  color: $primary-700;

  @media screen and (max-width: $mobile) {
    font-size: 16px;
    line-height: 22px;
    color: $primary-400;
  }
}

.stat-prefix {
  @include type-overline;
  color: $primary-700;

  @media screen and (max-width: $mobile) {
    letter-spacing: 0.08em;
    color: $primary-base;
  }
}

.stat-value {
  @include type-h2;
  text-transform: uppercase;
  color: $primary-600;

  @media screen and (max-width: $mobile) {
    font-weight: 700;
    font-size: 40px;
    line-height: 44px;
    color: #ffffff;
  }
}

.stat-label {
  @include type-large;
  text-transform: uppercase;
  color: $primary-600;

  @media screen and (max-width: $mobile) {
    font-weight: 600;
    font-size: 18px;
    line-height: normal;
    text-transform: none;
    color: #ffffff;
  }
}

.stat-body {
  @media screen and (max-width: $mobile) {
    color: rgba(255, 255, 255, 0.6);
  }
}

.stat-prefix + .stat-value,
.stat-value + .stat-label {
  margin-top: -0.8rem;

  @media screen and (max-width: $mobile) {
    margin-top: 0;
  }
}

.benefits {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 2.4rem;

  @media screen and (max-width: $mobile) {
    grid-template-columns: minmax(0, 1fr);
    gap: 1.2rem;
  }
}

.benefit {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  text-align: center;
  color: $primary-700;

  // 1px divider halfway into the gap to the next benefit
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 50%;
    right: -1.2rem;
    width: 1px;
    height: 12rem;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.05);
  }

  // mobile: left-aligned bordered cards
  @media screen and (max-width: $mobile) {
    align-items: flex-start;
    gap: 1.2rem;
    padding: 1.6rem;
    border: 1px solid rgba(3, 41, 46, 0.12);
    border-radius: 1.6rem;
    background-color: #ffffff;
    text-align: left;

    &::after {
      display: none;
    }
  }
}

.benefit-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 8rem;
  height: 8rem;
  border-radius: 2rem;

  img {
    width: 4rem;
    height: 4rem;
  }

  @media screen and (max-width: $mobile) {
    width: 4.8rem;
    height: 4.8rem;
    border-radius: 1.2rem;
    background-color: rgba(43, 192, 212, 0.13);

    img {
      width: 2.4rem;
      height: 2.4rem;
    }
  }
}

.benefit-copy {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  @media screen and (max-width: $mobile) {
    gap: 0.6rem;
  }
}

.benefit-title {
  @include type-button;
  color: inherit;

  @media screen and (max-width: $mobile) {
    letter-spacing: 0;
  }
}

.benefit-body {
  @include type-body;
  color: inherit;

  @media screen and (max-width: $mobile) {
    font-size: 16px;
    line-height: 22px;
    color: $primary-400;
  }
}
</style>
