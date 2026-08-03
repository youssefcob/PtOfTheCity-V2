<template>
  <div class="booking-page">

    <!-- ── Sidebar ── -->
    <aside class="sidebar">
      <p class="bm-eyebrow">Member Pricing</p>
      <h1 class="sidebar__heading">Reserve your sessions</h1>
      <p class="sidebar__sub">
        You're one step away from locking in your exclusive Beyond Med member discount.
        Fill in your details and we'll confirm within 24 hours.
      </p>

      <img
        src="https://res.cloudinary.com/dzilc11zf/image/upload/v1778151422/senior-couple-with-smartphone-garden_wzz86v.webp"
        alt="Beyond Med members" class="sidebar__img" />

      <div class="sidebar__packages">
        <div class="pkg-card">
          <div class="pkg-card__badge">20%</div>
          <div>
            <p class="pkg-card__title">5-Session Package</p>
            <p class="pkg-card__sub">Flexible — use within 6 months</p>
          </div>
        </div>
        <div class="pkg-card">
          <div class="pkg-card__badge">25%</div>
          <div>
            <p class="pkg-card__title">10-Session Package</p>
            <p class="pkg-card__sub">Best value — use within 12 months</p>
          </div>
        </div>
      </div>

      <ul class="sidebar__trust">
        <li v-for="item in trustItems" :key="item">{{ item }}</li>
      </ul>

      <div class="sidebar__help">
        <p class="help__title">Need help?</p>
        <a class="help__row" href="tel:+7186480888">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path
              d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          (718) 648-0888
        </a>
        <a class="help__row" href="mailto:info@beyondmedplans.com">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          info@ptofthecity.com
        </a>
        <span class="help__row help__hours">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          Mon–Fri, 9am – 5pm ET
        </span>
      </div>
    </aside>

    <!-- ── Form card ── -->
    <div class="form-card">
      <div class="form-card__header">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <div>
          <p class="form-card__title">Book your session</p>
          <p class="form-card__subtitle">Complete the form below — we'll contact you within 30 minutes within our
            working hours</p>
        </div>
      </div>

      <form class="form-card__body" @submit.prevent="submitForm">

        <!-- Personal Information -->
        <fieldset>
          <legend>Personal Information</legend>
          <div class="field-row">
            <div class="field">
              <label>Full Name <span class="req">*</span></label>
              <input v-model="form.name" type="text" placeholder="Your full name" required />
            </div>
            <div class="field">
              <label>Date of Birth</label>
              <input v-model="form.dob" type="date" />
            </div>
          </div>
          <div class="field-row">
            <div class="field">
              <label>Email Address</label>
              <input v-model="form.email" type="email" placeholder="you@email.com" />
            </div>
            <div class="field">
              <label>Phone Number <span class="req">*</span></label>
              <input v-model="form.phone" type="tel" placeholder="+1 (305) 000-0000" required />
            </div>
          </div>
        </fieldset>

        <hr class="form-divider" />

        <!-- Service -->
        <fieldset>
          <legend>Select a Service <span class="req">*</span></legend>
          <div class="field">
            <select v-model="form.service" required>
              <option value="" disabled>Choose a specialty...</option>
              <option>Physical Therapy</option>
              <option>Sports Rehabilitation</option>
              <option>Orthopedic Rehabilitation</option>
              <option>Neurological Rehabilitation</option>
              <option>Pediatric Rehabilitation</option>
              <option>Hand Therapy</option>
              <option>Pelvic Floor Rehabilitation</option>
              <option>Lymphedema Treatment</option>
              <option>Cupping Treatment</option>
              <option>Vestibular Rehabilitation</option>
            </select>
          </div>
        </fieldset>

        <!-- Package -->
        <fieldset>
          <legend>Choose Your Package <span class="req">*</span></legend>
          <div class="pkg-options">
            <div class="pkg-option" :class="{ 'pkg-option--active': form.package === '5' }" @click="form.package = '5'">
              <svg v-if="form.package === '5'" class="pkg-check" xmlns="http://www.w3.org/2000/svg" width="16"
                height="16" viewBox="0 0 24 24" fill="$cta" stroke="white" stroke-width="3">
                <circle cx="12" cy="12" r="10" fill="#2ac0d4" />
                <polyline points="9 12 11 14 15 10" stroke="white" stroke-width="2.5" fill="none" />
              </svg>
              <p class="pkg-option__pct">20%</p>
              <p class="pkg-option__sessions">5 Sessions</p>
              <p class="pkg-option__validity">6-month validity</p>
            </div>
            <div class="pkg-option" :class="{ 'pkg-option--active': form.package === '10' }"
              @click="form.package = '10'">
              <svg v-if="form.package === '10'" class="pkg-check" xmlns="http://www.w3.org/2000/svg" width="16"
                height="16" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="#2ac0d4" />
                <polyline points="9 12 11 14 15 10" stroke="white" stroke-width="2.5" fill="none" />
              </svg>
              <p class="pkg-option__pct">25%</p>
              <p class="pkg-option__sessions">10 Sessions</p>
              <p class="pkg-option__validity">Best value · 12 mo</p>
            </div>
          </div>
        </fieldset>

        <hr class="form-divider" />

        <!-- Date + Zip -->
        <div class="field-row">
          <div class="field">
            <label>Preferred Date <span class="req">*</span></label>
            <input v-model="form.date" type="date" required />
          </div>
          <div class="field">
            <label>Zip Code <span class="req">*</span></label>
            <input v-model="form.zipCode" type="text" placeholder="Enter your zip code" required />
          </div>
        </div>

        <!-- <hr class="form-divider" />

        Coverage
        <div class="field">
          <label>Coverage Type</label>
          <div class="coverage-toggle">
            <button type="button" :class="['coverage-option', { active: form.coverage === 'in-network' }]"
              @click="form.coverage = 'in-network'">
              <span class="coverage-radio" />
              In-Network
            </button>
            <button type="button" :class="['coverage-option', { active: form.coverage === 'self-pay' }]"
              @click="form.coverage = 'self-pay'">
              <span class="coverage-radio" />
              Self-Pay
            </button>
          </div>
        </div>
        <template v-if="form.coverage === 'in-network'">
          <div class="field">
            <label>Insurance Carrier <span class="req">*</span></label>
            <select v-model="form.insuranceCarrier" required>
              <option value="" disabled>Select your carrier</option>
              <option v-for="carrier in insuranceCarriers" :key="carrier" :value="carrier">{{ carrier }}</option>
            </select>
          </div>
          <div class="field">
            <label>Member ID <span class="req">*</span></label>
            <input v-model="form.memberId" type="text" placeholder="Your member ID" required />
          </div>
        </template> -->

        <!-- Notes -->
        <fieldset>
          <legend>Additional Notes or Requests</legend>
          <div class="field">
            <textarea v-model="form.notes" rows="4"
              placeholder="Any specific concerns, health history notes, or requests for your provider..." />
          </div>
        </fieldset>

        <button type="submit" class="form-card__cta">Book My Session →</button>

        <p class="form-card__coverage-note">
          Have questions about other coverage sources? We can point you in the right direction.
          Contact us on <a href="tel:+7186480888">(718) 648-0888</a>
        </p>

        <div class="form-card__badges">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            HIPAA compliant
          </span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            Confirmation within 24h
          </span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Free cancellation
          </span>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
const trustItems = [
  'No payment required today',
  'Instant member ID verification',
  'Free cancellation 24h before appointment',
  'HIPAA-compliant — your data is secure',
  'Board-certified providers only',
];

const route = useRoute();
const packageMap: Record<string, string> = {
  '5-Session Package': '5',
  '10-Session Package': '10',
};

// const { data: insuranceNamesRaw } = await useFetch<{ id: number; title: string }[]>(
//   `${useUrl()}/images/insurance/names`,
// );
// const insuranceCarriers = computed(() => insuranceNamesRaw.value?.map((i) => i.title) || []);

const form = reactive({
  name: '',
  email: '',
  phone: '',
  dob: '',
  service: '',
  package: packageMap[route.query.package as string] ?? '5',
  date: '',
  zipCode: '',
  coverage: 'self-pay',
  insuranceCarrier: '',
  memberId: '',
  notes: '',
});

const isLoading = ref(false);
const submitted = ref(false);
const toast = useToast();

async function submitForm() {
  isLoading.value = true;
  try {
    const packageLabel = form.package === '5' ? '5-Session Package' : '10-Session Package';
    const payload: Record<string, unknown> = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      dob: form.dob,
      service: form.service,
      package: packageLabel,
      preferred_date: form.date,
      zip_code: form.zipCode,
      coverage: 'self-pay',
      notes: form.notes,
    };
    await $fetch(`${useUrl()}/beyondmed/book`, { method: 'POST', body: payload });
    submitted.value = true;
    toast.success({ title: 'Booked!', message: 'We received your request and will be in touch shortly.' });
  } catch {
    toast.error({ title: 'Error!', message: 'Something went wrong. Please try again.' });
  } finally {
    isLoading.value = false;
  }
}
</script>

<style lang="scss" scoped>
.booking-page {
  min-height: 100vh;
  background: #f0f2f2;
  display: flex;
  gap: 2.5rem;
  padding: 4rem 6rem;
  font-family: $montserrat;
  align-items: flex-start;

  @media (max-width: 1000px) {
    flex-direction: column;
    padding: 2rem 1.5rem;
  }
}

/* ══ Sidebar ══ */
.sidebar {
  width: 530px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;

  @media (max-width: 1000px) {
    width: 100%;
  }
}

.sidebar__heading {
  font-family: $helvetica;
  font-size: clamp(2.4rem, 2vw, 4rem);
  font-weight: 400;
  color: #1a2b2b;
  margin: 0;
  line-height: 1.1;
}

.sidebar__sub {
  font-size: 1.3rem;
  line-height: 1.65;
  color: #4a5a5a;
  margin: 0;
}

.sidebar__img {
  width: 100%;
  border-radius: 1rem;
  object-fit: cover;
  aspect-ratio: 4 / 3;
}

.sidebar__packages {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.pkg-card {
  background: #F7FAF9;
  border: 1px solid #e0eae6;
  border-radius: 0.85rem;
  padding: 2rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  &__badge {
    background: #E1F5EE;
    border: 1px solid #9FE1CB;
    color: #085041;
    font-family: $helvetica;
    font-size: 2.6rem;
    font-weight: 400;
    border-radius: 0.5rem;
    padding: 0.5rem 0.75rem;
    flex-shrink: 0;
  }

  &__title {
    font-size: 1.8rem;
    font-weight: 600;
    color: #1a2b2b;
    margin: 0;
    line-height: 1;
  }

  &__sub {
    font-size: 1.2rem;
    color: #6a7a7a;
    margin: 0.25rem 0 0;
    line-height: 1;
  }
}

.sidebar__trust {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;

  li {
    font-size: 1.25rem;
    color: #2a3a3a;
    padding-left: 1.75rem;
    position: relative;
    margin: 0;
    font-weight: 400;
    line-height: 1.4;

    &::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: #085041;
      font-weight: 700;
    }
  }
}

.sidebar__help {
  background: #fff;
  border: 1px solid #e0eae6;
  border-radius: 0.85rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: .7rem;

  .help__title {
    font-size: 1.3rem;
    font-weight: 700;
    color: #1a2b2b;
    margin: 0 0 0.25rem;
    line-height: 1;
    margin-bottom: .75rem;
  }

  .help__row {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 1.2rem;
    color: #0F6E56;
    text-decoration: none;
    line-height: 1;

    &.help__hours {
      color: #6a7a7a;
    }
  }
}

/* ══ Form card ══ */
.form-card {
  flex: 1;
  background: #fff;
  border-radius: 1.25rem;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.07);
}

.form-card__header {
  background: #0d3d2e;
  padding: 1.75rem 2.25rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  color: #fff;

  svg {
    flex-shrink: 0;
    margin-top: 0.2rem;
  }

  .form-card__title {
    font-size: 1.6rem;
    font-weight: 700;
    color: #fff;
    margin: 0;
    line-height: 1.2;
  }

  .form-card__subtitle {
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.65);
    margin: 0.3rem 0 0;
    line-height: 1.3;
  }
}

.form-card__body {
  padding: 2.25rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

fieldset {
  border: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  legend {
    font-size: 1.1rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #4a5a5a;
    margin-bottom: 0.25rem;
    padding: 0;
    float: left;
    width: 100%;
  }
}

.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  align-items: end;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  label {
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #6a7a7a;
  }

  input,
  select,
  textarea {
    border: 1px solid #dde5e5;
    border-radius: 0.65rem;
    height: 4.2rem;
    padding: 0 1.25rem;
    font-size: 1.3rem;
    color: #1a2b2b;
    outline: none;
    background: #F7FAF9;
    width: 100%;
    font-family: $montserrat;
    box-sizing: border-box;

    &::placeholder {
      color: #8fa5a5;
    }

    &:focus {
      border-color: $cta;
    }
  }

  textarea {
    height: auto;
    padding: 1rem 1.25rem;
    resize: vertical;
    line-height: 1.6;
  }

  select {
    appearance: auto;
    cursor: pointer;
  }

  input[type="date"] {
    cursor: pointer;
  }
}

.req {
  color: $cta;
}

/* Package options */
.pkg-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.pkg-option {
  border: 1.5px solid #dde5e5;
  border-radius: 0.85rem;
  padding: 1.25rem 1.25rem 1.25rem;
  cursor: pointer;
  position: relative;
  transition: border-color 0.15s, background 0.15s;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background: #F7FAF9;

  &--active {
    border-color: #1D9E75;
    border-width: 2px;
    background: #fff;
  }

  &__pct {
    font-family: $helvetica;
    font-size: 2.8rem;
    font-weight: 400;
    color: #1A2E28;
    margin: 0;
    line-height: 1;
  }

  &__sessions {
    font-size: 1.2rem;
    font-weight: 600;
    color: #6B8A7E;
    margin: 0.3rem 0 0;
    line-height: 1;
  }

  &__validity {
    font-size: 1.1rem;
    color: #085041;
    font-weight: 700;
    margin: 0.25rem 0 0;
    line-height: 1;
    background-color: #E1F5EE;
    border-radius: 2rem;
    padding: 0.4rem 0.6rem;
    width: fit-content;
  }
}

.pkg-check {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
}

.form-divider {
  border: none;
  border-top: 1px solid #e8efef;
  margin: 0;
}

.coverage-toggle {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-radius: 0.65rem;
  overflow: hidden;
  border: 1px solid #dde5e5;
}

.coverage-option {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1.5rem 1rem;
  font-size: 1.2rem;
  font-family: $montserrat;
  font-weight: 500;
  color: #6b7a7a;
  background: #f5f7f7;
  border: none;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;

  &.active {
    background: $cta;
    color: #fff;

    .coverage-radio::after {
      opacity: 1;
    }
  }
}

.coverage-radio {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid currentColor;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &::after {
    content: '';
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: currentColor;
    opacity: 0;
    transition: opacity 0.2s;
  }
}

/* CTA + badges */
.form-card__cta {
  background: $cta;
  color: $black;
  border: none;
  border-radius: 0.75rem;
  height: 5rem;
  font-size: 1.5rem;
  font-weight: 700;
  font-family: $montserrat;
  cursor: pointer;
  transition: background 0.2s;
  width: 100%;

  &:hover {
    background: darken($cta, 8%);
  }
}

.form-card__coverage-note {
  text-align: center;
  font-size: 1.1rem;
  color: #7a8c8c;
  margin: 0;
  line-height: 1.55;

  a {
    color: $cta;
    text-decoration: none;
    font-weight: 600;
    white-space: nowrap;
  }
}

.form-card__badges {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;

  span {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 1.1rem;
    color: #6a7a7a;
  }
}
</style>
