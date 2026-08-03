<script setup lang="ts">
import { ref, watch } from 'vue';

import NavList from './NavbarComps/NavListHorizontal.vue';
import NavLogo from './NavbarComps/NavLogo.vue';
import ResponsiveDropdown from './ResponsiveDropDown/ResponsiveDropdown.vue';
import DropDownButton from './ResponsiveDropDown/DropDownButton.vue';
import Mobile from './NavbarComps/Mobile.vue';

import { useWindowScroll } from '@vueuse/core';
import BookNow from './NavbarComps/BookNow.vue';
import type { Nav } from '~/types/types';


let menuState = ref(false);
const handleDropdownUpdate = () => {
    menuState.value = !menuState.value;
    if (menuState.value) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

const { x, y } = useWindowScroll()

const navOnLanding = ref(true);

watch(y, (newValue) => {

    const viewportHeight = window.innerHeight;
    // console.log(viewportHeight)
    const scrollPercentage = (newValue / viewportHeight) * 100;
    // console.log(scrollPercentage)

    if (scrollPercentage > 88 && window.location.pathname === '/') {
        navOnLanding.value = false;
        // console.log(newValue, window.location.pathname)
    } else if (window.location.pathname !== '/') {
        navOnLanding.value = false;

    } else {
        navOnLanding.value = true;
        // console.log(newValue, window.location.pathname)


    }
});

const { data, pending, error } = await useFetch<Nav>(`${useUrl()}/web/nav`);





const clinics = computed(() => data.value?.clinics)
const services = computed(() => data.value?.services)
</script>


<template>
    <nav :class="`navbar horizontal ${navOnLanding ? 'main' : 'secondary'}`" aria-label="Main navigation">
        <div class="logo">
            <NuxtLink to="/" aria-label="PT of the City home">
                <NavLogo />
            </NuxtLink>
        </div>
        <div class="navlist">
            <NavList :clinics="clinics" :services="services" :navOnLanding="navOnLanding" />
        </div>

        <div class="util-wrapper">
            <BookNow :navOnLanding="navOnLanding" />
            <!-- <Mobile :navOnLanding="navOnLanding" /> -->
        </div>
    </nav>

    <nav :class="`navbar mobile secondary`" aria-label="Mobile navigation">
        <div class="logo">
            <NuxtLink to="/" aria-label="PT of the City home">
                <NavLogo />
            </NuxtLink>
        </div>
        <DropDownButton @dropdown="handleDropdownUpdate" :menuState="menuState" />
        <ResponsiveDropdown responsive @dropdown="handleDropdownUpdate" v-if="menuState"
            id="responsiveDropDownNavBar" />

    </nav>

</template>


<style scoped lang="scss">
.navbar {
    height: calc($navbarHeight + 2rem);
    padding: 1rem 3.12rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 2;
    transition: all .5s ease-in-out;




    .logo {
        align-self: center;
    }

    &.main {
        transition: all .5s ease-in-out;

        background-color: transparent;

    }

    &.secondary {
        transition: all .5s ease-in-out;

        background-color: rgba(238, 236, 237, 0.20);
        backdrop-filter: blur(20px);
    }

    &.horizontal {

        .logo {
            height: 80%;
        }
    }

    &.mobile {
        display: none;

        .logo {
            height: 90%;
        }
    }
}



.util-wrapper {
    display: flex;
    gap: 1rem;
    align-items: center;
}

@media (max-width: 950px) {
    .navbar.horizontal {
        display: none;
    }

    .navbar.mobile {
        display: flex;
        align-items: center;

        @media screen and (max-width: 426px) {
            .logo {
                height: 45%;
            }
        }
    }
}
</style>
