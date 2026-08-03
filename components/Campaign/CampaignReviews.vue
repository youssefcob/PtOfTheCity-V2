<script setup lang="ts">
import { useCampaign } from '~/composables/useCampaign';

// Custom pages can override the section content; defaults match the original copy
withDefaults(
  defineProps<{
    eyebrow?: string;
    heading?: string;
  }>(),
  {
    eyebrow: 'Patient Reviews',
    heading: 'What Our Patients Are Saying',
  },
);

const { clinic } = useCampaign();

const starPath = 'M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01z';

const rating = computed(() => clinic.value?.rating);
const reviewCount = computed(() => clinic.value?.user_ratings_total);
const reviews = computed(() => clinic.value?.reviews || []);

// Initial of the author for the avatar
const initial = (name: string) => (name || '?').trim().charAt(0).toUpperCase();

// Format the review `time` (unix seconds) into a readable date
const formattedTime = (t: number) => {
  if (!t) return '';
  try {
    return new Date(t * 1000).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return '';
  }
};
</script>

<template>
  <section v-if="reviews.length" class="section section-alt">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">{{ eyebrow }}</span>
        <h2>{{ heading }}</h2>
      </div>

      <div v-if="rating" class="rating-summary reveal">
        <div class="rating-number">{{ Number(rating).toFixed(1) }}</div>
        <div class="rating-summary-side">
          <div class="rating-stars">
            <svg v-for="n in 5" :key="n" viewBox="0 0 24 24" fill="currentColor"><path :d="starPath" /></svg>
          </div>
          <p class="rating-meta">Based on {{ reviewCount }} Google Reviews</p>
        </div>
      </div>

      <div v-if="reviews.length" class="reviews-grid">
        <div v-for="(review, i) in reviews.slice(0, 3)" :key="i" class="review-card reveal">
          <div class="review-top">
            <div class="review-avatar">{{ initial(review.author_name) }}</div>
            <div>
              <div class="review-name">{{ review.author_name }}</div>
              <div class="review-stars">{{ '★'.repeat(review.rating || 5) }}</div>
            </div>
          </div>
          <p v-if="review.text" class="review-text">{{ review.text }}</p>
          <p v-if="formattedTime(review.time)" class="review-meta">{{ formattedTime(review.time) }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.rating-summary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0 3rem;
  text-align: left;
}

.rating-number {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1;
  color: var(--text-color, #16344a);
}

.rating-summary-side {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

/* Keep the 5 stars on one line (inline SVGs can wrap otherwise) */
.rating-stars {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  gap: 2px;
}

.rating-stars svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  color: #f5a623;
}

.rating-meta {
  color: #6b7280;
  font-size: 0.95rem;
  margin: 0;
}

.reviews-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

@media (max-width: 900px) {
  .reviews-grid {
    grid-template-columns: 1fr;
  }
}

.review-card {
  background: #fff;
  border-radius: 16px;
  padding: 1.75rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.review-top {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1rem;
}

.review-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #4f9a97;
  color: #fff;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.review-name {
  font-weight: 700;
  color: var(--text-color, #16344a);
}

.review-stars {
  color: #f5a623;
  letter-spacing: 1px;
  font-size: 0.9rem;
}

.review-text {
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 0.5rem;
}

.review-meta {
  color: #9ca3af;
  font-size: 0.85rem;
  margin: 0;
}
</style>