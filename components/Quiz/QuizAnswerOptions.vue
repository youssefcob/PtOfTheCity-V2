<template>
  <div class="answers-group">
    <label
      v-for="answer in [...answers].reverse()"
      :key="answer.value"
      class="answer-option"
      :class="[`answer-${answer.value}`, modelValue === answer.value ? 'selected' : '']"
    >
      <input
        type="radio"
        :name="name"
        :value="answer.value"
        :checked="modelValue === answer.value"
        @change="$emit('update:modelValue', answer.value)"
      />
      <span class="answer-text">{{ answer.text }}</span>
    </label>
  </div>
</template>

<script lang="ts" setup>
import type { Answer } from '~/data/quizzes';

defineProps<{
  answers: Answer[];
  modelValue: number | undefined;
  name: string;
}>();

defineEmits<{
  'update:modelValue': [value: number];
}>();
</script>

<style scoped lang="scss">
.answers-group {
  display: flex;
  gap: 0.5rem;
  width: 100%;
}

.answer-option {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.6rem 1rem;
  border-radius: 2rem;
  cursor: pointer;
  border: 1px solid #2EE5C1;
  background-color: transparent;  // default: transparent with green border
  transition: all 0.2s ease;

  input[type="radio"] {
    display: none;
  }

  .answer-text {
    color: #333;
    font-size: 1.2rem;
    font-weight: 500;
    text-align: center;
  }

   &.answer-0 { &.selected { background-color: #BBFBAF; } }
  &.answer-1 { &.selected { background-color: #DEFBAF; } }
  &.answer-2 { &.selected { background-color: #FAFBAF; } }
  &.answer-3 { &.selected { background-color: #FBC5AF; } }
  &.answer-4 { &.selected { background-color: #FF6D6D; } }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &.selected {
    border-color: transparent;
    // box-shadow: 0 0 0 2px rgba(26, 140, 123, 0.3);
  }
  
}
@media screen and (max-width: 1200px) {
  .answers-group {
    flex-direction: column;
  }

  .answer-option {
    width: 100%;
    padding: 0.8rem 1rem;

    .answer-text {
      font-size: 1.4rem;
    }
  }
}
</style>