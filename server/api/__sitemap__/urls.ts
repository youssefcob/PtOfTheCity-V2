export default defineSitemapEventHandler(async () => {
  const config = useRuntimeConfig()

  const data = await $fetch<{
    clinic:  { slug: string; updated_at: string }[]
    service: { slug: string; updated_at: string }[]
    blogs:   { slug: string; updated_at: string }[]
    staff:   { slug: string; updated_at: string }[]
    clinics: string[]
  }>(`${config.public.url}/sitemap`)

  return [
    ...data.clinic.map((c) => asSitemapUrl({ loc: `/clinic/${c.slug}`, lastmod: c.updated_at, priority: 0.8 })),
    ...data.service.map((s) => asSitemapUrl({ loc: `/service/${s.slug}`, lastmod: s.updated_at, priority: 0.9 })),
    ...data.blogs.map((b) => asSitemapUrl({ loc: `/blogs/${b.slug}`, lastmod: b.updated_at, priority: 0.7 })),
    ...data.staff.map((s) => asSitemapUrl({ loc: `/staff/${s.slug}`, lastmod: s.updated_at, priority: 0.6 })),
    ...data.clinics.map((city) => asSitemapUrl({ loc: `/clinics/${city.toLowerCase().replace(/\s+/g, '-')}`, priority: 0.8 })),
  ]
})