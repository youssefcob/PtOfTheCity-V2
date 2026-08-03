<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import type { Ref } from 'vue';


const show: Ref<boolean> = ref(false);
const lang: Ref<string> = ref(localStorage.getItem('lang') || 'EN');

const changeLang = (language: string): void => {
    lang.value = language;
    localStorage.setItem('lang', language);
    show.value = false;
    window.location.reload();

}

let handleClickOutside: (e: Event) => void;

onMounted(() => {
    handleClickOutside = (e: Event) => {

        const dropdownElement = document.querySelector('.language-dropdown');
        if (dropdownElement && !dropdownElement.contains(e.target as Node)) {
            show.value = false;
        }
    };
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>


<template>
    <div class="language-dropdown">
        <div class="language-btn" @click="show = !show">
            <span>{{ lang }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none">
                <path d="M1 1L6 6L11 1" stroke="black" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>

        </div>
        <div class="language-list" v-if="show">
            <div class="language-item" @click="changeLang('EN')">EN</div>
            <div class="language-item" @click="changeLang('AR')">AR</div>
            <div class="language-item" @click="changeLang('ES')">ES</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.language-dropdown {
    @extend h4;
    position: relative;
    height: 100%;
    @include flex();


    .language-btn {
        @extend h4;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0rem 1rem;
        height: 100%;
        width: 5.3rem;

        cursor: pointer;
        transition: all 0.3s ease-in-out;

        &>svg>path {
            transition: all 0.3s ease-in-out;

        }


    }

    .language-list {
        position: absolute;
        width: 100%;
        top: 100%;
        right: 0;
        display: flex;
        flex-direction: column;
        background-color: $grey;
        border-radius: 4px;
        box-shadow: 0px 8px 50px 0px rgba(42, 192, 212, 0.15);
        z-index: 1;

        .language-item {
            @extend h4;
            padding: 0.5rem 1rem;
            cursor: pointer;

            &:hover {
                background-color: $black;
                color: $grey;
            }
        }
    }

}
</style>
