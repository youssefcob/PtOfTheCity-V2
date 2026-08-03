<template>
  <section class="services">
    <div class="services__header">
      <p class="bm-eyebrow">Our Specialties</p>
      <h2 class="bm-heading">Healthcare services covered by this offer</h2>
      <p class="bm-sub">
        All specialties are available through your Beyond Med member discount.
        Select one or mix sessions across them.
      </p>
    </div>

    <div class="services__grid">
      <div v-for="card in cards" :key="card.title" class="service-card" :class="card.size"
        :style="{ backgroundImage: `url('${card.image}')` }">
        <div class="service-card__content">
          <h3 class="service-card__title">{{ card.title }}</h3>
          <div class="service-card__tags">
            <span v-for="tag in card.tags" :key="tag" class="service-tag">{{ tag }}</span>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script lang="ts" setup>
const cards = [
  {
    title: 'Movement & Sports',
    size: 'card--wide',
    image: 'https://res.cloudinary.com/dzilc11zf/image/upload/v1754171112/ptofthecity/services/Sports%20Rehabilitation.webp',
    tags: ['Sports Rehabilitation', 'Gait Training', 'Functional Capacity Evaluation'],
  },
  {
    title: 'Specialized Care',
    size: 'card--normal',
    image: 'https://res.cloudinary.com/dzilc11zf/image/upload/v1754171834/ptofthecity/services/Pediatric_Rehabilitation.webp',
    tags: ['Pediatric Rehabilitation'],
  },
  {
    title: 'Neurological Care',
    size: 'card--normal',
    image: 'https://res.cloudinary.com/dzilc11zf/image/upload/v1754171901/ptofthecity/services/Stroke_Neurological_Rehabilitation.webp',
    tags: ['Stroke & Neurological Rehabilitation', 'Vestibular Rehabilitation'],
  },
  {
    title: 'Orthopedic & Physical Conditions',
    size: 'card--wide',
    image: 'https://res.cloudinary.com/dzilc11zf/image/upload/v1754171143/ptofthecity/services/Orthopedic%20Rehabilitation.webp',
    tags: ['Orthopedic Rehabilitation', 'Hand Therapy', 'Pelvic Floor Rehabilitation', 'Lymphedema Treatment'],
  },
];
</script>

<style lang="scss" scoped>
.services {
  background: #fff;
  font-family: $montserrat;
}

.services__header {
  padding: 7rem 10rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  // max-width: 560px;

  @media (max-width: 1000px) {
    padding: 4rem 2rem 2rem;
  }
}

/* ── Grid ── */
.services__grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 450px 450px;
  gap: 2rem;
  padding: 0 3rem;

  @media (max-width: 1000px) {
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    padding: 0 2rem;
    gap: 1rem;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
  }
}

.service-card {
  position: relative;
  border-radius: 1.25rem;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.72) 0%, rgba(0, 0, 0, 0.1) 55%, transparent 100%);
    border-radius: inherit;
  }

  &:nth-child(1) {
    grid-column: 1 / 3;
    grid-row: 1;
  }

  &:nth-child(2) {
    grid-column: 3;
    grid-row: 1;
  }

  &:nth-child(3) {
    grid-column: 1;
    grid-row: 2;
  }

  &:nth-child(4) {
    grid-column: 2 / 4;
    grid-row: 2;
  }

  @media (max-width: 1000px) {
    flex-shrink: 0;
    width: 75vw;
    height: 300px;
    scroll-snap-align: start;

    &:nth-child(n) {
      grid-column: unset;
      grid-row: unset;
    }
  }
}

.service-card__content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  padding: 1.75rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.service-card__title {
  font-family: $helvetica;
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
  line-height: 1.2;
}

.service-card__tags {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.service-tag {
  display: inline-block;
  border: 1px solid rgba(255, 255, 255, 0.6);
  color: #fff;
  font-size: 1.1rem;
  border-radius: 999px;
  padding: 0.3rem 1rem;
  backdrop-filter: blur(4px);
  background: rgba(255, 255, 255, 0.1);
  // width:280px;
}

/* ── Footer bar ── */
.services__footer {
  margin-top: 0.75rem;
  // background: #1a1a1a;
  padding: 2rem 10rem;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 1000px) {
    padding: 2rem;
    justify-content: stretch;
  }
}

.services__cta {
  background: transparent;
  border: 1.5px solid $cta;
  color: black;
  border-radius: 0.75rem;
  padding: 0.9rem 2.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  font-family: $montserrat;
  cursor: pointer;
  transition: all 0.2s;
  width: 20rem;

  &:hover {
    background: rgba($cta, 0.1);
  }

  @media (max-width: 1000px) {
    width: 100%;
  }
}
</style>
