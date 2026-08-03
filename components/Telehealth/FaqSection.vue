<script setup lang="ts">

// s
const faqs = [
  {
    question: "What is Virtual Physical Therapy in NYC?",
    answer:
      "Virtual Physical Therapy NYC allows you to receive treatment from a licensed physical therapist through secure video sessions. You can get expert care, guided exercises, and recovery plans all from the comfort of your home.",
  },
  {
    question: "How do I book a same-day virtual PT appointment in NYC?",
    answer:
      "You can easily book online through our website. Choose your preferred time, and in many cases, same-day appointments are available for immediate care.",
  },
  {
    question: "Does Teletherapy PT NYC accept insurance?",
    answer:
      "Yes, we accept most major insurance plans as well as self-pay options. You can use the Check Eligibility button to verify your coverage instantly.",
  },
  {
    question: "Is Virtual Physical Therapy as effective as in-person sessions?",
    answer:
      "Yes. Studies show that teletherapy physical therapy can be just as effective for many conditions, especially for pain relief, post-surgery rehab, and mobility improvement.",
  },
  {
    question: "How long is a virtual physical therapy session?",
    answer:
      "Sessions typically last 30 to 60 minutes, depending on your condition and treatment plan.",
  },
  {
    question: "What happens after my first session?",
    answer:
      "Your therapist will assess your condition, create a personalized treatment plan, guide you through exercises, and schedule follow-up sessions if needed.",
  },
  {
    question: "Is my information secure during teletherapy sessions?",
    answer:
      "Yes. All sessions are conducted through HIPAA-compliant secure platforms to protect your privacy.",
  },
  {
    question:"What should I expect after booking my Teletherapy session?",
    answer:`
    - Digital Intake Form: You will receive an email from @ptofthecity.com shortly. Please complete this digital form before your session so your therapist can review your medical history.

- Digital Invoice: A separate email from @ptofthecity.com will be sent containing your digital invoice. You can securely pay your service fee online through this link prior to your visit.

- Session Preparations: You will receive a guide to help you set up your home "clinic". This includes a checklist of household items you can use as gym alternatives and steps to optimize your tech setup.
    `
  },
  {
    question:" How do I prepare my home for a Teletherapy session?",
    answer:`
    To get the most out of your visit, please follow these preparation steps:

- Clear Your Space: Ensure you have a clear 6x8 ft area free of rugs or trip hazards.

- Optimize Your Tech: Use a laptop or tablet if possible, and wear headphones/earbuds to prevent echoes and maintain privacy.

- Check Your Lighting: Ensure your light source is in front of you so the therapist can clearly see your movements.

- Gather "Equipment": You don't need a professional gym; common items like canned goods (for weights), a broomstick (for mobility), or a sturdy water bottle (for rolling) work perfectly.

- Safety First: If you have known balance issues, please ensure your "Safety Person" is present in the room with you.`
  }

];

const openIndex = ref(0);

const toggleFaq = (index: number) => {
  openIndex.value = openIndex.value === index ? -1 : index;
};

const formatAnswer = (answer: string) => {
  const lines = answer
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const paragraphs: string[] = [];
  const bullets: string[] = [];

  lines.forEach((line) => {
    if (line.startsWith("-")) {
      bullets.push(line.replace(/^-+\s*/, ""));
    } else {
      paragraphs.push(line);
    }
  });

  return {
    paragraphs,
    bullets,
  };
};
</script>

<template>
  <section class="telehealth-section faq-section">
    <div class="faq-shell">
      <h2>FAQs</h2>

      <div class="faq-list">
        <article
          v-for="(faq, index) in faqs"
          :key="faq.question"
          :class="['faq-item', { open: openIndex === index }]"
        >
          <button
            type="button"
            class="faq-trigger"
            @click="toggleFaq(index)"
            :aria-expanded="openIndex === index"
          >
            <span class="faq-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  v-if="openIndex === index"
                  d="M7 10l5 5 5-5"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  v-else
                  d="M10 7l5 5-5 5"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <span class="faq-question">{{ faq.question }}</span>
          </button>

          <div v-if="openIndex === index" class="faq-answer">
            <template v-for="paragraph in formatAnswer(faq.answer).paragraphs" :key="paragraph">
              <p>{{ paragraph }}</p>
            </template>

            <ul v-if="formatAnswer(faq.answer).bullets.length" class="faq-bullets">
              <li v-for="bullet in formatAnswer(faq.answer).bullets" :key="bullet">
                {{ bullet }}
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.telehealth-section {
  @include pagePadding;
  margin-top: 2.5rem;
  

  @media screen and (max-width: 700px) {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }
}

.faq-shell {
  background: #CFEEE8;
  border-radius: 1.5rem;
  padding: 1.25rem;

  h2 {
    color: #048E73;
    font-size: clamp(2.8rem, 4vw, 3.8rem);
    line-height: 1;
    margin-bottom: 1rem;
    font-weight: 600;
  }
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.faq-item {
  border-radius: 1rem;
  overflow: hidden;

  &.open {
    background: #fff;
    box-shadow: 0 8px 20px rgba(35, 102, 129, 0.06);
  }
}

.faq-trigger {
  width: 100%;
  background: transparent;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.55rem 0.35rem;
  text-align: left;
  cursor: pointer;
  color: #18383f;

  .faq-item.open & {
    padding: 0.7rem 0.85rem 0.25rem;
  }
}

.faq-icon {
  width: 1.2rem;
  height: 1.2rem;
  display: inline-flex;
  flex-shrink: 0;

  svg {
    width: 100%;
    height: 100%;
  }
}

.faq-question {
  font-size: 1.25rem;
  font-weight: 700;
  margin-top: 0.5rem;
  color: #18383f;
  line-height: 1.35;
}

.faq-answer {
  padding: 0 0.85rem 0.85rem 2.05rem;

  p {
    color: #18383f;
    font-size: 1rem;
    line-height: 1.45;
    max-width: 41rem;
    font-weight: 500;
    margin-bottom: 0.75rem;
  }

  p:last-child {
    margin-bottom: 0;
  }
}

.faq-bullets {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-top: 0.35rem;
  padding-left: 1.1rem;
  max-width: 48rem;

  li {
    color: #18383f;
    font-size: 1rem;
    line-height: 1.6;
    font-weight: 500;
  }
}
</style>
