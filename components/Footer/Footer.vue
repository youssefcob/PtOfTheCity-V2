<script setup lang="ts">
import Contact from './Contact.vue';
import Logo from './logo.vue';
import Socials from './Socials.vue';

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>
<template>
    <footer class="container">
        <div class="top">
            <ClientOnly>
                <Logo />
            </ClientOnly>
            <span class="footer-copyright">
                PT of the city© 2026
            </span>
            <Socials />
        </div>
        <div class="mid">
            <div class="policy-wrapper">
                <NuxtLink to="/privacy-policy" class="text underline" aria-label="Privacy Policy and Notice of Privacy Practices">
                    Privacy Policy & Notice of Privacy Practices
                </NuxtLink>
                <NuxtLink to="/no-surprises-act-disclosure" class="text underline" aria-label="Open no surprises act disclosure">
                    No Surprises Act Disclosure
                </NuxtLink>
            </div>
            <button class="text click" @click="scrollToTop" aria-label="Scroll back to top of page">
                Back to top
            </button>
        </div>
        <div class="bot">
            <Contact />
        </div>
    </footer>
</template>

<style scoped lang="scss">
.container {
    // margin-top: 12.5rem;

    width: 100%;
    background: linear-gradient(90deg, #236681 0%, #07151B 100%);
    padding: 3.12rem 6.25rem;

    display: flex;
    flex-direction: column;

    @media screen and (max-width:800px) {
        padding: 3.12rem 2rem;
    }

    >.top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1.25rem;
        flex-wrap: wrap;
        gap: 3rem;

        .footer-copyright {
            color: white;
            font-family: inherit;
            font-weight: 400;
            font-size: 1.4rem;
        }

        padding-bottom:2.9rem;
        border-bottom: 1px solid white;
    }

    >.mid {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1.25rem;
        margin: 4rem 0;

        .policy-wrapper {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .text {
            color: white;
            background-color: transparent;

            &.click {
                cursor: pointer;
            }

            &.underline {
                text-decoration-line: underline;
                cursor: pointer;
            }
        }

    }
}
</style>