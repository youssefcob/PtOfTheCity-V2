<script setup>
const reviews = [
  {
    rating: 4,
    text: `My PT helped me recover from a shoulder injury in just a few sessions. The exercises were tailored to my job and I felt stronger immediately.`,
    name: 'Maya R.',
    role: 'NY Founding Employee',
  },
  {
    rating: 5,
    text: `The pelvic floor screening was incredibly informative. I finally understood why I was experiencing discomfort and the therapy plan was clear and effective.`,
    name: 'Daniel K.',
    role: 'NY Founding Employee',
  },
  {
    rating: 4,
    text: `The booking process was seamless and my therapist was knowledgeable about my specific needs. I felt supported every step of the way.`,
    name: 'Sarah L.',
    role: 'NY Founding Employee',
  },
]
</script>

<template>
  <section class="reviews-section">
    <div class="container">
      <h2>Patient Reviews</h2>

      <p class="subtitle">
        Real feedback from patients who've experienced PT of The City's care.
      </p>

      <div class="reviews-grid">
        <div
          v-for="review in reviews"
          :key="review.name"
          class="review-card"
        >
          <div class="stars">
            <span
              v-for="star in 5"
              :key="star"
              class="star"
              :class="{ filled: star <= review.rating }"
            >
              ★
            </span>
          </div>

          <p class="review-text">
            "{{ review.text }}"
          </p>

          <div class="review-author">
            <div class="name">{{ review.name }}</div>
            <div class="role">{{ review.role }}</div>
          </div>
        </div>
      </div>

      <div class="rating-summary">
        <div class="summary-stars">
          ★★★★★
        </div>

        <span>
          4.9 out of 5 based on 2,400+ reviews
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.reviews-section {
  padding: 80px 0;
  background: #f7f7f7;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

h2 {
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  color: #222;
}

.subtitle {
  margin: 8px 0 32px;
  font-size: 14px;
  color: #777;
}

.reviews-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.review-card {
  background: white;
  border: 1px solid #dff0eb;
  border-radius: 12px;
  padding: 20px;

  display: flex;
  flex-direction: column;
  min-height: 180px;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
}

.stars {
  margin-bottom: 16px;
}

.star {
  color: #d8d8d8;
  font-size: 14px;
}

.star.filled {
  color: #f5b301;
}

.review-text {
  flex: 1;
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: #444;
}

.review-author {
  margin-top: 20px;
}

.name {
  font-size: 12px;
  font-weight: 700;
  color: #222;
}

.role {
  font-size: 11px;
  color: #8a8a8a;
}

.rating-summary {
  display: inline-flex;
  align-items: center;
  gap: 10px;

  margin-top: 24px;
  padding: 10px 16px;

  background: white;
  border: 1px solid #dff0eb;
  border-radius: 10px;

  font-size: 12px;
  font-weight: 600;
  color: #444;
}

.summary-stars {
  color: #f5b301;
  letter-spacing: 1px;
}

@media (max-width: 992px) {
  .reviews-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .reviews-section {
    padding: 48px 0;
  }

  h2 {
    font-size: 24px;
  }
}
</style>