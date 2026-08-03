<script setup lang="ts">
import type { Career } from '~/types/types';


const props = defineProps<{
    career: Career;
}>();

const emit = defineEmits(['close','apply']);
const close = () => {
    emit('apply',props.career.title);
    emit('close');
}
</script>

<template>

    <div class="container">
        <div class="close" @click="close()">X</div>
        <h1 class="sectionHeader">
            {{career.title}}
        </h1>
        <p class="p-head">Responsibilities and Duties include the following: </p>
        <div class="desc-button-wrapper">
            <div class="desc-wrapper">
                <p class="text-s" v-html="career.description"> 
                </p>
            </div>
            <div class="btn responsive main" @click="close()">Apply</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    position: relative;
    user-select: none;
    background-color: rgba(44, 50, 51, 0.60);
    padding: 4rem 3rem;
    width: 70vw;
    height: 80vh;
    @media screen and (max-width: 800px) {
        width: 90vw;
        
    }
    border-radius: $border-radius;
    overflow: hidden;
    border: 1px solid $blue;
    .close{
        position: absolute;
        top: 2rem;
        right: 3rem;
        font-family: $montserrat;
        font-size: $h4;
        color: $white;
        cursor: pointer;
    }
    h1,
    p {
        color: $white;
        /* Replace $white with a valid color value */
        ;

    }

    .p-head {
        font-size: $h4;
        margin-bottom: 1.25rem;
        line-height: 140%;

    }

    .text-s {
        font-size: calc($h4 - 0.22rem);
    }

    .desc-button-wrapper {
        display: flex;
        gap: .5rem;
        height:70%;
        @media screen and (max-width: 800px) {
        flex-direction: column;                
            }
        .desc-wrapper {
            width: 70%;
            @media screen and (max-width: 800px) {
                width: 100%;
                
            }
        }

        .btn {
            align-self: flex-end;
            margin-top: auto;
        }
    }
}
</style>