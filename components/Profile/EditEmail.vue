<template>
  <div class="edit-email-container">
    <!-- Step 1: Enter New Email -->
    <div v-if="step === 1" class="step-content">
      <h2 class="form-title">Update Email Address</h2>
      <p class="form-subtitle">Enter your new email address to receive a verification code</p>
      
      <div class="form-field">
        <span class="form-label">New Email</span>
        <InputField 
          type="email" 
          placeHolder="Enter your new email" 
          NoLabel 
          v-model="form.email" 
          :error="formErrors.email"
        />
      </div>

      <div class="auth-actions">
        <button class="btn cta submit" @click="sendOTP" :disabled="isLoading">
          {{ isLoading ? 'Sending...' : 'Send Verification Code' }}
        </button>
      </div>
    </div>

    <!-- Step 2: Enter OTP -->
    <div v-if="step === 2" class="step-content">
      <h2 class="form-title">Verify Email</h2>
      <p class="form-subtitle">Enter the code sent to {{ form.email }}</p>

      <div class="form-field">
        <span class="form-label">Verification Code</span>
        <verification-o-t-p-field v-model="form.otp" />
      </div>

      <div class="auth-actions">
        <button class="btn secondary-btn" @click="step = 1" :disabled="isLoading">
          Back
        </button>
        <button class="btn cta submit" @click="confirmEmail" :disabled="isLoading">
          {{ isLoading ? 'Verifying...' : 'Verify Email' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import validation from '~/mixins/Validation';
import InputField from '~/sharedComponents/InputField.vue';

const toast = useToast();
const { apiFetch } = useApi();
const step = ref(1);

const form = reactive({
  email: '',
  otp: '',
});

const formValidationStep1 = {
  email: {
    rules: ['required', 'email'],
  },
};

const formValidationStep2 = {
  otp: {
    rules: ['required'],
  },
};

const formErrors = reactive({
  email: false,
  otp: false,
});

const validateStep1 = () => {
  let v = new validation(formValidationStep1, form);
  v.validate();
  let errors = v.errors;

  if (errors.length) {
    let errorsArr = Object.values(errors[0]);
    let keys = v.keys;

    errorsArr.forEach((error) => {
      toast.error({ message: error });
    });

    keys.forEach((key) => {
      setTimeout(() => {
        formErrors[key as keyof typeof formErrors] = false;
      }, 500);
      formErrors[key as keyof typeof formErrors] = true;
    });
  }

  return v.isValid;
};

const validateStep2 = () => {
  let v = new validation(formValidationStep2, form);
  v.validate();
  let errors = v.errors;

  if (errors.length) {
    let errorsArr = Object.values(errors[0]);
    let keys = v.keys;

    errorsArr.forEach((error) => {
      toast.error({ message: error });
    });

    keys.forEach((key) => {
      setTimeout(() => {
        formErrors[key as keyof typeof formErrors] = false;
      }, 500);
      formErrors[key as keyof typeof formErrors] = true;
    });
  }

  return v.isValid;
};

const isLoading = ref(false);

// Step 1: Send OTP to new email
const sendOTP = async () => {
  let isValid = validateStep1();
  if (!isValid) return;

  isLoading.value = true;

  try {
    await apiFetch('/user/updateEmail', {
      method: 'POST',
      body: { email: form.email }
    });
    toast.success({ message: 'Verification code sent to your new email' });
    step.value = 2;
  } catch (e: any) {
    console.log(e);
    toast.error({ message: e?.data?.message || 'Failed to send verification code' });
  } finally {
    isLoading.value = false;
  }
};

// Step 2: Confirm email with OTP
const confirmEmail = async () => {
  let isValid = validateStep2();
  if (!isValid) return;

  isLoading.value = true;

  try {
    const response = await apiFetch('/user/confirmUpdateEmail', {
      method: 'PATCH',
      body: {
        otp: form.otp,
      }
    });

    toast.success({ message: 'Email updated successfully' });
    
    // Reset form and go back to step 1
    form.email = '';
    form.otp = '';
    step.value = 1;

    // Optionally emit event or update user data
    // useAuth().setUser(response.user);
  } catch (e: any) {
    console.log(e);
    toast.error({ message: e?.data?.message || 'Failed to verify email' });
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped lang="scss">
.edit-email-container {
  padding: 3rem;
  border-radius: 12px;
  background: $grey;
  color: $black;

  .step-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .form-title {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: $black;
  }

  .form-subtitle {
    color: rgba(0, 0, 0, 0.6);
    margin-bottom: 1.5rem;
    font-size: 0.95rem;
  }

  .form-field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .form-label {
      font-size: 0.95rem;
      font-weight: 500;
      color: $black;
    }
  }

  .auth-actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    margin-top: 1rem;

    .btn {
      width: 100%;
      max-width: 400px;
      cursor: pointer;
      padding: 0.875rem 1.5rem;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 500;
      transition: all 0.2s ease;

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }

    .submit {
      background: $black;
      color: white;
      border: none;

      &:hover:not(:disabled) {
        opacity: 0.9;
      }
    }

    .secondary-btn {
      background: transparent;
      color: $black;
      border: 2px solid $black;

      &:hover:not(:disabled) {
        background: rgba(0, 0, 0, 0.05);
      }
    }
  }

  @media screen and (max-width: 600px) {
    padding: 2rem 1.5rem;

    .form-title {
      font-size: 1.5rem;
    }

    .auth-actions .btn {
      max-width: 100%;
    }
  }
}
</style>