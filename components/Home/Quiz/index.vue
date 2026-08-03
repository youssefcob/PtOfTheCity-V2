<template>
  <div class="quiz-container">
    <div class="text-btn-wrapper">
      <h2>How healthy is your pelvic floor?</h2>
      <p>Answer a few quick questions to receive a personalized pelvic wellness score.</p>
      <NuxtLink :class="`btn cta`" to="/quiz/pelvic" aria-label="Request appointment - book your physical therapy session">
        <span class="btnfont ">Start My Evaluation</span>
      </NuxtLink>
    </div>
    <div class="image">
      <NuxtImg src="https://res.cloudinary.com/dzilc11zf/image/upload/v1765830536/home_hgo3gx.webp" alt="quiz image" />
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped lang="scss">
.quiz-container {
  background: linear-gradient(90deg, #103535 0.04%, #2F9B9B 99.96%);

  display: flex;
  grid-template-columns: 1fr 1fr;
  min-height: 40vh;


  .text-btn-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 5rem 9rem;
    gap: 2rem;

    h2 {
      font-size: 4rem;
      font-weight: 600;
      color: white;
      margin-bottom: 2rem;
      line-height: 110%;
    }

    p {
      font-size: 4rem;
      font-weight: 300;
      color: white;
      line-height: 120%;
    }
    .btn{
      width:70%;
      // align-self: center ;
    }
  }

  .image {
    flex: 1;
min-width: 40%;
    img {
      width: 100%;
      height: 100%;
      // aspect-ratio: 1/1;
    }
  }

    @media screen and (max-width: 570px) {
    grid-template-columns: 1fr;
    text-align: center;
    position: relative;
    .image {
      position: absolute;
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      background: linear-gradient(0deg, #103535 50%, rgba(47, 155, 155, 0.20) 100%);
      }



    }
    .text-btn-wrapper{
      z-index: 1;
    }
    
  }
}
</style>