<script setup lang="ts">
import type { EditableTag, LinkTarget } from '~/types/content';
import { useInjectedPageContent } from '~/composables/usePageContent';

const { activeEditableField, setActiveEditableField } = useEditorState();
const { textStyles } = useInjectedPageContent();

const hostEl = ref<HTMLElement | null>(null);
const position = ref({ top: 0, left: 0 });

const TAG_OPTIONS: { value: EditableTag; label: string }[] = [
  { value: 'h1', label: 'H1' },
  { value: 'h2', label: 'H2' },
  { value: 'h3', label: 'H3' },
  { value: 'h4', label: 'H4' },
  { value: 'p', label: 'Paragraph' },
  { value: 'span', label: 'Span' },
  { value: 'a', label: 'Link' },
];

const OBJECT_FIT_OPTIONS = ['cover', 'contain', 'fill', 'none', 'scale-down'];

// Each arrow nudges the current position by NUDGE_STEP percentage points in
// that direction instead of jumping straight to an edge/corner - the center
// button is the only one that jumps (it resets to dead center).
const NUDGE_STEP = 5;
const KEYWORD_TO_PERCENT: Record<string, number> = { left: 0, top: 0, center: 50, right: 100, bottom: 100 };

const parsePositionComponent = (raw: string | undefined): number => {
  if (!raw) return 50;
  if (raw.endsWith('%')) {
    const n = parseFloat(raw);
    return Number.isNaN(n) ? 50 : n;
  }
  return KEYWORD_TO_PERCENT[raw] ?? 50;
};

const parsePosition = (pos: string): { x: number; y: number } => {
  const parts = pos.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) {
    const v = parsePositionComponent(parts[0]);
    return { x: v, y: v };
  }
  return { x: parsePositionComponent(parts[0]), y: parsePositionComponent(parts[1]) };
};

const clampPercent = (n: number) => Math.max(0, Math.min(100, n));

const NUDGE_GRID: { dx: number; dy: number; label: string; title: string }[] = [
  { dx: -1, dy: -1, label: '↖', title: 'Nudge up-left' },
  { dx: 0, dy: -1, label: '↑', title: 'Nudge up' },
  { dx: 1, dy: -1, label: '↗', title: 'Nudge up-right' },
  { dx: -1, dy: 0, label: '←', title: 'Nudge left' },
  { dx: 0, dy: 0, label: '•', title: 'Reset to center' },
  { dx: 1, dy: 0, label: '→', title: 'Nudge right' },
  { dx: -1, dy: 1, label: '↙', title: 'Nudge down-left' },
  { dx: 0, dy: 1, label: '↓', title: 'Nudge down' },
  { dx: 1, dy: 1, label: '↘', title: 'Nudge down-right' },
];

const currentPosition = computed(() =>
  activeEditableField.value?.kind === 'image' ? parsePosition(activeEditableField.value.objectPosition) : { x: 50, y: 50 },
);

const nudgePosition = (dx: number, dy: number) => {
  if (activeEditableField.value?.kind !== 'image') return;
  if (dx === 0 && dy === 0) {
    activeEditableField.value.setObjectPosition('50% 50%');
    return;
  }
  const { x, y } = currentPosition.value;
  const nx = clampPercent(x + dx * NUDGE_STEP);
  const ny = clampPercent(y + dy * NUDGE_STEP);
  activeEditableField.value.setObjectPosition(`${nx}% ${ny}%`);
};

const reposition = () => {
  const field = activeEditableField.value;
  if (!field) return;
  const rect = field.el.getBoundingClientRect();
  const hostHeight = hostEl.value?.offsetHeight ?? 60;
  const hostWidth = hostEl.value?.offsetWidth ?? 280;

  let top = rect.top - hostHeight - 8;
  if (top < 8) top = rect.bottom + 8;

  let left = rect.left;
  const maxLeft = window.innerWidth - hostWidth - 8;
  if (left > maxLeft) left = Math.max(8, maxLeft);
  if (left < 8) left = 8;

  position.value = { top, left };
};

watch(activeEditableField, async (field) => {
  if (!field) return;
  await nextTick();
  reposition();
});

const onScrollOrResize = () => {
  if (activeEditableField.value) reposition();
};

const onDocumentMousedown = (e: MouseEvent) => {
  const field = activeEditableField.value;
  if (!field) return;
  const target = e.target as Node;
  if (hostEl.value?.contains(target)) return;
  if (field.el.contains(target)) return;
  setActiveEditableField(null);
};

onMounted(() => {
  window.addEventListener('scroll', onScrollOrResize, true);
  window.addEventListener('resize', onScrollOrResize);
  document.addEventListener('mousedown', onDocumentMousedown);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScrollOrResize, true);
  window.removeEventListener('resize', onScrollOrResize);
  document.removeEventListener('mousedown', onDocumentMousedown);
});

const altDraft = computed({
  get: () => (activeEditableField.value?.kind === 'image' ? activeEditableField.value.alt : ''),
  set: (val: string) => {
    if (activeEditableField.value?.kind === 'image') activeEditableField.value.setAlt(val);
  },
});

const hrefDraft = computed({
  get: () => (activeEditableField.value?.kind === 'text' ? activeEditableField.value.href : ''),
  set: (val: string) => {
    if (activeEditableField.value?.kind === 'text') activeEditableField.value.setHref(val);
  },
});
</script>

<template>
  <div
    v-if="activeEditableField"
    ref="hostEl"
    class="cms-toolbar"
    :style="{ top: position.top + 'px', left: position.left + 'px' }"
  >
    <template v-if="activeEditableField.kind === 'text'">
      <div class="cms-toolbar-row">
        <label>
          Tag
          <select :value="activeEditableField.tag" @change="activeEditableField.setTag(($event.target as HTMLSelectElement).value as EditableTag)">
            <option v-for="opt in TAG_OPTIONS" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
          </select>
        </label>

        <label>
          Style
          <select
            :value="activeEditableField.textStyleId ?? ''"
            @change="activeEditableField.setTextStyleId(($event.target as HTMLSelectElement).value ? Number(($event.target as HTMLSelectElement).value) : null)"
          >
            <option value="">Default</option>
            <option v-for="style in textStyles" :key="style.id" :value="style.id">{{ style.name }}</option>
          </select>
        </label>
      </div>

      <div v-if="activeEditableField.tag === 'a'" class="cms-toolbar-row">
        <label class="cms-toolbar-grow">
          Link URL
          <input v-model="hrefDraft" type="text" placeholder="https://... or /apply" />
        </label>
        <label>
          Opens
          <select :value="activeEditableField.target" @change="activeEditableField.setTarget(($event.target as HTMLSelectElement).value as LinkTarget)">
            <option value="_self">Same tab</option>
            <option value="_blank">New tab</option>
          </select>
        </label>
      </div>
    </template>

    <template v-else-if="activeEditableField.kind === 'image'">
      <div class="cms-toolbar-row">
        <button type="button" class="cms-toolbar-btn" :disabled="activeEditableField.uploading" @click="activeEditableField.triggerFilePicker()">
          {{ activeEditableField.uploading ? 'Uploading…' : 'Replace Image' }}
        </button>

        <label>
          Fit
          <select :value="activeEditableField.objectFit" @change="activeEditableField.setObjectFit(($event.target as HTMLSelectElement).value)">
            <option v-for="opt in OBJECT_FIT_OPTIONS" :key="opt" :value="opt">{{ opt }}</option>
          </select>
        </label>
      </div>

      <div class="cms-toolbar-row">
        <div class="cms-position-block">
          <div class="cms-position-grid">
            <button
              v-for="cell in NUDGE_GRID"
              :key="cell.label"
              type="button"
              class="cms-position-cell"
              :class="{ center: cell.dx === 0 && cell.dy === 0 }"
              :title="cell.title"
              @click="nudgePosition(cell.dx, cell.dy)"
            >{{ cell.label }}</button>
          </div>
          <span class="cms-position-readout">{{ Math.round(currentPosition.x) }}%, {{ Math.round(currentPosition.y) }}%</span>
        </div>

        <label class="cms-toolbar-grow">
          Alt text (SEO)
          <input v-model="altDraft" type="text" placeholder="Describe this image for SEO" />
        </label>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.cms-toolbar {
  position: fixed;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 18rem;
  max-width: 26rem;
  padding: 0.75rem;
  border-radius: 0.6rem;
  background-color: #0f2b3d;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.cms-toolbar-row {
  display: flex;
  align-items: flex-end;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.cms-toolbar-grow {
  flex: 1;
  min-width: 10rem;
}

label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.7);
}

select,
input[type='text'] {
  padding: 0.4rem 0.5rem;
  border-radius: 0.4rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background-color: #16344a;
  color: #ffffff;
  font-size: 0.85rem;
  min-width: 7rem;
}

input[type='text'] {
  min-width: 100%;
}

.cms-toolbar-btn {
  padding: 0.5rem 0.9rem;
  border: none;
  border-radius: 80px;
  background-color: #ff9b37;
  color: #142235;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  white-space: nowrap;

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
}

.cms-position-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  flex-shrink: 0;
}

.cms-position-grid {
  display: grid;
  grid-template-columns: repeat(3, 1.6rem);
  grid-template-rows: repeat(3, 1.6rem);
  gap: 2px;
}

.cms-position-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background-color: #16344a;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;
  cursor: pointer;

  &:hover {
    background-color: #1d4863;
    color: #ffffff;
  }

  &.center {
    color: #ff9b37;
  }
}

.cms-position-readout {
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.6);
  white-space: nowrap;
}
</style>
