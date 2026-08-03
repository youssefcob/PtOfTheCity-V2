<template>
  <ClientOnly>
    <slot />
    <template #fallback>
      <div class="translate-loading">
        <div class="loading-text">Loading...</div>
      </div>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
// This component ensures translation content only renders on client side
// to prevent hydration mismatches
</script>

<style scoped>
.translate-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 2rem;
  
  .loading-text {
    font-size: 0.9rem;
    color: #666;
  }
}
</style> 