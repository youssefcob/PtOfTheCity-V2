//What is this ? 
// Well its kind of an implmentation for the Strategy Pattern.
// This funny approach I used here to give the ability to make custom pages for the campaigns.


//Here's how it works:

// Custom campaign layouts, keyed by the URL-encoded campaign name — the same
// value as `encodeURIComponent(route.params.name)` in pages/campaign/[name].vue.
//
// To give a campaign its own section composition / custom content:
//   1. Create a layout file in this directory (copy OccupationalTherapy.vue
//      or components/Campaign/DefaultCampaignLayout.vue as a starting point).
//   2. Register it here.
//
// Layouts compose the shared Campaign components and pass custom props where
// the default content needs to change.

import type { Component } from 'vue';
import OccupationalTherapy from './OccupationalTherapy.vue';

export const customCampaignPages: Record<string, Component> = {
  'Occupational-Therapy': OccupationalTherapy,
};
