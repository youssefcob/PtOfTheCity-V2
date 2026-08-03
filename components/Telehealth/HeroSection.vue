<script setup lang="ts">

const trustPoints = [
  "Licensed therapist",
  "HIPPA Secured",
  "IN-Network options",
];

const isMobile = ref(false);

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 500;
};

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkMobile);
});
</script>

<template>
  <section class="telehealth-hero">
    <div :class="['hero-card', { 'mobile-end': isMobile }]">
      <h1>Teletherapy Services</h1>
      <p>
        PT of the city connects you with the best physical and occupational
        therapists online,
      </p>

      <div class="hero-actions">
        <NuxtLink to="/teletherapy/booking" class="btn cta action-btn">
          Request Appointment
        </NuxtLink>
        <!-- <NuxtLink to="/#Insurance" class="btn secondary-btn action-btn">
          Verify Insurance
        </NuxtLink> -->
      </div>
    </div>

    <div v-if="!isMobile" class="trust-bar">
      <div v-for="item in trustPoints" :key="item" class="trust-pill">
        <span class="trust-icon">
          <svg
            v-if="item === 'Licensed therapist'"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 3l7 4v5c0 4.4-3 8.5-7 9-4-0.5-7-4.6-7-9V7l7-4z"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.5 12.2l1.6 1.6 3.4-3.6"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <svg
            v-else-if="item === 'HIPPA Secured'"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M8 10V7a4 4 0 118 0v3"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
            />
            <rect
              x="5"
              y="10"
              width="14"
              height="10"
              rx="2.5"
              stroke="currentColor"
              stroke-width="1.8"
            />
            <path
              d="M12 14v2.5"
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
              d="M12 3l7 4v5c0 4.4-3 8.5-7 9-4-0.5-7-4.6-7-9V7l7-4z"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 8.5v4"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
            />
            <circle cx="12" cy="15.5" r="0.8" fill="currentColor" />
          </svg>
        </span>
        <span>{{ item }}</span>
      </div>
    </div>
  </section>

  <div v-if="isMobile" class="trust-bar mobile-trust-bar">
    <div v-for="item in trustPoints" :key="item" class="trust-pill">
      <span class="trust-icon">
        <svg
          v-if="item === 'Licensed therapist'"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 3l7 4v5c0 4.4-3 8.5-7 9-4-0.5-7-4.6-7-9V7l7-4z"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9.5 12.2l1.6 1.6 3.4-3.6"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <svg
          v-else-if="item === 'HIPPA Secured'"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M8 10V7a4 4 0 118 0v3"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
          />
          <rect
            x="5"
            y="10"
            width="14"
            height="10"
            rx="2.5"
            stroke="currentColor"
            stroke-width="1.8"
          />
          <path
            d="M12 14v2.5"
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
            d="M12 3l7 4v5c0 4.4-3 8.5-7 9-4-0.5-7-4.6-7-9V7l7-4z"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 8.5v4"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
          />
          <circle cx="12" cy="15.5" r="0.8" fill="currentColor" />
        </svg>
      </span>
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.telehealth-hero {
  @include pagePadding;
  min-height: auto;
  padding-top: calc($navbarHeight + 2rem);
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  background:
    linear-gradient(90deg, rgba(238, 236, 237, 0.12) 0%, rgba(238, 236, 237, 0.08) 100%),
    url("/images/telehealth/telehealth-hero.png");
  background-size: cover;
  background-position: center;

  @media screen and (max-width: 700px) {
    min-height: 60rem;
    padding-top: calc($navbarHeight + 1rem);
    padding-right: 0;
    padding-left: 0;
    padding-bottom: 0;
    gap: 0;
    background-image:
      linear-gradient(90deg, rgba(238, 236, 237, 0.12) 0%, rgba(238, 236, 237, 0.08) 100%),
      url("/images/telehealth/telehealth-hero-mobile.png");
    background-position: center top;
    background-size: cover;
  }
}

.hero-card {
  width: 46rem;
  
  padding: 2rem 1.55rem 1.85rem;
  border-radius: 1rem;
  
  background: linear-gradient(
    135deg,
    rgba(201, 201, 191, 0.34) 0%,
    rgba(46, 170, 203, 0.22) 42%,
    rgba(4, 28, 35, 0.58) 100%
  );
  backdrop-filter: blur(5px) saturate(125%);
  -webkit-backdrop-filter: blur(34px) saturate(125%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 24px 80px rgba(22, 33, 39, 0.18);

  h1 {
    color: $white;
    font-size: 4rem;
    line-height: 0.95;
    font-weight: 500;
    margin-bottom: 1rem;
    letter-spacing: -0.05em;
  }

  p {
    max-width: none;
    color: rgba(255, 255, 255, 0.92);
    font-size: 1.5rem;
    line-height: 1.45;
  }

  @media screen and (max-width: 700px) {
    width: 100%;
    margin-top: 0;
    min-height: calc(100vh - #{$navbarHeight} - 2rem);
    padding: 0 1rem 1.15rem;
    border: 0;
    border-radius: 0;
    background: transparent;
    backdrop-filter: none;
    box-shadow: none;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  @media screen and (max-width: 420px) {
    min-height: 33rem;
  }
}

.hero-card.mobile-end {
  margin-top: auto;
}

.hero-actions {
  margin-top: 1.8rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media screen and (max-width: 700px) {
    margin-top: 1.4rem;
  }
}

.action-btn {
  width: 100%;
  min-height: 4.9rem;
  border-radius: 1.35rem;
  font-size: 1.28rem;
  font-weight: 700;

  @media screen and (max-width: 700px) {
    min-height: 4.7rem;
    font-size: 1.15rem;
    border-radius: 1rem;
  }
}

.secondary-btn {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.12),
    rgba(17, 94, 112, 0.5)
  );
  color: $white;
  border: 1.5px solid rgba(255, 255, 255, 0.9);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.14);

  &:hover {
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.2),
      rgba(17, 94, 112, 0.62)
    );
  }

  @media screen and (max-width: 700px) {
    display: none;
  }
}

.trust-bar {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  padding-bottom: 0.2rem;
}

.mobile-trust-bar {
  width: 100%;
  padding: 1rem;
  background: $white;
  gap: 0.75rem;
}

.trust-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.85rem 1.6rem;
  border-radius: 999px;
  background: rgba(231, 248, 246, 0.92);
  box-shadow: 0 14px 28px rgba(35, 102, 129, 0.12);

  span:last-child {
    font-size: 1rem;
    color: #12363f;
    font-weight: 500;
  }

  @media screen and (max-width: 700px) {
    width: 100%;
    justify-content: center;
    padding: 0.9rem 1rem;
    background: #c9e9e6;
    box-shadow: none;
  }
}

.trust-icon {
  width: 1.35rem;
  height: 1.35rem;
  display: inline-flex;
  color: #0e3338;

  svg {
    width: 100%;
    height: 100%;
  }
}

@media screen and (max-width: 700px) {
  .hero-card h1 {
    font-size: clamp(2.8rem, 8.4vw, 4rem);
    margin-bottom: 0.7rem;
  }

  .hero-card p {
    max-width: 100%;
    font-size: 1.18rem;
    line-height: 1.42;
  }
}
</style>
