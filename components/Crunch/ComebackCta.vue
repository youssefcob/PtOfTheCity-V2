<template>
  <section class="comeback">
    <div class="comeback__box">
      <div>
        <h2 class="comeback__title">Your comeback starts before the setback.</h2>
        <p class="comeback__text">
          Claim your complimentary assessment now and keep your member perk ready when you need it.
        </p>
      </div>

      <CrunchButton href="#claim" class="comeback__cta">
        Claim my perk
        <template #icon>
          <CrunchIcon name="arrow-up" :size="16" />
        </template>
      </CrunchButton>
    </div>
  </section>
</template>

<style scoped lang="scss">
.comeback {
  padding: 42px var(--crunch-gutter) 100px;
  background: #fff;

  @media screen and (max-width: 800px) {
    padding-top: 28px;
    padding-bottom: 56px;
  }
}

.comeback__box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  padding: 44px;
  border-radius: 24px;
  background: $crunch-ink;

  @media screen and (max-width: 800px) {
    flex-direction: column;
    align-items: stretch;
    gap: 20px;
    padding: 24px;
    border-radius: 20px;
  }
}

.comeback__title {
  color: #fff;
  font-family: $crunch-font-heading;
  font-size: 34px;
  font-weight: 700;
  line-height: 1;
  text-transform: uppercase;

  @media screen and (max-width: 800px) {
    font-size: 26px;
    line-height: 27px;
  }
}

.comeback__text {
  margin-top: 8px;
  color: #D5D2CC;

  @media screen and (max-width: 800px) {
    margin-top: 16px;
    line-height: 23px;
  }
}

.comeback__cta {
  flex-shrink: 0;
}
</style>
