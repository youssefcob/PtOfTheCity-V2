<script setup lang="ts">

const introText =
  "PT of the city connects you with the best physical and occupational therapists online,";

const bodyText =
  "Discomfort or stiffness in the neck area is a frequent problem that many people experience, often caused by muscle strain, poor posture, or prolonged periods of inactivity. This condition can lead to reduced mobility and persistent pain, affecting daily activities and overall well-being.";
</script>

<template>
  <section class="telehealth-section conditions-section">
    <div class="section-header">
      <h2>Conditions we treat online</h2>
      <p>{{ introText }}</p>
    </div>

    <div class="conditions-grid">
      <div class="row row-one">
        <div class="media overlay-card span-two" style="border-radius: 100px 0 10px 0;">
          <img
            src="/images/telehealth/condition-01.png"
            alt="Woman following guided neck exercises at home"
          />
          <div class="overlay-copy">
            <h3>Title</h3>
            <p>{{ bodyText }}</p>
          </div>
        </div>

        <div class="text-card plain">
          <h3>Title</h3>
          <p>{{ bodyText }}</p>
        </div>
      </div>

      <div class="row row-two">
        <div class="text-card plain">
          <h3>Title</h3>
          <p>{{ bodyText }}</p>
        </div>

        <div class="media rounded-card">
          <img
            src="/images/telehealth/condition-02.png"
            alt="Woman attending a telehealth movement session from home"
          />
        </div>

        <div class="text-card plain">
          <h3>Title</h3>
          <p>{{ bodyText }}</p>
        </div>
      </div>

      <div class="row row-three">
        <div class="media left-edge" style="border-radius: 0 0 0 100px;">
          <img
            src="/images/telehealth/condition-03.png"
            alt="Patient performing guided stretching exercises at home"
          />
        </div>

        <div class="media right-edge span-two" style="border-radius: 0 0 100px 0;">
          <img
            src="/images/telehealth/condition-04.png"
            alt="Patient holding a tablet during a telehealth session"
          />
          <div class="overlay-copy black" style="color: black important;">
            <h3>Title</h3>
            <p>{{ bodyText }}</p>
          </div>
        </div>
      </div>
    </div>

    <NuxtLink to="/teletherapy/booking" class="btn cta conditions-cta">
      Request Appointment
    </NuxtLink>
  </section>
</template>

<style scoped lang="scss">
.telehealth-section {
  @include pagePadding;
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;

  @media screen and (max-width: 700px) {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }
}

.conditions-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.section-header {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  h2 {
    color: #048E73;
    font-size: clamp(3rem, 4vw, 4.4rem);
    line-height: 1;
    font-weight: 600;
  }

  p {
    color: #18383f;
    font-size: clamp(1.2rem, 1.6vw, 1.7rem);
    line-height: 1.4;
    max-width: 68rem;
  }
}

.conditions-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.row {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr !important;
  }
}

.row-three {
  @media screen and (max-width: 900px) {
    gap: 0;
  }
}

.span-two {
  grid-column: span 2;

  @media screen and (max-width: 900px) {
    grid-column: auto;
  }
}

.media {
  position: relative;
  overflow: hidden;
  max-height: 20rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}

.overlay-card,
.rounded-card {
  border-radius: 1.125rem;
}

.left-edge {
  border-radius: 1.125rem 0 0 1.125rem;

  @media screen and (max-width: 900px) {
    border-radius: 1.125rem 1.125rem 0 0;
  }
}

.right-edge {
  border-radius: 0 1.125rem 1.125rem 0;

  @media screen and (max-width: 900px) {
    border-radius: 0 0 1.125rem 1.125rem;
  }
}

.overlay-card::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(33, 37, 41, 0.72) 0%,
    rgba(33, 37, 41, 0.28) 52%,
    rgba(33, 37, 41, 0.04) 100%
  );
}

.overlay-copy {
  position: absolute;
  left: 10rem;
  bottom: 1.8rem;
  z-index: 1;
  max-width: 25rem;

  h3,
  p {
    color: #fff;
  }

  h3 {
    margin-bottom: 0.9rem;
    font-size: 1.9rem;
    font-weight: 700;
  }

  p {
    font-size: 1rem;
    line-height: 1.8;
  }
}

.text-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h3 {
    color: #18383f;
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.1;
  }

  p {
    color: #18383f;
    font-size: 1.1rem;
    line-height: 1.9;
  }
}

.plain {
  justify-content: center;
  padding: 0.5rem 0;
}

.conditions-cta {
  width: min(100%, 42rem);
  align-self: center;
  margin-top: 0.5rem;
}
.black{
  p ,h3 {

    color: black !important;
  }
}
</style>
