<template>
  <div class="reviews-section">
    <div class="reviews-header">
      <h2 class="reviews-heading">What our patients <em>say</em></h2>
      <div class="reviews-rating">
        
        <div class="rating-number">{{ rating }}</div>
        <div class="google-badge">
          <svg width="30" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4" />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853" />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              fill="#FBBC05" />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335" />
          </svg>
        </div>
        
        <div class="rating-right">
          <div class="header-stars">
            <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= Math.round(rating) }">★</span>
          </div>
          <p class="rating-label">Based on {{ user_ratings_total }}+ Google Reviews</p>
        </div>
      </div>
    </div>

    <div class="carousel-wrapper">
      <button class="scroll-btn left" aria-label="Scroll left" @click="scroll(-1)">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
          stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <div ref="track" class="reviews-track">
        <div v-for="review in reviews" :key="review.author_url" class="review-card">
          <div class="card-top">
            <!-- <span class="quote">"</span> -->
            <div class="card-stars">
              <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= review.rating }">★</span>
            </div>
          </div>
          <p class="review-text">{{ review.text }}</p>
          <div class="review-footer">
            <p class="author-name">{{ review.author_name }}</p>
            <div class="google-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4" />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853" />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05" />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335" />
              </svg>
              <span>Google Review</span>
            </div>
          </div>
        </div>
      </div>

      <button class="scroll-btn right" aria-label="Scroll right" @click="scroll(1)">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
          stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Review } from '~/types/types';

defineProps({
  reviews: {
    type: Array as () => Review[],
    required: true,
  },
  rating: {
    type: Number,
    default: 5,
  },
  user_ratings_total: {
    type: Number,
    default: 0,
  },
});

const track = ref<HTMLElement | null>(null);

const scroll = (dir: 1 | -1) => {
  if (!track.value) return;
  const cardWidth = track.value.querySelector('.review-card')?.clientWidth ?? 360;
  track.value.scrollBy({ left: dir * (cardWidth + 24), behavior: 'smooth' });
};
</script>

<style scoped lang="scss">
.reviews-heading {
  color: $navy;
}
.reviews-section {
  // @include pagePadding();
  // padding: 3rem;
}

.reviews-header {
  @include pagePadding();

  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.5rem;
  gap: 2rem;
  flex-wrap: wrap;
}

.reviews-heading {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.2;

  em {
    font-style: italic;
    font-weight: 400;
  }

  @media screen and (max-width: 600px) {
    font-size: 1.8rem;
  }
}

.reviews-rating {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.rating-number {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1;
  color: $black;
}

.rating-right {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.header-stars {
  display: flex;
  gap: 2px;


  .star {
    font-size: 1.1rem;
    color: #ddd;
    height: 2rem;
    width: 2rem;

    &.filled {
      color: #f5a623;
    }
  }
}

.rating-label {
  font-size: 0.8rem;
  color: #888;
  white-space: nowrap;
}

/* carousel */

.carousel-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0 8rem;
  @media screen and (max-width: 900px) {
    padding: 0 2rem;
    
  }
}

.scroll-btn {
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.15);
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: $black;
  transition: background 0.15s, border-color 0.15s;
  z-index: 1;

  &:hover {
    background: #f0f0f0;
    border-color: rgba(0, 0, 0, 0.3);
  }

  @media screen and (max-width: 700px) {
    display: none;
  }
}

.reviews-track {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  flex: 1;

  &::-webkit-scrollbar {
    display: none;
  }
}

.review-card {
  flex: 0 0 clamp(280px, 32%, 420px);
  scroll-snap-align: start;
  background: #f5f4ef;
  border-radius: 14px;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media screen and (max-width: 700px) {
    flex: 0 0 85vw;
  }
}

.card-top {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.quote {
  font-size: 2rem;
  line-height: 1;
  color: #f5a623;
  font-family: Georgia, serif;
  margin-top: -0.2rem;
}

.card-stars {
  display: flex;
  gap: 2px;

  .star {
    font-size: 0.85rem;
    color: #ddd;
    height: 1.4rem;
    width: 1.4rem;

    &.filled {
      color: #f5a623;
    }
  }
}

.review-text {
  font-size: 1.1rem;
  line-height: 1.65;
  color: #444;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.review-footer {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-top: auto;
}

.author-name {
  font-weight: 700;
  font-size: 0.9rem;
  color: $black;
}

.google-badge {
  display: flex;
  align-items: center;
  gap: 0.4rem;

  span {
    font-size: 0.78rem;
    color: #888;
  }
}
</style>
