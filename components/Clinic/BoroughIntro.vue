<script setup lang="ts">
import EditableText from '~/components/Admin/EditableText.vue';
import EditableImage from '~/components/Admin/EditableImage.vue';

const props = defineProps<{
  // Slug-safe key segment, e.g. "manhattan", "the-bronx" - used to scope the
  // CMS content keys so each borough gets its own editable copy/image.
  boroughKey: string;
  boroughName: string;
}>();

const introImg = (width: number) => useImg('whoWeArePage', width);
</script>

<template>
  <section class="borough-intro">
    <div class="copy">
      <EditableText tag="h2" class="title" :content-key="`clinics.${boroughKey}.intro.title`"
        :default="`${boroughName} Clinics`" />
      <EditableText tag="p" class="body" :content-key="`clinics.${boroughKey}.intro.body`"
        default="Our expanding network of convenient locations throughout Manhattan, Brooklyn, Queens, New Jersey, Long Island, Westchester, Staten Island, and Connecticut mean you'll never be far from the nation's best physical therapists." />
    </div>
    <div class="image">
      <EditableImage :content-key="`clinics.${boroughKey}.intro.image`" :default-src="introImg(900)"
        :default-alt="`${boroughName} neighbourhood`" loading="lazy" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.borough-intro {
  @include pagePadding();
  padding-top: 4rem;
  padding-bottom: 4rem;
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;

  @media screen and (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.copy {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 50%;

  @media screen and (max-width: 900px) {
    width: 100%;
  }

  .title {
    @include type-h2;
    text-transform: uppercase;
    color: $primary-600;
    margin: 0;
  }

  .body {
    @include type-large;
    color: $primary-700;
    margin: 0;
  }
}

.image {
  width: 50%;
  align-self: stretch;
  min-height: 21rem;
  overflow: hidden;

  @media screen and (max-width: 900px) {
    width: 100%;
    min-height: 0;
    aspect-ratio: 16 / 10;
  }

  :deep(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}
</style>
