<template>
  <section class="insurance">
    <div class="insurance__header">
      <p class="bm-eyebrow">Insurance &amp; Coverage</p>
      <h2 class="bm-heading">We work with your insurance</h2>
    </div>

    <div class="insurance__body">
      <div class="insurance__left">
        <p class="bm-sub">
          Your Beyond Med discount is applied on top of your eligible insurance coverage.
          PT of The City works with leading providers to help reduce your out-of-pocket
          costs as much as possible.
        </p>

        <div class="insurance__note insurance__note--desktop">
          <p class="note__title">Not sure if your plan qualifies?</p>
          <p class="note__body">
            Our member eligibility team will verify your insurance within 24 hours of
            booking. No forms to fill — just book and we handle the rest.
          </p>
        </div>

        <NuxtLink to="/insurances" class="insurance__cta insurance__cta--desktop">Check My Eligibility</NuxtLink>
      </div>

      <div class="insurance__right">
        <div class="providers__grid">
          <div v-for="provider in providers" :key="provider" class="provider-card">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#c0caca" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="5" width="20" height="14" rx="2"/>
              <line x1="2" y1="10" x2="22" y2="10"/>
              <line x1="12" y1="14" x2="12" y2="18" stroke="#e05555"/>
              <line x1="10" y1="16" x2="14" y2="16" stroke="#e05555"/>
            </svg>
            <span class="provider-card__name">{{ provider }}</span>
          </div>
        </div>

        <div class="insurance__disclaimer">
          Beyond Med discounts are applied automatically and can be combined with your
          insurance where applicable — no codes or extra steps required.
        </div>

        <div class="insurance__note insurance__note--mobile">
          <p class="note__title">Not sure if your plan qualifies?</p>
          <p class="note__body">
            Our member eligibility team will verify your insurance within 24 hours of
            booking. No forms to fill — just book and we handle the rest.
          </p>
        </div>

        <NuxtLink to="/eligibility" class="insurance__cta insurance__cta--mobile">Check My Eligibility</NuxtLink>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const providers = [
  'Blue Cross Blue Shield',
  'Aetna',
  'UnitedHealth',
  'Cigna',
  'Humana',
  'Medicare & more',
];
</script>

<style lang="scss" scoped>
.insurance {
  background: #f0f2f2;
  padding: 7rem 10rem;
  font-family: $montserrat;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media (max-width: 1000px) {
    padding: 4rem 2rem;
    gap: 2rem;
  }
}

.insurance__header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.insurance__body {
  display: flex;
  align-items: stretch;
  gap: 6rem;

  @media (max-width: 1000px) {
    flex-direction: column;
    gap: 3rem;
  }
}

/* ── Left ── */
.insurance__left {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.insurance__note {
  background: rgba($cta, 0.12);
  border-radius: 0.85rem;
  padding: 1.5rem 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  .note__title {
    font-size: 1.3rem;
    font-weight: 700;
    color: #1a2b2b;
    margin: 0;
    line-height: 1;
  }

  .note__body {
    font-size: 1.25rem;
    line-height: 1.6;
    color: #4a5a5a;
    margin: 0;
  }
}

.insurance__note--mobile {
  display: none;
}

.insurance__cta {
  background: $cta;
  color: black;
  border: none;
  border-radius: 0.75rem;
  padding: 1.2rem;
  font-size: 1.35rem;
  font-weight: 500;
  font-family: $montserrat;
  cursor: pointer;
  transition: background 0.2s;
  width: 100%;
  margin-top: auto;
  text-align: center;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover { background: darken($cta, 8%); }

  &--mobile {
    display: none;
  }

  @media (max-width: 1000px) {
    &--desktop {
      display: none;
    }
  }
}

.insurance__note {
  @media (max-width: 1000px) {
    &--desktop { display: none; }
    &--mobile  { display: flex; }
  }
}

@media (max-width: 1000px) {
  .insurance__cta--mobile {
    display: flex;
  }
}

/* ── Right ── */
.insurance__right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.providers__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;

  @media (max-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.provider-card {
  background: #fff;
  border-radius: 1rem;
  padding: 1.75rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.9rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.provider-card__name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1a2b2b;
  text-align: center;
  line-height: 1.3;
}

.insurance__disclaimer {
  background: rgba($cta, 0.12);
  border-radius: 0.85rem;
  padding: 1.25rem 1.5rem;
  font-size: 1.25rem;
  line-height: 1.6;
  color: #2a3a3a;
}
</style>
