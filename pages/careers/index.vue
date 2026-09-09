<script setup lang="ts">

import { onMounted, ref, type Ref } from 'vue';
import type { Job } from '~/types/types';
import CareerForm from '~/components/Career/careerForm.vue';
import CareerOptions from '~/components/Career/careerOptions.vue';
import careersSeo from '~/assets/seoMetaTags/careers';

usePageSeo(careersSeo);

const careerFormRef = ref<InstanceType<typeof CareerForm> | null>(null);
const route = useRoute();

const { data, pending, error } = await useFetch<Job[]>(`${useUrl()}/web/careers`)
const allJobs = computed(()=>{
    return data.value || []
})
const availableJobs = computed(()=>{
    return data.value?.filter((job: any) => job.isAvailable == true).map((job: any) => job.title) || []
})

const assignJob = (j:string) => {
    if (careerFormRef.value) {
        careerFormRef.value.selectCareer(j);
    }
}

onMounted(() => {
    if (route.query.apply) {
        assignJob(route.query.apply as string);
    }
})
</script>
<template>
    <div class="Ccontainer">
        <div class="sectionHeader">
            <h1 class="pageHeader">Join our team</h1>
            <p>We Are Always Hiring</p>
        </div>
        <div class="careers-container">

            <CareerForm ref="careerFormRef" :jobs="availableJobs"/>
            <CareerOptions :jobs="allJobs"/>


        </div>
    </div>
</template>
<style scoped lang="scss">
$formgap: 1.25rem;

.Ccontainer {
    @include pagePadding();
    padding-top: calc(8vh + 7.5vh);

    @media screen and (max-width: 800px) {
        padding-top: 10vh;

    }

    display: flex;
    flex-direction: column;
    width: 100%;

    .careers-container {
        display: flex;
        width: 100%;
        gap: 5rem;

        @media screen and (max-width: 800px) {
            flex-direction: column;

        }



    }
}
</style>