// Shared provide/inject for the active campaign page data.
// The page ([name].vue) provides the fetched campaign page; any component
// injects it + gets derived helpers (phone formatting, clinic, title).

import type { Ref } from 'vue';

export const CAMPAIGN_KEY: InjectionKey<Ref<any>> = Symbol('campaign');

export const provideCampaign = (page: Ref<any>) => {
  provide(CAMPAIGN_KEY, page);
};

const formatTen = (x: string) => `(${x.slice(0, 3)}) ${x.slice(3, 6)}-${x.slice(6)}`;

export const useCampaign = () => {
  const page = inject<Ref<any>>(CAMPAIGN_KEY, ref(null));

  // Phone — prefer the campaign's campaign_phone, fall back to the clinic's phone.
  const phone = computed(() => page.value?.campaign_phone || page.value?.clinic?.phone || '');
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

  const clinic = computed(() => page.value?.clinic || null);
  const title = computed(() => page.value?.title || '');
  const campaignPageId = computed(() => page.value?.id ?? null);

  return { page, phone, phoneDigits, telLink, displayPhone, clinic, title, campaignPageId };
};
