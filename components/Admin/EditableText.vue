<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core';
import { FEATURES } from '~/config/features';
import { CONTENT_TEXT_PLACEHOLDER } from '~/composables/useContentPlaceholders';
import { useInjectedPageContent } from '~/composables/usePageContent';
import { resolveTextStyleCss, resolveMobileTextStyleOverrideCss } from '~/composables/useTextStyleCss';
import type { EditableTag, LinkTarget } from '~/types/content';
import { escapeSource, hasBlockHtml, renderRichText } from '~/utils/richText';

const props = withDefaults(defineProps<{
  contentKey: string;
  tag?: EditableTag;
  default?: string;
}>(), {
  tag: 'span',
});

const { contentMap, page, isContentEditor, textStyles } = useInjectedPageContent();
const { saveText } = useContentApi();
const { editModeEnabled, activeEditableField, setActiveEditableField } = useEditorState();
const toast = useToast();

const notifySaved = () => toast.success({ message: 'Changes saved' });
// The toolbar's link URL input saves on every keystroke - debounce so typing
// a URL raises one toast rather than one per character.
const notifySavedDebounced = useDebounceFn(notifySaved, 800);

const saveSetting = async (options: Parameters<typeof saveText>[3]) => {
  await saveText(props.contentKey, page, localValue.value, options);
  notifySavedDebounced();
};

const dbEntry = contentMap.value[props.contentKey];

const localValue = ref(dbEntry?.value || props.default || CONTENT_TEXT_PLACEHOLDER);
const effectiveTag = ref<EditableTag>(dbEntry?.tag || props.tag);
const textStyleId = ref<number | null>(dbEntry?.text_style_id ?? null);
const href = ref(dbEntry?.href || '');
const target = ref<LinkTarget>(dbEntry?.target || '_self');

const canEdit = computed(() => isContentEditor.value && editModeEnabled.value && FEATURES.textEditing);

const appliedTextStyle = computed(() => {
  if (!FEATURES.textStyles || textStyleId.value == null) return null;
  return textStyles.value.find((s) => s.id === textStyleId.value) ?? null;
});

const activeStyle = computed(() => resolveTextStyleCss(appliedTextStyle.value));

// A mobile color override can't be expressed via the same :style binding
// (inline styles aren't media-query-aware) - it needs a real stylesheet rule,
// injected reactively and scoped to this field via the data-cms-key selector.
const mobileOverrideCss = computed(() => resolveMobileTextStyleOverrideCss(appliedTextStyle.value, props.contentKey));

useHead({
  style: computed(() =>
    mobileOverrideCss.value ? [{ key: `cms-mobile-style-${props.contentKey}`, innerHTML: mobileOverrideCss.value }] : [],
  ),
});

const rel = computed(() => (effectiveTag.value === 'a' && target.value === '_blank' ? 'noopener noreferrer' : undefined));

// Edit mode shows the source, tags included; otherwise the allowed HTML renders.
const displayHtml = computed(() => (canEdit.value ? escapeSource(localValue.value) : renderRichText(localValue.value)));

// <p>, headings and <span> can't legally contain paragraphs or lists (the
// browser would re-parse the SSR markup), so render those fields as a <div>.
const renderedTag = computed(() =>
  !canEdit.value && effectiveTag.value !== 'a' && hasBlockHtml(localValue.value) ? 'div' : effectiveTag.value,
);

const saving = ref(false);
const el = ref<HTMLElement | null>(null);
const isThisFieldActive = computed(() => activeEditableField.value?.kind === 'text' && activeEditableField.value.key === props.contentKey);

// Editable cards are often nested inside a NuxtLink (whole-card navigation),
// and a field itself can become a real <a> - stop the click reaching either
// while an admin is actively editing, so opening the toolbar / placing a
// cursor doesn't also navigate away.
// Setters mutate both the local ref (so this component re-renders) and the
// active-field object the toolbar reads from (so the toolbar sees the change
// too) - it's a plain object snapshot from when the toolbar opened, not
// reactively linked back to this component's own refs.
const isThisFieldStillActive = () =>
  activeEditableField.value?.kind === 'text' && activeEditableField.value.key === props.contentKey;

const onClick = () => {
  if (!canEdit.value || !el.value) return;

  setActiveEditableField({
    kind: 'text',
    key: props.contentKey,
    page,
    el: el.value,
    tag: effectiveTag.value,
    textStyleId: textStyleId.value,
    href: href.value,
    target: target.value,
    setTag: (newTag) => {
      effectiveTag.value = newTag;
      if (isThisFieldStillActive()) (activeEditableField.value as any).tag = newTag;
      saveSetting({ tag: newTag });
    },
    setTextStyleId: (id) => {
      textStyleId.value = id;
      if (isThisFieldStillActive()) (activeEditableField.value as any).textStyleId = id;
      saveSetting({ textStyleId: id });
    },
    setHref: (newHref) => {
      href.value = newHref;
      if (isThisFieldStillActive()) (activeEditableField.value as any).href = newHref;
      saveSetting({ href: newHref });
    },
    setTarget: (newTarget) => {
      target.value = newTarget;
      if (isThisFieldStillActive()) (activeEditableField.value as any).target = newTarget;
      saveSetting({ target: newTarget });
    },
  });
};

// mousedown: stopPropagation only - do NOT preventDefault here, that
// suppresses the browser's default focus-on-click behavior for the
// contenteditable element in some browsers, breaking the ability to type.
const onMousedown = (e: Event) => {
  if (!canEdit.value) return;
  e.stopPropagation();
};

// click: stopPropagation + preventDefault. preventDefault is required even
// when this field's own tag isn't 'a': stopPropagation alone only blocks JS
// listeners (like NuxtLink's own click handler) from firing - it does NOT
// stop the browser's native anchor navigation when this field is nested
// inside a *different* NuxtLink wrapper (e.g. a button/link label), which
// fires regardless of propagation unless something calls preventDefault
// somewhere in the dispatch chain.
const onFieldClick = (e: MouseEvent) => {
  if (!canEdit.value) return;
  e.stopPropagation();
  e.preventDefault();
  onClick();
};

const onBlur = async () => {
  if (!canEdit.value || !el.value) return;
  const newText = el.value.innerText.trim();

  if (!newText) {
    el.value.innerText = localValue.value;
    return;
  }
  if (newText === localValue.value) return;

  const previous = localValue.value;
  localValue.value = newText;
  saving.value = true;
  try {
    await saveText(props.contentKey, page, newText);
    notifySaved();
  } catch (err) {
    console.error('Failed to save content', props.contentKey, err);
    localValue.value = previous;
    el.value.innerText = previous;
  } finally {
    saving.value = false;
  }
};
</script>

<template>
  <component
    :is="renderedTag"
    ref="el"
    :data-cms-key="contentKey"
    :contenteditable="canEdit"
    :href="effectiveTag === 'a' ? href : undefined"
    :target="effectiveTag === 'a' ? target : undefined"
    :rel="rel"
    :style="activeStyle"
    class="cms-editable-text"
    :class="{ 'cms-is-editable': canEdit, 'cms-is-saving': saving, 'cms-is-active': isThisFieldActive }"
    @blur="onBlur"
    @click="onFieldClick"
    @mousedown="onMousedown"
    :innerHTML="displayHtml"
  />
</template>

<style scoped lang="scss">
// The global `p` / `li` rules would otherwise override the field's own
// typography for HTML entered into it.
.cms-editable-text {
  :deep(p),
  :deep(ul),
  :deep(ol),
  :deep(li) {
    font: inherit;
    color: inherit;
    letter-spacing: inherit;
  }

  :deep(p),
  :deep(ul),
  :deep(ol) {
    margin: 0 0 1em;

    &:last-child {
      margin-bottom: 0;
    }
  }

  :deep(ul),
  :deep(ol) {
    padding-left: 2rem;
  }

  :deep(ul) {
    list-style: disc;
  }

  :deep(ol) {
    list-style: decimal;
  }

  :deep(li) {
    margin: 0;
  }
}

.cms-is-editable {
  outline: 1.5px dashed transparent;
  outline-offset: 2px;
  border-radius: 2px;
  cursor: text;
  // keep the source's line breaks, so innerText doesn't lose them on save
  white-space: pre-wrap;
  transition: outline-color 0.15s ease-in-out;

  &:hover,
  &:focus {
    outline-color: rgba(255, 155, 55, 0.8);
  }
}

.cms-is-active {
  outline-color: rgba(255, 155, 55, 0.8);
}

.cms-is-saving {
  opacity: 0.6;
}
</style>
