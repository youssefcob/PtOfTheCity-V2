<script setup lang="ts">
const stats = [
  {
    value: '32',
    label: 'NYC CLINICS',
  },
  {
    value: '4.8★',
    label: 'AVERAGE RATING',
  },
  {
    value: '50K+',
    label: 'PATIENTS SERVED',
  },
  {
    value: '100%',
    label: 'LICENSED STAFF',
  },
];

const testimonials = [
  {
    initials: 'DM',
    name: 'DAVID M.',
    package: '10-Session Package · Sports Rehab · Midtown',
    quote:
      'I’ve been playing golf for 20 years and my lower back finally caught up with me. Scanned the QR at my club, booked the 10-session package, and the difference after 6 sessions was remarkable. The Midtown clinic was incredibly convenient.',
  },
  {
    initials: 'CR',
    name: 'CARLOS R.',
    package: '10-Session Package · Post-Surgical · Brooklyn',
    quote:
      'Post-rotator cuff surgery, I needed the right team. PT of the City’s Brooklyn clinic was a 10-minute drive from my home course. The Bench Craft discount made it easy to commit to the full recovery plan.',
  },
  {
    initials: 'SL',
    name: 'SANDRA L.',
    package: '5-Session Package · Orthopedic · Queens',
    quote:
      'The insurance verification was seamless — they handled everything and I paid almost nothing out of pocket. The therapist at Astoria was exceptional. Already back to par.',
  },
];
</script>

<template>
  <section class="testimonials-section">
    <div class="testimonials-inner">
      <div class="testimonials-header">
        <span class="testimonials-label">
          WHAT GOLFERS SAY
        </span>

        <h2 class="testimonials-title">
          TRUSTED BY THOUSANDS <br>
          OF NYC PATIENTS
        </h2>
      </div>

      <div class="stats-grid">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="stat-card"
        >
          <div class="stat-value">
            {{ stat.value }}
          </div>

          <div class="stat-label">
            {{ stat.label }}
          </div>
        </div>
      </div>

      <div class="testimonials-grid">
        <div
          v-for="testimonial in testimonials"
          :key="testimonial.name"
          class="testimonial-card"
        >
          <div class="stars">
            ★★★★★
          </div>

          <p class="testimonial-quote">
            "{{ testimonial.quote }}"
          </p>

          <div class="testimonial-user">
            <div class="avatar">
              {{ testimonial.initials }}
            </div>

            <div class="user-details">
              <div class="user-name">
                {{ testimonial.name }}
              </div>

              <div class="user-package">
                {{ testimonial.package }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
$bc-label: #148b8b;
$bc-heading: #1f3530;
$bc-text: #4a5568;
$bc-muted: #718096;
$bc-border: #d8e6e6;
$bc-star: #f4a11a;

.testimonials-section {
  width: 100%;
  background: #f6f8f8;
  padding: 5rem 6.25rem;

  @media screen and (max-width: 1100px) {
    padding: 4rem 2rem;
  }

  @media screen and (max-width: 600px) {
    padding: 3rem 1.2rem;
  }
}

.testimonials-inner {
  max-width: 1400px;
  margin: 0 auto;
}

.testimonials-header {
  margin-bottom: 2.5rem;
}

.testimonials-label {
  font-family: 'DM Sans', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: $bc-label;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.testimonials-title {
  font-family: 'Encode Sans Expanded', sans-serif;
  font-size: 3rem;
  font-weight: 800;
  color: $bc-heading;
  line-height: 1.1;
  margin-top: 0.75rem;

  @media screen and (max-width: 768px) {
    font-size: 2.2rem;
  }

  @media screen and (max-width: 500px) {
    font-size: 1.8rem;
  }
}

/* Stats */

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 3rem;

  @media screen and (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

.stat-card {
  background: white;
  border: 1px solid $bc-border;
  border-radius: 14px;
  min-height: 100px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.stat-value {
  font-family: 'DM Sans', sans-serif;
  font-size: 3rem;
  font-weight: 800;
  color: #555555;
  line-height: 1;
}

.stat-label {
  margin-top: 0.5rem;

  font-family: 'DM Sans', sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: $bc-muted;
}

/* Testimonials */

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;

  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
}

.testimonial-card {
  background: white;
  border: 1px solid $bc-border;
  border-radius: 14px;
  padding: 1.5rem;

  display: flex;
  flex-direction: column;
}

.stars {
  color: $bc-star;
  font-size: 1rem;
  margin-bottom: 1rem;
  letter-spacing: 2px;
}

.testimonial-quote {
  font-family: 'DM Sans', sans-serif;
  font-size: 1.5rem;
  line-height: 1.9;
  font-style: italic;
  color: $bc-text;
  margin: 0 0 1.5rem;

  flex-grow: 1;
}

.testimonial-user {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.avatar {
  width: 34px;
  height: 34px;
  border-radius: 999px;

  background: $bc-label;
  color: white;

  display: flex;
  align-items: center;
  justify-content: center;

  font-family: 'DM Sans', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;

  flex-shrink: 0;
}

.user-name {
  font-family: 'DM Sans', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #1f2937;
}

.user-package {
  font-family: 'DM Sans', sans-serif;
  font-size: 1rem;
  color: $bc-label;
  margin-top: 0.15rem;
}
</style>