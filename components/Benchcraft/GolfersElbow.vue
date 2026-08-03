<script setup lang="ts">
</script>

<template>
  <section class="elbow-section">
    <!-- Header -->
    <div class="elbow-header">
      <span class="elbow-label">CLINICAL INSIGHT</span>
      <h2 class="elbow-title">PHYSICAL THERAPY BUILT FOR GOLFERS WHO PLAY TO PERFORM</h2>
      <p class="elbow-subtitle">
        Your swing is only as strong as the body behind it. When your body moves well, your game
        feels smoother, stronger, and more consistent. When it doesn't, you feel it in your
        mobility, rotation, balance, and control.
      </p>
    </div>

    <!-- Body: 3-column grid -->
    <div class="elbow-body">
      <!-- Col 1: Why PT of The City -->
      <div class="elbow-col col-left">
        <div class="elbow-block">
          <h3 class="elbow-block-title">BUILT FOR<br />GOLF PERFORMANCE</h3>
          <p class="elbow-block-text">
            That's why PT of The City has created a golf performance experience designed
            specifically for golfers and active individuals — focused on movement optimization,
            injury prevention, recovery, and performance enhancement, not generic rehabilitation.
          </p>
        </div>

        <div class="symptom-cards">
          <div class="symptom-card">
            <h4 class="symptom-title">SPORTS INJURY SPECIALISTS</h4>
            <p class="symptom-text">
              Our team specializes in sports injuries, golf performance, sports rehabilitation,
              and golf injury prevention, helping athletes recover properly and avoid recurring issues.
            </p>
          </div>

          <div class="symptom-card">
            <h4 class="symptom-title">SWING CORRECTION THERAPY</h4>
            <p class="symptom-text">
              Whether you're dealing with lingering pain or looking to improve how your body moves
              through the swing, our focus stays on helping you play consistently and confidently.
            </p>
          </div>
        </div>
      </div>

      <!-- Col 2: Performance focus -->
      <div class="elbow-col col-mid">
        <div class="elbow-block">
          <h3 class="elbow-block-title">PERFORMANCE-FOCUSED<br />RECOVERY CARE</h3>
          <p class="elbow-block-text">
            Through golf specific exercises, flexibility training, balance training for golf, and
            performance-focused recovery care, we help golfers improve mobility, move more
            efficiently, and stay physically prepared for the demands of the game round after round.
          </p>
          <br />
          <p class="elbow-block-text">
            Where recovery meets performance tuning, every detail is focused on helping you move
            smoother, swing cleaner, and stay consistent from the first tee to the final putt.
          </p>
        </div>
      </div>

      <!-- Col 3: Person image -->
      <div class="elbow-col col-right">
        <div class="elbow-person">
          <img src="/images/benchcraft/golfers-elbow-person.png" alt="Golfer performance therapy" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
$bc-bg-dark: #0d1f2d;
$bc-teal: #3ECFCF;
$bc-text: #e8edf2;
$bc-text-muted: #b0bec5;
$bc-card-bg: rgba(255, 255, 255, 0.07);
$bc-card-border: rgba(255, 255, 255, 0.12);

.elbow-section {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(145deg, #0d1f2d 0%, #0f3040 40%, #0d4a45 75%, #0a3535 100%);
  padding: 4rem 5rem 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media screen and (max-width: 1100px) {
    padding: 3rem 2rem 0;
  }

  @media screen and (max-width: 700px) {
    padding: 2.5rem 1.2rem 0;
  }
  @media screen and (max-width: 500px) {
    padding-bottom: 4rem;
  }
}

/* ── Header ── */
.elbow-header {
  text-align: center;
  margin-bottom: 3.5rem;
}

.elbow-label {
  font-family: 'DM Sans', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  color: #FFF;
  text-transform: uppercase;
  display: block;
  margin-bottom: 0.6rem;
}

.elbow-title {
  font-family: 'Encode Sans Expanded', sans-serif;
  font-size: 2.8rem;
  font-weight: 800;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: -0.5px;
  line-height: 1.1;
  margin: 0 0 1rem;

  @media screen and (max-width: 700px) {
    font-size: 2rem;
  }
}

.elbow-subtitle {
  font-family: 'DM Sans', sans-serif;
  font-size: 1.5rem;
  width: 50%;
  color: $bc-text-muted;
  line-height: 1.65;
  margin: 0 auto;
}

/* ── Body grid ── */
.elbow-body {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10rem;
  flex: 1;
  align-items: start;

  @media screen and (max-width: 1100px) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  @media screen and (max-width: 700px) {
    grid-template-columns: 1fr;
  }
}

.elbow-col {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* ── Text block (heading + paragraph) ── */
.elbow-block-title {
  font-family: 'Encode Sans Expanded', sans-serif;
  font-size: 2rem;
  font-weight: 800;
  color: $bc-teal;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  line-height: 1.35;
  margin: 0 0 0.75rem;
}

.elbow-block-text {
  font-family: 'DM Sans', sans-serif;
  font-size: 1.75rem;
  color: $bc-text;
  line-height: 1.7;
  margin: 0;
}

/* ── Symptom cards ── */
.symptom-cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 4rem;
}

.symptom-card {
  background: $bc-card-bg;
  border: 1px solid $bc-card-border;
  border-radius: 0.75rem;
  padding: 1.3rem 1.5rem;
}

.symptom-title {
  font-family: 'DM Sans', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 0.5rem;
}

.symptom-text {
  font-family: 'DM Sans', sans-serif;
  font-size: 1.25rem;
  color: $bc-text-muted;
  line-height: 1.65;
  margin: 0;
}

/* ── Person image: flush to bottom, cropped at top ── */
.col-right {
  justify-content: flex-end;
  align-self: end;
  position: relative;

  @media screen and (max-width: 1100px) {
    display: none;
  }
}

.elbow-person {
  position: absolute;
  bottom: 0;
  right: -5rem;
  width: 115%;

  img {
    width: 120%;
    margin-left: -10%;
    display: block;
    object-fit: contain;
    object-position: bottom center;
  }
}
</style>