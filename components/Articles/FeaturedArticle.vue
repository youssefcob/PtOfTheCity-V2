<script setup lang="ts">
import type { Blog } from '~/types/types';

const props = defineProps<{ blog: Blog }>();

const byline = computed(() => {
  const minutes = articleReadMinutes(props.blog);
  return [articleAuthor(props.blog), minutes ? `${minutes} min read` : articleDate(props.blog)]
    .filter(Boolean)
    .join(' · ');
});
</script>

<template>
  <section class="featured">
    <img class="texture" src="/images/home/texture-pattern.webp" alt="" aria-hidden="true" />
    <div class="image">
      <NuxtImg :src="blog.main_image" :alt="blog.main_image_alt || blog.title" />
    </div>
    <NuxtLink :to="articlePath(blog)" class="card">
      <p class="kicker">Featured Story</p>
      <div class="heading">
        <h2 class="title">{{ blog.title }}</h2>
        <p v-if="byline" class="byline">{{ byline }}</p>
      </div>
      <p v-if="blog.description" class="excerpt">{{ blog.description }}</p>
      <span class="link">
        Read Full Story
        <img src="/images/articles/arrow-up-right.svg" width="24" height="24" alt="" aria-hidden="true" />
      </span>
    </NuxtLink>
  </section>
</template>

<style scoped lang="scss">
.featured {
  position: relative;
  display: flex;
  height: 60rem;
  background-color: $primary-600;
  overflow: hidden;

  @media screen and (max-width: 900px) {
    flex-direction: column;
    height: auto;
  }
}

.texture {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.2;
  pointer-events: none;
}

.image {
  position: relative;
  width: 65%;
  height: 100%;

  @media screen and (max-width: 900px) {
    width: 100%;
    aspect-ratio: 4 / 3;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}

.card {
  position: absolute;
  top: 50%;
  left: 41%;
  right: $pageMargin;
  max-width: 73rem;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3.2rem;
  padding: 4.8rem;
  background: $white;
  filter: drop-shadow(0 24px 24px rgba(0, 0, 0, 0.13));

  @media screen and (max-width: 900px) {
    position: relative;
    top: auto;
    left: auto;
    right: auto;
    transform: none;
    margin: -6rem 1.6rem 4rem;
    padding: 3.2rem 2.4rem;
    gap: 2.4rem;
  }

  &:hover .link img {
    transform: rotate(180deg) translate(-3px, 3px);
  }
}

.kicker.kicker {
  @include type-overline;
  color: $primary-700;
  margin: 0;
}

.heading {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.title.title {
  @include type-h3;
  text-transform: uppercase;
  color: $primary-600;
  margin: 0;
}

.byline.byline,
.excerpt.excerpt {
  @include type-body;
  color: $primary-700;
  margin: 0;
}

.excerpt.excerpt {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.link {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1.6rem 0.8rem 0;
  @include type-button;
  color: $primary-700;

  img {
    // the exported icon points down-left; the design rotates it to up-right
    transform: rotate(180deg);
    transition: transform 0.2s ease;
  }
}
</style>
