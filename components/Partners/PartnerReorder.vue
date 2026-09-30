<script setup lang="ts">
// Admin-only move buttons for a partner, shown in edit mode. Styled plainly
// to read as tooling (same look as the service ordering controls on Home).
defineProps<{
  name: string;
  first: boolean;
  last: boolean;
  busy?: boolean;
}>();

defineEmits<{ (e: 'move', direction: -1 | 1): void }>();
</script>

<template>
  <div class="partner-reorder" @click.stop.prevent>
    <button type="button" class="admin-btn" :disabled="first || busy" :aria-label="`Move ${name} earlier`"
      @click="$emit('move', -1)">↑</button>
    <button type="button" class="admin-btn" :disabled="last || busy" :aria-label="`Move ${name} later`"
      @click="$emit('move', 1)">↓</button>
  </div>
</template>

<style scoped lang="scss">
.partner-reorder {
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;
  z-index: 2;
  display: flex;
  gap: 0.4rem;
}

.admin-btn {
  padding: 0.3rem 0.7rem;
  border: none;
  border-radius: 6px;
  background-color: #142235;
  color: #ffffff;
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 1.4;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;

  &:hover:not(:disabled) {
    background-color: #ff9b37;
    color: #142235;
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
}
</style>
