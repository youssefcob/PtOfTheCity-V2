<script setup lang="ts">
// Sensory Freeway reviews section — "Success Stories" testimonial cards.
// All content is overridable via props; defaults match the design.

interface Review {
  text: string;
  name: string;
  role: string;
  rating?: number;
}

withDefaults(
  defineProps<{
    eyebrow?: string;
    heading?: string;
    subtext?: string;
    reviews?: Review[];
  }>(),
  {
    eyebrow: 'Success Stories',
    heading: 'Loved by Brooklyn Parents',
    subtext:
      'Read about the developmental milestones, confidence boosts, and smiles our families celebrate every single week.',
    reviews: () => [
      {
        text: "The therapists at Sensory Freeway have worked miracles with my son's motor planning. The gym is so beautiful and clean, he thinks we're just going to an indoor playground!",
        name: 'Melissa R.',
        role: 'Parent of Tommy (Age 4, OT client)',
      },
      {
        text: 'I cannot recommend their Speech-Language path program enough. From early sounds to full conversational fluency, they provided us with actionable tools to use at home.',
        name: 'David K.',
        role: 'Parent of Sofia (Age 6, Speech client)',
      },
      {
        text: 'Incredibly warm and professional team. Being backed by PT of The City gives us extra confidence in their deep expertise, and they accept our insurance seamlessly.',
        name: 'Aisha N.',
        role: 'Parent of Liam (Age 8, PT & OT client)',
      },
    ],
  },
);

const starPath =
  'M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01z';
</script>

<template>
  <section class="sf-reviews">
    <div class="reviews-inner">
      <div class="reviews-head">
        <span class="eyebrow">{{ eyebrow }}</span>
        <h2 class="heading">{{ heading }}</h2>
        <p class="subtext">{{ subtext }}</p>
      </div>

      <div class="reviews-grid">
        <div v-for="review in reviews" :key="review.name" class="review-card">
          <div class="stars" :aria-label="`${review.rating ?? 5} out of 5 stars`">
            <svg
              v-for="n in review.rating ?? 5"
              :key="n"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              stroke-width="1"
              stroke-linejoin="round"
            >
              <path :d="starPath" />
            </svg>
          </div>

          <p class="review-text">"{{ review.text }}"</p>

          <div class="review-author">
            <span class="review-name">{{ review.name }}</span>
            <span class="review-role">{{ review.role }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.sf-reviews {
  --ink: #16382e;
  --muted: #51655e;
  --mint-bg: #e9f3ec;
  --gold: #f0c94a;

  background: #f8f9f8;
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding: clamp(48px, 7vh, 88px) 24px;
}

.reviews-inner {
  max-width: 1280px;
  margin: 0 auto;
}

/* Head */
.reviews-head {
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
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--ink);
}

.subtext {
  margin: 0 auto;
  font-size: 15.5px;
  line-height: 1.6;
  color: var(--muted);
  max-width: 560px;
}

/* Cards */
.reviews-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

.review-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid #eee8de;
  border-radius: 20px;
  padding: 28px 26px 30px;
  box-shadow: 0 1px 4px rgba(22, 56, 46, 0.04);
}

.stars {
  display: flex;
  gap: 3px;
  color: var(--gold);
  margin-bottom: 18px;
}

.stars svg {
  width: 17px;
  height: 17px;
}

.review-text {
  flex: 1;
  margin: 0 0 22px;
  font-size: 14.5px;
  line-height: 1.65;
  color: #3c4f48;
}

.review-author {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.review-name {
  font-size: 14.5px;
  font-weight: 700;
  color: var(--ink);
}

.review-role {
  font-size: 13px;
  color: var(--muted);
}

/* RESPONSIVE */
@media (max-width: 960px) {
  .reviews-grid {
    grid-template-columns: 1fr;
    max-width: 560px;
    margin: 0 auto;
  }
}

@media (max-width: 480px) {
  .sf-reviews {
    padding: 40px 16px 48px;
  }
}
</style>
