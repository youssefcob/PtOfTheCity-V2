<script setup lang="ts">
// Sensory Freeway hero — badges, two-tone headline, CTA, stats, image.
// All content is overridable via props; defaults match the design.

withDefaults(
  defineProps<{
    sponsorBadge?: string;
    excellenceBadge?: string;
    /** Dark part of the headline */
    headingLead?: string;
    /** Accented last word of the headline */
    headingAccent?: string;
    subheading?: string;
    ctaText?: string;
    ctaHref?: string;
    stats?: { value: string; label: string }[];
    /** Hero image — pass the src when the asset is ready */
    imageSrc?: string;
    imageAlt?: string;
  }>(),
  {
    sponsorBadge: '100% HIPAA COMPLIANT',
    excellenceBadge: '15+ Years of Excellence',
    headingLead: 'Where Rehab Therapy Becomes Play not Traditional Sessions.',
    // headingAccent: 'Play',
    subheading:
      'At Sensory Freeway we are helping little ones move, communicate, learn, and grow through the support of our multidisciplinary pediatric team specializing in Occupational, Physical, and Speech-Language Therapy.',
    ctaText: 'Book Your Child’s Evaluation',
    ctaHref: '#book',
    stats: () => [
      { value: '15,000+', label: 'Sessions Guided' },
      { value: '0-18', label: 'Ages Served' },
    ],
    imageSrc: '',
    imageAlt: 'Child playing in a Sensory Freeway therapy gym',
  },
);
</script>

<template>
  <section class="sf-hero">
    <div class="hero-inner">
      <!-- LEFT -->
      <div class="hero-copy">
        <div class="badges-row">
          <span class="badge badge-sponsor">
            <span class="badge-dot" aria-hidden="true"></span>
            {{ sponsorBadge }}
          </span>
          <span class="badge badge-excellence">{{ excellenceBadge }}</span>
        </div>

        <h1 class="headline">
          {{ headingLead }}
          <span class="headline-accent">{{ headingAccent }}</span>
        </h1>

        <p class="subheading">{{ subheading }}</p>

        <a :href="ctaHref" class="btn-primary">
          {{ ctaText }}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" class="btn-arrow">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>

        <div class="stats-row">
          <div v-for="stat in stats" :key="stat.label" class="stat">
            <span class="stat-value">{{ stat.value }}</span>
            <span class="stat-label">{{ stat.label }}</span>
          </div>
        </div>
      </div>

      <!-- RIGHT: image -->
      <div class="hero-media">
        <img v-if="imageSrc" :src="imageSrc" :alt="imageAlt" class="hero-image" />
        <div v-else class="image-placeholder">Hero image goes here</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.sf-hero {
  --ink: #1a2744;
  --play: #085041;
  --muted: #6b7a85;
  --sponsor-bg: #FFF7ED;
  --sponsor-text: #2EE5C1;
  --excellence-bg: #e6f3ef;
  --excellence-text: #085041;
  --teal: #4ecdc4;
  --teal-dark: #3bb8b0;
  --line: #e8eef0;

  background: #fff;
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding: clamp(48px, 8vh, 96px) 24px;
}

.hero-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  gap: clamp(32px, 4vw, 64px);
  align-items: center;
}

/* LEFT */
.hero-copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.badges-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 14px;
  border-radius: 999px;
  font-size: 12.5px;
  font-weight: 600;
}

.badge-sponsor {
  background: var(--sponsor-bg);
  color: var(--sponsor-text);
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--sponsor-text);
}

.badge-excellence {
  background: var(--excellence-bg);
  color: var(--excellence-text);
}

.headline {
  margin: 0 0 18px;
  font-size: clamp(36px, 4.4vw, 58px);
  line-height: 1.08;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--ink);
}

.headline-accent {
  color: var(--play);
  font-size: inherit;
  font-weight: inherit;
  font-family: inherit;
  letter-spacing: inherit;
  line-height: inherit;
}

.subheading {
  margin: 0 0 30px;
  font-size: 15.5px;
  line-height: 1.65;
  color: var(--muted);
  max-width: 480px;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 15px 26px;
  border-radius: 999px;
  background: var(--teal);
  color: #0b2b23;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 8px 20px rgba(78, 205, 196, 0.35);
  transition: background 0.15s ease, transform 0.1s ease;
}

.btn-primary:hover {
  background: var(--teal-dark);
  color: #fff;
}

.btn-primary:active {
  transform: translateY(1px);
}

.btn-arrow {
  width: 17px;
  height: 17px;
}

/* Stats */
.stats-row {
  display: flex;
  gap: 48px;
  margin-top: 36px;
  padding-top: 24px;
  border-top: 1px solid var(--line);
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat-value {
  font-size: 24px;
  font-weight: 800;
  color: var(--ink);
  letter-spacing: -0.01em;
}

.stat-label {
  font-size: 13px;
  color: var(--muted);
}

/* RIGHT */
.hero-media {
  border-radius: 40px;
  overflow: hidden;
}

.hero-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 4 / 3.6;
  border: 2px dashed #e0d5c6;
  border-radius: 40px;
  background: #f7faf9;
  color: #a8998a;
  font-size: 14px;
  font-weight: 500;
}

/* RESPONSIVE */
@media (max-width: 960px) {
  .hero-inner {
    grid-template-columns: 1fr;
  }

  .hero-media {
    order: -1;
  }

  .image-placeholder {
    aspect-ratio: 16 / 9;
  }
}

@media (max-width: 480px) {
  .sf-hero {
    padding: 32px 16px 44px;
  }

  .btn-primary {
    width: 100%;
    justify-content: center;
  }

  .stats-row {
    gap: 32px;
  }
}
</style>
