<template>
  <div class="quiz-page" :class="{ 'is-mobile-quiz': isMobile && !showFinalForm && !showResults && !showOnboarding }">
    <div class="quiz-content">
      <div class="quiz-header" v-if="!isMobile || showFinalForm || showResults">
        <h1>{{ currentQuiz.title }}</h1>
        <div class="progress-dots" v-if="!isMobile && !showFinalForm && !showResults">
          <div v-for="(section, index) in currentQuiz.sections" :key="section.id" class="dot"
            :class="{ active: index < currentSection, current: index === currentSection }" />
        </div>
      </div>

      <transition name="fade" mode="out-in">
        <!-- Onboarding Screen -->
        <QuizOnboarding v-if="showOnboarding" :quiz="currentQuiz" @start="startQuiz" />

        <!-- Results Screen -->
        <div v-else-if="showResults" class="results-container">
          <h1 class="results-title">
            Your score is {{ resultData?.total_score }},
            <br>
            {{ resultTitle }}
          </h1>
          
          <div class="results-messages">
            <p class="result-message">{{ resultMessage }}</p>
            <p class="result-submessage">{{ resultSubMessage }}</p>
          </div>

          <div class="results-buttons">
            <NuxtLink  class="btn btn-primary" :to="`/booking`">
              Start Your Recovery Journey →
            </NuxtLink>
            <NuxtLink  class="btn btn-secondary" :to="`/`">
              Go to homepage
            </NuxtLink>
          </div>

          <div class="score-legend">
            <p>0–12 = Normal</p>
            <p>13–24 = Mild Symptoms</p>
            <p>25–72 = Moderate to Severe Symptoms</p>
          </div>
        </div>

        <!-- Final Form -->
        <div v-else-if="showFinalForm" class="final-form-container">
          <h1>You're nearly done!</h1>
          <p class="subtitle">Let's personalize your results.</p>

          <div class="form-fields">
            <InputField NoLabel @input="finalFormData.name = $event" placeHolder="Name" id="name" required />

            <InputField NoLabel @input="finalFormData.age = $event" placeHolder="Age" id="age" numbersOnly required />

            <DropDownInputField NoLabel id="gender" :list="['Male', 'Female', 'Other']" placeHolder="Gender"
              @input="finalFormData.gender = $event" required />

            <InputField NoLabel @input="finalFormData.contact = $event" placeHolder="Contact number" id="contact"
              required />

            <InputField NoLabel @input="finalFormData.email = $event" placeHolder="Email" id="email" required />
          </div>

          <div class="final-form-buttons">
            <button type="button" class="btn-back" @click="backToQuiz">
              Back
            </button>
            <button type="button" class="btn-next" @click="handleFinalSubmit" :disabled="isSubmitting">
              <span v-if="isSubmitting">Submitting...</span>
              <span v-else>Show results →</span>
            </button>
          </div>
        </div>

        <!-- Desktop View: Sectioned with navigation -->
        <div v-else-if="!isMobile" class="quiz-body">
          <transition :name="transitionName" mode="out-in">
            <div :key="currentSection" class="section-container">
              <div class="questions-section">
                <h2 class="section-title">{{ activeSection.sectionTitle }}</h2>

                <div class="questions-list">
                  <div v-for="question in activeSection.questions" :key="question.id" class="question-block">
                    <p class="question-text">{{ question.question }}</p>
                    <QuizAnswerOptions
                      :answers="question.answers"
                      :name="`question-${question.id}`"
                      :modelValue="answers[currentSection][question.id]"
                      @update:modelValue="answers[currentSection][question.id] = $event"
                    />
                  </div>
                  <div class="navigation-buttons">
                  <button type="button" class="btn-back" @click="previousSection" :disabled="currentSection === 0">
                    Back
                  </button>
                  <button type="button" class="btn-next" @click="nextSection">
                    {{ 'Next' }} →
                  </button>
                </div>
                </div>

                
              </div>

              <div class="image-section">
                <img :src="activeSection.image" :alt="activeSection.sectionTitle" />
              </div>
            </div>
          </transition>
        </div>

        <!-- Mobile View: Sectioned with navigation -->
        <div v-else class="quiz-body-mobile">
          <transition :name="transitionName" mode="out-in">
            <div :key="currentSection" class="mobile-section-container">
              
              <div class="mobile-image-header" :style="{ backgroundImage: `url(${activeSection.image})` }">
                <div class="mobile-header-overlay">
                  <h1>{{ currentQuiz.title }}</h1>
                  <div class="mobile-progress-dots">
                    <div v-for="(section, index) in currentQuiz.sections" :key="section.id" class="dot"
                      :class="{ active: index < currentSection, current: index === currentSection }" />
                  </div>
                </div>
              </div>

              <div class="mobile-questions-section">
                <h2 class="section-title">{{ activeSection.sectionTitle }}</h2>

                <div class="questions-list">
                  <div v-for="question in activeSection.questions" :key="question.id" class="question-block">
                    <p class="question-text">{{ question.question }}</p>
                    <QuizAnswerOptions
                      :answers="question.answers"
                      :name="`question-${question.id}`"
                      :modelValue="answers[currentSection][question.id]"
                      @update:modelValue="answers[currentSection][question.id] = $event"
                    />
                  </div>
                </div>

                <div class="navigation-buttons">
                  <button type="button" class="btn-back" @click="previousSection" :disabled="currentSection === 0">
                    Back
                  </button>
                  <button type="button" class="btn-next" @click="nextSection">
                    {{ 'Next' }} →
                  </button>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import quizzes from '~/data/quizzes';
import DropDownInputField from '~/sharedComponents/DropDownInputField.vue';
import InputField from '~/sharedComponents/InputField.vue';
import QuizAnswerOptions from './QuizAnswerOptions.vue';

const toast = useToast();

const route = useRoute();
const quiz = decodeURIComponent(route.params.name as string);

const currentQuiz = quizzes[quiz];

if (!currentQuiz) {
  throw createError({ statusCode: 404, message: 'Quiz not found' });
}

const currentSection = ref(0);
const answers = ref<Record<number, Record<number, number>>>(
  currentQuiz.sections.reduce((acc, section, index) => {
    acc[index] = {};
    return acc;
  }, {} as Record<number, Record<number, number>>)
);

// for testing :P
// const answers = ref<Record<number, Record<number, number>>>(
//   currentQuiz.sections.reduce((acc, section, index) => {
//     acc[index] = {};
//     section.questions.forEach(question => {
//       acc[index][question.id] = Math.floor(Math.random() * 5); // Random 0-4
//     });
//     return acc;
//   }, {} as Record<number, Record<number, number>>)
// );

const transitionName = ref('slide-left');
const isMobile = ref(false);
const showOnboarding = ref(true);
const showFinalForm = ref(false);
const showResults = ref(false);
const isSubmitting = ref(false);
const resultData = ref<{
  total_score: number;
  result_category: string;
  recommendation: string;
} | null>(null);

const finalFormData = reactive({
  name: '',
  age: '',
  gender: '',
  contact: '',
  email: ''
});

const activeSection = computed(() => currentQuiz.sections[currentSection.value]);
const isLastSection = computed(() => currentSection.value === currentQuiz.sections.length - 1);

const resultTitle = computed(() => {
  if (!resultData.value) return '';
  const score = resultData.value.total_score;
  
  if (score <= 12) {
    return 'Everything looks normal';
  } else if (score <= 24) {
    return 'Mild symptoms detected';
  } else {
    return 'Moderate to severe symptoms detected';
  }
});

const resultMessage = computed(() => {
  if (!resultData.value) return '';
  const score = resultData.value.total_score;
  
  if (score <= 12) {
    return 'Great news — your answers suggest you\'re within the typical range.';
  } else if (score <= 24) {
    return 'Your responses indicate some pelvic health concerns that could benefit from attention.';
  } else {
    return 'Your responses suggest significant pelvic health concerns that warrant professional evaluation.';
  }
});

const resultSubMessage = computed(() => {
  if (!resultData.value) return '';
  const score = resultData.value.total_score;
  
  if (score <= 12) {
    return 'We\'ll share helpful educational tips to support your pelvic wellness.';
  } else if (score <= 24) {
    return 'We recommend lifestyle modifications and pelvic wellness consultation.';
  } else {
    return 'We recommend a comprehensive biofeedback equipment evaluation and pelvic wellness consultation.';
  }
});

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 1200;
};

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
});

const startQuiz = () => {
  showOnboarding.value = false;
};

const nextSection = () => {
  // Check if all questions in current section are answered
  const currentSectionQuestions = activeSection.value.questions;
  const currentSectionAnswers = answers.value[currentSection.value] || {};

  const allAnswered = currentSectionQuestions.every(question =>
    currentSectionAnswers[question.id] !== undefined
  );

  if (!allAnswered) {
    toast.error({ message: 'Please answer all questions before proceeding.' });
    return;
  }

  if (isLastSection.value) {
    handleSubmit();
  } else {
    transitionName.value = 'slide-left';
    currentSection.value++;
  }
};

const previousSection = () => {
  if (currentSection.value > 0) {
    transitionName.value = 'slide-right';
    currentSection.value--;
  }
};

const handleSubmit = () => {
  // Validate all sections are answered
  const allSectionsAnswered = currentQuiz.sections.every((section, sectionIndex) => {
    const sectionAnswers = answers.value[sectionIndex] || {};
    return section.questions.every(question =>
      sectionAnswers[question.id] !== undefined
    );
  });

  if (!allSectionsAnswered) {
    toast.error({ message: 'Please answer all questions before proceeding.' });
    return;
  }

  const totalScore = Object.values(answers.value).reduce((sectionSum, sectionAnswers) => {
    const sectionScore = Object.values(sectionAnswers).reduce((sum, score) => sum + score, 0);
    return sectionSum + sectionScore;
  }, 0);

  // console.log('Quiz submitted!', { answersBySection: answers.value, totalScore });

  // Show final form
  showFinalForm.value = true;
};

const formValidation = {
  name: {
    rules: ['required'],
    message: {
      required: 'Name is required'
    }
  },
  age: {
    rules: ['required', 'numeric:only'],
    message: {
      required: 'Age is required',
      numeric: 'Age must be a number'
    }
  },
  gender: {
    rules: ['required'],
    message: {
      required: 'Gender is required'
    }
  },
  contact: {
    rules: ['required'],
    message: {
      required: 'Contact number is required'
    }
  },
  email: {
    rules: ['required', 'email'],
    message: {
      required: 'Email is required',
      email: 'Please enter a valid email'
    }
  }
};

const handleFinalSubmit = async () => {
  // Validate final form
  if (!finalFormData.name || !finalFormData.age ||
    !finalFormData.gender || !finalFormData.contact || !finalFormData.email) {
    toast.error({ message: 'Please fill all fields' });
    return;
  }

  isSubmitting.value = true;

  try {
    const response = await $fetch(`${useUrl()}/quiz-results`, {
      method: 'POST',
      body: {
        quiz_name: currentQuiz.title,
        personal_info: finalFormData,
        quiz_answers: answers.value
      }
    });

    console.log('Final submission:', (response as any).data);
    
    // Store result data and show results screen
    resultData.value = (response as any).data;
    showFinalForm.value = false;
    showResults.value = true;
  } catch (error) {
    toast.error({ message: 'Failed to submit quiz' });
  } finally {
    isSubmitting.value = false;
  }
};

const backToQuiz = () => {
  showFinalForm.value = false;
};
</script>

<style scoped lang="scss">
.quiz-page {
  min-height: 100vh;
  background: white;
  padding: 4rem 9rem;
  padding-top: 15vh;
}

.quiz-content {
  // max-width: 1400px;
  // margin: 0 auto;
}

.quiz-header {
  text-align: center;
  margin-bottom: 4rem;

  h1 {
    color: #1A8C7B;
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 2rem;
  }
}

.progress-dots {
  display: flex;
  justify-content: center;
  gap: 1rem;

  .dot {
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    border: 2px solid #1A8C7B;
    background: transparent;
    transition: all 0.3s ease;

    &.active,
    &.current {
      background: #1A8C7B;
      border-color: #1A8C7B;
    }

    &.current {
      transform: scale(1.2);
    }
  }
}

.quiz-body {
  // background: linear-gradient(90deg, #103535 0%, #2F9B9B 100%);
  border-radius: 2rem;
  overflow: hidden;
}

.section-container {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 2rem;
  min-height: 70vh;
}

.questions-section {
  padding: 2rem 0rem;
  display: flex;
  flex-direction: column;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 500;
  color: #1b3b36;
  margin-bottom: 1.5rem;
}

.questions-list {
  // flex: 0.5;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.question-block {
  .question-text {
    color: #333;
    font-size: 1.6rem;
    font-weight: 400;
    margin-bottom: 0.8rem;
    line-height: 1.4;
  }
}




.image-section {
  display: flex;
  align-items: center;
  justify-content: center;
  // padding: 3rem;
  // background: rgba(255, 255, 255, 0.05);

  img {
    max-width: 100%;
    height: auto;
    // max-height: 60vh;
    object-fit: contain;
    border-radius: 1.5rem;
  }
}

.navigation-buttons {
  display: flex;
  gap: 1.5rem;
  margin-top: 5rem;
  margin-bottom: 2rem;

  button {
    padding: 1rem 3rem;
    font-size: 1.4rem;
    border-radius: 10px;
    border: 2px solid transparent;
    font-weight: 500;
    @extend .btn;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .btn-back {
    background: white;
    color: #333;
    border-color: #ccc;
    flex: 0.1;

    &:hover:not(:disabled) {
      background: #f5f5f5;
      border-color: #aaa;
    }
  }

  .btn-next {
    background: #2EE5C1;
    color: #333;
    border-color: #DAFFFF;
    flex: 0.3;
    font-weight: 600;

    &:hover:not(:disabled) {
      background: #32e6a4;
      border-color: #2ebc89;
      // transform: translateY(-2px);
      // box-shadow: 0 4px 12px rgba(52, 211, 153, 0.3);
    }
  }
}

// Transitions
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// Results Screen Styles
.results-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  min-height: 70vh;
  padding: 3rem 2rem;
  margin: 0 auto;

  .results-title {
    color: #1A8C7B;
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 2rem;
    line-height: 1.2;
  }

  .results-messages {
    margin-bottom: 3rem;

    .result-message {
      color: #333;
      font-size: 1.8rem;
      margin-bottom: 1rem;
      line-height: 1.5;
    }

    .result-submessage {
      color: #555;
      font-size: 1.8rem;
      line-height: 1.5;
    }
  }

  .results-buttons {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
    margin-bottom: 4rem;

    button {
      padding: 1.5rem 4rem;
      font-size: 1.8rem;
      border: 2px solid transparent;
      width: 100%;
      text-align: center;
      @extend .btn;
    }

    .btn-primary {
      background: #3DFFB8;
      color: $black;
      border-color: #3DFFB8;

      &:hover {
        background: #2ee0a0;
        border-color: #2ee0a0;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(61, 255, 184, 0.4);
      }
    }

    .btn-secondary {
      background: white;
      color: #333;
      border-color: #ccc;
      border: 2px solid #ccc;

      &:hover {
        background: #f5f5f5;
        border-color: #aaa;
      }
    }
  }

  .score-legend {
    color: #666;
    font-size: 1.4rem;
    line-height: 1.8;

    p {
      margin: 0.5rem 0;
    }
  }
}

// Final Form Styles
.final-form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  padding: 3rem 2rem;

  h1 {
    color: $black;
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    text-align: center;
  }

  .subtitle {
    color: #555;
    font-size: 1.8rem;
    margin-bottom: 3rem;
    text-align: center;
  }

  .form-fields {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
    max-width: 525px;
  }

  .final-form-buttons {
    display: flex;
    gap: 2rem;
    margin-top: 3rem;
    width: 100%;
    max-width: 525px;

    button {
      // padding: 1.5rem 4rem;
      // font-size: 1.8rem;
      border: 2px solid transparent;
      border-radius: 20px;
      // font-weight: 800;
      @extend .btn;
    }

    .btn-back {
      background: white;
      color: #333;
      border-color: #ccc;
      font-weight: 700;
      flex: 0.2;

      &:hover {
        background: #f5f5f5;
        border-color: #aaa;
      }
    }

    .btn-next {
    background: #2EE5C1;
    // color: #333;
    color: red !important;
    border-color: #DAFFFF;
    flex: 0.8;
    font-weight: 1000;

    &:hover:not(:disabled) {
      background: #32e6a4;
      border-color: #2ebc89;
      // transform: translateY(-2px);
      // box-shadow: 0 4px 12px rgba(52, 211, 153, 0.3);
    }
  }
  }
}

// Mobile Styles
.quiz-body-mobile {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.mobile-section-container {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.mobile-image-header {
  height: 35vh;
  min-height: 250px;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: flex-end;
}

.mobile-header-overlay {
  background: linear-gradient(to top, rgba(26, 140, 123, 0.9) 0%, rgba(26, 140, 123, 0) 100%);
  width: 100%;
  padding: 4rem 2rem 2rem;
  text-align: center;
  
  h1 {
    color: white;
    font-size: 2.8rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
  }
}

.mobile-progress-dots {
  display: flex;
  justify-content: center;
  gap: 1rem;

  .dot {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    border: 2px solid white;
    background: transparent;
    transition: all 0.3s ease;

    &.active,
    &.current {
      background: white;
    }

    &.current {
      transform: scale(1.2);
    }
  }
}

.mobile-questions-section {
  padding: 2rem;
  background: white;
  border-radius: 2rem 2rem 0 0;
  margin-top: -2rem;
  position: relative;
  z-index: 2;
  flex: 1;
  min-height: 60vh;
}

// Responsive
@media screen and (max-width: 1200px) {
  .quiz-page {
    padding: 2rem 1.5rem;
    padding-top: 15vh;
    
    &.is-mobile-quiz {
      padding: 0;
    }
  }

  .quiz-header {
    margin-bottom: 3rem;

    h1 {
      font-size: 2.5rem;
    }
  }

  .section-title {
    font-size: 2rem;
  }

  .question-block .question-text {
    font-size: 1.5rem;
  }


  .mobile-submit .btn-submit {
    width: 100%;
    max-width: 400px;
  }

  .results-container {
    padding: 2rem 1.5rem;

    .results-title {
      font-size: 2.5rem;
    }

    .results-messages {
      .result-message,
      .result-submessage {
        font-size: 1.5rem;
      }
    }

    .results-buttons {
      button {
        font-size: 1.6rem;
      }
    }

    .score-legend {
      font-size: 1.3rem;
    }
  }

  .final-form-container {
    h1 {
      font-size: 2.5rem;
    }

    .subtitle {
      font-size: 1.5rem;
    }

    .final-form-buttons {
      flex-direction: column-reverse;
      gap: 1rem;

      button {
        flex: 1;
        width: 100%;
      }
    }
  }

  .navigation-buttons {
    flex-direction: column-reverse;
    gap: 1rem;
    margin-top: 2rem;

    button {
      width: 100%;
      flex: unset;
    }
  }
}

@media screen and (min-width: 1200px) {
.results-container{
  padding: 0rem 20rem;
}  
}
</style>