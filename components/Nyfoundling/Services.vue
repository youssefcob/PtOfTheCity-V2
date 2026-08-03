<script setup>
const services = [
  'Pediatric Rehabilitation',
  'Orthopedic Rehabilitation',
  'Sports Rehabilitation',
  'Physical Therapy',
  'GAIT Training',
  'Lymphedema Treatment',
  'Vestibular Rehabilitation',
  'Stroke & Neurological Rehabilitation',
  'Hand Therapy',
  'Functional Capacity Evaluation',
  'Cupping Treatment',
]
</script>

<template>
  <section class="services-section">
    <div class="container">
      <h2>Our Core Services</h2>

      <p class="subtitle">
        A comprehensive list of specialized physical therapy services available
        to NY Founding employees.
      </p>

      <div class="services-grid">
        <div
          v-for="service in services"
          :key="service"
          class="service-item"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="service-icon"
          >
            <g clip-path="url(#clip0)">
              <path
                d="M16.5 8.3099V8.9999C16.4991 10.6172 15.9754 12.1909 15.007 13.4863C14.0386 14.7816 12.6775 15.7293 11.1265 16.1878C9.57557 16.6464 7.91794 16.5913 6.40085 16.0308C4.88376 15.4703 3.58849 14.4345 2.70822 13.0777C1.82795 11.7209 1.40984 10.1159 1.51626 8.50213C1.62267 6.88832 2.24791 5.35214 3.29871 4.1227C4.34951 2.89326 5.76959 2.03644 7.34714 1.68001C8.92469 1.32358 10.5752 1.48665 12.0525 2.1449"
                stroke="#2EE5C1"
                stroke-width="1.5"
              />
              <path
                d="M16.5 3L9 10.5075L6.75 8.2575"
                stroke="#2EE5C1"
                stroke-width="1.5"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="18" height="18" fill="white" />
              </clipPath>
            </defs>
          </svg>

          <span>{{ service }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services-section {
  padding: 80px 0;
  background: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

h2 {
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  line-height: 1.2;
  color: #222;
}

.subtitle {
  margin: 8px 0 24px;
  font-size: 14px;
  line-height: 1.5;
  color: #777;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.service-item {
  display: flex;
  align-items: center;
  gap: 8px;

  min-height: 40px;
  padding: 0 14px;

  background: #eef3f2;
  border: 1px solid #dbe4e2;
  border-radius: 6px;

  font-size: 13px;
  font-weight: 500;
  color: #333;
}

.service-icon {
  flex-shrink: 0;
}

@media (max-width: 992px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .services-section {
    padding: 48px 0;
  }

  h2 {
    font-size: 24px;
  }

  .services-grid {
    grid-template-columns: 1fr;
  }
}
</style>