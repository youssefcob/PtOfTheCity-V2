<script setup lang="ts">
// Sensory Freeway header — dark top strap + white navbar.
// The strap scrolls away; the navbar stays sticky.

const props = withDefaults(
  defineProps<{
    phone?: string;
    ctaText?: string;
    ctaHref?: string;
    links?: { label: string; href: string }[];
  }>(),
  {
    phone: '(718) 555-0192',
    ctaText: 'Book an Appointment',
    ctaHref: '#book',
    links: () => [
      { label: 'About', href: '#about' },
      { label: 'Services', href: '#services' },
      { label: 'Insurance', href: '#insurance' },
      { label: 'Locations', href: '#locations' },
      { label: 'Reviews', href: '#reviews' },
    ],
  },
);

const telLink = computed(() => `tel:+1${props.phone.replace(/\D/g, '')}`);

const menuOpen = ref(false);
const closeMenu = () => (menuOpen.value = false);
</script>

<template>
  <div class="sf-header">
    <!-- TOP STRAP -->
    <div class="top-strap">
      <div class="strap-inner">
        <span class="strap-item strap-sponsor">Sponsored by PT of The City</span>
        <span class="strap-dot" aria-hidden="true"></span>
        <span class="strap-item strap-light">Accepting New Patients</span>
        <span class="strap-dot" aria-hidden="true"></span>
        <span class="strap-item strap-accent">Same-Week Evaluations Available</span>
      </div>
    </div>

    <!-- NAVBAR -->
    <nav class="navbar">
      <div class="nav-inner">
        <!-- Logo -->
        <a href="#" class="brand" @click.prevent="closeMenu">
          <span class="brand-mark">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
            </svg>
          </span>
          <span class="brand-name">Sensory Freeway</span>
        </a>

        <!-- Desktop links -->
        <div class="nav-links">
          <a v-for="link in links" :key="link.label" :href="link.href" class="nav-link">
            {{ link.label }}
          </a>
        </div>

        <div class="nav-actions">
          <a :href="telLink" class="nav-phone">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {{ phone }}
          </a>
          <a :href="ctaHref" class="nav-cta">{{ ctaText }}</a>

          <!-- Mobile hamburger -->
          <button
            class="hamburger"
            :class="{ open: menuOpen }"
            aria-label="Toggle menu"
            :aria-expanded="menuOpen"
            @click="menuOpen = !menuOpen"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <Transition name="menu">
        <div v-if="menuOpen" class="mobile-menu">
          <a
            v-for="link in links"
            :key="link.label"
            :href="link.href"
            class="mobile-link"
            @click="closeMenu"
          >
            {{ link.label }}
          </a>
          <a :href="telLink" class="mobile-link mobile-phone">{{ phone }}</a>
          <a :href="ctaHref" class="nav-cta mobile-cta" @click="closeMenu">{{ ctaText }}</a>
        </div>
      </Transition>
    </nav>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.sf-header {
  --coral: #f26b5e;
  --coral-dark: #d9502f;
  --salmon: #e89a7d;
  --cream: #f5ede4;
  --strap-bg: #101d19;
  --nav-bg: #faf6f0;
  --ink: #1a1a1a;

  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* ── Top strap ── */
.top-strap {
  background: var(--strap-bg);
  padding: 8px 24px;
}

.strap-inner {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
}

.strap-item {
  font-size: 12.5px;
  font-weight: 500;
  letter-spacing: 0.01em;
}

.strap-sponsor {
  color: var(--salmon);
}

.strap-light {
  color: var(--cream);
}

.strap-accent {
  color: var(--coral);
  font-weight: 600;
}

.strap-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--salmon);
  flex-shrink: 0;
}

/* ── Navbar ── */
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--nav-bg);
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.05);
}

.nav-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 14px 24px;
  display: flex;
  align-items: center;
  gap: 32px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  flex-shrink: 0;
}

.brand-mark {
  width: 38px;
  height: 38px;
  border-radius: 11px;
  background: var(--coral);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-mark svg {
  width: 20px;
  height: 20px;
}

.brand-name {
  font-size: 19px;
  font-weight: 700;
  color: var(--ink);
  letter-spacing: -0.01em;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 28px;
  flex: 1;
  justify-content: center;
}

.nav-link {
  font-size: 14.5px;
  font-weight: 500;
  color: var(--ink);
  text-decoration: none;
  transition: color 0.15s ease;
}

.nav-link:hover {
  color: var(--coral);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
}

.nav-phone {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 14.5px;
  font-weight: 600;
  color: var(--ink);
  text-decoration: none;
  transition: color 0.15s ease;
}

.nav-phone svg {
  width: 16px;
  height: 16px;
}

.nav-phone:hover {
  color: var(--coral);
}

.nav-cta {
  display: inline-flex;
  align-items: center;
  padding: 11px 22px;
  border-radius: 999px;
  background: var(--coral);
  color: #fff;
  font-size: 14.5px;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.15s ease, transform 0.1s ease;
}

.nav-cta:hover {
  background: var(--coral-dark);
}

.nav-cta:active {
  transform: translateY(1px);
}

/* ── Hamburger (mobile) ── */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  padding: 8px;
  border: none;
  background: transparent;
  cursor: pointer;
}

.hamburger span {
  display: block;
  height: 2px;
  width: 100%;
  border-radius: 2px;
  background: var(--ink);
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.hamburger.open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.hamburger.open span:nth-child(2) {
  opacity: 0;
}

.hamburger.open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* ── Mobile menu ── */
.mobile-menu {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 24px 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  background: var(--nav-bg);
}

.mobile-link {
  padding: 10px 4px;
  font-size: 15px;
  font-weight: 500;
  color: var(--ink);
  text-decoration: none;
}

.mobile-phone {
  font-weight: 600;
}

.mobile-cta {
  margin-top: 10px;
  justify-content: center;
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* ── Responsive ── */
@media (max-width: 1024px) {
  .nav-links,
  .nav-phone {
    display: none;
  }

  .hamburger {
    display: flex;
  }

  .nav-inner {
    gap: 16px;
  }

  .nav-actions {
    margin-left: auto;
  }
}

@media (max-width: 640px) {
  .strap-inner {
    gap: 8px;
  }

  .strap-item {
    font-size: 11px;
  }

  .nav-cta {
    display: none;
  }

  .mobile-cta {
    display: inline-flex;
  }
}
</style>
