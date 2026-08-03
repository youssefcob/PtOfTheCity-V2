<script setup lang="ts">
import { defineAsyncComponent, onMounted } from 'vue';
import type { Clinic } from '~/types/types';

const ClinicsMap = defineAsyncComponent(() => import('~/sharedComponents/Map.vue'));

type ClinicsGrouped = {
    city:string,
    count:number,
    positions:{
        lat:string,
        long:string,
    }[]
}

const homepageData = inject('homepageData') as Ref<{
    clinics: ClinicsGrouped[]
}>;
const pending = inject('homepagePending');
const error = inject('homepageError');


const clinicsData = computed(() => homepageData.value?.clinics as ClinicsGrouped[]);
const clinicCount = computed(() => {
    if (!clinicsData.value) return 0;

    return clinicsData.value.reduce((accumulator, clinic) => {
        return accumulator + clinic.count;
    }, 0);
});

const positions = computed(() =>
    clinicsData.value ?
        clinicsData.value.flatMap(clinic => clinic.positions) :
        []
);

const showMap = ref(false);

onMounted(() => {
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => { showMap.value = true; });
    } else {
        setTimeout(() => { showMap.value = true; }, 1000);
    }
});

</script>

<template>
    <h1 class="responsive">Our {{ clinicCount }} Clinics</h1>
    <div class="clinics-container">
        <div class="clinic-map">
            <div class="clinics-wrapper">
                <h1>Our {{ clinicCount }} Clinics</h1>

                <!-- <Loading state  -->
                <div v-if="pending" class="loading">
                    <div class="loading-text">Loading clinics...</div>
                </div>

                <!-- Error state -->
                <div v-else-if="error" class="error">
                    <div class="error-text">Failed to load clinics</div>
                </div>
                <!-- Clinics list -->
                <div v-else-if="clinicsData" class="clinics">
                    <template v-for="(location, index) in clinicsData" :key="index">
                        <NuxtLink :to="`/clinics/${createSlug(location.city)}`">
                            <div class="single-clinic">
                                <h2>{{ location.city }}</h2>
                                <span>{{ location.count}} Clinics</span>
                            </div>
                        </NuxtLink>
                    </template>
                </div>

                <div class="btns-wrapper">
                    <NuxtLink :to="`/clinics/all`">
                        <div class="btn responsive">See all clinics</div>
                    </NuxtLink>

                    <NuxtLink :to="`/clinics/all`">
                        <div class="btn responsive transparent">find your nearest location</div>
                    </NuxtLink>
                </div>
            </div>

            <div class="map-wrapper">
                <ClinicsMap v-if="showMap && !pending && clinicsData" :positions="positions" />
                <div v-else class="map-loading">
                    {{ pending ? 'Loading map...' : '' }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;

    .loading-text {
        color: $white;
        font-size: 1.2rem;
    }
}

.error {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;

    .error-text {
        color: $white;
        font-size: 1.2rem;
    }
}

.map-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: $white;
    font-size: 1.2rem;
}

.clinics-container {
    background: linear-gradient(90deg, #22647F 0%, #07151B 100%);
    @include pagePadding;

    .clinic-map {
        display: flex;
        justify-content: space-between;

        h1 {
            color: $white;
        }

        .clinics-wrapper {
            padding: 1.7rem 0 3rem 0;
            width: 50%;
            width: clamp(35rem, 40vw, 70rem);

            padding-right: 17rem;
            display: flex;
            flex-direction: column;
            gap: 3rem;

            >.clinics {
                display: flex;
                flex-direction: column;
                gap: 1rem;

                .single-clinic {
                    display: flex;
                    align-items: first baseline;
                    justify-content: space-between;
                    border-bottom: 1px solid white;
                    cursor: pointer;

                    h2 {
                        color: white;
                    }

                    span {
                        color: white;
                        font-weight: 200;
                    }

                    &:hover {

                        // border-bottom:3px solid white;
                        >h2 {
                            font-weight: 500;
                        }

                        >span {
                            font-weight: 400;
                        }
                    }
                }
            }
        }

        .map-wrapper {
            width: 50%;
        }
    }

    .btns-wrapper {
        width: 70%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 1rem;
        align-self: first baseline;

        .btn.transparent {
            background: rgba(42, 192, 212, 0.20);
            color: white;
        }

        &.mobile {
            display: none;
        }
    }

    @media screen and (max-width: 990px) {
        padding: 0;

        .clinic-map {
            flex-direction: column-reverse;

            .clinics-wrapper {
                width: 100%;
                @include pagePadding;

                h1 {
                    display: none;
                }

                @media screen and (max-width: 990px) {
                    padding-top: 3rem;
                    padding-bottom: 3rem;
                }

                .btns-wrapper {
                    width: 100%;
                    gap: 1rem;

                    .btn {
                        margin: 0;
                        width: 100%;
                    }
                }
            }

            .map-wrapper {
                width: calc(100vw);
                height: 40vh;
                justify-self: flex-end;
            }
        }
    }
}

h1.responsive {
    display: none;

    @media screen and (max-width: 990px) {
        display: block;
        color: $navy;
        @include pagePadding;
        margin-bottom: 2rem;
    }
}
</style>