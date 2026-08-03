<script setup lang="ts">
// Default campaign layout — the standard section composition used by every
// campaign that doesn't have a custom page in custom-pages/registry.ts.
import CampaignHeader from './CampaignHeader.vue';
import CampaignHero from './CampaignHero.vue';
import CampaignConditions from './CampaignConditions.vue';
import CampaignWhyUs from './CampaignWhyUs.vue';
import CampaignServices from './CampaignServices.vue';
import CampaignReviews from './CampaignReviews.vue';
import CampaignInsurance from './CampaignInsurance.vue';
import CampaignLocation from './CampaignLocation.vue';
import CampaignTimeline from './CampaignTimeline.vue';
import CampaignFinalCta from './CampaignFinalCta.vue';
import CampaignFooter from './CampaignFooter.vue';
import CampaignFloating from './CampaignFloating.vue';
import { useCampaign } from '~/composables/useCampaign';

const { clinic } = useCampaign();
</script>

<template>
  <CampaignHeader />
  <CampaignHero />
  <CampaignInsurance />
  <CampaignConditions />
  <CampaignWhyUs />
  <CampaignServices />
  <CampaignReviews v-if="clinic?.reviews?.length" />
  <!-- <CampaignTherapists /> -->
  <CampaignLocation v-if="clinic" />
  <CampaignTimeline />
  <!-- <CampaignFaq /> -->
  <CampaignFinalCta />
  <CampaignFooter />
  <CampaignFloating />
</template>
