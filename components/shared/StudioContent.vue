<script setup lang="ts">
import type { StudioEnvelope } from '~/types/types';

const props = defineProps<{ doc: StudioEnvelope }>();

// Studio's script exposes an idempotent init; it runs by itself on a full
// page load, this covers fragments mounted by client-side navigation.
const initBlocks = () => (window as any).__studioBlocks?.init?.();

onMounted(initBlocks);
watch(() => props.doc.html, () => nextTick(initBlocks));
</script>

<template>
    <div class="studio-content" :style="doc.theme?.vars" v-html="doc.html"></div>
</template>

<style lang="scss">
.studio-content {
    padding-top: $navbarHeight;
}

// The site styles bare h1-h4/p/span/li/a globally (_classes.scss). Hand those
// back to the browser defaults inside a Studio fragment so its own ptoc-*
// rules decide. `html :where(...)` keeps this just above a bare tag selector
// and below any class selector, so Studio's stylesheet always wins.
html :where(.studio-content) :is(h1, h2, h3, h4, p, span, li, a) {
    font-family: revert;
    font-weight: revert;
    font-size: revert;
    font-stretch: revert;
    letter-spacing: revert;
    line-height: revert;
    color: revert;
}

html :where(.studio-content) li {
    margin-left: revert;
}
</style>
