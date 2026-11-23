<script setup lang="ts">
// Required, unticked-by-default consent checkbox shown above every form's
// submit button. Parent owns the boolean via v-model and must block submit
// (and send `terms_accepted: true`) when it is false.
defineProps<{ modelValue: boolean; error?: boolean }>();
const emit = defineEmits<{ (e: 'update:modelValue', v: boolean): void }>();
</script>

<template>
    <label class="terms-checkbox" :class="{ error }">
        <input type="checkbox" required :checked="modelValue"
            @change="emit('update:modelValue', ($event.target as HTMLInputElement).checked)" />
        <span>
            I agree to the
            <NuxtLink to="/privacy-policy#terms" target="_blank" rel="noopener">Terms &amp; Conditions</NuxtLink>
            and
            <NuxtLink to="/privacy-policy#privacy" target="_blank" rel="noopener">Privacy Policy</NuxtLink>
        </span>
    </label>
</template>

<style scoped lang="scss">
.terms-checkbox {
    display: flex;
    align-items: flex-start;
    gap: 0.8rem;
    font-family: inherit;
    font-size: 1.3rem;
    line-height: 1.5;
    cursor: pointer;
    text-align: left;

    input {
        width: 1.8rem;
        height: 1.8rem;
        min-width: 1.8rem;
        margin: 0.1rem 0 0;
        accent-color: $cta;
        cursor: pointer;
    }

    a {
        color: inherit;
        text-decoration: underline;
        font-weight: 600;
    }

    &.error {
        outline: 2px solid #d93025;
        outline-offset: 4px;
        border-radius: 4px;
    }
}
</style>
