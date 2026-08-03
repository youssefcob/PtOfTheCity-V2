<template>
  <div class="otp-container">
    <input
      v-for="(digit, index) in otp"
      :key="index"
      ref="inputs"
      type="text"
      inputmode="numeric"
      maxlength="1"
      class="field"
      v-model="otp[index]"
      @input="onInput($event, index)"
      @keydown.backspace="onBackspace($event, index)"
      @paste="onPaste($event)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

// Number of OTP digits
const length = 6
const otp = ref<string[]>(Array(length).fill(''))
const inputs = ref<HTMLInputElement[]>([])

// Emit the complete code when changed
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

watch(otp, (val) => {
  emit('update:modelValue', val.join(''))
}, { deep: true }) // 🔥 This is the key!


const onInput = (e: Event, index: number) => {
  const input = e.target as HTMLInputElement
  const value = input.value.replace(/\D/g, '') // only digits

  otp.value[index] = value.slice(-1) // keep only last entered digit

  // Move to next input if this one is filled
  if (value && index < length - 1) {
    inputs.value[index + 1]?.focus()
  }
}

const onBackspace = (e: KeyboardEvent, index: number) => {
  if (!otp.value[index] && index > 0) {
    inputs.value[index - 1]?.focus()
  }
}

const onPaste = (e: ClipboardEvent) => {
  e.preventDefault()
  const pasted = e.clipboardData?.getData('text') ?? ''
  const digits = pasted.replace(/\D/g, '').split('').slice(0, length)

  digits.forEach((d, i) => (otp.value[i] = d))
  // Focus last filled input
  const nextIndex = Math.min(digits.length, length - 1)
  inputs.value[nextIndex]?.focus()
}

onMounted(() => {
  inputs.value = Array.from(document.querySelectorAll('input'))
})
</script>

<style scoped lang="scss">
.otp-container{
  display: grid;
  gap: .7rem;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(6, auto);

  .field{
    width: 100%;
    height: 5rem;
    font-size: 2rem;
    text-align: center;
    border: none;
    border-radius: 10px;
    outline: none;
    transition: border-color 0.3s;


    &:focus{
      border-color: #007BFF;
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
  }
}
</style>