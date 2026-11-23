// Shared provide/inject for the active campaign page data.
// The page ([name].vue) provides the fetched campaign page; any component
// injects it + gets derived helpers (phone formatting, clinic, title).

import type { Ref } from 'vue';

export const CAMPAIGN_KEY: InjectionKey<Ref<any>> = Symbol('campaign');

// Multi-clinic campaigns (page.clinics): which clinic the visitor picked in
// the hero switcher, plus each picked clinic's Google reviews — the API only
// attaches reviews for single-clinic campaigns, so they're fetched on pick.
type ClinicSelection = {
  selectedClinicId: Ref<number | null>;
  reviewsByClinic: Record<number, { reviews: any[]; rating: number; user_ratings_total: number }>;
};
const CLINIC_SELECTION_KEY: InjectionKey<ClinicSelection> = Symbol('campaign-clinic-selection');

export const provideCampaign = (page: Ref<any>) => {
  provide(CAMPAIGN_KEY, page);
  const selection: ClinicSelection = { selectedClinicId: ref(null), reviewsByClinic: reactive({}) };
  provide(CLINIC_SELECTION_KEY, selection);
  return selection;
};

const formatTen = (x: string) => `(${x.slice(0, 3)}) ${x.slice(3, 6)}-${x.slice(6)}`;

// Used when a campaign has neither its own campaign_phone nor a linked
// clinic phone — keeps every call button on the page functional instead of
// silently disappearing (they're all v-if="telLink").
const DEFAULT_CAMPAIGN_PHONE = '(929) 730-2232';

export const useCampaign = () => {
  const page = inject<Ref<any>>(CAMPAIGN_KEY, ref(null));
  const { selectedClinicId, reviewsByClinic } = inject(CLINIC_SELECTION_KEY, {
    selectedClinicId: ref(null),
    reviewsByClinic: reactive({}),
  });

  const clinics = computed<any[]>(() => page.value?.clinics || []);
  const isMultiClinic = computed(() => clinics.value.length > 0);

  // Single-clinic campaigns use page.clinic; multi-clinic ones use the picked
  // clinic (null until the visitor picks one, which hides clinic sections).
  const clinic = computed(() => {
    if (!isMultiClinic.value) return page.value?.clinic || null;
    const picked = clinics.value.find((c) => c.id === selectedClinicId.value);
    return picked ? { ...picked, ...reviewsByClinic[picked.id] } : null;
  });

  // resolved here in setup — the switcher calls selectClinic from an event handler
  const apiBase = useUrl();
  const selectClinic = async (id: number | null) => {
    selectedClinicId.value = id;
    if (!id || reviewsByClinic[id]) return;

    const res = await $fetch<any>(`${apiBase}/web/clinic/reviews/${id}`).catch(() => null);
    if (!res) return;
    reviewsByClinic[id] = {
      rating: res.rating,
      user_ratings_total: res.user_ratings_total,
      // same filter the API applies for single-clinic campaigns
      reviews: (res.reviews || []).filter((r: any) => (r.rating ?? 0) > 3),
    };
  };

  // Phone — prefer the campaign's campaign_phone, fall back to the clinic's phone, then the default.
  const phone = computed(() => page.value?.campaign_phone || clinic.value?.phone || DEFAULT_CAMPAIGN_PHONE);
  const phoneDigits = computed(() => (phone.value || '').replace(/\D/g, ''));

  // tel: link
  const telLink = computed(() => (phoneDigits.value ? `tel:+${phoneDigits.value}` : ''));

  // Human-readable display
  const displayPhone = computed(() => {
    const d = phoneDigits.value;
    if (!d) return phone.value;
    if (d.length === 11 && d.startsWith('1')) return formatTen(d.slice(1));
    if (d.length === 10) return formatTen(d);
    return phone.value;
  });

  const service = computed(() => page.value?.service || null);
  const title = computed(() => page.value?.title || '');
  const campaignPageId = computed(() => page.value?.id ?? null);

  return {
    page,
    phone,
    phoneDigits,
    telLink,
    displayPhone,
    clinic,
    clinics,
    isMultiClinic,
    selectedClinicId,
    selectClinic,
    service,
    title,
    campaignPageId,
  };
};
