<script setup lang="ts">
import { vMaska } from 'maska/vue';
import EditableText from '~/components/Admin/EditableText.vue';
import EditableImage from '~/components/Admin/EditableImage.vue';
import Loading from '~/sharedComponents/Loading.vue';
import Validation from '~/mixins/Validation';
import Http from '~/mixins/Http';

const toast = useToast();
const isLoading = ref(false);

const reasons = [
  'Book an Appointment',
  'Existing Patient Question',
  'Physician Referral',
  'Insurance & Billing',
  'Medical Records',
  'Careers',
  'Other',
];
const contactMethods = ['Phone', 'Email', 'Text'];

const emptyForm = () => ({
  name: '',
  email: '',
  phone: '',
  reason: '',
  message: '',
  contact_method: '',
});
const form = reactive(emptyForm());

const formValidation = {
  name: { rules: ['required', 'letters'], message: { required: 'Full name is required', letters: 'Name cannot contain numbers or special characters' } },
  email: { rules: ['required', 'email'], message: { required: 'Email is required', email: 'Please enter a valid email' } },
  phone: { rules: ['required', 'min:14'], message: { required: 'Phone number is required', min: 'Please enter a valid phone number' } },
  reason: { rules: ['required'], message: { required: 'Please choose a reason for contact' } },
  message: { rules: ['required'], message: { required: 'Please enter a message' } },
};

const errors = reactive<Record<string, boolean>>({});

const validate = (): boolean => {
  const v = new Validation(formValidation, form);
  const found = v.validate();
  Object.keys(errors).forEach((key) => delete errors[key]);
  v.keys.forEach((key: string) => (errors[key] = true));
  if (found.length) Object.values(found[0]).forEach((message) => toast.error({ title: 'Error!', message: message as string }));
  return v.isValid;
};

const submit = async () => {
  if (!validate()) return;
  isLoading.value = true;

  const body = new FormData();
  body.append('name', form.name);
  body.append('email', form.email);
  body.append('phone', form.phone.replace(/\D/g, ''));
  // `subject` is still required by POST /message (older forms send it), so
  // the reason doubles as the subject.
  body.append('subject', form.reason);
  body.append('reason', form.reason);
  if (form.contact_method) body.append('preferred_contact_method', form.contact_method);
  body.append('message', form.message);

  try {
    await Http.post('/message', body);
    toast.success({ title: 'Message sent!', message: 'Our care team will contact you shortly.' });
    Object.assign(form, emptyForm());
  } catch (e) {
    toast.error({ title: 'Error!', message: typeof e === 'string' ? e : 'Something went wrong. Please try again or call us.' });
  } finally {
    isLoading.value = false;
  }
};

const ck = (s: string) => `contact.form.${s}`;
</script>

<template>
  <section id="message" class="contact-form-section">
    <Loading v-if="isLoading" />

    <div class="form-column">
      <div class="header">
        <EditableText tag="h2" class="heading" :content-key="ck('heading')" default="Send a Message" />
        <EditableText tag="p" class="intro" :content-key="ck('intro')"
          default="Fill out the secure form below and our care team will contact you shortly." />
      </div>

      <form class="form" novalidate @submit.prevent="submit">
        <div class="pair">
          <label class="field">
            <span class="label">Full Name</span>
            <input v-model="form.name" class="control" :class="{ 'has-error': errors.name }" type="text"
              autocomplete="name" placeholder="John Doe" />
          </label>
          <label class="field">
            <span class="label">Email Address</span>
            <input v-model="form.email" class="control" :class="{ 'has-error': errors.email }" type="email"
              autocomplete="email" placeholder="john@example.com" />
          </label>
          <label class="field">
            <span class="label">Phone Number</span>
            <input v-model="form.phone" v-maska="'(###) ###-####'" class="control" :class="{ 'has-error': errors.phone }"
              type="tel" autocomplete="tel" placeholder="(555) 000-0000" />
          </label>
          <label class="field">
            <span class="label">Reason for Contact</span>
            <select v-model="form.reason" class="control control--select" :class="{ 'has-error': errors.reason }">
              <option value="" disabled>Select one...</option>
              <option v-for="reason in reasons" :key="reason" :value="reason">{{ reason }}</option>
            </select>
          </label>
        </div>

        <label class="field">
          <span class="label">Your Message</span>
          <textarea v-model="form.message" class="control control--textarea" :class="{ 'has-error': errors.message }"
            placeholder="Briefly describe your symptoms or inquiry..."></textarea>
        </label>

        <fieldset class="methods">
          <legend class="label">Preferred Contact Method</legend>
          <div class="method-options">
            <label v-for="method in contactMethods" :key="method" class="method">
              <input v-model="form.contact_method" type="radio" name="contact_method" :value="method" />
              <span class="radio" aria-hidden="true"></span>
              {{ method }}
            </label>
          </div>
        </fieldset>

        <div class="submit-row">
          <button type="submit" class="submit" :disabled="isLoading">Send Message</button>
          <EditableText tag="p" class="note" :content-key="ck('note')"
            default="Your information is protected by 256-bit encryption and is HIPAA compliant." />
        </div>
      </form>
    </div>

    <div class="photo">
      <EditableImage :content-key="ck('image')" default-src="/images/contact/form-photo.webp"
        default-alt="A bright, calm PT of the City clinic waiting area" />
    </div>
  </section>
</template>

<style scoped lang="scss">
$mobile: 900px;

.contact-form-section {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  @include pagePadding();
  padding-top: 6rem;
  padding-bottom: 6rem;

  // mobile Figma: a white band between hairlines, no photo
  @media screen and (max-width: $mobile) {
    flex-direction: column;
    align-items: stretch;
    padding-top: 4rem;
    padding-bottom: 4rem;
    border-top: 1px solid #f0eee8;
    border-bottom: 1px solid #f0eee8;
    background-color: #ffffff;
  }
}

.form-column {
  display: flex;
  flex-direction: column;
  gap: 4.8rem;
  flex: 0 1 57.7rem;
  min-width: 0;
  padding-right: 6.4rem;

  @media screen and (max-width: $mobile) {
    flex-basis: auto;
    gap: 3.2rem;
    padding-right: 0;
  }
}

.header {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  @media screen and (max-width: $mobile) {
    gap: 1.2rem;
  }
}

.heading {
  @include type-h2;
  text-transform: uppercase;
  color: $primary-600;

  @media screen and (max-width: $mobile) {
    font-weight: 700;
    font-size: 32px;
    line-height: 38px;
    letter-spacing: 0;
    text-transform: none;
  }
}

.intro {
  @include type-body;
  color: $primary-700;

  @media screen and (max-width: $mobile) {
    font-size: 16px;
    line-height: 24px;
  }
}

.form {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  @media screen and (max-width: $mobile) {
    gap: 2rem;
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

.field {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  min-width: 0;
}

.label {
  padding: 0;
  @include type-large;
  text-transform: uppercase;
  color: $primary-700;
  white-space: nowrap;

  @media screen and (max-width: $mobile) {
    font-weight: 600;
    font-size: 16px;
    line-height: normal;
    text-transform: none;
    white-space: normal;
  }
}

// scoped under .form: _classes.scss (injected into every component's scoped
// styles) has an `input[type="text"]` rule that would otherwise win
.form .control {
  width: 100%;
  height: 4.8rem;
  padding: 0 1.6rem;
  border: 1px solid $primary-300;
  border-radius: 0.4rem;
  background-color: #ffffff;
  @include type-body;
  color: $primary-700;
  outline: none;
  appearance: none;

  &::placeholder {
    color: rgba(1, 20, 23, 0.45);
  }

  &:focus {
    border-color: $primary-400;
    box-shadow: 0 0 0 2px rgba(43, 192, 212, 0.2);
  }

  &.has-error {
    border-color: #d43f2b;
  }

  @media screen and (max-width: $mobile) {
    height: 5.2rem;
    border-radius: 0.8rem;
  }
}

.form .control--select {
  padding-right: 4rem;
  background: #ffffff url('/images/careers/form-chevron.svg') no-repeat right 1.4rem center / 1.6rem;
  cursor: pointer;

  &:has(option[value='']:checked) {
    color: rgba(1, 20, 23, 0.45);
  }

  @media screen and (max-width: $mobile) {
    background: #ffffff url('/images/contact/m-select-chevron.svg') no-repeat right 1.6rem center / 2rem;
  }
}

.form .control--textarea {
  height: 14rem;
  padding: 1.6rem;
  resize: vertical;

  @media screen and (max-width: $mobile) {
    height: 12rem;
  }
}

.methods {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin: 0;
  padding: 0;
  border: 0;

  // a <legend> ignores the fieldset's flex gap
  legend {
    margin-bottom: 1.2rem;
  }
}

.method-options {
  display: flex;
  gap: 2.4rem;

  @media screen and (max-width: $mobile) {
    gap: 1.6rem;
  }
}

.method {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  @include type-caption;
  color: $primary-700;
  cursor: pointer;

  input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  @media screen and (max-width: $mobile) {
    font-size: 16px;
    line-height: normal;
    letter-spacing: 0;
  }
}

// 16px white circle with a cyan ring, filled in when chosen
.radio {
  width: 1.6rem;
  height: 1.6rem;
  border: 1px solid $primary-base;
  border-radius: 50%;
  background-color: #ffffff;
  transition: box-shadow 0.15s ease-in-out;

  // mobile: 20px, with the darker teal ring
  @media screen and (max-width: $mobile) {
    width: 2rem;
    height: 2rem;
    border-color: $primary-300;
  }
}

.method input:checked + .radio {
  box-shadow: inset 0 0 0 3px #ffffff;
  background-color: $primary-base;
}

.method input:focus-visible + .radio {
  outline: 2px solid $primary-400;
  outline-offset: 2px;
}

.submit-row {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding-top: 1.6rem;

  @media screen and (max-width: $mobile) {
    padding-top: 1.2rem;
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
    height: 5.4rem;
    font-size: 16px;
    letter-spacing: 0.08px;
  }
}

.note {
  font-family: $font-poppins;
  font-size: 16px;
  line-height: 22px;
  color: $primary-700;
  text-align: center;
}

.photo {
  flex: 0 1 62.4rem;
  min-width: 0;
  height: 67.2rem;

  :deep(img) {
    display: block;
    object-fit: cover;
  }

  @media screen and (max-width: $mobile) {
    display: none;
  }
}
</style>
