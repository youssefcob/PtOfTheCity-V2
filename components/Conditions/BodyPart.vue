<script setup lang="ts">
import { type ConditionsInfoDetail } from '~/mixins/Conditions';

const props = defineProps({
    mirrored: Boolean,
    content: Object as () => ConditionsInfoDetail | null,
    img: String
})




</script>

<template>
    <div class="wrapper" :id="props.img">
        <div class="symptoms-image-wrapper"
            :class="`${props.mirrored ? 'no-padding-right ' : 'no-padding-left reversed'}`">
            <NuxtImg loading="lazy" format="webp" :class="`${props.mirrored ? 'mirrored' : ''}`"
                :src="`/images/body/${props.img}.png`" alt=""/>
            <div class="symptoms">
                <h1>{{ props.content?.title }}</h1>
                <h2>Symptoms</h2>
                <ul :class="`${props.mirrored ? 'no-padding-left' : 'no-padding-right'}`">
                    <template v-for="symptom in props.content?.symptoms" :key="symptom.head">
                        <li>{{ symptom.head }}</li>
                        <span>{{ symptom.content }}</span>
                    </template>
                </ul>
            </div>
        </div>
        <div class="illness-treatment-wrapper" :class="`${props.mirrored ? '' : 'mirrored'}`">
            <div class="illness">
                <h2>Most Common Illness:</h2>
                <ul>
                    <template v-for="illness in props.content?.illness" :key="illness">
                        <li>{{ illness.head }}</li>
                        <span>{{ illness.content }}</span>
                    </template>
                </ul>
            </div>
            <div class="treatment">
                <h2>Available Treatment:</h2>
                <ul>
                    <template v-for="treatment in props.content?.availableTreatment" :key="treatment">
                        <li>{{ treatment }}</li>
                    </template>
                </ul>

                <svg xmlns="http://www.w3.org/2000/svg" width="209" height="334" viewBox="0 0 209 334" fill="none">
                    <path
                        d="M208.973 2.34178C208.973 2.34178 141.41 -24.6138 74.2838 104.382C74.2838 104.382 35.7895 10.9868 0 15.4369C0 15.4369 51.9085 98.8263 57.3725 136.638C57.3725 136.638 16.6654 278.36 9.043 320.65L6.31097 334C6.31097 334 77.8901 94.3762 209 2.37011"
                        fill="#EEECED" />
                </svg>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.wrapper {
    .symptoms-image-wrapper {

        @include pagePadding;
        display: flex;
        gap:4rem;

        &.no-padding-left {
            padding-left: 0;

            .symptoms {
                border-radius: 0 18px 18px 0;

                @include pagePadding;
                padding-top: 2rem;
                padding-bottom: 2rem;


            }
        }

        &.no-padding-right {
            padding-right: 0;

            .symptoms {
                border-radius: 18px 0 0 18px;
                
                @include pagePadding;
                padding-top: 2rem;
                padding-bottom: 2rem;
                padding-left:5rem;

            }
        }

        &.reversed {
            flex-direction: row-reverse;
        }

        img {
            width: 36rem;
            height: 45rem;

            &.mirrored {
                transform: scaleX(-1);
            }
        }

        .symptoms {
            background: linear-gradient(90deg, #22647F 0%, #07151B 100%);
            width: 100%;




            ul {
                list-style-type: disc;
                margin-left: 20px;
                line-height: 130%;
                font-weight: 400;
                // @include pagePadding;
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                padding-bottom: 3rem;



                li,
                span {
                    color: $white;
                }
                span{
                    line-height: 120%;
                }

            }

            h1,
            h2,
            span {
                color: $white;
            }
        }
    }

    .illness-treatment-wrapper {
        margin-top: 7rem;
        display: flex;
        justify-content: space-between;
        gap: 5rem;
        @include pagePadding;

        &.mirrored {
            flex-direction: row-reverse;
        }

        ul {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            position: relative;
            z-index: 1;

            li {
                font-weight: 600;
            }
        }

        h2 {
            color: $navy;
        }

        span {
            display: block;
            width: 70%;
        }

        .illness {
            width: 50%;
            padding: 2rem;


        }

        .treatment {
            background-color: $light-green;
            padding: 2rem;
            border-radius: $border-radius;
            position: relative;

            svg {
                top: 46%;
                left: 80%;
                position: absolute;
                z-index: 0;

                path {
                    fill: $green;
                }

            }
        }
    }
}
</style>