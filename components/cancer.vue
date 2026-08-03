<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Props {
  text?: string
  speed?: number
  size?: 'sm' | 'md' | 'lg'
  color?: string
  disabled?: boolean
  zIndex?: number
}

const props = withDefaults(defineProps<Props>(), {
  text: 'Follow Me!',
  speed: 0.1,
  size: 'md',
  color: '#ff6b6b',
  disabled: false,
  zIndex: 9999
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

// Reactive state
const mouseX = ref<number>(0)
const mouseY = ref<number>(0)
const buttonX = ref<number>(0)
const buttonY = ref<number>(0)
const isHovered = ref<boolean>(false)

let animationFrame: number | null = null

// Button size configurations
const sizeConfig = {
  sm: { padding: '8px 16px', fontSize: '14px' },
  md: { padding: '12px 24px', fontSize: '16px' },
  lg: { padding: '16px 32px', fontSize: '18px' }
}

// Computed styles for the button
const buttonStyle = computed(() => ({
  position: 'fixed' as const,
  left: `${buttonX.value}px`,
  top: `${buttonY.value}px`,
  transform: `translate(-50%, -50%) scale(${isHovered.value ? 1.05 : 1})`,
  padding: sizeConfig[props.size].padding,
  fontSize: sizeConfig[props.size].fontSize,
  background: props.color,
  color: 'white',
  border: 'none',
  borderRadius: '25px',
  fontWeight: 'bold',
  cursor: props.disabled ? 'not-allowed' : 'pointer',
  boxShadow: `0 4px 15px ${props.color}40`,
  zIndex: props.zIndex,
  userSelect: 'none' as const,
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  opacity: props.disabled ? 0.6 : 1,
  pointerEvents: props.disabled ? 'none' : 'auto'
}))

// Track mouse movement globally
const trackMouse = (event: MouseEvent): void => {
  mouseX.value = event.clientX
  mouseY.value = event.clientY
}

// Smooth following animation
const startFollowing = (): void => {
  const follow = (): void => {
    if (!props.disabled) {
      buttonX.value += (mouseX.value - buttonX.value) * props.speed
      buttonY.value += (mouseY.value - buttonY.value) * props.speed
    }
    
    animationFrame = requestAnimationFrame(follow)
  }
  follow()
}

// Handle button clicks
const handleClick = (event: MouseEvent): void => {
  if (!props.disabled) {
    emit('click', event)
  }
}

// Handle hover states
const handleMouseEnter = (): void => {
  if (!props.disabled) {
    isHovered.value = true
  }
}

const handleMouseLeave = (): void => {
  isHovered.value = false
}

// Lifecycle hooks
onMounted(() => {
  // Use window to track mouse globally across the entire page
  window.addEventListener('mousemove', trackMouse)
  startFollowing()
  
  // Initialize button position to center of screen
  buttonX.value = window.innerWidth / 2
  buttonY.value = window.innerHeight / 2
})

onUnmounted(() => {
  window.removeEventListener('mousemove', trackMouse)
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
})
</script>

<template>
  <Teleport to="body">
    <NuxtLink to="/booking" :style="buttonStyle"
      @click="handleClick"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      :disabled="disabled"
    >
      {{ text }}
  </NuxtLink>
  </Teleport>
</template>