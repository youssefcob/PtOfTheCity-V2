<script setup lang="ts">
interface TherapyItem {
  icon: 'ot' | 'pt' | 'slp';
  title: string;
  text: string;
  tags: string[];
}

withDefaults(
  defineProps<{
    eyebrow?: string;
    heading?: string;
    subtext?: string;
    items?: TherapyItem[];
  }>(),
  {
    eyebrow: 'Multidisciplinary Care',
    heading: 'Specialized Pediatric Therapies',
    subtext:
      'Our expert therapists collaborate to provide holistic, child-centered treatment plans that target developmental milestones through custom-crafted play frameworks.',
    items: () => [
      {
        icon: 'ot',
        title: 'Occupational Therapy (OT)',
        text: 'Focuses on supporting active participation in daily routines, emotional self-regulation, sensory modulation, and motor accuracy.',
        tags: [
          'Sensory Processing',
          'Fine Motor Control',
          'Self-Regulation',
          'Handwriting Progress',
          'Feeding Therapy',
          'Daily Living Skills',
        ],
      },
      {
        icon: 'pt',
        title: 'Physical Therapy (PT)',
        text: 'Strengthens physical mechanics, foundational milestone achievement, posture balance, and physical coordination skills.',
        tags: [
          'Gross Motor Milestones',
          'Balance & Gait',
          'DMI Therapy',
          'Postural Control',
          'Kinesiotaping',
          'Strength & Play',
        ],
      },
      {
        icon: 'slp',
        title: 'Speech Therapy (SLP)',
        text: 'Guides receptive and expressive language fluency, articulation precision, clarity, social pragmatic skills, and eating/feeding support.',
        tags: [
          'Expressive Language',
          'Articulation Clarity',
          'Fluency & Voice',
          'AAC Devices',
          'Social Pragmatics',
          'Oral-Motor Feeding',
        ],
      },
    ],
  },
);
</script>

<template>
  <section id="services" class="sf-therapies">
    <div class="therapies-inner">
      <div class="therapies-head">
        <span class="eyebrow">{{ eyebrow }}</span>
        <h2 class="heading">{{ heading }}</h2>
        <p class="subtext">{{ subtext }}</p>
      </div>

      <div class="therapies-grid">
        <article v-for="item in items" :key="item.title" class="therapy-card">
          <div class="card-top">
            <span class="card-icon" aria-hidden="true">
              <svg v-if="item.icon === 'ot'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16" />
                <path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
                <path d="m2 15 6 6" />
                <path d="M19.5 8.5c.7-.7 1.5-1.6 1.5-2.7A2.73 2.73 0 0 0 16 4a2.78 2.78 0 0 0-5 1.8c0 1.2.8 2 1.5 2.8L16 12Z" />
              </svg>
              <svg v-else-if="item.icon === 'pt'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
              </svg>
            </span>
            <h3 class="card-title">{{ item.title }}</h3>
          </div>

          <p class="card-text">{{ item.text }}</p>

          <div class="card-divider"></div>

          <p class="focus-label">Key Focus Areas</p>
          <div class="tags">
            <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.sf-therapies {
  --ink: #085041;
  --muted: #6b7a85;
  --mint-bg: #e8f4ef;
  --line: #e6ebe8;

  background: #fff;
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding: clamp(48px, 7vh, 88px) 24px;
}

.therapies-inner {
  max-width: 1200px;
  margin: 0 auto;
}

.therapies-head {
  text-align: center;
  margin-bottom: clamp(32px, 5vh, 52px);
}

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
  margin-bottom: 16px;
}

.heading {
  margin: 0 0 14px;
  font-size: clamp(28px, 3.4vw, 44px);
  line-height: 1.12;
  font-weight: 800;
  letter-spacing: -0.02em;
  
}

.subtext {
  margin: 0 auto;
  font-size: 15.5px;
  line-height: 1.65;
  color: var(--muted);
  max-width: 640px;
}

.therapies-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

.therapy-card {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 28px 24px 26px;
  box-shadow: 0 4px 20px rgba(8, 80, 65, 0.04);
}

.card-top {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}

.card-icon {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: var(--mint-bg);
  color: var(--ink);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.card-icon svg {
  width: 20px;
  height: 20px;
}

.card-title {
  margin: 0;
  font-size: 17px;
  line-height: 1.3;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--ink);
}

.card-text {
  margin: 0 0 20px;
  font-size: 14px;
  line-height: 1.65;
  color: var(--muted);
}

.card-divider {
  height: 1px;
  background: var(--line);
  margin-bottom: 16px;
}

.focus-label {
  margin: 0 0 12px;
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: #fff;
  font-size: 12.5px;
  font-weight: 500;
  line-height: 1.3;
  color: var(--ink);
}

@media (max-width: 1024px) {
  .therapies-grid {
    grid-template-columns: 1fr;
    max-width: 520px;
    margin: 0 auto;
  }
}

@media (max-width: 480px) {
  .sf-therapies {
    padding: 40px 16px 48px;
  }
}
</style>
