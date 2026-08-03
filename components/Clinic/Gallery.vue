<template>
  <div v-if="images.length" class="gallery-section">
    <h2 class="section-title">Gallery</h2>
    <div class="gallery-grid">
      <div
        v-for="(item, index) in images"
        :key="item.id"
        class="gallery-item"
        :style="{ backgroundImage: `url(${useImg(item.path)})` }"
        :title="item.title ?? undefined"
        @click="openLightbox(index)"
      />
    </div>

    <Teleport to="body">
      <div v-if="lightboxIndex !== null" class="lightbox" @click.self="closeLightbox">
        <button class="lb-close" @click="closeLightbox">&#x2715;</button>
        <button class="lb-prev" @click="prev">&#8249;</button>
        <button class="lb-next" @click="next">&#8250;</button>
        <div class="lb-track" :style="{ transform: `translateX(-${lightboxIndex * 100}%)` }">
          <div v-for="item in images" :key="item.id" class="lb-slide">
            <img :src="useImg(item.path)" :alt="item.title ?? ''" class="lb-img" />
          </div>
        </div>
        <p v-if="images[lightboxIndex].title" class="lb-caption">{{ images[lightboxIndex].title }}</p>
        <p class="lb-counter">{{ lightboxIndex + 1 }} / {{ images.length }}</p>
      </div>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import type { Media } from '~/types/types';

const props = defineProps({
  media: {
    type: Array as () => Media[],
    required: true,
  },
});

const images = computed(() => props.media.filter((m) => m.media_type === 'image'));

const lightboxIndex = ref<number | null>(null);

const openLightbox = (index: number) => {
  lightboxIndex.value = index;
  document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
  lightboxIndex.value = null;
  document.body.style.overflow = '';
};

const prev = () => {
  if (lightboxIndex.value === null) return;
  lightboxIndex.value = (lightboxIndex.value - 1 + images.value.length) % images.value.length;
};

const next = () => {
  if (lightboxIndex.value === null) return;
  lightboxIndex.value = (lightboxIndex.value + 1) % images.value.length;
};

const onKey = (e: KeyboardEvent) => {
  if (lightboxIndex.value === null) return;
  if (e.key === 'ArrowRight') next();
  if (e.key === 'ArrowLeft') prev();
  if (e.key === 'Escape') closeLightbox();
};

onMounted(() => window.addEventListener('keydown', onKey));
onUnmounted(() => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; });
</script>

<style scoped lang="scss">
.section-title {
  color: $navy;
  font-weight: 700;
  margin-bottom: 2rem;
}

.gallery-section {
  @include pagePadding();
  padding-top: 1rem;
  padding-bottom: 3rem;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;

  @media screen and (max-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.gallery-item {
  aspect-ratio: 4 / 3;
  border-radius: 0.75rem;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.85;
  }
}

.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.92);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.lb-track {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
}

.lb-slide {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 6rem;

  @media screen and (max-width: 600px) {
    padding: 4rem 1rem;
  }
}

.lb-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 0.5rem;
}

.lb-close {
  position: absolute;
  top: 1.25rem;
  right: 1.5rem;
  background: none;
  border: none;
  color: white;
  font-size: 1.75rem;
  cursor: pointer;
  z-index: 10;
  line-height: 1;
  opacity: 0.8;

  &:hover { opacity: 1; }
}

.lb-prev,
.lb-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  font-size: 2.5rem;
  width: 3rem;
  height: 5rem;
  cursor: pointer;
  z-index: 10;
  border-radius: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;

  &:hover { opacity: 1; background: rgba(255, 255, 255, 0.18); }
}

.lb-prev { left: 0.75rem; }
.lb-next { right: 0.75rem; }

.lb-caption {
  position: absolute;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.9rem;
  white-space: nowrap;
}

.lb-counter {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.8rem;
}
</style>