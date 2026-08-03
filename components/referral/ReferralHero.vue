<template>
  <div class="hero">
    <img :src="useImg('https://res.cloudinary.com/dzilc11zf/image/upload/v1778003573/referal_qz1rti.webp')" class="hero-img" alt="" />
    <div class="hero-overlay">
      <div class="hero-text">
        <h1>Refer your patient</h1>
        <h1>in <span class="highlight">under 2 minutes</span></h1>
        <p>Streamlined, HIPAA-compliant referrals for NYC's #1 physical therapy network.<br />We'll schedule your patient within 24 hours.</p>
      </div>

      <!-- Mobile-only trust items -->
      <div class="mobile-trust">
        <div class="mobile-trust-item">
          <span class="trust-icon"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></span>
          HIPAA-compliant &amp; encrypted
        </div>
        <div class="mobile-trust-item">
          <span class="trust-icon"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span>
          24-hour scheduling guarantee
        </div>
        <div class="mobile-trust-item">
          <span class="trust-icon"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
          50+ insurance plans accepted
        </div>
      </div>
    </div>

    <!-- Desktop-only trust bar -->
    <div class="trust-bar">
      <div class="trust-item">
        <span class="trust-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></span>
        HIPAA-compliant &amp; encrypted
      </div>
      <span class="trust-divider" />
      <div class="trust-item">
        <span class="trust-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span>
        24-hour scheduling guarantee
      </div>
      <span class="trust-divider" />
      <div class="trust-item">
        <span class="trust-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
        50+ insurance plans accepted
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.hero {
  position: relative;
  width: 100%;

  @media screen and (max-width: 700px) {
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.2) 100%);
      pointer-events: none;
      z-index: 1;
    }
  }
}

.hero-img {
  width: 100%;
    height: calc(100vh - $navbarHeight - 2rem);
  min-height: 38rem;
  object-fit: cover;
  object-position: center;
  display: block;

  @media screen and (max-width: 700px) {
    height: calc(100vh - $navbarHeight + 1rem);
    min-height: 28rem;
    object-position: 60%;
  }
}

.hero-overlay {
  position: absolute;
  inset: 0;
  bottom: 5rem;
  display: flex;
  align-items: center;
  padding: 0 $pageMargin;
  z-index: 2;

  @media screen and (max-width: 1100px) {
    padding: 0 $resMargin;
  }

  @media screen and (max-width: 700px) {
    bottom: 5rem;
    flex-direction: column;
    gap: 3rem;
    align-items: flex-start;
    padding: 2rem 1.5rem;
    justify-content: flex-end;
  }
}

.hero-text {
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(6px);
  border-radius: 1rem;
  padding: 3rem 2.5rem;
  max-width: 52rem;

  @media screen and (max-width: 700px) {
    background: none;
    backdrop-filter: none;
    padding: 0;
    width: 100%;
    margin-top: 9rem;
  }

  h1 {
    color: white;
    font-size: 4rem;
    line-height: 1.2;
    margin-bottom: 1rem;
    text-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);

    @media screen and (max-width: 700px) {
      font-size: 3rem;
    }
  }

  p {
    color: rgba(255, 255, 255, 0.85);
    font-size: 2rem;
    line-height: 1.6;
    text-shadow: 0 1px 8px rgba(0, 0, 0, 0.5);

    @media screen and (max-width: 700px) {
      font-size: 1.6rem;
    }
  }
}

.highlight {
  color: $cta;
  font-size: inherit;
  font-weight: inherit;
  font-family: inherit;
  line-height: inherit;
}

.mobile-trust {
  display: none;

  @media screen and (max-width: 700px) {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 4rem;
  }
}

.mobile-trust-item {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-size: 1.4rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
}

.trust-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  border-radius: 0.4rem;
  background: rgba($cta, 0.15);
  color: $cta;

  .mobile-trust-item & {
    background: rgba(255, 255, 255, 0.2);
    color: $cta;
  }
}

.trust-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: #F7F9FC;
  display: flex;
  justify-content: center;
  gap: 3rem;
  padding: 2rem 2rem;
  border: 1px solid #0C23401F;
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.06);

  @media screen and (max-width: 700px) {
    display: none;
  }
}

.trust-divider {
  width: 1px;
  height: 3rem;
  background: rgba(0, 0, 0, 0.15);
  align-self: center;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-size: 1.2rem;
  font-weight: 500;
  color: #718096;
}
</style>
