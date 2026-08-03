<template>
  <div id="nyfoundling-hero" class="page-frame">
    <div class="card">
      <!-- Bottom gradient wash -->
      <div class="bg-wash"></div>

      <div class="content-grid">
        <!-- LEFT COLUMN -->
        <div class="left-col">
          <!-- Logos -->
          <div class="logos-row">
            <img
              v-if="logo1Src"
              :src="logo1Src"
              alt="PT of the City Physical Therapy"
              class="logo logo-1"
            />
            <div v-else class="logo-placeholder logo-1">PT of the City</div>

            <div class="logo-divider"></div>

            <img
              v-if="logo2Src"
              :src="logo2Src"
              alt="The New York Foundling"
              class="logo logo-2"
            />
            <div v-else class="logo-placeholder logo-2">The NY Foundling</div>
          </div>

          <div class="headline-wrap">
            <!-- Headline -->
          <h1 class="headline">
            Complimentary Physical Therapy Benefits <br />for
            NY Foundling Employees
          </h1>

          <p class="subhead">
            As a member of Beyond Med, you have an exclusive offer from
            PT of the City for complimentary treatments designed to support
            your health and recovery.
          </p>
          </div>

          <!-- Treatment image -->
          <div class="treatment-image-wrap">
            <img
              v-if="treatmentImageSrc"
              :src="treatmentImageSrc"
              alt="Physical therapy treatment session"
              class="treatment-image"
            />
            <div v-else class="treatment-placeholder">
              Treatment photo goes here
            </div>
          </div>

          <!-- Trust badges -->
          <!-- <div class="badges-row">
            <span class="badge">
              <svg viewBox="0 0 24 24" class="badge-icon" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="9" />
                <path d="M8 12.5l2.5 2.5L16 9.5" />
              </svg>
              HIPAA Compliant
            </span>
            <span class="badge">
              <svg viewBox="0 0 24 24" class="badge-icon" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v4l2.5 2.5" />
              </svg>
              Board Certified Providers
            </span>
            <span class="badge">
              <svg viewBox="0 0 24 24" class="badge-icon" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
              </svg>
              Verified Network
            </span>
          </div> -->
        </div>

        <!-- RIGHT COLUMN: BOOKING FORM -->
        <div class="right-col">
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
              <h2 class="success-title">Booking Confirmed!</h2>
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

            <h2 class="booking-title">Book Your Session</h2>
            <p class="booking-subtitle">Members get exclusive pricing instantly</p>

            <label class="field">
              <span class="field-label">Full Name</span>
              <input
                v-model="form.fullName"
                type="text"
                placeholder="Your full name"
                required
              />
            </label>

            <label class="field">
              <span class="field-label">Email Address</span>
              <input
                v-model="form.email"
                type="email"
                placeholder="you@email.com"
                required
              />
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

            <label class="field">
              <span class="field-label">Service</span>
              <select v-model="form.service" required>
                <option value="" disabled>Select service</option>
                <option
                  v-for="service in services"
                  :key="service"
                  :value="service"
                >
                  {{ service }}
                </option>
              </select>
            </label>

            <label class="field">
              <span class="field-label">Your Zip Code</span>
              <input
                :value="form.zip"
                type="text"
                inputmode="numeric"
                placeholder="Enter your zip code"
                required
                @input="handleNumericInput($event, 'zip')"
              />
            </label>

            <p class="help-text">
              Have questions about other coverage sources?
              We can point you in the right direction.<br />
              <strong>Contact us on {{ contactPhone }}</strong>
            </p>

            <button type="submit" class="submit-btn" :disabled="isLoading">
              {{ isLoading ? 'Booking...' : 'Book Your Session' }}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="btn-arrow">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>

            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

            <p class="fine-print">
              ✓ No payment required to reserve · Free cancellation 24h before
            </p>
          </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useApi } from '@/composables/useApi'

const props = defineProps({
  logo1Src: { type: String, default: '/images/logo.png' },
  logo2Src: { type: String, default: '/images/Nyfoundling/logo.png' },
  treatmentImageSrc: { type: String, default: '/images/Nyfoundling/hero-w.png' },
  contactPhone: { type: String, default: '(718) 648-0888' },
  services: {
    type: Array,
    default: () => [
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
      'Teletherapy',
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

const form = reactive({
  fullName: '',
  email: '',
  phone: '',
  dob: '',
  service: '',
  zip: '',
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
  if (!form.dob) {
    errorMessage.value = 'Please enter your date of birth'
    return
  }
  if (!form.service) {
    errorMessage.value = 'Please select a service'
    return
  }
  if (!form.zip.trim()) {
    errorMessage.value = 'Please enter your zip code'
    return
  }

  try {
    isLoading.value = true

    const payload = {
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      service: form.service,
      dateOfBirth: form.dob,
      zipCode: form.zip,
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
  form.service = ''
  form.zip = ''
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.page-frame {
  --pink: #f3c9cf;
  --teal: #4ecdb0;
  --teal-dark: #2fae94;
  --ink: #1a1a1a;
  --ink-soft: #3a3a3a;
  --muted: #6b6b6b;
  --line: #e7e7e7;
  --field-bg: #fafafa;

  padding: clamp(10px, 10vh, 2px) clamp(2px,2vw, 80px);
  background: var(--pink);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

.card {
  position: relative;
  overflow: hidden;
  background: #fff;
  border-radius: 28px;
  /* max-height: 100rem; */
  /* height: 10%; */
  /* margin-bottom: 20px; */
  /* margin-top: 20px; */
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
}
.headline-wrap{
  margin-top: 20px;
  /* line-height: 1.4; */
  /* margin-bottom: 20px; */
}

.bg-wash {
  position: absolute;
  inset: auto 0 0 0;
  height: 45%;
  background: linear-gradient(180deg, rgba(78, 205, 176, 0) 0%, rgba(78, 205, 176, 0.35) 100%);
  pointer-events: none;
  z-index: 0;
}

.content-grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 40px;
  padding: clamp(18px, 3.5vh, 36px) 48px clamp(14px, 2.5vh, 24px);
  /* Card is shorter than the viewport by the frame padding, so the
     pink background shows as a thick margin all around (like beyondmed) */
  min-height: calc(100vh - clamp(64px, 12vh, 144px));
}

/* LEFT COLUMN */
.left-col {
  display: flex;
  flex-direction: column;
  gap: clamp(10px, 1.8vh, 18px);
}

.logos-row {
  display: flex;
  align-items: center;
  gap: 18px;
}

.logo {
  height: 64px;
  width: auto;
  object-fit: contain;
}

.logo-placeholder {
  height: 44px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  font-weight: 700;
  font-size: 14px;
  color: var(--muted);
  border: 1px dashed var(--line);
  border-radius: 8px;
  background: var(--field-bg);
}

.logo-divider {
  width: 1px;
  height: 36px;
  background: var(--line);
}

.headline {
  margin: 0;
  font-size: clamp(26px, 4vh, 34px);
  line-height: 1.15;
  font-weight: 800;
  color: var(--ink);
  letter-spacing: -0.01em;
}

.headline-accent {
  display: inline;
}

.subhead {
  margin: 1.2rem 0 0;
  font-size: 15px;
  line-height: 1.45;
  font-weight: 700;
  color: var(--ink-soft);
  max-width: 640px;
}

/* Image fills the leftover vertical space and bleeds to the card's left edge */
.treatment-image-wrap {
  position: relative;
  /* flex: 1; */
  height: 100%;
  /* min-height: 180px; */
  margin-left: -48px;
  border-radius: 0 20px 0 0;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  margin-bottom: -2.2rem;
}

/* White fade blending the top of the image into the card background */
.treatment-image-wrap::after {
  content: '';
  position: absolute;
  inset: 0 0 auto 0;
  height: 35%;
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%);
  pointer-events: none;
}

.treatment-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit:fill;
  object-position: left bottom;
}

.treatment-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 340px;
  border: 1px dashed var(--line);
  border-radius: 20px;
  color: var(--muted);
  background: var(--field-bg);
  font-size: 15px;
}

.badges-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: -4px;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 999px;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  font-size: 13px;
  font-weight: 600;
  color: var(--ink-soft);
}

.badge-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

/* RIGHT COLUMN: FORM */
.right-col {
  position: sticky;
  top: 24px;
}

.booking-card {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: clamp(16px, 2.5vh, 28px) clamp(20px, 2vw, 28px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.06);
  /* padding-bottom: 10rem; */
}

.booking-form {
  display: flex;
  flex-direction: column;
  gap: clamp(8px, 1.5vh, 16px);
}

.booking-icon {
  width: clamp(28px, 4vh, 36px);
  height: clamp(28px, 4vh, 36px);
  border-radius: 12px;
  background: #e6f9f4;
  color: var(--teal-dark);
  display: flex;
  align-items: center;
  justify-content: center;
}

.booking-icon svg {
  width: 22px;
  height: 22px;
}

.booking-title {
  margin: 0;
  font-size: clamp(17px, 2.4vh, 20px);
  font-weight: 800;
  color: var(--ink);
}

.booking-subtitle {
  margin: -4px 0 0;
  font-size: 13px;
  color: var(--muted);
}

.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.field-label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--ink);
}

input,
select {
  width: 100%;
  padding: clamp(3px, 0.8vh, 7px) 0;
  font-size: 15px;
  border: none;
  border-bottom: 2px solid transparent;
  border-radius: 0;
  background: transparent;
  color: var(--ink);
  font-family: inherit;
  
}

input::placeholder {
  color: #9a9a9a;
}

input:focus,
select:focus {
  outline: none;
  border-bottom-color: var(--teal);
}

select {
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231a1a1a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 2px center;
  background-size: 14px;
  cursor: pointer;
}

.help-text {
  margin: 2px 0 0;
  font-size: 12px;
  line-height: 1.45;
  color: var(--muted);
}

.help-text strong {
  color: var(--ink);
}

.submit-btn {
  margin-top: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: clamp(8px, 1.4vh, 14px) 20px;
  border: none;
  border-radius: 12px;
  background: var(--teal);
  color: #08201a;
  font-size: 15px;
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

.error-message {
  font-size: 12px;
  color: #dc2626;
  margin: 4px 0 0;
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
  stroke: var(--teal-dark);
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
  background: var(--teal-dark);
  animation: particle-burst 0.6s ease-out 0.85s forwards;
  --tx: 38px;
  --ty: -30px;
}
.particle:nth-child(3) {
  background: var(--pink);
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
  background: var(--teal-dark);
  animation: particle-burst 0.6s ease-out 0.88s forwards;
  --tx: 0px;
  --ty: -45px;
}
.particle:nth-child(6) {
  background: var(--pink);
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

.btn-arrow {
  width: 18px;
  height: 18px;
}

.fine-print {
  margin: 2px 0 0;
  text-align: center;
  font-size: 12px;
  color: var(--muted);
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .content-grid {
    grid-template-columns: 1fr;
    padding: 32px 24px;
    min-height: auto;
  }

  .right-col {
    position: static;
  }

  .headline {
    font-size: 32px;
  }

  .treatment-image-wrap {
    margin-left: -24px;
    min-height: 260px;
  }
}

@media (max-width: 480px) {
  .page-frame {
    padding: 14px;
  }

  .field-row {
    grid-template-columns: 1fr;
  }

  .badges-row {
    gap: 8px;
  }

  .badge {
    font-size: 12px;
    padding: 6px 12px;
  }
}
</style>