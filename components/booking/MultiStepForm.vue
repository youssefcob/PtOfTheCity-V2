<template>
  <div class="form-container">
    <transition v-for="s in totalSteps" :name="step === s ? transitionName : ''">
      <div v-show="step === s" :key="s" class="form-step">
        <slot :name="`step${s}`"></slot>
      </div>
    </transition>

  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  step: {
    type: Number,
    default: 1
  },
  transitionName: {
    type: String,
    default: 'slide-left'
  },
  totalSteps:{
  type: Number,
  default: 4
},
})
</script>

<style scoped>
.form-container {
  position: relative;
  flex: 1;
  display: flex;
  width: 100%;
  padding-top: 3rem;
  padding-bottom: 3rem;
  /* height:55vh; */
}

/* Step Container */
.form-step {
  display: flex;
  flex: 1;
  flex-direction: column;

  /* min-height:max-content; */
}

/* Slide Animations */
.slide-left-enter-from {
  transform: translateX(100%);
  opacity: 0;
  /* position: absolute; */
}

.slide-left-enter-active {
  transition: all 0.5s ease;
  /* position: absolute; */

}

.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
  /* position: absolute; */

}

.slide-left-leave-active {
  transition: all 0.3s ease;
  /* position: absolute; */

}

.slide-right-enter-from {
  transform: translateX(-100%);
  opacity: 0;
  /* position: absolute; */

}

.slide-right-enter-active {
  transition: all 0.5s ease;
  /* position: absolute; */

}

.slide-right-leave-to {
  transform: translateX(100%);
  /* position: absolute; */
  opacity: 0;
}

.slide-right-leave-active {
  transition: all 0.3s ease;
  /* position: absolute; */

}
</style>