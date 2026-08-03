<template>
  <div class="container">
    <div class="form-wrapper">
      <span class="back">Sign Up</span>


      <div class="form">
        <div class="form-field">
          <span class="form-label">
            Name
          </span>
          <div class="split">
            <InputField type="text" placeHolder="First Name" NoLabel v-model="form.first_name" />
            <InputField type="text" placeHolder="Last Name" NoLabel v-model="form.last_name" />

          </div>
        </div>
        <div class="form-field">
          <span class="form-label">
            Email
          </span>
          <InputField type="email" placeHolder="Enter your email" NoLabel v-model="form.email" />
        </div>

        <div class="form-field">
          <span class="form-label">
            Password
          </span>
          <div class="split vertical">
            <InputField type="password" placeHolder="Enter password" NoLabel v-model="form.password" />
            <InputField type="password" placeHolder="Confirm password" NoLabel v-model="form.password_confirmation" />
          </div>

        </div>

        <div class="auth-actions">
          <button class="btn cta submit" @click="submitForm">
            {{ isLoading ? 'Loading...' : 'Sign up' }}

          </button>
          <p class="redirect">
            Don't have an account?
            <NuxtLink to="login" class="link">Sign In</NuxtLink>
          </p>
        </div>
      </div>

    </div>

  </div>
</template>

<script lang="ts" setup>
import Http from '~/mixins/Http';
import validation from '~/mixins/Validation';
import InputField from '~/sharedComponents/InputField.vue';

const isLoading = ref(false);
const toast = useToast();


const form = reactive({
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  password_confirmation: '',
});

const formValidation = {
  first_name: {
    rules: ['required'],
    message: { required: 'First name is required' },
  },
  last_name: {
    rules: ['required'],
    message: { required: 'Last name is required' },
  },
  email: {
    rules: ['required', 'email'],
    message: {
      required: 'Email is required',
      email: 'Please enter a valid email address',
    },
  },
  password: {
    rules: ['required', 'min:8'],
    message: {
      required: 'Password is required',
      min: 'Password must be at least 8 characters long',
    },
  },
  password_confirmation: {
    rules: ['required', 'match:password'],
    message: {
      required: 'Please confirm your password',
      match: 'Passwords do not match',
    },
  },
}

const formErrors = reactive({
  first_name: false,
  last_name: false,
  email: false,
  password: false,
  password_confirmation: false,
});

const validate = () => {
  let v = new validation(formValidation, form);
  v.validate();
  let errors = v.errors;
  if (errors.length) {
    let errorsArr = Object.values(errors[0])
    let keys = v.keys

    errorsArr.forEach((error) => {
      // snackbar.add({
      //     background: '#F58E8E',
      //     text: error,

      // })
      toast.error({ message: error })
    })



    keys.forEach((key) => {
      setTimeout(() => {
        formErrors[key as keyof typeof formErrors] = false

      }, 500)
      formErrors[key as keyof typeof formErrors] = true

    })
  }
  return v.isValid;
};


const submitForm = async () => {
  isLoading.value = true;
  let isValid = validate();
  if (isValid) {
    isLoading.value = true;
    // let recapatchaToken = await recaptcha('career');
    // if (recapatchaToken) ModdedForm.append('recaptcha', recapatchaToken);
    try {
      let response = await Http.post('/auth/register', form);
      useAuth().setToken(response.tokens.token);
      useAuth().setUser(response.user);
      console.log(response);
      // snackbar.add({
      //     background: '#8EF5E8',
      //     text: 'Form Submitted Successfully',

      // })
      toast.success({ message: 'Form Submitted Successfully' })
      isLoading.value = false;
      navigateTo('/verify');

    } catch (e) {
      // snackbar.add({
      //     background: '#F58E8E',
      //     text: 'Form Submission Failed',

      // })
      toast.error({ message: 'Form Submission Failed' })
      isLoading.value = false;

    }
  }
  isLoading.value = false;
};

</script>

<style scoped lang="scss">
.container {
  padding: 2rem;
  border-radius: 18px;
  background: rgba(16, 53, 53, 0.50);
  backdrop-filter: blur(20px);
  position: relative;
  // min-height: 70vh;
  /* Make this a container */
  display: flex;
  align-items: center;
  // justify-content: center;
  padding: 4rem 9rem;

  @media screen and (max-width: 600px) {
    padding: 4rem 5rem;

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
      gap: 1.5rem;





      .auth-actions {
        align-self: center;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;

        .submit,
        .redirect {
          width: 30rem;
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
      // left:50%;
      transform: translate(0%, -50%);
      font-size: 24cqw;
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

.split {
  display: flex;
  gap: 1rem;

  >* {
    flex: 1;
  }

  &.vertical {
    flex-direction: column;
  }
}
</style>