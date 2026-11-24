export const servicePath = (item: { slug: string }) => `/service/${item.slug}`;

// Featured first, otherwise keeping the incoming order.
export const featuredFirst = <T extends { featured?: boolean }>(items: T[]): T[] =>
  [...items.filter(s => s.featured), ...items.filter(s => !s.featured)];
