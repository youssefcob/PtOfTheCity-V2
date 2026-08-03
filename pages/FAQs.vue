
<script setup lang="ts">

import { ref, type Ref } from 'vue';
import QuestionAccordion from '~/sharedComponents/FAQs/QuestionAccordion.vue';
import ContactUsPage from '~/components/ContactUsSection/ContactUsPage.vue';

const isFirstItem = (index: number) => {
    return (index === 0);
}

const faqs = ref({});
const faqsHeaders: Ref<string[]> = ref([]);
const { data: faqsData,pending,error } = await useFetch(`${useUrl()}/web/faqs`);

faqs.value = faqsData.value || {};

faqsHeaders.value = Object.keys(faqs.value);



</script>
<template>
    <div class="page-container">
        <div class="questions">
            <template v-for="(header, index) in faqsHeaders">
                <div class="wrapper">
                    <h1 class="sectionHeader">
                        {{ header }}
                    </h1>
                    <div class="questionsContainer">
                        <QuestionAccordion v-for="(faq, index) in faqs[header as keyof typeof faqs]" :faq="faq"
                            :key="index" :active="isFirstItem(index)" />
                    </div>
                </div>
            </template>
        </div>
        <ContactUsPage class="contactForm" header="Still have a question?" />
    </div>
</template>
<style scoped lang="scss">
.page-container {
    padding-top: calc(8vh + 7.5vh);

    .questions {
        @include pagePadding;
        display: flex;
        flex-direction: column;
        gap: 2rem;

    }

    .questionsContainer {
        display: flex;
        flex-direction: column;
        gap: 0.7rem;
    }

    .contactForm {
        margin-top: 2rem;
    }



}
</style>