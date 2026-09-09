<script setup lang="ts">
import { defineAsyncComponent, onMounted } from 'vue';
import EditableText from '~/components/Admin/EditableText.vue';

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
    <section class="locations">
        <img class="texture" src="/images/home/texture-pattern.webp" alt="" aria-hidden="true" />

        <div class="intro">
            <EditableText tag="p" class="overline" content-key="home.clinics.overline" default="Locations" />
            <EditableText tag="h2" class="heading" content-key="home.clinics.heading" default="Find Expert Care Near You" />
            <EditableText tag="p" class="body" content-key="home.clinics.body"
                default="Whether you're recovering from an injury, managing chronic pain, or working toward a stronger, healthier future, our team is here to help at a location convenient for you." />
        </div>

        <div class="content">
            <div class="list-col">
                <div v-if="pending" class="loading">
                    <div class="loading-text">Loading clinics...</div>
                </div>

                <div v-else-if="error" class="error">
                    <div class="error-text">Failed to load clinics</div>
                </div>

                <div v-else-if="clinicsData" class="city-list">
                    <NuxtLink v-for="location in clinicsData" :key="location.city"
                        :to="`/clinics/${createSlug(location.city)}`" class="city-row">
                        <span class="city-name">{{ location.city }}</span>
                        <span class="city-count">{{ location.count }} Clinics</span>
                    </NuxtLink>
                </div>

                <NuxtLink to="/clinics/all" class="text-link">
                    <EditableText tag="span" class="text-link" content-key="home.clinics.link_label" default="View All Clinics" />
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                    </svg>
                </NuxtLink>
            </div>

            <div class="map-col">
                <ClinicsMap v-if="showMap && !pending && clinicsData" :positions="positions" />
                <div v-else class="map-loading">
                    {{ pending ? 'Loading map...' : '' }}
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.locations {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
    padding: 3.75rem 7.5rem;
    background-color: $primary-600;
    overflow: hidden;

    @media screen and (max-width: 900px) {
        padding: 2.5rem 1.5rem;
    }
}

.texture {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.12;
    pointer-events: none;
}

.intro {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-width: 60rem;
}

.overline {
    @include type-overline;
    color: $accent-cyan;
}

.heading {
    @include type-h2;
    text-transform: uppercase;
    color: #ffffff;
}

.body {
    @include type-body;
    color: #ffffff;
}

.content {
    position: relative;
    display: flex;
    align-items: stretch;
    gap: 2.3rem;

    @media screen and (max-width: 900px) {
        flex-direction: column;
    }
}

.list-col {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 32%;
    min-width: 20rem;

    @media screen and (max-width: 900px) {
        width: 100%;
        min-width: 0;
        // map image comes first in the mobile design, list below it
        order: 2;
    }
}

.loading,
.error {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 12rem;

    .loading-text,
    .error-text {
        @include type-body;
        color: #ffffff;
    }
}

.city-list {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 1.5rem;
    // spreads the rows across .list-col's full stretched height (which
    // matches the map's) instead of bunching them at the top - gap still
    // guarantees a minimum spacing when there are few cities.
    justify-content: space-between;
}

.city-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;
    border-bottom: 1px solid $primary-300;

    .city-name {
        @include type-h3;
        text-transform: uppercase;
        color: #ffffff;
    }

    .city-count {
        @include type-body;
        color: #ffffff;
        white-space: nowrap;
    }
}

.text-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    align-self: flex-start;
    @include type-button;
    color: #ffffff;

    &:hover {
        color: $accent-cyan;
    }
}

.map-col {
    flex: 1;
    min-height: 30rem;
    border-radius: 0;
    overflow: hidden;

    @media screen and (max-width: 900px) {
        order: 1;
        // The map library sizes its own container to height: 100% of this
        // element. On desktop that resolves fine because row-flex stretch
        // gives .map-col a definite computed height; in the mobile column
        // layout, stretch only affects width, and min-height alone doesn't
        // count as a definite height for a percentage-height child to
        // resolve against - so the map silently collapsed to 0px tall.
        // `flex: 1` also has to go here too: its flex-basis: 0% would
        // otherwise outrank the explicit height below and collapse the item
        // right back to 0 before flex-grow gets anything to grow into (this
        // container's own height is intrinsic, not fixed, so there's no
        // space for flex-grow to distribute anyway).
        flex: 0 0 auto;
        height: 11rem;
    }
}

.map-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    min-height: 30rem;
    background-color: rgba(255, 255, 255, 0.05);
    @include type-body;
    color: #ffffff;

    @media screen and (max-width: 900px) {
        min-height: 11rem;
    }
}
</style>
