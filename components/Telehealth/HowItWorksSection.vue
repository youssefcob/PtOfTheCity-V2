<script setup lang="ts">

const steps = [
  {
    number: "1",
    title: "Book Online",
    accent: true,
    icon: "calendar",
  },
  {
    number: "2",
    title: "Join your session",
    icon: "video",
  },
  {
    number: "3",
    title: "Get your plan",
    icon: "clipboard",
  },
  {
    number: "4",
    title: "Recover At Home",
    icon: "recovery",
  },
];
</script>

<template>
  <section class="telehealth-section telehealth-flow">
    <div class="section-header">
      <h2>How it works</h2>
      <p>
        PT of the city connects you with the best physical and occupational
        therapists online,
      </p>
    </div>

    <div class="steps-grid">
      <article
        v-for="step in steps"
        :key="step.number"
        :class="['step-card', { accent: step.accent }]"
      >
        <div class="step-number">{{ step.number }}</div>

        <span class="step-icon">
          <svg
            v-if="step.icon === 'calendar'"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
          >
            <rect
              x="3"
              y="5"
              width="18"
              height="16"
              rx="2"
              stroke="currentColor"
              stroke-width="1.8"
            />
            <path
              d="M8 3v4M16 3v4M3 10h18"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
            />
            <path
              d="M9 14l2 2 4-4"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <svg
            v-else-if="step.icon === 'video'"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
          >
            <rect
              x="3"
              y="6"
              width="13"
              height="12"
              rx="2"
              stroke="currentColor"
              stroke-width="1.8"
            />
            <path
              d="M16 10l5-3v10l-5-3"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <svg
            v-else-if="step.icon === 'clipboard'"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
          >
            <rect
              x="6"
              y="4"
              width="12"
              height="17"
              rx="2"
              stroke="currentColor"
              stroke-width="1.8"
            />
            <path
              d="M9 4.5h6M9 10h6M9 14h6"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
            />
          </svg>

          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M6 19c5-1 8-5 9.5-10.5L19 5l-1.5 3.5C12 10 8 13 7 18h12"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>

        <h3>{{ step.title }}</h3>
      </article>
    </div>

    <div class="why-grid">
      <div class="why-copy">
        <h2>Why Teletherapy</h2>
        <span class="subhead">Life in NYC is busy</span>
        <p>
          Teletherapy offers a convenient and efficient way to access healthcare
          from the comfort of your home. It saves you time by eliminating travel
          and waiting room delays, making it easier to fit medical appointments
          into your busy schedule.
        </p>
      </div>

      <div class="why-image-wrap">
        <img src="/images/telehealth/how-it-works.png" alt="Woman attending a Teletherapy therapy session from home" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.telehealth-section {
  @include pagePadding;
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;

  @media screen and (max-width: 700px) {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }
}

.telehealth-flow {
  display: flex;
  flex-direction: column;
  gap: 4rem;

  @media screen and (max-width: 700px) {
    gap: 2.5rem;
  }
}

.section-header {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.6rem;

  h2 {
    color: #048E73;
    font-size: clamp(3rem, 4vw, 4.4rem);
    line-height: 1;
    font-weight: 600;
  }

  p {
    color: #18383f;
    font-size: clamp(1.2rem, 1.6vw, 1.7rem);
    line-height: 1.4;
    max-width: 64rem;
  }
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;

  @media screen and (max-width: 1050px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media screen and (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

.step-card {
  min-height: 5.6rem;
  border-radius: 1.2rem;
  background: #CFEEE8;
  padding: 1.1rem 1.35rem;
  display: flex;
  align-items: center;
  gap: 0.85rem;

  h3 {
    color: #18383f;
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1.15;
  }

  &.accent {
    background: #2EE5C1;
  }
}

.step-number {
  font-size: 2.7rem;
  font-weight: 700;
  line-height: 1;
  color: #12363f;
}

.step-icon {
  width: 2rem;
  height: 2rem;
  display: inline-flex;
  color: #12363f;

  svg {
    width: 100%;
    height: 100%;
  }
}

.why-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.35fr);
  gap: 2.5rem;
  align-items: center;
  margin-top: 5rem;

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

.why-copy {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;

  h2 {
    color: #048E73;
    font-size: clamp(3rem, 4vw, 4.4rem);
    line-height: 1;
    font-weight: 600;
  }

  .subhead {
    color: #18383f;
    font-size: 1.7rem;
    line-height: 1.2;
  }

  p {
    color: #18383f;
    font-size: 1.2rem;
    line-height: 1.75;
    max-width: 36rem;
  }
}

.why-image-wrap {
  overflow: hidden;
  border-radius: 1.6rem;
  min-height: 20rem;
  box-shadow: 0 18px 40px rgba(35, 102, 129, 0.12);

  img {
    width: 100%;
    height: 100%;
    min-height: 20rem;
    object-fit: cover;
    display: block;
  }
}
</style>
