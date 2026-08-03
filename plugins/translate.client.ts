import { translate, lang, dir, transNumbers, setLanguage } from '~/composables/Translate'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      translate,
      lang,
      dir,
      transNumbers,
      setLanguage
    }
  }
}) 