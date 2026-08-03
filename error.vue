<template>
</template>

<script setup lang="ts">
const props = defineProps<{
  error: {
    statusCode: number
    statusMessage: string
    message: string
  }
}>()

if (props.error.statusCode === 500) {
  await navigateTo('/', { replace: true })
}
</script>