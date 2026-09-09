<script setup lang="ts">
import { computed, inject, reactive, ref, type Ref } from 'vue';
import Http from '~/mixins/Http';
import validation from '~/mixins/Validation';
import InputField from '~/sharedComponents/InputField.vue';
import DropDownResponsive from '~/sharedComponents/DropDownResponsive.vue';
import Loading from '~/sharedComponents/Loading.vue';
import EditableText from '~/components/Admin/EditableText.vue';
import type { Insurance } from '~/types/types';

const isLoading: Ref<boolean> = ref(false);
const toast = useToast();

const homepageData = inject('homepageData') as Ref<{ insurances: Insurance[] }>;
const insurancesList = computed(() => homepageData.value?.insurances.map((insurance) => insurance.title) || []);

const form = reactive({
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  insurance: '',
  memberId: '',
  gender: '',
  dob: '',
  medicareId: '',
  medicaidId: '',
});

const formValidation = computed(() => ({
  firstName: { rules: ['required', 'letters:only'], message: { required: 'First Name Is Required', letters: 'Name Cannot Contain Numbers Or Special Characters' } },
  lastName: { rules: ['required', 'letters:only'], message: { required: 'Last Name Is Required', letters: 'Name Cannot Contain Numbers Or Special Characters' } },
  phone: { rules: ['required', 'min:14'] },
  email: { rules: ['required', 'email'] },
  insurance: { rules: ['required', { dropdown: insurancesList.value }], message: { required: 'Insurance Provider Is Required' } },
  memberId: { rules: ['required'] },
  gender: { rules: ['required', { dropdown: ['Male', 'Female', 'Other', 'Prefer not to say'] }], message: { required: 'Gender Is Required', dropdown: 'Please Pick A Valid Gender' } },
  dob: { rules: ['required', 'date:past', 'min:10'], message: { required: 'Date Of Birth Is Required', date: 'Date Of Birth Must Be Valid And In The Past', min: 'Date Of Birth Must Be In The Format MM-DD-YYYY' } },
  medicareId: { rules: [] },
  medicaidId: { rules: [] },
}));

const formErrors = reactive({
  firstName: false, lastName: false, phone: false, email: false, insurance: false,
  memberId: false, gender: false, dob: false, medicareId: false, medicaidId: false,
});

const validate = () => {
  const v = new validation(formValidation.value, form);
  v.validate();
  const errors = v.errors;
  if (errors.length) {
    Object.values(errors[0]).forEach((error) => toast.error({ message: error }));
    v.keys.forEach((key) => {
      setTimeout(() => { formErrors[key as keyof typeof formErrors] = false; }, 500);
      formErrors[key as keyof typeof formErrors] = true;
    });
  }
  return v.isValid;
};

const modifyForm = () => {
  const formData = new FormData();
  formData.append('firstName', form.firstName);
  formData.append('lastName', form.lastName);
  formData.append('phone', form.phone.replace(/\D/g, ''));
  formData.append('email', form.email);
  formData.append('insurance_provider', form.insurance);
  formData.append('member_id', form.memberId);
  formData.append('gender', form.gender);
  formData.append('dob', form.dob);
  if (form.medicareId) formData.append('medicare_id', form.medicareId);
  if (form.medicaidId) formData.append('medicaid_id', form.medicaidId);
  return formData;
};

const submit = async () => {
  if (!validate()) return;
  isLoading.value = true;
  try {
    await Http.post('/insurance/create', modifyForm());
    toast.success({ message: 'Form Submitted Successfully' });
    ;(window as any).dataLayer?.push({ event: 'insurance_eligibility_submitted' });
  } catch (e) {
    const error = e as { message: string; response?: { status: number } };
    if (error.response?.status === 413) {
      toast.error({ message: 'File Size Too Large' });
    } else {
      toast.error({ message: error.message || 'Form Submission Failed' });
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="eligibility">
    <Loading v-if="isLoading" />
    <div class="eligibility-copy">
      <EditableText tag="span" class="eyebrow" content-key="insurances.eligibility.eyebrow"
        default="Check Your Eligibility" />
      <EditableText tag="h2" class="title" content-key="insurances.eligibility.title"
        default="It only takes few minutes" />
      <EditableText tag="p" class="description" content-key="insurances.eligibility.description"
        default="Complete the form below and our insurance team will review your benefits. Most requests are processed within one business day." />
    </div>

    <div class="eligibility-form">
      <div class="fields">
        <InputField cta label="Your First Name" placeHolder="John" id="firstName" required lettersOnly
          @input="form.firstName = $event" :error="formErrors.firstName" />
        <InputField cta label="Your Last Name" placeHolder="Example" id="lastName" required lettersOnly
          @input="form.lastName = $event" :error="formErrors.lastName" />
        <InputField cta label="Your Phone Number" placeHolder="(555) 123-4567" mask="(###) ###-####" id="phone"
          required @input="form.phone = $event" :error="formErrors.phone" />
        <InputField cta label="Email Address" placeHolder="(555) 123-4567" id="email" required
          @input="form.email = $event" :error="formErrors.email" />
        <DropDownResponsive cta label="Insurance provider" placeHolder="Example" id="insurance" required
          :list="insurancesList" @input="form.insurance = $event" :error="formErrors.insurance" />
        <InputField cta label="Member ID" placeHolder="123456gg" id="memberId" required
          @input="form.memberId = $event" :error="formErrors.memberId" />
        <DropDownResponsive cta label="Gender" placeHolder="Example" id="gender" required
          :list="['Male', 'Female', 'Other', 'Prefer not to say']" @input="form.gender = $event"
          :error="formErrors.gender" />
        <InputField cta label="Date of Birth" placeHolder="12-12-1998" mask="##-##-####" id="dob" required date
          minYear="-100" maxYear="+10" @input="form.dob = $event" :error="formErrors.dob" />
        <InputField cta label="Medicare ID" placeHolder="000000" id="medicareId" @input="form.medicareId = $event" />
        <InputField cta label="Medicaid ID" placeHolder="000000" id="medicaidId" @input="form.medicaidId = $event" />
      </div>

      <button type="button" :disabled="isLoading" @click="submit" class="submit-btn">
        <span v-if="isLoading">Submitting...</span>
        <EditableText v-else tag="span" content-key="insurances.eligibility.submit_label"
          default="Verify Eligibility" />
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.eligibility {
  position: relative;
  @include pagePadding();
  padding-top: 4rem;
  padding-bottom: 4rem;
  display: flex;
  gap: 3rem;
  background-color: $primary-600;
  overflow: hidden;

  @media screen and (max-width: 900px) {
    flex-direction: column;
    gap: 2rem;
  }
}

.eligibility-copy {
  width: 33%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media screen and (max-width: 900px) {
    width: 100%;
  }

  .eyebrow {
    @include type-overline;
    color: $primary-base;
  }

  .title {
    @include type-h2;
    color: $white;
    margin: 0;
  }

  .description {
    @include type-large;
    color: $white;
    margin: 0;
  }
}

.eligibility-form {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  .fields {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;

    @media screen and (max-width: 700px) {
      grid-template-columns: 1fr;
    }
  }

  :deep(.field-label) {
    color: $white;
  }

  :deep(.input-field),
  :deep(.booking-input-field) {
    border: 1px solid rgba(3, 41, 46, 0.2);
    border-radius: 0;
    font-family: $font-poppins;
    font-size: 1.15rem;
    color: $primary-700;
    background-color: $white;
  }

  .submit-btn {
    width: fit-content;
    padding: 1rem 2rem;
    border-radius: 0.75rem;
    border: 1px solid $primary-600;
    background-color: $primary-base;
    color: $primary-700;
    @include type-button;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: darken(#2bc0d4, 6%);
    }

    &:disabled {
      opacity: 0.6;
      cursor: progress;
    }

    @media screen and (max-width: 700px) {
      width: 100%;
    }
  }
}
</style>
