<script setup lang="ts">
// Links between the website's admin tools. Plain styling, like the rest of
// the admin pages.
const links = [
  { to: '/admin/meta-tags', label: 'Meta Tags' },
  { to: '/admin/redirects', label: 'Redirects' },
  { to: '/admin/sitemap', label: 'Sitemap' },
  { to: '/admin/text-styles', label: 'Text Styles' },
];
</script>

<template>
  <nav class="admin-nav" aria-label="Admin tools">
    <NuxtLink v-for="link in links" :key="link.to" :to="link.to" class="admin-nav-link" active-class="is-active">
      {{ link.label }}
    </NuxtLink>
    <NuxtLink to="/" class="admin-nav-link admin-nav-back">← Back to site</NuxtLink>
  </nav>
</template>

<style scoped lang="scss">
.admin-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 2rem;
  font-family: $font-poppins;
}

.admin-nav-link {
  padding: 0.6rem 1.2rem;
  border-radius: 80px;
  background: #eef2f6;
  color: #142235;
  font-size: 1.3rem;
  font-weight: 600;

  &:hover {
    background: #dde5ee;
  }

  &.is-active {
    background: #142235;
    color: #ffffff;
  }
}

.admin-nav-back {
  margin-left: auto;
  background: none;
  text-decoration: underline;
}
</style>
