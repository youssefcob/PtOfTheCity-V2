// Proxies a published Studio (headless CMS) render envelope so the browser
// never talks to the CDN/Studio directly (no CORS needed on their side).
// Tries the CDN copy first, then Studio's own render endpoint.
const TENANT = 'ptofthecity'

const FOLDER_COLLECTIONS: Record<string, string> = {
  services: 'pages',
  programs: 'pages',
  conditions: 'pages',
  articles: 'textEditor',
}

export default defineEventHandler(async (event) => {
  const folder = getRouterParam(event, 'folder') || ''
  const slug = getRouterParam(event, 'slug') || ''
  const collection = FOLDER_COLLECTIONS[folder]

  if (!collection || !/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }

  const config = useRuntimeConfig()
  const address = `${TENANT}/${folder}/${slug}`
  const trim = (url: string) => url.replace(/\/+$/, '')

  const sources = [
    config.studioCdnUrl && `${trim(config.studioCdnUrl)}/render/${collection}/${address}.json`,
    config.studioUrl && `${trim(config.studioUrl)}/api/render/${collection}/${address}`,
  ].filter(Boolean) as string[]

  for (const url of sources) {
    try {
      const envelope = await $fetch<Record<string, any>>(url, { responseType: 'json', timeout: 5000 })
      if (envelope && typeof envelope.html === 'string') {
        setResponseHeader(event, 'Cache-Control', 'public, max-age=60')
        return envelope
      }
    } catch {
      // missing or unreachable here - try the next source
    }
  }

  throw createError({ statusCode: 404, statusMessage: 'Not found or not published' })
})
