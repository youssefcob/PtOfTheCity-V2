<template>
  <section class="booking-success-page">
    <div class="success-shell">
      <div class="success-badge">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8" />
          <path
            d="M8 12.5l2.7 2.7L16.5 9.5"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>

      <p class="eyebrow">Request Received</p>
      <h1>Your telehealth booking request is in.</h1>
      <p class="lead">
        A member of our team will review your details and reach out shortly to
        confirm your appointment and send your secure meeting information.
      </p>

      <div class="success-card">
        <h2>What Happens Next?</h2>
        <p>
          We’ll contact you using the phone number or email you provided,
          confirm the appointment details, and help you get ready for your
          virtual visit.
        </p>
      </div>

      <div class="success-card alt">
        <h2>Need Immediate Help?</h2>
        <p>
          If you need help right away, call us at
          <a href="tel:7186480888">718-648-0888</a>.
        </p>
      </div>

      <div class="success-actions">
        <NuxtLink to="/telehealth" class="btn cta">Back to Telehealth</NuxtLink>
        <NuxtLink to="/" class="btn transparent">Go to Homepage</NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.booking-success-page {
  @include pagePadding;
  min-height: calc(100vh - 10rem);
  padding-top: calc($navbarHeight + 4rem);
  padding-bottom: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}

.success-shell {
  width: min(100%, 56rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.25rem;
  padding: 3rem 2rem;
  border-radius: 2rem;
  background:
    radial-gradient(circle at top, rgba(56, 215, 191, 0.18), transparent 42%),
    #f8fffd;
  border: 1px solid rgba(56, 215, 191, 0.28);
  box-shadow: 0 24px 60px rgba(16, 53, 53, 0.08);
}

.success-badge {
  width: 4.5rem;
  height: 4.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: rgba(56, 215, 191, 0.16);
  color: #048e73;

  svg {
    width: 2.4rem;
    height: 2.4rem;
  }
}

.eyebrow {
  color: #048e73;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

h1 {
  max-width: 38rem;
  color: #103535;
  font-size: clamp(2.5rem, 4vw, 4rem);
  line-height: 1.05;
}

.lead {
  max-width: 41rem;
  color: #18383f;
  font-size: 1.15rem;
  line-height: 1.75;
}

.success-card {
  width: 100%;
  padding: 1.4rem 1.5rem;
  border-radius: 1.35rem;
  background: #ffffff;
  border: 1px solid rgba(56, 215, 191, 0.24);

  h2 {
    color: #103535;
    font-size: 1.35rem;
    margin-bottom: 0.55rem;
  }

  p {
    color: #18383f;
    line-height: 1.7;
  }

  a {
    color: #048e73;
    text-decoration: underline;
    text-underline-offset: 0.14rem;
  }
}

.success-card.alt {
  background: #dff7f2;
}

.success-actions {
  width: 100%;
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;

  .btn {
    flex: 1;
  }
}

@media screen and (max-width: 700px) {
  .booking-success-page {
    padding-top: calc($navbarHeight + 2rem);
  }

  .success-shell {
    padding: 2rem 1rem;
  }

  .success-actions {
    flex-direction: column;
  }
}
</style>
