<script setup lang="ts">
import { useContentApi } from '~/composables/useContentApi';
import { resolveTextStyleCss, resolveMobileStyleOverrides } from '~/composables/useTextStyleCss';
import type { TextStyle } from '~/types/content';

const { fetchBootstrap, createTextStyle, updateTextStyle, deleteTextStyle } = useContentApi();
const { isLoggedIn } = useAdminAuth();

const styles = ref<TextStyle[]>([]);
const loading = ref(true);
const errorMessage = ref('');

// Tri-state so "not set" (inherit the desktop value) is distinguishable from
// an explicit "off" - a plain checkbox can't represent that third state.
type TriBool = '' | 'true' | 'false';
const triBoolToForm = (v: boolean | null): TriBool => (v == null ? '' : v ? 'true' : 'false');
const triBoolToPayload = (v: TriBool): boolean | null => (v === '' ? null : v === 'true');

const emptyForm = () => ({
  id: null as number | null,
  name: '',
  font_family: 'poppins',
  mobile_font_family: '' as string, // '' = same as desktop
  font_weight: 400,
  mobile_font_weight: '' as number | '',
  italic: false,
  mobile_italic: '' as TriBool,
  underline: false,
  mobile_underline: '' as TriBool,
  color: '',
  mobile_color: '',
  min_font_size: 1,
  max_font_size: 2,
  font_size_vw: 3,
  mobile_min_font_size: '' as number | '',
  mobile_max_font_size: '' as number | '',
  mobile_font_size_vw: '' as number | '',
  line_height: '' as number | '',
  mobile_line_height: '' as number | '',
});

const form = ref(emptyForm());
const saving = ref(false);

const load = async () => {
  loading.value = true;
  try {
    const res = await fetchBootstrap('home');
    styles.value = res.textStyles;
  } catch (err: any) {
    errorMessage.value = err?.data?.message || 'Failed to load styles';
  } finally {
    loading.value = false;
  }
};

onMounted(load);

const editStyle = (style: TextStyle) => {
  form.value = {
    id: style.id,
    name: style.name,
    font_family: style.font_family,
    mobile_font_family: style.mobile_font_family || '',
    font_weight: style.font_weight,
    mobile_font_weight: style.mobile_font_weight ?? '',
    italic: style.italic,
    mobile_italic: triBoolToForm(style.mobile_italic),
    underline: style.underline,
    mobile_underline: triBoolToForm(style.mobile_underline),
    color: style.color || '',
    mobile_color: style.mobile_color || '',
    min_font_size: style.min_font_size,
    max_font_size: style.max_font_size,
    font_size_vw: style.font_size_vw,
    mobile_min_font_size: style.mobile_min_font_size ?? '',
    mobile_max_font_size: style.mobile_max_font_size ?? '',
    mobile_font_size_vw: style.mobile_font_size_vw ?? '',
    line_height: style.line_height ?? '',
    mobile_line_height: style.mobile_line_height ?? '',
  };
};

const resetForm = () => {
  form.value = emptyForm();
};

const buildPayload = () => ({
  name: form.value.name,
  font_family: form.value.font_family,
  mobile_font_family: form.value.mobile_font_family || null,
  font_weight: Number(form.value.font_weight),
  mobile_font_weight: form.value.mobile_font_weight === '' ? null : Number(form.value.mobile_font_weight),
  italic: form.value.italic,
  mobile_italic: triBoolToPayload(form.value.mobile_italic),
  underline: form.value.underline,
  mobile_underline: triBoolToPayload(form.value.mobile_underline),
  color: form.value.color || null,
  mobile_color: form.value.mobile_color || null,
  min_font_size: Number(form.value.min_font_size),
  mobile_min_font_size: form.value.mobile_min_font_size === '' ? null : Number(form.value.mobile_min_font_size),
  max_font_size: Number(form.value.max_font_size),
  mobile_max_font_size: form.value.mobile_max_font_size === '' ? null : Number(form.value.mobile_max_font_size),
  font_size_vw: Number(form.value.font_size_vw),
  mobile_font_size_vw: form.value.mobile_font_size_vw === '' ? null : Number(form.value.mobile_font_size_vw),
  line_height: form.value.line_height === '' ? null : Number(form.value.line_height),
  mobile_line_height: form.value.mobile_line_height === '' ? null : Number(form.value.mobile_line_height),
});

const submit = async () => {
  errorMessage.value = '';
  saving.value = true;
  const payload = buildPayload();

  try {
    if (form.value.id) {
      const updated = await updateTextStyle(form.value.id, payload);
      styles.value = styles.value.map((s) => (s.id === updated.id ? updated : s));
    } else {
      const created = await createTextStyle(payload);
      styles.value = [...styles.value, created];
    }
    resetForm();
  } catch (err: any) {
    errorMessage.value = err?.data?.message || 'Failed to save style';
  } finally {
    saving.value = false;
  }
};

const remove = async (style: TextStyle) => {
  if (!confirm(`Delete style "${style.name}"? Any text using it will fall back to its default look.`)) return;
  try {
    await deleteTextStyle(style.id);
    styles.value = styles.value.filter((s) => s.id !== style.id);
  } catch (err: any) {
    errorMessage.value = err?.data?.message || 'Failed to delete style';
  }
};

// Mobile fields only need to round-trip through the same nullable shape
// resolveMobileStyleOverrides expects for the preview below - id/name are
// irrelevant for CSS resolution so they're stubbed.
const formAsTextStyle = computed<TextStyle>(() => ({
  id: 0,
  name: '',
  font_family: form.value.font_family as any,
  mobile_font_family: (form.value.mobile_font_family || null) as any,
  font_weight: Number(form.value.font_weight) as any,
  mobile_font_weight: (form.value.mobile_font_weight === '' ? null : Number(form.value.mobile_font_weight)) as any,
  italic: form.value.italic,
  mobile_italic: triBoolToPayload(form.value.mobile_italic),
  underline: form.value.underline,
  mobile_underline: triBoolToPayload(form.value.mobile_underline),
  color: form.value.color || null,
  mobile_color: form.value.mobile_color || null,
  min_font_size: Number(form.value.min_font_size),
  mobile_min_font_size: form.value.mobile_min_font_size === '' ? null : Number(form.value.mobile_min_font_size),
  max_font_size: Number(form.value.max_font_size),
  mobile_max_font_size: form.value.mobile_max_font_size === '' ? null : Number(form.value.mobile_max_font_size),
  font_size_vw: Number(form.value.font_size_vw),
  mobile_font_size_vw: form.value.mobile_font_size_vw === '' ? null : Number(form.value.mobile_font_size_vw),
  line_height: form.value.line_height === '' ? null : Number(form.value.line_height),
  mobile_line_height: form.value.mobile_line_height === '' ? null : Number(form.value.mobile_line_height),
}));

const previewCss = computed(() => resolveTextStyleCss(formAsTextStyle.value));

// Admin panel doesn't actually shrink to mobile width, so simulate the
// override directly for feedback instead of relying on a real breakpoint -
// reuses the exact same resolver the live site's injected <style> tag does,
// so this preview can't drift from actual mobile behavior.
const mobilePreviewCss = computed(() => ({
  ...previewCss.value,
  ...resolveMobileStyleOverrides(formAsTextStyle.value),
}));
</script>

<template>
  <div class="ts-admin">
    <!-- <h1>Text Styles</h1> -->

    <p v-if="!isLoggedIn()" class="ts-warning">
      You're not logged in as a content editor — <NuxtLink to="/admin/login">log in</NuxtLink> to save changes.
    </p>

    <div class="ts-layout">
      <form class="ts-form" @submit.prevent="submit">
        <h2>{{ form.id ? 'Edit style' : 'New style' }}</h2>

        <label>Name <input v-model="form.name" type="text" required /></label>

        <label>
          Font family
          <select v-model="form.font_family">
            <option value="poppins">Poppins</option>
            <option value="switzer">Switzer</option>
            <option value="inherit">Inherit (don't override)</option>
          </select>
        </label>

        <label>
          Mobile font family override
          <select v-model="form.mobile_font_family">
            <option value="">Same as desktop</option>
            <option value="poppins">Poppins</option>
            <option value="switzer">Switzer</option>
            <option value="inherit">Inherit (don't override)</option>
          </select>
          <span class="ts-hint">Applied only below 900px width. Leave as "Same as desktop" to use the family above everywhere.</span>
        </label>

        <label>
          Font weight
          <select v-model.number="form.font_weight">
            <option :value="400">400</option>
            <option :value="500">500</option>
            <option :value="600">600</option>
            <option :value="700">700</option>
          </select>
        </label>

        <label>
          Mobile font weight override
          <select v-model="form.mobile_font_weight">
            <option value="">Same as desktop</option>
            <option :value="400">400</option>
            <option :value="500">500</option>
            <option :value="600">600</option>
            <option :value="700">700</option>
          </select>
        </label>

        <div class="ts-checkbox-row">
          <label><input v-model="form.italic" type="checkbox" /> Italic</label>
          <label><input v-model="form.underline" type="checkbox" /> Underline</label>
        </div>

        <div class="ts-mobile-tri-row">
          <label>
            Mobile italic
            <select v-model="form.mobile_italic">
              <option value="">Same as desktop</option>
              <option value="true">On</option>
              <option value="false">Off</option>
            </select>
          </label>
          <label>
            Mobile underline
            <select v-model="form.mobile_underline">
              <option value="">Same as desktop</option>
              <option value="true">On</option>
              <option value="false">Off</option>
            </select>
          </label>
        </div>

        <label>Color <input v-model="form.color" type="text" placeholder="#142235" /></label>

        <label>
          Mobile color override
          <input v-model="form.mobile_color" type="text" placeholder="(same as Color above)" />
          <span class="ts-hint">Applied only below 900px width - e.g. white text over a photo background on mobile. Leave blank to use the same color everywhere.</span>
        </label>

        <div class="ts-size">
          <label>Min size (rem) <input v-model.number="form.min_font_size" type="number" step="0.1" required /></label>
          <label>Max size (rem) <input v-model.number="form.max_font_size" type="number" step="0.1" required /></label>
          <label>VW slope <input v-model.number="form.font_size_vw" type="number" step="0.1" required /></label>
        </div>

        <div class="ts-size">
          <label>Mobile min size (rem) <input v-model="form.mobile_min_font_size" type="number" step="0.1" placeholder="(same)" /></label>
          <label>Mobile max size (rem) <input v-model="form.mobile_max_font_size" type="number" step="0.1" placeholder="(same)" /></label>
          <label>Mobile VW slope <input v-model="form.mobile_font_size_vw" type="number" step="0.1" placeholder="(same)" /></label>
        </div>
        <span class="ts-hint">The mobile size clamp only applies once all three mobile fields above are set - leave all three blank to keep the desktop clamp on mobile too.</span>

        <label>Line height <input v-model="form.line_height" type="number" step="0.1" placeholder="(default)" /></label>

        <label>
          Mobile line height override
          <input v-model="form.mobile_line_height" type="number" step="0.1" placeholder="(same as Line height above)" />
        </label>

        <div class="ts-preview-row">
          <div class="ts-preview" :style="previewCss">
            <span class="ts-preview-label">Desktop</span>
            Preview text
          </div>
          <div class="ts-preview ts-preview-mobile" :style="mobilePreviewCss">
            <span class="ts-preview-label">Mobile (&lt;900px)</span>
            Preview text
          </div>
        </div>

        <p v-if="errorMessage" class="ts-error">{{ errorMessage }}</p>

        <div class="ts-form-actions">
          <button type="submit" :disabled="saving">{{ form.id ? 'Save changes' : 'Create style' }}</button>
          <button v-if="form.id" type="button" class="ts-secondary" @click="resetForm">Cancel</button>
        </div>
      </form>

      <div class="ts-table-wrap">
        <h2>Existing styles</h2>
        <p v-if="loading">Loading…</p>
        <table v-else class="ts-table">
          <thead>
            <tr><th>Name</th><th>Preview</th><th></th></tr>
          </thead>
          <tbody>
            <tr v-for="style in styles" :key="style.id">
              <td>{{ style.name }}</td>
              <td><span :style="resolveTextStyleCss(style)">Aa</span></td>
              <td class="ts-row-actions">
                <button type="button" @click="editStyle(style)">Edit</button>
                <button type="button" class="ts-danger" @click="remove(style)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ts-admin {
  // max-width: 60rem;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  display:flex;
flex-direction: column;
  align-items: center;


  h1 { font-size: 1.5rem; font-weight: 700; color: #142235; margin-bottom: 1rem; align-self: flex-start; margin-left:13%; }
  h2 { font-size: 1.1rem; font-weight: 600; color: #142235; margin-bottom: 0.75rem; }
}

.ts-warning {
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  background: #fff4e5;
  color: #8a5a00;
  margin-bottom: 1.5rem;
}

.ts-layout {
  display: grid;
  grid-template-columns: 40rem 60rem;
  gap: 2rem;
  // align-items: center;
  // margin-left: 5rem;

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
  }
}

.ts-form {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: 1.25rem;
  border-radius: 0.75rem;
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);


  label {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    font-size: 0.8rem;
    color: #374151;
  }

  input, select {
    padding: 0.5rem 0.6rem;
    border-radius: 0.4rem;
    border: 1px solid rgba(0, 0, 0, 0.15);
    font-size: 0.9rem;
  }
}

.ts-checkbox-row  {
  display: flex;
  gap: 1rem;

  label {
    flex-direction: row;
    align-items: center;
  }
}

.ts-mobile-tri-row {
  display: flex;
  gap: 0.5rem;

  label {
    flex: 1;
    min-width: 0;
  }
}

.ts-size{
  display: flex;
  gap: 0.5rem;

  flex-direction: column;
}

.ts-size label {
  flex-direction: column;
  flex: 1;
}

.ts-hint {
  font-size: 0.7rem;
  color: #9ca3af;
  font-weight: 400;
}

.ts-preview-row {
  display: flex;
  gap: 0.75rem;
}

.ts-preview {
  position: relative;
  flex: 1;
  padding: 1.5rem 1rem 1rem;
  border-radius: 0.5rem;
  background: rgba(0, 0, 0, 0.02);
}

.ts-preview-mobile {
  background: #142235 url('/images/home/recovery-team-bg.webp') center / cover;
}

.ts-preview-label {
  position: absolute;
  top: 0.4rem;
  left: 0.6rem;
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #9ca3af;
}

.ts-error { color: #c0392b; font-size: 0.85rem; }

.ts-form-actions {
  display: flex;
  gap: 0.5rem;

  button {
    padding: 0.6rem 1rem;
    border: none;
    border-radius: 80px;
    background-color: #142235;
    color: #fff;
    font-weight: 600;
    cursor: pointer;

    &:disabled { opacity: 0.6; cursor: default; }
  }

  .ts-secondary {
    background-color: transparent;
    color: #142235;
    border: 1px solid rgba(0,0,0,0.2);
  }
}

.ts-table-wrap {
  padding: 1.25rem;
  border-radius: 0.75rem;
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
}

.ts-table {
  width: 100%;
  border-collapse: collapse;

  th, td {
    text-align: left;
    padding: 0.6rem 0.5rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    font-size: 0.85rem;
  }
}

.ts-row-actions {
  display: flex;
  gap: 0.5rem;

  button {
    padding: 0.3rem 0.7rem;
    border-radius: 0.4rem;
    border: 1px solid rgba(0, 0, 0, 0.15);
    background: #fff;
    cursor: pointer;
    font-size: 0.8rem;
  }

  .ts-danger { color: #c0392b; border-color: rgba(192, 57, 43, 0.3); }
}
</style>
