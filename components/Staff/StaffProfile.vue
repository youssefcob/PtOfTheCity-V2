<script setup lang="ts">
import EditableText from '~/components/Admin/EditableText.vue';
import EditableImage from '~/components/Admin/EditableImage.vue';
import { vReveal } from '~/composables/useScrollReveal';
import type { Staff } from '~/types/types';

const props = defineProps<{ staff: Staff }>();

const displayName = computed(() =>
  [props.staff.title, props.staff.first_name, props.staff.last_name].filter(Boolean).join(' '),
);

// Bios are stored with plain newlines; split into paragraphs instead of v-html
const paragraphs = computed(() =>
  (props.staff.bio || '')
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean),
);

const articlesLink = computed(() => `/blogs?author=${(props.staff.full_name || '').replaceAll(' ', '+')}`);
</script>

<template>
  <section class="staff-profile">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <NuxtLink to="/about">
        <EditableText tag="span" content-key="staff.breadcrumb.parent" default="About" />
      </NuxtLink>
      <span aria-hidden="true">&gt;</span>
      <span>{{ displayName }}</span>
    </nav>

    <div class="profile">
      <div v-reveal="'slide-in'" class="portrait">
        <EditableImage :content-key="`staff.${staff.id}.image`" :default-src="useImg(staff.image)"
          :default-alt="displayName" default-object-fit="cover" default-object-position="center top" />
      </div>

      <div class="copy">
        <p v-if="staff.occupation" v-reveal="'drop'" class="eyebrow">{{ staff.occupation }}</p>
        <h1 v-reveal="'rise'" class="name">{{ displayName }}</h1>
        <div v-reveal="'rise'" class="bio">
          <p v-for="(paragraph, i) in paragraphs" :key="i">{{ paragraph }}</p>
        </div>
        <NuxtLink :to="articlesLink" class="articles-link">
          <EditableText tag="span" content-key="staff.articles_link" default="Read Articles by this Author" />
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
$mobile: 900px;

.staff-profile {
  @include pagePadding();
  padding-top: 6.4rem;
  padding-bottom: 10.4rem;

  @media screen and (max-width: $mobile) {
    padding-top: 4rem;
    padding-bottom: 6.4rem;
  }

  // the global `span` rule in _classes.scss would otherwise restyle the editable labels
  :deep(span) {
    color: inherit;
    font: inherit;
    letter-spacing: inherit;
  }
}

.breadcrumb {
  display: flex;
  gap: 0.8rem;
  margin-bottom: 4rem;
  @include type-overline;
  color: $primary-700;

  a:hover {
    color: $primary-400;
  }

  @media screen and (max-width: $mobile) {
    display: none;
  }
}

.profile {
  display: flex;
  align-items: flex-start;
  gap: 6.4rem;

  @media screen and (max-width: $mobile) {
    flex-direction: column;
    align-items: stretch;
    gap: 2.4rem;
  }
}

.portrait {
  flex: 0 0 40rem;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  border-radius: 1.2rem;
  background-color: $surface-teal-pale;

  :deep(img) {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
  }

  @media screen and (max-width: $mobile) {
    flex-basis: auto;
    width: 100%;
    aspect-ratio: 1 / 1;
  }
}

.copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.6rem;
  min-width: 0;
  max-width: 69rem;
  padding-top: 1.6rem;
  color: $primary-700;

  @media screen and (max-width: $mobile) {
    padding-top: 0;
  }
}

.eyebrow {
  @include type-overline;
  color: $primary-700;
}

.name {
  @include type-h2;
  text-transform: uppercase;
  color: $primary-600;
}

.bio {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  p {
    margin: 0;
    @include type-body;
    color: $primary-700;
  }
}

.articles-link {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  margin-top: 0.8rem;
  padding: 0.8rem 1.6rem 0.8rem 0;
  @include type-button;
  color: $primary-700;

  &:hover {
    color: $primary-400;
  }
}
</style>
