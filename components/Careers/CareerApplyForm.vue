<script setup lang="ts">
import { vMaska } from 'maska/vue';
import EditableText from '~/components/Admin/EditableText.vue';
import Loading from '~/sharedComponents/Loading.vue';
import Validation from '~/mixins/Validation';
import Http from '~/mixins/Http';
import type { Job } from '~/types/types';
import { jobSlug } from '~/utils/jobUtils';

const props = defineProps<{
  jobs: Job[];
  // slug from ?position=, pre-selects the Job Title
  initialPosition?: string;
}>();

const toast = useToast();
const isLoading = ref(false);

const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida',
  'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma',
  'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah',
  'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
];

const emptyForm = () => ({
  position: '',
  first_name: '',
  last_name: '',
  phone: '',
  email: '',
  street_address: '',
  city: '',
  state: '',
  zip_code: '',
});

const form = reactive(emptyForm());
const resume = ref<File | null>(null);

// Pre-select the role picked on the listing/detail page, once the list is in.
watch(
  () => props.jobs,
  (jobs) => {
    if (!form.position && props.initialPosition && jobs.some((job) => jobSlug(job) === props.initialPosition)) {
      form.position = props.initialPosition;
    }
  },
  { immediate: true },
);

const selectedJob = computed(() => props.jobs.find((job) => jobSlug(job) === form.position));

// --- CV upload (drop zone + hidden input) ---
const fileInput = ref<HTMLInputElement | null>(null);
const dragging = ref(false);

const setResume = (file: File | undefined) => {
  if (!file) return;
  if (!file.name.toLowerCase().endsWith('.pdf')) {
    toast.error({ title: 'Error!', message: 'Your CV must be a PDF file (.pdf).' });
    return;
  }
  resume.value = file;
};

const onFileChange = (e: Event) => {
  setResume((e.target as HTMLInputElement).files?.[0]);
  if (fileInput.value) fileInput.value.value = '';
};

const onDrop = (e: DragEvent) => {
  dragging.value = false;
  setResume(e.dataTransfer?.files?.[0]);
};

// --- validation, same rules as the previous careers form ---
const formValidation = {
  position: { rules: ['required'], message: { required: 'Please select a job title' } },
  first_name: { rules: ['required', 'letters'], message: { required: 'First name is required', letters: 'First name cannot contain numbers or special characters' } },
  last_name: { rules: ['required', 'letters'], message: { required: 'Last name is required', letters: 'Last name cannot contain numbers or special characters' } },
  phone: { rules: ['required', 'min:14'], message: { required: 'Phone number is required', min: 'Please enter a valid phone number' } },
  email: { rules: ['required', 'email'], message: { required: 'Email is required', email: 'Please enter a valid email' } },
};

const errors = reactive<Record<string, boolean>>({});

const validate = (): boolean => {
  const v = new Validation(formValidation, form);
  const found = v.validate();
  const messages = found.length ? Object.values(found[0]) as string[] : [];
  if (!resume.value) messages.push('Please attach your CV');

  Object.keys(errors).forEach((key) => delete errors[key]);
  v.keys.forEach((key: string) => (errors[key] = true));
  if (!resume.value) errors.resume = true;

  messages.forEach((message) => toast.error({ title: 'Error!', message }));
  return messages.length === 0;
};

const submit = async () => {
  if (!validate() || !selectedJob.value || !resume.value) return;
  isLoading.value = true;

  const body = new FormData();
  body.append('position_id', String(selectedJob.value.id));
  body.append('job', selectedJob.value.title);
  body.append('first_name', form.first_name);
  body.append('last_name', form.last_name);
  body.append('email', form.email);
  body.append('phone', form.phone.replace(/\D/g, ''));
  body.append('resume', resume.value);
  if (form.street_address) body.append('street_address', form.street_address);
  if (form.city) body.append('city', form.city);
  if (form.state) body.append('state', form.state);
  if (form.zip_code) body.append('zip_code', form.zip_code);

  try {
    await Http.post('/career', body);
    toast.success({ title: 'Success!', message: "Application sent! We'll be in touch soon." });
    Object.assign(form, emptyForm());
    resume.value = null;
  } catch (e) {
    toast.error({ title: 'Error!', message: typeof e === 'string' ? e : 'Something went wrong. Please try again.' });
  } finally {
    isLoading.value = false;
  }
};

const hours = [
  { id: 'monday', day: 'Monday', time: '8:00 AM – 6:00 PM' },
  { id: 'tuesday', day: 'Tuesday', time: '8:00 AM – 6:00 PM' },
  { id: 'wednesday', day: 'Wednesday', time: '8:00 AM – 6:00 PM' },
  { id: 'thursday', day: 'Thursday', time: '8:00 AM – 6:00 PM' },
  { id: 'friday', day: 'Friday', time: '8:00 AM – 6:00 PM' },
  { id: 'saturday', day: 'Saturday', time: '9:00 AM – 2:00 PM' },
];

const ck = (s: string) => `careers.apply.${s}`;
</script>

<template>
  <section class="apply">
    <Loading v-if="isLoading" />

    <div class="apply-intro">
      <EditableText tag="h1" class="title" :content-key="ck('title')" default="Become a part of our family" />
      <EditableText tag="p" class="intro" :content-key="ck('intro')"
        default="We foster a collaborative environment where dedicated professionals unite to enhance the mobility and well-being of our New York community." />
    </div>

    <form class="apply-form" novalidate @submit.prevent="submit">
      <label class="field">
        <span class="label">Job Title<span class="req"> *</span></span>
        <select v-model="form.position" class="control control--select" :class="{ 'has-error': errors.position }">
          <option value="" disabled>Select a position</option>
          <option v-for="job in jobs" :key="job.id" :value="jobSlug(job)">{{ job.title }}</option>
        </select>
      </label>

      <div class="pair">
        <label class="field">
          <span class="label">Your First Name<span class="req"> *</span></span>
          <input v-model="form.first_name" class="control" :class="{ 'has-error': errors.first_name }" type="text"
            autocomplete="given-name" placeholder="John" />
        </label>
        <label class="field">
          <span class="label">Your Last Name<span class="req"> *</span></span>
          <input v-model="form.last_name" class="control" :class="{ 'has-error': errors.last_name }" type="text"
            autocomplete="family-name" placeholder="Example" />
        </label>
        <label class="field">
          <span class="label">Your Phone Number<span class="req"> *</span></span>
          <input v-model="form.phone" v-maska="'(###) ###-####'" class="control" :class="{ 'has-error': errors.phone }"
            type="tel" autocomplete="tel" placeholder="(555) 123-4567" />
        </label>
        <label class="field">
          <span class="label">Your Email Address<span class="req"> *</span></span>
          <input v-model="form.email" class="control" :class="{ 'has-error': errors.email }" type="email"
            autocomplete="email" placeholder="john.doe@example.com" />
        </label>
      </div>

      <div class="field">
        <span class="label label--cv">Attach Your CV<span class="req"> *</span></span>
        <button type="button" class="drop-zone" :class="{ 'is-dragging': dragging, 'has-error': errors.resume }"
          @click="fileInput?.click()" @dragover.prevent="dragging = true" @dragleave.prevent="dragging = false"
          @drop.prevent="onDrop">
          <img class="drop-icon" src="/images/careers/upload.svg" width="24" height="24" alt="" aria-hidden="true" />
          <span v-if="resume" class="drop-text">{{ resume.name }}</span>
          <span v-else class="drop-text">Drop your CV here or click to upload</span>
        </button>
        <input ref="fileInput" type="file" accept=".pdf,application/pdf" hidden @change="onFileChange" />
      </div>

      <div class="address">
        <label class="field">
          <span class="label">Home Address</span>
          <input v-model="form.street_address" class="control" type="text" autocomplete="street-address"
            placeholder="123 Main St" />
        </label>
        <div class="address-row">
          <label class="field">
            <span class="label">Your City</span>
            <input v-model="form.city" class="control" type="text" autocomplete="address-level2" placeholder="New York" />
          </label>
          <label class="field">
            <span class="label">Your State</span>
            <select v-model="form.state" class="control control--select">
              <option value="">Select a state</option>
              <option v-for="state in states" :key="state" :value="state">{{ state }}</option>
            </select>
          </label>
          <label class="field field--zip">
            <span class="label">Postal Code</span>
            <input v-model="form.zip_code" class="control" type="text" inputmode="numeric" autocomplete="postal-code"
              placeholder="10001" />
          </label>
        </div>
      </div>

      <button type="submit" class="submit" :disabled="isLoading">Send Application</button>
    </form>

    <aside class="apply-aside">
      <!-- empty space where the Figma has a "water caustic" shader fill -->
      <div class="aside-image" aria-hidden="true"></div>

      <div class="hours">
        <EditableText tag="h2" class="aside-heading hours-heading" :content-key="ck('hours.heading')" default="Office Hours" />
        <dl class="hours-list">
          <div v-for="row in hours" :key="row.id" class="hours-row">
            <EditableText tag="span" class="hours-day" :content-key="ck(`hours.${row.id}.day`)" :default="row.day" />
            <EditableText tag="span" class="hours-time" :content-key="ck(`hours.${row.id}.time`)" :default="row.time" />
          </div>
        </dl>
      </div>

      <div class="assist">
        <EditableText tag="p" class="aside-heading" :content-key="ck('assist.heading')" default="Need assistance? Reach us at" />
        <EditableText tag="p" class="assist-phone" :content-key="ck('assist.phone')" default="(555) 987-6543" />
      </div>
    </aside>
  </section>
</template>

<style scoped lang="scss">
$mobile: 900px;
$field-border: rgba(3, 41, 46, 0.2);

// Figma: a 79.2rem form column and a 38.4rem aside, 2.4rem apart. The intro
// sits above the form; the aside starts level with the intro.
.apply {
  display: grid;
  grid-template-columns: minmax(0, 79.2rem) minmax(0, 38.4rem);
  grid-template-areas:
    'intro aside'
    'form aside';
  grid-template-rows: auto 1fr;
  column-gap: 2.4rem;
  row-gap: 1.6rem;
  @include pagePadding();
  padding-top: 3rem;
  padding-bottom: 12rem;

  // mobile: intro, form, then the office hours band
  @media screen and (max-width: $mobile) {
    display: flex;
    flex-direction: column;
    gap: 0;
    padding: 0;
    background-color: $surface-cream;
  }

  :deep(span) {
    color: inherit;
  }
}

.apply-intro {
  grid-area: intro;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  @media screen and (max-width: $mobile) {
    gap: 1.2rem;
    padding: 3.2rem 2rem 2.4rem;
  }
}

.title {
  @include type-h2;
  text-transform: uppercase;
  color: $primary-600;

  @media screen and (max-width: $mobile) {
    font-weight: 700;
    font-size: 28px;
    line-height: 34px;
    letter-spacing: 0;
    color: $primary-700;
  }
}

.intro {
  max-width: 61.6rem;
  @include type-large;
  text-transform: uppercase;
  color: $primary-700;

  @media screen and (max-width: $mobile) {
    font-size: 16px;
    line-height: 26px;
    text-transform: none;
  }
}

.apply-form {
  grid-area: form;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  @media screen and (max-width: $mobile) {
    gap: 2rem;
    padding: 0.8rem 2rem 3.2rem;
  }
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  min-width: 0;
}

.label {
  @include type-large;
  text-transform: uppercase;
  color: $primary-700;

  @media screen and (max-width: $mobile) {
    font-weight: 500;
    font-size: 16px;
    line-height: normal;
    text-transform: none;
  }
}

.label--cv {
  padding: 1rem;

  @media screen and (max-width: $mobile) {
    padding: 0;
  }
}

.label .req {
  font: inherit;
  color: #d43f2b !important;
}

// scoped under .apply-form: _classes.scss (injected into every component's
// scoped styles) has an `input[type="text"]` rule that would otherwise win
.apply-form .control {
  width: 100%;
  height: 5.6rem;
  padding: 1.6rem 2rem;
  border: 1px solid $field-border;
  border-radius: 0;
  background-color: transparent;
  @include type-body;
  color: $primary-700;
  outline: none;
  appearance: none;

  &::placeholder {
    color: rgba(1, 20, 23, 0.45);
  }

  &:focus {
    border-color: $primary-400;
  }

  &.has-error {
    border-color: #d43f2b;
  }

  @media screen and (max-width: $mobile) {
    height: 5.2rem;
    padding: 1.4rem 1.6rem;
    border-radius: 0.8rem;
    background-color: #ffffff;
    font-size: 16px;
    line-height: normal;
  }
}

.apply-form .control--select {
  padding-right: 5rem;
  background: transparent url('/images/careers/form-chevron.svg') no-repeat right 2rem center / 1.6rem;
  cursor: pointer;

  // an unpicked select shows its placeholder option in the placeholder color
  &:invalid,
  &:has(option[value='']:checked) {
    color: rgba(1, 20, 23, 0.45);
  }

  @media screen and (max-width: $mobile) {
    background: #ffffff url('/images/careers/m-form-chevron.svg') no-repeat right 1.6rem center / 2rem;
  }
}

.pair {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2.4rem;

  @media screen and (max-width: $mobile) {
    grid-template-columns: minmax(0, 1fr);
    gap: 2rem;
  }
}

.drop-zone {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  width: 100%;
  height: 14.3rem;
  padding: 1rem 2.4rem;
  border: 1px solid transparent;
  border-radius: 1.6rem;
  background-color: rgba(107, 114, 128, 0.2);
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;

  &:hover,
  &.is-dragging {
    background-color: rgba(107, 114, 128, 0.28);
  }

  &.has-error {
    border-color: #d43f2b;
  }

  @media screen and (max-width: $mobile) {
    height: 12rem;
    padding: 2.4rem 1.6rem;
    border: 1px dashed $primary-400;
    border-radius: 1.2rem;
    background-color: rgba(107, 114, 128, 0.08);
  }
}

.drop-icon {
  display: none;

  @media screen and (max-width: $mobile) {
    display: block;
  }
}

.drop-text {
  @include type-body;
  color: rgba(1, 20, 23, 0.5) !important;
  text-align: center;
  word-break: break-word;

  @media screen and (max-width: $mobile) {
    font-weight: 500;
    font-size: 16px;
    line-height: normal;
    color: $primary-400 !important;
  }
}

.address {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  @media screen and (max-width: $mobile) {
    gap: 2rem;
  }
}

.address-row {
  display: grid;
  grid-template-columns: minmax(0, 28.2rem) minmax(0, 28.1rem) minmax(0, 18.1rem);
  gap: 2.4rem;

  @media screen and (max-width: $mobile) {
    grid-template-columns: minmax(0, 1fr);
    gap: 2rem;
  }
}

.submit {
  width: 100%;
  height: 5.6rem;
  border: 0;
  border-radius: 1.2rem;
  background-color: $primary-400;
  @include type-button;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;

  &:hover:not(:disabled) {
    background-color: $primary-600;
  }

  &:disabled {
    opacity: 0.6;
    cursor: wait;
  }

  @media screen and (max-width: $mobile) {
    height: auto;
    padding: 1.6rem;
    line-height: normal;
    letter-spacing: 0;
  }
}

.apply-aside {
  grid-area: aside;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  @media screen and (max-width: $mobile) {
    gap: 0;
    padding-bottom: 1.6rem;
  }
}

.aside-image {
  height: 36.1rem;

  @media screen and (max-width: $mobile) {
    display: none;
  }
}

.aside-heading {
  @include type-overline;
  color: $primary-700;
}

.hours {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  // mobile: a white band with hairlines above and below
  @media screen and (max-width: $mobile) {
    padding: 3.2rem 2rem 2.4rem;
    border-top: 1px solid $field-border;
    border-bottom: 1px solid $field-border;
    background-color: #ffffff;
  }
}

.hours-heading {
  @media screen and (max-width: $mobile) {
    font-family: $font-switzer;
    font-weight: 700;
    font-size: 22px;
    line-height: normal;
    letter-spacing: 0;
    text-transform: none;
    color: $primary-600;
  }
}

.hours-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin: 0;

  @media screen and (max-width: $mobile) {
    gap: 0;
  }
}

.hours-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;
  color: $primary-700;

  @media screen and (max-width: $mobile) {
    padding: 1rem 0;
    border-bottom: 1px solid $field-border;
  }
}

.hours-day {
  @include type-body;

  @media screen and (max-width: $mobile) {
    font-weight: 500;
    font-size: 16px;
    line-height: normal;
  }
}

// under .hours-row so it outranks .apply's `:deep(span) { color: inherit }`
.hours-row .hours-time {
  @include type-overline;

  @media screen and (max-width: $mobile) {
    font-weight: 400;
    font-size: 16px;
    line-height: normal;
    letter-spacing: 0;
    text-transform: none;
    color: $primary-400;
  }
}

.assist {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  // not part of the mobile design
  @media screen and (max-width: $mobile) {
    display: none;
  }
}

.assist-phone {
  @include type-body;
  color: $primary-700;
}
</style>
