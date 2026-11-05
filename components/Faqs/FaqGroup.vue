<script setup lang="ts">
import type { FAQs } from '~/sharedComponents/FAQs/FAQs';

const props = defineProps<{
  id: string;
  title: string;
  faqs: FAQs[];
}>();

// First question of each group starts open, as on the old page.
const openIndex = ref<number | null>(0);
const toggle = (i: number) => {
  openIndex.value = openIndex.value === i ? null : i;
};
const panelId = (i: number) => `${props.id}-panel-${i}`;
</script>

<template>
  <section :id="id" class="faq-group">
    <h2 class="group-title">{{ title }}</h2>

    <div class="list">
      <div v-for="(faq, i) in faqs" :key="i" class="item" :class="{ open: openIndex === i }">
        <button type="button" class="question" :aria-expanded="openIndex === i" :aria-controls="panelId(i)"
          @click="toggle(i)">
          <span class="question-text">{{ faq.question }}</span>
          <span class="icon" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </span>
        </button>

        <div :id="panelId(i)" class="answer" role="region">
          <!-- answers are admin-authored HTML (<p>, <ul>) from the API -->
          <div class="answer-inner">
            <div class="answer-body" v-html="faq.answer" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.faq-group {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  // keep the heading clear of the fixed navbar when jumped to from the category list
  scroll-margin-top: calc(#{$navbarHeight} + 2rem);
}

.group-title.group-title {
  @include type-h3;
  text-transform: uppercase;
  color: $primary-600;
  margin: 0;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.item {
  background: $white;
  border: 1px solid rgba(3, 41, 46, 0.1);
  border-radius: 1rem;
  overflow: hidden;
  transition: border-color 0.2s ease;

  &:hover,
  &.open {
    border-color: rgba(21, 112, 124, 0.45);
  }

  &.open .icon {
    transform: rotate(45deg);
    background: $primary-400;
    border-color: $primary-400;
    color: $white;
  }

  &.open .answer {
    grid-template-rows: 1fr;
  }
}

.question {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;
  padding: 2rem 2.4rem;
  border: none;
  background: none;
  cursor: pointer;
  text-align: left;
  color: $primary-700;
}

.question-text.question-text {
  @include type-large;
  font-weight: 500;
  color: $primary-600;
}

.icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 999px;
  border: 1px solid rgba(3, 41, 46, 0.15);
  color: $primary-700;
  transition: transform 0.2s ease, background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

// 0fr -> 1fr animates the panel height without measuring it.
.answer {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.25s ease;
}

.answer-inner {
  min-height: 0;
  overflow: hidden;
}

// padding sits on the inner element so the closed (0fr) panel collapses fully
.answer-body {
  padding: 0 2.4rem 1.2rem;
  @include type-body;
  color: $primary-700;

  :deep(p),
  :deep(ul),
  :deep(ol) {
    @include type-body;
    color: $primary-700;
    margin: 0 0 1.2rem;
  }

  :deep(ul),
  :deep(ol) {
    padding-left: 2.4rem;
  }

  :deep(li) {
    @include type-body;
    color: $primary-700;
    margin-bottom: 0.4rem;
  }

  :deep(a) {
    color: $primary-400;
    text-decoration: underline;
  }
}
</style>
