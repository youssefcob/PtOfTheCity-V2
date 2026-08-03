<script setup lang="ts">
// Custom pages can override the section content; defaults match the original copy
interface TimelineStep {
  title: string;
  text: string;
}

withDefaults(
  defineProps<{
    eyebrow?: string;
    heading?: string;
    steps?: TimelineStep[];
  }>(),
  {
    eyebrow: 'Your Recovery Path',
    heading: 'From First Call to Feeling Like Yourself Again',
    steps: () => [
      { title: 'Book Appointment', text: 'Request online or call — most patients are seen within 24 hours.' },
      { title: 'Evaluation', text: 'A full one-on-one assessment to pinpoint the root cause.' },
      { title: 'Treatment Plan', text: 'A personalized program built around your goals and timeline.' },
      { title: 'Recovery', text: "Progress tracked every visit until you're back to full strength." },
    ],
  },
);
</script>

<template>
  <section class="section section-alt">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">{{ eyebrow }}</span>
        <h2>{{ heading }}</h2>
      </div>
      <div class="timeline">
        <div v-for="(step, i) in steps" :key="step.title" class="timeline-step reveal">
          <div class="step-circle">{{ i + 1 }}</div>
          <div>
            <h4>{{ step.title }}</h4>
            <p>{{ step.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
