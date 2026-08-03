<template>
  <div class="onboarding-container" :style="{ backgroundImage: `url(${quiz.onboarding.image})` }">
    <div class="onboarding-overlay">
      <div class="onboarding-card">
        <div class="onboarding-branding">
          <img src="/images/logo-white.png" alt="PT City" class="logo" />
        </div>

        <h1 class="onboarding-title">{{ quiz.onboarding.title }}</h1>

        <div class="onboarding-grid">
          <div class="onboarding-info">
            <h2 class="info-highlight">Get your score in 2 minutes.</h2>
            <p class="info-desc">
              Many women accept pelvic discomfort or "leaks" as normal—but they don't have to be. 
              This clinically-guided quiz helps you identify the source of your symptoms and provides 
              a clear path toward recovery.
            </p>
          </div>
          <div class="onboarding-benefits">
            <h2 class="info-highlight">What you'll get:</h2>
            <ul class="benefits-list">
              <li><strong>A Severity Score:</strong> From "Maintenance" to "Symptomatic."</li>
              <li><strong>Clinical Insights:</strong> Understand if your symptoms require professional evaluation.</li>
              <li><strong>Next Steps:</strong> Personalized recommendations, including biofeedback and specialist consultations.</li>
            </ul>
          </div>
        </div>

        <div class="onboarding-actions">
          <button @click="$emit('start')" class=" btn-start ">
            Start My Evaluation →
          </button>
          <p class="onboarding-footer">Your responses are private and confidential.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Quiz } from '~/data/quizzes';

defineProps<{
  quiz: Quiz;
}>();

defineEmits<{
  (e: 'start'): void;
}>();
</script>

<style scoped lang="scss">
.onboarding-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.onboarding-overlay {
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(10, 36, 36, 0.2) 0%, rgba(10, 36, 36, 0.95) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.onboarding-card {
  max-width: 1000px;
  width: 100%;
  text-align: center;
  color: white;
}

.onboarding-branding {
  margin-bottom: 3rem;
  .logo {
    height: 8rem;
    margin-bottom: 0.5rem;
    opacity: 0.9;
  }
  .brand-sub {
    font-size: 1.4rem;
    text-transform: uppercase;
    letter-spacing: 0.2rem;
    opacity: 0.8;
    color: white;
  }
}

.onboarding-title {
  font-size: 3.5rem;
  font-weight: 700;
  font-family: 'Poppins';
  margin-bottom: 5rem;
  line-height: 1.1;
  color: white;
}

.onboarding-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 8rem;
  text-align: left;
  margin-bottom: 6rem;
}

.info-highlight {
  font-size: 3rem;
  color: #2EE5C1;
  margin-bottom: 2rem;
  line-height: 1.2;
}

.info-desc {
  font-size: 1.8rem;
  line-height: 1.6;
  opacity: 0.9;
  color: white;
}

.benefits-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  color: white;

  li {
    font-size: 1.6rem;
    line-height: 1.4;
    font-weight: 200;
    position: relative;
    padding-left: 2rem;
    color: white;

    &::before {
      content: "•";
      position: absolute;
      left: 0;
      color: white;
    }

    strong {
      color: white;
      font-weight: 600;
    }
  }
}

.onboarding-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.btn-start {
  display: flex;
height: 54px;
// padding: 16px 24px;
justify-content: center;
align-items: center;
gap: 4px;
align-self: center;
border-radius: 10px;
// border: 1px solid #DAFFFF;
background: #2EE5C1;
width: 50%;
font-weight: 500;
font-size: 2rem;

&:hover {
  background: #2ee0a0;
  // transform: translateY(-3px);
  // box-shadow: 0 10px 20px rgba(61, 255, 184, 0.3);
  cursor: pointer;
}
}

.onboarding-footer {
  font-size: 1.2rem;
  // opacity: 0.6;
  color: white;
}

@media screen and (max-width: 1200px) {
  .onboarding-title {
    font-size: 3rem;
    margin-bottom: 3rem;
  }

  .onboarding-grid {
    grid-template-columns: 1fr;
    gap: 4rem;
    margin-bottom: 4rem;
  }

  .info-desc, .benefits-list li {
    font-size: 1.5rem;
  }

  .btn-start {
    width: 100%;
    font-size: 1.8rem;
  }
}

@media screen and (max-width: 768px) {
  .onboarding-overlay {
    padding: 1.5rem;
  }

  .onboarding-branding {
    margin-bottom: 2rem;
    .logo {
      height: 5rem;
    }
  }

  .onboarding-title {
    font-size: 2.2rem;
    margin-bottom: 2rem;
  }

  .onboarding-grid {
    gap: 3rem;
    margin-bottom: 3rem;
  }

  .info-highlight {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }

  .info-desc, .benefits-list li {
    font-size: 1.4rem;
  }

  .benefits-list {
    gap: 1rem;
  }

  .btn-start {
    height: 48px;
    font-size: 1.6rem;
  }
}
</style>
