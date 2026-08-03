export default defineNuxtPlugin(() => {
  const loadGA = () => {
    // Google Analytics + Ads (single gtag.js handles both configs)
    ;(window as any).dataLayer = (window as any).dataLayer || []
    ;(window as any).gtag = function() { (window as any).dataLayer.push(arguments) }
    ;(window as any).gtag('js', new Date())
    ;(window as any).gtag('config', 'G-E66E47L4WE')
    ;(window as any).gtag('config', 'AW-10835639583')
    const gaScript = document.createElement('script')
    gaScript.async = true
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-E66E47L4WE'
    document.head.appendChild(gaScript)
  }

  const loadSocial = () => {
    // Microsoft Clarity
    ;(function(c: any, l: any, a: string, r: string, i: string, t?: any, y?: any) {
      c[a] = c[a] || function() { (c[a].q = c[a].q || []).push(arguments) }
      t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y)
    })(window, document, 'clarity', 'script', 'st95maa64h')

    // Meta Pixel
    ;(function(f: any, b: any, e: string, v: string, n?: any, t?: any, s?: any) {
      if (f.fbq) return
      n = f.fbq = function() { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) }
      if (!f._fbq) f._fbq = n
      n.push = n; n.loaded = true; n.version = '2.0'; n.queue = []
      t = b.createElement(e); t.async = true; t.src = v
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s)
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
    ;(window as any).fbq('init', '680856294635266')
    ;(window as any).fbq('track', 'PageView')
  }

  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadGA)
  } else {
    setTimeout(loadGA, 1000)
  }

  setTimeout(loadSocial, 3000)
})
