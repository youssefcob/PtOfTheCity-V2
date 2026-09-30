<script setup lang="ts">
import type { Job } from '~/types/types';
import { applyLink, formatPostedDate, jobStatusLabel } from '~/utils/jobUtils';

const props = defineProps<{ job: Job }>();

const pills = computed(() => [props.job.location, props.job.job_type, props.job.setting].filter(Boolean) as string[]);

const sections = computed(() => [
  { id: 'responsibilities', title: 'Responsibilities', items: props.job.responsibilities || [] },
  { id: 'requirements', title: 'Requirements', items: props.job.requirements || [] },
  { id: 'benefits', title: 'What We Offer', items: props.job.benefits || [] },
].filter((section) => section.items.length));

const summary = computed(() => [
  { label: 'Location', value: props.job.location },
  { label: 'Job Type', value: props.job.job_type },
  { label: 'Setting', value: props.job.setting },
  { label: 'Start Date', value: props.job.start_date },
  { label: 'Posted Date', value: formatPostedDate(props.job.created_at) },
].filter((row) => row.value));

const hasContact = computed(() => !!(props.job.contact_address || props.job.contact_phone || props.job.contact_email));
</script>

<template>
  <article class="job-detail">
    <header class="job-header">
      <div class="job-heading">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <NuxtLink to="/careers">Careers</NuxtLink>
          <span aria-hidden="true">&gt;</span>
          <span>{{ job.title }}</span>
        </nav>
        <h1 class="job-title">{{ job.title }}</h1>
        <div class="pills">
          <span class="pill pill--status">
            <img src="/images/careers/status-hiring.svg" width="16" height="16" alt="" aria-hidden="true" />
            {{ jobStatusLabel(job) }}
          </span>
          <span v-for="pill in pills" :key="pill" class="pill">{{ pill }}</span>
        </div>
      </div>
      <NuxtLink :to="applyLink(job)" class="apply-link apply-link--header">
        Apply Now
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      </NuxtLink>
    </header>

    <div class="job-body">
      <div class="job-main">
        <section v-if="job.description" class="job-section">
          <h2 class="section-title">About the Role</h2>
          <p class="section-text">{{ job.description }}</p>
        </section>

        <section v-for="section in sections" :key="section.id" class="job-section">
          <h2 class="section-title">{{ section.title }}</h2>
          <ul class="section-list">
            <li v-for="(item, i) in section.items" :key="i">{{ item }}</li>
          </ul>
        </section>
      </div>

      <aside class="job-aside">
        <div class="summary-card">
          <h2 class="summary-title">Job Summary</h2>
          <dl class="summary-rows">
            <div v-for="row in summary" :key="row.label" class="summary-row">
              <dt>{{ row.label }}</dt>
              <dd>{{ row.value }}</dd>
            </div>
          </dl>
          <div class="summary-divider" aria-hidden="true"></div>
          <NuxtLink :to="applyLink(job)" class="apply-link apply-link--card">
            Apply for this Role
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </NuxtLink>
        </div>

        <div v-if="hasContact" class="contact">
          <h2 class="contact-title">Clinic Contact</h2>
          <ul class="contact-list">
            <li v-if="job.contact_address">
              <img src="/images/careers/contact-map-pin.svg" width="20" height="20" alt="" aria-hidden="true" />
              {{ job.contact_address }}
            </li>
            <li v-if="job.contact_phone">
              <img src="/images/careers/contact-phone.svg" width="20" height="20" alt="" aria-hidden="true" />
              <a :href="`tel:${job.contact_phone.replace(/[^\d+]/g, '')}`">{{ job.contact_phone }}</a>
            </li>
            <li v-if="job.contact_email">
              <img src="/images/careers/contact-mail.svg" width="20" height="20" alt="" aria-hidden="true" />
              <a :href="`mailto:${job.contact_email}`">{{ job.contact_email }}</a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  </article>
</template>

<style scoped lang="scss">
$mobile: 900px;

.job-detail {
  width: 100%;

  // mobile Figma: cream page
  @media screen and (max-width: $mobile) {
    background-color: $surface-cream;
  }
}

.job-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3.2rem;
  @include pagePadding();
  padding-top: 6.4rem;
  padding-bottom: 4.8rem;

  @media screen and (max-width: $mobile) {
    align-items: stretch;
    gap: 1.6rem;
    padding: 4rem 2rem 2.4rem;
  }
}

.job-heading {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.breadcrumb {
  display: flex;
  gap: 0.8rem;
  @include type-overline;
  color: $primary-700;

  a,
  span {
    font: inherit;
    letter-spacing: inherit;
    color: inherit;
  }

  a:hover {
    color: $primary-400;
  }

  @media screen and (max-width: $mobile) {
    display: none;
  }
}

.job-title {
  @include type-h2;
  text-transform: uppercase;
  color: $primary-600;

  @media screen and (max-width: $mobile) {
    font-weight: 700;
    font-size: 28px;
    line-height: 34px;
    letter-spacing: 0;
    color: $primary-700;
  }
}

.pills {
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;

  @media screen and (max-width: $mobile) {
    gap: 0.8rem;
  }
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.6rem 1.2rem;
  border: 1px solid rgba(34, 34, 34, 0.1);
  border-radius: 4rem;
  @include type-button;
  color: $primary-700;

  @media screen and (max-width: $mobile) {
    font-weight: 500;
    font-size: 16px;
    line-height: normal;
    letter-spacing: 0;
  }
}

.pill--status {
  border-color: $primary-base;
  background-color: $primary-base;
  color: #ffffff;

  // mobile: darker teal, no icon, still semibold
  @media screen and (max-width: $mobile) {
    border-color: $primary-400;
    background-color: $primary-400;
    font-weight: 600;

    img {
      display: none;
    }
  }
}

.apply-link {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1.6rem 0.8rem 0;
  @include type-button;
  color: $primary-700;

  &:hover {
    color: $primary-400;
  }

  // mobile: a full-width filled button, no arrow
  @media screen and (max-width: $mobile) {
    justify-content: center;
    height: 5.4rem;
    padding: 1.6rem 2.9rem;
    border-radius: 1.2rem;
    background-color: $primary-400;
    color: #ffffff;

    &:hover {
      color: #ffffff;
      background-color: $primary-600;
    }

    svg {
      display: none;
    }
  }
}

.apply-link--header {
  @media screen and (max-width: $mobile) {
    margin-top: 0.8rem;
  }
}

.job-body {
  display: flex;
  align-items: flex-start;
  gap: 8rem;
  @include pagePadding();
  padding-bottom: 12rem;

  @media screen and (max-width: $mobile) {
    flex-direction: column;
    align-items: stretch;
    gap: 3.2rem;
    padding: 1.6rem 2rem 4rem;
  }
}

.job-main {
  display: flex;
  flex-direction: column;
  gap: 6.4rem;
  flex: 1 1 0;
  min-width: 0;

  @media screen and (max-width: $mobile) {
    gap: 3.2rem;
  }
}

.job-section {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  @media screen and (max-width: $mobile) {
    gap: 1.6rem;

    &:first-child {
      gap: 1.2rem;
    }
  }
}

.section-title {
  @include type-large;
  text-transform: uppercase;
  color: $primary-600;

  @media screen and (max-width: $mobile) {
    font-family: $font-switzer;
    font-weight: 700;
    font-size: 22px;
    line-height: normal;
    text-transform: none;
  }
}

.section-text {
  @include type-body;
  color: $primary-700;
  white-space: pre-line;

  @media screen and (max-width: $mobile) {
    font-size: 16px;
    line-height: 26px;
  }
}

// desktop: small teal dots · mobile: a 3px teal bar down the item's left edge
.section-list {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  list-style: none;

  li {
    position: relative;
    margin: 0;
    padding-left: 1.8rem;
    @include type-body;
    color: $primary-700;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 1.2rem;
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 0.3rem;
      background-color: $primary-400;
    }
  }

  @media screen and (max-width: $mobile) {
    gap: 1.4rem;

    li {
      min-height: 2.4rem;
      padding-left: 1.5rem;
      font-size: 16px;
      line-height: 24px;

      &::before {
        top: 0;
        bottom: 0;
        width: 0.3rem;
        height: auto;
        border-radius: 0.15rem;
      }
    }
  }
}

.job-aside {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  flex: 0 0 40rem;

  @media screen and (max-width: $mobile) {
    flex-basis: auto;
    gap: 3.2rem;
  }
}

.summary-card {
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  padding: 3.2rem;
  border: 1px solid rgba(34, 34, 34, 0.1);
  border-radius: 1.2rem;
  background-color: $surface-cream;

  // mobile: white, square corners, row dividers and a filled button
  @media screen and (max-width: $mobile) {
    gap: 2rem;
    padding: 2.4rem;
    border-radius: 0;
    background-color: #ffffff;
  }
}

.summary-title {
  @include type-button;
  color: $primary-700;

  @media screen and (max-width: $mobile) {
    font-family: $font-switzer;
    font-weight: 700;
    font-size: 20px;
    line-height: normal;
    letter-spacing: 0;
  }
}

.summary-rows {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 0;

  @media screen and (max-width: $mobile) {
    gap: 0;
  }
}

.summary-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;

  dt,
  dd {
    margin: 0;
    @include type-button;
    color: $primary-700;
  }

  dd {
    text-align: right;
  }

  @media screen and (max-width: $mobile) {
    padding: 0.8rem 0;
    border-bottom: 1px solid rgba(34, 34, 34, 0.1);

    dt,
    dd {
      font-size: 16px;
      line-height: normal;
      letter-spacing: 0;
    }

    dt {
      font-weight: 500;
    }

    dd {
      color: $primary-600;
    }
  }
}

.summary-divider {
  height: 1px;
  background: rgba(34, 34, 34, 0.1);

  @media screen and (max-width: $mobile) {
    display: none;
  }
}

.apply-link--card {
  align-self: center;

  @media screen and (max-width: $mobile) {
    align-self: stretch;
    margin-top: 0.8rem;
  }
}

.contact {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-left: 1.2rem;
  color: $primary-700;

  // mobile: a dark card
  @media screen and (max-width: $mobile) {
    gap: 1.6rem;
    padding: 2.4rem;
    background-color: $primary-700;
    color: $surface-cream;
  }
}

.contact-title {
  @include type-button;
  color: inherit;

  @media screen and (max-width: $mobile) {
    font-family: $font-switzer;
    font-weight: 700;
    font-size: 20px;
    line-height: normal;
    letter-spacing: 0;
    color: #ffffff;
  }
}

.contact-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  list-style: none;

  li {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 0;
    @include type-caption;
    color: inherit;
  }

  a {
    font: inherit;
    color: inherit;

    &:hover {
      color: $primary-400;
    }
  }

  // icons only appear in the mobile design
  img {
    display: none;
    flex-shrink: 0;
    width: 2rem;
    height: 2rem;
  }

  @media screen and (max-width: $mobile) {
    gap: 1.2rem;

    li {
      font-size: 16px;
      line-height: normal;
      letter-spacing: 0;
    }

    img {
      display: block;
    }

    a:hover {
      color: $primary-base;
    }
  }
}
</style>
