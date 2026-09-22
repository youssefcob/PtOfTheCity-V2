<script setup lang="ts">
import { computed, ref } from 'vue';
import EditableText from '~/components/Admin/EditableText.vue';
import { FEATURES } from '~/config/features';
import { useInjectedPageContent } from '~/composables/usePageContent';
import type { FAQs } from '~/sharedComponents/FAQs/FAQs';

const props = withDefaults(
  defineProps<{
    pageKey: string;
    titleDefault: string;
    subtitleDefault: string;
    faqs?: FAQs[];
  }>(),
  { faqs: () => [] },
);

const { contentMap, page, isContentEditor } = useInjectedPageContent();
const { saveText } = useContentApi();
const { editModeEnabled } = useEditorState();

// Edit controls (add / remove / hide) show only for a signed-in content
// editor with edit mode on.
const canEdit = computed(
  () => isContentEditor.value && editModeEnabled.value && FEATURES.textEditing,
);

// All per-page FAQ state lives in the same generic key/value content store
// EditableText already uses - no dedicated endpoint:
//   <pageKey>.faq.hidden                  "true" -> section hidden on this page
//   <pageKey>.faq.ids                     JSON string[] of item ids + order
//   <pageKey>.faq.item.<id>.question      question text (via EditableText)
//   <pageKey>.faq.item.<id>.answer        answer text (via EditableText)
// Local overrides are layered on top of contentMap so button clicks apply
// instantly instead of waiting for a refetch (same approach as Services.vue).
const key = (suffix: string) => `${props.pageKey}.faq.${suffix}`;

const localHidden = ref<string | null>(null);
const localIds = ref<string[] | null>(null);

const hidden = computed(
  () => (localHidden.value ?? contentMap.value[key('hidden')]?.value) === 'true',
);

// Seed items from whatever the page passed in (usually API FAQs). Their ids
// are index-based so an admin's first edit to an unmodified list still lands
// on a stable key.
const seedItems = computed(() =>
  (props.faqs ?? []).map((f, i) => ({
    id: `seed-${i}`,
    question: f.question,
    answer: f.answer,
  })),
);

const persistedIds = computed<string[] | null>(() => {
  const raw = localIds.value
    ? JSON.stringify(localIds.value)
    : contentMap.value[key('ids')]?.value;
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(String) : null;
  } catch {
    return null;
  }
});

// The rendered list: persisted id order once an admin has added/removed/
// reordered anything, otherwise the seed order. Defaults carry the seed text
// through so existing FAQs render as their real copy until edited.
const items = computed(() => {
  const seedById = new Map(seedItems.value.map((s) => [s.id, s]));
  const ids = persistedIds.value ?? seedItems.value.map((s) => s.id);
  return ids.map((id) => ({
    id,
    questionDefault: seedById.get(id)?.question ?? '',
    answerDefault: seedById.get(id)?.answer ?? '',
  }));
});

const currentIds = computed(() => items.value.map((i) => i.id));

const openIndex = ref<number | null>(0);
const toggle = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index;
};

async function persist(suffix: string, value: string, rollback: () => void) {
  try {
    await saveText(key(suffix), page, value);
  } catch (err) {
    console.error('Failed to save FAQ setting', key(suffix), err);
    rollback();
  }
}

function saveIds(next: string[]) {
  const previous = localIds.value;
  localIds.value = next;
  persist('ids', JSON.stringify(next), () => {
    localIds.value = previous;
  });
}

function addItem() {
  const id = `i${Date.now().toString(36)}`;
  saveIds([...currentIds.value, id]);
  openIndex.value = currentIds.value.length - 1; // open the new (last) row
}

function removeItem(id: string) {
  saveIds(currentIds.value.filter((x) => x !== id));
}

function setHidden(value: boolean) {
  const previous = localHidden.value;
  localHidden.value = value ? 'true' : 'false';
  persist('hidden', value ? 'true' : 'false', () => {
    localHidden.value = previous;
  });
}
</script>

<template>
  <div
    v-if="!hidden || canEdit"
    class="faq-section"
    :class="{ 'faq-section--hidden': hidden }"
  >
    <div class="faq-header">
      <EditableText
        tag="h2"
        class="title"
        :content-key="`${pageKey}.faq.title`"
        :default="titleDefault"
      />
      <EditableText
        tag="p"
        class="subtitle"
        :content-key="`${pageKey}.faq.subtitle`"
        :default="subtitleDefault"
      />

      <div v-if="canEdit" class="faq-admin">
        <span v-if="hidden" class="faq-admin-flag">Hidden on this page</span>
        <button type="button" class="faq-admin-btn" @click="setHidden(!hidden)">
          {{ hidden ? 'Show section' : 'Hide section' }}
        </button>
      </div>
    </div>

    <div class="faq-list">
      <div
        class="faq-item"
        v-for="(item, index) in items"
        :key="item.id"
        :class="{ open: openIndex === index }"
      >
        <button
          type="button"
          class="faq-question"
          @click="toggle(index)"
          :aria-expanded="openIndex === index"
        >
          <EditableText
            tag="span"
            :content-key="`${pageKey}.faq.item.${item.id}.question`"
            :default="item.questionDefault || 'New question'"
          />
          <span class="icon">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </span>
        </button>

        <div class="faq-answer" v-if="openIndex === index || canEdit">
          <EditableText
            tag="p"
            :content-key="`${pageKey}.faq.item.${item.id}.answer`"
            :default="item.answerDefault || 'New answer'"
          />
        </div>

        <button
          v-if="canEdit"
          type="button"
          class="faq-remove"
          @click="removeItem(item.id)"
        >
          Remove question
        </button>
      </div>

      <button v-if="canEdit" type="button" class="faq-add" @click="addItem">
        + Add question
      </button>
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

.faq-section--hidden {
  opacity: 0.55;
  outline: 1.5px dashed rgba(0, 0, 0, 0.25);
  outline-offset: -0.75rem;
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

.faq-admin {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.faq-admin-flag {
  @include type-caption;
  color: #b23b2e;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.faq-admin-btn,
.faq-remove,
.faq-add {
  border: 1px solid rgba(0, 0, 0, 0.2);
  background: #ffffff;
  color: $primary-700;
  border-radius: 999px;
  padding: 0.45rem 1rem;
  font-family: $font-poppins;
  font-size: 1.3rem;
  cursor: pointer;

  &:hover {
    background: $surface-teal-pale;
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

.faq-remove {
  margin: 0 1.75rem 1.25rem;
}

.faq-add {
  align-self: flex-start;
  margin-top: 0.5rem;
}
</style>
