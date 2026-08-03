<script setup lang="ts">
// Conditions We Treat — default list below; custom pages (custom-pages/) can
// pass their own `items` and set `numbered` for 01/02/… badges instead of icons.
interface ConditionItem {
  title: string;
  text: string;
  /** SVG inner markup — only needed when `numbered` is false */
  icon?: string;
}

withDefaults(
  defineProps<{
    items?: ConditionItem[];
    numbered?: boolean;
  }>(),
  {
    numbered: false,
    items: () => [
      { title: 'Back Pain', text: 'Acute, chronic & post-surgical', icon: '<path d="M12 2v6M12 16v6M4.9 4.9l4.2 4.2M14.9 14.9l4.2 4.2M2 12h6M16 12h6M4.9 19.1l4.2-4.2M14.9 9.1l4.2-4.2"/>' },
      { title: 'Neck Pain', text: 'Stiffness, pinched nerves, whiplash', icon: '<path d="M12 4a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V8a4 4 0 0 1 4-4z"/><path d="M8 20c0-3 2-5 4-5s4 2 4 5"/>' },
      { title: 'Sciatica', text: 'Radiating leg & nerve pain', icon: '<path d="M13 3L4 14h7l-1 7 9-11h-7l1-7z"/>' },
      { title: 'Sports Injuries', text: 'Sprains, strains, ACL & return-to-play', icon: '<circle cx="12" cy="5" r="2"/><path d="M12 7v6l-3 8M12 13l3 8M8 11l-4 2M16 11l4 2"/>' },
      { title: 'Post-Surgical Recovery', text: 'Joint replacement & orthopedic surgery', icon: '<path d="M9 3h6M10 3v4l-5 9a3 3 0 0 0 3 4h8a3 3 0 0 0 3-4l-5-9V3"/>' },
      { title: 'Balance & Vertigo', text: 'Dizziness & vestibular disorders', icon: '<circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 2"/>' },
    ],
  },
);
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">Conditions We Treat</span>
        <h2>Whatever's Holding You Back, We Can Help</h2>
        <p>Most patients search for their symptom, not a treatment name. Here's what we see — and resolve — every day.</p>
      </div>
      <div class="conditions-grid">
        <div v-for="(c, i) in items" :key="c.title" class="condition-card reveal">
          <div v-if="numbered" class="condition-number">
            {{ String(i + 1).padStart(2, '0') }}
          </div>
          <div v-else class="condition-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" v-html="c.icon"></svg>
          </div>
          <div>
            <h4>{{ c.title }}</h4>
            <p>{{ c.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Numbered badge — mirrors the .condition-icon box in campaign.scss */
.condition-number {
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: #e6f7f5;
  color: #2dbfad;
  font-family: 'Sora', sans-serif;
  font-size: 15px;
  font-weight: 800;
}
</style>
