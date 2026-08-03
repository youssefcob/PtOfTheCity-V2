<script setup lang="ts">
import { ref, type Ref } from 'vue';
import ContactForm from './ContactForm.vue';
import ContactUsImage from './ContactUsImage.vue';

const props = defineProps({
    header: String,
});

const contactFormRef: Ref<typeof ContactForm | null> = ref(null);
const submit = () => {
    contactFormRef.value?.validate();
}
</script>

<template>
    <div class="container">
        <div class="sectionHeader">
            <h1>{{header || $translate('contactUs')}}</h1>
            <p>{{$translate('contact_us_phrase')}}</p>
        </div>
        <div class="form-image-container">
            <div class="form-container">
                <ContactForm ref="contactFormRef" />
            </div>
            <div class="image-container">
                <ContactUsImage />
            </div>
        </div>
        <div @click="submit" class="btn responsive main">{{ $translate('submit') }}</div>

    </div>
</template>

<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
    @include pagePadding;
    .sectionHeader{
        width:100%;
    }
 
    .form-image-container {
        display: flex;
        justify-content: space-between;
        height: fit-content;
        gap: 1.25rem;

        .form-container {
            width: 55%;

            @media screen and (max-width: 768px) {
                width: 100%;

            }
        }

        .image-container {
            width: 45%;
            // height:100%;
            // background-color: blue;
            overflow: hidden;
            border-radius: 1.25rem;
            border: 1px solid $blue;

            @media screen and (max-width: 768px) {
                display: none;
                width: 0%;

            }

        }
    }

    .main {
        
    }

}
</style>