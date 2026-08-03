import { createSlug, createSlugWithSeparator } from '~/utils/stringUtils';

export default defineNuxtPlugin(() => {
  return {
    provide: {
      createSlug,
      createSlugWithSeparator
    }
  };
}); 