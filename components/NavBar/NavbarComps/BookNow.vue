<script setup lang="ts">
import EditableText from '~/components/Admin/EditableText.vue';

const props = defineProps({
    navOnLanding: {
        type: Boolean,
        required: true
    },
    // set from the navbar bar (NavBar.vue) to keep it compact next to the logo there;
    // left off in the mobile dropdown (ResponsiveDropDown.vue), where it should read large
    compact: {
        type: Boolean,
        default: false
    }
});
</script>

<template>
    <NuxtLink class="BookNow" :class="{ compact }" to="/booking"
        aria-label="Request appointment - book your physical therapy session">
        <EditableText tag="span" class="btnfont" content-key="global.nav.cta_label" default="Request Appointment" />
    </NuxtLink>
</template>

<style scoped lang="scss">
.BookNow {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    border-radius: 0.75rem;
    padding: 1.1rem 2.2rem;
    text-align: center;
    background-color: #15707C;
    transition: all .3s ease-in-out;


    .btnfont {
        color: #ffffff;
        font-weight: 700;
        font-size: 1.1rem;
    }

    &:hover {
            background-color: $primary-300;
        }

    // large variant: used in the mobile dropdown menu, which is already mobile-only,
    // so this doesn't need its own viewport breakpoints
    @media screen and (max-width: 1100px) {
        padding: 1.5rem 2rem;

        .btnfont {
            font-size: 1.3rem;
        }
    }

    // compact variant: used in the navbar bar itself, sized to roughly match the
    // logo's height at each of its own breakpoints
    // (components/NavBar/NavBar.vue .logo img: 4.75rem / 4.25rem / 3.75rem)
    &.compact {
        @media screen and (max-width: 1100px) {
            height: 3.25rem;
            padding: 0 1.25rem;

            .btnfont {
                font-size: 0.95rem;
            }
        }

        @media screen and (max-width: 425px) {
            height: 3rem;
            padding: 0 1rem;
            border-radius: 0.6rem;

            .btnfont {
                font-size: 0.85rem;
            }
        }

        @media screen and (max-width: 320px) {
            height: 2.75rem;
            padding: 0 0.75rem;

            .btnfont {
                font-size: 0.75rem;
            }
        }
    }
}
</style>