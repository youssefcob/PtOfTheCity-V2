<script setup lang="ts">
const props = defineProps<{ currentPage: number; lastPage: number }>();

const route = useRoute();

// 1 … 4 5 [6] 7 8 … 20
const pages = computed(() => {
  const { currentPage: cur, lastPage: last } = props;
  if (last <= 7) return Array.from({ length: last }, (_, i) => i + 1);

  const out: (number | 'gap')[] = [1];
  const start = Math.max(2, cur - 2);
  const end = Math.min(last - 1, cur + 2);
  if (start > 2) out.push('gap');
  for (let i = start; i <= end; i++) out.push(i);
  if (end < last - 1) out.push('gap');
  out.push(last);
  return out;
});

const pageLink = (page: number) => {
  const query = { ...route.query, page: String(page) };
  if (page === 1) delete (query as Record<string, unknown>).page;
  return { query };
};
</script>

<template>
  <nav v-if="lastPage > 1" class="paginator" aria-label="Articles pages">
    <NuxtLink :to="pageLink(currentPage - 1)" class="item arrow prev" :class="{ disabled: currentPage <= 1 }"
      aria-label="Previous page">
      <img src="/images/articles/arrow-right.svg" width="24" height="24" alt="" aria-hidden="true" />
    </NuxtLink>

    <template v-for="(p, i) in pages" :key="i">
      <span v-if="p === 'gap'" class="item gap">…</span>
      <NuxtLink v-else :to="pageLink(p)" class="item" :class="{ active: p === currentPage }"
        :aria-current="p === currentPage ? 'page' : undefined">
        {{ p }}
      </NuxtLink>
    </template>

    <span class="mobile-info">Page {{ currentPage }} of {{ lastPage }}</span>

    <NuxtLink :to="pageLink(currentPage + 1)" class="item arrow" :class="{ disabled: currentPage >= lastPage }"
      aria-label="Next page">
      <img src="/images/articles/arrow-right.svg" width="24" height="24" alt="" aria-hidden="true" />
    </NuxtLink>
  </nav>
</template>

<style scoped lang="scss">
.paginator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
}

.item {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 4.8rem;
  height: 4.8rem;
  padding: 0 1.2rem;
  border: 1px solid #f0f0f0;
  background: $white;
  @include type-button;
  font-size: 16px;
  color: $primary-700;
  transition: background-color 0.15s ease, border-color 0.15s ease;

  &:hover {
    border-color: $primary-400;
  }

  &.active {
    background: $primary-600;
    border-color: $primary-600;
    color: $white;
  }

  &.gap {
    border: none;
    background: none;
    min-width: 2.4rem;
    padding: 0;
  }

  &.disabled {
    opacity: 0.35;
    pointer-events: none;
  }

  &.prev img {
    transform: rotate(180deg);
  }

  @media screen and (max-width: 600px) {
    &:not(.arrow) {
      display: none;
    }
  }
}

.mobile-info {
  display: none;
  @include type-body;
  color: $primary-700;
  padding: 0 1.6rem;

  @media screen and (max-width: 600px) {
    display: block;
  }
}
</style>
