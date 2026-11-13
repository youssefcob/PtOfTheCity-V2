<script setup lang="ts">
import EditableText from '~/components/Admin/EditableText.vue';
import EditableImage from '~/components/Admin/EditableImage.vue';
import { placeholderImage } from '~/composables/useContentPlaceholders';
import { vReveal } from '~/composables/useScrollReveal';

const ck = (s: string) => `about.leadership.${s}`;
</script>

<template>
  <section class="about-leadership">
    <!-- placeholder until a real portrait is uploaded; the Figma has a "water caustic" shader fill here -->
    <div class="portrait">
      <EditableImage :content-key="ck('image')" :default-src="placeholderImage(972, 682, 'Leadership')"
        default-alt="Dr. Mahmoud Shalaby, CEO and Co-Founder of PT of the City" :width="972" :height="682" />
    </div>

    <div class="copy">
      <EditableText v-reveal="'drop'" tag="p" class="eyebrow" :content-key="ck('eyebrow')" default="Leadership" />
      <EditableText v-reveal="'rise'" tag="h2" class="name" :content-key="ck('name')"
        default="Dr. Mahmoud Shalaby, PT, DPT" />
      <EditableText v-reveal="'rise'" tag="p" class="role" :content-key="ck('role')" default="CEO & Co-Founder" />
      <EditableText v-reveal="'rise'" tag="p" class="bio" :content-key="ck('bio')"
        default="Dr. Mahmoud Shalaby co-founded PT of the City with a vision to make exceptional physical therapy more accessible across New York. Through patient-centered care, clinical excellence, and a commitment to community, he continues to lead a team focused on helping people move with confidence and live healthier lives." />
      <NuxtLink to="/blogs" class="articles-link">
        <EditableText tag="span" :content-key="ck('link_label')" default="Read Articles by Dr. Shalaby" />
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped lang="scss">
.about-leadership {
  display: flex;
  align-items: flex-start;
  gap: 2.4rem;
  @include pagePadding();

  @media screen and (max-width: 900px) {
    flex-direction: column;

    .copy {
      flex: 0 0 auto;
    }
  }

  :deep(span) {
    color: inherit;
  }
}

.portrait {
  // may shrink on narrower screens so it never overlaps the copy
  flex: 0 1 48.6rem;
  min-width: 0;
  height: 34.1rem;
  overflow: hidden;

  @media screen and (max-width: 900px) {
    display: none;
  }
}

.copy {
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.8rem;
  max-width: 69rem;
  color: $primary-700;
}

.eyebrow {
  // global h2/h3/p rules in _classes.scss would otherwise set their own color
  color: inherit;
  @include type-overline;
}

.name {
  @include type-h3;
  text-transform: uppercase;
  color: $primary-600;
}

.role,
.bio {
  color: inherit;
  @include type-body;
}

// In the Figma this link sits 2.3rem below the bio (at the portrait's bottom edge)
.articles-link {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  margin-top: 1.5rem;
  padding: 0.8rem 1.6rem 0.8rem 0;
  @include type-body;
  color: $primary-700;

  &:hover {
    color: $primary-400;
  }
}
</style>
