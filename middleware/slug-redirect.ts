export default defineNuxtRouteMiddleware((to) => {
  const slug = (to.params.name || to.params.slug) as string
  if (!slug) return

  const slugified = slug
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')

  if (slug !== slugified) {
    const decodedPath = decodeURIComponent(to.path) // ← decode first
    const newPath = decodedPath.replace(slug, slugified)
    return navigateTo(newPath, { redirectCode: 301 })
  }
})