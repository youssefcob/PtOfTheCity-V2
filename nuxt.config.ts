// https://nuxt.com/docs/api/configuration/nuxt-config

// Second-layer kill switch for ALL tracking (GTM, GA4, Google Ads, Meta Pixel).
// Tags load only if the visitor accepted the consent banner AND this is false.
// true = banner still works, but nothing loads even after Accept.
// Baked in at build time, so changing it requires a rebuild/redeploy.
const ANALYTICS_PAUSED = true
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.scss', '~/assets/css/campaign.scss'],
  app: {
    head: {
      title: "PT of the City - NYC's top rated physical therapy clinics",
      meta: [
        { name: "google-site-verification", content: "S4jFKloqaY1mQkmIp7P9wCNj54n6w9s5ew2OjK6mlMg" }
      ],
      link: [
        { rel: 'preconnect', href: 'https://api.fontshare.com' },
        { rel: 'stylesheet', href: 'https://api.fontshare.com/v2/css?f[]=switzer@600,700,800&display=swap' }
      ],
      // Google Consent Mode v2 defaults. Inline only, no network request. Every
      // tag (GTM, GA4, Ads, Meta Pixel) is loaded later by
      // composables/useConsent.ts, and only after the visitor accepts.
      // No <noscript> tracking pixels on purpose: they cannot respect consent.
      script: [
        {
          innerHTML: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',security_storage:'granted'});try{if(/(?:^|; )pt_consent=(granted|denied)/.test(document.cookie))document.documentElement.classList.add('pt-consent-set')}catch(e){}`,
          tagPosition: 'head',
        }
      ],
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/css/global.scss";`,
        },
      },
    },
  },

  ssr: true,
  routeRules: {
    // '/': { swr: 3600 },
    '/telehealth': { redirect: { to: '/teletherapy', statusCode: 301 } },
    '/telehealth/**': { redirect: { to: '/teletherapy/**', statusCode: 301 } },
    '/articles': { redirect: { to: '/blogs', statusCode: 301 } },
    '/articles/**': { redirect: { to: '/blogs/**', statusCode: 301 } },
  },
  experimental: {
    defaults: {
      nuxtLink: {
        prefetch: false,
      },
    },
  },
  nitro: {
    compressPublicAssets: { gzip: true, brotli: true },
  },
  runtimeConfig: {
    // Studio (headless CMS) render envelopes, read server-side only by
    // server/api/studio. CDN copy first, Studio itself as the fallback.
    studioCdnUrl: process.env.STUDIO_CDN_URL || '',
    studioUrl: process.env.STUDIO_URL || '',

    public: {
      environment: process.env.NODE_ENV || 'development',
      analyticsPaused: ANALYTICS_PAUSED,
      url: process.env.NODE_ENV === 'production' && process.env.URL
        ? process.env.URL
        : 'http://localhost:8000/api',
      // url: 'https://ptofthecity-prod-85befd5a122b.herokuapp.com/api',
      // url: 'https://ptofthecity-26da1857a791.herokuapp.com/api',
      // localUrl: process.env.API_URL || 'http://localhost:8000',
      // apiStagingUrl: process.env.API_STAGING_URL || 'https://ptofthecity-26da1857a791.herokuapp.com/api/',
      // apiProductionUrl: process.env.API_PRODUCTION_URL || 'https://ptofthecity-prod-85befd5a122b.herokuapp.com/api/',
      googleApiKey: process.env.GOOGLE_API_KEY || '',
      recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY || '',
      disableHtmlFormatting: process.env.DISABLE_HTML_FORMATTING || 'false'
    }
  },
  googleFonts: {
    families: {
      Poppins: [400, 500, 600, 700, 800],
    },
    display: 'swap',
    preload: true,
    prefetch: true,
    preconnect: true,
    download: false,
    inject: true
  },

  // The sitemap is built only from our own source (server/utils/sitemap.ts):
  // static pages from modules/sitemap-pages.ts + API records, with the
  // overrides admins set at /admin/sitemap. Nuxt's automatic page discovery
  // is off so /admin/* and internal pages never leak in. Admin changes show
  // up within the 10-minute cache.
  sitemap: {
    sources: ['/api/__sitemap__/urls'],
    excludeAppSources: true,
    cacheMaxAgeSeconds: 60 * 10,
  },

  modules: [['nuxt-delay-hydration', { mode: 'mount' }], 'nuxt-toast', '@nuxtjs/google-fonts', '@nuxt/image', "@nuxtjs/cloudinary", '@nuxtjs/sitemap']
}) 