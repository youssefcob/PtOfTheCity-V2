<script setup lang="ts">
import { FEATURES } from '~/config/features';
import { useInjectedPageContent } from '~/composables/usePageContent';

const { isContentEditor } = useInjectedPageContent();
const { editModeEnabled, toggleEditMode } = useEditorState();
</script>

<template>
  <div v-if="isContentEditor" class="cms-toolbar-strip">
    <NuxtLink v-if="FEATURES.textStyles" to="/admin/text-styles" class="cms-strip-link">Manage Styles</NuxtLink>
    <NuxtLink v-if="FEATURES.metaTags" to="/admin/meta-tags" class="cms-strip-link">Manage Meta Tags</NuxtLink>
    <button
      type="button"
      class="cms-edit-toggle"
      :class="{ 'cms-edit-toggle--active': editModeEnabled }"
      @click="toggleEditMode"
    >
      {{ editModeEnabled ? 'Editing: On' : 'Edit Page' }}
    </button>
  </div>
</template>

<style scoped lang="scss">
.cms-toolbar-strip {
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
  z-index: 999;
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.cms-strip-link {
  padding: 0.7rem 1.1rem;
  border-radius: 80px;
  background-color: #16344a;
  color: #ffffff;
  font-weight: 600;
  font-size: 0.8rem;
  white-space: nowrap;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  transition: background-color 0.15s ease-in-out;

  &:hover {
    background-color: #0f2b3d;
  }
}

.cms-edit-toggle {
  padding: 0.85rem 1.5rem;
  border: none;
  border-radius: 80px;
  background-color: #142235;
  color: #ffffff;
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.15s ease-in-out;

  &:hover {
    background-color: #0f2b3d;
  }

  &.cms-edit-toggle--active {
    background-color: #ff9b37;
    color: #142235;
  }
}
</style>
