<script setup lang="ts">
// Custom layout for the Occupational Therapy campaign
// (/campaign/Occupational%20Therapy) — same sections as the default layout,
// with a numbered conditions list and a trimmed booking form.
import CampaignHeader from '~/components/Campaign/CampaignHeader.vue';
import CampaignHero from '~/components/Campaign/CampaignHero.vue';
import CampaignConditions from '~/components/Campaign/CampaignConditions.vue';
import CampaignWhyUs from '~/components/Campaign/CampaignWhyUs.vue';
import CampaignServices from '~/components/Campaign/CampaignServices.vue';
import CampaignReviews from '~/components/Campaign/CampaignReviews.vue';
import CampaignInsurance from '~/components/Campaign/CampaignInsurance.vue';
import CampaignLocation from '~/components/Campaign/CampaignLocation.vue';
import CampaignTimeline from '~/components/Campaign/CampaignTimeline.vue';
import CampaignFinalCta from '~/components/Campaign/CampaignFinalCta.vue';
import CampaignFooter from '~/components/Campaign/CampaignFooter.vue';
import CampaignFloating from '~/components/Campaign/CampaignFloating.vue';
import { useCampaign } from '~/composables/useCampaign';

const { clinic } = useCampaign();

const conditions = [
  { title: 'Hand Therapy', text: 'Post-surgical hand, wrist & shoulder rehab.' },
  { title: 'Neurological Rehabilitation', text: 'Stroke, MS & Parkinson’s-focused care.' },
  { title: 'Cognitive Rehabilitation', text: 'Memory, sequencing & problem-solving support.' },
  { title: 'Fine Motor Skills', text: 'Grip, dexterity & hand coordination training.' },
  { title: 'Balance Training', text: 'Fall prevention & stability exercises.' },
  { title: 'Functional Mobility', text: 'Moving safely through daily environments.' },
  { title: 'Home Safety Training', text: 'Reducing hazards for safer independent living.' },
  { title: 'Adaptive Equipment Training', text: 'Tools that make daily tasks easier & safer.' },
];

// Booking form for this campaign: first name, last name, phone, email,
// insurance, preferred time — everything else hidden
const allowedInsurances= ['Self-Pay', 'Medicare' ,'Bluecorss Blue shield (BCBS)', 'All Automobile _ No Fault Insurances', 'All Workers Compensation Insuranes', 'United healthcare Oxford ']
const formProps = {
  hideServices: true,
  hideLocation: true,
  hideDate: true,
  hideWhatBrings: true,
  insuranceOnly:allowedInsurances
};
const WhyUsItems = [
  {
    title: 'On-site OT inside a clinic you already trust',
    text: 'One referral, one location, one care team — no gap between providers.',
    icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  },
  {

title: 'Personalized, goal-based treatment plans',
    text: 'Built around your hand, shoulder, or ADL goals, not a generic protocol.',
    icon: '<path d="M12 20c4-2 8-5 8-10V5l-8-3-8 3v5c0 5 4 8 8 10z"/>',
  },
  {
    
    title: 'Coordinated PT + OT care',
    text: 'A shared plan between disciplines means a faster, more connected recovery.',
    icon: '<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M8 21h8M12 18v3"/>',
  },
{
  title: 'Real Accessibility for the Neighborhood',
  text: 'English- and Russian-speaking staff, and scheduling that works around shift work and caregiving.',
  icon: '<path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"/>',
}

];
const heading = 'Your Hands. Your Independence. Your Recovery Starts Here.';
const subheading = 'Licensed Occupational Therapy for stroke recovery, hand & shoulder injuries, arthritis, and the everyday tasks illness or surgery took away — dressing, cooking, driving, working. One clinic, one care team, same-week appointments.';
const benefits = [
  'Licensed OTs',
  'Same-Week Appointments',
  'English & Russian Staff',
];


// BCBS PPO
// 1199SEIU PPO
// GHI PPO
// Oxford PPO
// NYCE (NYC Employees)
// Workers’ Comp
// No-Fault (Auto)

</script>

<template>
  <CampaignHeader />
  <CampaignHero :benefits="benefits" :heading="heading" :subheading="subheading" :form-props="formProps" :show-hero-image="false" />
  <CampaignInsurance :insurance-only="allowedInsurances" />
  <CampaignConditions :items="conditions" numbered />
  <CampaignWhyUs :items="WhyUsItems" />
  <!-- <CampaignServices /> -->
  <CampaignReviews v-if="clinic?.reviews?.length" />
  <CampaignLocation v-if="clinic" />
  <CampaignTimeline />
  <CampaignFinalCta />
  <CampaignFooter />
  <CampaignFloating />
</template>
