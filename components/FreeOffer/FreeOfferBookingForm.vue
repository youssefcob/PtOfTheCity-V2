<script setup lang="ts">
import type { Clinic } from '~/types/types';
import TermsCheckbox from '~/sharedComponents/TermsCheckbox.vue';

const { data: clinics } = await useFetch<Clinic[]>(`${useUrl()}/clinic`);

const offers = ['Free Check-up Session', 'Free Pelvic Floor Screening'];

const form = reactive({
  name: '',
  email: '',
  phone: '',
  dob: '',
  zipCode: '',
  clinicId: '' as number | '',
  offer: 'Free Check-up Session',
  date: '',
});

function formatPhone(value: string) {
  let digits = value.replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('1')) {
    digits = digits.slice(1);
  }
  digits = digits.slice(0, 10);

  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function digitsOnly(value: string, max = 5) {
  return value.replace(/\D/g, '').slice(0, max);
}

function clinicZip(clinic: Clinic) {
  return digitsOnly(String(clinic.zip_code ?? ''));
}

// Clinics sorted by closeness to the typed zip (prefix matches first, else all).
const locations = computed(() => {
  const zip = digitsOnly(form.zipCode);
  const list = (clinics.value ?? []).slice();

  if (!zip) {
    return list.sort((a, b) => a.name.localeCompare(b.name));
  }

  const matches = list.filter((clinic) => clinicZip(clinic).startsWith(zip));
  const pool = matches.length ? matches : list;
  const zipNumber = Number(zip);

  return pool.sort((a, b) => {
    const aDiff = Math.abs(Number(clinicZip(a) || 0) - zipNumber);
    const bDiff = Math.abs(Number(clinicZip(b) || 0) - zipNumber);
    if (aDiff !== bDiff) return aDiff - bDiff;
    return a.name.localeCompare(b.name);
  });
});

watch(
  () => form.zipCode,
  (value) => {
    const next = digitsOnly(value);
    if (next !== value) form.zipCode = next;
  },
);

watch(
  () => form.phone,
  (value) => {
    const next = formatPhone(value);
    if (next !== value) form.phone = next;
  },
);

watch(locations, (list) => {
  if (!list.length) {
    form.clinicId = '';
    return;
  }

  const stillVisible = list.some((clinic) => clinic.id === Number(form.clinicId));
  if (!stillVisible) {
    form.clinicId = form.zipCode ? list[0].id : '';
  }
});

const isLoading = ref(false);
const toast = useToast();

const today = (() => {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
})();

watch(
  () => form.date,
  (value) => {
    if (value && value < today) {
      form.date = today;
    }
  },
);

const selectedClinic = computed(() =>
  (clinics.value ?? []).find((clinic) => clinic.id === Number(form.clinicId)),
);

const termsAccepted = ref(false);
const termsError = ref(false);

async function submitForm() {
  if (!termsAccepted.value) {
    termsError.value = true;
    toast.error({
      title: 'Terms required',
      message: 'Please agree to the Terms & Conditions and Privacy Policy.',
    });
    return;
  }

  if (form.date && form.date < today) {
    form.date = today;
    toast.error({
      title: 'Invalid date',
      message: 'Preferred date cannot be in the past.',
    });
    return;
  }

  if (form.phone.replace(/\D/g, '').length !== 10) {
    toast.error({
      title: 'Invalid phone number',
      message: 'Please enter a 10-digit US phone number.',
    });
    return;
  }

  if (!selectedClinic.value) {
    toast.error({
      title: 'Select a location',
      message: 'Please choose your nearest clinic.',
    });
    return;
  }

  isLoading.value = true;
  try {
    const payload = {
      terms_accepted: true,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      dob: form.dob,
      clinic_id: selectedClinic.value.id,
      zip_code: form.zipCode.trim(),
      package: form.offer,
      preferred_date: form.date || null,
    };

    await $fetch(`${useUrl()}/mountsinai/book`, {
      method: 'POST',
      body: payload,
    });

    await navigateTo({
      path: '/free-offer/success',
      query: {
        offer: form.offer,
        date: form.date,
        location: selectedClinic.value.name,
      },
    });
  } catch {
    toast.error({
      title: 'Something went wrong',
      message: 'Please try again or call (718) 648-0888.',
    });
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="offer-form">
    <div class="card">
      <h2 class="title">Book Your Free Session</h2>
      <p class="subtitle">
        Secure your hospital-network vetted physical therapy evaluation in seconds. No referral required.
      </p>

      <div class="separator"></div>

      <form class="body" @submit.prevent="submitForm">
        <div class="group">
          <label for="fo-name">Full Name <span class="required">*</span></label>
          <input id="fo-name" v-model="form.name" type="text" placeholder="e.g. Eleanor Vance" required />
        </div>

        <div class="group">
          <label for="fo-email">Email Address</label>
          <input id="fo-email" v-model="form.email" type="email" placeholder="e.g. eleanor@example.com" />
        </div>

        <div class="group">
          <label for="fo-phone">Phone Number <span class="required">*</span></label>
          <input
            id="fo-phone"
            v-model="form.phone"
            type="tel"
            inputmode="numeric"
            autocomplete="tel"
            maxlength="14"
            placeholder="(555) 000-0000"
            required
          />
        </div>

        <div class="row">
          <div class="group">
            <label for="fo-dob">Date of Birth <span class="required">*</span></label>
            <input id="fo-dob" v-model="form.dob" type="date" :max="today" required />
          </div>
          <div class="group">
            <label for="fo-zip">Zip Code <span class="required">*</span></label>
            <input
              id="fo-zip"
              v-model="form.zipCode"
              type="text"
              inputmode="numeric"
              maxlength="5"
              placeholder="e.g. 11201"
              required
            />
          </div>
        </div>

        <div class="group">
          <label for="fo-clinic">Nearest Location</label>
          <div class="select-wrap">
            <select id="fo-clinic" v-model="form.clinicId">
              <option disabled value="">Select a location</option>
              <option v-for="clinic in locations" :key="clinic.id" :value="clinic.id">
                {{ clinic.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="group">
          <label for="fo-offer">Selected Offer <span class="required">*</span></label>
          <div class="select-wrap">
            <select id="fo-offer" v-model="form.offer" required>
              <option v-for="offer in offers" :key="offer" :value="offer">{{ offer }}</option>
            </select>
          </div>
        </div>

        <div class="group">
          <label for="fo-date">Preferred Date</label>
          <input id="fo-date" v-model="form.date" type="date" :min="today" />
        </div>

        <TermsCheckbox v-model="termsAccepted" :error="termsError" @update:modelValue="termsError = false" />

        <button type="submit" class="submit" :disabled="isLoading">
          {{ isLoading ? 'Submitting…' : 'Claim Your Offer' }}
        </button>

        <p class="hipaa">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          HIPAA Compliant &amp; Secured. Your healthcare privacy is strictly protected under high industry standard protocols.
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  background-color: $white;
  border: 1px solid $border-gray;
  padding: 3.2rem;

  @media screen and (max-width: 980px) {
    padding: 2.4rem;
  }
}

.title {
  @include type-h3;
  margin: 0 0 0.8rem;
  color: $primary-600;
}

.subtitle {
  @include type-caption;
  margin: 0;
  color: $primary-700;
}

.separator {
  height: 1px;
  background-color: $border-gray;
  margin: 2.4rem 0;
}

.body {
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
}

.group {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  label {
    @include type-caption;
    font-weight: 600;
    color: $primary-600;
  }

  input,
  select {
    @include type-body;
    width: 100%;
    padding: 1.1rem 1.4rem;
    border: 1px solid $border-gray;
    border-radius: 1rem;
    background-color: $surface-cream;
    color: $primary-700;
    outline: none;
    appearance: none;
    -webkit-appearance: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &::placeholder {
      color: #94a3b8;
    }

    &:focus {
      border-color: $primary-400;
      box-shadow: 0 0 0 3px rgba(21, 112, 124, 0.12);
      background-color: $white;
    }
  }

  input[type='date'] {
    appearance: auto;
    -webkit-appearance: auto;
    min-height: 4.4rem;
    color-scheme: light;
  }
}

.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.6rem;

  @media screen and (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

.required {
  color: #e11d48;
  margin-left: 0.2rem;
}

.select-wrap {
  position: relative;

  select {
    padding-right: 3.6rem;
    cursor: pointer;
  }

  &::after {
    content: '';
    position: absolute;
    right: 1.4rem;
    top: 50%;
    transform: translateY(-50%);
    width: 1.2rem;
    height: 0.8rem;
    background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%2315707c' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-size: contain;
    pointer-events: none;
  }
}

.submit {
  @include type-button;
  width: 100%;
  padding: 1.6rem;
  margin-top: 0.4rem;
  color: $white;
  background-color: $primary-400;
  border: none;
  border-radius: 1.2rem;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;

  &:hover:not(:disabled) {
    background-color: $primary-600;
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}

.hipaa {
  @include type-caption;
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  margin: 0.4rem 0 0;
  color: $primary-700;
  opacity: 0.75;

  svg {
    width: 1.4rem;
    height: 1.4rem;
    flex-shrink: 0;
    margin-top: 0.3rem;
  }
}
</style>
