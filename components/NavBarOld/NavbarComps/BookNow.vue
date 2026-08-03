<script setup lang="ts">
const props = defineProps({
    navOnLanding: {
        type: Boolean,
        required: true
    }
});
</script>

<template>
    <NuxtLink :class="`BookNow cta ${props.navOnLanding ? 'main' : 'secondary'}`" to="/booking"
        aria-label="Request appointment - book your physical therapy session">
        <span class="btnfont">Request Appointment</span>
    </NuxtLink>
</template>

<style scoped lang="scss">
.BookNow {
    display: flex;
    // height: 100%;
    justify-content: center;
    align-items: center;
    border-radius: $border-radius;
    text-align: center;
    padding:10rem;
    transition: all .5s ease-in-out;

    &.secondary {
        opacity: 0.8;
        transition: all .5s ease-in-out;
    }

    @media screen and (max-width: 950px) {
        padding: 2rem;
        border-radius: calc($border-radius * 2);

        .btnfont {
            font-size: 1.7rem;
        }

    }

    @media screen and (max-width: 425px) {
        padding: 2rem;
        border-radius: calc($border-radius * 2);

        .btnfont {
            font-size: 1.2rem;
            font-weight: 700;
        }

    }

    @media screen and (max-width: 320px) {
        .btnfont {
            font-size: 1rem;
            font-weight: 700;
        }
    }
}
</style>