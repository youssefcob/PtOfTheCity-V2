<script setup lang="ts">
// Sensory Freeway booking section — parent + child intake form.
// All copy is overridable via props; defaults match the design.
import { reactive, ref } from 'vue';

withDefaults(
  defineProps<{
    eyebrow?: string;
    heading?: string;
    subtext?: string;
    ctaText?: string;
  }>(),
  {
    eyebrow: 'Schedule a Visit',
    heading: "Start Your Child's Journey",
    subtext:
      'Fill out our secure clinical request form. Our scheduling team will reach out within 24 business hours to match your child with the right therapist.',
    ctaText: 'Book Your Child’s Evaluation',
  },
);

const optional = (value: string) => value.trim() || null;

const isLoading = ref(false);
const errorMessage = ref('');
const bookingSuccess = ref(false);

// Today's date (local) as YYYY-MM-DD — dates of birth can't be in the future
const now = new Date();
const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

// Strip anything that isn't a digit and force the input's displayed value
// back — otherwise Vue skips the DOM update when the stripped value equals
// the current model value and the invalid character stays visible
const handleNumericInput = (event: Event, field: 'phone') => {
  const target = event.target as HTMLInputElement;
  const cleaned = target.value.replace(/\D/g, '');
  target.value = cleaned;
  form[field] = cleaned;
};

const form = reactive({
  parentName: '',
  parentDob: '',
  insuranceProvider: '',
  insuranceProviderId: '',
  phone: '',
  email: '',
  childName: '',
  childDob: '',
  childInsuranceProvider: '',
  childInsuranceId: '',
});

async function handleSubmit() {
  errorMessage.value = '';

  // Validation
  if (!form.parentName.trim()) {
    errorMessage.value = "Please enter the parent's full name";
    return;
  }
  if (!form.parentDob) {
    errorMessage.value = "Please enter the parent's date of birth";
    return;
  }
  if (!form.phone.trim()) {
    errorMessage.value = 'Please enter your phone number';
    return;
  }
  if (!form.email.trim()) {
    errorMessage.value = 'Please enter your email';
    return;
  }
  if (!form.childName.trim()) {
    errorMessage.value = "Please enter the child's full name";
    return;
  }
  if (!form.childDob) {
    errorMessage.value = "Please enter the child's date of birth";
    return;
  }

  try {
    isLoading.value = true;

    const payload = {
      parentFullName: form.parentName.trim(),
      parentDateOfBirth: form.parentDob,
      parentInsuranceProvider: optional(form.insuranceProvider),
      parentInsuranceId: optional(form.insuranceProviderId),
      parentPhone: form.phone.trim(),
      parentEmail: form.email.trim(),
      childFullName: form.childName.trim(),
      childDateOfBirth: form.childDob,
      childInsuranceProvider: optional(form.childInsuranceProvider),
      childInsuranceId: optional(form.childInsuranceId),
    };

    await $fetch(`${useUrl()}/sensoryfreeway/book`, {
      method: 'POST',
      body: payload,
    });

    useToast().success({
      title: 'Booking Confirmed!',
      message: "Your request has been received. We'll reach out within 24 business hours.",
    });
    bookingSuccess.value = true;
  } catch (error: any) {
    const message =
      error.data?.message || error.response?.data?.message || error.message || 'Failed to book appointment';
    errorMessage.value = message;
  } finally {
    isLoading.value = false;
  }
}

function resetForm() {
  bookingSuccess.value = false;
  Object.keys(form).forEach((key) => ((form as any)[key] = ''));
}
</script>

<template>
  <section id="book" class="sf-booking">
    <div class="booking-inner">
      <!-- Head -->
      <div class="booking-head">
        <span class="eyebrow">{{ eyebrow }}</span>
        <h2 class="heading">{{ heading }}</h2>
        <p class="subtext">{{ subtext }}</p>
      </div>

      <!-- Card -->
      <div class="booking-card">
        <!-- Success state -->
        <div v-if="bookingSuccess" class="success-view">
          <div class="success-checkmark">
            <svg class="checkmark-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle class="checkmark-circle" cx="50" cy="50" r="45" />
              <path class="checkmark-check" d="M30 52 L44 66 L70 38" />
            </svg>
          </div>
          <h3 class="success-title">Request Received!</h3>
          <p class="success-message">
            Our scheduling team will reach out within 24 business hours to match your child with the right therapist.
          </p>
          <button type="button" class="submit-btn" @click="resetForm">Book Another Appointment</button>
        </div>

        <!-- Form state -->
        <form v-else class="booking-form" @submit.prevent="handleSubmit">
          <div class="form-columns">
            <!-- PARENT -->
            <div class="form-col">
              <div class="col-head">
                <span class="col-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21c0-4 3.5-6.5 8-6.5s8 2.5 8 6.5" />
                  </svg>
                </span>
                <h3>Parent Information</h3>
              </div>

              <label class="field">
                <span class="field-label">Full Name</span>
                <input v-model="form.parentName" type="text" placeholder="e.g. Jane Doe" required />
              </label>

              <label class="field">
                <span class="field-label">Date of Birth</span>
                <input v-model="form.parentDob" type="date" :max="today" required />
              </label>

              <label class="field">
                <span class="field-label">Insurance Provider</span>
                <input v-model="form.insuranceProvider" type="text" placeholder="e.g. Medicaid, BCBS, Aetna" />
              </label>

              <label class="field">
                <span class="field-label">Insurance Provider ID</span>
                <input v-model="form.insuranceProviderId" type="text" placeholder="e.g. BCBS-987654" />
              </label>

              <label class="field">
                <span class="field-label">Phone Number</span>
                <input
                  :value="form.phone"
                  type="tel"
                  inputmode="numeric"
                  placeholder="e.g. (718) 555-0100"
                  required
                  @input="handleNumericInput($event, 'phone')"
                />
              </label>

              <label class="field">
                <span class="field-label">Email Address</span>
                <input v-model="form.email" type="email" placeholder="e.g. jane@example.com" required />
              </label>
            </div>

            <div class="col-divider" aria-hidden="true"></div>

            <!-- CHILD -->
            <div class="form-col">
              <div class="col-head">
                <span class="col-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M8.5 14s1.5 2 3.5 2 3.5-2 3.5-2" />
                    <circle cx="9" cy="9.5" r="0.5" fill="currentColor" />
                    <circle cx="15" cy="9.5" r="0.5" fill="currentColor" />
                  </svg>
                </span>
                <h3>Child Information</h3>
              </div>

              <label class="field">
                <span class="field-label">Child's Full Name</span>
                <input v-model="form.childName" type="text" placeholder="e.g. Tommy Doe" required />
              </label>

              <label class="field">
                <span class="field-label">Child's Date of Birth</span>
                <input v-model="form.childDob" type="date" :max="today" required />
              </label>

              <label class="field">
                <span class="field-label">Insurance Provider</span>
                <input v-model="form.childInsuranceProvider" type="text" placeholder="e.g. Same as parent or select" />
              </label>

              <label class="field">
                <span class="field-label">Insurance ID (If different)</span>
                <input v-model="form.childInsuranceId" type="text" placeholder="e.g. Leave blank if same" />
              </label>

              <div class="hipaa-note">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="4" y="11" width="16" height="10" rx="2" />
                  <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                </svg>
                <p>Your information is fully encrypted and HIPAA compliant.</p>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="form-footer">
            <p class="disclaimer">
              By clicking "Book Appointment", you authorize Sensory Freeway to contact you regarding pediatric therapy intake.
            </p>
            <button type="submit" class="submit-btn" :disabled="isLoading">
              {{ isLoading ? 'Submitting...' : ctaText }}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" class="btn-arrow">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>

          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.sf-booking {
  --coral: #f26b5e;
  --ink: #16382e;
  --muted: #51655e;
  --mint-bg: #e9f3ec;
  --teal: #4ecdb0;
  --teal-dark: #2fae94;
  --line: #e8e2d8;

  background: #f7f9f7;
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding: clamp(48px, 7vh, 88px) 24px;
}

.booking-inner {
  max-width: 980px;
  margin: 0 auto;
}

/* Head */
.booking-head {
  text-align: center;
  margin-bottom: clamp(28px, 4vh, 44px);
}

.eyebrow {
  display: inline-block;
  padding: 7px 14px;
  border-radius: 999px;
  background: var(--mint-bg);
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--ink);
  margin-bottom: 16px;
}

.heading {
  margin: 0 0 12px;
  font-size: clamp(28px, 3.4vw, 44px);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--ink);
}

.subtext {
  margin: 0 auto;
  font-size: 15px;
  line-height: 1.6;
  color: var(--muted);
  max-width: 560px;
}

/* Card */
.booking-card {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 24px;
  padding: clamp(24px, 3.5vw, 44px);
  box-shadow: 0 4px 24px rgba(22, 56, 46, 0.05);
}

.form-columns {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: clamp(24px, 3vw, 44px);
}

.col-divider {
  width: 1px;
  background: #eee8de;
}

.form-col {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.col-head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 4px;
}

.col-head h3 {
  margin: 0;
  font-size: 16.5px;
  font-weight: 700;
  color: var(--ink);
}

.col-icon {
  width: 30px;
  height: 30px;
  border-radius: 9px;
  background: var(--mint-bg);
  color: var(--teal-dark);
  display: flex;
  align-items: center;
  justify-content: center;
}

.col-icon svg {
  width: 16px;
  height: 16px;
}

/* Fields */
.field {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.field-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--ink);
}

input {
  width: 100%;
  padding: 12px 14px;
  font-size: 14px;
  border: 1px solid #e3ddd3;
  border-radius: 10px;
  background: #fff;
  color: var(--ink);
  font-family: inherit;
  outline-offset: 2px;
}

input::placeholder {
  color: #b3aa9c;
}

input:focus {
  outline: 2px solid var(--teal);
  border-color: var(--teal);
}

/* HIPAA note */
.hipaa-note {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border: 1px solid #e3ddd3;
  border-radius: 12px;
  background: #fdfcfa;
}

.hipaa-note svg {
  width: 22px;
  height: 22px;
  color: var(--teal-dark);
  flex-shrink: 0;
}

.hipaa-note p {
  margin: 0;
  font-size: 12.5px;
  line-height: 1.5;
  color: var(--muted);
}

/* Footer */
.form-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #eee8de;
}

.disclaimer {
  margin: 0;
  font-size: 12px;
  line-height: 1.55;
  color: var(--muted);
  max-width: 340px;
}

.submit-btn {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 14px 26px;
  border: none;
  border-radius: 999px;
  background: var(--teal);
  color: #0b2b23;
  font-size: 14.5px;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s ease, transform 0.1s ease;
}

.submit-btn:hover:not(:disabled) {
  background: var(--teal-dark);
  color: #fff;
}

.submit-btn:active:not(:disabled) {
  transform: translateY(1px);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-arrow {
  width: 16px;
  height: 16px;
}

.error-message {
  font-size: 12.5px;
  color: #dc2626;
  margin: 14px 0 0;
  padding: 10px 14px;
  background: rgba(220, 38, 38, 0.08);
  border-radius: 8px;
}

/* Success view */
.success-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2.5rem 1rem;
  gap: 1.1rem;
}

.success-checkmark {
  width: 90px;
  height: 90px;
}

.checkmark-svg {
  width: 100%;
  height: 100%;
}

.checkmark-circle {
  fill: none;
  stroke: var(--teal);
  stroke-width: 4;
  stroke-dasharray: 283;
  stroke-dashoffset: 283;
  stroke-linecap: round;
  animation: draw-circle 0.6s ease-out 0.1s forwards;
}

.checkmark-check {
  fill: none;
  stroke: var(--coral);
  stroke-width: 5;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 80;
  stroke-dashoffset: 80;
  animation: draw-check 0.4s ease-out 0.55s forwards;
}

@keyframes draw-circle {
  to { stroke-dashoffset: 0; }
}

@keyframes draw-check {
  to { stroke-dashoffset: 0; }
}

.success-title {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--ink);
}

.success-message {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--muted);
  max-width: 420px;
}

/* RESPONSIVE */
@media (max-width: 820px) {
  .form-columns {
    grid-template-columns: 1fr;
  }

  .col-divider {
    width: 100%;
    height: 1px;
  }

  .form-footer {
    flex-direction: column;
    align-items: stretch;
    text-align: center;
  }

  .disclaimer {
    max-width: none;
  }

  .submit-btn {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .sf-booking {
    padding: 40px 16px 48px;
  }
}
</style>
