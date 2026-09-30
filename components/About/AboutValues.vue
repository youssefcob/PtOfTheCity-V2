<script setup lang="ts">
import EditableText from '~/components/Admin/EditableText.vue';
import { vReveal } from '~/composables/useScrollReveal';
import AboutValueCard, { type AboutValueCardData } from '~/components/About/AboutValueCard.vue';

const stats = [
  { id: 'clinics', value: '32', label: 'Clinics Across NYC' },
  { id: 'clinicians', value: '100+', label: 'Licensed Clinicians' },
  { id: 'patients', value: '9999+', label: 'Patients Helped' },
];

const communityCard: AboutValueCardData = {
  id: 'community',
  title: 'Community First',
  body: 'Every neighborhood deserves access to exceptional rehabilitation and compassionate care.',
  variant: 'cyan',
  photo: true,
  hidePhotoOnMobile: true,
};

const middleColumn: AboutValueCardData[] = [
  {
    id: 'care',
    title: 'Care Without Compromise',
    body: 'Evidence-based treatment delivered with empathy, respect, and professionalism.',
    variant: 'cyan-textured',
  },
  {
    id: 'better',
    title: 'Better Every Day',
    body: 'We believe continuous learning and innovation create better outcomes for every patient.',
    variant: 'sand',
    photo: true,
    hidePhotoOnMobile: true,
  },
];

const rightColumn: AboutValueCardData[] = [
  {
    id: 'stronger',
    title: 'Stronger Together',
    body: 'Recovery is a partnership between our therapists, our patients, and the communities we proudly serve.',
    variant: 'dark',
    photo: true,
    hidePhotoOnMobile: true,
  },
  {
    id: 'care_2',
    title: 'Care Without Compromise',
    body: 'Evidence-based treatment delivered with empathy, respect, and professionalism.',
    variant: 'sand-textured',
  },
];

const ck = (s: string) => `about.values.${s}`;
</script>

<template>
  <section class="about-values">
    <div class="left-column">
      <div class="mission-card">
        <img class="texture" src="/images/home/texture-pattern.webp" alt="" aria-hidden="true" />
        <div class="mission-copy">
          <EditableText v-reveal="'rise'" tag="h2" class="mission-title" :content-key="ck('mission.title')"
            default="Move Better. Live Fully. Care Deeply." />
          <EditableText v-reveal="'rise'" tag="p" class="mission-body" :content-key="ck('mission.body')"
            default="Movement changes lives. Every patient has a different story, different goals, and different challenges. Our mission is to provide personalized care that empowers people to return to the moments that matter most." />
        </div>
      </div>
      <AboutValueCard :card="communityCard" :class="`card--${communityCard.id}`" />
    </div>

    <div class="stats">
      <div v-for="stat in stats" :key="stat.id" v-reveal="'slide-in'" class="stat">
        <EditableText tag="p" class="stat-value" :content-key="ck(`stats.${stat.id}.value`)" :default="stat.value" />
        <EditableText tag="p" class="stat-label" :content-key="ck(`stats.${stat.id}.label`)" :default="stat.label" />
      </div>
    </div>

    <div class="card-column middle-column">
      <AboutValueCard v-for="card in middleColumn" :key="card.id" :card="card" :class="`card--${card.id}`" />
    </div>
    <div class="card-column right-column">
      <AboutValueCard v-for="card in rightColumn" :key="card.id" :card="card" :class="`card--${card.id}`" />
    </div>
  </section>
</template>

<style scoped lang="scss">
// Three columns: the mission + Community First cards run down the left, the
// stats row spans the other two, then two staggered card columns below it.
.about-values {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-areas:
    'left stats stats'
    'left middle right';
  grid-template-rows: auto 1fr;
  column-gap: 2.4rem;
  row-gap: 2.8rem;
  // stretch so all three columns end at the same line (see AboutValueCard)
  align-items: stretch;
  @include pagePadding();

  @media screen and (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-areas:
      'stats stats'
      'left middle'
      'left right';
    grid-template-rows: auto;
  }

  // Mobile: one stack in a fixed order - mission, stats, Community First,
  // Better Every Day, Stronger Together, Care Without Compromise. The column
  // wrappers dissolve (display: contents) so each card can be ordered on its own.
  @media screen and (max-width: 700px) {
    display: flex;
    flex-direction: column;
    gap: 2.4rem;

    .left-column,
    .card-column {
      display: contents;
    }

    .mission-card { order: 1; }
    .stats { order: 2; }
    .card--community { order: 3; }
    .card--better { order: 4; }
    .card--stronger { order: 5; }
    .card--care_2 { order: 6; }

    // the two "Care Without Compromise" cards repeat the same copy - only one shows on mobile
    .card--care { display: none; }
  }

  :deep(span) {
    color: inherit;
  }
}

.left-column {
  grid-area: left;
  display: flex;
  flex-direction: column;
  gap: 3.5rem;

  @media screen and (max-width: 1100px) {
    gap: 2.4rem;
  }
}

.stats {
  grid-area: stats;
  display: flex;
  flex-wrap: wrap;
  gap: 2.4rem;

  @media screen and (max-width: 700px) {
    flex-direction: column;
  }
}

.middle-column {
  grid-area: middle;
}

.right-column {
  grid-area: right;
}

.card-column {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
}

.mission-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 36.8rem;
  padding: 1.6rem 3.2rem;
  background-color: $primary-600;
  overflow: hidden;
}

.texture {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.2;
  pointer-events: none;
}

.mission-copy {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  color: #ffffff;
}

.mission-title {
  // global h2/h3/p rules in _classes.scss would otherwise set their own color
  color: inherit;
  @include type-h2;
  text-transform: uppercase;
}

.mission-body {
  color: inherit;
  @include type-body;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 0 1.6rem;
  border-left: 1px solid $primary-base;

  &:not(:last-child) {
    width: 28.2rem;
  }

  @media screen and (max-width: 700px) {
    flex: none;
    width: auto !important;
  }
}

.stat-value {
  @include type-h2;
  text-transform: uppercase;
  color: $primary-600;
}

.stat-label {
  @include type-body;
  color: $primary-700;
}
</style>
