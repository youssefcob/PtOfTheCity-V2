<script setup lang="ts">
import EditableText from '~/components/Admin/EditableText.vue';
import EditableImage from '~/components/Admin/EditableImage.vue';

// Photo heights (rem) staggered as in the Figma strip.
const photos = [
  { id: 'photo_1', height: 40, src: '/images/contact/community-1.webp', caption: 'Local NYC Marathon support event' },
  { id: 'photo_2', height: 32, src: '/images/contact/community-2.webp', caption: 'Brooklyn heights clinic interior' },
  { id: 'photo_3', height: 44, src: '/images/contact/community-3.webp', caption: 'Advanced rehabilitation technology' },
  { id: 'photo_4', height: 36, src: '/images/contact/community-4.webp', caption: 'Our specialists in weekly training' },
  { id: 'photo_5', height: 42, src: '/images/contact/community-5.webp', caption: 'Community wellness outreach' },
];

const ck = (s: string) => `contact.community.${s}`;
</script>

<template>
  <section class="strip">
    <!-- only the mobile design titles this section -->
    <EditableText tag="h2" class="title" :content-key="ck('title_mobile')" default="Community & Clinics" />

    <div class="items">
      <figure v-for="photo in photos" :key="photo.id" class="item">
        <div class="photo" :style="{ height: `${photo.height}rem` }">
          <EditableImage :content-key="ck(`${photo.id}.image`)" :default-src="photo.src" :default-alt="photo.caption" />
        </div>
        <EditableText tag="p" class="caption" :content-key="ck(`${photo.id}.caption`)" :default="photo.caption" />
      </figure>
    </div>
  </section>
</template>

<style scoped lang="scss">
$mobile: 900px;

.strip {
  padding: 8rem 4rem;
  background-color: #ffffff;

  // mobile Figma: a white band with a title and a 2 + 2 + 1 photo grid
  @media screen and (max-width: $mobile) {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    padding: 3.2rem 2rem;
  }
}

.title {
  display: none;

  @media screen and (max-width: $mobile) {
    display: block;
    font-family: $font-switzer;
    font-weight: 700;
    font-size: 24px;
    line-height: normal;
    color: $primary-600;
  }
}

.items {
  display: flex;
  align-items: flex-start;
  gap: 2rem;

  @media screen and (max-width: $mobile) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.2rem;
  }
}

.item {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  flex: 1 1 0;
  min-width: 0;
  margin: 0;

  @media screen and (max-width: $mobile) {
    &:last-child {
      grid-column: 1 / -1;
    }
  }
}

.photo {
  width: 100%;

  :deep(img) {
    display: block;
    object-fit: cover;
  }

  @media screen and (max-width: $mobile) {
    height: 14rem !important;
    border-radius: 0.8rem;
    overflow: hidden;

    .item:last-child & {
      height: 18rem !important;
    }
  }
}

.caption {
  @include type-caption;
  color: $primary-700;

  @media screen and (max-width: $mobile) {
    display: none;
  }
}
</style>
