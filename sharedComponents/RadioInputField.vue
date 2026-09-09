<script setup lang="ts">
import { ref, watch, computed } from 'vue';

// A plain string is both the displayed text and the emitted/checked value
// (existing behavior, unchanged). Pass { label, value } instead when the
// displayed text needs to differ from what's actually submitted/compared -
// e.g. showing "Yes, Existing Patient" while still emitting just "Yes".
type RadioOption = string | { label: string; value: string };

const props = defineProps<{
  title?: string,
  options: RadioOption[],
  error?: boolean,
  checked?: string,
  color?:string,
  layoutMobile?:string,
  pill?: boolean,
}>();

const emit = defineEmits(['change']);
const selectedOption = ref(props.checked);

const normalizedOptions = computed(() =>
  props.options.map(opt => typeof opt === 'string' ? { label: opt, value: opt } : opt)
);

// Watch for external changes to the checked prop
watch(() => props.checked, (newValue) => {
  selectedOption.value = newValue;
});

// Handle option selection
const selectOption = (value: string) => {
  selectedOption.value = value;
  emit('change', value);
};
</script>

<template>
  <div class="radio-input-field" :class="{ pill: props.pill }">
    <span class="text title" v-if="props.title" :style="props.error ? `color:red;` : `color:${props.color}` ">{{ props.title }}<template v-if="!props.pill">:</template></span>
    <div :class="`options ${layoutMobile === 'vertical'?'m-column':''}`" >
      <div class="option" v-for="option in normalizedOptions" :key="option.value" :class="{ active: selectedOption === option.value }" @click="selectOption(option.value)">
        <input
          type="radio"
          :id="`${props.title}-${option.value}`"
          :name="props.title"
          :value="option.value"
          :checked="selectedOption === option.value"
          @change="selectOption(option.value)"
        />
        <div
          v-if="!props.pill"
          class="radio-input"
          :class="{ active: selectedOption === option.value }"
        ></div>
        <label
          class="text"
          :style="props.error ? `color:red;` : `color:${props.color}` "
        >{{ option.label }}</label>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.radio-input-field {
  display: flex;
  gap: 1.25rem;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: $border-radius;

  .text {
    color: $black;
    transition: all 0.3s ease-in-out;
    font-size:1.4rem;
    
  }

  .options {
    display: flex;
    column-gap: 3rem;
    row-gap: 1rem;
    flex-wrap:wrap;
    // width: 100%;

    input {
      display: none;
    }

    .option {
      display: flex;
      gap: 1rem;
      align-items: center;
      cursor: pointer;

      .radio-input {
        background-color: $white;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        box-shadow: 0px 0px 6.7px 0px rgba(44, 50, 51, 0.50) inset;
        transition: all 0.3s ease-in-out;

        &.active {
          background-color: $blue;
          transition: all 0.3s ease-in-out;
        }
      }
    }
  }
}

@media screen and (max-width:600px) {
  .m-column{
    flex-direction: column;
  }

}

.radio-input-field.pill {
  // base .radio-input-field is a single centered row (title beside the
  // options) - the pill variant stacks the title above its own row instead.
  flex-direction: column;
  align-items: flex-start;
  height: auto;
  gap: 0.75rem;
  flex-wrap: wrap;

  .title {
    font-family: $font-poppins;
    font-size: 1.125rem;
    color: $primary-700;
  }

  .options {
    column-gap: 1.25rem;
  }

  .option {
    border: 1px solid $primary-600;
    border-radius: 0.75rem;
    padding: 1rem 2rem;
    transition: background-color 0.2s ease-in-out;

    .text {
      font-family: $font-poppins;
      font-weight: 600;
      font-size: 1.125rem;
      color: #1a1a1a;
      white-space: nowrap;
    }

    &.active {
      background-color: $primary-base;
    }
  }
}
</style>