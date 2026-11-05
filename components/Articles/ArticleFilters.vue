<script setup lang="ts">
import type { ArticleFilterState } from '~/utils/articleUtils';

const props = defineProps<{
  modelValue: ArticleFilterState;
  authors: string[];
  tags: string[];
}>();

const emit = defineEmits<{ 'update:modelValue': [value: ArticleFilterState] }>();

const update = (patch: Partial<ArticleFilterState>) => emit('update:modelValue', { ...props.modelValue, ...patch });

// Search is typed into a local ref and pushed up debounced; author/tags apply immediately.
const search = ref(props.modelValue.search);
watch(() => props.modelValue.search, (v) => {
  if (v !== search.value) search.value = v;
});
let searchTimer: ReturnType<typeof setTimeout>;
const onSearch = () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => update({ search: search.value.trim() }), 350);
};

const toggleTag = (tag: string) => {
  const tags = props.modelValue.tags.includes(tag)
    ? props.modelValue.tags.filter((t) => t !== tag)
    : [...props.modelValue.tags, tag];
  update({ tags });
};

const hasFilters = computed(() =>
  Boolean(props.modelValue.search || props.modelValue.author || props.modelValue.tags.length));

const clear = () => {
  clearTimeout(searchTimer);
  search.value = '';
  emit('update:modelValue', { search: '', author: '', tags: [] });
};
</script>

<template>
  <div class="article-filters">
    <div class="fields">
      <label class="field search">
        <span class="sr-only">Search articles</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <line x1="16.65" y1="16.65" x2="21" y2="21" />
        </svg>
        <input v-model="search" type="search" placeholder="Search articles" @input="onSearch" />
      </label>

      <label class="field author">
        <span class="sr-only">Filter by author</span>
        <select :value="modelValue.author" @change="update({ author: ($event.target as HTMLSelectElement).value })">
          <option value="">All authors</option>
          <option v-for="a in authors" :key="a" :value="a">{{ a }}</option>
        </select>
        <svg class="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </label>
    </div>

    <div v-if="tags.length" class="tags">
      <span class="tags-label">Filter by topic</span>
      <div class="tag-list">
        <button v-for="tag in tags" :key="tag" type="button" class="tag"
          :class="{ active: modelValue.tags.includes(tag) }" :aria-pressed="modelValue.tags.includes(tag)"
          @click="toggleTag(tag)">
          {{ tag }}
        </button>
      </div>
    </div>

    <button v-if="hasFilters" type="button" class="clear" @click="clear">Clear all filters</button>
  </div>
</template>

<style scoped lang="scss">
.article-filters {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
}

.fields {
  display: flex;
  gap: 1.6rem;

  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
}

.field {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 5.6rem;
  padding: 0 2rem;
  border: 1px solid rgba(3, 41, 46, 0.2);
  background: $white;
  color: $primary-700;

  &:focus-within {
    border-color: $primary-400;
  }

  svg {
    flex-shrink: 0;
  }

  input,
  select {
    flex: 1;
    min-width: 0;
    height: 100%;
    border: none;
    outline: none;
    background: transparent;
    @include type-body;
    color: $primary-700;
    padding: 0;
    margin: 0;
  }

  input::placeholder {
    color: rgba(1, 20, 23, 0.5);
  }
}

.search {
  flex: 3;
}

.author {
  flex: 2;

  select {
    appearance: none;
    cursor: pointer;
    padding-right: 3rem;
  }

  .chevron {
    position: absolute;
    right: 2rem;
    pointer-events: none;
  }
}

.tags {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.tags-label.tags-label {
  @include type-overline;
  font-size: 14px;
  color: $primary-700;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.8rem;
}

.tag,
.clear {
  @include type-caption;
  cursor: pointer;
  user-select: none;
}

.tag {
  padding: 0.6rem 1.6rem;
  border: 1px solid rgba(3, 41, 46, 0.2);
  border-radius: 20rem;
  background: $white;
  color: $primary-700;
  transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;

  &:hover {
    border-color: $primary-400;
  }

  &.active {
    background: $primary-400;
    border-color: $primary-400;
    color: $white;
  }
}

.clear {
  align-self: flex-start;
  margin-top: -0.8rem;
  padding: 0;
  border: none;
  background: none;
  color: $primary-400;
  text-decoration: underline;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
</style>
