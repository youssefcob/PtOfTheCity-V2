<script setup lang="ts">
import type { Job } from '~/types/types';

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const { data } = await useFetch<Job[]>(`${useUrl()}/web/careers`);
const career = computed(() => data.value?.find(j => String(j.id) === String(id)));

const apply = () => {
    router.push({ path: '/careers', query: { apply: career.value?.title } });
};
</script>

<template>
    <div class="page-container">
        <NuxtLink to="/careers" class="back-link">← Back to Careers</NuxtLink>

        <div v-if="career" class="container">
            <h1 class="sectionHeader">{{ career.title }}</h1>
            <p class="p-head">Responsibilities and Duties include the following:</p>
            <div class="desc-button-wrapper">
                <div class="desc-wrapper">
                    <p class="text-s" v-html="career.description"></p>
                </div>
                <div class="btn responsive main" @click="apply()">Apply</div>
            </div>
        </div>

        <div v-else class="not-found">
            <p>Position not found.</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
.page-container {
    @include pagePadding();
    padding-top: calc(8vh + 7.5vh);

    @media screen and (max-width: 800px) {
        padding-top: 10vh;
    }
}

.back-link {
    display: inline-block;
    color: $blue;
    font-size: $h4;
    margin-bottom: 2rem;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
}

.container {
    user-select: none;
    background-color: rgba(44, 50, 51, 0.60);
    padding: 4rem 3rem;
    border-radius: $border-radius;
    border: 1px solid $blue;

    @media screen and (max-width: 800px) {
        padding: 2rem 1.5rem;
    }

    h1,
    p {
        color: $white;
    }

    .p-head {
        font-size: $h4;
        margin-bottom: 1.25rem;
        line-height: 140%;
    }

    .text-s {
        font-size: calc($h4 - 0.22rem);
    }

    .desc-button-wrapper {
        display: flex;
        gap: 0.5rem;

        @media screen and (max-width: 800px) {
            flex-direction: column;
        }

        .desc-wrapper {
            width: 70%;

            @media screen and (max-width: 800px) {
                width: 100%;
            }
        }

        .btn {
            align-self: flex-end;
            margin-top: auto;
        }
    }
}

.not-found {
    color: $white;
    font-size: $h4;
}
</style>
