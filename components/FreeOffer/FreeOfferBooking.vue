<script setup lang="ts">
import EditableText from '~/components/Admin/EditableText.vue';
import FreeOfferBookingForm from '~/components/FreeOffer/FreeOfferBookingForm.vue';

const offers = [
  {
    featured: true,
    title: 'Free Initial Consultation',
    text: 'Complete movement mapping and diagnostic evaluation with a senior clinician.',
  },
  {
    featured: false,
    title: 'Free Pelvic Floor Screening',
    text: 'Private, specialized baseline screening addressing functional pelvic health.',
  },
];

const benefits = [
  {
    title: 'Clinically Vetted Protocol',
    text: 'Your recovery pathway is built directly on evidence-based treatment regimens approved by hospital network clinical boards.',
  },
  {
    title: 'Elite Credentialing',
    text: 'Our doctors of physical therapy undergo continuous education and auditing aligned with major academic medical institutions.',
  },
  {
    title: 'Seamless Coordination',
    text: 'Direct care integrations allow for immediate medical record and imaging sharing with your entire Mount Sinai specialist team.',
  },
  {
    title: 'Expansive NYC Footprint',
    text: 'Premier access across key boroughs with modern, state-of-the-art facilities engineered for advanced biomechanical training.',
  },
  {
    title: 'Hospital-System Accountability',
    text: 'Subject to rigorous outcomes-tracking and safety metrics, ensuring your care matches prestigious hospital system standards.',
  },
];
</script>

<template>
  <section class="free-offer-booking">
    <div class="grid">
      <!-- Left: offers + benefits -->
      <div class="copy">
        <EditableText
          tag="p"
          class="eyebrow"
          content-key="free_offer.offers.eyebrow"
          default="Our Special Launch Offers (Limited Time)"
        />

        <div class="offer-list">
          <article
            v-for="(offer, i) in offers"
            :key="offer.title"
            class="offer-card"
            :class="{ featured: offer.featured }"
          >
            <span class="check" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <div class="offer-copy">
              <EditableText
                tag="h3"
                class="offer-title"
                :content-key="`free_offer.offers.${i + 1}.title`"
                :default="offer.title"
              />
              <EditableText
                tag="p"
                class="offer-text"
                :content-key="`free_offer.offers.${i + 1}.text`"
                :default="offer.text"
              />
            </div>
          </article>
        </div>

        <div class="divider" aria-hidden="true"></div>

        <EditableText
          tag="p"
          class="eyebrow"
          content-key="free_offer.benefits.heading"
          default="What It Means For You"
        />

        <ul class="benefit-list">
          <li v-for="(item, i) in benefits" :key="item.title">
            <span class="check small" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <div class="benefit-copy">
              <EditableText
                tag="p"
                class="benefit-title"
                :content-key="`free_offer.benefits.${i + 1}.title`"
                :default="item.title"
              />
              <EditableText
                tag="p"
                class="benefit-text"
                :content-key="`free_offer.benefits.${i + 1}.text`"
                :default="item.text"
              />
            </div>
          </li>
        </ul>
      </div>

      <!-- Right: form -->
      <FreeOfferBookingForm />
    </div>
  </section>
</template>

<style scoped lang="scss">
.free-offer-booking {
  @include pagePadding();
  padding-top: 8rem;
  padding-bottom: 9.6rem;
  background-color: $surface-cream;

  @media screen and (max-width: 1100px) {
    padding-top: 5.6rem;
    padding-bottom: 7.2rem;
  }

  @media screen and (max-width: 640px) {
    padding-top: 4rem;
    padding-bottom: 5.6rem;
  }
}

.grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(42rem, 52rem);
  gap: 6.4rem 8rem;
  align-items: start;

  @media screen and (max-width: 980px) {
    grid-template-columns: 1fr;
    gap: 4.8rem;
  }
}

.eyebrow {
  @include type-overline;
  margin: 0 0 2rem;
  color: $primary-600;
}

.offer-list {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.offer-card {
  display: flex;
  gap: 1.6rem;
  align-items: flex-start;
  padding: 2.4rem;
  background-color: $white;
  border: 1px solid $border-gray;

  &.featured {
    border-color: $primary-base;
    background-color: $surface-mint;
  }
}

.check {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  background-color: $surface-teal-pale;
  color: $primary-400;

  svg {
    width: 1.8rem;
    height: 1.8rem;
  }

  &.small {
    width: 2.8rem;
    height: 2.8rem;
    margin-top: 0.2rem;
  }
}

.offer-copy,
.benefit-copy {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  min-width: 0;
}

.offer-title {
  @include type-h4;
  margin: 0;
  color: $primary-600;
}

.offer-text {
  @include type-caption;
  margin: 0;
  color: $primary-700;
}

.divider {
  height: 1px;
  background-color: $border-gray;
  margin: 4rem 0;

  @media screen and (max-width: 640px) {
    margin: 3.2rem 0;
  }
}

.benefit-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  li {
    display: flex;
    gap: 1.2rem;
    align-items: flex-start;
  }
}

.benefit-title {
  @include type-button;
  margin: 0;
  color: $primary-600;
}

.benefit-text {
  @include type-caption;
  margin: 0;
  color: $primary-700;
}
</style>
