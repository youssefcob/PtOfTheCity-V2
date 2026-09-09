<script setup lang="ts">
import { computed, inject, reactive, ref, type Ref } from 'vue';
import EditableText from '~/components/Admin/EditableText.vue';
import InputField from '~/sharedComponents/InputField.vue';
import DropDownResponsive from '~/sharedComponents/DropDownResponsive.vue';
import Loading from '~/sharedComponents/Loading.vue';
import ReferralContactAside from '~/components/shared/ReferralContactAside.vue';
import Validation from '~/mixins/Validation';
import type { Insurance } from '~/types/types';

const toast = useToast();
const isLoading = ref(false);

const homepageData = inject('homepageData') as Ref<{ insurances: Insurance[] }>;
const insurancesList = computed(() => homepageData.value?.insurances.map((insurance) => insurance.title) || []);

const hasReferral = ref(false);
const coverage = ref<'in-network' | 'out-of-network' | 'self-pay'>('in-network');

const form = reactive({
  patient_first_name: '',
  patient_last_name: '',
  patient_dob: '',
  patient_phone: '',
  preferred_language: '',
  preferred_time: '',
  insurance_provider: '',
});

const formErrors = reactive({
  patient_first_name: false,
  patient_last_name: false,
  patient_dob: false,
  patient_phone: false,
  insurance_provider: false,
  files: false,
});

const files = ref<File[]>([]);
const fileInputRef = ref<HTMLInputElement | null>(null);
const triggerFileInput = () => fileInputRef.value?.click();
const handleFileChange = (e: Event) => {
  const list = (e.target as HTMLInputElement).files;
  if (list) { files.value.push(...Array.from(list)); formErrors.files = false; }
};
const handleDrop = (e: DragEvent) => {
  const list = e.dataTransfer?.files;
  if (list) { files.value.push(...Array.from(list)); formErrors.files = false; }
};
const removeFile = (index: number) => files.value.splice(index, 1);

const formValidation = computed(() => ({
  patient_first_name: { rules: ['required', 'letters:only'], message: { required: 'Patient first name is required', letters: 'Name cannot contain numbers or special characters' } },
  patient_last_name: { rules: ['required', 'letters:only'], message: { required: 'Patient last name is required', letters: 'Name cannot contain numbers or special characters' } },
  patient_dob: { rules: ['required', 'date:past', 'min:10'], message: { required: 'Date of birth is required', date: 'Date of birth must be valid and in the past', min: 'Date of birth must be in the format MM-DD-YYYY' } },
  patient_phone: { rules: ['required', 'min:14'], message: { required: 'Phone number is required' } },
  insurance_provider: { rules: [`required:if:coverage==in-network`, { dropdown: insurancesList.value }], message: { required: 'Insurance provider is required' } },
}));

const validate = (): boolean => {
  const v = new Validation(formValidation.value, { ...form, coverage: coverage.value });
  const errs = v.validate();
  if (errs.length) {
    Object.values(errs[0]).forEach((error) => toast.error({ message: error }));
    v.keys.forEach((key) => {
      setTimeout(() => { formErrors[key as keyof typeof formErrors] = false; }, 500);
      formErrors[key as keyof typeof formErrors] = true;
    });
  }

  let filesValid = true;
  if (hasReferral.value && files.value.length === 0) {
    formErrors.files = true;
    toast.error({ message: 'Please upload at least one referral letter' });
    filesValid = false;
  }

  return v.isValid && filesValid;
};

const submit = async () => {
  if (!validate()) return;
  isLoading.value = true;
  try {
    const body = new FormData();
    body.append('role', 'patient');
    body.append('has_referral', String(hasReferral.value));
    body.append('patient_first_name', form.patient_first_name);
    body.append('patient_last_name', form.patient_last_name);
    body.append('patient_dob', form.patient_dob);
    body.append('patient_phone', form.patient_phone.replace(/\D/g, ''));
    body.append('preferred_language', form.preferred_language);
    body.append('preferred_time', form.preferred_time);
    body.append('coverage', coverage.value);
    if (coverage.value === 'in-network') body.append('insurance_provider', form.insurance_provider);
    if (hasReferral.value) files.value.forEach((f) => body.append('files[]', f));

    await $fetch(`${useUrl()}/web/referral`, { method: 'POST', body });
    toast.success({ message: "Referral request submitted! We'll be in touch within one business day." });
    Object.assign(form, {
      patient_first_name: '', patient_last_name: '', patient_dob: '', patient_phone: '',
      preferred_language: '', preferred_time: '', insurance_provider: '',
    });
    files.value = [];
  } catch {
    toast.error({ message: 'Something went wrong. Please try again or call us directly.' });
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="referral-form-section" id="form">
    <Loading v-if="isLoading" />

    <aside class="form-aside">
      <ReferralContactAside page-key="patients-referral" />
    </aside>

    <div class="form-main">
      <div class="form-header">
        <EditableText tag="span" class="eyebrow" content-key="patients-referral.form.eyebrow"
          default="Request Referral Assistance" />
        <EditableText tag="h2" class="heading" content-key="patients-referral.form.heading" default="Let's Get Started." />
        <EditableText tag="p" class="tagline" content-key="patients-referral.form.tagline"
          default="Complete the form below, and one of our patient coordinators will contact you to discuss your referral requirements and next steps." />
      </div>

      <div class="pill-group">
        <span class="pill-label">Referral</span>
        <div class="pills">
          <button type="button" class="pill" :class="{ active: hasReferral }" @click="hasReferral = true">
            I already have a Referral
          </button>
          <button type="button" class="pill" :class="{ active: !hasReferral }" @click="hasReferral = false">
            I don't have a Referral
          </button>
        </div>
      </div>

      <div class="field-grid">
        <InputField cta required label="Patient First Name" placeHolder="Jane" id="patientFirstName" lettersOnly
          @input="form.patient_first_name = $event" :error="formErrors.patient_first_name" />
        <InputField cta required label="Patient Last Name" placeHolder="Smith" id="patientLastName" lettersOnly
          @input="form.patient_last_name = $event" :error="formErrors.patient_last_name" />
        <InputField cta required label="Patient Date of Birth" placeHolder="MM-DD-YYYY" mask="##-##-####"
          id="patientDob" date minYear="-100" maxYear="+10" @input="form.patient_dob = $event"
          :error="formErrors.patient_dob" />
        <InputField cta required label="Patient Phone Number" placeHolder="(212) 555-0100" mask="(###) ###-####"
          id="patientPhone" @input="form.patient_phone = $event" :error="formErrors.patient_phone" />
        <DropDownResponsive cta label="Preferred Language" placeHolder="Select language" id="preferredLanguage"
          :list="['English', 'Spanish', 'Arabic', 'Russian', 'Chinese', 'Other']"
          @input="form.preferred_language = $event" />
        <DropDownResponsive cta label="Preferred Time of Communication" placeHolder="Select a time" id="preferredTime"
          :list="['Morning (8am–12pm)', 'Afternoon (12pm–5pm)', 'Evening (5pm–8pm)']"
          @input="form.preferred_time = $event" />
      </div>

      <div class="pill-group">
        <span class="pill-label">Patient Coverage</span>
        <div class="pills">
          <button type="button" class="pill" :class="{ active: coverage === 'in-network' }"
            @click="coverage = 'in-network'">In-Network</button>
          <button type="button" class="pill" :class="{ active: coverage === 'out-of-network' }"
            @click="coverage = 'out-of-network'">Out-of-Network</button>
          <button type="button" class="pill" :class="{ active: coverage === 'self-pay' }"
            @click="coverage = 'self-pay'">Self-pay</button>
        </div>
      </div>

      <DropDownResponsive v-if="coverage === 'in-network'" cta required label="Insurance provider"
        placeHolder="Select your insurance" id="insuranceProvider" :list="insurancesList"
        @input="form.insurance_provider = $event" :error="formErrors.insurance_provider" />

      <div class="upload-field" v-if="hasReferral">
        <span class="upload-label">Upload Referral <span class="req">*</span></span>
        <div class="upload-area" :class="{ 'upload-error': formErrors.files }" @click="triggerFileInput"
          @dragover.prevent @drop.prevent="handleDrop">
          <input ref="fileInputRef" type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.webp" style="display:none"
            @change="handleFileChange" />
          <p>Drop your referral here or click to upload</p>
        </div>
        <div v-if="files.length" class="uploaded-files" @click.stop>
          <span v-for="(f, i) in files" :key="i" class="file-chip">
            {{ f.name }}
            <button type="button" @click="removeFile(i)">×</button>
          </span>
        </div>
      </div>

      <button type="button" class="submit-btn" :disabled="isLoading" @click="submit">
        <span v-if="isLoading">Submitting…</span>
        <span v-else>Submit Request</span>
      </button>
      <p class="security-note">256-bit encryption · HIPAA compliant · Information is never shared with third parties</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.referral-form-section {
  @include pagePadding();
  padding-top: 4rem;
  padding-bottom: 4rem;
  display: flex;
  gap: 3rem;
  background-color: $white;

  @media screen and (max-width: 900px) {
    flex-direction: column-reverse;
    gap: 2rem;
  }
}

.form-aside {
  width: 22rem;
  flex-shrink: 0;
  position: sticky;
  top: calc($navbarHeight + 2rem);

  @media screen and (max-width: 900px) {
    width: 100%;
    position: static;
  }
}

.form-main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .eyebrow {
    @include type-overline;
    color: $primary-700;
  }

  .heading {
    @include type-h2;
    color: $primary-600;
    margin: 0;
  }

  .tagline {
    @include type-large;
    color: $primary-700;
    margin: 0;
  }
}

.pill-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .pill-label {
    @include type-body;
    color: $primary-700;
  }
}

.pills {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
}

.pill {
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  border: 1px solid $primary-600;
  background: transparent;
  color: $primary-700;
  cursor: pointer;
  @include type-button;
  transition: background-color 0.2s ease;

  &.active {
    background-color: $primary-base;
  }
}

.field-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;

  @media screen and (max-width: 700px) {
    grid-template-columns: 1fr;
  }
}

.form-main {
  :deep(.input-field),
  :deep(.booking-input-field) {
    border: 1px solid rgba(3, 41, 46, 0.2);
    border-radius: 0;
    font-family: $font-poppins;
    font-size: 1.15rem;
    color: $primary-700;
    background-color: $white;

    &.ctac {
      border: 1px solid rgba(3, 41, 46, 0.2);
    }
  }
}

.upload-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .upload-label {
    @include type-body;
    color: $primary-700;

    .req {
      color: #ff282b;
    }
  }

  .upload-area {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 9rem;
    padding: 1.5rem;
    border-radius: 1rem;
    background-color: rgba(107, 114, 128, 0.2);
    cursor: pointer;
    text-align: center;

    &.upload-error {
      outline: 2px solid #e53e3e;
    }

    p {
      @include type-body;
      color: rgba(1, 20, 23, 0.5);
      margin: 0;
    }
  }

  .uploaded-files {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .file-chip {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    background: rgba(3, 41, 46, 0.07);
    border-radius: 999px;
    padding: 0.35rem 0.85rem;
    @include type-caption;
    color: $primary-700;

    button {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1.1rem;
      color: $primary-700;
      line-height: 1;

      &:hover {
        color: #e53e3e;
      }
    }
  }
}

.submit-btn {
  width: 100%;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  border: none;
  background-color: $primary-400;
  color: $white;
  @include type-button;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: darken(#15707c, 8%);
  }

  &:disabled {
    opacity: 0.6;
    cursor: progress;
  }
}

.security-note {
  @include type-body;
  color: $primary-700;
  text-align: center;
  margin: 0;
}
</style>
