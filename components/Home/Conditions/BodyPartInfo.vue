<script setup lang="ts">
import type { ConditionsInfoDetail } from '~/mixins/Conditions';



const props = defineProps({
    data: Object as () => ConditionsInfoDetail | null
})


</script>

<template>
    <div class="info-container">
        <h1>{{ props.data?.title }}</h1>

        <div class="flex-container">

            <div class="left">
                <div class="treatment box">
                    <h3>Available treatment:</h3>
                    <ul>
                        <li v-for="treatment in props.data?.availableTreatment" :key="treatment">{{ treatment }}</li>
                    </ul>
                </div>
                <div class="illness box">
                    <h3>Most Common Illness:</h3>
                    <ul>
                        <li v-for="illness in props.data?.illness" :key="illness.head">{{ illness.head }}</li>
                    </ul>
                </div>
            </div>
            <div class="right">
                <div class="symptoms box">

                    <h3>Symptoms:</h3>

                    <ul>
                        <li v-for="symptom in props.data?.symptoms" :key="symptom.head">{{ symptom.head }}</li>
                    </ul>

                    <svg xmlns="http://www.w3.org/2000/svg" width="209" height="334" viewBox="0 0 209 334" fill="none">
                        <path
                            d="M208.973 2.34178C208.973 2.34178 141.41 -24.6138 74.2838 104.382C74.2838 104.382 35.7895 10.9868 0 15.4369C0 15.4369 51.9085 98.8263 57.3725 136.638C57.3725 136.638 16.6654 278.36 9.043 320.65L6.31097 334C6.31097 334 77.8901 94.3762 209 2.37011"
                            fill="#EEECED" />
                    </svg>

                </div>
            </div>
        </div>

        <div class="mobile-container">
            <div class="treatment box">
                <h3>Available treatment:</h3>
                <ul>
                    <li v-for="treatment in props.data?.availableTreatment" :key="treatment">{{ treatment }}</li>
                </ul>
            </div>
            <div class="symptoms box">

                <h3>Symptoms:</h3>

                <ul>
                    <li v-for="symptom in props.data?.symptoms" :key="symptom.head">{{ symptom.head }}</li>
                </ul>



            </div>
            <div class="illness box">
                <h3>Most Common Illness:</h3>
                <ul>
                    <li v-for="illness in props.data?.illness" :key="illness.head">{{ illness.head }}</li>
                </ul>
            </div>

        </div>
    </div>
</template>

<style scoped lang="scss">
$gap: 1rem;

.mobile-container {
    display: none;
}

.info-container {

    .illness,
    .symptoms {
        background-color: $blue-shadow;
    }

    .treatment {
        background-color: $light-green;
    }


    .box {
        padding: $gap;
        border-radius: 18px;
        text-align: left;

    }

    h1 {
        margin-bottom: $gap;
    }

    h3 {
        font-weight: 500;
    }

    li {
        list-style-type: disc;
        margin-left: 20px;
        line-height: 130%;
        font-weight: 400;


    }


    .flex-container {
        display: flex;
        gap: $gap;

        .left {
            display: flex;
            flex-direction: column;
            gap: $gap;


        }

        .right {

            .symptoms {
                height: 100%;
                position: relative;

                svg {
                    top: 15%;
                    position: absolute;
                    z-index: 0;

                }

                ul {
                    position: relative;
                    z-index: 1;
                }
            }
        }

        @media screen and (max-width: 767px) {
            display: none;


        }

    }

}

@media screen and (max-width: 767px) {

    .info-container {
        text-align: left;
    }

    .flex-container {
        display: none;
    }

    .mobile-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 1rem;
        text-align: left;

        ul {
            width: 100%;
            text-align: left;
        }
    }
}
</style>
