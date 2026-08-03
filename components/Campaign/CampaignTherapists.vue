<script setup lang="ts">
const team = [
  { initial: 'JR', name: 'Dr. James Reyes, DPT', role: 'Orthopedic Specialist', text: '12 years treating back, knee, and shoulder injuries. OCS Board Certified.' },
  { initial: 'AK', name: 'Dr. Anna Kim, DPT', role: 'Sports Rehabilitation', text: 'Former collegiate athletic trainer specializing in return-to-play protocols.' },
  { initial: 'MO', name: 'Dr. Marcus Ogundipe, DPT', role: 'Neurological Rehab', text: 'Certified stroke & vestibular rehab specialist with 9 years of clinical experience.' },
  { initial: 'EP', name: 'Dr. Elena Petrova, DPT', role: 'Pelvic & Hand Therapy', text: 'Dual-certified in pelvic floor and hand therapy with a patient-first approach.' },
];
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">Meet Our Therapists</span>
        <h2>Board-Certified. Specialty-Trained. Genuinely Invested.</h2>
      </div>
      <div class="team-grid">
        <div v-for="member in team" :key="member.name" class="team-card reveal">
          <div class="team-avatar">{{ member.initial }}</div>
          <h3>{{ member.name }}</h3>
          <div class="team-role">{{ member.role }}</div>
          <p>{{ member.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
