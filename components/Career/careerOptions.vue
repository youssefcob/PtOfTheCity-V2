<script setup lang="ts">
import type { Job } from '~/types/types';

const props = defineProps({
    jobs: {
        type: Array as () => Job[],
        default: () => ([]),
    },
});

const router = useRouter();

const openCareer = (career: Job) => {
    router.push(`/careers/${career.id}`);
};
</script>

<template>
    <div class="options-wrapper">
        <p>Check Responsabilties and duties</p>

        <div class="wrapper">
            <template v-for="career in props.jobs" :key="career.id">
                <div class="option" v-if="career.isAvailable">
                    <div class="wrap" @click="openCareer(career)">
                        <h3>{{ career.title }}</h3>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>


<style scoped lang="scss">
.options-wrapper {


    @media screen and (min-width: 800px) {
        width: 57%;
    }

    .wrapper {
        margin-top: 1rem;
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        justify-content: center;
        align-items: center;

        .option {
            // height: 100%;
            // width: 33%;
            width: 15rem;
            height: 15rem;
            // background-color: green;


            .wrap {
                height: 100%;
                width: 100%;
                background-color: $navy;
                display: flex;
                border-radius: $border-radius;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                padding: 1rem;

                &:hover {
                    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
                    transition: all 0.3s ease-in-out;

                }

                >h3 {
                    color: $white;
                    text-align: center;
                    font-size: clamp(2rem, 1.5vw, 3.3rem);
                    font-weight: 400;
                }
            }

            p {
                text-align: center;

            }

            // }
        }
    }

}
</style>