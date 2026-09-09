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
import EditableImage from "~/components/Admin/EditableImage.vue";

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
        <EditableImage
          content-key="global.nav.logo"
          :default-src="logoUrl"
          default-alt="PT of the City Logo"
          class="nav-logo"
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
      <BookNow :navOnLanding="navOnLanding" compact />
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
      <NuxtLink to="/" aria-label="PT of the City home">
        <EditableImage
          content-key="global.nav.logo"
          :default-src="logoUrl"
          default-alt="PT of the City Logo"
          class="nav-logo"
        />
      </NuxtLink>
    </div>

    <DropDownButton @dropdown="handleDropdownUpdate" :menuState="menuState" />

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
  height: calc($navbarHeight + 1rem);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  transition: all 0.5s ease-in-out;
  z-index: 3; // always behind navbars
  background-color: #ffffff;
  box-shadow: 0 2px 12px rgba(16, 53, 53, 0.06);
}

.blur-filter.with-top-strap,
.navbar.with-top-strap {
  top: 2.5rem;
}

.navbar {
  padding: 0.6rem 3.12rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 5; // always above blur
  transition: all 0.5s ease-in-out;
  height: calc($navbarHeight + 1rem);

  &.horizontal {
    @media screen and (max-width: 1100px) {
      display: none;
    }
  }

  &.mobile {
    padding: 0.6rem 1rem;
    background-color: $primary-400;

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

  :deep(img) {
    height: 4.75rem;
    width: auto;

    // 20% larger on mobile (same breakpoint the mobile bar switches on)
    @media screen and (max-width: 1100px) {
      height: 5.7rem;
    }

    @media screen and (max-width: 425px) {
      height: 5.1rem;
    }

    @media screen and (max-width: 320px) {
      height: 4.5rem;
    }

    // mobile bar is on a solid $primary-400 background - force the logo to
    // a solid white silhouette instead of its normal colors
    @media screen and (max-width: 1100px) {
      filter: brightness(0) invert(1);
    }
  }
}

// TopStrap is hidden below 1100px (see TopStrap.vue), so the navbar shouldn't
// be pushed down to make room for it there even when with-top-strap is set
@media screen and (max-width: 1100px) {
  .blur-filter.with-top-strap,
  .navbar.with-top-strap {
    top: 0;
  }
}

@media screen and (max-width: 425px) {
  .blur-filter,
  .navbar {
    height: calc($navbarHeight - 1.5rem);
  }
}

.util-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
