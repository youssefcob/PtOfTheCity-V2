<script setup lang="ts">
const props = defineProps<{ clinicCount: number }>();

const benefits = computed(() => [
  {
    icon: 'ambulance' as const,
    title: 'Expert 1-on-1 Care',
    text: 'A personalized evaluation to treat pain, analyze movement, and prevent injuries.',
  },
  {
    icon: 'square-activity' as const,
    title: 'Claim Now, Use Anytime',
    text: 'Secure your benefit today and keep it in your back pocket for the future.',
  },
  {
    icon: 'map-pin' as const,
    title: 'City-Wide Convenience',
    text: `Redeemable at any of our ${props.clinicCount} PT of The City clinics across NYC.`,
  },
]);
</script>

<template>
  <section class="benefits">
    <h2 class="benefits__title">What you get</h2>

    <ol class="benefits__list">
      <li v-for="(benefit, index) in benefits" :key="benefit.title" class="benefit">
        <span class="benefit__number" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
        <span class="benefit__icon">
          <CrunchIcon :name="benefit.icon" :size="40" :stroke-width="1" />
        </span>
        <h3 class="benefit__title">{{ benefit.title }}</h3>
        <p class="benefit__text">{{ benefit.text }}</p>
      </li>
    </ol>
  </section>
</template>

<style scoped lang="scss">
.benefits {
  padding: 96px var(--crunch-gutter);
  background: #fff;

  @media screen and (max-width: 800px) {
    padding-block: 56px;
  }
}

.benefits__title {
  font-family: $crunch-font-heading;
  font-size: 50px;
  font-weight: 700;
  line-height: 0.98;
  text-transform: uppercase;

  @media screen and (max-width: 800px) {
    font-size: 34px;
  }
}

.benefits__list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  margin-top: 44px;
  list-style: none;

  @media screen and (max-width: 800px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 28px;
    margin-top: 28px;
  }
}

.benefit {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 28px;
  border: 1px solid $crunch-teal;
  border-radius: 24px;
  background: #fff;

  @media screen and (max-width: 800px) {
    padding: 24px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  }
}

.benefit__number {
  color: #6F7A7C;
  font-family: $crunch-font-heading;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.2;

  @media screen and (max-width: 800px) {
    font-size: 16px;
  }
}

.benefit__icon {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  margin-top: 20px;
  border-radius: 50%;
  background: rgba($crunch-teal, 0.05);

  @media screen and (max-width: 800px) {
    width: 44px;
    height: 44px;
    margin-top: 8px;
    background: rgba($crunch-teal, 0.2);

    svg {
      width: 24px;
      height: 24px;
      stroke-width: 1.5;
    }
  }
}

.benefit__title {
  margin-top: 24px;
  font-family: $crunch-font-heading;
  font-size: 26px;
  font-weight: 700;
  line-height: 1.2;

  @media screen and (max-width: 800px) {
    margin-top: 18px;
    font-size: 24px;
  }
}

.benefit__text {
  margin-top: 10px;
  color: #5B6669;
  font-size: 16px;
  line-height: 23px;

  @media screen and (max-width: 800px) {
    margin-top: 18px;
    line-height: 24px;
  }
}
</style>
