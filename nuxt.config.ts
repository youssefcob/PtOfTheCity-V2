// https://nuxt.com/docs/api/configuration/nuxt-config
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
      script: [
        {
          innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-5JXM65ZL');`,
          tagPosition: 'head',
        }
      ],
      noscript: [
        {
          innerHTML: '<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=680856294635266&ev=PageView&noscript=1" />'
        },
        {
          innerHTML: '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5JXM65ZL" height="0" width="0" style="display:none;visibility:hidden"></iframe>',
          tagPosition: 'bodyOpen',
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
    
    public: {
      environment: process.env.NODE_ENV || 'development',
      url: 'http://localhost:8000/api',
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

  sitemap: {
  sources: ['/api/__sitemap__/urls'],
  cacheMaxAgeSeconds: 60 * 60 * 24, 
},

  modules: [['nuxt-delay-hydration', { mode: 'mount' }], 'nuxt-toast', '@nuxtjs/google-fonts', '@nuxt/image', "@nuxtjs/cloudinary", '@nuxtjs/sitemap']
}) 