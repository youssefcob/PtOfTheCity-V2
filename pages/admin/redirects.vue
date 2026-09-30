<script setup lang="ts">
import AdminNav from '~/components/Admin/AdminNav.vue';
import type { RedirectInput, RedirectRule } from '~/types/content';

// Redirects from old paths to new pages or external URLs, applied by
// server/middleware/redirects.ts. New rules take effect within a minute.
useHead({ title: 'Redirects | Admin', meta: [{ name: 'robots', content: 'noindex' }] });

const { listRedirects, createRedirect, updateRedirect, deleteRedirect } = useContentApi();
const { isLoggedIn } = useAdminAuth();

type Row = RedirectRule & { draft: RedirectInput; error: string; saving: boolean };

const rows = ref<Row[]>([]);
const loading = ref(true);
const loadError = ref('');

const toRow = (rule: RedirectRule): Row => ({
  ...rule,
  draft: { source: rule.source, destination: rule.destination, status_code: rule.status_code, enabled: rule.enabled },
  error: '',
  saving: false,
});

// Laravel 422s: show the first message.
const messageOf = (err: any, fallback: string) => {
  const errors = err?.data?.errors;
  if (errors) return Object.values(errors).flat()[0] as string;
  if (err?.status === 401 || err?.statusCode === 401) return 'Sign in as a content editor first.';
  return err?.data?.message || fallback;
};

onMounted(async () => {
  try {
    rows.value = (await listRedirects()).map(toRow);
  } catch (err) {
    loadError.value = messageOf(err, "Couldn't load redirects.");
  } finally {
    loading.value = false;
  }
});

const isDirty = (row: Row) =>
  row.draft.source !== row.source || row.draft.destination !== row.destination
  || row.draft.status_code !== row.status_code || row.draft.enabled !== row.enabled;

const saveRow = async (row: Row) => {
  row.saving = true;
  row.error = '';
  try {
    const updated = await updateRedirect(row.id, row.draft);
    Object.assign(row, toRow(updated));
  } catch (err) {
    row.error = messageOf(err, "Couldn't save.");
  } finally {
    row.saving = false;
  }
};

const toggleEnabled = async (row: Row) => {
  row.draft.enabled = !row.draft.enabled;
  await saveRow(row);
};

const removeRow = async (row: Row) => {
  if (!window.confirm(`Delete the redirect from ${row.source}?`)) return;
  row.error = '';
  try {
    await deleteRedirect(row.id);
    rows.value = rows.value.filter((r) => r.id !== row.id);
  } catch (err) {
    row.error = messageOf(err, "Couldn't delete.");
  }
};

// --- add form ---
const newRule = reactive<RedirectInput>({ source: '', destination: '', status_code: 301, enabled: true });
const adding = ref(false);
const addError = ref('');

const addRule = async () => {
  adding.value = true;
  addError.value = '';
  try {
    const created = await createRedirect({ ...newRule, source: newRule.source.trim(), destination: newRule.destination.trim() });
    rows.value = [toRow(created), ...rows.value];
    Object.assign(newRule, { source: '', destination: '', status_code: 301, enabled: true });
  } catch (err) {
    addError.value = messageOf(err, "Couldn't add the redirect.");
  } finally {
    adding.value = false;
  }
};

const formatDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—';
</script>

<template>
  <div class="admin-page">
    <AdminNav />
    <h1>Redirects</h1>
    <p class="intro">
      Send visitors from an old path to a new page or an external URL. New and changed rules take effect within a
      minute. Use <strong>301</strong> for permanent moves (search engines update their links) and <strong>302</strong>
      for temporary ones.
    </p>

    <p v-if="!isLoggedIn()" class="warning">
      You're not logged in as a content editor — <NuxtLink to="/admin/login">log in</NuxtLink> first.
    </p>

    <form class="add-form" @submit.prevent="addRule">
      <h2>Add a redirect</h2>
      <div class="add-grid">
        <label>From <input v-model="newRule.source" type="text" placeholder="/old-page" required /></label>
        <label>To <input v-model="newRule.destination" type="text" placeholder="/new-page or https://…" required /></label>
        <label>Type
          <select v-model.number="newRule.status_code">
            <option :value="301">301 permanent</option>
            <option :value="302">302 temporary</option>
          </select>
        </label>
        <button type="submit" class="primary-btn" :disabled="adding">{{ adding ? 'Adding…' : 'Add' }}</button>
      </div>
      <p v-if="addError" class="error">{{ addError }}</p>
    </form>

    <p v-if="loading">Loading…</p>
    <p v-else-if="loadError" class="warning">{{ loadError }}</p>
    <p v-else-if="!rows.length" class="empty">No redirects yet.</p>

    <div v-else class="table-wrap">
      <table class="table">
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Type</th>
            <th>On</th>
            <th>Hits</th>
            <th>Last hit</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="row in rows" :key="row.id">
            <tr :class="{ 'is-off': !row.enabled }">
              <td><input v-model="row.draft.source" type="text" aria-label="From" /></td>
              <td><input v-model="row.draft.destination" type="text" aria-label="To" /></td>
              <td>
                <select v-model.number="row.draft.status_code" aria-label="Type">
                  <option :value="301">301</option>
                  <option :value="302">302</option>
                </select>
              </td>
              <td><input type="checkbox" :checked="row.draft.enabled" aria-label="Enabled" @change="toggleEnabled(row)" /></td>
              <td>{{ row.hits }}</td>
              <td class="nowrap">{{ formatDate(row.last_hit_at) }}</td>
              <td class="actions">
                <button v-if="isDirty(row)" type="button" class="primary-btn small" :disabled="row.saving"
                  @click="saveRow(row)">{{ row.saving ? 'Saving…' : 'Save' }}</button>
                <button type="button" class="link-btn danger" @click="removeRow(row)">Delete</button>
              </td>
            </tr>
            <tr v-if="row.error" class="error-row">
              <td colspan="7" class="error">{{ row.error }}</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped lang="scss">
.admin-page {
  max-width: 110rem;
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
  select {
    width: 100%;
    padding: 0.6rem 0.8rem;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    font-family: inherit;
    font-size: 1.4rem;
    color: inherit;
  }
}

.intro {
  max-width: 80rem;
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

.empty {
  opacity: 0.7;
}

.add-form {
  margin-bottom: 2.4rem;
  padding: 1.6rem;
  border-radius: 8px;
  background: #f5f7fa;
}

.add-grid {
  display: grid;
  grid-template-columns: 1fr 1.4fr 16rem auto;
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

  tr.is-off td {
    opacity: 0.55;
  }

  .error-row td {
    border-bottom: 0;
  }
}

.nowrap {
  white-space: nowrap;
}

.actions {
  display: flex;
  align-items: center;
  gap: 0.8rem;
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

  &.small {
    padding: 0.4rem 1rem;
  }

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
