<script setup lang="ts">
import NavBar from "~/components/NavBar/NavBar.vue";
import StyleToolbarHost from "~/components/Admin/StyleToolbarHost.vue";
import { useRoute } from "vue-router";

const { $config } = useNuxtApp();
const route = useRoute();
const baseUrl = $config.public.siteUrl || "https://www.ptofthecity.com";
const currentUrl = `${baseUrl}${route.fullPath}`;

useSeoMeta({
  description:
    "Premier physical therapy clinics in NYC offering personalized treatment plans, sports injury rehabilitation, and wellness programs. Book your appointment with our expert therapists today.",
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

const hideNavbarRoutes = ["/bench-craft-golf"];
const hideNavbarPrefixes = ["/campaign/"];

const hideNavbar = computed(
  () => hideNavbarRoutes.includes(route.path) || hideNavbarPrefixes.some((p) => route.path.startsWith(p)),
);

// Nav/footer render on every page (via this layout, not any individual page
// component), so their CMS content is fetched here under a "global" page key
// and provided from this same layout instance - NavBar/Footer inject() from
// their nearest ancestor, which is this component, not whatever page happens
// to be in the <slot>. Skipped on hideNavbar routes since nav/footer don't
// render there anyway.
if (!hideNavbar.value) {
  const {
    contentMap: globalContentMap,
    isContentEditor: globalIsContentEditor,
    textStyles: globalTextStyles,
    pageMeta: globalPageMeta,
  } = await usePageContent("global");
  providePageContent("global", globalContentMap, globalIsContentEditor, globalTextStyles, globalPageMeta);
}

const noPaddingTopRoutes = [
  "/",
  "",
  // "/booking",
  "/login",
  "/register",
  "/verify",
  "/dashboard",
  "/profile",
  "/forgot-password",
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
  "/sensory-freeway",
  ""
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
  ""
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
  <template v-if="!hideNavbar">
    <AdminEditToggle />
    <StyleToolbarHost />
  </template>
</template>


