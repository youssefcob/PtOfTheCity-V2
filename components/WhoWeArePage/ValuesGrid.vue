<script setup lang="ts">
import { values } from './values';
import { onMounted, type Ref, ref } from 'vue';
let valueDesc: Ref<string> = ref('');

onMounted(() => {
    valueDesc.value = values[0].description;

    let valuesEl = document.querySelectorAll('.value');
    valuesEl[0].classList.add('active');
    valuesEl.forEach((value, index) => {
        value.addEventListener('click', () => {
            valueDesc.value = values[index].description;
            toggleActive(index);
        });
    });
    const toggleActive = (index: number) => {
        valuesEl.forEach((value, i) => {
            if (i === index) {
                value.classList.add('active');
            } else {
                value.classList.remove('active');
            }
        });
    }
});
</script>

<template>
    <div class="values">
        <div class="value" v-for="(value, index) in values" :key="index">
            <div class="mask" :style="{
                maskImage: `url(${value.path})`,
            }">
                <NuxtImg loading="lazy" format="webp" class="navy" :src="'/images/navyMask.jpg'"/>
                <NuxtImg loading="lazy" format="webp" class="white" :src="'/images/whiteMask.jpg'"/>
            </div>
            <h3 class="header-t"> {{ value.name }} </h3>
            <div class="description">
                <h3 class="header-t">{{ value.name }}</h3>
                <p class="text-t">{{ value.description }}</p>
            </div>
        </div>
    </div>
    <div class="res-desc">
        <p class="text-s">{{ valueDesc }}</p>
    </div>
</template>

<style scoped lang="scss">
.values {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, auto);
    gap: 1rem;
    width: 100%;

    @media screen and (max-width: 500px) {
        margin-left: $resMargin;
    }

    .text-s{
        @media screen and (max-width: 1440px) {
            font-size: 1rem;
        }
    }

    @media screen and (max-width: 500px) {
        display: flex;
        gap: 1rem;
        align-items: center;
        overflow-x: scroll;
        @include scrollBar;

        >.value {
            width: 18rem;
        }
    }

    .value {
        flex: 0 0 auto;
        position: relative;
        background-color: $navy;
        height: 16rem;
        border-radius: $border-radius;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        
        >.mask {
            position: relative;
            height: 100%;
            width: 100%;
            mask-position: center;
            mask-size: contain;
            mask-repeat: no-repeat;
            
            .white,.navy{
                position: absolute;
                top: 0;
                left: 0;
            }
        }

        @media screen and (max-width: 500px) {
            &.active {
                background-color: $white;

                .white {
                    display: none;
                }

                >h3 {
                    color: $navy;
                }
            }
        }

        @media screen and (min-width: 500px) {
            &:hover {
                .description {
                    opacity: 1;
                    transition: all 0.3s ease-in-out;
                }
            }
        }

        h3 {
            color: $white;
            padding: 1rem;
        }

        >.description {
            position: absolute;
            top: 0;
            left: 0;
            background-color: $white;
            height: 100%;
            width: 100%;
            padding: 1rem 2rem;
            opacity: 0;
            transition: all 0.3s ease-in-out;

            >h3 {
                color: $navy;
                padding-left: 0;
            }

            >.text-t {
                line-height: normal;
                font-weight: 400;
                color: $navy;
            }
        }
    }
}

.res-desc {
    @include pagePadding;

    @media screen and (min-width: 500px) {
        display: none;
    }

    >.text-s {
        background-color: white;
        padding: 2rem;
        height: 15rem;
        display: flex;
        align-items: center;
        border-radius: $border-radius;
    }
}
</style> 