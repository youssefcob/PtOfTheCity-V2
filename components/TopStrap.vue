<script setup lang="ts">
import { useRoute } from "vue-router";
</script>

<template>
  <!--  <p>
      <span class="desktop-text">Now Open: Visit our
        <span style="color: #2ee5c1">new Belmont clinic</span> at 4533 Third Avenue!</span>
      <span class="mobile-text">New <span style="color: #2ee5c1">Belmont clinic</span> now open!</span>
      <NuxtLink to="/clinic/belmont">Click here for details</NuxtLink>
    </p> -->
  <div class="top-strap">
    <p>
      <span class="text">Referring Physicians</span>
      <NuxtLink to="/referral">Click here for details</NuxtLink>
    </p>
  </div>
</template>

<style scoped lang="scss">
.top-strap {
  width: 100%;
  height: 2.5rem;
  background-color: #103535;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  padding: 0 1rem;
  text-align: center;

  p {
    color: #ffffff;
    margin: 0;
    line-height: 1.4;
  }

  span {
    color: inherit;
  }

  .mobile-text {
    display: none;
  }

  a {
    color: #ffffff;
    text-decoration: underline;
    font-weight: 600;
    margin-left: 0.5rem;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.8;
      text-decoration: none;
    }
  }

  @media screen and (max-width: 425px) {
    font-size: 0.75rem;
    height: 4rem;

    .desktop-text {
      display: none;
    }

    .mobile-text {
      display: inline;
    }
  }
}
</style>