<script setup lang="ts">
import { useCampaign } from '~/composables/useCampaign';

// Optional per-campaign tweaks — custom pages (custom-campaign-pages/) pass
// these to trim the form; every field is visible by default.
const props = withDefaults(
  defineProps<{
    hideServices?: boolean;
    hideLocation?: boolean;
    hideDate?: boolean;
    hideWhatBrings?: boolean;
    /** Whitelist of insurance titles for the coverage dropdown (matched against the API response) */
    insuranceOnly?: string[];
  }>(),
  {
    hideServices: false,
    hideLocation: false,
    hideDate: false,
    hideWhatBrings: false,
  },
);

const { campaignPageId, clinic } = useCampaign();
const { apiFetch } = useApi();
const toast = useToast();

const formSubmitted = ref(false);
const submitting = ref(false);
const fieldErrors = reactive<Record<string, string>>({});

// Services available at this campaign's clinic (for the multi-select)
const services = computed<string[]>(() =>
  (clinic.value?.services || []).map((s: any) => s.title),
);

const isServicesOpen = ref(false);
const servicesDropdownRef = ref<HTMLElement | null>(null);

const toggleService = (title: string) => {
  const i = form.services.indexOf(title);
  if (i === -1) form.services.push(title);
  else form.services.splice(i, 1);
};

const servicesLabel = computed(() => {
  const n = form.services.length;
  if (!n) return 'Select services';
  if (n === 1) return form.services[0];
  return `${n} services selected`;
});

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  insurance: '',
  services: [] as string[],
  preferredLocation: '',
  preferredDate: '',
  preferredTime: '',
  whatBrings: '',
});

// Dropdown data (fetched in parallel on mount)
const clinics = ref<{ id: number; name: string }[]>([]);
const insuranceProviders = ref<{ id: number; title: string }[]>([]);

// Coverage dropdown options — whitelisted per campaign when insuranceOnly is
// passed (case-insensitive title match; empty prop = show everything)
const visibleInsuranceProviders = computed(() => {
  if (!props.insuranceOnly?.length) return insuranceProviders.value;
  const wanted = new Set(props.insuranceOnly.map((t) => t.trim().toLowerCase()));
  return insuranceProviders.value.filter((p) => wanted.has(p.title.trim().toLowerCase()));
});

const timeOptions = [
  { label: 'Any time', value: '' },
  { label: 'Morning (7–11am)', value: 'morning' },
  { label: 'Midday (11am–2pm)', value: 'midday' },
  { label: 'Afternoon (2–5pm)', value: 'afternoon' },
  { label: 'Evening (5–7pm)', value: 'evening' },
];

const today = computed(() => new Date().toISOString().split('T')[0]);

const fetchDropdownData = async () => {
  try {
    const [clinicsData, insuranceData] = await Promise.all([
      apiFetch('/clinic/names').catch(() => []),
      apiFetch('/images/insurance/names').catch(() => []),
    ]);
    clinics.value = (clinicsData || []) as { id: number; name: string }[];
    insuranceProviders.value = (insuranceData || []) as { id: number; title: string }[];
  } catch (e) {
    console.error('Failed to load form dropdowns:', e);
  }
};

onMounted(() => {
  fetchDropdownData();
  document.addEventListener('click', handleOutsideClick);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleOutsideClick);
});

const handleOutsideClick = (e: MouseEvent) => {
  if (servicesDropdownRef.value && !servicesDropdownRef.value.contains(e.target as Node)) {
    isServicesOpen.value = false;
  }
};

const clearError = (field: string) => {
  if (fieldErrors[field]) delete fieldErrors[field];
};

const handleSubmit = async () => {
  // Clear previous errors
  Object.keys(fieldErrors).forEach((k) => delete fieldErrors[k]);

  if (!campaignPageId.value) {
    toast.error({ title: 'Error', message: 'Campaign information is missing.' });
    return;
  }

  submitting.value = true;
  try {
    await apiFetch('/campaign-bookings/submit', {
      method: 'POST',
      body: {
        campaignPageId: campaignPageId.value,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone.replace(/\D/g, ''),
        insurance: form.insurance,
        services: form.services,
        preferredLocation: form.preferredLocation,
        preferredDate: form.preferredDate,
        preferredTime: form.preferredTime,
        whatBrings: form.whatBrings,
      },
    });
    formSubmitted.value = true;
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'generate_lead', { event_category: 'campaign_form' });
    }
  } catch (e: any) {
    const status = e?.response?.status || e?.statusCode;
    const data = e?.response?._data || e?.data;

    if (status === 422 && data?.errors) {
      // Surface validation errors field-by-field
      for (const [field, messages] of Object.entries(data.errors)) {
        fieldErrors[field] = (messages as string[])[0] || 'Invalid value';
      }
      toast.error({ title: 'Check your entries', message: 'Please correct the highlighted fields.' });
    } else {
      toast.error({
        title: 'Submission failed',
        message: data?.message || 'Something went wrong. Please try again.',
      });
    }
  } finally {
    submitting.value = false;
  }
};
</script>

<style scoped>
.select-arrow {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  color: #7C9195;
  pointer-events: none;
  transition: transform 0.15s ease;
}

.select-arrow.rotated {
  transform: translateY(-50%) rotate(180deg);
}
</style>

<template>
  <div class="form-card reveal in" id="appointment-form">
    <!-- Success state -->
    <div v-if="formSubmitted" class="form-success show">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10" /><path d="M8 12l3 3 5-6" /></svg>
      <h3>Request received!</h3>
      <p>A member of our care team will call you within 1 business hour to confirm your appointment.</p>
    </div>

    <!-- Form -->
    <form v-else id="appt-form" @submit.prevent="handleSubmit">
      <div class="form-card-head">
        <h2>Request Your Appointment</h2>
        <p>No referral needed. We'll confirm your time within 1 hour.</p>
      </div>

      <!-- Services (multi-select) -->
      <div v-if="services.length && !hideServices" class="field" ref="servicesDropdownRef">
        <label>Services</label>
        <div class="multi-select-trigger" @click="isServicesOpen = !isServicesOpen">
          <span class="multi-select-value" :class="{ placeholder: !form.services.length }">
            {{ servicesLabel }}
          </span>
          <span class="select-arrow" :class="{ rotated: isServicesOpen }">&#x25BE;</span>
        </div>
        <Transition name="dropdown">
          <div v-if="isServicesOpen" class="multi-select-panel">
            <label
              v-for="title in services"
              :key="title"
              class="multi-select-option"
              :class="{ active: form.services.includes(title) }"
            >
              <input
                type="checkbox"
                :checked="form.services.includes(title)"
                @change="toggleService(title)"
              />
              <span class="multi-select-check"></span>
              <span class="multi-select-text">{{ title }}</span>
            </label>
          </div>
        </Transition>
        <span v-if="fieldErrors.services" class="field-error">{{ fieldErrors.services }}</span>
      </div>

      <!-- Preferred Location -->
      <div v-if="!hideLocation" class="field">
        <label for="f-location">Preferred Location</label>
        <select
          id="f-location"
          v-model="form.preferredLocation"
          @change="clearError('preferredLocation')"
        >
          <option value="">Select a clinic</option>
          <option v-for="clinic in clinics" :key="clinic.id" :value="clinic.name">
            {{ clinic.name }}
          </option>
        </select>
        <span v-if="fieldErrors.preferredLocation" class="field-error">{{ fieldErrors.preferredLocation }}</span>
      </div>

      <!-- First / Last name -->
      <div class="form-row">
        <div class="field">
          <label for="f-first">First Name</label>
          <input
            id="f-first"
            v-model="form.firstName"
            type="text"
            required
            autocomplete="given-name"
            @input="clearError('firstName')"
          />
          <span v-if="fieldErrors.firstName" class="field-error">{{ fieldErrors.firstName }}</span>
        </div>
        <div class="field">
          <label for="f-last">Last Name</label>
          <input
            id="f-last"
            v-model="form.lastName"
            type="text"
            required
            autocomplete="family-name"
            @input="clearError('lastName')"
          />
          <span v-if="fieldErrors.lastName" class="field-error">{{ fieldErrors.lastName }}</span>
        </div>
      </div>

      <!-- Phone / Email -->
      <div class="form-row">
        <div class="field">
          <label for="f-phone">Phone</label>
          <input
            id="f-phone"
            v-model="form.phone"
            type="tel"
            required
            autocomplete="tel"
            @input="clearError('phone')"
          />
          <span v-if="fieldErrors.phone" class="field-error">{{ fieldErrors.phone }}</span>
        </div>
        <div class="field">
          <label for="f-email">Email</label>
          <input
            id="f-email"
            v-model="form.email"
            type="email"
            required
            autocomplete="email"
            @input="clearError('email')"
          />
          <span v-if="fieldErrors.email" class="field-error">{{ fieldErrors.email }}</span>
        </div>
      </div>

      <!-- Insurance / Preferred time -->
      <div class="form-row">
        <div class="field">
          <label for="f-insurance">Coverage</label>
          <select
            id="f-insurance"
            v-model="form.insurance"
            required
            @change="clearError('insurance')"
          >
            <option value="">Select insurance</option>
            <option value="self-pay">Self-Pay</option>
            <option v-for="provider in visibleInsuranceProviders" :key="provider.id" :value="provider.title">
              {{ provider.title }}
            </option>
          </select>
          <span v-if="fieldErrors.insurance" class="field-error">{{ fieldErrors.insurance }}</span>
        </div>
        <div class="field">
          <label for="f-time">Preferred Time</label>
          <select id="f-time" v-model="form.preferredTime" @change="clearError('preferredTime')">
            <option v-for="opt in timeOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
          </select>
          <span v-if="fieldErrors.preferredTime" class="field-error">{{ fieldErrors.preferredTime }}</span>
        </div>
      </div>

      <!-- Preferred date -->
      <div v-if="!hideDate" class="field">
        <label for="f-date">Preferred Date</label>
        <input
          id="f-date"
          v-model="form.preferredDate"
          type="date"
          :min="today"
          @input="clearError('preferredDate')"
        />
        <span v-if="fieldErrors.preferredDate" class="field-error">{{ fieldErrors.preferredDate }}</span>
      </div>

      <!-- What brings you in -->
      <div v-if="!hideWhatBrings" class="field">
        <label for="f-message">What brings you in? (optional)</label>
        <textarea
          id="f-message"
          v-model="form.whatBrings"
          placeholder="e.g. lower back pain for 3 weeks"
        ></textarea>
        <span v-if="fieldErrors.whatBrings" class="field-error">{{ fieldErrors.whatBrings }}</span>
      </div>

      <button type="submit" class="btn btn-primary btn-block" :disabled="submitting">
        <span v-if="submitting" class="btn-loader"></span>
        <span v-else>Request Appointment</span>
      </button>

      <p class="form-note">
        <!-- <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="10" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg> -->
        Your information is protected under HIPAA.
      </p>
    </form>
  </div>
</template>

<style scoped>
.field-error {
  display: block;
  color: #E85A47;
  font-size: 12px;
  font-weight: 600;
  margin-top: -2px;
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

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* ── Multi-select (services) ── */
.multi-select-trigger {
  position: relative;
  width: 100%;
  padding: 13px 36px 13px 14px;
  border-radius: 10px;
  border: 1.5px solid #e4eceb;
  background: #f5faf9;
  cursor: pointer;
  transition: border-color 0.15s ease, background 0.15s ease;
}

.multi-select-trigger:hover {
  border-color: #c5d5d2;
}

.multi-select-value {
  display: block;
  font-size: 14.5px;
  font-family: 'Inter', sans-serif;
  color: #0E2328;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.multi-select-value.placeholder {
  color: #7C9195;
}

.multi-select-panel {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 100;
  max-height: 240px;
  overflow-y: auto;
  margin-top: 4px;
  padding: 6px;
  background: #ffffff;
  border: 1.5px solid #e4eceb;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.multi-select-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s ease;
}

.multi-select-option:hover {
  background: #f0f7f6;
}

/* Hide the native checkbox; show a custom box */
.multi-select-option input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.multi-select-check {
  width: 18px;
  height: 18px;
  border-radius: 5px;
  border: 2px solid #c5d5d2;
  flex-shrink: 0;
  position: relative;
  transition: background 0.15s ease, border-color 0.15s ease;
}

.multi-select-option.active .multi-select-check {
  background: #2dbfad;
  border-color: #2dbfad;
}

.multi-select-option.active .multi-select-check::after {
  content: '';
  position: absolute;
  left: 4px;
  top: 0px;
  width: 5px;
  height: 10px;
  border: solid #ffffff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.multi-select-text {
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  color: #0E2328;
  line-height: 1.3;
}

/* Dropdown animation (shared with the campaign.scss one) */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
