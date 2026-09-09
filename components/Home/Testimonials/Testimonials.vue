<script setup lang="ts">
// Static placeholder content — the home API has no reviews/testimonials field yet.
// Swap for real review data once that endpoint exists.
const testimonial = {
  quote:
    "The team at PT of the City took the time to understand my goals and build a treatment plan that worked for me. After months of knee pain, I'm back to running and feeling stronger than ever.",
  initials: 'MR',
  name: 'Michelle R.',
  title: 'Director of Rehab Services · Brooklyn Medical Center',
};

const dots = 7;
</script>

<template>
  <section class="testimonials">
    <div class="intro">
      <p class="overline">Testimonials</p>
      <h2 class="heading">Real Stories. Real Results.</h2>
      <p class="body">
        Discover how our patients have regained strength, reduced pain, and returned to the
        activities they love through personalized physical therapy.
      </p>
    </div>

    <div class="card">
      <img class="quote-mark quote-open" src="/images/home/icon-quote.svg" alt="" aria-hidden="true" />
      <img class="quote-mark quote-close" src="/images/home/icon-quote.svg" alt="" aria-hidden="true" />
      <p class="quote">{{ testimonial.quote }}</p>
      <div class="author">
        <div class="avatar">{{ testimonial.initials }}</div>
        <div class="author-copy">
          <p class="author-name">{{ testimonial.name }}</p>
          <p class="author-title">{{ testimonial.title }}</p>
          <div class="stars">
            <img v-for="n in 5" :key="n" src="/images/home/icon-star.svg" alt="" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>

    <div class="controls">
      <button class="nav-btn" type="button" aria-label="Previous testimonial">
        <img src="/images/home/icon-caret-prev.svg" alt="" aria-hidden="true" />
      </button>
      <div class="dots">
        <span v-for="n in dots" :key="n" class="dot" :class="{ active: n === 1 }"></span>
      </div>
      <button class="nav-btn active" type="button" aria-label="Next testimonial">
        <img src="/images/home/icon-caret-next.svg" alt="" aria-hidden="true" />
      </button>
    </div>
  </section>
</template>

<style scoped lang="scss">
.testimonials {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1.5rem;
  width: 100%;
  padding: 3.75rem 7.5rem;
  background-color: #ffffff;

  @media screen and (max-width: 900px) {
    padding: 2.5rem 1.5rem;
    align-items: stretch;
  }
}

.intro {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  max-width: 24rem;
  margin-right: auto;
}

.overline {
  @include type-overline;
  color: $primary-700;
}

.heading {
  @include type-h2;
  text-transform: uppercase;
  color: $primary-600;
}

.body {
  @include type-body;
  color: $primary-700;
}

.card {
  position: relative;
  width: 100%;
  max-width: 49rem;
  margin-top: -8rem;
  padding: 2.5rem 6rem;
  border-radius: 2.5rem;
  background-color: $surface-cream;

  @media screen and (max-width: 900px) {
    margin-top: 0;
    padding: 2.5rem 1.75rem;
  }
}

.quote-mark {
  position: absolute;
  width: 2.25rem;
  height: 2.25rem;

  &.quote-open {
    left: 1.5rem;
    top: 1.5rem;
    transform: rotate(180deg);
  }

  &.quote-close {
    right: 1.5rem;
    bottom: 1.5rem;
  }
}

.quote {
  @include type-body;
  color: $primary-700;
}

.author {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
}

.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 2.9rem;
  height: 2.9rem;
  border-radius: 50%;
  background-color: #1e3a4a;
  @include type-overline;
  color: #ffffff;
}

.author-copy {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.author-name {
  @include type-body;
  color: $primary-700;
}

.author-title {
  @include type-caption;
  color: $primary-700;
}

.stars {
  display: flex;
  gap: 0.15rem;
  margin-top: 0.3rem;

  img {
    width: 0.75rem;
    height: 0.75rem;
  }
}

.controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  background-color: #ffffff;
  border: 0.8px solid $border-gray;
  cursor: pointer;

  &.active {
    border-color: $primary-base;
  }

  img {
    width: 1.25rem;
    height: 1.25rem;
  }
}

.dots {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: $border-gray;

  &.active {
    width: 2rem;
    background-color: $primary-base;
    border-radius: 100px;
  }
}
</style>
