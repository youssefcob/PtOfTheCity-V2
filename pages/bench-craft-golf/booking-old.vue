<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dob: '',
  service: '',
  startDate: '',
  notes: '',
  useInsurance: false,
})

const selectedTimes = ref<string[]>(['Afternoon'])
const selectedDays = ref<string[]>([])

const timeOptions = ['Morning', 'Afternoon', 'Evening']
const dayOptions = ['Mon–Wed', 'Thu–Fri', 'Weekends']

function toggleTime(t: string) {
  if (selectedTimes.value.includes(t)) {
    selectedTimes.value = selectedTimes.value.filter(x => x !== t)
  } else {
    selectedTimes.value.push(t)
  }
}

function toggleDay(d: string) {
  if (selectedDays.value.includes(d)) {
    selectedDays.value = selectedDays.value.filter(x => x !== d)
  } else {
    selectedDays.value.push(d)
  }
}

function handleSubmit() {
  console.log({ ...form.value, times: selectedTimes.value, days: selectedDays.value })
}
</script>

<template>
  <div class="booking-page">
    <!-- Left panel -->
    <aside class="booking-aside">
      <div class="aside-top">
        <span class="aside-label">MEMBER PRICING</span>
        <h1 class="aside-title">Reserve your sessions</h1>
        <p class="aside-desc">Fill in your details and we'll confirm within 24 hours.</p>
      </div>

      <div class="aside-image">
        <img src="/images/benchcraft/booking-photo.jpg" alt="PT session" />
      </div>

      <ul class="aside-perks">
        <li v-for="perk in perks" :key="perk">
          <span class="perk-check">✓</span>
          {{ perk }}
        </li>
      </ul>

      <div class="aside-help">
        <p class="help-title">Need help?</p>
        <div class="help-row">
          <span class="help-icon">📞</span>
          <a href="tel:+18442676192">+844-267-6192</a>
        </div>
        <div class="help-row">
          <span class="help-icon">✉</span>
          <a href="mailto:info@ptofthecity.com">info@ptofthecity.com</a>
        </div>
        <div class="help-row">
          <span class="help-icon">🕐</span>
          <span>Mon–Fri, 9am – 6pm ET</span>
        </div>
      </div>
    </aside>

    <!-- Right panel: form -->
    <main class="booking-main">
      <!-- Form header -->
      <div class="form-header">
        <div class="form-header-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <rect x="3" y="4" width="18" height="18" rx="2"/>
            <path d="M16 2v4M8 2v4M3 10h18"/>
          </svg>
        </div>
        <div>
          <div class="form-header-title">Book your session</div>
          <div class="form-header-sub">Complete the form below — we'll confirm your booking by email within 24 hours</div>
        </div>
      </div>

      <div class="form-body">
        <!-- Personal Information -->
        <div class="form-section">
          <div class="section-divider">
            <span>PERSONAL INFORMATION</span>
          </div>

          <div class="field-grid two-col">
            <div class="field">
              <label>FIRST NAME <span class="req">*</span></label>
              <input v-model="form.firstName" type="text" placeholder="Maria" />
            </div>
            <div class="field">
              <label>LAST NAME <span class="req">*</span></label>
              <input v-model="form.lastName" type="text" placeholder="Rodriguez" />
            </div>
          </div>

          <div class="field-grid two-col">
            <div class="field">
              <label>EMAIL ADDRESS <span class="req">*</span></label>
              <input v-model="form.email" type="email" placeholder="you@email.com" />
            </div>
            <div class="field">
              <label>PHONE NUMBER</label>
              <input v-model="form.phone" type="tel" placeholder="+1 (305) 000-0000" />
            </div>
          </div>

          <div class="field-grid one-col">
            <div class="field">
              <label>DATE OF BIRTH</label>
              <input v-model="form.dob" type="date" />
            </div>
          </div>
        </div>

        <!-- Service -->
        <div class="form-section">
          <div class="section-divider">
            <span>SELECT A SERVICE <span class="req">*</span></span>
          </div>

          <div class="field">
            <select v-model="form.service">
              <option value="" disabled>Choose a specialty...</option>
              <option>Sports Rehabilitation</option>
              <option>Golf Performance Assessment</option>
              <option>Movement & Mobility Analysis</option>
              <option>Strength & Stability Evaluation</option>
            </select>
          </div>
        </div>

        <!-- Scheduling -->
        <div class="form-section">
          <div class="section-divider">
            <span>SCHEDULING PREFERENCES</span>
          </div>

          <div class="field-grid sched-grid">
            <div class="field">
              <label>PREFERRED START DATE <span class="req">*</span></label>
              <input v-model="form.startDate" type="date" />
            </div>

            <div class="field">
              <label>PREFERRED TIME OF DAY</label>
              <div class="toggle-group">
                <button
                  v-for="t in timeOptions"
                  :key="t"
                  class="toggle-btn"
                  :class="{ active: selectedTimes.includes(t) }"
                  type="button"
                  @click="toggleTime(t)"
                >{{ t }}</button>
                <button
                  v-for="d in dayOptions"
                  :key="d"
                  class="toggle-btn"
                  :class="{ active: selectedDays.includes(d) }"
                  type="button"
                  @click="toggleDay(d)"
                >{{ d }}</button>
              </div>
            </div>
          </div>

          <div class="field">
            <label>ADDITIONAL NOTES OR REQUESTS</label>
            <textarea
              v-model="form.notes"
              rows="4"
              placeholder="Any specific concerns, health history notes, or requests for your provider..."
            />
          </div>
        </div>

        <!-- Insurance -->
        <div class="form-section">
          <div class="section-divider">
            <span>INSURANCE (OPTIONAL)</span>
          </div>

          <div class="insurance-row">
            <button
              type="button"
              class="toggle-switch"
              :class="{ on: form.useInsurance }"
              @click="form.useInsurance = !form.useInsurance"
              :aria-checked="form.useInsurance"
              role="switch"
            >
              <span class="switch-thumb" />
            </button>
            <span class="insurance-label">I'd like to use my insurance</span>
          </div>
        </div>

        <!-- Submit -->
        <button class="submit-btn" type="button" @click="handleSubmit">
          Book My Session →
        </button>

        <div class="form-trust">
          <span>🛡 HIPAA compliant</span>
          <span>⏱ Confirmation within 24h</span>
          <span>✓ Free cancellation</span>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
// perks list defined here to avoid setup() complexity
export default {
  data() {
    return {
      perks: [
        'No payment required today',
        'Instant member ID verification',
        'Free cancellation 48h before appointment',
        'HIPAA-compliant — your data is secure',
        'Board-certified providers only',
      ]
    }
  }
}
</script>

<style scoped lang="scss">
$bc-teal: #2DBFBF;
$bc-teal-dark: #1A8A8A;
$bc-dark: #1C2B3A;
$bc-bg: #f5f6f8;
$bc-text: #4A5568;
$bc-text-light: #718096;
$bc-border: #e2e8f0;
$bc-input-bg: #ffffff;
$bc-form-header: #0d3d35;

* { box-sizing: border-box; }

.booking-page {
  display: grid;
  grid-template-columns: 420px 1fr;
  min-height: 100vh;
  background: $bc-bg;
  font-family: 'DM Sans', sans-serif;

  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
}

/* ── Left aside ── */
.booking-aside {
  background: #ffffff;
  padding: 3rem 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border-right: 1px solid $bc-border;

  @media screen and (max-width: 1000px) {
    border-right: none;
    border-bottom: 1px solid $bc-border;
  }
}

.aside-label {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: $bc-teal;
  text-transform: uppercase;
  display: block;
  margin-bottom: 0.4rem;
}

.aside-title {
  font-family: 'Encode Sans Expanded', sans-serif;
  font-size: 1.9rem;
  font-weight: 700;
  color: $bc-dark;
  line-height: 1.15;
  margin: 0 0 0.4rem;
}

.aside-desc {
  font-size: 0.97rem;
  color: $bc-text-light;
  margin: 0;
  line-height: 1.6;
}

.aside-image {
  width: 100%;
  height: 240px;
  border-radius: 0.75rem;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}

.aside-perks {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;

  li {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    font-size: 0.95rem;
    color: $bc-text;
    line-height: 1.5;
  }
}

.perk-check {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba($bc-teal, 0.12);
  color: $bc-teal;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 700;
  flex-shrink: 0;
}

.aside-help {
  background: #f8fafb;
  border: 1px solid $bc-border;
  border-radius: 0.75rem;
  padding: 1.2rem 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.help-title {
  font-weight: 700;
  font-size: 0.95rem;
  color: $bc-dark;
  margin: 0 0 0.2rem;
}

.help-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.9rem;
  color: $bc-text;

  .help-icon {
    font-size: 0.95rem;
    width: 18px;
    text-align: center;
    flex-shrink: 0;
  }

  a {
    color: $bc-teal-dark;
    text-decoration: none;

    &:hover { text-decoration: underline; }
  }
}

/* ── Right main ── */
.booking-main {
  padding: 2.5rem 3rem 4rem;
  max-width: 800px;

  @media screen and (max-width: 1200px) {
    padding: 2rem 2rem 3rem;
  }

  @media screen and (max-width: 600px) {
    padding: 1.5rem 1.2rem 3rem;
  }
}

/* Form header banner */
.form-header {
  background: $bc-form-header;
  border-radius: 0.75rem 0.75rem 0 0;
  padding: 1.3rem 1.8rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0;
}

.form-header-icon {
  width: 40px;
  height: 40px;
  background: rgba(255,255,255,0.12);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  flex-shrink: 0;
}

.form-header-title {
  font-family: 'Encode Sans Expanded', sans-serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.2;
}

.form-header-sub {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.7);
  margin-top: 0.2rem;
  line-height: 1.5;
}

/* Form body */
.form-body {
  background: #ffffff;
  border-radius: 0 0 0.75rem 0.75rem;
  border: 1px solid $bc-border;
  border-top: none;
  padding: 2rem 2rem 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.form-section {
  padding-bottom: 1.8rem;
  margin-bottom: 0.5rem;
}

.section-divider {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.4rem;
  padding-bottom: 0.7rem;
  border-bottom: 1px solid $bc-border;

  span {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    color: $bc-text-light;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .req { color: $bc-teal; }
}

/* Fields */
.field-grid {
  display: grid;
  gap: 1rem;
  margin-bottom: 1rem;

  &.two-col { grid-template-columns: 1fr 1fr; }
  &.one-col { grid-template-columns: 1fr 1fr; } /* half width for DOB */
  &.sched-grid { grid-template-columns: 1fr 1.4fr; }

  @media screen and (max-width: 700px) {
    &.two-col,
    &.one-col,
    &.sched-grid { grid-template-columns: 1fr; }
  }
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  // font-size: 10rem;

  label {
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: $bc-text-light;
    text-transform: uppercase;
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid $bc-border;
    border-radius: 0.5rem;
    background: $bc-input-bg;
    font-family: 'DM Sans', sans-serif;
    font-size: 1.2rem;
    color: $bc-dark;
    outline: none;
    transition: border-color 0.15s;
    appearance: none;
    -webkit-appearance: none;

    &::placeholder { color: #a0aec0; }

    &:focus { border-color: $bc-teal; box-shadow: 0 0 0 3px rgba($bc-teal, 0.1); }
  }

  select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23718096' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    padding-right: 2.5rem;
    cursor: pointer;
  }

  textarea {
    resize: vertical;
    min-height: 100px;
    line-height: 1.6;
  }
}

.req { color: $bc-teal; }

/* Time/day toggle buttons */
.toggle-group {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.toggle-btn {
  padding: 0.6rem 0.5rem;
  border: 1px solid $bc-border;
  border-radius: 0.5rem;
  background: #ffffff;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.85rem;
  color: $bc-text;
  cursor: pointer;
  transition: all 0.15s;
  text-align: center;
  white-space: nowrap;

  &:hover {
    border-color: $bc-teal;
    color: $bc-teal-dark;
  }

  &.active {
    background: rgba($bc-teal, 0.1);
    border-color: $bc-teal;
    color: $bc-teal-dark;
    font-weight: 600;
  }
}

/* Insurance toggle switch */
.insurance-row {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.insurance-label {
  font-size: 0.97rem;
  color: $bc-text;
}

.toggle-switch {
  position: relative;
  width: 44px;
  height: 24px;
  border-radius: 999px;
  background: #cbd5e0;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
  flex-shrink: 0;
  padding: 0;

  &.on {
    background: $bc-teal;
  }
}

.switch-thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 0.2s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);

  .toggle-switch.on & {
    transform: translateX(20px);
  }
}

/* Submit */
.submit-btn {
  width: 100%;
  padding: 1.05rem;
  background: $bc-teal;
  color: #ffffff;
  border: none;
  border-radius: 0.6rem;
  font-family: 'Encode Sans Expanded', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
  margin-top: 1rem;

  &:hover {
    background: $bc-teal-dark;
    transform: translateY(-1px);
  }

  &:active { transform: translateY(0); }
}

.form-trust {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;

  span {
    font-size: 0.8rem;
    color: $bc-text-light;
  }
}
</style>