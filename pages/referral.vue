<template>
  <div class="referral-page">
    <ReferralHero />
    <ReferralForm />
  </div>
</template>

<script setup lang="ts">
usePageSeo({
  title: 'Submit a Patient Referral | PT of the City',
  description: 'Refer your patient to PT of the City in under 2 minutes. HIPAA-compliant, 24-hour scheduling guarantee, 50+ insurance plans accepted.',
});
</script>

<style scoped lang="scss">
.referral-page {
  display: flex;
  flex-direction: column;
  padding-top: calc($navbarHeight + 2rem);
  padding-bottom: 2rem;

  @media screen and (max-width: 700px) {
    padding-top: calc($navbarHeight - 1rem);
  }
}
</style>
