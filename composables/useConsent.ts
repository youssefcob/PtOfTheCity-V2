import { ref } from "vue";

// Cookie consent + tag loader. No tracking tag is requested until the visitor
// accepts AND analyticsPaused (nuxt.config.ts) is false.
type Choice = "granted" | "denied";

const COOKIE = "pt_consent";
const MAX_AGE = 60 * 60 * 24 * 180;

const choice = ref<Choice | null>(null);
const bannerOpen = ref(true); // server-rendered open; ConsentBanner closes it on mount if a choice exists
let initialised = false;
let loaded = false;
let paused = true;
let adTagsActive = false;

// Pages where NO advertising tag (Google Ads, Meta Pixel, GTM) may load and no
// ad personalisation may happen: treatment/condition/service content, blog
// posts, and every appointment-booking or patient-intake page. This backs the
// banner text "We do not use advertising or session-recording technologies on
// our treatment, service, or appointment booking pages", so keep them in sync.
// /success/* (post-submit confirmation) is deliberately NOT listed: the Google
// Ads booking conversion fires from there (see trackBookingConversion).
const ADS_RESTRICTED = [
  /^\/service\//,
  /^\/blogs\/./,
  /^\/conditions(\/|$)/,
  /^\/booking\/?$/,
  /^\/clinic\//, // clinic pages embed the booking form
  /^\/teletherapy(\/|$)/,
  /^\/beyondmed(\/|$)/,
  /^\/campaign\//,
  /^\/nyfoundling(\/|$)/,
  /^\/sensory-freeway(\/|$)/,
  /^\/bench-craft-golf(\/|$)/,
  /^\/crunch(\/|$)/,
  /^\/free-offer(\/|$)/,
  /^\/referral\/?$/,
  /^\/(patients|physicians)-referral\/?$/,
  /^\/insurances\/?$/,
  /^\/ot-insurances(\/|$)/,
  /^\/quiz\//,
];
export const isAdsRestricted = (path: string) => ADS_RESTRICTED.some((re) => re.test(path));

// Tags that are already running cannot be unloaded, so moving between a
// restricted and an unrestricted page after consent needs a full page load.
export const needsHardNavigation = (fromPath: string, toPath: string) =>
  loaded && isAdsRestricted(fromPath) !== isAdsRestricted(toPath);

// Google Ads conversion for a submitted booking. Called from the post-submit
// success page only; does nothing unless the ad tags are active on this page.
export const trackBookingConversion = () => {
  if (!adTagsActive) return;
  w().gtag?.("event", "conversion", {
    send_to: "AW-10835639583/EZi1CPuQna8cEJ_66q4o",
    value: 1.0,
    currency: "USD",
  });
};

const w = () => window as any;

const readCookie = (): Choice | null => {
  const m = document.cookie.match(new RegExp(`(?:^|; )${COOKIE}=(granted|denied)`));
  return m ? (m[1] as Choice) : null;
};

const writeCookie = (v: Choice) => {
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE}=${v}; max-age=${MAX_AGE}; path=/; SameSite=Lax${secure}`;
};

const loadScript = (src: string) => {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
};

const loadTrackingTags = () => {
  if (paused || loaded) return;
  loaded = true;

  // Drop anything queued before consent (the head stub only collects locally);
  // keep the consent defaults.
  const dl = (w().dataLayer = w().dataLayer || []);
  const keep = dl.filter((e: any) => e && e[0] === "consent");
  dl.length = 0;
  keep.forEach((e: any) => dl.push(e));

  const gtag = w().gtag;
  const restricted = isAdsRestricted(location.pathname);
  adTagsActive = !restricted;

  // On restricted pages ad storage stays denied and Google signals / ad
  // personalisation are off, so GA4 runs as plain analytics.
  gtag("consent", "update", {
    analytics_storage: "granted",
    ...(restricted ? {} : { ad_storage: "granted", ad_user_data: "granted", ad_personalization: "granted" }),
  });
  gtag("js", new Date());
  const ga4 = restricted ? { allow_google_signals: false, allow_ad_personalization_signals: false } : {};
  gtag("config", "G-E66E47L4WE", ga4);
  if (isProdHost()) gtag("config", "G-DF0X75KZCC", ga4);

  const loadGA = () => loadScript("https://www.googletagmanager.com/gtag/js?id=G-E66E47L4WE");
  if ("requestIdleCallback" in window) requestIdleCallback(loadGA);
  else setTimeout(loadGA, 1000);

  // Microsoft Clarity: disabled for now (session recording)
  // ;(function (c: any, l: any, a: string, r: string, i: string, t?: any, y?: any) {
  //   c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
  //   t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
  //   y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
  // })(window, document, "clarity", "script", "st95maa64h");

  // Advertising tags: never on restricted pages
  if (restricted) return;
  gtag("config", "AW-10835639583");

  // Google Tag Manager (its container may carry ad tags, so it is ad-gated too)
  dl.push({ "gtm.start": Date.now(), event: "gtm.js" });
  loadScript("https://www.googletagmanager.com/gtm.js?id=GTM-5JXM65ZL");

  setTimeout(() => {
    // Meta Pixel
    ;(function (f: any, b: any, e: string, v: string, n?: any, t?: any, s?: any) {
      if (f.fbq) return;
      n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n;
      n.push = n; n.loaded = true; n.version = "2.0"; n.queue = [];
      t = b.createElement(e); t.async = true; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    w().fbq("init", "680856294635266");
    w().fbq("track", "PageView");
  }, 3000);
};

// Call once from a client plugin (needs the Nuxt context for runtime config).
export const initConsent = () => {
  if (import.meta.server || initialised) return;
  initialised = true;
  paused = !!useRuntimeConfig().public.analyticsPaused;
  choice.value = readCookie();
  if (choice.value === "granted") loadTrackingTags();
};

export const useConsent = () => ({
  choice,
  bannerOpen,
  accept: () => {
    writeCookie("granted");
    choice.value = "granted";
    bannerOpen.value = false;
    loadTrackingTags();
  },
  decline: () => {
    writeCookie("denied");
    choice.value = "denied";
    bannerOpen.value = false;
    if (loaded) {
      // Tags are already running: revoke and reload so they are fully gone.
      w().gtag?.("consent", "update", {
        ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "denied",
      });
      w().fbq?.("consent", "revoke");
      location.reload();
    }
  },
  openSettings: () => {
    document.documentElement.classList.remove("pt-consent-set");
    bannerOpen.value = true;
  },
});
