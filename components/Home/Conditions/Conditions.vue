<script setup lang="ts">
import BodyHealth from '~/sharedComponents/Body/Body.vue';
import { reactive, ref, type Ref } from 'vue';
import { conditionsInfo, type ConditionsInfoDetail } from '~/mixins/Conditions';
import Instructions from './Instructions.vue';
import BodyPartInfo from './BodyPartInfo.vue';
let blog = reactive({
    neck: false,
    shoulder: false,
    back: false,
    abdomen: false,
    lowerBack: false,
    hands: false,
    elbows: false,
    knees: false,
    feet: false
})

const show = ref(false);
const infoValue: Ref<ConditionsInfoDetail | null> = ref(null);

const showInfo = (event: any) => {
    blog[event.id as keyof typeof blog] = event.show;
    show.value = event.show;

    updateInfo(event.id, event.show);
}

const updateInfo = (id: string, show: boolean) => {
    if (show) {
        infoValue.value = conditionsInfo[id as keyof typeof conditionsInfo];
    } else {
        infoValue.value = null;
    }
}

</script>

<template>

    <!-- <h1 :style="`position:absolute`" v-if="show">neck</h1> -->

    <div class="blog-container">
        <h1 class="mobile">Where is your pain</h1>

        <div class="info-wrapper">
            <div class="info">
                <Instructions v-if="!show"  class="desktop"/>
                <BodyPartInfo :data="infoValue" v-if="show" />
            </div>
            <div class="btn-wrapper">
                <NuxtLink to="/conditions" class="btn responsive transparent"
                    aria-label="Learn more about conditions we treat" title="Conditions We Treat">
                    Conditions We Treat</NuxtLink>
                <NuxtLink to="/booking" class="btn responsive ">Request Appointment</NuxtLink>
            </div>

        </div>

        <div class="figure">
            <BodyHealth @hover="showInfo($event)" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.mobile {
    display: none;

    @media screen and (max-width: 700px) {
        display: block;


    }
}

.blog-container {
    @include pagePadding;

    display: grid;
    grid-template-columns: 3fr 1fr;


    .info-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;

        @media screen and (max-width: 768px) {
            display: block;
        }

        >.info {
            height: 51vh;
            overflow: hidden;


        }

        .btn-wrapper {
            width: 100%;
            margin-top: 2rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .btn {
            width: 50%;
            // margin-top: 2rem;
            align-self: flex-start;

        }
    }

    .figure {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    @media only screen and (max-width: 950px) {
        grid-template-columns: 1fr;
        gap: 5rem;

        .info-wrapper {
            order: 2;
        }

        .figure {
            order: 1;
        }

        .info-wrapper {
            align-items: center;
            text-align: center;

            .btn {
                width: 100%;
            }
        }

        .figure {
            margin-top: 2rem;
        }
    }

}
</style>