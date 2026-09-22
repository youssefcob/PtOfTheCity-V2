<script setup lang="ts">
import { computed } from 'vue';
import type { Clinic } from '~/types/types';
import EditableText from '~/components/Admin/EditableText.vue';

const props = defineProps<{ clinic: Clinic }>();

const ck = (s: string) => `clinic.${props.clinic.slug}.contact.${s}`;

// Placeholder values from the mockup, shown until an admin fills the real ones.
const phone = computed(() => props.clinic.phone || '(212) 555-0100');
const fax = computed(() => props.clinic.fax || '(212) 555-0100');
const email = computed(() => props.clinic.email || 'contact@therapyofnewyork.com');
const referralEmail = computed(
  () => props.clinic.referral_email || 'contact@therapyofnewyork.com',
);
const languages = computed(() =>
  props.clinic.languages_spoken?.length
    ? props.clinic.languages_spoken
    : ['English', 'Arabic', 'Filipino'],
);

const rows = computed(() => [
  { key: 'phone', label: 'Phone', value: phone.value, href: `tel:${phone.value}`, icon: 'phone' },
  { key: 'fax', label: 'Fax', value: fax.value, href: null, icon: 'fax' },
  { key: 'email', label: 'Email', value: email.value, href: `mailto:${email.value}`, icon: 'mail' },
  {
    key: 'referral',
    label: 'Referral Email',
    value: referralEmail.value,
    href: `mailto:${referralEmail.value}`,
    icon: 'mail-plus',
  },
]);
</script>

<template>
  <section class="clinic-contact">
    <EditableText
      tag="p"
      class="eyebrow"
      :content-key="ck('eyebrow')"
      default="Contact Information"
    />
    <EditableText tag="h2" class="heading" :content-key="ck('heading')" default="Talk to our team" />

    <div class="grid">
      <ul class="rows">
        <li v-for="row in rows" :key="row.key" class="row">
          <span class="icon" aria-hidden="true">
            <svg v-if="row.icon === 'phone'" width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12.7 19.79 19.79 0 0 1 1.63 4.1 2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.1 6.1l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <svg v-else-if="row.icon === 'fax'" width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
            <svg v-else width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-10 6L2 7" />
              <path v-if="row.icon === 'mail-plus'" d="M19 3v4M17 5h4" />
            </svg>
          </span>
          <span class="label">{{ row.label }} :</span>
          <a v-if="row.href" :href="row.href" class="value">{{ row.value }}</a>
          <span v-else class="value">{{ row.value }}</span>
        </li>
      </ul>

      <div class="languages">
        <EditableText
          tag="p"
          class="label-lg"
          :content-key="ck('languages_label')"
          default="Languages spoken"
        />
        <ul>
          <li v-for="lang in languages" :key="lang">{{ lang }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.clinic-contact {
  @include pagePadding();
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.eyebrow {
  @include type-overline;
  color: $primary-700;
  margin: 0 0 0.5rem;
}

.heading {
  @include type-h2;
  text-transform: uppercase;
  color: $primary-600;
  margin: 0 0 2.5rem;
}

.grid {
  display: flex;
  gap: 6rem;

  @media screen and (max-width: 900px) {
    flex-direction: column;
    gap: 2.5rem;
  }
}

.rows {
  flex: 1;
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.row {
  display: grid;
  grid-template-columns: 2.4rem 12rem 1fr;
  align-items: center;
  gap: 0.75rem;
  @include type-body;
  color: $primary-700;

  @media screen and (max-width: 500px) {
    grid-template-columns: 2.4rem 1fr;
    row-gap: 0.2rem;

    .value {
      grid-column: 2;
    }
  }
}

.icon {
  color: $primary-600;
  display: flex;
}

.value {
  color: $primary-700;

  &:is(a):hover {
    text-decoration: underline;
  }
}

.languages {
  flex-shrink: 0;
  width: 22rem;

  @media screen and (max-width: 900px) {
    width: 100%;
  }

  .label-lg {
    @include type-large;
    text-transform: uppercase;
    color: $primary-600;
    margin: 0 0 0.75rem;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    @include type-body;
    color: $primary-700;
    padding: 0.25rem 0;
  }
}
</style>
