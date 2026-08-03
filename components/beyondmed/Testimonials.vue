<template>
  <section class="testimonials">
    <div class="testimonials__header">
      <p class="bm-eyebrow">Member Experiences</p>
      <h2 class="bm-heading">Trusted by thousands of members</h2>
    </div>

    <div class="testimonials__stats">
      <div v-for="stat in stats" :key="stat.label" class="stat-card">
        <span class="stat-card__value">{{ stat.value }}</span>
        <span class="stat-card__label">{{ stat.label }}</span>
      </div>
    </div>

    <div class="testimonials__reviews">
      <div v-for="review in reviews" :key="review.name" class="review-card">
        <div class="review-card__stars">
          <span v-for="i in 5" :key="i" class="star">★</span>
        </div>
        <p class="review-card__quote">"{{ review.quote }}"</p>
        <div class="review-card__author">
          <div class="author__avatar">{{ review.initials }}</div>
          <div class="author__info">
            <span class="author__name">{{ review.name }}</span>
            <span class="author__meta">{{ review.meta }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const stats = [
  { value: '40K+',  label: 'Patients Served' },
  { value: '32',    label: 'Locations' },
  { value: '4.7',   label: 'Average Rating' },
  { value: '5+ Yrs', label: 'Clinical Experience' },
];

const reviews = [
  {
    initials: 'TA',
    name: 'Thakur Aggarwal',
    meta: 'PT of the City Member',
    quote: 'I had great experience with the various exercises which relieved my backache and the pains in my legs. I would recommend this to my friends. The staff is professional.',
  },
  {
    initials: 'SM',
    name: 'Serenity Montalvo',
    meta: 'PT of the City Member',
    quote: 'This was my first experience with physical therapy, and I couldn\'t be happier! The staff are not only knowledgeable and helpful, but also kind and attentive, creating a safe and welcoming environment.',
  },
  {
    initials: 'LP',
    name: 'Lucelle Pardoe',
    meta: 'PT of the City Member',
    quote: 'Love coming here for PT - relaxing environment, expert therapists, and tailored treatment with everything you need. I\'m making amazingly quick progress to get back to sport.',
  },
];
</script>

<style lang="scss" scoped>
.testimonials {
  background: #fff;
  padding: 7rem 10rem;
  font-family: $montserrat;
  display: flex;
  flex-direction: column;
  gap: 3.5rem;

  @media (max-width: 1000px) {
    padding: 4rem 2rem;
    gap: 2.5rem;
  }
}

.testimonials__header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* ── Stats ── */
.testimonials__stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;

  @media (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.stat-card {
  background: #E1F5EE;
  border-radius: 1rem;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid #9FE1CB;
}

.stat-card__value {
  font-family: $helvetica;
  font-size: 3.5rem;
  font-weight: 400;
  color: #085041;
  line-height: 1;
}

.stat-card__label {
  font-size: 1.2rem;
  color: #085041;
  font-weight: 500;
}

/* ── Reviews ── */
.testimonials__reviews {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 800px) {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    gap: 1rem;
  }
}

.review-card {
  border: 1px solid #e8eded;
  background: #F7FAF9;
  border-radius: 1.25rem;
  padding: 2rem 2rem 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  @media (max-width: 800px) {
    flex-shrink: 0;
    width: 80vw;
    scroll-snap-align: start;
  }
}

.review-card__stars {
  display: flex;
  gap: 0.15rem;
}

.star {
  // font-size: 1.6rem;
  width: 1.6rem;
  height: 1.6rem;
  color: #f5a623;
}

.review-card__quote {
  font-size: 1.3rem;
  line-height: 1.7;
  color: #2a3a3a;
  font-style: italic;
  margin: 0;
  flex: 1;
}

.review-card__author {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: auto;
}

.author__avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #1D9E75;

  color: #fff;
  font-size: 1.2rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.author__info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.author__name {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1a2b2b;
}

.author__meta {
  font-size: 1.1rem;
  color: #1D9E75;

}
</style>
