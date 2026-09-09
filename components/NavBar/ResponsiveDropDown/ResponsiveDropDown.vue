<template>
  <teleport to="body">
    <div v-if="menuState" class="overlay" @click="handleClose"></div>

    <div class="mobile-navbar" :class="{ open: menuState }" ref="menuRef" id="responsiveDropDownNavBar">
      <div class="navbar-header">
        <NuxtLink to="/" aria-label="PT of the City home" @click="emitClose">
          <EditableImage content-key="global.nav.logo" :default-src="logoUrl" default-alt="PT of the City Logo"
            class="drawer-logo" />
        </NuxtLink>
        <button class="close-btn" @click="emitClose" aria-label="Close menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round"></path>
          </svg>
        </button>
      </div>
      <div class="navbar-content">
        <div class="list-search-container">
          <div class="search-bar">
          </div>
          <nav class="navList" aria-label="Mobile navigation menu">
            <NavListVertical @close="emitClose" :clinics="props.clinics" />
          </nav>
        </div>
        <div class="book-now">
          <BookNow :navOnLanding="true" @click="emitClose" />
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue';
import BookNow from '../NavbarComps/BookNow.vue';
import NavListVertical from '../NavbarComps/NavListVertical.vue';
import EditableImage from '~/components/Admin/EditableImage.vue';
import type { HttpClinics } from '~/types/types';

const logoUrl = useImg('https://res.cloudinary.com/dzilc11zf/image/upload/v1778861676/LogoPt_ildwod.webp', 200);

const props = defineProps<{
  menuState: boolean,
  navOnLanding: boolean,
  clinics?: HttpClinics
}>();

const emit = defineEmits<{
  (e: 'dropdown'): void
}>();

const menuRef = ref<HTMLElement | null>(null);

const emitClose = () => {
  emit('dropdown');
};

const handleClose = (e: MouseEvent) => {
  // only close if clicking overlay
  if (e.target === e.currentTarget) {
    emitClose();
  }
};

// Prevent background scroll
watch(() => props.menuState, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

onBeforeUnmount(() => {
  document.body.style.overflow = '';
});
</script>

<style scoped lang="scss">
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(3, 41, 46, 0.5);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  z-index: 998;
}

// Solid $primary-600 panel, matching the dark full-bleed sections already
// used elsewhere in the redesign (e.g. Clinics.vue's ".locations") - replaces
// the old translucent cyan-glass/blur look, which no longer matches the
// site's palette or the mobile nav bar's own solid $primary-400 fill.
.mobile-navbar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  max-width: 28rem;
  width: 100%;
  background-color: $primary-600;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: 999;
  box-shadow: 0 0 32px rgba(0, 0, 0, 0.25);

  @media (max-width: 600px) {
    max-width: 100%;
  }

  &.open {
    transform: translateX(0);
  }
}

.navbar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);

  .drawer-logo {
    height: 3rem;
    width: auto;
    display: block;

    // logo defaults to its normal (dark/colored) look for light backgrounds -
    // force a white silhouette here, same treatment NavBar.vue's own mobile
    // bar already applies for the same reason (solid dark background).
    :deep(img) {
      height: 100%;
      width: auto;
      filter: brightness(0) invert(1);
    }
  }
}

.close-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;
  flex-shrink: 0;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
}

.navbar-content {
  padding-bottom: 1.5rem;
  overflow-y: auto;
  height: calc(100% - 4.5rem);
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: $accent-cyan;
    border-radius: 999px;
  }

  scrollbar-width: thin;
  scrollbar-color: $accent-cyan transparent;
}

.book-now {
  padding: 1rem 1.5rem 1.5rem;
  margin-top: auto;
}
</style>
