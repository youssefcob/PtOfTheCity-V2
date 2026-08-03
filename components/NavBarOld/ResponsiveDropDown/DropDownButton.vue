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
   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12" fill="none" role="img" aria-label="Menu icon">
            <path
                d="M5 0.25C4.58579 0.25 4.25 0.585786 4.25 1C4.25 1.41421 4.58579 1.75 5 1.75V0.25ZM15 1.75C15.4142 1.75 15.75 1.41421 15.75 1C15.75 0.585786 15.4142 0.25 15 0.25V1.75ZM1 0.25C0.585786 0.25 0.25 0.585786 0.25 1C0.25 1.41421 0.585786 1.75 1 1.75V0.25ZM2 1.75C2.41421 1.75 2.75 1.41421 2.75 1C2.75 0.585786 2.41421 0.25 2 0.25V1.75ZM1 5.25C0.585786 5.25 0.25 5.58579 0.25 6C0.25 6.41421 0.585786 6.75 1 6.75V5.25ZM2 6.75C2.41421 6.75 2.75 6.41421 2.75 6C2.75 5.58579 2.41421 5.25 2 5.25V6.75ZM1 10.25C0.585786 10.25 0.25 10.5858 0.25 11C0.25 11.4142 0.585786 11.75 1 11.75V10.25ZM2 11.75C2.41421 11.75 2.75 11.4142 2.75 11C2.75 10.5858 2.41421 10.25 2 10.25V11.75ZM5 5.25C4.58579 5.25 4.25 5.58579 4.25 6C4.25 6.41421 4.58579 6.75 5 6.75V5.25ZM15 6.75C15.4142 6.75 15.75 6.41421 15.75 6C15.75 5.58579 15.4142 5.25 15 5.25V6.75ZM5 10.25C4.58579 10.25 4.25 10.5858 4.25 11C4.25 11.4142 4.58579 11.75 5 11.75V10.25ZM15 11.75C15.4142 11.75 15.75 11.4142 15.75 11C15.75 10.5858 15.4142 10.25 15 10.25V11.75ZM5 1.75H15V0.25H5V1.75ZM1 1.75H2V0.25H1V1.75ZM1 6.75H2V5.25H1V6.75ZM1 11.75H2V10.25H1V11.75ZM5 6.75H15V5.25H5V6.75ZM5 11.75H15V10.25H5V11.75Z"
                fill="#2C3233" />
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
            width:calc(12px * 1.4);
            height:calc(9px * 1.4);
        }
        
    }
}
</style>



