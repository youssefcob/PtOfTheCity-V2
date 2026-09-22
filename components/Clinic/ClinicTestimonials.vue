<script setup lang="ts">
import { computed } from 'vue';
import type { Clinic, Review } from '~/types/types';
import EditableText from '~/components/Admin/EditableText.vue';

const props = defineProps<{
  clinic: Clinic;
  reviews: Review[];
  reviewsUrl?: string | null;
}>();

const ck = (s: string) => `clinic.${props.clinic.slug}.testimonials.${s}`;

const list = computed(() => (props.reviews ?? []).filter((r) => r?.text).slice(0, 5));
const featured = computed(() => list.value[0] ?? null);
const rest = computed(() => list.value.slice(1));

const initials = (name: string) =>
  (name || '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('');
</script>

<template>
  <section v-if="list.length" class="clinic-testimonials">
    <div class="header">
    <div class="intro">
      <EditableText tag="p" class="eyebrow" :content-key="ck('eyebrow')" default="Testimonials" />
      <EditableText
        tag="h2"
        class="heading"
        :content-key="ck('heading')"
        default="Real stories. Real results."
      />
      <EditableText
        tag="p"
        class="body"
        :content-key="ck('body')"
        default="Discover how our patients have regained strength, reduced pain, and returned to the activities they love through personalized physical therapy."
      />
    </div>

    <article v-if="featured" class="card featured">
      <span class="quote-mark open">&ldquo;</span>
      <p class="quote">{{ featured.text }}</p>
      <div class="author">
        <span class="avatar">
          <img v-if="featured.profile_photo_url" :src="featured.profile_photo_url" :alt="featured.author_name" />
          <template v-else>{{ initials(featured.author_name) }}</template>
        </span>
        <div class="author-copy">
          <p class="author-name">{{ featured.author_name }}</p>
          <p class="author-meta">{{ featured.relative_time_description }}</p>
          <div class="stars" :aria-label="`${featured.rating} out of 5`">
            <span v-for="n in 5" :key="n" :class="{ on: n <= Math.round(featured.rating) }">&#9733;</span>
          </div>
        </div>
      </div>
      <span class="quote-mark close">&rdquo;</span>
    </article>
    </div>

    <div v-if="rest.length" class="grid">
      <article v-for="(r, i) in rest" :key="i" class="card">
        <span class="quote-mark open">&ldquo;</span>
        <p class="quote">{{ r.text }}</p>
        <div class="author">
          <span class="avatar">
            <img v-if="r.profile_photo_url" :src="r.profile_photo_url" :alt="r.author_name" />
            <template v-else>{{ initials(r.author_name) }}</template>
          </span>
          <div class="author-copy">
            <p class="author-name">{{ r.author_name }}</p>
            <p class="author-meta">{{ r.relative_time_description }}</p>
            <div class="stars" :aria-label="`${r.rating} out of 5`">
              <span v-for="n in 5" :key="n" :class="{ on: n <= Math.round(r.rating) }">&#9733;</span>
            </div>
          </div>
        </div>
        <span class="quote-mark close">&rdquo;</span>
      </article>
    </div>

    <a
      v-if="reviewsUrl"
      :href="reviewsUrl"
      target="_blank"
      rel="noopener"
      class="see-all"
    >
      See all Reviews
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <line x1="7" y1="17" x2="17" y2="7" />
        <polyline points="7 7 17 7 17 17" />
      </svg>
    </a>
  </section>
</template>

<style scoped lang="scss">
.header{
  display:flex;
  width:100%;
  justify-content: space-between;
  gap:1.5rem;
  @media screen and (max-width: 800px) {
    flex-direction: column;
    
  }
}
.clinic-testimonials {
  @include pagePadding();
  padding-top: 4rem;
  padding-bottom: 4rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.intro {
  // max-width: 32rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.eyebrow {
  @include type-overline;
  color: $primary-700;
  margin: 0;
}

.heading {
  @include type-h2;
  text-transform: uppercase;
  color: $primary-600;
  margin: 0;
}

.body {
  @include type-body;
  color: $primary-700;
  margin: 0;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
  }
}

.card {
  position: relative;
  background-color: $surface-cream;
  border-radius: 2rem;
  padding: 2.5rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  &.featured {
    align-self: flex-end;
    width: 100%;
    max-width: 62rem;
  }
}

.quote-mark {
  position: absolute;
  color: $primary-base;
  font-family: $font-switzer;
  font-size: 4rem;
  line-height: 1;

  &.open {
    top: 1.25rem;
    left: 1.5rem;
  }

  &.close {
    right: 1.5rem;
    bottom: 0.5rem;
  }
}

.quote {
  @include type-body;
  color: $primary-700;
  margin: 1rem 0 0;
  position: relative;
  z-index: 1;
}

.card:not(.featured) .quote {
  display: -webkit-box;
  -webkit-line-clamp: 7;
  line-clamp: 7;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.avatar {
  flex-shrink: 0;
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  background-color: #1e3a4a;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-family: $font-poppins;
  font-size: 1.3rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.author-copy {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.author-name {
  @include type-body;
  color: $primary-700;
  margin: 0;
}

.author-meta {
  @include type-caption;
  color: $primary-700;
  margin: 0;
}

.stars {
  margin-top: 0.2rem;
  font-size: 1.3rem;
  letter-spacing: 0.1em;
  color: #d1d5db;

  .on {
    color: #f5a623;
  }
}

.see-all {
  align-self: flex-end;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  @include type-button;
  color: $primary-700;

  &:hover {
    color: $primary-400;
    text-decoration: underline;
  }
}
</style>
