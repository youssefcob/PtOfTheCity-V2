<template>
    <div class="step-indicator">
        <template v-for="(stepNum, index) in steps" :key="stepNum">
            <div class="step-dot" :class="{
                active: stepNum === currentStep,
                completed: stepNum < currentStep
            }"></div>

            <div v-if="stepNum < steps" class="step-line" :class="{
                active: stepNum === currentStep,
            }"></div>

  
        </template>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

const props = defineProps({
    steps: {
        type: Number,
        default: () => 4
    },
    currentStep: {
        type: Number,
        default: 1
    }
});

const previousStep = ref(props.currentStep);
const transitionName = computed(() =>
    props.currentStep > previousStep.value ? "line-grow" : "line-shrink"
);

watch(
    () => props.currentStep,
    (newVal, oldVal) => {
        previousStep.value = oldVal;
    }
);
</script>

<style scoped lang="scss">
.step-indicator {
    display: flex;
    align-items: center;
    //   justify-content: center;
    width: 20rem;
    min-width: 150px;
    //   background-color: red;
    gap: 1rem;
}

.step-dot {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    border: 1px solid #2dc0ff;
    background-color: transparent;
    transition: background-color 0.3s, border-color 0.3s;

    &.completed {
        background-color: #4caf50;
        border-color: #4caf50;
    }

    &.active {

        background-color: #2dc0ff;
        border-color: #2dc0ff;
    }
}

.step-line {
    height: 2px;
    background-color: #2dc0ff;
    opacity: 0.5;
    flex-shrink: 0;
    width: 0;
    transition: width 0.4s ease;

    &.active {
        width: 3rem;
    }
}


</style>
