<script setup lang="ts">
const infoCards = [
  { title: 'Golf Member', subtitle: 'Exclusive Benefits' },
  { title: '32 Clinics', subtitle: 'Across NYC' },
  { title: 'Self-Pay Recovery', subtitle: '& Performance Options' },
  { title: 'All Major Insurance', subtitle: 'Accepted' },
  { title: 'Sports Injury', subtitle: '& Performance Specialists' },
  { title: 'Golf-Focused Movement', subtitle: '& Recovery Care' },
];
</script>

<template>
  <section :id="String($attrs.id)" class="hero">
    <!-- Background video -->
    <video
      class="hero-video"
      autoplay
      muted
      loop
      playsinline
      poster="https://res.cloudinary.com/ptofthecity/image/upload/v1/benchcraft/hero-bg.jpg"
      src="https://res.cloudinary.com/dqgkgczq9/video/upload/v1781205453/benchcraft_aukhb4.mp4"
    >
      <source src="" type="video/mp4" />
    </video>

    <!-- Background overlay -->
    <div class="hero-overlay"></div>

    <div class="hero-inner">
      <!-- Left content -->
      <div class="hero-left">
        <div class="branding">
          <img src="/images/logo-white.webp" alt="PT of The City" class="brand-logo brand-logo--pt" />
          <!-- <span class="brand-separator"></span> -->
          <!-- <img src="/images/benchCraftLogo.png" alt="BenchCraft" class="brand-logo brand-logo--bc" /> -->
        </div>

        <h1 class="headline">
          YOUR SWING DESERVES
          <br /> A
          <span class="highlight">STRONGER BODY</span>
          <br />
          <span class="headline"> BEHIND IT<span class="highlight-dot">.</span></span>
        </h1>
        <div class="subheadline-container">
          
        </div>

        <p class="description">
          You’ve just unlocked exclusive access to PT of The City — built for golfers who want to move better, stay injury-free, and continue performing at a high level.
          <br /><br />
        </p>

        <div class="info-cards">
          <div
            v-for="card in infoCards"
            :key="card.title"
            class="info-card"
          >
            <span class="info-card__title">{{ card.title }}</span>
            <span class="info-card__subtitle">{{ card.subtitle }}</span>
          </div>
        </div>

        <!-- <p class="partner-badge">OFFICIAL RECOVERY PARTNER OF BENCH CRAFT GOLF</p> -->
      </div>

      <!-- Right booking form -->
      <div class="hero-right">
        <BenchcraftBookingForm />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
// Benchcraft page-specific colors
$bc-primary: #0b1d2e;
$bc-secondary: #16213e;
$bc-accent: #5FCFCF;
$bc-accent-dark: #1fa0b2;
$bc-gold: #c9a84c;
$bc-white: #ffffff;
$bc-text-muted: #b0b0b0;

.hero {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $bc-primary;
}

.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  opacity: 0.50;
  background: linear-gradient(
    25deg,
    #0D1F35F2,
    #0B8B8BB2,
    #2E6B3E80
  );
  z-index: 1;
}

.hero-inner {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem 6.25rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 3rem;

  @media screen and (max-width: 1100px) {
    flex-direction: column;
    align-items: center;
    padding: 3rem 2rem;
  }

  @media screen and (max-width: 500px) {
    padding: 2rem 1rem;
    align-items: center;
  }
}

.hero-left {
  flex: 1;
  max-width: 60%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media screen and (max-width: 1100px) {
    max-width: 100%;
    text-align: left;
    align-items: center;
  }

  @media screen and (max-width: 500px) {

    text-align: left;

    align-items: flex-start;

    width: 100%;

  }
}

.branding {
  display: flex;
  align-items: center;
  gap: 1rem;

  .brand-logo {
    height: 3rem;
    width: auto;
    object-fit: contain;

    &--pt {
      height: 5rem;
    }

    &--bc {
      height: 5rem;
    }

    @media screen and (max-width: 500px) {
      &--pt { height: 5.5rem; margin-top: 2.5rem; }
      &--bc { height: 5.5rem; margin-top: 2.5rem; margin-bottom: 1.5rem; }
    }
  }

  .brand-separator {
    width: 1px;
    height: 2.5rem;
    background: rgba(255, 255, 255, 0.5);
  }

  @media screen and (max-width: 500px) {
    flex-direction: column;
    gap: 0.5rem;
    align-self: center;
    width: 100%;
    align-items: center;

    .brand-separator {
      display: none;
    }
  }
}


.headline {
  color: #FFF;
  font-family: 'Encode Sans Expanded', sans-serif;
  font-size: 51.2px;
  font-style: normal;
  font-weight: 1000;
  line-height: 56.32px;
  letter-spacing: -0.5px;
  text-transform: uppercase;

  .highlight {
    color: $bc-accent;
    font-family: 'Encode Sans Expanded', sans-serif;
    font-size: 51.2px;
    font-style: normal;
    font-weight: 1000;
    line-height: 56.32px;
    letter-spacing: -0.5px;
    text-transform: uppercase;
  }

  .headline-line3 {
    display: block;
  }

  .highlight-dot {
    color: #E4C97A;
    font-family: "Encode Sans Expanded";
    font-size: 51.2px;
    font-style: normal;
    font-weight: 800;
    line-height: 56.32px;
    letter-spacing: -0.5px;
    text-transform: uppercase;
  }

  @media screen and (max-width: 800px) {
    
    font-size: 2rem;
    line-height: 1.1;

    .highlight {
      font-size: 2.2rem;
      line-height: 1.1;
    }
  }

  @media screen and (max-width: 500px) {
    font-size: 2.5rem;
    line-height: 1.05;
    text-align: left;

    .highlight {
      font-size: 2.5rem;
      line-height: 1.05;
    }

    .highlight-dot {
      font-size: 2.5rem;
      line-height: 1.05;
    }
  }
}

.subheadline {
  color: #E4C97A;
  font-family: "DM Sans";
  font-size: 16.8px;
  font-style: normal;
  font-weight: 400;
  line-height: 29.4px;
}

.subheadline-container {
  @media screen and (max-width: 500px) {
    display: none; // Hidden on mobile per Figma — replaced by new description copy
  }
}

.description {
  color: #FFF;
  width: 70%;
  font-family: "DM Sans";
  font-size: 1.75rem;
  font-style: normal;
  font-weight: 600;
  line-height: 29.4px;

  @media screen and (max-width: 1100px) {
    max-width: 100%;
  }

  @media screen and (max-width: 500px) {
    width: 60%;
    // font-size: 1.975rem;
    font-weight: 400;
    line-height: 1.65;
    text-align: left;
    font-size: 1.5rem;
    // Updated copy is handled in template via v-if or just naturally reads differently at this size
  }
}

.info-cards {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1rem;

  @media screen and (max-width: 1100px) {
    justify-content: center;
  }

  @media screen and (max-width: 500px) {
    flex-direction: column;
    align-self: flex-start;
    gap: 0.75rem;
    margin-top: 0;
  }
}

.info-card {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 0.5rem;
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;

  &__title {
    font-size: 1.4rem;
    font-weight: 600;
    color: $bc-white;
  }

  &__subtitle {
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.7);
  }

  @media screen and (max-width: 500px) {
    width: 100%;

    &__title {
      font-size: 2rem;
      font-weight: 700;
    }

    &__subtitle {
      font-size: 1.5rem;
    }
  }
}

.partner-badge {
  display: none;

  @media screen and (max-width: 500px) {
    display: block;
    font-family: 'Encode Sans Expanded', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #E4C97A;
    line-height: 1.5;
    text-align: left;
    margin-top: 0.5rem;
  }
}

.hero-right {
  flex-shrink: 0;
  width: 40%;

  @media screen and (max-width: 1100px) {
    width: 100%;
    max-width: 450px;
    display: flex;
    justify-content: center;
  }

  @media screen and (max-width: 500px) {

    width: 100%;

    max-width: 450px;

    align-self: center;

    display: flex;

    justify-content: center;

  }
}
@media screen and (max-width: 500px) {
  .hero-left {
    align-items: center; // center the whole content block
    text-align: left;
  }

  
  .branding {
    width: auto;
    align-items: center; // logos stay centered
  }

  .headline {
    width: 340px;
    text-align: left;
  }

  .description {
    width: 340px;
    max-width: 100%;
    text-align: left;
    margin: 0;
  }

  .info-cards {
    width: 340px;
    max-width: 100%;
    align-self: center;
    flex-direction: column;
  }

  .info-card {
    width: 100%;
  }

  .partner-badge {
    width: 340px;
    max-width: 100%;
    text-align: left;
  }

  .hero-right {
    :deep(> *) {
      width: 100%;
    }

    :deep(.booking-card) {
      margin: 0 auto;
    }
  }
}
</style>