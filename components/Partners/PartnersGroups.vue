<script setup lang="ts">
import EditableText from '~/components/Admin/EditableText.vue';
import EditableImage from '~/components/Admin/EditableImage.vue';
import PartnerReorder from '~/components/Partners/PartnerReorder.vue';
import { vReveal } from '~/composables/useScrollReveal';
import type { Partner, PartnerCategory } from '~/types/types';

const props = defineProps<{
  partners: Partner[];
  canReorder: boolean;
  busy?: boolean;
}>();

defineEmits<{ (e: 'move', partner: Partner, direction: -1 | 1, group: Partner[]): void }>();

const inCategory = (category: PartnerCategory) => props.partners.filter((p) => p.category === category);
const clinical = computed(() => inCategory('clinical'));
const wellness = computed(() => inCategory('wellness'));
const operational = computed(() => inCategory('operational'));

const ck = (s: string) => `partnerships.groups.${s}`;
</script>

<template>
  <div class="groups">
    <!-- Clinical & Hospital Affiliations: sand band, feature block + partner list -->
    <section v-if="clinical.length" class="clinical">
      <div v-reveal="'slide-in'" class="feature">
        <div class="feature-photo">
          <EditableImage :content-key="ck('clinical.image')" default-src="/images/partners/clinical.webp"
            default-alt="Clinicians reviewing patient progress together" />
        </div>
        <EditableText tag="h2" class="feature-heading" :content-key="ck('clinical.heading')"
          default="Clinical & Hospital Affiliations" />
        <EditableText tag="p" class="feature-body" :content-key="ck('clinical.body')"
          default="We work closely with world-class medical institutions to ensure a seamless continuum of care for our patients." />
      </div>

      <div class="clinical-list">
        <article v-for="(partner, i) in clinical" :key="partner.id" v-reveal="'slide-in'" class="clinical-item">
          <h3 class="clinical-name">{{ partner.name }}</h3>
          <p v-if="partner.description" class="clinical-text">{{ partner.description }}</p>
          <a v-if="partner.website_url" :href="partner.website_url" target="_blank" rel="noopener noreferrer"
            class="partner-link">Visit website</a>
          <PartnerReorder v-if="canReorder" :name="partner.name" :first="i === 0" :last="i === clinical.length - 1"
            :busy="busy" @move="(d) => $emit('move', partner, d, clinical)" />
        </article>
      </div>
    </section>

    <section class="services">
      <template v-for="group in [
        { id: 'wellness', items: wellness, eyebrow: '🏃 Health, Wellness & Patient Services', heading: 'Recovery and general wellness go hand-in-hand. We partner with specialized organizations to support your overall health.' },
        { id: 'operational', items: operational, eyebrow: '🤝 Operational Partners', heading: 'Delivering great care requires a great team.' },
      ]" :key="group.id">
        <div v-if="group.items.length" class="group">
          <div class="group-header">
            <EditableText v-reveal="'drop'" tag="p" class="group-eyebrow" :content-key="ck(`${group.id}.eyebrow`)"
              :default="group.eyebrow" />
            <EditableText v-reveal="'rise'" tag="h2" class="group-heading" :content-key="ck(`${group.id}.heading`)"
              :default="group.heading" />
          </div>
          <div class="cards">
            <article v-for="(partner, i) in group.items" :key="partner.id" class="card">
              <h3 class="card-name">{{ partner.name }}</h3>
              <p v-if="partner.description" class="card-text">{{ partner.description }}</p>
              <a v-if="partner.website_url" :href="partner.website_url" target="_blank" rel="noopener noreferrer"
                class="partner-link">Visit website</a>
              <PartnerReorder v-if="canReorder" :name="partner.name" :first="i === 0"
                :last="i === group.items.length - 1" :busy="busy" @move="(d) => $emit('move', partner, d, group.items)" />
            </article>
          </div>
        </div>
      </template>

      <!-- desktop only: the mobile design ends with its own CTA block -->
      <div class="cta-row">
        <EditableText tag="p" class="cta-text" :content-key="ck('cta.text')"
          default="Ready to start your recovery journey with a trusted network?" />
        <div class="cta-actions">
          <NuxtLink to="/contact" class="cta-btn cta-btn--light">
            <EditableText tag="span" :content-key="ck('cta.secondary_label')" default="Contact Us Today" />
          </NuxtLink>
          <NuxtLink to="/booking" class="cta-btn cta-btn--primary">
            <EditableText tag="span" :content-key="ck('cta.primary_label')" default="Book an Appointment" />
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
$mobile: 900px;

.clinical {
  display: flex;
  align-items: flex-start;
  gap: 2.4rem;
  @include pagePadding();
  padding-top: 8rem;
  padding-bottom: 8rem;
  background-color: $surface-sand;

  @media screen and (max-width: $mobile) {
    flex-direction: column;
    gap: 2.4rem;
    padding: 4.8rem 1.6rem;
  }
}

.feature {
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  flex: 0 1 79.2rem;
  min-width: 0;
  padding: 1.6rem 2.4rem;
  border-left: 1px solid $primary-base;

  @media screen and (max-width: $mobile) {
    flex-basis: auto;
    gap: 1.6rem;
    padding: 0;
    border-left: 0;
  }
}

.feature-photo {
  height: 39.7rem;

  :deep(img) {
    display: block;
    object-fit: cover;
  }

  @media screen and (max-width: $mobile) {
    height: 20rem;
  }
}

.feature-heading {
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

.feature-body {
  @include type-body;
  color: $primary-700;
}

.clinical-list {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  flex: 0 1 38.4rem;
  min-width: 0;

  @media screen and (max-width: $mobile) {
    flex-basis: auto;
    gap: 1.6rem;
  }
}

.clinical-item {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.6rem 2.4rem;
  border-left: 1px solid $primary-base;

  @media screen and (max-width: $mobile) {
    padding: 1.2rem 0.8rem 1.2rem 1.6rem;
    border-left-width: 4px;
    border-left-color: $primary-400;
  }
}

.clinical-name {
  font-family: $font-poppins;
  font-weight: 700;
  font-size: fluid(18, 20);
  line-height: fluid(26, 36);
  text-transform: uppercase;
  color: $primary-600;
}

.clinical-text,
.card-text {
  @include type-body;
  color: $primary-700;
}

.partner-link {
  @include type-caption;
  font-weight: 600;
  color: $primary-400;
  text-decoration: underline;
}

.services {
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  @include pagePadding();
  padding-top: 8rem;
  padding-bottom: 12rem;
  background-color: #ffffff;

  @media screen and (max-width: $mobile) {
    gap: 4rem;
    padding: 4.8rem 1.6rem;
  }
}

.group {
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  @media screen and (max-width: $mobile) {
    gap: 2.4rem;
  }
}

.group-header {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  max-width: 60rem;
  text-transform: uppercase;
}

.group-eyebrow {
  @include type-overline;
  color: $primary-400;
}

.group-heading {
  @include type-h3;
  color: $primary-600;

  @media screen and (max-width: $mobile) {
    font-size: 28px;
    line-height: 34px;
  }
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 38rem), 1fr));
  gap: 2.4rem;

  @media screen and (max-width: $mobile) {
    gap: 1.6rem;
  }
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  min-height: 22rem;
  padding: 2.4rem;
  border: 1px solid $primary-base;
  border-radius: 1.2rem;
  background-color: $surface-sand;

  // a card alone in its group (e.g. Operational) spans the row at its natural height
  &:only-child {
    min-height: 0;
  }

  @media screen and (max-width: $mobile) {
    min-height: 0;
    gap: 1.2rem;
    padding: 2rem;
  }
}

.card-name {
  @include type-large;
  text-transform: uppercase;
  color: $primary-600;
}

.cta-row {
  display: flex;
  align-items: center;
  gap: 2.4rem;

  @media screen and (max-width: $mobile) {
    display: none;
  }
}

.cta-text {
  flex: 1 1 0;
  @include type-large;
  text-transform: uppercase;
  color: $primary-700;
}

.cta-actions {
  display: flex;
  gap: 1.6rem;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 5.6rem;
  padding: 1.6rem 3.2rem;
  border-radius: 1.2rem;
  @include type-button;
  white-space: nowrap;
  transition: background-color 0.15s ease-in-out;

  // the label is an EditableText <span>; the global `span` rule would shrink it
  :deep(span) {
    font: inherit;
    color: inherit;
  }
}

.cta-btn--light {
  border: 1px solid $primary-600;
  background-color: rgba(43, 192, 212, 0.2);
  color: $primary-700;

  &:hover {
    background-color: rgba(43, 192, 212, 0.35);
  }
}

.cta-btn--primary {
  width: 28.2rem;
  height: 5.4rem;
  padding: 1.6rem 2.9rem;
  background-color: $primary-400;
  color: #ffffff;

  &:hover {
    background-color: $primary-600;
  }
}
</style>
