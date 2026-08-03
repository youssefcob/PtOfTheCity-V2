<script setup lang="ts">

import { GoogleMap, CustomMarker } from 'vue3-google-map'

import type { Clinic } from '~/types/types';

const props = defineProps({
    positions: {
        type: Object as () => Clinic[] | { lat: string, long: string }[] | null,
        required: true
    },
    center: {
        type: Object as () => { lat: number, lng: number },
        default: { lat: 40.729995453917276, lng: -73.95794147644851 }
    },
    zoom: {
        type: Number,
        default: 9.5
    }
})

const config = useRuntimeConfig()
const google_api_key = config.public.googleApiKey as string;


</script>

<template>

    <ClientOnly>
        <GoogleMap :api-key="google_api_key" style="width: 100%; height: 100%" :center="props.center"
            :zoom="props.zoom" :libraries="['marker']">

            <template v-for="(location, index) in props.positions" :key="index">
                <CustomMarker :options="{ position: { lat: Number(location.lat), lng: Number(location.long) } }">
                    <div class="custom-marker">
                        📍
                    </div>
                </CustomMarker>
            </template>
        </GoogleMap>
    </ClientOnly >

</template>

<style>
.custom-marker {
    font-size: 2.5rem;
    transform: translate(-50%, -100%);
}
</style>
