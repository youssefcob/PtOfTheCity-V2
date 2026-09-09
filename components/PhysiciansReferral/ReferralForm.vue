<script setup lang="ts">
import { reactive, ref } from 'vue';
import EditableText from '~/components/Admin/EditableText.vue';
import InputField from '~/sharedComponents/InputField.vue';
import DropDownResponsive from '~/sharedComponents/DropDownResponsive.vue';
import Loading from '~/sharedComponents/Loading.vue';
import ReferralContactAside from '~/components/shared/ReferralContactAside.vue';
import Validation from '~/mixins/Validation';

const toast = useToast();
const isLoading = ref(false);

const form = reactive({
  patient_first_name: '',
  patient_last_name: '',
  patient_dob: '',
  patient_phone: '',
  preferred_language: '',
  preferred_time: '',
  physician_first_name: '',
  physician_last_name: '',
  physician_phone: '',
  physician_email: '',
  organization: '',
});

const formErrors = reactive({
  patient_first_name: false,
  patient_last_name: false,
  patient_dob: false,
  patient_phone: false,
  physician_first_name: false,
  physician_last_name: false,
  physician_phone: false,
});

const files = ref<File[]>([]);
const fileInputRef = ref<HTMLInputElement | null>(null);
const triggerFileInput = () => fileInputRef.value?.click();
const handleFileChange = (e: Event) => {
  const list = (e.target as HTMLInputElement).files;
  if (list) files.value.push(...Array.from(list));
};
const handleDrop = (e: DragEvent) => {
  const list = e.dataTransfer?.files;
  if (list) files.value.push(...Array.from(list));
};
const removeFile = (index: number) => files.value.splice(index, 1);

const formValidation = {
  patient_first_name: { rules: ['required', 'letters:only'], message: { required: 'Patient first name is required', letters: 'Name cannot contain numbers or special characters' } },
  patient_last_name: { rules: ['required', 'letters:only'], message: { required: 'Patient last name is required', letters: 'Name cannot contain numbers or special characters' } },
  patient_dob: { rules: ['required', 'date:past', 'min:10'], message: { required: 'Patient date of birth is required', date: 'Date of birth must be valid and in the past', min: 'Date of birth must be in the format MM-DD-YYYY' } },
  patient_phone: { rules: ['required', 'min:14'], message: { required: 'Patient phone number is required' } },
  physician_first_name: { rules: ['required', 'letters:only'], message: { required: 'Physician first name is required', letters: 'Name cannot contain numbers or special characters' } },
  physician_last_name: { rules: ['required', 'letters:only'], message: { required: 'Physician last name is required', letters: 'Name cannot contain numbers or special characters' } },
  physician_phone: { rules: ['required', 'min:14'], message: { required: 'Physician phone number is required' } },
};

const validate = (): boolean => {
  const v = new Validation(formValidation, form);
  const errs = v.validate();
  if (errs.length) {
    Object.values(errs[0]).forEach((error) => toast.error({ message: error }));
    v.keys.forEach((key) => {
      setTimeout(() => { formErrors[key as keyof typeof formErrors] = false; }, 500);
      formErrors[key as keyof typeof formErrors] = true;
    });
  }
  return v.isValid;
};

const submit = async () => {
  if (!validate()) return;
  isLoading.value = true;
  try {
    const body = new FormData();
    body.append('role', 'physician');
    body.append('patient_first_name', form.patient_first_name);
    body.append('patient_last_name', form.patient_last_name);
    body.append('patient_dob', form.patient_dob);
    body.append('patient_phone', form.patient_phone.replace(/\D/g, ''));
    body.append('preferred_language', form.preferred_language);
    body.append('preferred_time', form.preferred_time);
    body.append('physician_first_name', form.physician_first_name);
    body.append('physician_last_name', form.physician_last_name);
    body.append('physician_phone', form.physician_phone.replace(/\D/g, ''));
    body.append('physician_email', form.physician_email);
    body.append('organization', form.organization);
    files.value.forEach((f) => body.append('files[]', f));

    await $fetch(`${useUrl()}/web/referral`, { method: 'POST', body });
    toast.success({ message: "Referral submitted! We'll contact your patient promptly." });
    Object.assign(form, {
      patient_first_name: '', patient_last_name: '', patient_dob: '', patient_phone: '',
      preferred_language: '', preferred_time: '', physician_first_name: '', physician_last_name: '',
      physician_phone: '', physician_email: '', organization: '',
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
      <ReferralContactAside page-key="physicians-referral" />
    </aside>

    <div class="form-main">
      <div class="form-header">
        <EditableText tag="span" class="eyebrow" content-key="physicians-referral.form.eyebrow"
          default="Secure Referral Form" />
        <EditableText tag="h2" class="heading" content-key="physicians-referral.form.heading" default="Refer a Patient" />
        <EditableText tag="p" class="tagline" content-key="physicians-referral.form.tagline"
          default="Complete the form below and our intake team will contact your patient promptly to schedule their first appointment." />
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
        <InputField cta required label="Physician First Name" placeHolder="Jane" id="physicianFirstName" lettersOnly
          @input="form.physician_first_name = $event" :error="formErrors.physician_first_name" />
        <InputField cta required label="Physician Last Name" placeHolder="Smith" id="physicianLastName" lettersOnly
          @input="form.physician_last_name = $event" :error="formErrors.physician_last_name" />
        <InputField cta required label="Physician Phone Number" placeHolder="(212) 555-0100" mask="(###) ###-####"
          id="physicianPhone" @input="form.physician_phone = $event" :error="formErrors.physician_phone" />
        <InputField cta label="Email Address" placeHolder="dr@ptofthecity.com" id="physicianEmail"
          @input="form.physician_email = $event" />
        <InputField cta label="Organization Name" placeHolder="PT of the City" id="organization"
          @input="form.organization = $event" />
      </div>

      <div class="upload-field">
        <span class="upload-label">Upload Referral <span class="optional">(optional)</span></span>
        <div class="upload-area" @click="triggerFileInput" @dragover.prevent @drop.prevent="handleDrop">
          <input ref="fileInputRef" type="file" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" style="display:none"
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
        <span v-else>Submit referral</span>
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
  gap: 2.5rem;
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

    .optional {
      color: rgba(1, 20, 23, 0.5);
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
