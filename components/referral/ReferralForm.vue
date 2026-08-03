<template>
  <div class="referral-form">
    <div class="wrapper">
      <div class="form">
        <div class="form-header">
          <span>NEW REFERRAL</span>
          <h3>Submit a patient referral</h3>
          <p>Complete the form below and attach any relevant documents. Our care
            coordination team will contact your patient within one business day.</p>
        </div>

        <form class="form-body" @submit.prevent="submit">

          <!-- Role toggle -->
          <div class="toggle-group">
            <span class="toggle-label">SELECT YOUR ROLE</span>
            <div class="toggle-pills">
              <button type="button" :class="['pill', { active: role === 'physician' }]" @click="setRole('physician')">Physician</button>
              <button type="button" :class="['pill', { active: role === 'patient' }]" @click="setRole('patient')">Patient</button>
            </div>
          </div>

          <!-- Referral toggle (patient only) -->
          <div v-if="role === 'patient'" class="toggle-group">
            <span class="toggle-label">REFERRAL</span>
            <div class="toggle-pills wide-pills">
              <button type="button" :class="['pill', 'pill-wide', { active: hasReferral }]" @click="setHasReferral(true)">I already have a Referral</button>
              <button type="button" :class="['pill', 'pill-wide', { active: !hasReferral }]" @click="setHasReferral(false)">I don't have a Referral</button>
            </div>
          </div>

          <!-- ── PHYSICIAN FORM ── -->
          <template v-if="role === 'physician'">
            <span class="form-section-header">YOUR INFORMATION</span>
            <div class="slash"></div>
            <div class="field-grid">
              <div class="field">
                <label>Full name <span class="req">*</span></label>
                <input type="text" v-model="form.full_name" placeholder="Dr. Jane Smith"
                  :class="{ 'input-error': errors.full_name }" />
                <span v-if="errors.full_name" class="error-msg">{{ errors.full_name }}</span>
              </div>
              <div class="field">
                <label>Title / Specialty <span class="req">*</span></label>
                <select v-model="form.specialty" :class="{ 'input-error': errors.specialty }">
                  <option value="">Select specialty</option>
                  <option value="MD">MD</option>
                  <option value="DO">DO</option>
                  <option value="DPT">DPT</option>
                  <option value="NP">NP</option>
                  <option value="PA">PA</option>
                  <option value="Chiropractor">Chiropractor</option>
                  <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Other">Other</option>
                </select>
                <span v-if="errors.specialty" class="error-msg">{{ errors.specialty }}</span>
              </div>
              <div class="field">
                <label>Practice / Organization <span class="req">*</span></label>
                <input type="text" v-model="form.organization" placeholder="PT Of The City"
                  :class="{ 'input-error': errors.organization }" />
                <span v-if="errors.organization" class="error-msg">{{ errors.organization }}</span>
              </div>
              <div class="field">
                <label>Patient Referral / Inquiry Type</label>
                <input type="text" v-model="form.inquiry_type" placeholder="1234567890" />
              </div>
              <div class="field">
                <label>Email address <span class="req">*</span></label>
                <input type="email" v-model="form.physician_email" placeholder="dr@ptofthecity.com"
                  :class="{ 'input-error': errors.physician_email }" />
                <span v-if="errors.physician_email" class="error-msg">{{ errors.physician_email }}</span>
              </div>
              <div class="field">
                <label>Phone number <span class="req">*</span></label>
                <input type="tel" v-model="form.physician_phone" placeholder="(212) 555-0100"
                  :class="{ 'input-error': errors.physician_phone }" />
                <span v-if="errors.physician_phone" class="error-msg">{{ errors.physician_phone }}</span>
              </div>
            </div>

            <div class="slash notes-slash"></div>
            <div class="field">
              <label>Clinical notes / Diagnosis</label>
              <textarea v-model="form.clinical_notes"
                placeholder="ICD-10 codes, diagnosis details, specific treatment goals, precautions, or any other relevant clinical information..."></textarea>
            </div>

            <div class="slash"></div>
            <span class="form-section-header">PATIENT INFORMATION</span>
            <div class="slash"></div>
            <div class="field-grid">
              <div class="field">
                <label>Patient First Name <span class="req">*</span></label>
                <input type="text" v-model="form.patient_first_name" placeholder="Jane"
                  :class="{ 'input-error': errors.patient_first_name }" />
                <span v-if="errors.patient_first_name" class="error-msg">{{ errors.patient_first_name }}</span>
              </div>
              <div class="field">
                <label>Patient Last Name <span class="req">*</span></label>
                <input type="text" v-model="form.patient_last_name" placeholder="Smith"
                  :class="{ 'input-error': errors.patient_last_name }" />
                <span v-if="errors.patient_last_name" class="error-msg">{{ errors.patient_last_name }}</span>
              </div>
              <div class="field">
                <label>Patient Phone Number <span class="req">*</span></label>
                <input type="tel" v-model="form.patient_phone" placeholder="(212) 555-0100"
                  :class="{ 'input-error': errors.patient_phone }" />
                <span v-if="errors.patient_phone" class="error-msg">{{ errors.patient_phone }}</span>
              </div>
              <div class="field">
                <label>Patient Date of Birth <span class="req">*</span></label>
                <input type="date" v-model="form.patient_dob" :class="{ 'input-error': errors.patient_dob }" style="width:100%" />
                <span v-if="errors.patient_dob" class="error-msg">{{ errors.patient_dob }}</span>
              </div>
              <div class="field">
                <label>Patient Email</label>
                <input type="email" v-model="form.patient_email" placeholder="jane@example.com" />
              </div>
              <div class="field">
                <label>Patient Address</label>
                <input type="text" v-model="form.patient_address" placeholder="123 Main St, New York, NY" />
              </div>
            </div>

            <div class="slash upload-slash"></div>
            <span class="form-section-header">UPLOAD REFERRAL LETTER <span class="optional-label">(optional)</span></span>
            <div class="upload-area" @click="triggerPhysicianFileInput"
              @dragover.prevent @drop.prevent="handlePhysicianDrop">
              <input ref="physicianFileInputRef" type="file" multiple accept=".pdf,.doc,.docx" style="display:none"
                @change="handlePhysicianFileChange" />
              <div class="upload-icon-wrap">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="1.75">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <p class="upload-main">Drop files or click to upload</p>
              <p class="upload-sub">Referral letter, <strong>PDF or Word documents</strong></p>
              <p class="upload-sub">Max 10MB per file</p>
              <div class="hipaa-badge">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                </svg>
                HIPAA-compliant upload
              </div>
              <div v-if="physicianFiles.length" class="uploaded-files" @click.stop>
                <span v-for="(f, i) in physicianFiles" :key="i" class="file-chip">
                  {{ f.name }}
                  <button type="button" @click="removePhysicianFile(i)">×</button>
                </span>
              </div>
            </div>
          </template>

          <!-- ── PATIENT FORM ── -->
          <template v-else>
            <span class="form-section-header">YOUR INFORMATION</span>
            <div class="slash"></div>
            <div class="field-grid">
              <div class="field">
                <label>Patient First Name <span class="req">*</span></label>
                <input type="text" v-model="form.patient_first_name" placeholder="Jane"
                  :class="{ 'input-error': errors.patient_first_name }" />
                <span v-if="errors.patient_first_name" class="error-msg">{{ errors.patient_first_name }}</span>
              </div>
              <div class="field">
                <label>Patient Last Name <span class="req">*</span></label>
                <input type="text" v-model="form.patient_last_name" placeholder="Smith"
                  :class="{ 'input-error': errors.patient_last_name }" />
                <span v-if="errors.patient_last_name" class="error-msg">{{ errors.patient_last_name }}</span>
              </div>
              <div class="field">
                <label>Patient Phone Number <span class="req">*</span></label>
                <input type="tel" v-model="form.patient_phone" placeholder="(212) 555-0100"
                  :class="{ 'input-error': errors.patient_phone }" />
                <span v-if="errors.patient_phone" class="error-msg">{{ errors.patient_phone }}</span>
              </div>
              <div class="field">
                <label>Patient Date of Birth <span class="req">*</span></label>
                <input type="date" v-model="form.patient_dob" :class="{ 'input-error': errors.patient_dob }" style="width:100%" />
                <span v-if="errors.patient_dob" class="error-msg">{{ errors.patient_dob }}</span>
              </div>

              <div class="field">
                <label>Preferred Language</label>
                <select v-model="form.preferred_language">
                  <option value="">Select language</option>
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="Arabic">Arabic</option>
                  <option value="Russian">Russian</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div class="field">
                <label>Preferred Time of Communication</label>
                <select v-model="form.preferred_time">
                  <option value="">Anytime</option>
                  <option value="Morning">Morning (8am–12pm)</option>
                  <option value="Afternoon">Afternoon (12pm–5pm)</option>
                  <option value="Evening">Evening (5pm–8pm)</option>
                </select>
              </div>
            </div>
          </template>

          <!-- Coverage & Insurance (all patients) -->
          <template v-if="role === 'patient'">
            <div class="slash coverage-slash"></div>

            <div class="coverage-group">
              <span class="coverage-label">Patient Coverage</span>
              <div class="coverage-pills">
                <button type="button" :class="['pill', { active: form.coverage === 'in-network' }]" @click="form.coverage = 'in-network'">In-Network</button>
                <button type="button" :class="['pill', { active: form.coverage === 'out-of-network' }]" @click="form.coverage = 'out-of-network'">Out-of-Network</button>
                <button type="button" :class="['pill', { active: form.coverage === 'self-pay' }]" @click="form.coverage = 'self-pay'">Self-pay</button>
              </div>
            </div>

            <div v-if="form.coverage === 'in-network'" class="field insurance-field">
              <label>Insurance provider <span class="req">*</span></label>
              <div class="insurance-select-wrap" :class="{ 'wrap-error': errors.insurance_provider }">
                <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <select v-model="form.insurance_provider">
                  <option value="">Select a Provider</option>
                  <option v-for="p in insuranceProviders" :key="p" :value="p">{{ p }}</option>
                </select>
                <svg class="chevron-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
              <span v-if="errors.insurance_provider" class="error-msg">{{ errors.insurance_provider }}</span>
            </div>

            <!-- File upload (has referral only) -->
            <template v-if="hasReferral">
            <div class="slash upload-slash"></div>
            <span class="form-section-header">UPLOAD REFERRAL LETTER <span class="req">*</span></span>
            <div class="upload-area" :class="{ 'upload-error': errors.files }" @click="triggerFileInput"
              @dragover.prevent @drop.prevent="handleDrop">
              <input ref="fileInputRef" type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.webp" style="display:none"
                @change="handleFileChange" />
              <div class="upload-icon-wrap">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="1.75">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <p class="upload-main">Drop files or click to upload</p>
              <p class="upload-sub">Referral notes, imaging reports, <strong>PDF or images</strong></p>
              <p class="upload-sub">Max 10MB per file</p>
              <div class="hipaa-badge">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                </svg>
                HIPAA-compliant upload
              </div>
              <div v-if="uploadedFiles.length" class="uploaded-files" @click.stop>
                <span v-for="(f, i) in uploadedFiles" :key="i" class="file-chip">
                  {{ f.name }}
                  <button type="button" @click="removeFile(i)">×</button>
                </span>
              </div>
            </div>
            <span v-if="errors.files" class="error-msg">{{ errors.files }}</span>
            </template>
          </template>

          <button type="submit" class="btn cta submit-btn" :disabled="submitting">
            <svg v-if="!submitting" width="16" height="16" viewBox="0 0 16 16" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M14.6666 1.08667L7.33331 8.42" stroke="#103535" stroke-width="1.33333" />
              <path d="M14.6666 1.08667L9.99998 14.42L7.33331 8.42L1.33331 5.75334L14.6666 1.08667Z" stroke="#103535"
                stroke-width="1.33333" />
            </svg>
            {{ submitting ? 'Submitting…' : 'Submit referral' }}
          </button>

          <p class="security-note">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            256-bit encryption · HIPAA compliant · Information is never shared with third parties
          </p>

        </form>
      </div>

      <!-- Sidebar -->
      <div class="sidebar">
        <!-- <div class="sidebar-card dark">
          <h3>Title</h3>
          <p>Paragraph</p>
        </div> -->

        <div class="sidebar-card light">
          <p class="direct-title">Prefer to refer directly?</p>

          <div class="contact-row">
            <span class="contact-icon phone">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12.7 19.79 19.79 0 0 1 1.63 4.1 2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.1 6.1l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17.92z" />
              </svg>
            </span>
            <div>
              <a href="tel:+17186480888">(718) 648-0888</a>
              <p>Mon – Fri, 8am – 6pm</p>
            </div>
          </div>

          <div class="contact-row">
            <span class="contact-icon email">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </span>
            <div>
              <a href="mailto:referrals@ptofthecity.com">referrals@ptofthecity.com</a>
              <p>Direct referral inbox</p>
            </div>
          </div>

          <div class="fax-box">
            <span class="contact-icon fax">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" />
              </svg>
            </span>
            <div>
              <p class="fax-label">SECURE FAX</p>
              <a href="fax:+17186480889">(718) 648-0889</a>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import Validation from '~/mixins/Validation';
import type { Insurance } from '~/types/types';

const toast = useToast();

const role = ref<'physician' | 'patient'>('physician');
const hasReferral = ref(true);
const errors = ref<Record<string, string>>({});

const form = reactive({
  // Physician info
  full_name: '',
  specialty: '',
  organization: '',
  inquiry_type: '',
  physician_email: '',
  physician_phone: '',
  clinical_notes: '',
  // Patient info (all cases)
  patient_first_name: '',
  patient_last_name: '',
  patient_phone: '',
  patient_dob: '',
  patient_email: '',
  patient_address: '',
  // Patient no-referral
  preferred_language: '',
  preferred_time: '',
  // Patient with-referral
  coverage: 'in-network' as 'in-network' | 'out-of-network' | 'self-pay',
  insurance_provider: '',
});

const uploadedFiles = ref<File[]>([]);
const fileInputRef = ref<HTMLInputElement | null>(null);
const physicianFiles = ref<File[]>([]);
const physicianFileInputRef = ref<HTMLInputElement | null>(null);
const submitting = ref(false);

const { data: bookingData } = await useFetch<{ insurances: Insurance[] }>(`${useUrl()}/web/booking`);
const insuranceProviders = computed(() => bookingData.value?.insurances.map(i => i.title) ?? []);

const setRole = (r: 'physician' | 'patient') => {
  role.value = r;
  errors.value = {};
};

const setHasReferral = (v: boolean) => {
  hasReferral.value = v;
  errors.value = {};
};

const triggerFileInput = () => fileInputRef.value?.click();

const handleFileChange = (e: Event) => {
  const files = (e.target as HTMLInputElement).files;
  if (files) {
    uploadedFiles.value.push(...Array.from(files));
    delete errors.value.files;
  }
};

const handleDrop = (e: DragEvent) => {
  const files = e.dataTransfer?.files;
  if (files) {
    uploadedFiles.value.push(...Array.from(files));
    delete errors.value.files;
  }
};

const removeFile = (index: number) => {
  uploadedFiles.value.splice(index, 1);
};

const triggerPhysicianFileInput = () => physicianFileInputRef.value?.click();

const handlePhysicianFileChange = (e: Event) => {
  const files = (e.target as HTMLInputElement).files;
  if (files) physicianFiles.value.push(...Array.from(files));
};

const handlePhysicianDrop = (e: DragEvent) => {
  const files = e.dataTransfer?.files;
  if (files) physicianFiles.value.push(...Array.from(files));
};

const removePhysicianFile = (index: number) => {
  physicianFiles.value.splice(index, 1);
};


const validate = (): boolean => {
  const vForm = {
    // Physician fields
    full_name: form.full_name,
    specialty: form.specialty,
    organization: form.organization,
    physician_email: form.physician_email,
    physician_phone: form.physician_phone,
    // Patient fields
    patient_first_name: form.patient_first_name,
    patient_last_name: form.patient_last_name,
    patient_phone: form.patient_phone,
    patient_dob: form.patient_dob,
    insurance_provider: form.insurance_provider,
    role: role.value,
    coverage: form.coverage,
    has_referral: String(hasReferral.value),
  };

  const v = new Validation(
    {
      full_name: { rules: ['required:if:role==physician'], message: { required: 'Full name is required' } },
      specialty: { rules: ['required:if:role==physician'], message: { required: 'Specialty is required' } },
      organization: { rules: ['required:if:role==physician'], message: { required: 'Practice / Organization is required' } },
      physician_email: { rules: ['required:if:role==physician'], message: { required: 'Email address is required' } },
      physician_phone: { rules: ['required:if:role==physician'], message: { required: 'Phone number is required' } },
      patient_first_name: { rules: ['required'], message: { required: 'First name is required' } },
      patient_last_name: { rules: ['required'], message: { required: 'Last name is required' } },
      patient_phone: { rules: ['required'], message: { required: 'Phone number is required' } },
      patient_dob: { rules: ['required'], message: { required: 'Date of birth is required' } },
      insurance_provider: {
        rules: ['required:if:role==patient&coverage==in-network'],
        message: { required: 'Insurance provider is required' },
      },
    },
    vForm,
  );

  const errs = v.validate();
  errors.value = errs.reduce((acc, e) => ({ ...acc, ...e }), {} as Record<string, string>);

  if (role.value === 'patient' && hasReferral.value && uploadedFiles.value.length === 0) {
    errors.value.files = 'Please upload at least one referral letter';
  }

  return v.isValid && !errors.value.files;
};

const submit = async () => {
  if (!validate()) return;

  submitting.value = true;
  try {
    const body = new FormData();
    body.append('role', role.value);
    body.append('patient_first_name', form.patient_first_name);
    body.append('patient_last_name', form.patient_last_name);
    body.append('patient_phone', form.patient_phone);
    body.append('patient_dob', form.patient_dob);

    if (role.value === 'physician') {
      body.append('full_name', form.full_name);
      body.append('specialty', form.specialty);
      body.append('organization', form.organization);
      body.append('inquiry_type', form.inquiry_type);
      body.append('physician_email', form.physician_email);
      body.append('physician_phone', form.physician_phone);
      body.append('clinical_notes', form.clinical_notes);
      body.append('patient_email', form.patient_email);
      body.append('patient_address', form.patient_address);
      physicianFiles.value.forEach(f => body.append('files[]', f));
    }

    if (role.value === 'patient') {
      body.append('has_referral', String(hasReferral.value));
      body.append('preferred_language', form.preferred_language);
      body.append('preferred_time', form.preferred_time);
      body.append('coverage', form.coverage);
      if (form.coverage === 'in-network') body.append('insurance_provider', form.insurance_provider);
      if (hasReferral.value) uploadedFiles.value.forEach(f => body.append('files[]', f));
    }

    await $fetch(`${useUrl()}/web/referral`, { method: 'POST', body });
    toast.success({ message: "Referral submitted! We'll be in touch within one business day." });
    Object.assign(form, {
      full_name: '', specialty: '', organization: '', inquiry_type: '',
      physician_email: '', physician_phone: '', clinical_notes: '',
      patient_first_name: '', patient_last_name: '', patient_phone: '', patient_dob: '',
      patient_email: '', patient_address: '', preferred_language: '', preferred_time: '',
      coverage: 'in-network', insurance_provider: '',
    });
    uploadedFiles.value = [];
    physicianFiles.value = [];
    errors.value = {};
  } catch {
    toast.error({ message: 'Something went wrong. Please try again or call us directly.' });
  } finally {
    submitting.value = false;
  }
};
</script>

<style scoped lang="scss">
.referral-form {
  padding: 5rem 17.6rem 0;

  @media screen and (max-width: 1100px) {
    padding: 5rem 1.6rem 5rem;
  }
}

.wrapper {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 3rem;
  align-items: start;

  @media screen and (max-width: 1100px) {
    grid-template-columns: 1fr 300px;
  }

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: sticky;
  top: 2rem;

  @media screen and (max-width: 800px) {
    position: static;
  }
}

.sidebar-card {
  border-radius: 1.25rem;
  padding: 2rem;

  &.dark {
    background: #0f2d3a;
    min-height: 40rem;

    h3 {
      color: white;
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    p {
      color: rgba(255, 255, 255, 0.45);
      font-size: 0.95rem;
    }
  }

  &.light {
    background: rgba(#0c2340, 0.09);
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
}

.direct-title {
  font-weight: 500;
  font-size: 1.25rem;
  color: black;
}

.contact-row {
  display: flex;
  align-items: center;
  gap: 0.85rem;

  a {
    font-weight: 500;
    font-size: 1.2rem;
    color: black;
    text-decoration: none;

    &:hover {
      color: $cta;
    }
  }

  p {
    font-size: 1.25rem;
    color: #555;
    margin-top: 0.1rem;
  }
}

.contact-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &.phone,
  &.email {
    background: rgba($cta, 0.12);
    color: $cta;
  }

  &.fax {
    background: rgba(255, 180, 80, 0.18);
    color: #c97a00;
  }
}

.fax-box {
  background: #fdf3e3;
  border-radius: 0.75rem;
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.85rem;

  a {
    font-weight: 700;
    font-size: 1.25rem;
    color: $navy;
    text-decoration: none;

    &:hover {
      color: $cta;
    }
  }
}

.fax-label {
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #c97a00;
  margin-bottom: 0.15rem;
}

.form-header {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  span {
    color: $cta;
    font-size: 1.5rem;
    font-weight: 500;
  }

  h3 {
    color: $black;
    font-size: 2.875rem;
    font-weight: 400;
  }

  p {
    font-size: 2rem;
    font-weight: 400;
    color: #4A5568;
    line-height: 200%;
  }
}

.form-body {
  margin-top: 4rem;
  padding: 4rem 3rem;
  border: 1px solid rgba(12, 35, 64, 0.12);
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  .form-section-header {
    color: #718096;
    font-size: 1.5rem;
    font-weight: 400;
  }

  .slash {
    width: 100%;
    height: 1px;
    background-color: rgba(12, 35, 64, 0.12);
  }
}

// Role / referral toggles
.toggle-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.toggle-label {
  font-size: 1.1rem;
  font-weight: 500;
  color: #718096;
  letter-spacing: 0.05em;
  text-align: center;
}

.toggle-pills {
  display: flex;
  gap: 0.75rem;
  justify-content: center;

  &.wide-pills {
    gap: 0.5rem;
  }
}

.pill {
  padding: 0.7rem 2rem;
  border-radius: 50px;
  border: 1.5px solid $cta;
  background: transparent;
  color: #103535;
  font-size: 1.4rem;
  font-weight: 400;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.18s, color 0.18s;

  &.active {
    background: $cta;
    color: #103535;
  }

  &.pill-wide {
    padding: 0.7rem 1.5rem;
    font-size: 1.3rem;
  }
}

.field-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 0.5rem;

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
  }
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  label {
    font-size: 1.4rem;
    font-weight: 400;
    color: #2D3748;
  }

  .req {
    color: #E53E3E;
  }

  textarea {
    width: 100%;
    min-height: 14rem;
    resize: vertical;
    border: 1px solid rgba(12, 35, 64, 0.22);
    border-radius: 0.75rem;
    padding: 1.25rem;
    font-size: 1.4rem;
    color: #2D3748;
    background: white;
    outline: none;
    font-family: inherit;
    transition: border-color 0.2s;

    &::placeholder { color: #A0AEC0; }
    &:focus { border-color: $cta; }
  }

  input,
  select {
    width: 100%;
    height: 5rem;
    border: 1px solid rgba(12, 35, 64, 0.22);
    border-radius: 0.75rem;
    padding: 1.25rem;
    font-size: 1.4rem;
    color: #2D3748;
    background: white;
    outline: none;
    font-family: inherit;
    transition: border-color 0.2s;

    &::placeholder {
      color: #A0AEC0;
    }

    &:focus {
      border-color: $cta;
    }

    &.input-error {
      border-color: #E53E3E;
    }
  }
}

.optional-label {
  font-size: 1.2rem;
  font-weight: 400;
  color: #A0AEC0;
}

.error-msg {
  font-size: 1.2rem;
  color: #E53E3E;
  margin-top: -0.2rem;
}

.notes-slash {
  margin: 1rem 0;
}

// Coverage section
.coverage-slash {
  margin-top: 0.5rem;
}

.coverage-group {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.coverage-label {
  font-size: 1.3rem;
  font-weight: 400;
  color: #2D3748;
}

.coverage-pills {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
}

// Insurance select
.insurance-field {
  margin-top: 0.25rem;
}

.insurance-select-wrap {
  position: relative;
  display: flex;
  align-items: center;

  .search-icon {
    position: absolute;
    left: 1.25rem;
    color: #A0AEC0;
    pointer-events: none;
  }

  .chevron-icon {
    position: absolute;
    right: 1.25rem;
    color: #A0AEC0;
    pointer-events: none;
  }

  select {
    width: 100%;
    height: 5rem;
    border: 1px solid rgba(12, 35, 64, 0.22);
    border-radius: 0.75rem;
    padding: 1.25rem 4rem 1.25rem 3.5rem;
    font-size: 1.4rem;
    color: #2D3748;
    background: white;
    outline: none;
    font-family: inherit;
    appearance: none;
    cursor: pointer;
    transition: border-color 0.2s;

    &:focus {
      border-color: $cta;
    }
  }

  &.wrap-error select {
    border-color: #E53E3E;
  }
}

// File upload
.upload-slash {
  margin-top: 0.5rem;
}

.upload-area {
  border: 1.5px dashed rgba(12, 35, 64, 0.22);
  border-radius: 1rem;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;

  &:hover {
    border-color: $cta;
    background: rgba($cta, 0.03);
  }

  &.upload-error {
    border-color: #E53E3E;
  }
}

.upload-icon-wrap {
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  background: rgba($cta, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: $cta;
  margin-bottom: 0.5rem;
}

.upload-main {
  font-size: 1.4rem;
  font-weight: 500;
  color: #2D3748;
}

.upload-sub {
  font-size: 1.2rem;
  color: #718096;

  strong {
    color: $cta;
    font-weight: 600;
  }
}

.hipaa-badge {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba($cta, 0.12);
  color: darken(#3ecfb2, 20%);
  font-size: 1.1rem;
  font-weight: 500;
  padding: 0.4rem 1rem;
  border-radius: 50px;
  margin-top: 0.5rem;
}

.uploaded-files {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.file-chip {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(12, 35, 64, 0.07);
  border-radius: 50px;
  padding: 0.3rem 0.85rem;
  font-size: 1.2rem;
  color: #2D3748;

  button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.4rem;
    color: #718096;
    line-height: 1;
    padding: 0;

    &:hover {
      color: #E53E3E;
    }
  }
}

.submit-btn {
  width: 100%;
  margin-top: 0.5rem;
  padding: 1.25rem 3rem;
  font-size: 1.4rem;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.btn {
  font-weight: 500;

  svg {
    margin-right: 0.75rem;
  }
}

.security-note {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  color: #718096;
  text-align: center;

  svg {
    flex-shrink: 0;
  }
}
</style>
