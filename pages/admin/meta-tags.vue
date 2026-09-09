<script setup lang="ts">
import { useContentApi } from '~/composables/useContentApi';
import type { PageMeta, PageMetaCustomTag } from '~/types/content';

// Only the homepage is CMS-editable right now - listed as an array so
// adding more pages later is just extending this list, not restructuring
// the page.
const PAGES = [{ key: 'home', label: 'Home', defaultTitle: "PT of the City - NYC's top rated physical therapy clinics", defaultDescription: 'Premier physical therapy clinics in NYC offering personalized treatment plans, sports injury rehabilitation, and wellness programs.' }];

const { fetchBootstrap, savePageMeta, savePageMetaOgImage, saveCustomTag, updateCustomTag, deleteCustomTag } = useContentApi();
const { isLoggedIn } = useAdminAuth();

const selectedPage = ref(PAGES[0].key);
const selectedPageInfo = computed(() => PAGES.find((p) => p.key === selectedPage.value)!);

const meta = ref<PageMeta | null>(null);
const loading = ref(true);
const errorMessage = ref('');
const saving = ref(false);

const form = ref({ title: '', description: '', canonical: '' });

const load = async () => {
  loading.value = true;
  errorMessage.value = '';
  try {
    const res = await fetchBootstrap(selectedPage.value);
    meta.value = res.pageMeta;
    form.value = {
      title: res.pageMeta?.title || '',
      description: res.pageMeta?.description || '',
      canonical: res.pageMeta?.canonical || '',
    };
  } catch (err: any) {
    errorMessage.value = err?.data?.message || 'Failed to load page meta';
  } finally {
    loading.value = false;
  }
};

onMounted(load);
watch(selectedPage, load);

const submit = async () => {
  saving.value = true;
  errorMessage.value = '';
  try {
    const updated = await savePageMeta(selectedPage.value, { ...form.value });
    meta.value = { ...(meta.value || { customTags: [] as PageMetaCustomTag[] }), ...updated };
  } catch (err: any) {
    errorMessage.value = err?.data?.message || 'Failed to save';
  } finally {
    saving.value = false;
  }
};

const ogFileInput = ref<HTMLInputElement | null>(null);
const uploadingOg = ref(false);

const onOgFileChange = async (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;
  uploadingOg.value = true;
  try {
    const res = await savePageMetaOgImage(selectedPage.value, file);
    meta.value = { ...(meta.value || { customTags: [] }), og_image: res.url } as PageMeta;
  } catch (err: any) {
    errorMessage.value = err?.data?.message || 'Failed to upload image';
  } finally {
    uploadingOg.value = false;
    if (ogFileInput.value) ogFileInput.value.value = '';
  }
};

const previewTitle = computed(() => form.value.title || selectedPageInfo.value.defaultTitle);
const previewDescription = computed(() => form.value.description || selectedPageInfo.value.defaultDescription);

// Custom tag mini-CRUD
const newTag = ref({ attribute: 'name' as 'name' | 'property', meta_key: '', content: '' });
const editingTagId = ref<number | null>(null);

const addOrUpdateTag = async () => {
  errorMessage.value = '';
  try {
    if (editingTagId.value) {
      const updated = await updateCustomTag(editingTagId.value, newTag.value.attribute, newTag.value.meta_key, newTag.value.content);
      if (meta.value) {
        meta.value.customTags = meta.value.customTags.map((t) => (t.id === updated.id ? updated : t));
      }
    } else {
      const created = await saveCustomTag(selectedPage.value, newTag.value.attribute, newTag.value.meta_key, newTag.value.content);
      if (!meta.value) meta.value = { title: null, description: null, canonical: null, og_image: null, customTags: [] };
      meta.value.customTags = [...meta.value.customTags, created];
    }
    newTag.value = { attribute: 'name', meta_key: '', content: '' };
    editingTagId.value = null;
  } catch (err: any) {
    errorMessage.value = err?.data?.message || 'Failed to save custom tag';
  }
};

const editTag = (tag: PageMetaCustomTag) => {
  editingTagId.value = tag.id;
  newTag.value = { attribute: tag.attribute, meta_key: tag.meta_key, content: tag.content };
};

const removeTag = async (tag: PageMetaCustomTag) => {
  try {
    await deleteCustomTag(tag.id);
    if (meta.value) meta.value.customTags = meta.value.customTags.filter((t) => t.id !== tag.id);
  } catch (err: any) {
    errorMessage.value = err?.data?.message || 'Failed to delete tag';
  }
};
</script>

<template>
  <div class="mt-admin">
    <h1>Page Meta Tags</h1>

    <p v-if="!isLoggedIn()" class="mt-warning">
      You're not logged in as a content editor — <NuxtLink to="/admin/login">log in</NuxtLink> to save changes.
    </p>

    <div class="mt-layout">
      <aside class="mt-sidebar">
        <button
          v-for="p in PAGES"
          :key="p.key"
          type="button"
          class="mt-page-btn"
          :class="{ active: selectedPage === p.key }"
          @click="selectedPage = p.key"
        >{{ p.label }}</button>
      </aside>

      <div v-if="loading">Loading…</div>
      <div v-else class="mt-main">
        <form class="mt-form" @submit.prevent="submit">
          <label>Title <input v-model="form.title" type="text" :placeholder="selectedPageInfo.defaultTitle" /></label>
          <label>Description <textarea v-model="form.description" :placeholder="selectedPageInfo.defaultDescription" rows="3" /></label>
          <label>Canonical URL <input v-model="form.canonical" type="text" placeholder="https://... or /path" /></label>

          <div class="mt-og">
            <img v-if="meta?.og_image" :src="meta.og_image" alt="" class="mt-og-preview" />
            <button type="button" :disabled="uploadingOg" @click="ogFileInput?.click()">
              {{ uploadingOg ? 'Uploading…' : 'Upload OG Image' }}
            </button>
            <input ref="ogFileInput" type="file" accept="image/*" class="mt-hidden" @change="onOgFileChange" />
          </div>

          <div class="mt-preview">
            <p class="mt-preview-title">{{ previewTitle }}</p>
            <p class="mt-preview-url">www.ptofthecity.com</p>
            <p class="mt-preview-desc">{{ previewDescription }}</p>
          </div>

          <p v-if="errorMessage" class="mt-error">{{ errorMessage }}</p>

          <button type="submit" class="mt-submit" :disabled="saving">{{ saving ? 'Saving…' : 'Save' }}</button>
        </form>

        <div class="mt-custom-tags">
          <h2>Custom meta tags</h2>
          <table class="mt-table">
            <thead><tr><th>Attribute</th><th>Key</th><th>Content</th><th></th></tr></thead>
            <tbody>
              <tr v-for="tag in meta?.customTags || []" :key="tag.id">
                <td>{{ tag.attribute }}</td>
                <td>{{ tag.meta_key }}</td>
                <td>{{ tag.content }}</td>
                <td class="mt-row-actions">
                  <button type="button" @click="editTag(tag)">Edit</button>
                  <button type="button" class="mt-danger" @click="removeTag(tag)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>

          <form class="mt-tag-form" @submit.prevent="addOrUpdateTag">
            <select v-model="newTag.attribute">
              <option value="name">name</option>
              <option value="property">property</option>
            </select>
            <input v-model="newTag.meta_key" type="text" placeholder="key (e.g. og:locale)" required />
            <input v-model="newTag.content" type="text" placeholder="content" required />
            <button type="submit">{{ editingTagId ? 'Save' : 'Add' }}</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.mt-admin {
  max-width: 60rem;
  margin: 0 auto;
  padding: 2rem 1.5rem;

  h1 { font-size: 1.5rem; font-weight: 700; color: #142235; margin-bottom: 1rem; }
  h2 { font-size: 1rem; font-weight: 600; color: #142235; margin: 1.5rem 0 0.75rem; }
}

.mt-warning {
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  background: #fff4e5;
  color: #8a5a00;
  margin-bottom: 1.5rem;
}

.mt-layout {
  display: grid;
  grid-template-columns: 12rem 1fr;
  gap: 2rem;

  @media screen and (max-width: 700px) {
    grid-template-columns: 1fr;
  }
}

.mt-sidebar {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.mt-page-btn {
  text-align: left;
  padding: 0.6rem 0.8rem;
  border-radius: 0.5rem;
  border: none;
  background: transparent;
  color: #374151;
  cursor: pointer;

  &.active {
    background: #142235;
    color: #fff;
  }
}

.mt-form {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: 1.25rem;
  border-radius: 0.75rem;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);

  label {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    font-size: 0.8rem;
    color: #374151;
  }

  input, textarea {
    padding: 0.5rem 0.6rem;
    border-radius: 0.4rem;
    border: 1px solid rgba(0, 0, 0, 0.15);
    font-size: 0.9rem;
    font-family: inherit;
  }
}

.mt-og {
  display: flex;
  align-items: center;
  gap: 0.75rem;

  img { width: 6rem; height: 3.5rem; object-fit: cover; border-radius: 0.4rem; }

  button {
    padding: 0.5rem 0.9rem;
    border-radius: 80px;
    border: 1px solid rgba(0,0,0,0.15);
    background: #fff;
    cursor: pointer;
  }
}

.mt-hidden { display: none; }

.mt-preview {
  padding: 1rem;
  border-radius: 0.5rem;
  background: rgba(0, 0, 0, 0.02);
}

.mt-preview-title { color: #1a0dab; font-size: 1.1rem; }
.mt-preview-url { color: #006621; font-size: 0.8rem; }
.mt-preview-desc { color: #545454; font-size: 0.85rem; }

.mt-error { color: #c0392b; font-size: 0.85rem; }

.mt-submit {
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 80px;
  background-color: #142235;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  align-self: flex-start;

  &:disabled { opacity: 0.6; cursor: default; }
}

.mt-custom-tags {
  margin-top: 1.5rem;
  padding: 1.25rem;
  border-radius: 0.75rem;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
}

.mt-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;

  th, td {
    text-align: left;
    padding: 0.5rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    font-size: 0.8rem;
  }
}

.mt-row-actions {
  display: flex;
  gap: 0.4rem;

  button {
    padding: 0.25rem 0.6rem;
    border-radius: 0.4rem;
    border: 1px solid rgba(0, 0, 0, 0.15);
    background: #fff;
    cursor: pointer;
    font-size: 0.75rem;
  }

  .mt-danger { color: #c0392b; }
}

.mt-tag-form {
  display: flex;
  gap: 0.5rem;

  select, input {
    padding: 0.4rem 0.5rem;
    border-radius: 0.4rem;
    border: 1px solid rgba(0, 0, 0, 0.15);
    font-size: 0.8rem;
  }

  button {
    padding: 0.4rem 0.9rem;
    border-radius: 80px;
    border: none;
    background: #142235;
    color: #fff;
    cursor: pointer;
  }
}
</style>
