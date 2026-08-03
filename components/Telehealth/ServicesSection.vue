<script setup lang="ts">

const serviceGroups = [
  {
    title: "Movement & Sports",
    image: "/images/telehealth/service-01.png",
    alt: "Physical therapy for sports and movement recovery",
    tags: [
      "Sports Rehabilitation",
      "Gait Training",
      "Functional Capacity Evaluation",
    ],
  },
  {
    title: "Orthopedic & Physical Conditions",
    image: "/images/telehealth/service-02.png",
    alt: "Orthopedic rehabilitation treatment",
    tags: [
      "Orthopedic Rehabilitation",
      "Hand Therapy",
      "Pelvic Floor Rehabilitation",
    ],
  },
  {
    title: "Neurological Care",
    image: "/images/telehealth/service-03.png",
    alt: "Neurological rehabilitation care",
    tags: [
      "Stroke & Neurological Rehabilitation",
      "Vestibular Rehabilitation",
    ],
  },
  // {
  //   title: "Specialized Care",
  //   image: "/images/telehealth/service-04.png",
  //   alt: "Specialized pediatric rehabilitation care",
  //   tags: ["Pediatric Rehabilitation"],
  // },
];
</script>

<template>
  <section class="telehealth-section telehealth-services">
    <h2>Our Services</h2>

    <div class="services-grid">
      <article
        v-for="group in serviceGroups"
        :key="group.title"
        class="service-card"
      >
        <div class="service-image-wrap">
          <img :src="group.image" :alt="group.alt" />
        </div>

        <div class="service-content">
          <h3>{{ group.title }}</h3>

          <div class="service-tags">
            <span v-for="tag in group.tags" :key="tag" class="service-tag">
              {{ tag }}
            </span>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped lang="scss">
.telehealth-section {
  @include pagePadding;
  margin-top: 2.5rem;
  // margin-bottom: 2.5rem;

  @media screen and (max-width: 700px) {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }
}

.telehealth-services {
  h2 {
    color: #048E73;
    font-size: clamp(3rem, 4vw, 4.4rem);
    line-height: 1;
    margin-bottom: 2rem;
    font-weight: 600;
  }
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;

  @media screen and (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media screen and (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

.service-card {
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
  margin-bottom: 4rem;
}

.service-image-wrap {
  overflow: hidden;
  border-radius: 1.5rem;
  min-height: 20rem;

  img {
    width: 100%;
    max-height: 20rem;
    object-fit: cover;
    display: block;
  }
}

.service-content {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;

  h3 {
    color: #0b998f;
    font-size: clamp(1.7rem, 2vw, 2.15rem);
    line-height: 1.2;
    font-weight: 700;
    max-width: 18rem;
  }
}

.service-tags {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  align-items: flex-start;
}

.service-tag {
  display: inline-flex;
  align-items: center;
  min-height: 2.3rem;
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
  border: 1px solid #39d7bf;
  background: #fff;
  color: #18383f;
  font-size: 1.2rem;
  line-height: 1.2;
  box-shadow: 0 4px 12px rgba(35, 102, 129, 0.08);
}
</style>
