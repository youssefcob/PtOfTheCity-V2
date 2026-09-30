<script lang="ts">
export type AboutValueCardData = {
  id: string;
  title: string;
  body: string;
  // Figma treatments: plain cyan/sand cards carry a drop shadow; the textured
  // ones get the shared texture overlay (plus a dark shade on cyan).
  variant: 'cyan' | 'cyan-textured' | 'sand' | 'sand-textured' | 'dark';
  photo?: boolean;
  hidePhotoOnMobile?: boolean;
};
</script>

<script setup lang="ts">
import EditableText from '~/components/Admin/EditableText.vue';
import EditableImage from '~/components/Admin/EditableImage.vue';

const props = defineProps<{ card: AboutValueCardData }>();

const ck = (s: string) => `about.values.${props.card.id}.${s}`;
const textured = computed(() => ['cyan-textured', 'sand-textured', 'dark'].includes(props.card.variant));
</script>

<template>
  <article class="value-card" :class="[`value-card--${card.variant}`, { 'value-card--has-photo': card.photo }]">
    <img v-if="textured" class="texture" src="/images/home/texture-pattern.webp" alt="" aria-hidden="true" />
    <div v-if="card.variant === 'cyan-textured'" class="shade" aria-hidden="true"></div>
    <EditableText tag="h3" class="card-title" :content-key="ck('title')" :default="card.title" />
    <div v-if="card.photo" class="card-photo" :class="{ 'hide-on-mobile': card.hidePhotoOnMobile }">
      <EditableImage :content-key="ck('image')" default-src="/images/about/bridge.webp"
        default-alt="The Brooklyn Bridge in black and white" />
    </div>
    <hr class="card-rule" />
    <EditableText tag="p" class="card-body" :content-key="ck('body')" :default="card.body" />
  </article>
</template>

<style scoped lang="scss">
.value-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 1.6rem 3.2rem;
  overflow: hidden;
  color: $primary-700;

  > :not(.texture):not(.shade) {
    position: relative;
  }

  :deep(span) {
    color: inherit;
  }
}

.value-card--cyan,
.value-card--sand {
  gap: 1.2rem;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.value-card--cyan,
.value-card--cyan-textured {
  background-color: $primary-base;
}

.value-card--sand,
.value-card--sand-textured {
  background-color: $surface-sand;
}

.value-card--sand {
  min-height: 47.4rem;

  @media screen and (max-width: 700px) {
    min-height: 0;
  }
}

.value-card--dark {
  background-color: $primary-600;
}

.value-card--dark,
.value-card--cyan-textured {
  color: #ffffff;
}

.texture {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.2;
  pointer-events: none;
}

.shade {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
  pointer-events: none;
}

.card-title {
  // global h2/h3/p rules in _classes.scss would otherwise set their own color
  color: inherit;
  @include type-h2;
  text-transform: uppercase;
}

// In the About grid every column is stretched to the same height; the card
// with a photo takes up the leftover space and its photo grows to fill it.
.value-card--has-photo {
  flex-grow: 1;
}

.card-photo {
  flex: 1 0 22rem;

  :deep(.cms-editable-image) {
    position: absolute;
    inset: 0;
  }

  :deep(img) {
    display: block;
    object-fit: cover;
  }

  &.hide-on-mobile {
    @media screen and (max-width: 700px) {
      display: none;
    }
  }
}

.card-rule {
  width: 100%;
  height: 0;
  border: 0;
  border-top: 1.5px solid #000000;
}

.value-card--cyan-textured .card-rule {
  border-top-color: #ffffff;
}

.value-card--sand-textured .card-rule {
  border-top-color: $primary-700;
}

.card-body {
  color: inherit;
  @include type-body;
}
</style>
