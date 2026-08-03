<script setup lang="ts">
import { useCampaign } from '~/composables/useCampaign';

// Custom pages can override the hero content; defaults match the original copy.
// `heading` falls back to the campaign's API title, then to a generic headline.
withDefaults(
  defineProps<{
    heading?: string;
    subheading?: string;
    benefits?: string[];
    topBadgeText?: string;
    insuranceBadgeText?: string;
    ctaText?: string;
    showHeroImage?: boolean;
    /** Forwarded to <CampaignForm> — custom pages use this to trim form fields */
    formProps?: Record<string, any>;
  }>(),
  {
    heading: '',
    subheading:
      'One-on-one physical therapy in the heart of NYC. Licensed therapists, personalized treatment plans, real results.',
    benefits: () => [
      'One-on-one sessions — never rushed, never shared',
      'Same-day & next-day appointments available',
      'Most major insurance plans accepted',
    ],
    topBadgeText: 'Same-Day Appointments',
    insuranceBadgeText: 'Most Insurance Accepted',
    ctaText: 'Request Appointment',
    showHeroImage: true,
    formProps: () => ({}),
  },
);

const { displayPhone, telLink, clinic, title } = useCampaign();

const rating = computed(() => clinic.value?.rating);
const reviewCount = computed(() => clinic.value?.user_ratings_total);

const insurers = ['Aetna', 'Cigna', 'UnitedHealthcare', 'Blue Cross Blue Shield', 'Medicare', 'Humana', '+ more'];
</script>


<template>
  <section id="hero">
    <div class="container hero-grid">
      <div class="hero-copy reveal in">
        <div class="hero-badges">
          <span class="badge urgent">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
            {{ topBadgeText }}
          </span>
          <span v-if="rating" class="badge rating">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01z" /></svg>
            {{ rating }}/5 <template v-if="reviewCount"> · {{ reviewCount }} Reviews</template>
          </span>
          <span class="badge">{{ insuranceBadgeText }}</span>
        </div>

        <h1 v-if="heading || title">{{ heading || title }}</h1>
        <h1 v-else>Get Back to Moving <span class="accent">Pain-Free</span> — Starting Today</h1>

        <p class="hero-sub">{{ subheading }}</p>

        <ul class="hero-benefits">
          <li v-for="benefit in benefits" :key="benefit">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5" /></svg>
            {{ benefit }}
          </li>
        </ul>

        <div class="hero-cta-row">
          <a href="#appointment-form" class="btn btn-primary">{{ ctaText }}</a>
          <a v-if="telLink" :href="telLink" class="btn btn-outline">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
            <!-- Call {{ displayPhone }} -->
            Call 
          </a>
        </div>

        <div v-if="showHeroImage" class="hero-illustration reveal in">
          <div class="proximity-ribbon">
            <span class="pulse-dot"></span>
            <template v-if="clinic?.city">Serving {{ clinic.city }}</template>
            <template v-else>Now accepting new patients</template>
          </div>
          <svg viewBox="0 0 460 260" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="460" height="260" rx="20" fill="#E4F7F7" />
            <path d="M0 190 L110 190 L110 140 L200 140 L200 190 L300 190 L300 100 L390 100 L390 190 L460 190" stroke="#BCE3E3" stroke-width="3" fill="none" />
            <rect x="150" y="70" width="140" height="110" rx="10" fill="#FFFFFF" stroke="#0B3A42" stroke-width="3" />
            <rect x="172" y="96" width="26" height="26" rx="4" fill="#3CCFCF" />
            <rect x="212" y="96" width="26" height="26" rx="4" fill="#3CCFCF" />
            <rect x="172" y="132" width="26" height="26" rx="4" fill="#0B3A42" />
            <rect x="212" y="132" width="26" height="34" fill="#0B3A42" />
            <path d="M150 70 L220 34 L290 70" fill="none" stroke="#0B3A42" stroke-width="3" stroke-linejoin="round" />
            <circle cx="220" cy="118" r="70" fill="none" stroke="#3CCFCF" stroke-width="2" stroke-dasharray="4 6" />
            <circle cx="220" cy="118" r="7" fill="#FF6F5B" />
          </svg>
        </div>
      </div>

      <CampaignForm v-bind="formProps" />
    </div>

    <div class="container trust-strip reveal in">
      <!-- <p>Most Insurance Plans Accepted</p>
      <div class="insurer-row">
        <span v-for="insurer in insurers" :key="insurer" class="insurer-chip">{{ insurer }}</span>
      </div> -->
    </div>
  </section>
</template>
