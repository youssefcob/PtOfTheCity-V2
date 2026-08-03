<script setup lang="ts">
const openIndex = ref<number | null>(0);

const faqs = [
  { q: "Do I need a doctor's referral to start physical therapy?", a: 'In New York, you can start treatment directly with us under Direct Access — no referral required for most cases. If your insurance requires one, our front desk will help coordinate it.' },
  { q: 'Is physical therapy covered by my insurance?', a: 'Most major plans, including Aetna, Cigna, UnitedHealthcare, Blue Cross Blue Shield, Medicare, and Humana, cover physical therapy. We verify your benefits before your first visit at no charge, so you know your costs upfront.' },
  { q: 'How much pain should I expect during treatment?', a: 'Some mild discomfort during specific exercises is normal, but treatment should never leave you in significant pain. Your therapist continuously adjusts intensity based on your feedback at every session.' },
  { q: 'How soon can I get an appointment?', a: 'Most new patients are seen the same day or next business day. Submit the form above or call us directly, and our team will confirm a time within one hour.' },
  { q: 'What should I bring to my first visit?', a: 'Bring a photo ID, your insurance card, and any relevant imaging or physician notes if you have them. Wear comfortable clothing that allows movement around the area being treated.' },
  { q: 'How long until I see results?', a: 'Many patients feel improvement within 2–3 sessions, though full recovery timelines depend on the condition. Your therapist will outline expected milestones during your initial evaluation.' },
];

const answerRefs = ref<(HTMLElement | null)[]>([]);

const toggle = (i: number) => {
  openIndex.value = openIndex.value === i ? null : i;
};

const answerHeight = (i: number) => {
  const el = answerRefs.value[i];
  return el ? el.scrollHeight : 0;
};
</script>

<template>
  <section class="section" id="faq">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">FAQ</span>
        <h2>Common Questions</h2>
      </div>
      <div class="faq-list">
        <div v-for="(faq, i) in faqs" :key="i" class="faq-item reveal" :class="{ open: openIndex === i }">
          <button class="faq-q" :aria-expanded="openIndex === i" @click="toggle(i)">
            {{ faq.q }}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14" /></svg>
          </button>
          <div class="faq-a" :style="openIndex === i ? { maxHeight: answerHeight(i) + 'px' } : {}">
            <div :ref="el => { if (el) answerRefs[i] = el as HTMLElement }" class="faq-a-inner">
              {{ faq.a }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
