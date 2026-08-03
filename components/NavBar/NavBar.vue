<script setup lang="ts">
import { ref, watch } from "vue";

import ResponsiveDropDown from "./ResponsiveDropDown/ResponsiveDropDown.vue";
import { useWindowScroll } from "@vueuse/core";
import { useRoute } from "vue-router";

import type { Nav } from "~/types/types";
import NavListHorizontal from "./NavbarComps/NavListHorizontal.vue";
import BookNow from "./NavbarComps/BookNow.vue";
import DropDownButton from "./ResponsiveDropDown/DropDownButton.vue";
import User from "./NavbarComps/UserButton.vue";

const logoUrl = useImg('https://res.cloudinary.com/dzilc11zf/image/upload/v1778861676/LogoPt_ildwod.webp', 226);

let menuState = ref(false);
const handleDropdownUpdate = () => {
  menuState.value = !menuState.value;
  if (menuState.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
};

const { y } = useWindowScroll();
const route = useRoute();
const navOnLanding = ref(true);

const updateNavState = () => {
  const viewportHeight = window.innerHeight;
  const scrollPercentage = (y.value / viewportHeight) * 100;
  const path = route.path;

  // if (path === "/booking" || path === "/login" || path === "/register") {
  if (path === "/booking" || path === "/login" || path === "/register") {

    navOnLanding.value = true;
  } else if (path !== "/" && !path.startsWith("/clinic/")) {
    navOnLanding.value = false;
  } else if (scrollPercentage > 88) {
    navOnLanding.value = false;
  } else {
    navOnLanding.value = true;
  }
};

// Watch both scroll and route changes
watch(y, updateNavState);
watch(() => route.path, updateNavState);

const { data, pending, error } = await useFetch<Nav>(`${useUrl()}/web/nav`);
const clinics = computed(() => data.value?.clinics);
// const services = computed(() => data.value?.services)

const services = computed(
  () =>
    (data.value?.services || []).filter(
      (service) => service.toLowerCase() !== "initial check-up",
    ) || [],
    // console.log("services", data.value?.services)
);

const { showTopStrap } = useTopStrap();
</script>

<template>
  <div
    :class="[
      'blur-filter',
      navOnLanding ? 'main' : 'secondary',
      { 'with-top-strap': showTopStrap },
    ]"
  ></div>
  <nav
    :class="[
      'navbar',
      'horizontal',
      navOnLanding ? 'main' : 'secondary',
      { 'with-top-strap': showTopStrap },
    ]"
    aria-label="Main navigation"
  >
    <div class="logo">
      <NuxtLink to="/" aria-label="PT of the City home">
        <img
          :src="logoUrl"
          alt="PT of the City Logo"
          class="nav-logo"
          width="226"
          height="113"
        />
      </NuxtLink>
    </div>
    <div class="navlist">
      <NavListHorizontal
        :clinics="clinics"
        :services="services"
        :navOnLanding="navOnLanding"
      />
    </div>

    <div class="util-wrapper">
      <BookNow :navOnLanding="navOnLanding" />
      <!-- <User :navOnLanding="navOnLanding" /> -->
    </div>
  </nav>

  <nav
    :class="[
      'navbar',
      'mobile',
      navOnLanding ? 'main' : 'secondary',
      { 'with-top-strap': showTopStrap },
    ]"
    aria-label="Mobile navigation"
  >
    <div class="logo">
      <DropDownButton @dropdown="handleDropdownUpdate" :menuState="menuState" />

      <NuxtLink to="/" aria-label="PT of the City home">
        <img
          :src="logoUrl"
          alt="PT of the City Logo"
          class="nav-logo"
          width="226"
          height="113"
        />
      </NuxtLink>
    </div>

    <div class="util-wrapper">
      <BookNow :navOnLanding="navOnLanding" />
      <!-- <User :navOnLanding="navOnLanding" /> -->
    </div>

    <ResponsiveDropDown
      :navOnLanding="navOnLanding"
      @dropdown="handleDropdownUpdate"
      :menu-state="menuState"
      :clinics="clinics"
    />
  </nav>
</template>

<style scoped lang="scss">
.blur-filter {
  height: calc($navbarHeight + 2rem);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  transition: all 0.5s ease-in-out;
  z-index: 3; // always behind navbars

  &.main {
    background-color: transparent;

    @media screen and (max-width: 1100px) {
      background-color: rgb(255, 255, 255);
      backdrop-filter: blur(20px);
    }
  }

  &.secondary {
    background-color: rgba(238, 236, 237, 0.2);
    backdrop-filter: blur(20px);
  }
}

.blur-filter.with-top-strap,
.navbar.with-top-strap {
  top: 2.5rem;
}

.navbar {
  padding: 1rem 3.12rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 5; // always above blur
  transition: all 0.5s ease-in-out;
  height: calc($navbarHeight + 2rem);

  &.horizontal {
    @media screen and (max-width: 1100px) {
      display: none;
    }
  }

  &.mobile {
    padding: 1rem 1rem;

    display: none;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 1100px) {
      display: flex;
    }
  }
}

.logo {
  display: flex;
  align-items: center;

  img {
    height: 7rem;
    width: auto;

    @media screen and (max-width: 950px) {
    }

    @media screen and (max-width: 425px) {
      height: 6rem;
    }

    @media screen and (max-width: 320px) {
      height: 5rem;
    }
  }
}

@media screen and (max-width: 425px) {
  .blur-filter,
  .navbar {
    height: calc($navbarHeight - 1rem);
  }

  .blur-filter.with-top-strap,
  .navbar.with-top-strap {
    top: 4rem;
  }
}

.util-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
