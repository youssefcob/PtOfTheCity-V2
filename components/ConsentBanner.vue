<script setup lang="ts">
const { choice, bannerOpen, accept, decline } = useConsent();

// Rendered open on the server so it is visible on first paint; returning
// visitors are hidden pre-hydration by the `pt-consent-set` class (head script).
onMounted(() => {
  bannerOpen.value = !choice.value;
});
</script>

<template>
        <div v-if="bannerOpen" class="consent-banner" role="dialog" aria-live="polite" aria-label="Cookie consent">
            <div class="consent-body">
                <h2 class="consent-title">Cookies and Tracking Technologies</h2>
                <p class="consent-text">
                    Our website uses cookies, pixels, and similar technologies, including tools provided by third
                    parties such as Google and Meta, to measure site performance and support our advertising.
                    Non-essential technologies are activated only after you give your consent through our cookie
                    banner, and you may change or withdraw that consent at any time through the &ldquo;Cookie
                    Settings&rdquo; link at the bottom of every page. We do not use advertising or session-recording
                    technologies on our treatment, service, or appointment booking pages. For more details, please see
                    our <NuxtLink to="/privacy-policy#privacy" class="consent-link">Privacy Policy</NuxtLink>.
                </p>
            </div>
            <div class="consent-actions">
                <button type="button" class="consent-btn decline" @click="decline">Decline</button>
                <button type="button" class="consent-btn accept" @click="accept">Accept</button>
            </div>
        </div>
</template>

<style lang="scss">
html.pt-consent-set .consent-banner {
    display: none;
}
</style>

<style scoped lang="scss">
.consent-banner {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10000;
    box-sizing: border-box;
    min-height: 50vh;
    max-height: 100vh;
    overflow-y: auto;
    padding: 4rem 6rem;
    background: rgba($cta, 0.8);
    color: $black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3rem;
    text-align: center;

    .consent-body {
        max-width: 90rem;
    }

    .consent-title {
        margin: 0 0 1.6rem;
        font-size: 2.4rem;
        font-weight: 600;
        color: $black;
    }

    .consent-text {
        margin: 0;
        font-size: 1.6rem;
        line-height: 1.7;
        color: $black;
    }

    .consent-link {
        color: $black;
        text-decoration: underline;
        font-weight: 600;
    }

    .consent-actions {
        display: flex;
        gap: 2rem;
        flex-wrap: wrap;
        justify-content: center;
    }

    .consent-btn {
        padding: 1.4rem 4rem;
        min-width: 16rem;
        border: none;
        border-radius: $border-radius;
        font-family: inherit;
        font-size: 1.6rem;
        font-weight: 600;
        cursor: pointer;

        &.accept {
            background: #000;
            color: #fff;
        }

        &.decline {
            background: #e53935;
            color: #000;
        }
    }

    @media screen and (max-width: 700px) {
        padding: 3rem 2rem;
        gap: 2rem;

        .consent-title {
            font-size: 2rem;
        }

        .consent-text {
            font-size: 1.4rem;
        }

        .consent-actions {
            width: 100%;
            flex-direction: column;
            gap: 1.2rem;
        }

        .consent-btn {
            width: 100%;
            padding: 1.4rem 2rem;
        }
    }
}
</style>
