<template>
  <div class="container">
    <div class="form-wrapper">
      <div class="form">
        <!-- Step 1: Enter Email -->
        <div v-if="step === 1">
          <h2 class="form-title">Forgot Password</h2>
          <p class="form-subtitle">Enter your email to receive a verification code</p>

          <div class="form-field">
            <!-- <span class="form-label">Email</span> -->
            <InputField type="email" placeHolder="Enter your email" NoLabel v-model="form.email"
              :error="formErrors.email" />
          </div>

          <div class="auth-actions">
            <button class="btn cta submit" @click="sendOTP" :disabled="isLoading">
              {{ isLoading ? 'Sending...' : 'Send Verification Code' }}
            </button>
          </div>
        </div>

        <!-- Step 2: Enter OTP and New Password -->
        <div v-if="step === 2">
          <h2 class="form-title">Reset Password</h2>
          <p class="form-subtitle">Enter the code sent to {{ form.email }}</p>

          <div class="form-field">
            <span class="form-label">Verification Code</span>
            <verification-o-t-p-field v-model="form.otp" />
          </div>

          <div class="form-field">
            <span class="form-label">New Password</span>
            <InputField type="password" placeHolder="Enter your new password" NoLabel v-model="form.password"
              :error="formErrors.password" />
          </div>

          <div class="form-field">
            <span class="form-label">Confirm Password</span>
            <InputField type="password" placeHolder="Confirm your new password" NoLabel
              v-model="form.password_confirmation" :error="formErrors.password_confirmation" />
          </div>

          <div class="auth-actions">
            <button class="btn secondary-btn" @click="step = 1" :disabled="isLoading">
              Back
            </button>
            <button class="btn cta submit" @click="resetPassword" :disabled="isLoading">
              {{ isLoading ? 'Resetting...' : 'Reset Password' }}
            </button>
          </div>
        </div>
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
  password: '',
  password_confirmation: '',
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
  password: {
    rules: ['required', 'min:8'],
  },
  password_confirmation: {
    rules: ['required'],
  },
};

const formErrors = reactive({
  email: false,
  otp: false,
  password: false,
  password_confirmation: false,
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
  // Check if passwords match
  if (form.password !== form.password_confirmation) {
    toast.error({ message: 'Passwords do not match' });
    formErrors.password_confirmation = true;
    setTimeout(() => {
      formErrors.password_confirmation = false;
    }, 500);
    return false;
  }

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

// Step 1: Send OTP to email
const sendOTP = async () => {
  let isValid = validateStep1();
  if (!isValid) return;

  isLoading.value = true;

  try {
    await apiFetch('/auth/forgot-password', {
      method: 'POST',
      body: { email: form.email }
    });
    toast.success({ message: 'Verification code sent to your email' });
    step.value = 2;
  } catch (e: any) {
    console.log(e);
    toast.error({ message: e?.data?.message || 'Failed to send verification code' });
  } finally {
    isLoading.value = false;
  }
};

// Step 2: Reset password with OTP
const resetPassword = async () => {
  let isValid = validateStep2();
  if (!isValid) return;

  isLoading.value = true;

  try {
    await apiFetch('/auth/reset-password', {
      method: 'POST',
      body: {
        email: form.email,
        code: form.otp,
        password: form.password,
        password_confirmation: form.password_confirmation,
      }
    });

    toast.success({ message: 'Password reset successfully' });

    // Redirect to login
    setTimeout(() => {
      navigateTo('/login');
    }, 1500);
  } catch (e: any) {
    console.log(e);
    toast.error({ message: e?.data?.message || 'Failed to reset password' });
  } finally {
    isLoading.value = false;
  }
};

watch(form, (newVal) => {
  console.log('Form updated:', newVal);
});
</script>

<style scoped lang="scss">
.container {
  padding: 2rem;
  border-radius: 18px;
  background: rgba(16, 53, 53, 0.50);
  backdrop-filter: blur(20px);
  position: relative;
  display: flex;
  align-items: center;
  padding: 16rem 9rem;

  @media screen and (max-width: 600px) {
    padding: 16rem 5rem;
  }

  .form-wrapper {
    width: 100%;
    container-type: inline-size;
    display: flex;
    position: relative;
    justify-content: center;

    .form {
      width: 70%;
      display: flex;
      flex-direction: column;
      gap: 3rem;

      // New styles for titles and subtitles
      .form-title {
        font-size: 3rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: white;
      }

      .form-subtitle {
        color: white;
        margin-bottom: 2rem;
        font-size: 2rem;
      }

      .auth-actions {
        align-self: center;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
        margin-top: 2rem;

        .submit,
        .redirect,
        .secondary-btn {
          width: 30rem;
          cursor: pointer;
        }

        // New style for back button
        .secondary-btn {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);

          &:hover:not(:disabled) {
            background: rgba(255, 255, 255, 0.15);
          }
        }

        .redirect {
          color: white;
          text-align: center;

          .link {
            color: white;
            text-decoration: none;
            font-weight: bold;
          }
        }
      }

      @media screen and (max-width: 600px) {
        width: 100%;
      }
    }

    .back {
      opacity: 30%;
      position: absolute;
      top: 50%;
      transform: translate(0%, -50%);
      font-size: 25cqw;
      color: #2EE5C1;
      font-family: Poppins;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: 4.375px;
      z-index: -1;
    }
  }
}
</style>