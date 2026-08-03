<template>
  <section class="bm-footer">
    <div class="bm-footer__left">
      <h2 class="bm-footer__heading">Ready to claim your member discount?</h2>
      <p class="bm-footer__sub">
        Your Beyond Med membership is your key to exclusive pricing. Reserve your
        sessions in under 2 minutes — no payment required today.
      </p>
      <ul class="bm-footer__perks">
        <li v-for="perk in perks" :key="perk">{{ perk }}</li>
      </ul>
    </div>

    <div class="bm-footer__card">
      <form @submit.prevent="submitForm">
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

        <button type="submit" class="bm-footer__cta">Book Your Session →</button>

        <p class="bm-footer__disclaimer">
          ✓ No payment required to reserve &nbsp;·&nbsp;<br />Free cancellation 24h before
        </p>

        <p class="bm-footer__disclaimer bm-footer__disclaimer--coverage">
          Have questions about other coverage sources? We can point you in the right direction.
          Contact us on <a href="tel:+7186480888">(718) 648-0888</a>
        </p>
      </form>
    </div>
  </section>
</template>

<script lang="ts" setup>
const perks = [
  'Instant member verification',
  'Free cancellation 48 hours before',
  'Discount applied automatically at checkout',
  'HIPAA-compliant booking process',
];

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
.bm-footer {
  background: #0d3d2e;
  padding: 7rem 10rem 7rem 10rem;
  font-family: $montserrat;
  display: flex;
  align-items: center;
  gap: 4rem;

  @media (max-width: 1000px) {
    flex-direction: column;
    padding: 4rem 2rem;
    gap: 3rem;
  }
}

/* ── Left ── */
.bm-footer__left {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.bm-footer__heading {
  font-family: $helvetica;
  font-size: clamp(3.5rem, 4.5vw, 6rem);
  font-weight: 400;
  color: #fff;
  line-height: 1.1;
  margin: 0;
}

.bm-footer__sub {
  font-size: 1.4rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

.bm-footer__perks {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;

  li {
    font-size: 1.3rem;
    color: rgba(255, 255, 255, 0.85);
    padding-left: 1.75rem;
    position: relative;
    margin: 0;
    line-height: 1.4;

    &::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: $cta;
      font-weight: 700;
    }
  }
}

/* ── Card ── */
.bm-footer__card {
  flex-shrink: 0;
  width: 100%;
  max-width: 560px;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 1.25rem;
  padding: 2.5rem 2.25rem;
  display: flex;
  flex-direction: column;

  form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  label {
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.55);
  }

  input, select {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 0.65rem;
    height: 3.25rem;
    padding: 0 1rem;
    font-size: 1.3rem;
    color: #fff;
    outline: none;
    width: 100%;
    font-family: $montserrat;

    &::placeholder { color: rgba(255, 255, 255, 0.35); }
    &:focus { border-color: rgba(255, 255, 255, 0.4); }

    option { background: #0d3d2e; color: #fff; }
  }
}

.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.coverage-toggle {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-radius: 0.65rem;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.15);
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
  color: rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.08);
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

.bm-footer__cta {
  background: #fff;
  color: #0d3d2e;
  border: none;
  border-radius: 0.75rem;
  height: 3.5rem;
  font-size: 1.4rem;
  font-weight: 700;
  font-family: $montserrat;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 0.5rem;

  &:hover { background: rgba(255, 255, 255, 0.9); }
}

.bm-footer__disclaimer {
  text-align: center;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.45);
  margin: 0;
  line-height: 1.5;

  &--coverage {
    color: rgba(255, 255, 255, 0.55);
    a {
      color: $cta;
      text-decoration: none;
      font-weight: 600;
      white-space: nowrap;
    }
  }
}
</style>
