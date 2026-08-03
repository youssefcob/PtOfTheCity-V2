<template>
  <div class="update-password-container">
    <div class="step-content">
      <h2 class="form-title">Update Password</h2>
      <p class="form-subtitle">Enter your current password and choose a new one</p>
      
      <div class="form-field">
        <span class="form-label">Current Password</span>
        <InputField 
          type="password" 
          placeHolder="Enter your current password" 
          NoLabel 
          v-model="form.old_password" 
          :error="formErrors.old_password"
        />
      </div>

      <div class="form-field">
        <span class="form-label">New Password</span>
        <InputField 
          type="password" 
          placeHolder="Enter your new password" 
          NoLabel 
          v-model="form.password"
          :error="formErrors.password"
        />
      </div>

      <div class="form-field">
        <span class="form-label">Confirm New Password</span>
        <InputField 
          type="password" 
          placeHolder="Confirm your new password" 
          NoLabel 
          v-model="form.password_confirmation"
          :error="formErrors.password_confirmation"
        />
      </div>

      <div class="auth-actions">
        <button class="btn cta submit" @click="updatePassword" :disabled="isLoading">
          {{ isLoading ? 'Updating...' : 'Update Password' }}
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

const form = reactive({
  old_password: '',
  password: '',
  password_confirmation: '',
});

const formValidation = {
  old_password: {
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
  old_password: false,
  password: false,
  password_confirmation: false,
});

const validate = () => {
  // Check if passwords match
  if (form.password !== form.password_confirmation) {
    toast.error({ message: 'Passwords do not match' });
    formErrors.password_confirmation = true;
    setTimeout(() => {
      formErrors.password_confirmation = false;
    }, 500);
    return false;
  }

  let v = new validation(formValidation, form);
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

const updatePassword = async () => {
  let isValid = validate();
  if (!isValid) return;

  isLoading.value = true;

  try {
    await apiFetch('/user/updatePassword', {
      method: 'PATCH',
      body: {
        old_password: form.old_password,
        password: form.password,
        password_confirmation: form.password_confirmation,
      }
    });

    toast.success({ message: 'Password updated successfully' });
    
    // Reset form
    form.old_password = '';
    form.password = '';
    form.password_confirmation = '';
  } catch (e: any) {
    console.log(e);
    toast.error({ message: e?.data?.message || 'Failed to update password' });
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped lang="scss">
.update-password-container {
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