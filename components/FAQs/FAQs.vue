<script setup lang="ts">
import Http from '@/mixins/Http';
import { onMounted, ref } from 'vue';
import type { FAQs } from '~/sharedComponents/FAQs/FAQs';
import QuestionAccordion from '~/sharedComponents/FAQs/QuestionAccordion.vue';



const homepageData = inject('homepageData') as Ref<{
    FAQs: FAQs[]
}>;
const homepagePending = inject('homepagePending');
const homepageError = inject('homepageError');

const faqs = computed(() => homepageData.value?.FAQs as FAQs[]);


</script>

<template>
    <div class="container">
        <h1 class="sectionHeader">{{ $translate('faqs') }}</h1>
        <div class="questionsContainer">
            <QuestionAccordion v-for="(faq,index) in faqs" :faq="faq" :key="index"  />
        </div>
        <NuxtLink to="/FAQs" class="btn transparent responsive main">More FAQs</NuxtLink>
    </div>
</template>

<style scoped lang="scss">

.container{
    display: flex;
    flex-direction: column;
    @include pagePadding;
    .sectionHeader{
        width:100%;
    }

    .questionsContainer{
        display: flex;
        flex-direction: column;
        gap:0.7rem;
    }


    .main{
        @media screen and (min-width: 500px){
            align-self: flex-end;
            width:20%;
            
        }
  
    }
}

</style>