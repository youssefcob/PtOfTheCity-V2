<script setup lang="ts">
import EditableText from '~/components/Admin/EditableText.vue';
import { vReveal } from '~/composables/useScrollReveal';

const lines = [
  { id: 'patient_support', icon: 'headphones', title: 'Patient Support', body: 'Dedicated billing & records line' },
  { id: 'provider_relations', icon: 'user-cog', title: 'Provider Relations', body: 'MD Referrals & Coordination' },
];

const ck = (s: string) => `contact.channels.${s}`;
</script>

<template>
  <section class="channels">
    <div class="header">
      <EditableText v-reveal="'drop'" tag="p" class="eyebrow" :content-key="ck('eyebrow')" default="Connectivity" />
      <EditableText v-reveal="'rise'" tag="h2" class="heading" :content-key="ck('heading')"
        default="Reach us through any channel" />
    </div>

    <div class="collage">
      <a href="tel:+17186480888" class="card card--call">
        <img class="desktop-only" src="/images/contact/phone.svg" width="32" height="32" alt="" aria-hidden="true" />
        <img class="mobile-only" src="/images/contact/m-phone.svg" width="28" height="28" alt="" aria-hidden="true" />
        <div class="card-copy">
          <EditableText tag="p" class="card-eyebrow" :content-key="ck('call.eyebrow')" default="Call Us" />
          <EditableText tag="p" class="call-number" :content-key="ck('call.number')" default="(718) 648-0888" />
          <EditableText tag="p" class="card-caption" :content-key="ck('call.caption')"
            default="Immediate assistance for urgent scheduling." />
        </div>
      </a>

      <div class="grid">
        <a href="mailto:contact@ptoc.com" class="card card--light">
          <img class="desktop-only" src="/images/contact/mail.svg" width="24" height="24" alt="" aria-hidden="true" />
          <img class="mobile-only" src="/images/contact/m-mail.svg" width="24" height="24" alt="" aria-hidden="true" />
          <EditableText tag="p" class="card-eyebrow" :content-key="ck('email.eyebrow')" default="Email" />
          <EditableText tag="p" class="card-title" :content-key="ck('email.address')" default="contact@ptoc.com" />
          <EditableText tag="p" class="card-caption" :content-key="ck('email.caption')"
            default="We typically respond to inquiries within 2 business hours." />
        </a>

        <NuxtLink to="/clinics/all" class="card card--dark">
          <img class="desktop-only" src="/images/contact/map-pin.svg" width="24" height="24" alt="" aria-hidden="true" />
          <img class="mobile-only" src="/images/contact/m-map-pin.svg" width="24" height="24" alt="" aria-hidden="true" />
          <EditableText tag="p" class="card-eyebrow" :content-key="ck('visit.eyebrow')" default="Visit" />
          <EditableText tag="p" class="card-title" :content-key="ck('visit.title')" default="32+ Locations" />
          <EditableText tag="p" class="card-caption" :content-key="ck('visit.caption')"
            default="Clinics spanning across every borough in New York City." />
        </NuxtLink>

        <div v-for="line in lines" :key="line.id" class="card card--line">
          <div class="line-icon">
            <img :src="`/images/contact/${line.icon}.svg`" width="20" height="20" alt="" aria-hidden="true" />
          </div>
          <div class="line-copy">
            <EditableText tag="p" class="card-title" :content-key="ck(`${line.id}.title`)" :default="line.title" />
            <EditableText tag="p" class="line-body" :content-key="ck(`${line.id}.body`)" :default="line.body" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
$mobile: 900px;

.channels {
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  @include pagePadding();
  padding-top: 12rem;
  padding-bottom: 12rem;
  background-color: $surface-cream;

  @media screen and (max-width: $mobile) {
    gap: 2.4rem;
    padding-top: 4.8rem;
    padding-bottom: 4.8rem;
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
  gap: 1.6rem;

  @media screen and (max-width: $mobile) {
    gap: 0.8rem;
  }
}

.eyebrow {
  @include type-large;
  text-transform: uppercase;
  color: $primary-700;

  @media screen and (max-width: $mobile) {
    font-weight: 600;
    font-size: 16px;
    line-height: normal;
    letter-spacing: 1px;
    color: $primary-400;
  }
}

.heading {
  @include type-h2;
  text-transform: uppercase;
  color: $primary-600;

  @media screen and (max-width: $mobile) {
    font-weight: 700;
    font-size: 32px;
    line-height: 38px;
    letter-spacing: -0.32px;
  }
}

// Figma: the 40.5rem call card, then a 2×2 grid of cards beside it
.collage {
  display: flex;
  gap: 3.2rem;

  @media screen and (max-width: 1100px) {
    flex-direction: column;
  }

  @media screen and (max-width: $mobile) {
    gap: 1.6rem;
  }
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 3.2rem;
  flex: 1 1 0;
  min-width: 0;

  @media screen and (max-width: $mobile) {
    grid-template-columns: minmax(0, 1fr);
    gap: 1.6rem;
  }
}

.card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.2rem;
  padding: 3.2rem;
  color: $primary-700;
  transition: transform 0.2s ease-in-out;

  &[href]:hover {
    transform: translateY(-2px);
  }

  @media screen and (max-width: $mobile) {
    padding: 2.4rem;
  }
}

.card--call {
  flex: 0 0 40.5rem;
  justify-content: space-between;
  min-height: 33.5rem;
  padding: 4rem;
  background-color: $primary-base;
  color: #ffffff;

  @media screen and (max-width: 1100px) {
    flex-basis: auto;
    min-height: 0;
    gap: 4rem;
  }

  // mobile: the darker teal, everything in one stack
  @media screen and (max-width: $mobile) {
    justify-content: flex-start;
    gap: 1.2rem;
    padding: 2.4rem;
    background-color: $primary-300;

    .card-copy {
      gap: 1.2rem;
    }

    .card-caption {
      opacity: 0.9;
    }
  }

  .card-eyebrow {
    opacity: 0.8;
  }
}

.card-copy {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.card--light,
.card--line {
  background-color: #ffffff;

  @media screen and (max-width: $mobile) {
    border: 1px solid $primary-300;
  }
}

.card--light .card-eyebrow {
  @media screen and (max-width: $mobile) {
    opacity: 0.6;
  }
}

.card--dark {
  background-color: $primary-700;
  color: #ffffff;

  .card-eyebrow {
    opacity: 0.6;
  }

  .card-caption {
    opacity: 0.8;
  }
}

.card-eyebrow {
  @include type-overline;
  color: inherit;

  @media screen and (max-width: $mobile) {
    letter-spacing: 1px;
  }
}

.call-number {
  @include type-h2;
  text-transform: uppercase;
  white-space: nowrap;
  color: inherit;

  @media screen and (max-width: $mobile) {
    font-weight: 700;
    font-size: 28px;
    line-height: normal;
    letter-spacing: 0;
  }
}

.card-title {
  @include type-button;
  color: inherit;
  word-break: break-word;
}

// mobile: the email address and "32+ Locations" become Switzer headings
.card--light > .card-title,
.card--dark > .card-title {
  @media screen and (max-width: $mobile) {
    font-family: $font-switzer;
    font-weight: 700;
    font-size: 24px;
    line-height: normal;
    letter-spacing: 0;
  }
}

.card--light > .card-title {
  @media screen and (max-width: $mobile) {
    color: $primary-600;
  }
}

.card-caption {
  @include type-caption;
  color: inherit;

  @media screen and (max-width: $mobile) {
    font-size: 16px;
    line-height: normal;
    letter-spacing: 0;
  }
}

.card--line {
  flex-direction: row;
  align-items: center;
  gap: 2.4rem;

  @media screen and (max-width: $mobile) {
    gap: 1.6rem;
    padding: 2rem;

    .card-title {
      font-size: 16px;
      line-height: normal;
      letter-spacing: 0;
    }
  }
}

.line-icon {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 4.8rem;
  height: 4.8rem;
  border-radius: 2.4rem;
  background-color: $surface-cream;

  img {
    width: 2rem;
    height: 2rem;
  }

  @media screen and (max-width: $mobile) {
    width: 4.4rem;
    height: 4.4rem;
    border-radius: 2.2rem;
  }
}

.line-copy {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  min-width: 0;
}

.line-body {
  @include type-body;
  color: inherit;

  @media screen and (max-width: $mobile) {
    font-size: 16px;
    line-height: normal;
  }
}
</style>
