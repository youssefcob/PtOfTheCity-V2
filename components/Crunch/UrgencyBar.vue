<template>
  <section class="urgency">
    <h2 class="urgency__title">Limited time &amp; limited spots available!</h2>
    <p class="urgency__text">This is a special Grand Opening offer. Spots will fill up fast—don't miss out!</p>
  </section>
</template>

<style scoped lang="scss">
.urgency {
  padding: 26px var(--crunch-gutter);
  background: $crunch-red;
  color: #fff;
  text-align: center;

  @media screen and (max-width: 800px) {
    padding-block: 28px;
  }
}

.urgency__title {
  font-family: $crunch-font-heading;
  font-size: 34px;
  font-weight: 700;
  line-height: 1;
  text-transform: uppercase;

  @media screen and (max-width: 800px) {
    font-size: 26px;
    line-height: 29px;
  }
}

.urgency__text {
  margin-top: 16px;
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;

  @media screen and (max-width: 800px) {
    margin-top: 10px;
    font-size: 16px;
    line-height: 23px;
  }
}
</style>
