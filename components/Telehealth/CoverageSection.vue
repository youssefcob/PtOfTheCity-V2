<script setup lang="ts">
  

  const insurancePlans = [
  "Medicare",
  "Medicaid",
  "Emblem Health",
  "Zaya Care IPA",
  "Molina",
  "Aetna",
  "Villagecare Max",
  "Anthem BCBS",
  "ASH",
  "Multiplan"
];

const isMobile = ref(false);
const currentPage = ref(0);

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 700;
  if (!isMobile.value) {
    currentPage.value = 0;
  }
};

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkMobile);
});

const pageSize = computed(() => (isMobile.value ? 5 : insurancePlans.length));

const totalPages = computed(() =>
  Math.ceil(insurancePlans.length / pageSize.value),
);

const visiblePlans = computed(() => {
  if (!isMobile.value) return insurancePlans;

  const start = currentPage.value * pageSize.value;
  return insurancePlans.slice(start, start + pageSize.value);
});

const showPreviousPlans = () => {
  if (currentPage.value > 0) {
    currentPage.value -= 1;
  }
};

const showNextPlans = () => {
  if (currentPage.value < totalPages.value - 1) {
    currentPage.value += 1;
  }
};
</script>

<template>
  <section class="telehealth-section coverage-section">
    <div class="section-header">
      <h2>Coverage</h2>
      
    </div>

    <div class="coverage-grid">
      <article class="coverage-card insurance-card">
        <div class="card-header">
          <div class="header-title">
            <span class="header-icon">
              <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M60 38.9999C60 53.9999 49.5 61.4999 37.02 65.8499C36.3665 66.0713 35.6566 66.0607 35.01 65.8199C22.5 61.4999 12 53.9999 12 38.9999V17.9999C12 17.2042 12.3161 16.4412 12.8787 15.8786C13.4413 15.316 14.2044 14.9999 15 14.9999C21 14.9999 28.5 11.3999 33.72 6.83988C34.3556 6.29688 35.1641 5.99854 36 5.99854C36.8359 5.99854 37.6444 6.29688 38.28 6.83988C43.53 11.4299 51 14.9999 57 14.9999C57.7956 14.9999 58.5587 15.316 59.1213 15.8786C59.6839 16.4412 60 17.2042 60 17.9999V38.9999Z" stroke="#103535" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M27 36L33 42L45 30" stroke="#103535" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
            </span>
            <h3>Insurance Plans</h3>
          </div>

          <div class="nav-buttons">
            <button
              type="button"
              class="nav-btn"
              aria-label="Previous plans"
              @click="showPreviousPlans"
              :disabled="currentPage === 0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 6l-6 6 6 6"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              class="nav-btn"
              aria-label="Next plans"
              @click="showNextPlans"
              :disabled="currentPage === totalPages - 1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 6l6 6-6 6"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div class="plans-grid">
          <div v-for="plan in visiblePlans" :key="plan" class="plan-pill">
            {{ plan }}
          </div>
        </div>

        <!-- <NuxtLink to="/#eligibility" class="btn cta coverage-btn">
          Verify insurance Eligibility
        </NuxtLink> -->
      </article>

      <article class="coverage-card self-pay-card">
        <div class="header-title">
          <span class="header-icon dollar-icon">
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M36 66C52.5685 66 66 52.5685 66 36C66 19.4315 52.5685 6 36 6C19.4315 6 6 19.4315 6 36C6 52.5685 19.4315 66 36 66Z" stroke="#103535" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M48 24H30C28.4087 24 26.8826 24.6321 25.7574 25.7574C24.6321 26.8826 24 28.4087 24 30C24 31.5913 24.6321 33.1174 25.7574 34.2426C26.8826 35.3679 28.4087 36 30 36H42C43.5913 36 45.1174 36.6321 46.2426 37.7574C47.3679 38.8826 48 40.4087 48 42C48 43.5913 47.3679 45.1174 46.2426 46.2426C45.1174 47.3679 43.5913 48 42 48H24" stroke="#103535" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M36 54V18" stroke="#103535" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
          </span>
          <h3>Self Pay Rates</h3>
        </div>

        <div class="self-pay-content">
          <p>Starts from</p>
          <strong>50$</strong>
        </div>

        <NuxtLink to="/teletherapy/booking" class="btn cta coverage-btn">
          Self pay request
        </NuxtLink>
      </article>
    </div>
  </section>
</template>

<style scoped lang="scss">
.telehealth-section {
  @include pagePadding;
  margin-top: 4.5rem;
  margin-bottom: 2.5rem;

  @media screen and (max-width: 700px) {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }
}

.section-header {
  margin-bottom: 1.4rem;

  h2 {
    color: #048E73;
    font-size: clamp(3rem, 4vw, 4.4rem);
    line-height: 1;
    margin-bottom: 0.65rem;
    font-weight: 600;
  }

  p {
    color: #18383f;
    font-size: clamp(1.2rem, 1.5vw, 1.7rem);
    line-height: 1.3;
    margin-top: 2rem;
  }
}

.coverage-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.55fr) minmax(28rem, 1fr);
  gap: 1rem;

  @media screen and (max-width: 980px) {
    grid-template-columns: 1fr;
  }
}

.coverage-card {
  background: #CFEEE8;
  border-radius: 1.5rem;
  padding: 1.25rem;
}

.insurance-card {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.card-header,
.header-title {
  display: flex;
  align-items: center;
}

.card-header {
  justify-content: space-between;
  gap: 1rem;
}

.header-title {
  gap: 0.75rem;

  h3 {
    color: #18383f;
    font-size: clamp(2rem, 2.6vw, 3rem);
    line-height: 1.1;
    font-weight: 400;
  }
}

.header-icon {
  width: 3.1rem;
  height: 3.1rem;
  display: inline-flex;
  color: #18383f;
  flex-shrink: 0;

  svg {
    width: 100%;
    height: 100%;
  }
}

.nav-buttons {
  display: flex;
  gap: 0.6rem;
}

.nav-btn {
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 999px;
  background: #38d7bf;
  color: #18383f;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    width: 1.2rem;
    height: 1.2rem;
  }

  &:disabled {
    opacity: 0.45;
    cursor: default;
  }
}

.plans-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem 1rem;

  @media screen and (max-width: 700px) {
    grid-template-columns: 1fr;
  }
}

.plan-pill {
  min-height: 2.9rem;
  border-radius: 1rem;
  background: #fff;
  color: #18383f;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0.7rem 0.85rem;
  font-size: 1rem;
  line-height: 1.2;
}

.coverage-btn {
  width: 100%;
  min-height: 3.8rem;
  border-radius: 1rem;
  font-size: 1.1rem;
}

.self-pay-card {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  justify-content: space-between;
}

.self-pay-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex: 1;
  gap: 0.75rem;

  p {
    color: #103535;
    font-size: 1.7rem;
    line-height: 1.2;
  }

  strong {
    color: #12363f;
    font-size: clamp(4.2rem, 6vw, 5.6rem);
    line-height: 1;
    font-weight: 700;
  }
}
</style>
