<script setup lang="ts">
// Renders a link when `href` is set (in-page CTAs), otherwise a <button>.
defineProps<{ href?: string }>();
</script>

<template>
  <component :is="href ? 'a' : 'button'" :href="href" class="crunch-btn">
    <slot />
    <slot name="icon" />
  </component>
</template>

<style scoped lang="scss">
.crunch-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-height: 62px;
  padding: 12px 24px;
  border-radius: 999px;
  background: $crunch-teal;
  color: $crunch-ink;
  font-family: $crunch-font-body;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.25;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;

  &:hover {
    background: color-mix(in srgb, $crunch-teal 88%, #000);
  }

  &:active {
    transform: translateY(1px);
  }

  &:focus-visible {
    outline: 3px solid $crunch-ink;
    outline-offset: 3px;
  }

  &:disabled {
    cursor: wait;
    opacity: 0.7;
  }

  @media screen and (max-width: 800px) {
    width: 100%;
    min-height: 60px;
  }
}
</style>
