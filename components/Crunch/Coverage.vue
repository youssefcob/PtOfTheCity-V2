<template>
  <section class="coverage">
    <h2 class="coverage__title">Injured? Feeling tight? We’ve got you covered.</h2>

    <div class="coverage__body">
      <p class="coverage__lead">
        Whether you're pushing through a heavy lift, dealing with joint stiffness, or trying to prevent a future injury,
        PT of The City is here to keep you moving at your absolute best.
      </p>
      <p>As an exclusive Crunch Inwood member, we are offering you a comprehensive, 1-on-1 physical therapy assessment.</p>
      <p>
        The best part? You don’t have to be injured right now. Claim your perk today, and save your session on standby to
        use whenever you need it in the future.
      </p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.coverage {
  display: grid;
  grid-template-columns: minmax(0, 560fr) minmax(0, 664fr);
  column-gap: 72px;
  align-items: start;
  padding: 100px var(--crunch-gutter);
  background: $crunch-peach;

  @media screen and (max-width: 800px) {
    grid-template-columns: minmax(0, 1fr);
    row-gap: 24px;
    padding-block: 52px;
  }
}

.coverage__title {
  font-family: $crunch-font-heading;
  font-size: 50px;
  font-weight: 700;
  line-height: 0.98;
  text-transform: uppercase;

  @media screen and (max-width: 800px) {
    font-size: 34px;
  }
}

.coverage__body {
  display: flex;
  flex-direction: column;
  gap: 22px;
  color: $crunch-muted;
  font-size: 18px;
  line-height: 28px;

  @media screen and (max-width: 800px) {
    gap: 24px;
    font-size: 16px;
    line-height: 25px;
  }
}

.coverage__lead {
  color: $crunch-text;
  font-size: 20px;
  line-height: 30px;

  @media screen and (max-width: 800px) {
    font-size: 16px;
    line-height: 25px;
  }
}
</style>
