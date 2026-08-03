<template>
  <div class="user-btn-wrapper">
    <!-- Not Logged In: Show login link -->
    <NuxtLink 
      v-if="!auth.isLoggedIn()" 
      :class="`UserBtn cta ${props.navOnLanding ? 'main' : 'secondary'}`" 
      aria-label="User Profile Button" 
      to="/login"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="39" viewBox="0 0 26 39" fill="none">
        <mask id="path-1-inside-1_5007_903" fill="white">
          <path
            d="M13 21.125C20.1793 21.1251 25.9989 26.9447 25.999 34.124V38.0244H0V34.124C0.000151586 26.9446 5.82054 21.125 13 21.125ZM13 0C18.564 0.000157324 23.0742 4.51114 23.0742 10.0752C23.074 15.6391 18.5639 20.1493 13 20.1494C7.43598 20.1494 2.92502 15.6392 2.9248 10.0752C2.9248 4.51104 7.43584 0 13 0Z" />
        </mask>
        <path
          d="M13 21.125L13.0001 18.125H13V21.125ZM25.999 34.124H28.999V34.124L25.999 34.124ZM25.999 38.0244V41.0244H28.999V38.0244H25.999ZM0 38.0244H-3V41.0244H0V38.0244ZM0 34.124L-3 34.124V34.124H0ZM13 0L13.0001 -3H13V0ZM23.0742 10.0752L26.0742 10.0753V10.0752H23.0742ZM13 20.1494V23.1494H13.0001L13 20.1494ZM2.9248 10.0752H-0.0751953V10.0753L2.9248 10.0752ZM13 21.125L12.9999 24.125C18.5225 24.1251 22.9989 28.6016 22.999 34.1241L25.999 34.124L28.999 34.124C28.9988 25.2878 21.8362 18.1252 13.0001 18.125L13 21.125ZM25.999 34.124H22.999V38.0244H25.999H28.999V34.124H25.999ZM25.999 38.0244V35.0244H0V38.0244V41.0244H25.999V38.0244ZM0 38.0244H3V34.124H0H-3V38.0244H0ZM0 34.124L3 34.1241C3.00012 28.6017 7.47716 24.125 13 24.125V21.125V18.125C4.16392 18.125 -2.99981 25.2875 -3 34.124L0 34.124ZM13 0L12.9999 3C16.9069 3.00011 20.0742 6.1677 20.0742 10.0752H23.0742H26.0742C26.0742 2.85458 20.2212 -2.9998 13.0001 -3L13 0ZM23.0742 10.0752L20.0742 10.0751C20.0741 13.9822 16.907 17.1493 12.9999 17.1494L13 20.1494L13.0001 23.1494C20.2208 23.1492 26.0739 17.2959 26.0742 10.0753L23.0742 10.0752ZM13 20.1494V17.1494C9.09257 17.1494 5.92496 13.982 5.9248 10.0751L2.9248 10.0752L-0.0751953 10.0753C-0.0749144 17.2963 5.77939 23.1494 13 23.1494V20.1494ZM2.9248 10.0752H5.9248C5.9248 6.16789 9.0927 3 13 3V0V-3C5.77899 -3 -0.0751953 2.85419 -0.0751953 10.0752H2.9248Z"
          fill="#103535" mask="url(#path-1-inside-1_5007_903)" />
      </svg>
    </NuxtLink>

    <!-- Logged In: Show dropdown -->
    <div v-else class="user-dropdown" ref="dropdownRef">
      <button 
        :class="`UserBtn cta ${props.navOnLanding ? 'main' : 'secondary'}`"
        @click="toggleDropdown"
        aria-label="User Menu"
        aria-haspopup="true"
        :aria-expanded="isOpen"
      >
        <!-- Red dot indicator on button -->
        <span v-if="hasUnreadMessages" class="notification-dot"></span>
        
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="39" viewBox="0 0 26 39" fill="none">
          <mask id="path-1-inside-1_5007_903" fill="white">
            <path
              d="M13 21.125C20.1793 21.1251 25.9989 26.9447 25.999 34.124V38.0244H0V34.124C0.000151586 26.9446 5.82054 21.125 13 21.125ZM13 0C18.564 0.000157324 23.0742 4.51114 23.0742 10.0752C23.074 15.6391 18.5639 20.1493 13 20.1494C7.43598 20.1494 2.92502 15.6392 2.9248 10.0752C2.9248 4.51104 7.43584 0 13 0Z" />
          </mask>
          <path
            d="M13 21.125L13.0001 18.125H13V21.125ZM25.999 34.124H28.999V34.124L25.999 34.124ZM25.999 38.0244V41.0244H28.999V38.0244H25.999ZM0 38.0244H-3V41.0244H0V38.0244ZM0 34.124L-3 34.124V34.124H0ZM13 0L13.0001 -3H13V0ZM23.0742 10.0752L26.0742 10.0753V10.0752H23.0742ZM13 20.1494V23.1494H13.0001L13 20.1494ZM2.9248 10.0752H-0.0751953V10.0753L2.9248 10.0752ZM13 21.125L12.9999 24.125C18.5225 24.1251 22.9989 28.6016 22.999 34.1241L25.999 34.124L28.999 34.124C28.9988 25.2878 21.8362 18.1252 13.0001 18.125L13 21.125ZM25.999 34.124H22.999V38.0244H25.999H28.999V34.124H25.999ZM25.999 38.0244V35.0244H0V38.0244V41.0244H25.999V38.0244ZM0 38.0244H3V34.124H0H-3V38.0244H0ZM0 34.124L3 34.1241C3.00012 28.6017 7.47716 24.125 13 24.125V21.125V18.125C4.16392 18.125 -2.99981 25.2875 -3 34.124L0 34.124ZM13 0L12.9999 3C16.9069 3.00011 20.0742 6.1677 20.0742 10.0752H23.0742H26.0742C26.0742 2.85458 20.2212 -2.9998 13.0001 -3L13 0ZM23.0742 10.0752L20.0742 10.0751C20.0741 13.9822 16.907 17.1493 12.9999 17.1494L13 20.1494L13.0001 23.1494C20.2208 23.1492 26.0739 17.2959 26.0742 10.0753L23.0742 10.0752ZM13 20.1494V17.1494C9.09257 17.1494 5.92496 13.982 5.9248 10.0751L2.9248 10.0752L-0.0751953 10.0753C-0.0749144 17.2963 5.77939 23.1494 13 23.1494V20.1494ZM2.9248 10.0752H5.9248C5.9248 6.16789 9.0927 3 13 3V0V-3C5.77899 -3 -0.0751953 2.85419 -0.0751953 10.0752H2.9248Z"
            fill="#103535" mask="url(#path-1-inside-1_5007_903)" />
        </svg>
        
        <!-- Chevron icon -->
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="12" 
          height="8" 
          viewBox="0 0 12 8" 
          fill="none"
          :class="{ 'rotated': isOpen }"
          class="chevron"
        >
          <path d="M1 1L6 6L11 1" stroke="#103535" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>

      <!-- Dropdown Menu -->
      <Transition name="dropdown">
        <div v-if="isOpen" class="dropdown-menu">
          <NuxtLink to="/dashboard" class="dropdown-item" @click="closeDropdown">
            <!-- Red dot indicator on Notifications link -->
            <span v-if="hasUnreadMessages" class="notification-dot"></span>
            
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            Notifications
          </NuxtLink>

          <NuxtLink to="/profile" class="dropdown-item" @click="closeDropdown">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            Profile
          </NuxtLink>

          <div class="dropdown-divider"></div>

          <button class="dropdown-item logout" @click="handleLogout">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Logout
          </button>
        </div>
      </Transition>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps({
  navOnLanding: {
    type: Boolean,
    required: true
  }
})

const auth = useAuth()
const route = useRoute()
const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const hasUnreadMessages = ref(false);

const getUnreadMessages = async () => {
  const { apiFetch } = useApi()
  try {
    const response: any = await apiFetch('/inbox/patient/unread')
    console.log('Unread messages response:', response)
    hasUnreadMessages.value = response.data > 0
  } catch (error) {
    console.error('Error fetching unread messages:', error)
    return 0
  }
}

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const closeDropdown = () => {
  isOpen.value = false
}

const handleLogout = () => {
  auth.logout()
  closeDropdown()
  navigateTo('/login')
}

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    closeDropdown()
  }
}

// Watch for route changes and clear unread indicator when on dashboard
watch(() => route.path, (newPath) => {
  if (newPath === '/dashboard') {
    hasUnreadMessages.value = false
  }
})

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  getUnreadMessages()
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped lang="scss">
.user-btn-wrapper {
  position: relative;
  height: 100%;
}

.user-dropdown {
  position: relative;
  height: 100%;
}

.UserBtn {
  position: relative;
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: $border-radius;
  padding: 1rem 1.5rem;
  text-align: center;
  transition: all .5s ease-in-out;
  cursor: pointer;
  border: none;
  background: $cta;

  &.secondary {
    opacity: 0.8;
  }

  .chevron {
    transition: transform 0.3s ease;
    
    &.rotated {
      transform: rotate(180deg);
    }
  }

  @media screen and (max-width: 950px) {
    .btnfont {
      font-size: 1.7rem;
    }
  }

  @media screen and (max-width: 425px) {
    padding: 2rem;
    border-radius: calc($border-radius * 2);

    .btnfont {
      font-size: 1.2rem;
      font-weight: 700;
    }
  }

  @media screen and (max-width: 320px) {
    .btnfont {
      font-size: 1rem;
      font-weight: 700;
    }
  }
}

// Red notification dot
.notification-dot {
  position: absolute;
  top: -3px;
  right: -3px;
  width: 1.2rem;
  height: 1.2rem;
  background-color: #ef4444;
  border-radius: 50%;
  border: 2px solid white;
  z-index: 10;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background: white;
  border-radius: $border-radius;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  padding: 0.5rem 0;
  z-index: 1000;

  .dropdown-item {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1.25rem;
    color: #103535;
    text-decoration: none;
    transition: background 0.2s ease;
    cursor: pointer;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    font-family: $montserrat;
    font-size: 0.95rem;

    svg {
      flex-shrink: 0;
    }

    &:hover {
      background: rgba(16, 53, 53, 0.08);
    }

    &.logout {
      color: #dc2626;

      &:hover {
        background: rgba(220, 38, 38, 0.08);
      }
    }

    // Notification dot on the dropdown item
    .notification-dot {
      top: 50%;
      right: 1rem;
      transform: translateY(-50%);
    }
  }

  .dropdown-divider {
    height: 1px;
    background: rgba(16, 53, 53, 0.1);
    margin: 0.5rem 0;
  }
}

// Dropdown animation
.dropdown-enter-active {
  animation: dropdown-in 0.2s ease-out;
}

.dropdown-leave-active {
  animation: dropdown-out 0.15s ease-in;
}

@keyframes dropdown-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes dropdown-out {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
}
</style>