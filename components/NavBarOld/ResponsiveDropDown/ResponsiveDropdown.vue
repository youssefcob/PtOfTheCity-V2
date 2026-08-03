<script setup lang="ts">

import NavListVertical from '../NavbarComps/NavListVertical.vue';
import Mobile from './LanguageDropDownResponsive.vue';
import BookNow from '../NavbarComps/BookNow.vue';

const emit = defineEmits(['dropdown']);

const toggleDropDown = () => {
    emit('dropdown');
}
</script>

<template>
   <div class="menu" role="dialog" aria-labelledby="mobile-menu-title" aria-modal="true">
       <div class="header">
           <div>
               <h3 id="mobile-menu-title">{{ $translate('menu') }}</h3>
           </div>
           <button class="CloseDropDown" @click="toggleDropDown" aria-label="Close mobile menu">
               <span aria-hidden="true">X</span>
           </button>
       </div>
       <div class="content">
           <div class="list-search-container">
               <div class="search-bar">
                    <BookNow :navOnLanding="true" @click="toggleDropDown"/>
               </div>
               <nav class="navList" aria-label="Mobile navigation menu">
                   <NavListVertical @dropdown="toggleDropDown" />
               </nav>
           </div>
           <Mobile class="lang" />
       </div>
   </div>
</template>

<style scoped lang="scss">
.menu {
    height: 100lvh;
    overflow: hidden;
    width: 100%;
    background-color: $grey;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    h3 {
        font-size: 2rem;
        font-weight: 400;
    }

    >.content {
        width: 100%;
        height: 92vh;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        @include pagePadding;

        >.list-search-container {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 2rem;

            .search-bar{
                height:6rem;
                margin-top: 1rem;
            }

        }

        >.lang {
            align-self: center;
        }


    }

    .header {
        background-color: $grey;
        width: 100%;
        height: 8vh;
        min-height: 50px;
        box-shadow: 0px 8px 50px 0px rgba(42, 192, 212, 0.15);
        padding: 1.25rem 2.7rem;
        // @include pagePadding;
        user-select: none;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .CloseDropDown {
            cursor: pointer;
        }
    }


}
</style>