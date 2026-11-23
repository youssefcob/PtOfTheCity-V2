export default defineNuxtPlugin(() => {
  // Tags are NOT loaded here. composables/useConsent.ts loads them only after
  // the visitor accepts the consent banner (and analyticsPaused is false).
  initConsent()

  // Remembers the page type the user was on before reaching a booking form
  // (booking funnel entry_point)
  const router = useRouter()
  recordPageView(router.currentRoute.value.path)
  router.afterEach((to) => recordPageView(to.path))

  // Entering/leaving a restricted page after consent: hard navigation, so
  // advertising scripts are never carried into (or missing from) the next page.
  router.beforeEach((to, from) => {
    if (from.matched.length && needsHardNavigation(from.path, to.path)) {
      window.location.assign(to.fullPath)
      return false
    }
  })
})
