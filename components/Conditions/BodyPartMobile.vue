<script setup lang="ts">
import { conditionsInfo, type ConditionsInfoDetail } from '~/mixins/Conditions';

const props = defineProps({
    mirrored: Boolean,
    content: Object as () => ConditionsInfoDetail | null,
    img: String
})

</script>


<template>

    <div class="wrapper" :id="props.img">

        <NuxtImg loading="lazy" format="webp" :src="`/images/body/${props.img}.png`" alt=""/>

        <div class="symptoms">
            <h1>{{ props.content?.title }}</h1>
            <h2>Symptoms</h2>
            <ul>
                <template v-for="symptom in props.content?.symptoms" :key="symptom.head">
                    <li>{{ symptom.head }}</li>
                    <span>{{ symptom.content }}</span>
                </template>
            </ul>
        </div>
        <div class="illness">
            <h1>{{ props.content?.title }}</h1>

            <h2>Most Common Illness:</h2>
            <ul>
                <template v-for="illness in props.content?.illness" :key="illness">
                    <li>{{ illness.head }}</li>
                    <span>{{ illness.content }}</span>
                </template>
            </ul>
        </div>
        <div class="treatment">
            <h1>{{ props.content?.title }}</h1>

            <h2>Available Treatment:</h2>
            <ul>
                <template v-for="treatment in props.content?.availableTreatment" :key="treatment">
                    <li>{{ treatment }}</li>
                </template>
            </ul>
        </div>
    </div>
</template>

<style scoped lang="scss">
.wrapper {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    display:relative;

    img{
        
        position:absolute;
        width:70%;
        left:60%;
        transform:translatex(-50%);
        z-index: -1;
        opacity:30%;
    }

    h2 {
        color: $navy;
    }

    li {
        font-size: 2rem;
        line-height: 150%;
        list-style-position: inside;
    }

    .symptoms,
    .illness {
        li {
            font-weight: 600;
            font-size: 2rem;
            line-height: 150%;
            margin: 1.5rem 0;
        }
    }

    .treatment {
        ul {
            background-color: $light-green;
            border-radius:$border-radius;
            padding:1.25rem 0 ;
        }
    }

}
</style>