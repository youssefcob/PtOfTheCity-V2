<template>
  <div class="video-wrapper">
    <div class="video-container">
<CldVideoPlayer 
  :src="videoId" 
  width="100%" 
  height="auto" 
  controls 
  autoplay
  aspect-ratio="16:9"
  :transformation="videoTransformation" 
  :player-options="playerOptions" 
/>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})
const videoId = 'ptofthecity_fst85n'

const videoTransformation = computed(() => ({
  quality: 'auto:best',
  fetch_format: 'auto',
  // streaming_profile: 'hd',
  width: 'auto',
  crop: 'scale'
}))

const playerOptions = {
  fluid: true,
  responsive: true,
  controls: true,
  autoplay: true,
  muted: true,
  preload: 'auto', // change from 'metadata' to 'auto' so it loads enough to play
  poster: {
    transformation: {
      quality: 'auto',
      format: 'jpg'
    }
  }
}
</script>
<style scoped>
.video-wrapper {
  display: flex;
  justify-content: center;
  /* align-items: center; */
  min-height: 100vh;
  /* padding: 1rem; */
  box-sizing: border-box;
}

.video-container {
  width: 100%;
  max-width: 100%;
  /* max-height: 90vh; */
  /* aspect-ratio: 16 / 9; */
}

/* Mobile-specific centering */
@media (max-width: 768px) {
  .video-wrapper {
    padding: 0.5rem;
    align-items: center;
  }
  
  .video-container {
    max-height: calc(100vh - 1rem); /* Account for padding */
  }
}
</style>