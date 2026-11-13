<template>
  <div class="free-offer-page">
    <FreeOfferHero />
    <FreeOfferBooking />
  </div>
</template>

<script lang="ts" setup>
import FreeOfferHero from '~/components/FreeOffer/FreeOfferHero.vue';
import FreeOfferBooking from '~/components/FreeOffer/FreeOfferBooking.vue';
import freeOfferSeo from '~/assets/seoMetaTags/free-offer';

const {
  contentMap: pageContentMap,
  isContentEditor: pageIsContentEditor,
  textStyles: pageTextStyles,
  pageMeta: pageMetaData,
} = await usePageContent('free-offer');
providePageContent('free-offer', pageContentMap, pageIsContentEditor, pageTextStyles, pageMetaData);

usePageSeo(freeOfferSeo, pageMetaData);
</script>

<style scoped lang="scss">
.free-offer-page {
  width: 100%;
  min-height: 100vh;
  background-color: $surface-cream;
}
</style>
