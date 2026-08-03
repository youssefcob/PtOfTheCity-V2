<template>
  <div class="hero__wrapper">
    <section class="hero">
      <div class="hero__bg" />

      <!-- <div class="hero__top-badge">
        <span>Member Exclusive Offer</span>
      </div> -->

      <div class="hero__inner">
        <!-- Left column -->
        <div class="hero__left">
          <div class="hero__logos">
            <!-- <img src="/images/ptofthecityLogoWhite.png" alt="PT of the City" class="logo-ptc" />
          <div class="logo-divider" /> -->
            <img src="/images/beyondmedlogo.png" alt="Beyond Med" class="logo-bm" />
          </div>
          <div class="hero__content">
            <p class="italic"><span>Exclusive </span> <span class="cta">Offer for</span></p>
            <h1 class="hero__heading">
              Beyond Med Members
            </h1>

            <p class="hero__sub">
              Your wellness journey just got more affordable. Benefit from exclusive member-only
              pricing and top-tier physical therapy at any of our convenient PT of The City locations.
            </p>

            <div class="hero__discounts">
              <div class="discount-item">
                <span class="discount-pct">20% Off</span>
                <span class="discount-label">5-Session Package</span>
              </div>
              <div class="discount-item">
                <span class="discount-pct">25% Off</span>
                <span class="discount-label">10-Session Package</span>
              </div>
            </div>
          </div>
          <div class="hero__footer">
            <p class="hero__trusted">Trusted by members across the United States</p>

            <div class="hero__badges">
              <div class="trust-badge">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                HIPAA Compliant
              </div>
              <div class="trust-badge">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                Board Certified Providers
              </div>
              <div class="trust-badge">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Verified Network
              </div>
            </div>
          </div>
        </div>
        <!-- Right column: booking card -->
        <div class="hero__card">
          <div class="card__header">
            <div class="card__icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <div>
              <p class="card__title">Book Your Session</p>
              <p class="card__subtitle">Members get exclusive pricing instantly</p>
            </div>
          </div>

          <form class="card__form" @submit.prevent="submitForm">
            <div class="field">
              <label>FULL NAME</label>
              <input v-model="form.name" type="text" placeholder="Your full name" required />
            </div>

            <div class="field">
              <label>EMAIL ADDRESS</label>
              <input v-model="form.email" type="email" placeholder="you@email.com" />
            </div>

            <div class="field-row">
              <div class="field">
                <label>PHONE NUMBER</label>
                <input v-model="form.phone" type="tel" placeholder="" required />
              </div>
              <div class="field">
                <label>DATE OF BIRTH</label>
                <input v-model="form.dob" type="date" required />
              </div>
            </div>

            <div class="field-row">
              <div class="field">
                <label>SERVICE</label>
                <select v-model="form.service" required>
                  <option value="" disabled>Select Service</option>
                  <option>Physical Therapy</option>
                  <option>Sports Rehabilitation</option>
                  <option>Manual Therapy</option>
                  <option>Pelvic Floor Rehabilitation</option>
                  <option>Lymphedema Treatment</option>
                  <option>Cupping Treatment</option>
                  <option>Orthopedic Rehabilitation</option>
                  <option>Vestibular Rehabilitation</option>
                </select>
              </div>
              <div class="field">
                <label>YOUR ZIP CODE</label>
                <input v-model="form.zipCode" type="text" placeholder="Enter your zip code" required />
              </div>
            </div>

            <div class="field-row">
              <div class="field">
                <label>PACKAGE</label>
                <select v-model="form.package" required>
                  <option value="" disabled>Select a Package</option>
                  <option>5-Session Package</option>
                  <option>10-Session Package</option>
                </select>
              </div>
              <div class="field">
                <label>PREFERRED DATE</label>
                <input v-model="form.date" type="date" required />
              </div>
            </div>

            <!-- <div class="field">
              <label>COVERAGE TYPE</label>
              <div class="coverage-toggle">
                <button type="button" :class="['coverage-option', { active: form.coverage === 'in-network' }]" @click="form.coverage = 'in-network'">
                  <span class="coverage-radio" />
                  In-Network
                </button>
                <button type="button" :class="['coverage-option', { active: form.coverage === 'self-pay' }]" @click="form.coverage = 'self-pay'">
                  <span class="coverage-radio" />
                  Self-Pay
                </button>
              </div>
            </div>

            <template v-if="form.coverage === 'in-network'">
              <div class="field">
                <label>INSURANCE CARRIER</label>
                <select v-model="form.insuranceCarrier" required>
                  <option value="" disabled>Select your carrier</option>
                  <option v-for="carrier in insuranceCarriers" :key="carrier" :value="carrier">{{ carrier }}</option>
                </select>
              </div>
              <div class="field">
                <label>MEMBER ID</label>
                <input v-model="form.memberId" type="text" placeholder="Your member ID" required />
              </div>
            </template> -->

            <button type="submit" class="btn cta">Book Your Session →</button>
            <p class="card__footer card__footer--coverage">
              Have questions about other coverage sources? We can point you in the right direction.
              Contact us on <a href="tel:+7186480888">(718) 648-0888</a>
            </p>

            <p class="card__footer">
              ✓ No payment required to reserve &nbsp;·&nbsp;<br />Free cancellation 24h before
            </p>


          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
useHead({
  link: [{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Fasthand&display=swap' }]
})

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
  package: '',
  date: '',
  zipCode: '',
  coverage: 'self-pay',
  insuranceCarrier: '',
  memberId: '',
});

const isLoading = ref(false);
const submitted = ref(false);
const toast = useToast();

async function submitForm() {
  isLoading.value = true;
  try {
    const payload: Record<string, unknown> = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      dob: form.dob,
      service: form.service,
      package: form.package,
      preferred_date: form.date,
      zip_code: form.zipCode,
      coverage: 'self-pay',
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
.hero__wrapper {
  width: 100%;
  min-height: 100vh;
  background: #fff;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 1rem 2rem;
  box-sizing: border-box;
}

.hero {
  position: relative;
  width: 100%;
  height: fit-content;
  min-height: calc(100vh - 2rem);
  border-radius: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  font-family: $montserrat;
}

.hero__bg {
  position: absolute;
  inset: 0;
  background: url('https://res.cloudinary.com/dzilc11zf/image/upload/f_auto,q_auto/v1778178304/portrait-teenage-friends-smiling_ahrfiq.png') center / cover no-repeat;
  z-index: 0;
  background-position: 0 100%;

  @media screen and (max-width: 1000px) {
    background-position: center;
    background-size: cover;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, rgba(30, 20, 35, 0.82) 40%, rgba(180, 120, 140, 0.55) 100%);
  }
}

.hero__top-badge {
  position: relative;
  z-index: 1;
  margin-top: 2.5rem;

  span {
    display: inline-block;
    border: 1.5px solid $cta;
    color: black;
    font-size: 1.25rem;
    font-weight: 500;
    border-radius: 999px;
    padding: 0.5rem 1.75rem;
    letter-spacing: 0.02em;
    background: $cta;
  }
}

.hero__inner {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 4rem;
  width: 100%;
  max-width: 1280px;
  padding: 4rem 5rem;
  height: 85vh;

  @media (max-width: 1000px) {
    flex-direction: column;
    padding: 3rem 2rem;
    align-items: stretch;
  }
}

/* ── Left column ── */
.hero__left {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  color: #fff;
  justify-content: space-between;
  height: 100%;

}

.hero__logos {
  display: flex;
  align-items: center;
  gap: 1.25rem;

  .logo-ptc {
    height: 52px;
  }

  .logo-bm {
    height: 56px;
  }
}

.logo-divider {
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.4);
}

.italic {
  font-style: normal;

  >span {
    color: $white;
    font-family: 'Fasthand', cursive;
    font-weight: 400;
    font-size: clamp(4rem, 3vw, 5rem);

  }

  .cta {
    background-color: transparent;
    color: $cta;
  }
}

.hero__heading {
  font-family: $helvetica;
  font-size: clamp(2.7rem, 3vw, 5rem);
  font-weight: 700;
  line-height: 1.05;
  color: #fff;
  margin: 0;
}

.hero__sub {
  font-size: 1.45rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.85);
  max-width: 48ch;
  margin: 0;
}

.hero__discounts {
  display: flex;
  gap: 3rem;

  .discount-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .discount-pct {
    font-size: 2.4rem;
    font-weight: 700;
    color: #fff;
  }

  .discount-label {
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.7);
  }
}

.hero__content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.hero__footer {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.hero__trusted {
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.75);
  margin: 0;
  line-height: 1;
}

.hero__badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
}

.trust-badge {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 999px;
  padding: 0.55rem 1.25rem;
  font-size: 1.2rem;
  color: #fff;
  backdrop-filter: blur(4px);
  background: rgba(255, 255, 255, 0.08);
}

/* ── Booking card ── */
.hero__card {
  width: 100%;
  max-width: 460px;
  background: #fff;
  border-radius: 1.25rem;
  padding: 1.75rem 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.18);
  flex-shrink: 0;
}

.card__header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.card__icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: lighten($cta, 45%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: $cta;
  flex-shrink: 0;
}

.card__title {
  font-size: 1.4rem;
  font-weight: 500;
  color: #1a2b2b;
  margin: 0;
  line-height: 1.2;
}

.card__subtitle {
  font-size: 1rem;
  color: #7a8c8c;
  margin: 0.25rem 0 0;
  line-height: 1;
}

.card__form {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  label {
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    color: #6b7a7a;
  }

  input,
  select {
    border: 1px solid #dde5e5;
    border-radius: 0.65rem;
    height: 3.2rem;
    padding: 0.5rem 0.85rem;
    font-size: 1.1rem;
    color: #1a2b2b;
    outline: none;
    background: #fff;
    width: 100%;
    font-family: $montserrat;
    background-color: #7575751A;

    &::placeholder {
      color: #bcc8c8;
    }

    &:focus {
      border-color: $cta;
    }
  }

  select {
    appearance: auto;
    cursor: pointer;
  }

  input[type="date"] {
    cursor: pointer;
  }
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
  padding: 0.65rem 1rem;
  font-size: 1.1rem;
  font-family: $montserrat;
  font-weight: 500;
  color: #6b7a7a;
  background: #7575751A;
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

.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.card__cta {
  background: $cta;
  color: #fff;
  border: none;
  border-radius: 0.75rem;
  height: 3.5rem;
  font-size: 1.4rem;
  font-weight: 700;
  cursor: pointer;
  font-family: $montserrat;
  transition: background 0.2s;

  &:hover {
    background: darken($cta, 8%);
  }
}

.card__footer {
  text-align: center;
  font-size: 0.95rem;
  color: #7a8c8c;
  margin: 0;
  line-height: 1;

  &--coverage {
    line-height: 1.5;

    a {
      color: $cta;
      text-decoration: none;
      font-weight: 600;
      white-space: nowrap;
    }
  }
}

@media screen and (max-width: 1000px) {
  .hero__inner {
    flex-direction: column;
    padding: 3rem 2rem;
    align-items: stretch;
    height: auto;
  }

  .field {
    label {
      font-size: 1rem;
    }

    input,
    select {
      height: 4.4rem;
      font-size: 1.4rem;
      padding: 0.75rem 1.1rem;
    }
  }

  .coverage-option {
    font-size: 1.25rem;
    padding: 0.85rem 1rem;
  }

  .field-row {
    grid-template-columns: 1fr;
  }



  .logo-bm {
    width: 100%;
  }

  .hero__left {
    height: auto;
  }

  .hero__card {
    max-width: none;
  }

  .hero__wrapper {
    padding: 0;
    height: auto;
    min-height: unset;

    .hero {
      border-radius: 0;
      min-height: unset;
      height: auto;
    }
  }
}
</style>
