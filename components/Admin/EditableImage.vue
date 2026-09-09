<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { FEATURES } from '~/config/features';
import { placeholderImage } from '~/composables/useContentPlaceholders';
import { useInjectedPageContent } from '~/composables/usePageContent';

const props = withDefaults(defineProps<{
  contentKey: string;
  defaultSrc?: string;
  defaultAlt?: string;
  defaultObjectFit?: string;
  defaultObjectPosition?: string;
  width?: number;
  height?: number;
  loading?: 'eager' | 'lazy';
}>(), {
  width: 800,
  height: 600,
  loading: 'lazy',
  defaultObjectFit: 'cover',
  defaultObjectPosition: 'center center',
});

const { contentMap, page, isContentEditor } = useInjectedPageContent();
const { saveImage } = useContentApi();
const { editModeEnabled, activeEditableField, setActiveEditableField } = useEditorState();

const entry = contentMap.value[props.contentKey];
const src = ref(entry?.value || props.defaultSrc || placeholderImage(props.width, props.height));
const alt = ref(entry?.alt || props.defaultAlt || '');
const objectFit = ref(entry?.object_fit || props.defaultObjectFit);
const objectPosition = ref(entry?.object_position || props.defaultObjectPosition);

const canEdit = computed(() => isContentEditor.value && editModeEnabled.value && FEATURES.imageEditing);

const wrapEl = ref<HTMLElement | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const uploading = ref(false);
const isThisFieldActive = computed(() => activeEditableField.value?.kind === 'image' && activeEditableField.value.key === props.contentKey);

// objectFit/objectPosition are admin-chosen from a fixed dropdown/grid (see
// StyleToolbarHost) so the values are always valid CSS keywords at runtime -
// cast since they're stored as plain strings, not CSSProperties' literal union.
const imgStyle = computed<CSSProperties>(() => ({
  objectFit: objectFit.value as CSSProperties['objectFit'],
  objectPosition: objectPosition.value,
}));

const onClick = (e: MouseEvent) => {
  if (!canEdit.value || !wrapEl.value) return;
  // Editable images are often nested inside a whole-card NuxtLink -
  // stopPropagation alone blocks NuxtLink's own click listener, but the
  // browser's native anchor navigation still fires unless preventDefault is
  // also called (it isn't gated on propagation).
  e.stopPropagation();
  e.preventDefault();

  setActiveEditableField({
    kind: 'image',
    key: props.contentKey,
    page,
    el: wrapEl.value,
    objectFit: objectFit.value,
    objectPosition: objectPosition.value,
    alt: alt.value,
    uploading: uploading.value,
    triggerFilePicker: () => fileInput.value?.click(),
    setObjectFit: (fit) => {
      objectFit.value = fit;
      if (isThisFieldActive.value) (activeEditableField.value as any).objectFit = fit;
      saveImageMeta();
    },
    setObjectPosition: (pos) => {
      objectPosition.value = pos;
      if (isThisFieldActive.value) (activeEditableField.value as any).objectPosition = pos;
      saveImageMeta();
    },
    setAlt: (newAlt) => {
      alt.value = newAlt;
      if (isThisFieldActive.value) (activeEditableField.value as any).alt = newAlt;
      saveImageMeta();
    },
  });
};

// object-fit/position/alt changes save without a file - the endpoint updates
// only whichever fields are sent and leaves value/image_public_id untouched.
// 422s if there's no existing image row yet, which just means "upload one first."
//
// Debounced: the position nudge grid is meant to be clicked several times in
// quick succession for fine control, and each call fires an independent
// async request with no ordering guarantee - without debouncing, rapid
// clicks can complete out of order and persist a stale intermediate
// position instead of the final one. Only the state after the last click in
// a burst gets sent.
let saveImageMetaTimeout: ReturnType<typeof setTimeout> | null = null;
const saveImageMeta = () => {
  if (saveImageMetaTimeout) clearTimeout(saveImageMetaTimeout);
  saveImageMetaTimeout = setTimeout(async () => {
    try {
      await saveImage(props.contentKey, page, null, {
        alt: alt.value,
        objectFit: objectFit.value,
        objectPosition: objectPosition.value,
      });
    } catch (err) {
      console.error('Failed to save image metadata', props.contentKey, err);
    }
  }, 350);
};

const onFileChange = async (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file || !canEdit.value) return;

  uploading.value = true;
  if (activeEditableField.value?.kind === 'image' && activeEditableField.value.key === props.contentKey) {
    activeEditableField.value.uploading = true;
  }
  try {
    const res = await saveImage(props.contentKey, page, file, {
      alt: alt.value,
      objectFit: objectFit.value,
      objectPosition: objectPosition.value,
    });
    src.value = res.url;
  } catch (err) {
    console.error('Failed to upload image', props.contentKey, err);
  } finally {
    uploading.value = false;
    if (activeEditableField.value?.kind === 'image' && activeEditableField.value.key === props.contentKey) {
      activeEditableField.value.uploading = false;
    }
    if (fileInput.value) fileInput.value.value = '';
  }
};
</script>

<template>
  <div
    ref="wrapEl"
    class="cms-editable-image"
    :class="{ 'cms-is-editable': canEdit, 'cms-is-active': isThisFieldActive }"
    @click="onClick"
  >
    <img :src="src" :alt="alt" :loading="loading" :style="imgStyle" />
    <div v-if="canEdit" class="cms-image-overlay">
      <span class="cms-image-status">{{ uploading ? 'Uploading…' : 'Edit Image' }}</span>
    </div>
    <input
      ref="fileInput"
      type="file"
      accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
      class="cms-file-input"
      @change="onFileChange"
      @click.stop
    />
  </div>
</template>

<style scoped lang="scss">
.cms-editable-image {
  position: relative;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
  }
}

.cms-is-editable {
  cursor: pointer;
  outline: 1.5px dashed transparent;
  outline-offset: -3px;
  transition: outline-color 0.15s ease-in-out;

  &:hover {
    outline-color: rgba(255, 155, 55, 0.8);

    .cms-image-overlay {
      opacity: 1;
    }
  }
}

.cms-is-active {
  outline-color: rgba(255, 155, 55, 0.8);
}

.cms-image-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(15, 43, 61, 0.55);
  opacity: 0;
  transition: opacity 0.15s ease-in-out;
  pointer-events: none;
}

.cms-image-status {
  padding: 0.5rem 1rem;
  border-radius: 80px;
  background-color: #ff9b37;
  color: #142235;
  font-size: 0.85rem;
  font-weight: 600;
}

.cms-file-input {
  display: none;
}
</style>
