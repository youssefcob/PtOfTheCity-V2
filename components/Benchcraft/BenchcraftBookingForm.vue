<template>
  <div class="" :class="{ 'transparent-mode': transparent }">
    <div class="booking-card" :class="{ 'booking-card--transparent': transparent }">

      <!-- Success State -->
      <div v-if="bookingSuccess" class="success-view">
        <div class="success-checkmark">
          <svg class="checkmark-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle class="checkmark-circle" cx="50" cy="50" r="45" />
            <path class="checkmark-check" d="M30 52 L44 66 L70 38" />
          </svg>
          <div class="checkmark-particles">
            <span class="particle"></span>
            <span class="particle"></span>
            <span class="particle"></span>
            <span class="particle"></span>
            <span class="particle"></span>
            <span class="particle"></span>
          </div>
        </div>
        <h2 class="success-title">Booking Confirmed!</h2>
        <p class="success-message">Your session has been booked successfully. We'll send a confirmation to your email.</p>
        <button class="btn-submit success-btn" @click="resetForm">BOOK ANOTHER SESSION</button>
      </div>

      <!-- Form State -->
      <template v-else>
      <!-- Header -->
      <div class="booking-header">
        <div class="header-icon">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="5" width="22" height="20" rx="3" stroke="#2dbfad" stroke-width="2" fill="none"/>
            <path d="M3 11h22" stroke="#2dbfad" stroke-width="2"/>
            <path d="M9 3v4M19 3v4" stroke="#2dbfad" stroke-width="2" stroke-linecap="round"/>
            <path d="M10 17l2.5 2.5L18 15" stroke="#2dbfad" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="header-text">
          <h2>Book Your Session</h2>
          <p>Golf member pricing applied automatically</p>
        </div>
      </div>

      <div class="divider"></div>

      <!-- Form -->
      <div class="booking-form">
        <!-- Full Name -->
        <div class="field-group full-width">
          <label class="field-label">FULL NAME</label>
          <input
            v-model="form.fullName"
            type="text"
            class="field-input"
            placeholder="Your full name"
          />
        </div>

        <!-- Email & Phone -->
        <div class="field-row">
          <div class="field-group">
            <label class="field-label">EMAIL</label>
            <input
              v-model="form.email"
              type="email"
              class="field-input"
              placeholder="you@email.com"
            />
          </div>
          <div class="field-group">
            <label class="field-label">PHONE</label>
            <input
              :value="formatPhone(form.phone)"
              type="tel"
              class="field-input"
              placeholder="(718) 000-0000"
              maxlength="14"
              @input="handlePhoneInput($event)"
            />
          </div>
        </div>

        <!-- Service Needed -->
        <div class="field-group full-width" ref="serviceDropdown">
          <label class="field-label">SERVICE NEEDED</label>
          <div class="custom-select-trigger" @click="toggleService">
            <span class="custom-select-value" :class="{ placeholder: !form.service }">
              {{ form.service || 'Select a service' }}
            </span>
            <span class="select-arrow" :class="{ rotated: isServiceOpen }">&#x25BE;</span>
          </div>
          <Transition name="dropdown">
            <div v-if="isServiceOpen" class="custom-select-dropdown service-dropdown">
              <div class="select-search">
                <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                <input
                  ref="serviceSearch"
                  v-model="serviceQuery"
                  type="text"
                  class="search-input"
                  placeholder="Search services..."
                  @click.stop
                />
              </div>
              <div class="select-options-list">
                <div
                  v-for="service in filteredServices"
                  :key="service"
                  class="select-option"
                  :class="{ active: form.service === service }"
                  @click.stop="selectService(service)"
                >
                  {{ service }}
                </div>
                <div v-if="filteredServices.length === 0" class="select-no-results">
                  No services found
                </div>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Payment Type -->
        <div class="field-group full-width">
          <label class="field-label">PAYMENT TYPE</label>
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
        </div>

        <!-- Preferred Date -->
        <div class="field-group full-width">
          <label class="field-label">PREFERRED DATE</label>
          <input
            v-model="form.date"
            type="date"
            class="field-input date-input"
            :min="today"
          />
        </div>

        <!-- Insurance Provider (conditional) -->
        <div v-if="form.paymentType === 'insurance'" class="field-group full-width">
          <label class="field-label">INSURANCE PROVIDER</label>
          <div class="select-wrapper">
            <select v-model="form.insuranceProvider" class="field-select">
              <option value="" disabled>Select your provider</option>
              <option v-for="provider in insuranceProviders" :key="provider" :value="provider">{{ provider }}</option>
            </select>
            <span class="select-arrow">&#x25BE;</span>
          </div>
        </div>

        <!-- Preferred Location -->
        <div class="field-group full-width location-dropdown" ref="locationDropdown">
          <label class="field-label">PREFERRED LOCATION</label>
          <div class="custom-select-trigger" @click="isLocationOpen = !isLocationOpen">
            <span class="custom-select-value" :class="{ placeholder: !form.location }">
              {{ selectedClinicName || 'Select a clinic location' }}
            </span>
            <span class="select-arrow" :class="{ rotated: isLocationOpen }">&#x25BE;</span>
          </div>
          <Transition name="dropdown">
            <div v-if="isLocationOpen" class="custom-select-dropdown">
              <div v-for="(group, city) in groupedClinics" :key="city" class="select-group">
                <div class="select-group-label">{{ city }}</div>
                <div
                  v-for="clinic in group"
                  :key="clinic.id"
                  class="select-option"
                  :class="{ active: form.location === clinic.id }"
                  @click.stop="selectClinic(clinic)"
                >
                  {{ clinic.name }}
                </div>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Submit Button -->
        <button class="btn-submit" :disabled="isSubmitting" @click="handleSubmit">
          <span v-if="isSubmitting" class="btn-loader"></span>
          <span v-else>BOOK MY SESSION →</span>
        </button>

        <!-- Footer Note -->
        <p class="footer-note">No payment today &nbsp;·&nbsp; Free cancellation 24h before</p>
      </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookingForm',
  props: {
    transparent: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      insuranceProviders: [
        "1199",
        "Aetna",
        "Affinity by Molina healthcare",
        "Amida care",
        "Anthem BCBS",
        "ArchCare",
        "BCBS healthplus (AmeriGroup)",
        "Bluecorss Blue shield (BCBS)",
        "Centerlight",
        "Centers Plan for Healthy Living",
        "Centivo",
        "Christian Brothers",
        "Cigna",
        "Elderplan",
        "Emblem GHI",
        "Emblemhealth",
        "Fidelis Care",
        "Hamaspik Choice",
        "HealthFirst",
        "Humana",
        "Magnacare",
        "Medicaid",
        "Medicare",
        "Medrisk",
        "Metroplus",
        "Molina healthcare",
        "OneCall",
        "optum",
        "oscar",
        "Partnerhealthplans",
        "Riverspring (Elderserve)",
        "SENIOR WHOLE HEALTH",
        "StreamLine",
        "Tricare",
        "UMR",
        "United healthcare All plans",
        "United healthcare Oxford",
        "VA Community Care Network",
        "Village Care Max",
        "VNS Choice",
        "Wellcare",
      ],
      clinics: [],
      isLocationOpen: false,
      isServiceOpen: false,
      serviceQuery: '',
      services: [
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
      ],
      bookingSuccess: false,
      isSubmitting: false,
      form: {
        fullName: '',
        email: '',
        phone: '',
        service: '',
        paymentType: 'self-pay',
        insuranceProvider: '',
        date: '',
        location: null,
      },
    };
  },
  computed: {
    filteredServices() {
      const q = this.serviceQuery.trim().toLowerCase();
      if (!q) return this.services;
      return this.services.filter((s) => s.toLowerCase().includes(q));
    },
    groupedClinics() {
      const groups = {};
      for (const clinic of this.clinics) {
        if (!groups[clinic.city]) {
          groups[clinic.city] = [];
        }
        groups[clinic.city].push(clinic);
      }
      // Move Corona to the top of the Queens list
      if (groups['Queens']) {
        groups['Queens'] = [
          ...groups['Queens'].filter((c) => c.name.toLowerCase().includes('corona')),
          ...groups['Queens'].filter((c) => !c.name.toLowerCase().includes('corona')),
        ];
      }
      // Sort cities, with Queens first if it exists
      const sorted = {};
      if (groups['Queens']) {
        sorted['Queens'] = groups['Queens'];
        delete groups['Queens'];
      }
      Object.assign(sorted, groups);
      return sorted;
    },
    selectedClinicName() {
      if (!this.form.location) return '';
      const clinic = this.clinics.find(c => c.id === this.form.location);
      return clinic ? `${clinic.name} — ${clinic.city}` : '';
    },
    today() {
      return new Date().toISOString().split('T')[0];
    },
  },
  mounted() {
    this.fetchClinics();
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    async fetchClinics() {
      try {
        const { apiFetch } = useApi();
        this.clinics = await apiFetch('/clinic');
      } catch (e) {
        console.error('Failed to fetch clinics:', e);
      }
    },
    selectClinic(clinic) {
      this.form.location = clinic.id;
      this.isLocationOpen = false;
    },
    toggleService() {
      this.isServiceOpen = !this.isServiceOpen;
      if (this.isServiceOpen) {
        this.focusServiceSearch();
      }
    },
    selectService(service) {
      this.form.service = service;
      this.isServiceOpen = false;
      this.serviceQuery = '';
    },
    focusServiceSearch() {
      this.$nextTick(() => {
        if (this.$refs.serviceSearch) {
          this.$refs.serviceSearch.focus();
        }
      });
    },
    formatPhone(digits) {
      const d = digits.replace(/\D/g, '').slice(0, 10);
      if (d.length === 0) return '';
      if (d.length <= 3) return `(${d}`;
      if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
      return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
    },
    handlePhoneInput(e) {
      this.form.phone = e.target.value.replace(/\D/g, '').slice(0, 10);
    },
    handleClickOutside(e) {
      const dropdown = this.$refs.locationDropdown;
      if (dropdown && !dropdown.contains(e.target)) {
        this.isLocationOpen = false;
      }
      const serviceDropdown = this.$refs.serviceDropdown;
      if (serviceDropdown && !serviceDropdown.contains(e.target)) {
        this.isServiceOpen = false;
      }
    },
    async handleSubmit() {
      const toast = useToast();

      if (!this.form.fullName.trim()) {
        toast.error({ title: 'Missing Field', message: 'Please enter your full name.' });
        return;
      }
      if (!this.form.email.trim()) {
        toast.error({ title: 'Missing Field', message: 'Please enter your email.' });
        return;
      }
      if (!this.form.phone.trim()) {
        toast.error({ title: 'Missing Field', message: 'Please enter your phone number.' });
        return;
      }
      if (!this.form.service) {
        toast.error({ title: 'Missing Field', message: 'Please select a service.' });
        return;
      }
      if (!this.form.date) {
        toast.error({ title: 'Missing Field', message: 'Please select a preferred date.' });
        return;
      }
      if (!this.form.location) {
        toast.error({ title: 'Missing Field', message: 'Please select a clinic location.' });
        return;
      }
      if (this.form.paymentType === 'insurance' && !this.form.insuranceProvider) {
        toast.error({ title: 'Missing Field', message: 'Please select your insurance provider.' });
        return;
      }

      const payload = {
        fullName: this.form.fullName,
        email: this.form.email,
        phone: this.form.phone,
        service: this.form.service,
        paymentType: this.form.paymentType,
        insuranceProvider: this.form.paymentType === 'insurance' ? this.form.insuranceProvider : null,
        date: this.form.date,
        clinicId: this.form.location,
      };

      this.isSubmitting = true;
      try {
        const { apiFetch } = useApi();
        await apiFetch('/benchcraft/book', {
          method: 'POST',
          body: payload,
        });
        toast.success({ title: 'Booking Confirmed!', message: 'Your session has been booked successfully.' });
        this.bookingSuccess = true;
      } catch (e) {
        toast.error({ title: 'Booking Failed', message: e?.data?.message || 'Something went wrong. Please try again.' });
      } finally {
        this.isSubmitting = false;
      }
    },
    resetForm() {
      this.bookingSuccess = false;
      this.form.fullName = '';
      this.form.email = '';
      this.form.phone = '';
      this.form.service = 'Sports Rehabilitation';
      this.form.paymentType = 'self-pay';
      this.form.insuranceProvider = '';
      this.form.date = '';
      this.form.location = null;
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.booking-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f4f3;
  font-family: 'DM Sans', sans-serif;
  padding: 24px;
}

.booking-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 24px 28px 20px;
  width: 90%;
  max-width: 520px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}

/* Header */
.booking-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
}

.header-icon {
  width: 44px;
  height: 44px;
  background: #e6f7f5;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.header-text h2 {
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.2;
}

.header-text p {
  font-size: 12.5px;
  color: #7a8c89;
  margin-top: 2px;
  font-weight: 400;
}

.divider {
  height: 1px;
  background: #e8eeec;
  margin-bottom: 16px;
}

/* Form Layout */
.booking-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;
}

.full-width {
  width: 100%;
}

/* Labels */
.field-label {
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.07em;
  color: #3d5450;
  text-transform: uppercase;
}

/* Inputs */
.field-input {
  width: 100%;
  padding: 10px 12px;
  border: 1.5px solid #e4eceb;
  border-radius: 10px;
  background: #f5faf9;
  font-size: 13.5px;
  font-family: 'DM Sans', sans-serif;
  color: #1a1a1a;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  appearance: none;
}

.field-input::placeholder {
  color: #a8bcb9;
}

.field-input:focus {
  border-color: #2dbfad;
  box-shadow: 0 0 0 3px rgba(45, 191, 173, 0.12);
  background: #fff;
}

/* Date input icon color */
.date-input::-webkit-calendar-picker-indicator {
  opacity: 0.5;
  cursor: pointer;
}

/* Selects */
.select-wrapper {
  position: relative;
  width: 100%;
}

/* ── Payment Toggle ── */
.payment-toggle {
  display: flex;
  border-radius: 10px;
  overflow: hidden;
  border: 1.5px solid #e4eceb;
  background: #f5faf9;
}

.toggle-btn {
  flex: 1;
  padding: 10px 12px;
  border: none;
  background: transparent;
  font-size: 13.5px;
  font-family: 'DM Sans', sans-serif;
  font-weight: 600;
  color: #7a8c89;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.toggle-btn.active {
  background: #2dbfad;
  color: #ffffff;
}

.field-select {
  width: 100%;
  padding: 10px 36px 10px 12px;
  border: 1.5px solid #e4eceb;
  border-radius: 10px;
  background: #f5faf9;
  font-size: 13.5px;
  font-family: 'DM Sans', sans-serif;
  color: #1a1a1a;
  outline: none;
  appearance: none;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.field-select:focus {
  border-color: #2dbfad;
  box-shadow: 0 0 0 3px rgba(45, 191, 173, 0.12);
  background: #fff;
}

.select-arrow {
  position: absolute;
  right: 13px;
  top: 50%;
  transform: translateY(-50%);
  color: #7a8c89;
  font-size: 13px;
  pointer-events: none;
  transition: transform 0.2s;
}

.select-arrow.rotated {
  transform: translateY(-50%) rotate(180deg);
}

/* ── Custom Select Dropdown ── */
.location-dropdown {
  position: relative;
}

.custom-select-trigger {
  position: relative;
  width: 100%;
  padding: 10px 36px 10px 12px;
  border: 1.5px solid #e4eceb;
  border-radius: 10px;
  background: #f5faf9;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.custom-select-trigger:hover {
  border-color: #c5d5d2;
}

.custom-select-value {
  display: block;
  font-size: 13.5px;
  font-family: 'DM Sans', sans-serif;
  color: #1a1a1a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.custom-select-value.placeholder {
  color: #a8bcb9;
}

.custom-select-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 100;
  max-height: 280px;
  overflow-y: auto;
  margin-top: 4px;
  background: #ffffff;
  border: 1.5px solid #e4eceb;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.select-group:not(:last-child) {
  border-bottom: 1px solid #e4eceb;
}

.select-group-label {
  padding: 10px 12px 4px;
  font-size: 11px;
  font-weight: 700;
  color: #7a8c89;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.select-option {
  padding: 8px 12px;
  font-size: 13.5px;
  font-family: 'DM Sans', sans-serif;
  color: #1a1a1a;
  cursor: pointer;
  transition: background 0.15s;
}

.select-option:hover {
  background: #f0f7f6;
}

.select-option.active {
  color: #2dbfad;
  font-weight: 600;
}

/* Service search bar */
.select-search {
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background: #ffffff;
  border-bottom: 1px solid #e4eceb;
  z-index: 1;
}

.search-icon {
  color: #7a8c89;
  flex-shrink: 0;
}

.search-input {
  width: 100%;
  border: none;
  outline: none;
  font-size: 13.5px;
  font-family: 'DM Sans', sans-serif;
  color: #1a1a1a;
  background: transparent;
}

.search-input::placeholder {
  color: #a8bcb9;
}

.select-options-list {
  padding: 4px 0;
}

.select-no-results {
  padding: 16px 12px;
  font-size: 13px;
  font-family: 'DM Sans', sans-serif;
  color: #7a8c89;
  text-align: center;
}

/* Dropdown animation */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* Submit Button */
.btn-submit {
  width: 100%;
  padding: 13px;
  background: #2dbfad;
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  font-family: 'DM Sans', sans-serif;
  letter-spacing: 0.06em;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  margin-top: 4px;
  transition: background 0.2s, transform 0.1s, box-shadow 0.2s;
}

.btn-submit:hover {
  background: #27ad9c;
  box-shadow: 0 4px 16px rgba(45, 191, 173, 0.35);
}

.btn-submit:active {
  transform: scale(0.99);
}

.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.btn-loader {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 2.5px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Footer Note */
.footer-note {
  text-align: center;
  font-size: 12.5px;
  color: #9aaeab;
  margin-top: 2px;
}

/* ── Transparent Mode ── */
.transparent-mode .booking-card--transparent {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(26px);
  -webkit-backdrop-filter: blur(26px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.transparent-mode .header-icon {
  background: rgba(45, 191, 173, 0.15);
}

.transparent-mode .header-icon svg rect,
.transparent-mode .header-icon svg path {
  stroke: #2dbfad;
}

.transparent-mode .header-text h2 {
  color: #ffffff;
}

.transparent-mode .header-text p {
  color: rgba(255, 255, 255, 0.6);
}

.transparent-mode .divider {
  background: rgba(255, 255, 255, 0.15);
}

.transparent-mode .field-label {
  color: rgba(255, 255, 255, 0.7);
}

.transparent-mode .field-input {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.15);
  color: #ffffff;
}

.transparent-mode .field-input::placeholder {
  color: rgba(255, 255, 255, 0.35);
}

.transparent-mode .field-input:focus {
  border-color: #2dbfad;
  box-shadow: 0 0 0 3px rgba(45, 191, 173, 0.2);
  background: rgba(255, 255, 255, 0.12);
}

.transparent-mode .field-select {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.15);
  color: #ffffff;
}

.transparent-mode .field-select option {
  background: #1a2a3a;
  color: #ffffff;
}

.transparent-mode .field-select:focus {
  border-color: #2dbfad;
  box-shadow: 0 0 0 3px rgba(45, 191, 173, 0.2);
  background: rgba(255, 255, 255, 0.12);
}

.transparent-mode .payment-toggle {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.15);
}

.transparent-mode .toggle-btn {
  color: rgba(255, 255, 255, 0.5);
}

.transparent-mode .toggle-btn.active {
  background: #2dbfad;
  color: #ffffff;
}

.transparent-mode .custom-select-trigger {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.15);
}

.transparent-mode .custom-select-value {
  color: #ffffff;
}

.transparent-mode .custom-select-value.placeholder {
  color: rgba(255, 255, 255, 0.35);
}

.transparent-mode .custom-select-dropdown {
  background: rgba(20, 40, 55, 0.95);
  border-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.transparent-mode .select-search {
  background: rgba(20, 40, 55, 0.95);
  border-bottom-color: rgba(255, 255, 255, 0.1);
}

.transparent-mode .search-icon {
  color: rgba(255, 255, 255, 0.4);
}

.transparent-mode .search-input {
  color: #ffffff;
}

.transparent-mode .search-input::placeholder {
  color: rgba(255, 255, 255, 0.35);
}

.transparent-mode .select-no-results {
  color: rgba(255, 255, 255, 0.5);
}

.transparent-mode .select-group:not(:last-child) {
  border-bottom-color: rgba(255, 255, 255, 0.1);
}

.transparent-mode .select-group-label {
  color: rgba(255, 255, 255, 0.5);
}

.transparent-mode .select-option {
  color: rgba(255, 255, 255, 0.85);
}

.transparent-mode .select-option:hover {
  background: rgba(255, 255, 255, 0.08);
}

.transparent-mode .select-option.active {
  color: #2dbfad;
}

.transparent-mode .select-arrow {
  color: rgba(255, 255, 255, 0.5);
}

.transparent-mode .btn-submit {
  background: #2dbfad;
  color: #ffffff;
}

.transparent-mode .btn-submit:hover {
  background: #24a899;
  box-shadow: 0 4px 16px rgba(45, 191, 173, 0.4);
}

.transparent-mode .footer-note {
  color: rgba(255, 255, 255, 0.4);
}

/* ── Success View ── */
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
  stroke: #2dbfad;
  stroke-width: 4;
  stroke-dasharray: 283;
  stroke-dashoffset: 283;
  stroke-linecap: round;
  animation: draw-circle 0.6s ease-out 0.1s forwards;
}

.checkmark-check {
  fill: none;
  stroke: #E4C97A;
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

/* Particles */
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
  background: #2dbfad;
  animation: particle-burst 0.6s ease-out 0.8s forwards;
  --tx: -40px;
  --ty: -35px;
}
.particle:nth-child(2) {
  background: #E4C97A;
  animation: particle-burst 0.6s ease-out 0.85s forwards;
  --tx: 38px;
  --ty: -30px;
}
.particle:nth-child(3) {
  background: #0d1f35;
  animation: particle-burst 0.6s ease-out 0.9s forwards;
  --tx: -35px;
  --ty: 38px;
}
.particle:nth-child(4) {
  background: #2dbfad;
  animation: particle-burst 0.6s ease-out 0.82s forwards;
  --tx: 40px;
  --ty: 36px;
}
.particle:nth-child(5) {
  background: #E4C97A;
  animation: particle-burst 0.6s ease-out 0.88s forwards;
  --tx: 0px;
  --ty: -45px;
}
.particle:nth-child(6) {
  background: #0d1f35;
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
  font-family: 'DM Sans', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
  animation: fade-up 0.4s ease-out 0.7s both;
}

.success-message {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
  color: #7a8c89;
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

/* Transparent mode success */
.transparent-mode .success-title {
  color: #ffffff;
}

.transparent-mode .success-message {
  color: rgba(255, 255, 255, 0.7);
}
</style>