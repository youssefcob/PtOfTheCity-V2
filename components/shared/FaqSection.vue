<script setup lang="ts">
import { ref } from 'vue';
import EditableText from '~/components/Admin/EditableText.vue';
import type { FAQs } from '~/sharedComponents/FAQs/FAQs';

const props = defineProps<{
  pageKey: string;
  titleDefault: string;
  subtitleDefault: string;
  faqs: FAQs[];
}>();

const openIndex = ref<number | null>(0);
const toggle = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index;
};
</script>

<template>
  <div class="faq-section">
    <div class="faq-header">
      <EditableText tag="h2" class="title" :content-key="`${pageKey}.faq.title`" :default="titleDefault" />
      <EditableText tag="p" class="subtitle" :content-key="`${pageKey}.faq.subtitle`" :default="subtitleDefault" />
    </div>

    <div class="faq-list">
      <div class="faq-item" v-for="(faq, index) in faqs" :key="index" :class="{ open: openIndex === index }">
        <button type="button" class="faq-question" @click="toggle(index)" :aria-expanded="openIndex === index">
          <span>{{ faq.question }}</span>
          <span class="icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </span>
        </button>
        <div class="faq-answer" v-if="openIndex === index">
          <p>{{ faq.answer }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.faq-section {
  @include pagePadding();
  padding-top: 4rem;
  padding-bottom: 4rem;
  display: flex;
  gap: 2rem;
  background-color: $surface-cream;

  @media screen and (max-width: 900px) {
    flex-direction: column;
  }
}

.faq-header {
  width: 25%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex-shrink: 0;

  @media screen and (max-width: 900px) {
    width: 100%;
  }

  .title {
    @include type-h2;
    color: $primary-600;
    text-transform: uppercase;
    margin: 0;
  }

  .subtitle {
    @include type-body;
    color: $primary-700;
    margin: 0;
  }
}

.faq-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.faq-item {
  background-color: $white;
  border: 1px solid rgba(0, 0, 0, 0.07);
  border-radius: 1rem;
  overflow: hidden;

  &.open .icon {
    transform: rotate(45deg);
  }
}

.faq-question {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.875rem 1.75rem;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  @include type-body;
  color: $primary-700;

  .icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 999px;
    background-color: rgba(0, 0, 0, 0.04);
    border: 1px solid rgba(0, 0, 0, 0.08);
    transition: transform 0.2s ease;
  }
}

.faq-answer {
  padding: 0 1.75rem 1.25rem;

  p {
    @include type-body;
    color: $primary-700;
    margin: 0;
  }
}
</style>
