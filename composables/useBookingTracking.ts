import { onBeforeUnmount, onMounted, type Ref } from "vue";

// Booking funnel events go only to this GA4 property, which is itself only
// configured on the live domain (see plugins/analytics.client.ts).
const MEASUREMENT_ID = "G-DF0X75KZCC";
const PROD_HOSTS = ["ptofthecity.com", "www.ptofthecity.com"];
const LAST_PAGE_KEY = "ptc_last_page_type";
const LAST_PAGE_PATH_KEY = "ptc_last_page_path";
// GA4 truncates event parameter values past 100 characters
const MAX_PARAM_LENGTH = 100;
const IDLE_TIMEOUT_MS = 60_000;

export const BOOKING_FORM_PATHS = ["/booking", "/teletherapy/booking"];

export const isProdHost = () => PROD_HOSTS.includes(window.location.hostname);

const toSnakeCase = (s: string) =>
  s.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`).replace(/[^a-z0-9_]+/gi, "_").toLowerCase();

export const pageTypeFromPath = (path: string) => {
  const [first, second] = path.split("/").filter(Boolean);
  if (!first) return "home_page";
  switch (first.toLowerCase()) {
    case "clinic": return "clinic_page";
    case "clinics": return "borough_page";
    case "service": return "service_page";
    case "blogs": return second ? "article_page" : "blog_index";
    case "staff": return "staff_page";
    case "teletherapy": return "teletherapy_page";
    case "quiz": return "quiz_page";
    case "campaign": return "campaign_page";
    default: return `${first.toLowerCase().replace(/[^a-z0-9]+/g, "_")}_page`;
  }
};

// Called on every route change. Booking form pages are skipped so the stored
// value is always the page the user was on *before* reaching the form. It lives
// in sessionStorage so it also survives full page loads, e.g. links inside CMS
// blog HTML, which bypass the router.
export const recordPageView = (path: string) => {
  if (BOOKING_FORM_PATHS.includes(path)) return;
  try {
    sessionStorage.setItem(LAST_PAGE_KEY, pageTypeFromPath(path));
    sessionStorage.setItem(LAST_PAGE_PATH_KEY, path);
  } catch {}
};

// entry_point is the page type (article_page), entry_page the exact path
// (/blogs/<slug>) so individual articles, clinics and services can be compared
const resolveEntry = (path: string) => {
  // Form embedded in a regular page (clinic pages): that page is the entry point
  if (!BOOKING_FORM_PATHS.includes(path)) {
    return { point: pageTypeFromPath(path), page: path.slice(0, MAX_PARAM_LENGTH) };
  }
  try {
    const point = sessionStorage.getItem(LAST_PAGE_KEY);
    const page = sessionStorage.getItem(LAST_PAGE_PATH_KEY);
    if (point && page) return { point, page: page.slice(0, MAX_PARAM_LENGTH) };
  } catch {}
  return { point: "direct", page: "direct" };
};

// Never throws: a broken analytics script must not break the booking form.
export const trackBookingEvent = (name: string, params: Record<string, unknown> = {}) => {
  try {
    const payload = { ...params, send_to: MEASUREMENT_ID };
    if (!isProdHost()) {
      console.debug("[booking tracking]", name, payload);
      return;
    }
    (window as any).gtag?.("event", name, payload);
  } catch {}
};

type BookingTrackingOptions = {
  formType: "in_clinic" | "teletherapy";
  // Element wrapping the form; fields inside it are marked with data-track-field="<form key>"
  container: Ref<HTMLElement | null>;
  isFieldValid: (field: string) => boolean;
};

export const useBookingTracking = ({ formType, container, isFieldValid }: BookingTrackingOptions) => {
  const route = useRoute();

  let entry = { point: "direct", page: "direct" };
  let lastField: string | null = null;
  let interacted = false;
  let submitted = false;
  let abandoned = false;
  let idleTimer: ReturnType<typeof setTimeout> | undefined;
  let observer: IntersectionObserver | null = null;
  const focused = new Set<string>();
  const completed = new Set<string>();

  const baseParams = () => ({ form_type: formType, entry_point: entry.point, entry_page: entry.page });

  const abandon = (reason: "navigation" | "page_exit" | "inactive") => {
    if (!interacted || submitted || abandoned) return;
    abandoned = true;
    clearTimeout(idleTimer);
    trackBookingEvent("booking_form_abandoned", {
      ...baseParams(),
      last_field: lastField && toSnakeCase(lastField),
      abandon_reason: reason,
      transport_type: "beacon",
    });
  };

  const resetIdle = () => {
    clearTimeout(idleTimer);
    if (interacted && !submitted && !abandoned) {
      idleTimer = setTimeout(() => abandon("inactive"), IDLE_TIMEOUT_MS);
    }
  };

  const fieldFromEvent = (e: Event) =>
    (e.target as HTMLElement | null)?.closest?.("[data-track-field]")?.getAttribute("data-track-field") ?? null;

  // Only fields the user actually touched can complete, so programmatic
  // defaults (preselected service/clinic) don't count as completions.
  const checkField = (field: string) => {
    if (!focused.has(field) || completed.has(field)) return;
    let valid = false;
    try {
      valid = isFieldValid(field);
    } catch {}
    if (!valid) return;
    completed.add(field);
    trackBookingEvent("booking_form_field_completed", { ...baseParams(), field_name: toSnakeCase(field) });
  };

  const onFieldInteraction = (e: Event) => {
    const field = fieldFromEvent(e);
    if (!field) return;
    interacted = true;
    lastField = field;
    if (!focused.has(field)) {
      focused.add(field);
      trackBookingEvent("booking_form_field_focused", { ...baseParams(), field_name: toSnakeCase(field) });
    }
    resetIdle();
  };

  const onFieldLeave = (e: Event) => {
    const field = fieldFromEvent(e);
    if (field) checkField(field);
  };

  const onPageHide = () => abandon("page_exit");

  const markSubmitted = () => {
    submitted = true;
    clearTimeout(idleTimer);
    trackBookingEvent("booking_form_submitted", baseParams());
    trackBookingEvent("booking_funnel_completed", baseParams());
  };

  onMounted(() => {
    entry = resolveEntry(route.path);
    const el = container.value;
    if (!el) return;

    // On the dedicated booking pages the form is the page; when embedded,
    // the funnel starts once the user actually scrolls to it.
    if (BOOKING_FORM_PATHS.includes(route.path) || !("IntersectionObserver" in window)) {
      trackBookingEvent("booking_funnel_started", baseParams());
    } else {
      observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          trackBookingEvent("booking_funnel_started", baseParams());
          observer?.disconnect();
          observer = null;
        }
      }, { threshold: 0.1 });
      observer.observe(el);
    }

    el.addEventListener("focusin", onFieldInteraction);
    el.addEventListener("pointerdown", onFieldInteraction);
    el.addEventListener("focusout", onFieldLeave);
    el.addEventListener("change", onFieldLeave);
    // Dropdowns open in modals outside the container, so any activity counts
    document.addEventListener("pointerdown", resetIdle, { passive: true });
    document.addEventListener("keydown", resetIdle, { passive: true });
    window.addEventListener("pagehide", onPageHide);
  });

  onBeforeUnmount(() => {
    abandon("navigation");
    clearTimeout(idleTimer);
    observer?.disconnect();
    const el = container.value;
    el?.removeEventListener("focusin", onFieldInteraction);
    el?.removeEventListener("pointerdown", onFieldInteraction);
    el?.removeEventListener("focusout", onFieldLeave);
    el?.removeEventListener("change", onFieldLeave);
    document.removeEventListener("pointerdown", resetIdle);
    document.removeEventListener("keydown", resetIdle);
    window.removeEventListener("pagehide", onPageHide);
  });

  return { markSubmitted, checkField };
};
