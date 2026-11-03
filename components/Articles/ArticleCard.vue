<script setup lang="ts">
import type { Blog } from '~/types/types';

// `wide` lays the card out horizontally so it can span two grid columns.
const props = defineProps<{ blog: Blog; wide?: boolean }>();

const meta = computed(() => {
  const minutes = articleReadMinutes(props.blog);
  return [articleDate(props.blog), minutes ? `${minutes} min read` : ''].filter(Boolean).join(' · ');
});
</script>

<template>
  <NuxtLink :to="articlePath(blog)" class="article-card" :class="{ wide }">
    <div class="image">
      <NuxtImg :src="blog.main_image" :alt="blog.main_image_alt || blog.title" loading="lazy" />
    </div>
    <div class="body">
      <div class="text">
        <p v-if="blog.tags?.length" class="tags">
          {{ blog.tags.map((t) => t.title).join(' · ') }}
        </p>
        <h3 class="title">{{ blog.title }}</h3>
        <p v-if="blog.description" class="excerpt">{{ blog.description }}</p>
      </div>
      <div class="footer">
        <div class="author">
          <span class="author-name">{{ articleAuthor(blog) }}</span>
          <span v-if="meta" class="meta">{{ meta }}</span>
        </div>
        <img class="arrow" src="/images/articles/arrow-right.svg" width="24" height="24" alt="" aria-hidden="true" />
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped lang="scss">
.article-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: $white;
  border: 1px solid #f0f0f0;
  transition: background-color 0.2s ease;

  &:hover {
    background: $surface-cream;

    .image img {
      transform: scale(1.04);
    }

    .arrow {
      transform: translateX(4px);
    }
  }

  &.wide {
    grid-column: span 2;
    flex-direction: row;

    .image {
      flex: 0 0 50%;
      aspect-ratio: auto;
      min-height: 30rem;
    }

    .title.title {
      @include type-h3;
      text-transform: uppercase;
    }

    .excerpt.excerpt {
      @include type-body;
      -webkit-line-clamp: 5;
    }

    @media screen and (max-width: 600px) {
      grid-column: auto;
      flex-direction: column;

      .image {
        flex: none;
        aspect-ratio: 3 / 2;
      }
    }
  }
}

.image {
  aspect-ratio: 3 / 2;
  overflow: hidden;
  background: $surface-cream;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease;
  }
}

.body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2.4rem;
  padding: 3.2rem;

  @media screen and (max-width: 600px) {
    padding: 2.4rem;
  }
}

.text {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.tags.tags {
  @include type-caption;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: $primary-400;
  margin: 0;
}

.title.title {
  @include type-large;
  text-transform: uppercase;
  color: $primary-600;
  margin: 0;
}

.excerpt.excerpt {
  @include type-caption;
  color: $primary-700;
  opacity: 0.8;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.footer {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.6rem;
}

.author {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.author-name.author-name {
  @include type-button;
  font-size: 16px;
  color: $primary-700;
}

.meta.meta {
  @include type-caption;
  color: #6b7280;
}

.arrow {
  flex-shrink: 0;
  transition: transform 0.2s ease;
}
</style>
