<template>
  <div class="container">
    <div class="form-wrapper">
      <span class="back">Sign In</span>


      <div class="form">
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
          <InputField type="password" placeHolder="Enter your password" NoLabel v-model="form.password" />
        </div>

        <div class="auth-actions">
          <button class="btn cta submit" @click="submitForm">
            {{ isLoading ? 'Loading...' : 'Sign In' }}

          </button>
          <p class="redirect">
            Don't have an account?
            <NuxtLink to="register" class="link">Sign up</NuxtLink>
          </p>
          <p class="redirect">
            Forgot your password?
            <NuxtLink to="forgot-password" class="link">Reset Password</NuxtLink>
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

const toast = useToast();
const form = reactive({
  email: '',
  password: '',
});

const formValidation = {
  email: {
    rules: ['required', 'email'],
  },
  password: {
    rules: ['required'],
  },
}
const formErrors = reactive({
  email: false,
});

const validate = () => {
  let v = new validation(formValidation, form)
  v.validate()
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
}
const isLoading = ref(false);

const submitForm = async () => {
  let isValid = validate();
  if (isValid) {
    isLoading.value = true;
    // let recapatchaToken = await recaptcha('career');
    // if (recapatchaToken) ModdedForm.append('recaptcha', recapatchaToken);
    try {
      let response = await Http.post('/auth/login', form);
      useAuth().setToken(response.tokens.token);
      useAuth().setUser(response.user);
      console.log(response);
      // snackbar.add({
      //     background: '#8EF5E8',
      //     text: 'Form Submitted Successfully',

      // })
      toast.success({ message: 'Form Submitted Successfully' })
      isLoading.value = false;
      let user = useAuth();
      if (!user.isVerified.value) {
        navigateTo('/verify');
        return;
      }
      navigateTo('/dashboard');

    } catch (e) {
      // snackbar.add({
      //     background: '#F58E8E',
      //     text: 'Form Submission Failed',

      // })
      console.log(e);
      toast.error({ message: e as string || 'Form Submission Failed' })
      isLoading.value = false;

    }
  }
  isLoading.value = false;
}
watch(form, (newVal) => {
  // You can perform actions based on form changes here
  console.log('Form updated:', newVal);
});

onMounted(() => {
  console.log(useAuth().token);
});


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





      .auth-actions {
        align-self: center;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;

        .submit,
        .redirect {
          width: 30rem;
          cursor: pointer;
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