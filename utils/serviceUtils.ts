import type { ServiceType } from '~/types/types';

// Programs and services share one table and are told apart by `type`;
// each has its own URL prefix.
export const servicePath = (item: { slug: string; type?: ServiceType | null }) =>
  `${item.type === 'program' ? '/programs' : '/service'}/${item.slug}`;
