<script setup lang="ts">
// Custom pages can override the section content; defaults match the original copy
interface WhyItem {
  title: string;
  text: string;
  icon: string;
}

withDefaults(
  defineProps<{
    eyebrow?: string;
    heading?: string;
    items?: WhyItem[];
  }>(),
  {
    eyebrow: 'Why Choose Us',
    heading: "Care That's Actually Built Around You",
    items: () => [
      { title: 'One-on-One Care', text: 'Full sessions with your therapist — no aides, no rotating between patients.', icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>' },
      { title: 'Licensed Therapists', text: 'Doctors of Physical Therapy with specialty certifications across every service we offer.', icon: '<path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"/>' },
      { title: 'Same-Day Appointments', text: 'Pain doesn\'t wait for next week — most patients are seen within 24 hours.', icon: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>' },
      { title: 'Insurance Accepted', text: 'We handle verification and paperwork so you don\'t have to.', icon: '<path d="M20 6L9 17l-5-5"/>' },
      { title: 'Personalized Treatment', text: 'A plan built around your evaluation, goals, and daily life — not a template.', icon: '<path d="M12 20c4-2 8-5 8-10V5l-8-3-8 3v5c0 5 4 8 8 10z"/>' },
      { title: 'Modern Equipment', text: 'Gait analysis, dry needling tools, and rehab technology used by leading clinics.', icon: '<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M8 21h8M12 18v3"/>' },
    ],
  },
);
</script>

<template>
  <section class="section section-alt">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">{{ eyebrow }}</span>
        <h2>{{ heading }}</h2>
      </div>
      <div class="why-grid">
        <div v-for="item in items" :key="item.title" class="why-card reveal">
          <div class="why-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" v-html="item.icon"></svg>
          </div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
