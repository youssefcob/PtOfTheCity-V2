<script setup lang="ts">
import { FEATURES } from '~/config/features';
import { CONTENT_TEXT_PLACEHOLDER } from '~/composables/useContentPlaceholders';
import { useInjectedPageContent } from '~/composables/usePageContent';
import { resolveTextStyleCss, resolveMobileTextStyleOverrideCss } from '~/composables/useTextStyleCss';
import type { EditableTag, LinkTarget } from '~/types/content';

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
      saveText(props.contentKey, page, localValue.value, { tag: newTag });
    },
    setTextStyleId: (id) => {
      textStyleId.value = id;
      if (isThisFieldStillActive()) (activeEditableField.value as any).textStyleId = id;
      saveText(props.contentKey, page, localValue.value, { textStyleId: id });
    },
    setHref: (newHref) => {
      href.value = newHref;
      if (isThisFieldStillActive()) (activeEditableField.value as any).href = newHref;
      saveText(props.contentKey, page, localValue.value, { href: newHref });
    },
    setTarget: (newTarget) => {
      target.value = newTarget;
      if (isThisFieldStillActive()) (activeEditableField.value as any).target = newTarget;
      saveText(props.contentKey, page, localValue.value, { target: newTarget });
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
    :is="effectiveTag"
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
  ><span v-once>{{ localValue }}</span></component>
</template>

<style scoped lang="scss">
// assets/css/main.scss has a global, unscoped `span { font-size: 1.4rem; ... }`
// rule that otherwise clobbers this wrapper span's inherited heading/paragraph
// styling - it never mattered before since raw text wasn't normally wrapped
// in a bare span. Higher specificity than that element selector wins here.
.cms-editable-text > span {
  font: inherit;
  color: inherit;
  letter-spacing: inherit;
}

.cms-is-editable {
  outline: 1.5px dashed transparent;
  outline-offset: 2px;
  border-radius: 2px;
  cursor: text;
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
