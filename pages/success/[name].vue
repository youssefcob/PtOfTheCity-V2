<template>
  <div class="success-page">
    <p class="large">{{ copy.title }}</p>
    <p class="mid">{{ copy.subtitle }}</p>

    <p class="section-title">What Happens Next?</p>
    <p class="small">{{ copy.nextSteps }}</p>

    <p class="section-title">Need Assistance?</p>
    <p class="small">If you experience any issues or need immediate help, please don't hesitate to reach out:<br><strong>Phone: <a href="tel:+17186480888">(718) 648-0888</a></strong><br><strong>Email: <a href="mailto:info@ptofthecity.com">info@ptofthecity.com</a></strong></p>

    <NuxtLink href="/" class="btn cta">Back to Homepage</NuxtLink>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();

const successCopy = {
  booking: {
    title: 'Reservation Request Successfully Submitted!',
    subtitle: 'Thank you for submitting your request. You are in safe hands with PT of The City Physical Therapy.',
    nextSteps: 'One of our patient care coordinators will contact you within 30 minutes during our working hours (7 AM - 7 PM). Your prompt response will help us provide you with the best possible service and ensure we secure the appointment time that works best for you.',
    seoTitle: 'Request Received | PT of the City',
    seoDescription: 'Your appointment request has been received. A member of our team will be in touch shortly.',
  },
  crunch: {
    title: 'Your Member Perk Is Secured!',
    subtitle: 'Thank you for claiming your complimentary PT assessment. You are in safe hands with PT of The City Physical Therapy.',
    nextSteps: 'One of our patient care coordinators will reach out to verify your Crunch membership and answer any questions. Your assessment stays on standby, so you can book it whenever you need it.',
    seoTitle: 'Member Perk Claimed | PT of the City',
    seoDescription: 'Your Crunch member perk has been claimed. A member of our team will be in touch shortly.',
  },
} as const;

const copy = computed(() => successCopy[route.params.name as keyof typeof successCopy] ?? successCopy.booking);

onMounted(() => {
  if (route.params.name === 'booking') trackBookingConversion();
});
usePageSeo({
  title: copy.value.seoTitle,
  description: copy.value.seoDescription,
});
</script>

<style scoped lang="scss">
.success-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  min-height: 100vh;
  padding: 5rem;
  text-align: center;

  @media screen and (max-width: 500px) {
    padding: 3rem 2rem;
  }
}

p {
  color: $black;
  line-height: 120%;
  text-align: center;

  &.large {
    font-size: 3.5rem;
    font-weight: 600;
  }

  &.mid {
    font-size: 2rem;
    font-weight: 300;
    max-width: 70ch;
  }

  &.section-title {
    font-size: 2.5rem;
    font-weight: 600;
    margin-top: 1rem;
  }

  &.small {
    font-size: 2rem;
    font-weight: 200;
    max-width: 70ch;

    a {
      color: $cta;
      text-decoration: none;
      &:hover { text-decoration: underline; }
    }
  }
}

.btn {
  padding: 2rem 10rem;
  margin-top: 1rem;

  @media screen and (max-width: 500px) {
    padding: 2rem 4rem;
  }
}
</style>
