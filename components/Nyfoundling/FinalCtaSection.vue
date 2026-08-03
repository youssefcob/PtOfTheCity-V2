<template>
  <section class="final-cta">
    <div class="top-rule"></div>

    <div class="cta-grid">
      <!-- LEFT: MESSAGE -->
      <div class="cta-left">
        <h2 class="cta-title">Ready to Get Started?</h2>
        <p class="cta-text">
          NY Foundling employees can book their complimentary session today.
          No payment required, no commitment, and expert care from
          board-certified therapists.
        </p>

        <ul class="cta-checklist">
          <li v-for="(item, i) in checklist" :key="i">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="check-icon">
              <circle cx="12" cy="12" r="9" />
              <path d="M8 12.5l2.5 2.5L16 9.5" />
            </svg>
            {{ item }}
          </li>
        </ul>

        <p class="cta-contact">
          Have questions?<br />
          <strong>Contact us on {{ contactPhone }}</strong>
        </p>
      </div>

      <!-- RIGHT: BOOKING FORM -->
      <div class="cta-right">
        <div class="booking-card">
          <!-- Success State -->
          <div v-if="bookingSuccess" class="success-view">
            <div class="success-checkmark">
              <svg class="checkmark-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle class="checkmark-circle" cx="50" cy="50" r="45" />
                <path class="checkmark-check" d="M30 52 L44 66 L70 38" />
              </svg>
              <div class="checkmark-particles">
                <span v-for="n in 6" :key="n" class="particle"></span>
              </div>
            </div>
            <h3 class="success-title">Booking Confirmed!</h3>
            <p class="success-message">
              Your session has been booked successfully. We'll send a confirmation to your email.
            </p>
            <button type="button" class="submit-btn success-btn" @click="resetForm">
              Book Another Session
            </button>
          </div>

          <!-- Form State -->
          <form v-else class="booking-form" @submit.prevent="handleSubmit">
          <div class="booking-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M3 10h18" />
              <path d="M8 3v4M16 3v4" />
              <path d="M12 14.5c-1-1-2.5-.7-2.5.9 0 1.2 1.4 2.1 2.5 3 1.1-.9 2.5-1.8 2.5-3 0-1.6-1.5-1.9-2.5-.9z" />
            </svg>
          </div>

          <h3 class="booking-title">Book Your Session</h3>
          <p class="booking-subtitle">Members get exclusive pricing instantly</p>

          <label class="field">
            <span class="field-label">Full Name</span>
            <input v-model="form.fullName" type="text" placeholder="Your full name" required />
          </label>

          <label class="field">
            <span class="field-label">Email Address</span>
            <input v-model="form.email" type="email" placeholder="you@email.com" required />
          </label>

          <div class="field-row">
            <label class="field">
              <span class="field-label">Phone Number</span>
              <input
                :value="form.phone"
                type="tel"
                inputmode="numeric"
                placeholder="(555) 123-4567"
                required
                @input="handleNumericInput($event, 'phone')"
              />
            </label>

            <label class="field">
              <span class="field-label">Date of Birth</span>
              <input v-model="form.dob" type="date" :max="today" required />
            </label>
          </div>


          <!-- Service Dropdown (Single Select) -->
          <label class="field">
            <span class="field-label">Service</span>
            <select v-model="form.service" required>
              <option value="" disabled>Select a service</option>
              <option v-for="service in services" :key="service" :value="service">
                {{ service }}
              </option>
            </select>
          </label>

          <!-- Payment Type Toggle -->
          <!-- <label class="field">
            <span class="field-label">Payment Type</span>
            <div class="payment-toggle">
              <button
                type="button"
                class="toggle-btn"
                :class="{ active: form.paymentType === 'self-pay' }"
                @click="form.paymentType = 'self-pay'"
              >
                Self Pay
              </button>
              <button
                type="button"
                class="toggle-btn"
                :class="{ active: form.paymentType === 'insurance' }"
                @click="form.paymentType = 'insurance'"
              >
                Insurance
              </button>
            </div>
          </label> -->
          <label class="field">
            <span class="field-label">Zip Code</span>
            <input
              :value="form.zipCode"
              type="text"
              inputmode="numeric"
              placeholder="Enter your zip code"
              required
              @input="handleNumericInput($event, 'zipCode')"
            />
          </label>

          <!-- Insurance Name (Conditional) -->
          <label v-if="form.paymentType === 'insurance'" class="field">
            <span class="field-label">Insurance Name</span>
            <input v-model="form.insuranceName" type="text" placeholder="Enter insurance provider name" required />
          </label>

          <button type="submit" class="submit-btn" :disabled="isLoading">
            {{ isLoading ? 'Booking...' : 'Book Your Session' }}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="btn-arrow">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>

          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useApi } from '@/composables/useApi'

const props = defineProps({
  contactPhone: { type: String, default: '(718) 648-0888' },
  checklist: {
    type: Array,
    default: () => [
      'HIPAA Compliant',
      'No commitment required',
      'Board-certified physical therapists',
    ],
  },
})

const emit = defineEmits(['submit', 'success', 'error'])

const { apiFetch } = useApi()
const isLoading = ref(false)
const errorMessage = ref('')
const bookingSuccess = ref(false)

// Today's date (local) as YYYY-MM-DD — date of birth can't be in the future
const now = new Date()
const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`

// Strip anything that isn't a digit (phone, zip code) and force the
// input's displayed value back — otherwise Vue skips the DOM update when
// the stripped value equals the current model value and the letter stays visible
const handleNumericInput = (event, field) => {
  const cleaned = event.target.value.replace(/\D/g, '')
  event.target.value = cleaned
  form[field] = cleaned
}

const services = [
  'Physical Therapy',
  'Golf Performance Assessment',
  'Movement & Mobility Analysis',
  'Strength & Stability Evaluation',
  'Sports Physical Therapy',
  'Manual Therapy',
  'Golf-Specific Movement Retraining',
  'Mobility Restoration',
  'Post-Surgical Rehabilitation',
  'Orthopedic Rehabilitation',
  'Stroke & Neurological Rehabilitation',
  'Vestibular Rehabilitation',
  'Pelvic Floor Rehabilitation',
  'GAIT Training',
  'Hand Therapy',
  'Pediatric Rehabilitation',
  'Functional Capacity Evaluation',
  'In-Home Therapy',
  'Cupping Treatment',
  'Teletherapy'
]

const form = reactive({
  fullName: '',
  email: '',
  phone: '',
  dob: '',
  zipCode: '',
  service: '',
  // paymentType: 'self-pay',
  // insuranceName: '',
})

async function handleSubmit() {
  errorMessage.value = ''

  // Validation
  if (!form.fullName.trim()) {
    errorMessage.value = 'Please enter your full name'
    return
  }
  if (!form.email.trim()) {
    errorMessage.value = 'Please enter your email'
    return
  }
  if (!form.phone.trim()) {
    errorMessage.value = 'Please enter your phone number'
    return
  }
  if (!form.service) {
    errorMessage.value = 'Please select a service'
    return
  }
  if (!form.dob) {
    errorMessage.value = 'Please enter your date of birth'
    return
  }
  if (!form.zipCode.trim()) {
    errorMessage.value = 'Please enter your zip code'
    return
  }
  // if (!form.paymentType) {
  //   errorMessage.value = 'Please select a payment type'
  //   return
  // }
  // if (form.paymentType === 'insurance' && !form.insuranceName.trim()) {
  //   errorMessage.value = 'Please enter your insurance provider name'
  //   return
  // }

  try {
    isLoading.value = true

    const payload = {
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      service: form.service,
      // paymentType: form.paymentType,
      // insuranceProvider: form.paymentType === 'insurance' ? form.insuranceName : null,
      dateOfBirth: form.dob,
      zipCode: form.zipCode,
    }

    const response = await apiFetch('/nyfoundling/book', {
      method: 'POST',
      body: payload,
    })

    emit('submit', payload)
    emit('success', response)

    useToast().success({
      title: 'Booking Confirmed!',
      message: 'Your session has been booked successfully.',
    })
    bookingSuccess.value = true
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Failed to book session'
    errorMessage.value = message
    emit('error', error)
  } finally {
    isLoading.value = false
  }
}

function resetForm() {
  bookingSuccess.value = false
  form.fullName = ''
  form.email = ''
  form.phone = ''
  form.dob = ''
  form.zipCode = ''
  form.service = ''
  form.paymentType = 'self-pay'
  form.insuranceName = ''
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.final-cta {
  --coral: #e8697a;
  --dark-green: #1f4d3f;
  --dark-green-2: #1a4236;
  --teal: #4ecdb0;
  --teal-dark: #2fae94;
  --teal-tint: #e6f9f4;
  --line: rgba(255, 255, 255, 0.14);
  --field-bg: #fafafa;
  --ink: #1a1a1a;
  --ink-soft: #3a3a3a;
  --muted: #6b6b6b;

  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  background: linear-gradient(180deg, var(--dark-green) 0%, var(--dark-green-2) 100%);
  overflow: visible;
}

.top-rule {
  height: 4px;
  background: var(--coral);
}

.cta-grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 48px;
  align-items: center;
  padding: 56px;
  overflow: visible;
}

/* LEFT */
.cta-left {
  color: #fff;
}

.cta-title {
  margin: 0 0 16px;
  font-size: 34px;
  font-weight: 800;
  color: #fff;
}

.cta-text {
  margin: 0 0 24px;
  font-size: 15.5px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.78);
  max-width: 460px;
}

.cta-checklist {
  list-style: none;
  margin: 0 0 28px;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cta-checklist li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14.5px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.92);
}

.check-icon {
  width: 18px;
  height: 18px;
  color: var(--teal);
  flex-shrink: 0;
}

.cta-contact {
  margin: 0;
  padding-top: 20px;
  border-top: 1px solid var(--line);
  font-size: 13.5px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.7);
  max-width: 380px;
}

.cta-contact strong {
  color: #fff;
}

/* RIGHT: FORM */
.cta-right {
  display: flex;
  justify-content: center;
  align-self: stretch;
  align-items: center;
  ;
}

.booking-card {

  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 480px;
  margin: -122px 0 -20px;
  background: #E7EEEC;
  border-radius: 18px;
  padding: 30px 26px 34px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35);
  border-top: 4px solid var(--coral);
}

.booking-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.booking-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--teal-tint);
  color: var(--teal-dark);
  display: flex;
  align-items: center;
  justify-content: center;
}

.booking-icon svg {
  width: 20px;
  height: 20px;
}

.booking-title {
  margin: 4px 0 0;
  font-size: 18px;
  font-weight: 800;
  color: var(--ink);
}

.booking-subtitle {
  margin: -4px 0 2px;
  font-size: 13px;
  color: var(--muted);
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.field-label {
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--ink-soft);
}

input,
select {
  width: 100%;
  padding: 11px 12px;
  font-size: 13.5px;
  border: 1px solid #e7e7e7;
  border-radius: 9px;
  background: var(--field-bg);
  color: var(--ink);
  font-family: inherit;
  outline-offset: 2px;
}

input:focus,
select:focus {
  outline: 2px solid var(--teal);
  border-color: var(--teal);
}

/* Payment Toggle */
.payment-toggle {
  display: flex;
  border-radius: 9px;
  overflow: hidden;
  border: 1px solid #e7e7e7;
  background: var(--field-bg);
}

.toggle-btn {
  flex: 1;
  padding: 10px 12px;
  border: none;
  background: transparent;
  font-size: 13px;
  font-weight: 600;
  color: var(--muted);
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.toggle-btn.active {
  background: var(--teal);
  color: #ffffff;
}

/* Messages */
.error-message {
  font-size: 12px;
  color: #dc2626;
  margin: 8px 0 0;
  padding: 8px 12px;
  background: rgba(220, 38, 38, 0.1);
  border-radius: 6px;
}

/* SUCCESS VIEW */
.success-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2.5rem 1rem;
  gap: 1.25rem;
}

.success-checkmark {
  position: relative;
  width: 100px;
  height: 100px;
  margin-bottom: 0.5rem;
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

.checkmark-particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  opacity: 0;
}

.particle:nth-child(1) {
  background: var(--teal);
  animation: particle-burst 0.6s ease-out 0.8s forwards;
  --tx: -40px;
  --ty: -35px;
}
.particle:nth-child(2) {
  background: var(--coral);
  animation: particle-burst 0.6s ease-out 0.85s forwards;
  --tx: 38px;
  --ty: -30px;
}
.particle:nth-child(3) {
  background: var(--dark-green);
  animation: particle-burst 0.6s ease-out 0.9s forwards;
  --tx: -35px;
  --ty: 38px;
}
.particle:nth-child(4) {
  background: var(--teal);
  animation: particle-burst 0.6s ease-out 0.82s forwards;
  --tx: 40px;
  --ty: 36px;
}
.particle:nth-child(5) {
  background: var(--coral);
  animation: particle-burst 0.6s ease-out 0.88s forwards;
  --tx: 0px;
  --ty: -45px;
}
.particle:nth-child(6) {
  background: var(--dark-green);
  animation: particle-burst 0.6s ease-out 0.92s forwards;
  --tx: 0px;
  --ty: 45px;
}

@keyframes particle-burst {
  0% {
    transform: translate(-50%, -50%) translate(0, 0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) translate(var(--tx), var(--ty)) scale(0);
    opacity: 0;
  }
}

.success-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--ink);
  margin: 0;
  animation: fade-up 0.4s ease-out 0.7s both;
}

.success-message {
  font-size: 0.95rem;
  color: var(--muted);
  line-height: 1.6;
  margin: 0;
  max-width: 320px;
  animation: fade-up 0.4s ease-out 0.85s both;
}

.success-btn {
  margin-top: 0.5rem;
  animation: fade-up 0.4s ease-out 1s both;
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Buttons */
.submit-btn {
  margin-top: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 18px;
  border: none;
  border-radius: 11px;
  background: var(--teal);
  color: #08201a;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  transition: background 0.15s ease, transform 0.1s ease;
}

.submit-btn:hover:not(:disabled) {
  background: var(--teal-dark);
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

/* RESPONSIVE */
@media (max-width: 900px) {
  .cta-grid {
    grid-template-columns: 1fr;
    padding: 40px 24px 72px;
    gap: 32px;
  }

  .cta-title {
    font-size: 28px;
  }

  .booking-card {
    max-width: 420px;
    margin: 0;
  }
}

@media (max-width: 480px) {
  .field-row {
    grid-template-columns: 1fr;
  }
}
</style>