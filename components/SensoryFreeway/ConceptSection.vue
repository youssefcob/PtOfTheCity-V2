<script setup lang="ts">
// Sensory Freeway "Sensory Gym Concept" section — image + copy + partners + checklist.
// All content is overridable via props; defaults match the design.

withDefaults(
  defineProps<{
    eyebrow?: string;
    heading?: string;
    text?: string;
    partnersLabel?: string;
    sloganLead?: string;
    sloganAccent?: string;
    partners?: string[];
    checklist?: string[];
    /** Section image — pass the src when the asset is ready */
    imageSrc?: string;
    imageAlt?: string;
  }>(),
  {
    eyebrow: 'The Sensory Gym Concept',
    heading: 'Brooklyn Kids Have Been Growing With Us for 15+ Years.',
    text: `Before social media became part of everyday life, before parents searched online for everything, Sensory Freeway was already here.

For more than 15 years, Brooklyn families discovered us the way trusted neighborhood places were always discovered: through word of mouth. Parent to parent. Family to family. One little success story leading to another.

Back then, many of today’s millennial parents were still growing up themselves. Now, they’re raising a new generation of little explorers in a world that looks completely different.`,
    partnersLabel: 'The generations may change. The way families find us may change. But our belief hasn’t:',
    sloganLead: 'Therapy Should Feel Like',
    sloganAccent: 'Play!',
    // partners: () => ['NYU', 'Columbia University'],
    // checklist: () => [
    //   'Multi-borough network expanding across Brooklyn',
    //   'Boutique individual sensory structures for tailored focus',
    //   'Directly sponsored and supported by PT of The City',
    // ],
    imageSrc: '',
    imageAlt: 'Therapist and child in a colorful Sensory Freeway gym',
  },
);
</script>

<template>
  <section class="sf-concept">
    <div class="concept-inner">
      <!-- LEFT: image -->
      <div class="concept-media">
        <img v-if="imageSrc" :src="imageSrc" :alt="imageAlt" class="concept-image" />
        <div v-else class="image-placeholder">Concept image goes here</div>
      </div>

      <!-- RIGHT: content -->
      <div class="concept-copy">
        <span class="eyebrow">{{ eyebrow }}</span>
        <h2 class="heading">{{ heading }}</h2>
        <p class="text">{{ text }}</p>

        <p class="partners-label">
          {{ partnersLabel }}
          <span class="belief-slogan">
            {{ sloganLead }}
            <span class="belief-accent">{{ sloganAccent }}</span>
          </span>
        </p>
        <div class="partners-row">
          <span v-for="partner in partners" :key="partner" class="partner-chip">{{ partner }}</span>
        </div>

        <ul class="checklist">
          <li v-for="item in checklist" :key="item">
            <span class="check-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </span>
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.sf-concept {
  --coral: #f26b5e;
  --ink: #16382e;
  --muted: #51655e;
  --mint-bg: #e9f3ec;
  --green: #3d9b6c;

  background: #F7FAF9;
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding: clamp(48px, 7vh, 88px) 24px;
}

.concept-inner {
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(32px, 5vw, 80px);
  align-items: center;
}

/* LEFT: image */
.concept-media {
  border-radius: 24px;
  overflow: hidden;
}

.concept-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 4 / 3.2;
  border: 2px dashed #e0d5c6;
  border-radius: 24px;
  background: #fff;
  color: #a8998a;
  font-size: 14px;
  font-weight: 500;
}

/* RIGHT: content */
.eyebrow {
  display: inline-block;
  padding: 7px 14px;
  border-radius: 999px;
  background: var(--mint-bg);
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--ink);
  margin-bottom: 20px;
}

.heading {
  margin: 0 0 18px;
  font-size: clamp(28px, 3.2vw, 42px);
  line-height: 1.14;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--ink);
}

.text {
  margin: 0 0 28px;
  font-size: 15.5px;
  line-height: 1.7;
  color: var(--muted);
  max-width: 560px;
}

.partners-label {
  margin: 0 0 12px;
  font-size: 16.5px;
  font-weight: 700;
  line-height: 1.65;
  letter-spacing: -0.01em;
  color: var(--ink);
  max-width: 560px;
}

.belief-slogan {
  display: block;
  margin-top: 10px;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.3;
  color: var(--ink);
}

.belief-accent {
  color: #085041;
  font-size: inherit;
  font-weight: inherit;
  font-family: inherit;
  letter-spacing: inherit;
  line-height: inherit;
}

.partners-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 26px;
}

.partner-chip {
  padding: 9px 18px;
  border-radius: 999px;
  background: #fff;
  border: 1px solid #e8e2d8;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--ink);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.checklist {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.checklist li {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14.5px;
  font-weight: 500;
  color: var(--ink);
}

.check-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--green);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.check-icon svg {
  width: 13px;
  height: 13px;
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .concept-inner {
    grid-template-columns: 1fr;
  }

  .concept-media {
    order: -1;
  }

  .image-placeholder {
    aspect-ratio: 16 / 9;
  }
}

@media (max-width: 480px) {
  .sf-concept {
    padding: 40px 16px 48px;
  }
}
</style>
