<script setup lang="ts">
import type { PageMeta, PageMetaCustomTag } from '~/types/content';
import { routeMetaKey, useRouteMetaStore } from '~/composables/useRouteMeta';

// Slide-over editor for the current URL's meta tags, opened from the editor
// toolbar. Saves under the URL path (see composables/useRouteMeta.ts), so
// each dynamic page gets its own tags.
const open = useState<boolean>('cms-meta-panel-open', () => false);

const route = useRoute();
const store = useRouteMetaStore();
const { fetchPageMeta, savePageMeta, savePageMetaOgImage, saveCustomTag, updateCustomTag, deleteCustomTag } = useContentApi();

const page = computed(() => routeMetaKey(route.path));
const emptyMeta = (): PageMeta => ({ title: null, description: null, canonical: null, og_image: null, customTags: [] });

const meta = ref<PageMeta>(emptyMeta());
const form = reactive({ title: '', description: '', canonical: '' });
// What the page shows when nothing is overridden, read from the live <head>
// when the panel opens (so it reflects each page's own SEO).
const defaults = reactive({ title: '', description: '' });

const loading = ref(false);
const saving = ref(false);
const uploading = ref(false);
const error = ref('');
const notice = ref('');

const pushToStore = () => {
  const hasAnything = meta.value.title || meta.value.description || meta.value.canonical || meta.value.og_image
    || meta.value.customTags.length;
  store.value = { ...store.value, [page.value]: hasAnything ? { ...meta.value } : null };
};

const load = async () => {
  loading.value = true;
  error.value = '';
  notice.value = '';
  try {
    const current = (await fetchPageMeta(page.value)) || emptyMeta();
    meta.value = { ...emptyMeta(), ...current, customTags: current.customTags || [] };
    form.title = current.title || '';
    form.description = current.description || '';
    form.canonical = current.canonical || '';

    if (!current.title) defaults.title = document.title;
    if (!current.description) {
      defaults.description = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    }
  } catch (err: any) {
    error.value = err?.data?.message || "Couldn't load this page's meta tags.";
  } finally {
    loading.value = false;
  }
};

watch(open, (isOpen) => isOpen && load());
watch(page, () => open.value && load());

const save = async () => {
  saving.value = true;
  error.value = '';
  notice.value = '';
  try {
    const updated = await savePageMeta(page.value, {
      title: form.title.trim(),
      description: form.description.trim(),
      canonical: form.canonical.trim(),
    });
    meta.value = { ...meta.value, ...updated, customTags: meta.value.customTags };
    pushToStore();
    notice.value = 'Saved.';
  } catch (err: any) {
    error.value = err?.data?.message || "Couldn't save. Are you signed in as an editor?";
  } finally {
    saving.value = false;
  }
};

const fileInput = ref<HTMLInputElement | null>(null);
const onOgFile = async (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;
  uploading.value = true;
  error.value = '';
  try {
    const res = await savePageMetaOgImage(page.value, file);
    meta.value = { ...meta.value, og_image: res.url };
    pushToStore();
  } catch (err: any) {
    error.value = err?.data?.message || "Couldn't upload the image.";
  } finally {
    uploading.value = false;
    if (fileInput.value) fileInput.value.value = '';
  }
};

// --- custom tags ---
const tagForm = reactive({ attribute: 'name' as 'name' | 'property', meta_key: '', content: '' });
const editingTagId = ref<number | null>(null);

const resetTagForm = () => {
  Object.assign(tagForm, { attribute: 'name', meta_key: '', content: '' });
  editingTagId.value = null;
};

const saveTag = async () => {
  if (!tagForm.meta_key.trim() || !tagForm.content.trim()) return;
  error.value = '';
  try {
    if (editingTagId.value) {
      const updated = await updateCustomTag(editingTagId.value, tagForm.attribute, tagForm.meta_key.trim(), tagForm.content.trim());
      meta.value.customTags = meta.value.customTags.map((t) => (t.id === updated.id ? updated : t));
    } else {
      const created = await saveCustomTag(page.value, tagForm.attribute, tagForm.meta_key.trim(), tagForm.content.trim());
      meta.value.customTags = [...meta.value.customTags, created];
    }
    pushToStore();
    resetTagForm();
  } catch (err: any) {
    error.value = err?.data?.message || "Couldn't save the tag.";
  }
};

const editTag = (tag: PageMetaCustomTag) => {
  editingTagId.value = tag.id;
  Object.assign(tagForm, { attribute: tag.attribute, meta_key: tag.meta_key, content: tag.content });
};

const removeTag = async (tag: PageMetaCustomTag) => {
  error.value = '';
  try {
    await deleteCustomTag(tag.id);
    meta.value.customTags = meta.value.customTags.filter((t) => t.id !== tag.id);
    pushToStore();
    if (editingTagId.value === tag.id) resetTagForm();
  } catch (err: any) {
    error.value = err?.data?.message || "Couldn't delete the tag.";
  }
};

const previewTitle = computed(() => form.title || defaults.title);
const previewDescription = computed(() => form.description || defaults.description);
const previewUrl = computed(() => `ptofthecity.com${page.value === '/' ? '' : page.value}`);

const close = () => (open.value = false);
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="meta-panel-backdrop" @click.self="close">
      <aside class="meta-panel" role="dialog" aria-label="Page meta tags">
        <header class="panel-header">
          <div>
            <p class="panel-eyebrow">Meta tags for</p>
            <p class="panel-path">{{ page }}</p>
          </div>
          <button type="button" class="icon-btn" aria-label="Close" @click="close">✕</button>
        </header>

        <p v-if="loading" class="panel-status">Loading…</p>

        <template v-else>
          <p class="panel-hint">Leave a field empty to use this page's default.</p>

          <form class="panel-form" @submit.prevent="save">
            <label class="field">
              <span class="field-label">Title <em>{{ form.title.length }}/60</em></span>
              <input v-model="form.title" type="text" :placeholder="defaults.title || 'Page default'" />
            </label>
            <label class="field">
              <span class="field-label">Description <em>{{ form.description.length }}/160</em></span>
              <textarea v-model="form.description" rows="3" :placeholder="defaults.description || 'Page default'"></textarea>
            </label>
            <label class="field">
              <span class="field-label">Canonical URL</span>
              <input v-model="form.canonical" type="text" :placeholder="`https://www.ptofthecity.com${page === '/' ? '' : page}`" />
            </label>
            <button type="submit" class="primary-btn" :disabled="saving">{{ saving ? 'Saving…' : 'Save' }}</button>
          </form>

          <div class="preview" aria-label="Search result preview">
            <p class="preview-url">{{ previewUrl }}</p>
            <p class="preview-title">{{ previewTitle }}</p>
            <p class="preview-desc">{{ previewDescription }}</p>
          </div>

          <section class="block">
            <h3 class="block-title">Social share image</h3>
            <img v-if="meta.og_image" :src="meta.og_image" alt="" class="og-preview" />
            <p v-else class="panel-hint">Using the page's default.</p>
            <button type="button" class="secondary-btn" :disabled="uploading" @click="fileInput?.click()">
              {{ uploading ? 'Uploading…' : meta.og_image ? 'Replace image' : 'Upload image' }}
            </button>
            <input ref="fileInput" type="file" accept="image/*" hidden @change="onOgFile" />
          </section>

          <section class="block">
            <h3 class="block-title">Custom tags</h3>
            <ul v-if="meta.customTags.length" class="tag-list">
              <li v-for="tag in meta.customTags" :key="tag.id">
                <code>&lt;meta {{ tag.attribute }}="{{ tag.meta_key }}" content="{{ tag.content }}"&gt;</code>
                <span class="tag-actions">
                  <button type="button" class="link-btn" @click="editTag(tag)">Edit</button>
                  <button type="button" class="link-btn link-btn--danger" @click="removeTag(tag)">Delete</button>
                </span>
              </li>
            </ul>
            <form class="tag-form" @submit.prevent="saveTag">
              <select v-model="tagForm.attribute" aria-label="Attribute">
                <option value="name">name</option>
                <option value="property">property</option>
              </select>
              <input v-model="tagForm.meta_key" type="text" placeholder="e.g. robots" aria-label="Key" />
              <input v-model="tagForm.content" type="text" placeholder="e.g. noindex" aria-label="Content" />
              <button type="submit" class="secondary-btn">{{ editingTagId ? 'Update' : 'Add' }}</button>
              <button v-if="editingTagId" type="button" class="link-btn" @click="resetTagForm">Cancel</button>
            </form>
          </section>

          <p v-if="error" class="panel-error">{{ error }}</p>
          <p v-if="notice" class="panel-notice">{{ notice }}</p>
        </template>
      </aside>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
// Admin tooling: plain, compact, in the same navy/orange as the edit toggle.
.meta-panel-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(15, 43, 61, 0.35);
}

.meta-panel {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: min(44rem, 100%);
  padding: 2rem;
  overflow-y: auto;
  background: #ffffff;
  box-shadow: -8px 0 30px rgba(0, 0, 0, 0.2);
  font-family: $font-poppins;
  font-size: 14px;
  color: #142235;

  * {
    line-height: 1.4;
  }
}

.panel-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.panel-eyebrow {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  opacity: 0.6;
}

.panel-path {
  font-size: 16px;
  font-weight: 600;
  word-break: break-all;
}

.icon-btn {
  border: 0;
  background: none;
  font-size: 18px;
  cursor: pointer;
}

.panel-hint,
.panel-status {
  font-size: 13px;
  opacity: 0.7;
}

.panel-form,
.block {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.block {
  padding-top: 1.6rem;
  border-top: 1px solid #e5e7eb;
}

.block-title {
  font-size: 14px;
  font-weight: 600;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.field-label {
  display: flex;
  justify-content: space-between;
  font-weight: 600;

  em {
    font-style: normal;
    font-weight: 400;
    opacity: 0.6;
  }
}

.meta-panel input,
.meta-panel textarea,
.meta-panel select {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-family: inherit;
  font-size: 14px;
  color: inherit;

  &:focus {
    outline: 2px solid #ff9b37;
    outline-offset: 0;
  }
}

.primary-btn,
.secondary-btn {
  align-self: flex-start;
  padding: 0.8rem 1.6rem;
  border: 0;
  border-radius: 80px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: wait;
  }
}

.primary-btn {
  background: #142235;
  color: #ffffff;
}

.secondary-btn {
  background: #eef2f6;
  color: #142235;
}

.link-btn {
  border: 0;
  background: none;
  color: #1a4f7a;
  font-size: 13px;
  text-decoration: underline;
  cursor: pointer;
}

.link-btn--danger {
  color: #b3261e;
}

.preview {
  padding: 1.2rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.preview-url {
  font-size: 12px;
  color: #3c4043;
}

.preview-title {
  margin-top: 0.2rem;
  font-size: 18px;
  color: #1a0dab;
}

.preview-desc {
  margin-top: 0.2rem;
  font-size: 13px;
  color: #4d5156;
}

.og-preview {
  width: 100%;
  max-height: 20rem;
  object-fit: cover;
  border-radius: 6px;
}

.tag-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  list-style: none;

  li {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    margin: 0;
    padding: 0.8rem;
    border-radius: 6px;
    background: #f5f7fa;
  }

  code {
    font-size: 12px;
    word-break: break-all;
  }
}

.tag-actions {
  display: flex;
  gap: 1rem;
}

.tag-form {
  display: grid;
  grid-template-columns: 9rem 1fr;
  gap: 0.6rem;

  input:last-of-type {
    grid-column: 1 / -1;
  }
}

.panel-error {
  color: #b3261e;
}

.panel-notice {
  color: #1d7a3e;
}
</style>
