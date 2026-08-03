<template>
  <section class="perks-partnership">
    <!-- PERKS SECTION -->
    <div class="perks-section">
      <h2 class="perks-title">Your Exclusive Perks</h2>
      <p class="perks-subtitle">
        As a NY Foundling employee, these benefits are reserved just for you — no cost, no hassle.
      </p>

      <div class="perks-grid">
        <div v-for="(perk, i) in perks" :key="i" class="perk-card">
          <div class="perk-icon" v-html="perk.icon"></div>
          <h3 class="perk-name">{{ perk.title }}</h3>
          <p class="perk-desc">{{ perk.description }}</p>
          <button class="perk-btn" @click="scrollToHero(perk)">
            Reserve Your Spot
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="perk-btn-arrow">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- PARTNERSHIP SECTION -->
    <div class="partnership-section">
      <div class="partnership-image-wrap">
        <img
          v-if="partnershipImageSrc"
          :src="partnershipImageSrc"
          alt="NY Foundling employees enjoying benefits"
          class="partnership-image"
        />
        <div v-else class="partnership-placeholder">Photo goes here</div>
      </div>

      <div class="partnership-content">
        <h2 class="partnership-title">{{ partnershipTitle }}</h2>

        <p class="partnership-text">{{ partnershipParagraph1 }}</p>
        <p class="partnership-text">{{ partnershipParagraph2 }}</p>
        <p class="partnership-text">{{ partnershipParagraph3 }}</p>

        <div class="stats-row">
          <div v-for="(stat, i) in stats" :key="i" class="stat">
            <span class="stat-value">{{ stat.value }}</span>
            <span class="stat-label">{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const emit = defineEmits(['reserve'])

// Smooth scroll back up to the hero booking form
function scrollToHero(perk) {
  emit('reserve', perk)
  document.getElementById('nyfoundling-hero')?.scrollIntoView({ behavior: 'smooth' })
}

const clockIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <circle cx="12" cy="12" r="9" />
  <path d="M12 7v5l3.5 2" />
</svg>`

const heartIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M12 20s-7-4.5-9.5-9C1 8 2 4.5 5.5 4 8 3.6 10.5 5 12 7c1.5-2 4-3.4 6.5-3 3.5.5 4.5 4 3 7-2.5 4.5-9.5 9-9.5 9z" />
</svg>`

defineProps({
  perks: {
    type: Array,
    default: () => [
      {
        icon: clockIcon,
        title: '15-Min Consultation',
        description:
          'Receive a complimentary consultation and recovery session with one of our licensed physical therapists.',
      },
      {
        icon: heartIcon,
        title: 'Pelvic Floor Screening',
        description:
          'Enjoy a free 15-minute pelvic floor screening and preventive therapy session.',
      },
    ],
  },
  partnershipImageSrc: { type: String, default: '/images/Nyfoundling/perks.jpg' },
  partnershipTitle: {
    type: String,
    default: "You're in the right place — this offer is made for you",
  },
  partnershipParagraph1: {
    type: String,
    default:
      'PT of the City has partnered with The New York Foundling to provide complimentary physical therapy benefits to NY Foundling employees — with preferred access and a seamless booking experience.',
  },
  partnershipParagraph2: {
    type: String,
    default:
      'Through this partnership, PT of the City is making high-quality physical therapy more accessible to NY Foundling employees — without compromising on expertise or personalized care.',
  },
  partnershipParagraph3: {
    type: String,
    default:
      'When you book, your NY Foundling affiliation is recognized automatically, giving you instant access to your complimentary benefits with no extra steps.',
  },
  stats: {
    type: Array,
    default: () => [
      { value: '4.9★', label: 'Patient Rating' },
      { value: '2,400+', label: 'Patients Served' },
      { value: '12 yrs', label: 'Clinical Experience' },
    ],
  },
})
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.perks-partnership {
  --pink: #f3c9cf;
  --teal: #4ecdb0;
  --teal-dark: #2fae94;
  --teal-tint: #e6f9f4;
  --ink: #1a1a1a;
  --ink-soft: #3a3a3a;
  --muted: #6b6b6b;
  --line: #eeeeee;

  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  background: #fff;
  padding: 56px 56px 0;
}

/* PERKS */
.perks-section {
  margin-bottom: 64px;
}

.perks-title {
  margin: 0 0 8px;
  font-size: 26px;
  font-weight: 800;
  color: var(--ink);
}

.perks-subtitle {
  margin: 0 0 28px;
  font-size: 15px;
  color: var(--muted);
}

.perks-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.perk-card {
  position: relative;
  padding: 28px 24px 24px;
  border-radius: 14px;
  background: #fafafa;
  border: 1px solid var(--line);
  overflow: hidden;
}

.perk-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--pink);
}

.perk-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--teal-tint);
  color: var(--teal-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.perk-icon :deep(svg) {
  width: 20px;
  height: 20px;
}

.perk-name {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
  color: var(--ink);
}

.perk-desc {
  margin: 0 0 18px;
  font-size: 14px;
  line-height: 1.5;
  color: var(--muted);
}

.perk-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 16px;
  border: none;
  border-radius: 999px;
  background: var(--teal);
  color: #08201a;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s ease;
}

.perk-btn:hover {
  background: var(--teal-dark);
}

.perk-btn-arrow {
  width: 14px;
  height: 14px;
}

/* PARTNERSHIP */
.partnership-section {
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: 48px;
  align-items: center;
  padding-bottom: 64px;
}

.partnership-image-wrap {
  position: relative;
  padding: 24px 0 24px 0;
}

.partnership-image-wrap::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: -56px;
  width: calc(50% + 56px);
  background: var(--pink);
  z-index: 0;
  border-radius: 0 16px 16px 0;
}

.partnership-image {
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  height: 340px;
  object-fit: cover;
  border-radius: 4px 16px 16px 4px;
}

.partnership-placeholder {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 340px;
  color: var(--muted);
  font-size: 14px;
  border: 1px dashed var(--line);
  background: #fafafa;
  border-radius: 4px 16px 16px 4px;
}

.partnership-title {
  margin: 0 0 20px;
  font-size: 28px;
  line-height: 1.3;
  font-weight: 800;
  color: var(--ink);
  max-width: 560px;
}

.partnership-text {
  margin: 0 0 16px;
  font-size: 15px;
  line-height: 1.6;
  color: var(--ink-soft);
  max-width: 560px;
}

.stats-row {
  display: flex;
  gap: 40px;
  margin-top: 24px;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat-value {
  font-size: 22px;
  font-weight: 800;
  color: var(--ink);
}

.stat-label {
  font-size: 12.5px;
  color: var(--muted);
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .perks-partnership {
    padding: 40px 24px 0;
  }

  .perks-grid {
    grid-template-columns: 1fr;
  }

  .partnership-section {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .partnership-image-wrap::before {
    left: -24px;
    width: calc(100% + 48px);
  }

  .stats-row {
    gap: 28px;
    flex-wrap: wrap;
  }
}
</style>