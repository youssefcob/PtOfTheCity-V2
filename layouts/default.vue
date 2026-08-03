<script setup lang="ts">
import NavBar from "~/components/NavBar/NavBar.vue";

const { $config } = useNuxtApp();
const route = useRoute();
const baseUrl = $config.public.siteUrl || "https://www.ptofthecity.com";
const currentUrl = `${baseUrl}${route.fullPath}`;

useSeoMeta({
  description:
    "Premier physical therapy clinics in NYC offering personalized treatment plans, sports injury rehabilitation, and wellness programs. Book your appointment with our expert therapists today.",
  // ogTitle: "PT of the City - NYC's Premier Physical Therapy Clinics",
  // ogDescription:
  //   "Transform your health with NYC's highest-rated physical therapy services. Expert care for sports injuries, chronic pain, and rehabilitation. Schedule your consultation today.",
  // ogImage:
  //   "https://res.cloudinary.com/dzilc11zf/image/upload/v1754150749/ptofthecity/content/careers.webp",
  // ogUrl: currentUrl,
  // twitterTitle: "PT of the City - Top NYC Physical Therapy",
  // twitterDescription:
  //   "NYC's premier physical therapy clinics. Expert treatment for injuries, pain management, and rehabilitation. Book your appointment today.",
  // twitterImage:
  //   "https://res.cloudinary.com/dzilc11zf/image/upload/v1754150749/ptofthecity/content/careers.webp",
  // twitterCard: "summary_large_image",
});

useHead({
  htmlAttrs: {
    lang: "en",
  },
  link: [
    {
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.ico",
    },
    {
      rel: "canonical",
      href: currentUrl,
    },
  ],
});

import { useRoute } from "vue-router";

const hideNavbarRoutes = ["/bench-craft-golf"];
const hideNavbarPrefixes = ["/campaign/"];

const hideNavbar = computed(
  () => hideNavbarRoutes.includes(route.path) || hideNavbarPrefixes.some((p) => route.path.startsWith(p)),
);

const noPaddingTopRoutes = [
  "/",
  // "/booking",
  "/login",
  "/register",
  "/verify",
  "/dashboard",
  "/profile",
  "/forgot-password",
  "/referral",
  "/benchcraft",
];
const noMarginBottomRoutes = [
  // "/booking",
  "/login",
  "/register",
  "/verify",
  "/dashboard",
  "/profile",
  "/forgot-password",
  "/teletherapy",
  "/teletherapy/booking",
  "/benchcraft",
];

// Now prefixes are arrays too 👇
const noPaddingTopPrefixes = [
  "/clinic/",
  "/profile/",
  "/forgot-password/",
  "/quiz/",
];
const noMarginBottomPrefixes = [
  "/clinic/",
  "/profile/",
  "/forgot-password/",
  "/quiz/",
  "/referral"
];

const paddingTop = computed(() => {
  const path = route.path;
  const matchesExact = noPaddingTopRoutes.includes(path);
  const matchesPrefix = noPaddingTopPrefixes.some((prefix) =>
    path.startsWith(prefix),
  );
  return !matchesExact && !matchesPrefix ? "8vh" : "0";
});

const marginBottom = computed(() => {
  const path = route.path;
  const matchesExact = noMarginBottomRoutes.includes(path);
  const matchesPrefix = noMarginBottomPrefixes.some((prefix) =>
    path.startsWith(prefix),
  );
  return matchesExact || matchesPrefix ? "0" : "12.5rem";
});

onMounted(async () => {
  const auth = useAuth();
  await auth.fetchUser();
  if (auth.isLoggedIn() && !auth.isVerified.value) {
    useToast().info({
      message: "Please verify your email to access all features.",
    });
  }
});

const { showTopStrap } = useTopStrap();
</script>

<template>
  <NuxtLoadingIndicator />
  <LazyTopStrap v-if="showTopStrap && !hideNavbar" />
  <header v-if="!hideNavbar">
    <NavBar />
  </header>
  <main v-if="!hideNavbar" id="main-content" :style="{ paddingTop, marginBottom , minHeight: '80vh'}">
    <slot />
  </main>
  <template v-else>
    <slot />
  </template>
  <footer v-if="!hideNavbar">
    <LazyFooter />
  </footer>
</template>


