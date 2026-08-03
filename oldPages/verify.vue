<script setup lang="ts">
definePageMeta({
  middleware: ['not-verified']
})
</script>

<template>
  <div class="background">
    <img src="https://res.cloudinary.com/dzilc11zf/image/upload/v1755025289/booking_f9l8hn.webp"
      alt="Booking Background" class="background-image" />
  </div>

  <div class="form-container">
    <Verification />
  </div>
</template>

<style scoped lang="scss">
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  z-index: -1;
  background-color: red;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(270deg, rgba(44, 50, 51, 0.00) 0%, rgba(44, 50, 51, .9) 83.17%);

    @media screen and (max-width: 600px) {
      background: linear-gradient(270deg, rgba(44, 50, 51, 0.00) 0%, rgba(44, 50, 51, 0.9) 70%);

    }
  }

  >img {
    position: absolute;
    top: -10px;
    left: -10px;
    width: calc(100% + 20px);
    height: calc(100% + 20px);
    object-fit: cover;
    // filter: blur(10px);
  }
}

.form-container {
  padding: 12rem;
  padding-top: calc($navbarHeight - 2rem);
  padding-bottom: 10rem;
  height: 100%;
  z-index: 2;

  // background-color: green;

  @media screen and (max-width: 1100px) {

    padding: 2rem;
    padding-top: calc($navbarHeight + 4rem);


  }

  // background-color: red;
}

@media screen and (max-height: 360px) {

  .form-container,
  .background {
    height: 120vh;
  }
}
</style>