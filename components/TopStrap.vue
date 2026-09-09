<script setup lang="ts">
import { useRoute } from "vue-router";
import LanguageDropDown from "./NavBar/NavbarComps/LanguageDropDown.vue";
</script>

<template>
  <div class="top-strap">
    <NuxtLink to="/physicians-referral" class="referring">Referring Physicians</NuxtLink>

    <div class="top-strap__right">
      <a href="tel:+17186480888" class="contact" aria-label="Call PT of the City at (718) 648-0888">
        <span class="contact-label">Contact Us</span>
        <span class="contact-number">(718) 648-0888</span>
      </a>
      
    </div>
  </div>
</template>

<style scoped lang="scss">
.top-strap {
  width: 100%;
  height: 2.5rem;
  background-color: $primary-400;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.875rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  padding: 0 3.12rem;

  .referring {
    color: #ffffff;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      opacity: 0.8;
    }
  }

  &__right {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .contact {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #ffffff;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.875rem;

    &:hover {
      opacity: 0.8;
    }
  }

  .contact-label,
  .contact-number {
    color: inherit;
    font-size: inherit;
  }

  .contact-number {
    font-weight: 600;
  }

  // hidden alongside the desktop navbar (NavBar.vue switches to its mobile
  // bar at the same breakpoint, which resets the with-top-strap offset to 0)
  @media screen and (max-width: 1100px) {
    display: none;
  }
}
</style>