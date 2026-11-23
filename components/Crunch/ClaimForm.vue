<script setup lang="ts">
import TermsCheckbox from '~/sharedComponents/TermsCheckbox.vue';
type FieldKey =
  | 'first_name'
  | 'last_name'
  | 'email'
  | 'phone'
  | 'zip_code'
  | 'crunch_membership_id'
  | 'membership_start_date'
  | 'membership_end_date';

interface Field {
  key: FieldKey;
  label: string;
  placeholder: string;
  type?: 'text' | 'email' | 'tel' | 'date';
  required?: boolean;
  half?: boolean;
  autocomplete?: string;
  inputmode?: 'email' | 'tel' | 'numeric';
  maxlength?: number;
  digitsOnly?: boolean;
}

const props = defineProps<{ clinicCount: number }>();

// Keys match the API's request fields (POST /crunch/book) so 422 errors map straight back onto the inputs.
const FIELDS: Field[] = [
  { key: 'first_name', label: 'First Name', placeholder: 'Enter first name', required: true, half: true, autocomplete: 'given-name' },
  { key: 'last_name', label: 'Last Name', placeholder: 'Enter last name', half: true, autocomplete: 'family-name' },
  { key: 'email', label: 'Email Address', placeholder: 'Enter email address', type: 'email', autocomplete: 'email', inputmode: 'email' },
  { key: 'phone', label: 'Phone Number', placeholder: 'Enter phone number', type: 'tel', required: true, half: true, autocomplete: 'tel-national', inputmode: 'tel' },
  { key: 'zip_code', label: 'Zip Code', placeholder: 'Enter zip code', required: true, half: true, autocomplete: 'postal-code', inputmode: 'numeric', maxlength: 5, digitsOnly: true },
  { key: 'crunch_membership_id', label: 'Crunch Membership ID', placeholder: 'Enter crunch membership id', autocomplete: 'off' },
  { key: 'membership_start_date', label: 'Membership Start Date', placeholder: 'Enter membership start date', type: 'date', half: true },
  { key: 'membership_end_date', label: 'Membership End Date', placeholder: 'Enter membership end date', type: 'date', half: true },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const perks = computed(() => ['No payment required', 'One-time member benefit', `Use at any of ${props.clinicCount} NYC clinics`]);

const apiBase = useUrl() as string;
const toast = useToast();

const form = reactive<Record<FieldKey, string>>({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  zip_code: '',
  crunch_membership_id: '',
  membership_start_date: '',
  membership_end_date: '',
});
const errors = ref<Partial<Record<FieldKey, string>>>({});
const isSubmitting = ref(false);
const termsAccepted = ref(false);
const termsError = ref(false);

const inputId = (key: FieldKey) => `crunch-${key}`;

// Autofilled and pasted numbers often carry formatting or the +1 country code.
function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, '');
  return digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits;
}

function onInput(event: Event, field: Field) {
  if (field.digitsOnly) {
    // Write the cleaned value back to the element too: when it equals the current
    // model value Vue skips the DOM update and the stray character stays visible.
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '');
    form[field.key] = input.value;
  }
  delete errors.value[field.key];
}

function validate() {
  const found: Partial<Record<FieldKey, string>> = {};
  if (!form.first_name.trim()) found.first_name = 'Please enter your first name.';
  if (form.email.trim() && !EMAIL_PATTERN.test(form.email.trim())) found.email = 'Please enter a valid email address.';
  if (normalizePhone(form.phone).length !== 10) found.phone = 'Please enter a valid 10-digit phone number.';
  if (!/^\d{5}$/.test(form.zip_code)) found.zip_code = 'Please enter a valid 5-digit zip code.';
  // ISO date strings compare correctly as plain strings.
  if (form.membership_start_date && form.membership_end_date && form.membership_end_date < form.membership_start_date) {
    found.membership_end_date = 'End date cannot be before the start date.';
  }
  return found;
}

function focusFirstError() {
  const first = FIELDS.find((field) => errors.value[field.key]);
  if (first) document.getElementById(inputId(first.key))?.focus();
}

async function submit() {
  if (!termsAccepted.value) {
    termsError.value = true;
    toast.error({ title: 'Error!', message: 'Please agree to the Terms & Conditions and Privacy Policy' });
    return;
  }
  errors.value = validate();
  if (Object.keys(errors.value).length) {
    focusFirstError();
    return;
  }

  isSubmitting.value = true;
  try {
    await $fetch(`${apiBase}/crunch/book`, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: {
        terms_accepted: true,
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim() || null,
        email: form.email.trim() || null,
        phone: normalizePhone(form.phone),
        zip_code: form.zip_code,
        crunch_membership_id: form.crunch_membership_id.trim() || null,
        membership_start_date: form.membership_start_date || null,
        membership_end_date: form.membership_end_date || null,
      },
    });
    (window as any).dataLayer?.push({ event: 'crunch_form_submitted' });
    await navigateTo('/success/crunch');
  } catch (error: any) {
    const fieldErrors: Record<string, string[]> | undefined = error?.data?.errors;
    if (error?.status === 422 && fieldErrors) {
      errors.value = Object.fromEntries(Object.entries(fieldErrors).map(([key, messages]) => [key, messages[0]]));
      focusFirstError();
      toast.error({ title: 'Error!', message: 'Please check the highlighted fields.' });
    } else {
      toast.error({ title: 'Error!', message: 'Something went wrong. Please try again.' });
    }
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <section id="claim" class="claim">
    <div class="claim__inner">
      <div class="claim__intro">
        <h2 class="claim__title">Lock in your member benefit <span class="claim__title-accent">today</span></h2>
        <p class="claim__note">(Takes less than 60 seconds to register)</p>

        <ul class="claim__perks">
          <li v-for="perk in perks" :key="perk" class="claim__perk">
            <CrunchIcon name="circle-check" :size="24" :stroke-width="1.5" class="claim__perk-icon" />
            {{ perk }}
          </li>
        </ul>
      </div>

      <form class="claim-form" novalidate @submit.prevent="submit">
        <h3 class="claim-form__title">Tell us about you</h3>
        <p class="claim-form__hint">Fields marked * are required.</p>

        <div class="claim-form__fields">
          <div
            v-for="field in FIELDS"
            :key="field.key"
            class="field"
            :class="{ 'field--half': field.half, 'field--invalid': errors[field.key] }"
          >
            <label :for="inputId(field.key)" class="field__label">
              {{ field.label }}<template v-if="field.required"> *</template>
            </label>

            <div
              class="field__control"
              :class="{ 'field__control--date': field.type === 'date', 'is-empty': !form[field.key] }"
            >
              <input
                :id="inputId(field.key)"
                v-model="form[field.key]"
                class="field__input"
                :type="field.type ?? 'text'"
                :name="field.key"
                :placeholder="field.placeholder"
                :autocomplete="field.autocomplete"
                :inputmode="field.inputmode"
                :maxlength="field.maxlength"
                :required="field.required"
                :aria-invalid="errors[field.key] ? 'true' : undefined"
                :aria-describedby="errors[field.key] ? `${inputId(field.key)}-error` : undefined"
                @input="onInput($event, field)"
              />

              <template v-if="field.type === 'date'">
                <!-- Date inputs ignore `placeholder`; this stands in for it while the field is empty. -->
                <span class="field__placeholder" aria-hidden="true">
                  <span class="field__placeholder-long">{{ field.placeholder }}</span>
                  <span class="field__placeholder-short">MM / DD / YYYY</span>
                </span>
                <CrunchIcon name="calendar" :size="18" :stroke-width="1.75" class="field__icon" />
              </template>
            </div>

            <p v-if="errors[field.key]" :id="`${inputId(field.key)}-error`" class="field__error">
              {{ errors[field.key] }}
            </p>
          </div>
        </div>

        <TermsCheckbox v-model="termsAccepted" :error="termsError" @update:modelValue="termsError = false" />

        <CrunchButton type="submit" class="claim-form__submit" :disabled="isSubmitting">
          {{ isSubmitting ? 'Submitting…' : 'Secure my spot & save my perk' }}
          <template #icon>
            <CrunchIcon name="arrow-up-right" :size="16" />
          </template>
        </CrunchButton>

        <p class="claim-form__privacy">Your information is secure and only used to coordinate your member benefit.</p>
      </form>
    </div>
  </section>
</template>

<style scoped lang="scss">
.claim {
  padding: 110px var(--crunch-gutter);
  background: $crunch-teal;

  @media screen and (max-width: 800px) {
    // The mobile design insets this section slightly more than the others.
    padding: 56px 24px;
  }
}

.claim__inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 660px);
  column-gap: 72px;
  align-items: center;
  max-width: 1188px;
  margin: 0 auto;

  @media screen and (max-width: 1100px) {
    grid-template-columns: minmax(0, 1fr);
    row-gap: 40px;
    max-width: 660px;
  }

  @media screen and (max-width: 800px) {
    row-gap: 36px;
  }
}

.claim__title {
  font-family: $crunch-font-heading;
  font-size: 50px;
  font-weight: 700;
  line-height: 0.98;
  text-transform: uppercase;

  @media screen and (max-width: 800px) {
    font-size: 34px;
  }
}

.claim__title-accent {
  color: #fff;
}

.claim__note {
  margin-top: 24px;
  color: $crunch-text;
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;

  @media screen and (max-width: 800px) {
    margin-top: 20px;
    font-size: 18px;
    line-height: 23px;
  }
}

.claim__perks {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 44px;
  list-style: none;

  @media screen and (max-width: 800px) {
    gap: 14px;
    margin-top: 22px;
  }
}

.claim__perk {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
}

.claim__perk-icon {
  flex-shrink: 0;
  color: #fff;

  @media screen and (max-width: 800px) {
    width: 26px;
    height: 26px;
    stroke-width: 1.75;
  }
}

.claim-form {
  padding: 40px;
  border-radius: 24px;
  background: #fff;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.08);

  @media screen and (max-width: 800px) {
    padding: 24px 18px;
  }
}

.claim-form__title {
  font-family: $crunch-font-heading;
  font-size: 28px;
  font-weight: 700;
  line-height: 1;
  text-transform: uppercase;
}

.claim-form__hint {
  margin-top: 4px;
  color: $crunch-muted;
}

.claim-form__fields {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px 16px;
  margin-top: 16px;

  @media screen and (max-width: 800px) {
    grid-template-columns: minmax(0, 1fr);
  }
}

.field {
  grid-column: 1 / -1;
  min-width: 0;

  &--half {
    grid-column: auto;
  }
}

.field__label {
  display: block;
  color: $crunch-text;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
}

.field__control {
  position: relative;
  margin-top: 8px;
}

// Nested for specificity: the injected global `input[type="text"]` rule (Poppins, 1.125rem) outranks a lone class.
.field__control .field__input {
  display: block;
  width: 100%;
  min-width: 0;
  height: 54px;
  padding: 0 16px;
  border: 1px solid $crunch-border;
  border-radius: 8px;
  background: #fff;
  color: $crunch-ink;
  font-family: inherit;
  font-size: 16px;
  appearance: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &::placeholder {
    color: $crunch-muted;
    opacity: 1;
  }

  &:focus {
    outline: none;
    border-color: $crunch-teal;
    box-shadow: 0 0 0 3px rgba($crunch-teal, 0.25);
  }

  .field--invalid & {
    border-color: $crunch-red;
  }

  .field--invalid &:focus {
    box-shadow: 0 0 0 3px rgba($crunch-red, 0.2);
  }

  @media screen and (max-width: 800px) {
    height: 56px;
  }
}

.field__control--date {
  .field__input {
    padding-right: 48px;
    cursor: pointer;

    // Stretch the (invisible) native picker button over the whole field so any click opens it.
    &::-webkit-calendar-picker-indicator {
      position: absolute;
      inset: 0;
      width: auto;
      height: auto;
      opacity: 0;
      cursor: pointer;
    }

    &::-webkit-date-and-time-value {
      text-align: left;
    }
  }

  // Hide the browser's mm/dd/yyyy mask until the field is focused so the custom placeholder shows instead.
  &.is-empty .field__input:not(:focus) {
    color: transparent;
  }
}

.field__placeholder {
  display: none;
  position: absolute;
  top: 50%;
  right: 48px;
  left: 17px;
  overflow: hidden;
  transform: translateY(-50%);
  color: $crunch-muted;
  font-size: 16px;
  line-height: 24px;
  white-space: nowrap;
  text-overflow: ellipsis;
  pointer-events: none;

  .is-empty:not(:focus-within) > & {
    display: block;
  }
}

.field__placeholder-short {
  display: none;
}

.field__icon {
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  color: $crunch-red;
  pointer-events: none;
}

@media screen and (max-width: 800px) {
  .field__placeholder-long,
  .field__icon {
    display: none;
  }

  .field__placeholder-short {
    display: inline;
  }
}

.field__error {
  margin-top: 6px;
  color: $crunch-red;
  font-size: 14px;
  line-height: 20px;
}

.claim-form__submit {
  margin-top: 24px;

  // The mobile design drops the arrow so the label fits on one line.
  @media screen and (max-width: 800px) {
    padding-inline: 8px;

    svg {
      display: none;
    }
  }
}

.claim-form__privacy {
  margin-top: 24px;
  color: $crunch-muted;

  @media screen and (max-width: 800px) {
    line-height: 23px;
  }
}
</style>
