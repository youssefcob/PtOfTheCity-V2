<script setup lang="ts">
// Sensory Freeway "Why us" section — icon feature cards.
// All content is overridable via props; defaults match the design.

interface FeatureItem {
  title: string;
  text: string;
  /** SVG inner markup (24x24 stroke icons) */
  icon: string;
}

withDefaults(
  defineProps<{
    eyebrow?: string;
    heading?: string;
    subtext?: string;
    items?: FeatureItem[];
  }>(),
  {
    eyebrow: 'Why Brooklyn Families Trust Us',
    heading: 'Designed Around the Needs of Worried, Hopeful Parents',
    subtext:
      'We treat every child as an individual and every parent as an expert partner. Here is how we redefine clinical excellence.',
    items: () => [
      {
        title: 'Boutique Sensory Gym Experience',
        text: 'We replaced cold, sterile clinical rooms with bright, colorful, immersive sensory gyms. Children actually look forward to their therapeutic sessions, thinking they are just coming to play.',
        icon: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z"/><path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15z"/>',
      },
      {
        title: 'All-in-One Multidisciplinary Hub',
        text: 'Occupational, Physical, Speech-Language, DMI, and specialized Feeding programs are co-located under one roof. One cohesive visit, unified progress plans — saving families valuable time.',
        icon: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
      },
      {
        title: 'Zero Waitlists, Rapid Access',
        text: 'We bypass months-long waiting lines typical of pediatric practices, offering same-week evaluation slots for Commercial Insurance and Private Pay families to get help started immediately.',
        icon: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
      },
      {
        title: 'Bilingual Clinical & Admin Team',
        text: 'With native bilingual specialists fluent in Spanish and English at every single touchpoint, we ensure seamless communication through clinical sessions, front-desk, and insurance coordination.',
        icon: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9z"/>',
      },
      {
        title: 'Full Insurance Navigation Support',
        text: 'Our experienced administrative team holds your hand through NYC DOE RSA vouchers, complex Early Intervention transitions, Medicaid enrollment, and commercial insurance authorization.',
        icon: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
      },
      {
        title: 'Specialized Signature Programs',
        text: 'Access advanced therapies: Dynamic Movement Intervention (DMI), Ayres Sensory Integration (ASI®), Handwriting Without Tears®, SOS Feeding Approach®, and PROMPT® speech therapy.',
        icon: '<circle cx="12" cy="9" r="6"/><path d="M8.5 14L7 22l5-3 5 3-1.5-8"/>',
      },
    ],
  },
);
</script>

<template>
  <section id="about" class="sf-features">
    <div class="features-inner">
      <div class="features-head">
        <span class="eyebrow">{{ eyebrow }}</span>
        <h2 class="heading">{{ heading }}</h2>
        <p class="subtext">{{ subtext }}</p>
      </div>

      <div class="features-grid">
        <div v-for="item in items" :key="item.title" class="feature-card">
          <div class="feature-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" v-html="item.icon"></svg>
          </div>
          <h3 class="feature-title">{{ item.title }}</h3>
          <p class="feature-text">{{ item.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.sf-features {
  --coral: #f26b5e;
  --ink: #16382e;
  --muted: #51655e;
  --mint-bg: #e9f3ec;

  background: #eef4f0;
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding: clamp(48px, 7vh, 88px) 24px;
}

.features-inner {
  max-width: 1280px;
  margin: 0 auto;
}

/* Head */
.features-head {
  margin-bottom: clamp(32px, 5vh, 52px);
}

.eyebrow {
  display: inline-block;
  padding: 7px 14px;
  border-radius: 999px;
  background: #fff;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--muted);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  margin-bottom: 18px;
}

.heading {
  margin: 0 0 14px;
  font-size: clamp(28px, 3.4vw, 44px);
  line-height: 1.12;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--ink);
  max-width: 900px;
}

.subtext {
  margin: 0;
  font-size: 15.5px;
  line-height: 1.6;
  color: var(--muted);
  max-width: 720px;
}

/* Cards */
.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

.feature-card {
  background: #fff;
  border-radius: 20px;
  padding: 30px 28px 32px;
  box-shadow: 0 1px 4px rgba(22, 56, 46, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.feature-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 28px rgba(22, 56, 46, 0.09);
}

.feature-icon {
  width: 46px;
  height: 46px;
  border-radius: 13px;
  background: #f0f3f1;
  color: var(--ink);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
}

.feature-icon svg {
  width: 21px;
  height: 21px;
}

.feature-title {
  margin: 0 0 12px;
  font-size: 18.5px;
  line-height: 1.3;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: #101c18;
}

.feature-text {
  margin: 0;
  font-size: 14px;
  line-height: 1.65;
  color: var(--muted);
}

/* RESPONSIVE */
@media (max-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .sf-features {
    padding: 40px 16px 48px;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .feature-icon {
    margin-bottom: 20px;
  }
}
</style>
