<script lang="ts" setup>
import Slogan from './Slogan.vue';


const props = defineProps({
    title: {
        type: String,
        default: 'Default Title'
    },
    description: {
        type: Array as () => string[],
        default: ['Default Description']
    },
    animation: {
        type: String,
        default: 'default-animation'
    },
    interval: {
        type: Number,
        default: 3000
    },
    buttonLink: {
        type: String,
        default: '/booking'
    },
    buttonText: {
        type: String,
        default: 'Default Button Text'
    }
})

const isInternalLink = (link: string) => {
    return !link.startsWith('http://') && !link.startsWith('https://') && !link.startsWith('mailto:');
}


</script>

<template>

    <div class="main-image-content">
        <div class="info">
            <h1 class="landing-header">{{ props.title }}</h1>
            <div class="slogan-wrapper">
                <Slogan :description="props.description" :animation="props.animation" :interval="props.interval" />
            </div>
            <div class="btn-container bigScreen">
                <NuxtLink class="btn bigScreen cta" v-if="isInternalLink(props.buttonLink)" :to="props.buttonLink">
                    <img src="/assets/svg/reservation.svg" alt="Reservation Icon"
                        style="height: 3rem; margin-right: 0.5rem;" />
                    {{ props.buttonText }}
                </NuxtLink>
                <a v-else class="btn bigScreen cta" :href="props.buttonLink" target="_blank" rel="noopener noreferrer">
                    <img src="/assets/svg/reservation.svg" alt="Reservation Icon"
                        style="height: 3rem; margin-right: 0.5rem;" />

                    {{ props.buttonText }}
                </a>
                <a href="tel:+17186480888" class="btn bigScreen transparent" aria-label="Call PT of the City at (718) 648-0888">
                    <div class="icon-wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none"
                            role="img" aria-label="Phone icon">
                            <g clip-path="url(#clip0_813_892)">
                                <path
                                    d="M24.2866 17.666L18.8179 15.3223C18.5843 15.2227 18.3246 15.2017 18.078 15.2625C17.8315 15.3232 17.6113 15.4625 17.4507 15.6592L15.0288 18.6182C11.2279 16.8261 8.16904 13.7672 6.37695 9.96631L9.33594 7.54443C9.53305 7.38412 9.67256 7.16395 9.73335 6.91726C9.79414 6.67057 9.7729 6.41079 9.67285 6.17725L7.3291 0.708496C7.21929 0.456742 7.02508 0.251194 6.77996 0.127294C6.53483 0.00339424 6.25416 -0.0310909 5.98633 0.0297849L0.908203 1.20166C0.649985 1.26129 0.419602 1.40668 0.254656 1.6141C0.0897096 1.82153 -5.94829e-05 2.07874 2.95713e-08 2.34375C2.95713e-08 14.8682 10.1514 25 22.6562 25C22.9213 25.0002 23.1787 24.9104 23.3862 24.7455C23.5937 24.5805 23.7392 24.3501 23.7988 24.0918L24.9707 19.0137C25.0312 18.7445 24.996 18.4627 24.8711 18.2168C24.7463 17.9708 24.5396 17.776 24.2866 17.666Z"
                                    :fill="`white`" />

                            </g>

                        </svg>
                        <span> Book a session via phone</span>
                    </div>

                </a>
            </div>
        </div>
        <div class="btn-container responsive">
            <NuxtLink v-if="isInternalLink(props.buttonLink)" :to="props.buttonLink" class="btn   cta">
                <img src="/assets/svg/reservation.svg" alt="Reservation Icon"
                    width="48" height="48" style="height: 3rem; margin-right: 0.5rem;" />

                {{ props.buttonText }}
            </NuxtLink>
            <a v-else :href="props.buttonLink" target="_blank" rel="noopener noreferrer" class="btn   cta">
                <img src="/assets/svg/reservation.svg" alt="Reservation Icon"
                    width="48" height="48" style="height: 3rem; margin-right: 0.5rem;" />

                {{ props.buttonText }}
            </a>

            <a href="tel:+17186480888" class="btn bigScreen transparent" aria-label="Call PT of the City at (718) 648-0888">
                <div class="icon-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none"
                        role="img" aria-label="Phone icon">
                        <g clip-path="url(#clip0_813_892)">
                            <path
                                d="M24.2866 17.666L18.8179 15.3223C18.5843 15.2227 18.3246 15.2017 18.078 15.2625C17.8315 15.3232 17.6113 15.4625 17.4507 15.6592L15.0288 18.6182C11.2279 16.8261 8.16904 13.7672 6.37695 9.96631L9.33594 7.54443C9.53305 7.38412 9.67256 7.16395 9.73335 6.91726C9.79414 6.67057 9.7729 6.41079 9.67285 6.17725L7.3291 0.708496C7.21929 0.456742 7.02508 0.251194 6.77996 0.127294C6.53483 0.00339424 6.25416 -0.0310909 5.98633 0.0297849L0.908203 1.20166C0.649985 1.26129 0.419602 1.40668 0.254656 1.6141C0.0897096 1.82153 -5.94829e-05 2.07874 2.95713e-08 2.34375C2.95713e-08 14.8682 10.1514 25 22.6562 25C22.9213 25.0002 23.1787 24.9104 23.3862 24.7455C23.5937 24.5805 23.7392 24.3501 23.7988 24.0918L24.9707 19.0137C25.0312 18.7445 24.996 18.4627 24.8711 18.2168C24.7463 17.9708 24.5396 17.776 24.2866 17.666Z"
                                :fill="`white`" />

                        </g>

                    </svg>
                    <span> Book a session via phone</span>

                </div>

            </a>
        </div>

    </div>

</template>
<style scoped lang="scss">
.main-image-content {
    width: 100%;
    position: absolute;
    top: 40%;
    left: 13%;
}

h1,
h2 {
    color: white;
    line-height: 100%;
}

// .btn.bigScreen {
//     width: 20rem;
// }

.info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .btn-container {

        width: 30rem;
    }
}


.btn-container {
    width: 75%;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .btn {
        height: 5rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }


    .btn.transparent {
        display: flex;
        align-items: center;
        justify-content: center;



        position: relative;
        // padding: 0.5rem 1rem;
        background: transparent;
        color: white;
        font-size: 16px;
        border: none;
        cursor: pointer;

        .icon-wrapper {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            text-align: center;
        }

        ::before {
            content: "";
            position: absolute;
            inset: 0;
            padding: 2px;
            /* border thickness */
            border-radius: 8px;
            background: linear-gradient(180deg, #DAFFFF, #13ABAB);
            -webkit-mask:
                linear-gradient(#fff 0 0) content-box,
                linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            pointer-events: none;
            /* allows clicks through the pseudo-element */
        }

        svg {
            transform: translatey(-5%);
            height:2rem;
            margin-right: .5rem;
        }

        span {
            color: white;
            text-align: center;
            font-weight: 700;
        }

    }
}

.btn-container.responsive {
    display: none;
}

@media only screen and (max-width: 1100px) {
    h1.landing-header {
        font-size: 4rem;
        line-height: 1.2;
    }

    .main-image-content {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 80%;
        padding: 0 2rem;

        top: 25%;
        left: 0;

        .number {
            display: flex;
            align-items: center;
        }

        .btn-container {
            width: 100%;

            &.bigScreen {
                display: none;
            }

            &.responsive {
                display: flex;
                padding-bottom: 10vh;
                // align-self: flex-end;
                // position: absolute;
                // bottom:10rem;
                // margin-top: calc(80%);

            }

            >.btn {
                height: 6rem;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.8rem;

                span {
                    font-size: 1.8rem;

                }
            }
        }

        .number {
            margin-top: 0rem;
        }
    }
}

@media only screen and (max-width: 425px) {
    .main-image-content {
        top: 20%;
        height: 75%;
    }
}
</style>