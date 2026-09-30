<script setup lang="ts">
import type { PageMetaIndexRow } from '~/types/content';

// Read-only index of every page with custom meta tags. Editing happens on the
// page itself: open it and use "Manage Meta Tags" in the editor toolbar
// (components/Admin/PageMetaPanel.vue). Keys starting with "/" are per-URL;
// anything else (e.g. "home") is an older per-page-type entry.
const { fetchPageMetaIndex } = useContentApi();
const { isLoggedIn } = useAdminAuth();

const rows = ref<PageMetaIndexRow[]>([]);
const loading = ref(true);
const error = ref('');

onMounted(async () => {
  try {
    rows.value = await fetchPageMetaIndex();
  } catch (err: any) {
    error.value = err?.status === 401 || err?.statusCode === 401
      ? 'Sign in as a content editor to see this list.'
      : err?.data?.message || "Couldn't load the list.";
  } finally {
    loading.value = false;
  }
});

const isUrlKey = (page: string) => page.startsWith('/');

const formatDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—';
</script>

<template>
  <div class="mt-admin">
    <h1>Page Meta Tags</h1>
    <p class="mt-intro">
      Every page with custom meta tags. To add or change a page's tags, open the page and click
      <strong>Manage Meta Tags</strong> in the editor toolbar.
    </p>

    <p v-if="!isLoggedIn()" class="mt-warning">
      You're not logged in as a content editor — <NuxtLink to="/admin/login">log in</NuxtLink> first.
    </p>

    <p v-if="loading">Loading…</p>
    <p v-else-if="error" class="mt-warning">{{ error }}</p>
    <p v-else-if="!rows.length" class="mt-empty">No pages have custom meta tags yet.</p>

    <div v-else class="mt-table-wrap">
      <table class="mt-table">
        <thead>
          <tr>
            <th>Page</th>
            <th>Title</th>
            <th>Description</th>
            <th>Image</th>
            <th>Tags</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.page">
            <td>
              <NuxtLink v-if="isUrlKey(row.page)" :to="row.page" class="mt-link">{{ row.page }}</NuxtLink>
              <span v-else class="mt-legacy" title="Older entry that applies to every page of this type">
                {{ row.page }} <em>(page type)</em>
              </span>
            </td>
            <td>{{ row.title || '—' }}</td>
            <td class="mt-desc">{{ row.description || '—' }}</td>
            <td>{{ row.has_og_image ? 'Yes' : '—' }}</td>
            <td>{{ row.custom_tag_count || '—' }}</td>
            <td class="mt-date">{{ formatDate(row.updated_at) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped lang="scss">
.mt-admin {
  max-width: 90rem;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: $font-poppins;
  color: #142235;

  h1 {
    margin-bottom: 1rem;
    font-size: 2.4rem;
    font-weight: 700;
  }
}

.mt-intro {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.mt-warning {
  margin-bottom: 1.5rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  background: #fff4e5;
  color: #8a5a00;
}

.mt-empty {
  opacity: 0.7;
}

.mt-table-wrap {
  overflow-x: auto;
}

.mt-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 1.4rem;

  th,
  td {
    padding: 0.9rem 1rem;
    border-bottom: 1px solid #e5e7eb;
    text-align: left;
    vertical-align: top;
  }

  th {
    font-weight: 600;
    white-space: nowrap;
    background: #f5f7fa;
  }
}

.mt-link {
  color: #1a4f7a;
  font-weight: 600;
  text-decoration: underline;
  word-break: break-all;
}

.mt-legacy em {
  font-style: normal;
  opacity: 0.6;
}

.mt-desc {
  max-width: 32rem;
}

.mt-date {
  white-space: nowrap;
}
</style>
