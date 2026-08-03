<script setup lang="ts">
const badges = [
  'FLEXIBLE SELF-PAY',
  'ALL MAJOR INSURANCE ACCEPTED',
  'GOLF-FOCUSED REHABILITATION',
  'PRIORITY MEMBER ACCESS',
];
</script>

<template>
  <div class="strap">
    <p class="strap-text">Scanned a QR code at your golf course? You're in the right place.</p>
    <div class="strap-badges">
      <div v-for="badge in badges" :key="badge" class="badge">
        <span class="badge-dot"></span>
        <span class="badge-text">{{ badge }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$strap-bg: #1a3a3a;
$strap-accent: #5FCFCF;

.strap {
  width: 100%;
  background: $strap-bg;
  padding: 2.5rem 6.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  @media screen and (max-width: 1100px) {
    padding: 2rem 2rem;
  }

  @media screen and (max-width: 500px) {
    padding: 1.5rem 1rem;
  }
}

.strap-text {
  font-family: 'DM Sans', sans-serif;
  font-size: 1.2rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.50);
  text-align: center;
  letter-spacing: 0.02em;
}

.strap-badges {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;

  @media screen and (max-width: 500px) {
    gap: 0.75rem;
  }
}

.badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.1rem;
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: 2rem;
  // background: rgba($strap-accent, 0.08);
  background: rgba(255, 255, 255, 0.06);

  
}

.badge-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #5FCFCF;
  flex-shrink: 0;
}

.badge-text {
  font-family: 'DM Sans', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #FFF;
  letter-spacing: 0.04em;
  white-space: nowrap;

  @media screen and (max-width: 800px) {
    font-size: 0.7rem;
  }
}
</style>
