<script setup lang="ts">
// import { defineEmits } from 'vue';

const emit = defineEmits(['dropdown']);

defineProps({
   menuState: {
        type: Boolean,
        default: false
    },
})
const toggleDropDown = () => {
    // console.log(dropdown);
    emit('dropdown'); // Emitting the value to the parent
}
</script>

<template>
   <button class="dropdown-btn" @click="toggleDropDown" aria-label="Toggle mobile menu" :aria-expanded="menuState" aria-controls="responsiveDropDownNavBar">
   <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Menu icon">
            <rect width="24" height="2" fill="white"/>
            <rect y="7" width="18" height="2" fill="white"/>
            <rect y="14" width="24" height="2" fill="white"/>
        </svg>
   </button>
</template>

<style scoped lang="scss">
.dropdown-btn {
    padding:0.5rem;
    cursor: pointer;
    background: transparent;
    svg{
        @media screen and (max-width: 426px){
            width: calc(24px * 1.4);
            height: calc(16px * 1.4);
        }
        
    }
}
</style>



