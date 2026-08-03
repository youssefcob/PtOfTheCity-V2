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

      <!-- Play button overlay -->
      <button v-if="isMuted" @click="unmute" class="play-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>
    </div>
  </div>
  <!-- s -->
</template>

<script setup lang="ts">
const route = useRoute();
const isMuted = ref(true);
let player: any = null;

// Map URL to Cloudinary video IDs
const videoMap: Record<string, string> = {
  Rus: "VA_Tutorial_-_Russian_Final_pqjtam",
  Eng: "VA_Tutorial_-_English_Final_ikw4ea",
  Spa: "Virtual_Assistant_Spanish_Revised_fcwr49",
};

// Get the language from the route param
const lang = route.params.lang as string;
const videoId = videoMap[lang] || videoMap["Eng"]; // Default to English

const videoTransformation = computed(() => ({
  quality: "auto:best",
  fetch_format: "auto",
  width: "auto",
  crop: "scale",
}));

const playerOptions = {
  fluid: true,
  responsive: true,
  controls: true,
  autoplay: true,
  muted: true,
  preload: "auto",
  poster: {
    transformation: {
      quality: "auto",
      format: "jpg",
    },
  },
};

const unmute = () => {
  // Access the Cloudinary player instance and unmute
  const videoElement = document.querySelector("video");
  if (videoElement) {
    videoElement.muted = false;
    videoElement.play(); // Ensure it's playing
    isMuted.value = false;
  }
};

// Handle invalid routes
if (!videoMap[lang]) {
  throw createError({ statusCode: 404, message: "Video not found" });
}
</script>

<style scoped>
.video-wrapper {
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  position: relative;
  padding-top: 7vh;
}

.video-container {
  width: 100%;
  max-width: 100%;
  position: relative;
}

.play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background: rgba(0, 0, 0, 0.5);
  border: 3px solid rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
}

.play-btn:hover {
  background: rgba(0, 0, 0, 0.7);
  border-color: rgba(255, 255, 255, 1);
  transform: translate(-50%, -50%) scale(1.1);
}

.play-btn svg {
  width: 35px;
  height: 35px;
  color: white;
  margin-left: 4px; /* Optical centering for play icon */
}

@media (max-width: 768px) {
  .video-wrapper {
    padding: 0.5rem;
    align-items: center;
  }

  .video-container {
    max-height: calc(100vh - 1rem);
  }

  .play-btn {
    width: 60px;
    height: 60px;
  }

  .play-btn svg {
    width: 28px;
    height: 28px;
  }
}
</style>
