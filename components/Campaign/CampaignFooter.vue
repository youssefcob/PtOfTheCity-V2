<script setup lang="ts">
import { useCampaign } from '~/composables/useCampaign';

// Custom pages can override the footer content; defaults match the original copy
withDefaults(
  defineProps<{
    blurb?: string;
    email?: string;
    hours?: string[];
  }>(),
  {
    blurb: 'One-on-one physical therapy in NYC. Same-day appointments, most insurance accepted.',
    email: 'info@ptofthecity.com',
    hours: () => [
      'Mon – Fri: 7am – 7pm',
      'Saturday: 9am – 2pm',
      'Sunday: Closed',
    ],
  },
);

const { displayPhone, telLink, clinic } = useCampaign();

// Build the address from parts instead of trusting street_address to be
// pre-formatted with city/state/country baked in. If your clinic object's
// street_address field already includes city/state/zip, switch this back
// to just `clinic.street_address` and drop city/state below.
const addressLine = computed(() => {
  if (!clinic.value) return '';
  const parts = [clinic.value.street_address, clinic.value.city, clinic.value.state]
    .filter(Boolean);
  return parts.join(', ');
});
</script>

<template>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-about">
          <div class="footer-logo">
            <!-- <svg viewBox="0 0 40 40" fill="none" class="footer-logo-icon">
              <circle cx="20" cy="20" r="20" fill="#3CCFCF" />
              <path d="M12 20c0-3 2-6 5-7l1 3-3 2 3 2-1 3c-3-1-5-4-5-6z" fill="#0B3A42" />
              <path d="M28 20c0 3-2 6-5 7l-1-3 3-2-3-2 1-3c3 1 5 4 5 6z" fill="#0B3A42" />
            </svg> -->
            <span class="footer-logo-text">PT of the City</span>
          </div>
          <p class="footer-blurb">
            {{ blurb }}
          </p>
        </div>

        <div class="footer-col">
          <h5>Contact</h5>
          <ul>
            <li v-if="clinic">{{ addressLine }}</li>
            <li v-if="telLink"><a :href="telLink">{{ displayPhone }}</a></li>
            <li><a :href="`mailto:${email}`">{{ email }}</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h5>Hours</h5>
          <ul>
            <li v-for="h in hours" :key="h">{{ h }}</li>
          </ul>
        </div>

      </div>

      <div class="footer-bottom">
        <span>© {{ new Date().getFullYear() }} PT of the City. All rights reserved.</span>
        <span>Licensed Physical Therapy Clinic — State of New York</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: #ffffff;
  color: #33424a;
  padding: 3rem 0 1.5rem;
  border-top: 1px solid #e7edef;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr;
  gap: 2.5rem;
  padding-bottom: 2.5rem;
}

.footer-about {
  max-width: 360px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 700;
  font-size: 1.3rem;
  color: #0b3a42;
  margin-bottom: 1rem;
}

.footer-logo-icon {
  width: 38px;
  height: 38px;
  flex-shrink: 0;
}

.footer-blurb {
  color: #6b7a80;
  line-height: 1.6;
  font-size: 1.1rem;
  margin: 0;
}

.footer-col h5 {
  font-size: 0.95rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #0b3a42;
  margin: 0 0 1.1rem;
}

.footer-col ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-col li {
  color: #5a6a70;
  font-size: 1.1rem;
  line-height: 1.55;
}

.footer-col a {
  color: inherit;
  text-decoration: none;
}

.footer-col a:hover,
.footer-col a:focus-visible {
  color: #0b3a42;
  text-decoration: underline;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e7edef;
  font-size: 0.82rem;
  color: #8a969b;
}

@media (max-width: 860px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 540px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .footer-bottom {
    flex-direction: column;
  }
}
</style>