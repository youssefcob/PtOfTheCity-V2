<template>
  <teleport to="body">
    <div v-if="menuState" class="overlay" @click="handleClose"></div>

    <div class="mobile-navbar" :class="[{ open: menuState }, navOnLanding ? 'main' : 'secondary']" ref="menuRef" id="responsiveDropDownNavBar">
      <div class="navbar-header">
        <button class="close-btn" @click="emitClose" aria-label="Close menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
import type { HttpClinics } from '~/types/types';

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
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  z-index: 998;
}

.mobile-navbar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  max-width: 500px;
  width: 100%;
  transition: all .5s ease-in-out;
  backdrop-filter: blur(20px);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: 999;
  border-top-right-radius: 4rem;
  border-bottom-right-radius: 4rem;
  // padding: 2rem;

  &.main {
    background: rgba(48, 241, 241, 0.10);

  }

  &.secondary {
    background-color: rgba(43, 192, 212, 0.3);
  }

  @media (max-width: 600px) {
    border-radius: 0;
    width: 100%;
  }

  &.open {
    transform: translateX(0);
  }
}

.navbar-header {
  display: flex;
  justify-content: flex-end;
  padding: 2rem;
}

.close-btn {
  background-color: rgba(43, 192, 212, 0.534);
  padding: .7rem;
  border-radius: 10px;
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.navbar-content {
  // padding: 1rem;
  // padding-right:5rem;
  // padding-top: 6rem;
  padding-bottom:6rem;
  overflow-y: auto;
  height: calc(100% - 3rem);
  display:flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #0284C7, #2EE5C1);
    border-radius: 999px;
  }

  scrollbar-width: thin;
  scrollbar-color: #2EE5C1 transparent;
}

.book-now{
  // position:absolute;
  // width:90%;
  padding: .7rem 2rem ;
  margin-top: auto;
  margin-bottom:4rem;
  height:7rem;
}
</style>
