<script setup lang="ts">
import EditableText from '~/components/Admin/EditableText.vue';
import EditableImage from '~/components/Admin/EditableImage.vue';

const heroImg = (width: number) => useImg('careers', width);
</script>

<template>
    <div class="hero">
        <div class="hero-content">
            <div class="rating">
                <div class="stars">
                    <svg v-for="n in 5" :key="n" class="star-icon" width="18" height="18" viewBox="0 0 24 24"
                        fill="#F5A623" aria-hidden="true">
                        <path
                            d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
                    </svg>
                </div>
                <EditableText tag="span" class="rating-text" content-key="home.hero.rating_text"
                    default="TRUSTED BY NEW YORKERS ACROSS 30+ LOCATIONS" />
            </div>

            <EditableText tag="h1" class="hero-title" content-key="home.hero.title"
                default="Move Better, Live Stronger" />

            <EditableText tag="p" class="hero-description" content-key="home.hero.description"
                default="Whether you're recovering from an injury, managing pain, or getting back to the activities you love, our team is here to help you move with confidence." />

            <div class="hero-actions">
                <NuxtLink to="/booking" class="btn-primary" aria-label="Request an appointment">
                    <EditableText tag="span" content-key="home.hero.cta_primary_label" class="btn-primary-text" default="Request Appointment" />
                </NuxtLink>
                <NuxtLink to="/insurances#eligibility" class="btn-secondary"
                    aria-label="Check your insurance eligibility">
                    <EditableText tag="span" content-key="home.hero.cta_secondary_label" default="Check Eligibility" />
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                    </svg>
                </NuxtLink>
            </div>
        </div>

        <div class="hero-image">
            <EditableImage content-key="home.hero.image" :default-src="heroImg(900)" loading="eager"
                default-alt="A PT of the City physical therapist caring for a patient" />
            <div class="hero-image-fade" aria-hidden="true"></div>
        </div>
    </div>
</template>

<style scoped lang='scss'>
.hero {
    display: flex;
    align-items: stretch;
    width: 100%;
    min-height: 50rem;
    margin-top: calc(2.5rem + $navbarHeight + 1rem);
    background: #ffffff;
    position: relative;

    // NavBar.vue switches to its mobile bar (no top-strap offset, top: 0) at
    // 1100px, so the extra 2.5rem of top-strap clearance has to drop there too -
    // not at 900px, where Hero's own overlay layout kicks in - or there's a gap
    // between 901-1100px where the nav has already gone compact but Hero hasn't
    // adjusted its clearance yet.
    @media screen and (max-width: 1100px) {
        margin-top: calc($navbarHeight + 1rem);

    }

    // mobile: the image becomes a full-bleed background with the copy overlaid
    // on a dark gradient at the bottom, instead of stacking image-then-text
    @media screen and (max-width: 900px) {
        position: relative;
        display: block;
        // min-height: calc(100vh - $navbarHeight);
        min-height: calc(100vh - $navbarHeight + 1.6rem);

        overflow: hidden;
    }

    // NavBar.vue's own height shrinks by 1.5rem below 425px - match it here too
    @media screen and (max-width: 425px) {
        margin-top: calc($navbarHeight - 1.5rem);
    }
}

.hero-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.25rem;
    width: 50%;
    padding: 4rem 3rem 4rem 12.25rem;
    z-index: 1;

    @media screen and (max-width: 1300px) {
        padding: 3rem 2.5rem;
    }

    @media screen and (max-width: 900px) {
        position: absolute;
        inset: 0;
        z-index: 1;
        width: 100%;
        justify-content: flex-end;
        gap: 1.5rem;
        padding: 2.5rem 1.5rem;
        order: initial;
        background: linear-gradient(180deg, rgba(3, 41, 46, 0) 30%, rgba(3, 41, 46, 0.75) 100%);
    }
}

.rating {
    display: flex;
    // align-items: center;
    flex-wrap: wrap;
    flex-direction: column;
    gap: 0.4rem 0.6rem;

    .star-icon {
        flex-shrink: 0;
    }

    .rating-text {
        @include type-large;
        color: $primary-700;
        margin-left: 0.3rem;

        @media screen and (max-width: 900px) {
            color: #ffffff;
        }
    }
}

.hero-title {
    @include type-display;
    color: $primary-600;

    @media screen and (max-width: 900px) {
        color: #ffffff;
    }
}

.hero-description {
    @include type-body;
    // max-width: 10rem;
    color: $primary-700;

    @media screen and (max-width: 900px) {
        max-width: none;
        color: rgba(255, 255, 255, 0.8);
    }
}

.hero-actions {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 0.75rem;

    @media screen and (max-width: 900px) {
        flex-direction: column;
        align-items: stretch;
        gap: 0.75rem;
        margin-top: 0.25rem;
    }

    a {
        @include type-button;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        border-radius: 0.7rem;
        padding: 1.1rem 2rem;
        transition: all 0.2s ease-in-out;
        white-space: nowrap;

        @media screen and (max-width: 900px) {
            justify-content: center;
        }
    }

    .btn-primary {
        background-color: $primary-400;
        color: #ffffff;

        // padding: rem 10rem;

        &:hover {
            background-color: $primary-300;
        }
    }

    .btn-primary-text{
        color: #ffffff;

    }

    .btn-secondary {
        background-color: transparent;
        color: $primary-700;

        &:hover {
            color: $primary-400;
            text-decoration: underline;
        }

        @media screen and (max-width: 900px) {
            color: #ffffff;

            &:hover {
                color: $primary-base;
            }
        }
    }
}

.hero-image {
    position: absolute;
    width: 70%;
    height: 100%;
    overflow: hidden;
    // left:0%;
    right: 0;
    z-index: 0;

    :deep(img) {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        display: block;
    }

    .hero-image-fade {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        // .hero-content is 50% of .hero's width and .hero-image is 80% of it
        // starting at 20%, so the two always overlap by 30% of .hero's width
        // regardless of viewport - i.e. 30/80 = 37.5% of .hero-image's own
        // width. The fade needs to cover at least that much or the hero text
        // sits directly on unblended image with no contrast.
        background: linear-gradient(90deg, #ffffff 0%, rgba(255, 255, 255, 0) 42%);
        // purely decorative - without this, it paints over the image (later in
        // source order) and blocks all hover/click on EditableImage beneath it.
        pointer-events: none;
    }

    @media screen and (max-width: 900px) {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        order: initial;

        .hero-image-fade {
            display: none;
        }
    }
}
</style>
