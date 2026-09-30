<script setup lang="ts">
import AdminNav from '~/components/Admin/AdminNav.vue';
import type { SitemapChangefreq, SitemapEntryInput, SitemapManageRow } from '~/types/content';

// Every URL in /sitemap.xml. "Auto" pages are found by the site itself (static
// pages + clinics, services, blogs, staff, careers); admins can change their
// priority / frequency / last-modified date or exclude them. "Manual" URLs
// are added here. Each change saves on its own; /sitemap.xml picks it up
// within 10 minutes (server/utils/sitemap.ts, nuxt.config sitemap cache).
useHead({ title: 'Sitemap | Admin', meta: [{ name: 'robots', content: 'noindex' }] });

const { saveSitemapEntry, deleteSitemapEntry } = useContentApi();
const { isLoggedIn } = useAdminAuth();

const CHANGEFREQS: SitemapChangefreq[] = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'];
const PRIORITIES = Array.from({ length: 11 }, (_, i) => Math.round(i) / 10);

type Row = SitemapManageRow & { saving: boolean; error: string };

const rows = ref<Row[]>([]);
const loading = ref(true);
const loadError = ref('');
const search = ref('');
const showExcluded = ref(true);

const load = async () => {
  loading.value = true;
  loadError.value = '';
  try {
    const data = await $fetch<SitemapManageRow[]>('/api/__sitemap__/manage');
    rows.value = data.map((row) => ({ ...row, saving: false, error: '' }));
  } catch {
    loadError.value = "Couldn't load the sitemap.";
  } finally {
    loading.value = false;
  }
};
onMounted(load);

const visibleRows = computed(() => {
  const term = search.value.trim().toLowerCase();
  return rows.value.filter((row) => (showExcluded.value || !row.excluded) && (!term || row.url.toLowerCase().includes(term)));
});
const counts = computed(() => ({
  total: rows.value.length,
  included: rows.value.filter((r) => !r.excluded).length,
  manual: rows.value.filter((r) => r.source === 'manual').length,
}));

const messageOf = (err: any, fallback: string) => {
  const errors = err?.data?.errors;
  if (errors) return Object.values(errors).flat()[0] as string;
  if (err?.status === 401 || err?.statusCode === 401) return 'Sign in as a content editor first.';
  return err?.data?.message || fallback;
};

// Save one field for one row. For automatic pages, choosing the default value
// sends null so the page keeps following its default.
const update = async (row: Row, patch: Partial<SitemapEntryInput>) => {
  row.saving = true;
  row.error = '';
  try {
    const saved = await saveSitemapEntry({ url: row.url, is_manual: row.source === 'manual', ...patch });
    row.entryId = saved.id;
    row.override = { priority: saved.priority, changefreq: saved.changefreq, lastmod: saved.lastmod };
    const d = row.defaults;
    row.priority = saved.priority ?? d?.priority ?? 0.5;
    row.changefreq = saved.changefreq ?? d?.changefreq ?? 'monthly';
    row.lastmod = saved.lastmod ?? d?.lastmod ?? null;
    row.excluded = Boolean(saved.excluded);
  } catch (err) {
    row.error = messageOf(err, "Couldn't save.");
  } finally {
    row.saving = false;
  }
};

const onPriority = (row: Row, value: string) =>
  update(row, { priority: value === 'default' ? null : Number(value) });
const onChangefreq = (row: Row, value: string) =>
  update(row, { changefreq: value === 'default' ? null : (value as SitemapChangefreq) });
const onLastmod = (row: Row, value: string) => update(row, { lastmod: value || null });
const onExcluded = (row: Row, value: boolean) => update(row, { excluded: value });

// Auto page: drop the override (back to defaults). Manual url: remove it.
const reset = async (row: Row) => {
  if (!row.entryId) return;
  if (row.source === 'manual' && !window.confirm(`Remove ${row.url} from the sitemap?`)) return;
  row.saving = true;
  row.error = '';
  try {
    await deleteSitemapEntry(row.entryId);
    if (row.source === 'manual') {
      rows.value = rows.value.filter((r) => r !== row);
    } else if (row.defaults) {
      Object.assign(row, { ...row.defaults, entryId: null, override: { priority: null, changefreq: null, lastmod: null } });
    }
  } catch (err) {
    row.error = messageOf(err, "Couldn't reset.");
  } finally {
    row.saving = false;
  }
};

const isOverridden = (row: Row) => row.source === 'auto' && row.entryId !== null;

// --- add a url ---
const newUrl = reactive({ url: '', priority: 0.5, changefreq: 'monthly' as SitemapChangefreq });
const adding = ref(false);
const addError = ref('');

const addUrl = async () => {
  addError.value = '';
  const url = newUrl.url.trim();
  if (!url.startsWith('/')) {
    addError.value = 'The URL must start with "/" (a page on this site).';
    return;
  }
  const existing = rows.value.find((r) => r.url === url.replace(/\/+$/, '') || (url === '/' && r.url === '/'));
  if (existing) {
    addError.value = `${existing.url} is already in the sitemap — change it in the table below.`;
    return;
  }
  adding.value = true;
  try {
    const saved = await saveSitemapEntry({ url, priority: newUrl.priority, changefreq: newUrl.changefreq, is_manual: true, excluded: false });
    rows.value = [
      { url: saved.url, source: 'manual', priority: saved.priority ?? 0.5, changefreq: saved.changefreq ?? 'monthly', lastmod: saved.lastmod, excluded: false, entryId: saved.id, defaults: null, override: { priority: saved.priority, changefreq: saved.changefreq, lastmod: saved.lastmod }, saving: false, error: '' },
      ...rows.value,
    ];
    Object.assign(newUrl, { url: '', priority: 0.5, changefreq: 'monthly' });
  } catch (err) {
    addError.value = messageOf(err, "Couldn't add the URL.");
  } finally {
    adding.value = false;
  }
};
</script>

<template>
  <div class="admin-page">
    <AdminNav />
    <h1>Sitemap</h1>
    <p class="intro">
      Everything listed in <a href="/sitemap.xml" target="_blank" rel="noopener">/sitemap.xml</a>. <strong>Auto</strong>
      pages are found by the site (pages, clinics, services, blog posts, staff, open positions); you can adjust or
      exclude them. <strong>Manual</strong> URLs are ones you add. Each change saves immediately and reaches the live
      sitemap within 10 minutes.
    </p>

    <p v-if="!isLoggedIn()" class="warning">
      You're not logged in as a content editor — <NuxtLink to="/admin/login">log in</NuxtLink> to make changes.
    </p>

    <form class="add-form" @submit.prevent="addUrl">
      <h2>Add a URL</h2>
      <div class="add-grid">
        <label>URL <input v-model="newUrl.url" type="text" placeholder="/some-page" required /></label>
        <label>Priority
          <select v-model.number="newUrl.priority">
            <option v-for="p in PRIORITIES" :key="p" :value="p">{{ p.toFixed(1) }}</option>
          </select>
        </label>
        <label>Change frequency
          <select v-model="newUrl.changefreq">
            <option v-for="f in CHANGEFREQS" :key="f" :value="f">{{ f }}</option>
          </select>
        </label>
        <button type="submit" class="primary-btn" :disabled="adding">{{ adding ? 'Adding…' : 'Add' }}</button>
      </div>
      <p v-if="addError" class="error">{{ addError }}</p>
    </form>

    <p v-if="loading">Loading…</p>
    <p v-else-if="loadError" class="warning">{{ loadError }}</p>

    <template v-else>
      <div class="toolbar">
        <input v-model="search" type="search" placeholder="Filter URLs…" aria-label="Filter URLs" />
        <label class="check"><input v-model="showExcluded" type="checkbox" /> Show excluded</label>
        <span class="counts">{{ counts.included }} of {{ counts.total }} in the sitemap · {{ counts.manual }} manual</span>
      </div>

      <div class="table-wrap">
        <table class="table">
          <thead>
            <tr>
              <th>URL</th>
              <th>Source</th>
              <th>Priority</th>
              <th>Change frequency</th>
              <th>Last modified</th>
              <th>Excluded</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <template v-for="row in visibleRows" :key="row.url">
              <tr :class="{ 'is-excluded': row.excluded, 'is-saving': row.saving }">
                <td class="url"><a :href="row.url" target="_blank" rel="noopener">{{ row.url }}</a></td>
                <td>
                  <span class="badge" :class="`badge--${row.source}`">{{ row.source }}</span>
                  <span v-if="isOverridden(row)" class="badge badge--edited">edited</span>
                </td>
                <td>
                  <select :value="row.defaults && row.override.priority === null ? 'default' : row.priority"
                    aria-label="Priority" :disabled="row.saving"
                    @change="onPriority(row, ($event.target as HTMLSelectElement).value)">
                    <option v-if="row.defaults" value="default">default ({{ row.defaults.priority.toFixed(1) }})</option>
                    <option v-for="p in PRIORITIES" :key="p" :value="p">{{ p.toFixed(1) }}</option>
                  </select>
                </td>
                <td>
                  <select :value="row.defaults && row.override.changefreq === null ? 'default' : row.changefreq"
                    aria-label="Change frequency" :disabled="row.saving"
                    @change="onChangefreq(row, ($event.target as HTMLSelectElement).value)">
                    <option v-if="row.defaults" value="default">default ({{ row.defaults.changefreq }})</option>
                    <option v-for="f in CHANGEFREQS" :key="f" :value="f">{{ f }}</option>
                  </select>
                </td>
                <td>
                  <input type="date" :value="row.lastmod || ''" aria-label="Last modified" :disabled="row.saving"
                    @change="onLastmod(row, ($event.target as HTMLInputElement).value)" />
                </td>
                <td class="center">
                  <input type="checkbox" :checked="row.excluded" aria-label="Excluded" :disabled="row.saving"
                    @change="onExcluded(row, ($event.target as HTMLInputElement).checked)" />
                </td>
                <td class="actions">
                  <button v-if="isOverridden(row)" type="button" class="link-btn" :disabled="row.saving"
                    title="Back to this page's defaults" @click="reset(row)">Reset</button>
                  <button v-if="row.source === 'manual'" type="button" class="link-btn danger" :disabled="row.saving"
                    @click="reset(row)">Remove</button>
                </td>
              </tr>
              <tr v-if="row.error" class="error-row">
                <td colspan="7" class="error">{{ row.error }}</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.admin-page {
  max-width: 120rem;
  margin: 0 auto;
  padding: 2rem 1.5rem 6rem;
  font-family: $font-poppins;
  font-size: 1.4rem;
  color: #142235;

  h1 {
    margin-bottom: 0.8rem;
    font-size: 2.4rem;
    font-weight: 700;
  }

  h2 {
    margin-bottom: 1rem;
    font-size: 1.6rem;
    font-weight: 600;
  }

  input[type='text'],
  input[type='search'],
  input[type='date'],
  select {
    padding: 0.6rem 0.8rem;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    background: #ffffff;
    font-family: inherit;
    font-size: 1.4rem;
    color: inherit;
  }

  a {
    color: #1a4f7a;
    text-decoration: underline;
  }
}

.intro {
  max-width: 85rem;
  margin-bottom: 1.6rem;
  line-height: 1.5;
}

.warning {
  margin-bottom: 1.6rem;
  padding: 0.8rem 1.2rem;
  border-radius: 6px;
  background: #fff4e5;
  color: #8a5a00;
}

.add-form {
  margin-bottom: 2.4rem;
  padding: 1.6rem;
  border-radius: 8px;
  background: #f5f7fa;
}

.add-grid {
  display: grid;
  grid-template-columns: 1.6fr 10rem 16rem auto;
  align-items: end;
  gap: 1rem;

  label {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    font-weight: 600;
  }

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
  }
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.6rem;
  margin-bottom: 1.2rem;

  input[type='search'] {
    width: 28rem;
    max-width: 100%;
  }
}

.check {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
}

.counts {
  margin-left: auto;
  opacity: 0.7;
}

.table-wrap {
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 0.6rem 0.8rem;
    border-bottom: 1px solid #e5e7eb;
    text-align: left;
    vertical-align: middle;
  }

  th {
    background: #f5f7fa;
    font-weight: 600;
    white-space: nowrap;
  }

  tr.is-excluded td:not(:nth-child(6)):not(:last-child) {
    opacity: 0.45;
  }

  tr.is-saving {
    opacity: 0.7;
  }

  .error-row td {
    border-bottom: 0;
  }
}

.url {
  word-break: break-all;
}

.center {
  text-align: center !important;
}

.badge {
  display: inline-block;
  margin-right: 0.4rem;
  padding: 0.1rem 0.7rem;
  border-radius: 80px;
  font-size: 1.2rem;
  font-weight: 600;
}

.badge--auto {
  background: #e6f4f1;
  color: #1d6b5a;
}

.badge--manual {
  background: #eef0ff;
  color: #3b3fa8;
}

.badge--edited {
  background: #fff4e5;
  color: #8a5a00;
}

.actions {
  white-space: nowrap;
}

.primary-btn {
  padding: 0.7rem 1.4rem;
  border: 0;
  border-radius: 80px;
  background: #142235;
  color: #ffffff;
  font-weight: 600;
  font-size: 1.3rem;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: wait;
  }
}

.link-btn {
  border: 0;
  background: none;
  color: #1a4f7a;
  font-size: 1.3rem;
  text-decoration: underline;
  cursor: pointer;

  &.danger {
    color: #b3261e;
  }
}

.error {
  color: #b3261e;
}
</style>
