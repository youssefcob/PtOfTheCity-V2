<script setup lang="ts">
import EditableText from '~/components/Admin/EditableText.vue';
import PartnerReorder from '~/components/Partners/PartnerReorder.vue';
import type { Partner } from '~/types/types';

const props = defineProps<{
  partners: Partner[];
  canReorder: boolean;
  busy?: boolean;
}>();

defineEmits<{ (e: 'move', partner: Partner, direction: -1 | 1, group: Partner[]): void }>();

// The marquee loops by rendering the list twice and sliding it by half its
// width. While an editor is reordering, it holds still as a single list.
const track = computed(() => (props.canReorder ? props.partners : [...props.partners, ...props.partners]));

const ck = (s: string) => `partnerships.logos.${s}`;
</script>

<template>
  <!-- desktop: dark band with a scrolling logo strip -->
  <section v-if="partners.length" class="band">
    <img class="texture" src="/images/home/texture-pattern.webp" alt="" aria-hidden="true" />
    <EditableText tag="h2" class="band-heading" :content-key="ck('heading')"
      default="Below are our trusted partners and affiliations:" />

    <div class="marquee" :class="{ 'marquee--static': canReorder }">
      <div class="marquee-track">
        <div v-for="(partner, i) in track" :key="`${partner.id}-${i}`" class="tile"
          :class="{ 'tile--clone': i >= partners.length }" :aria-hidden="i >= partners.length">
          <img v-if="partner.logo" :src="partner.logo" :alt="partner.name" loading="lazy" />
          <span v-else class="tile-name">{{ partner.name }}</span>
          <PartnerReorder v-if="canReorder" :name="partner.name" :first="i === 0" :last="i === partners.length - 1"
            :busy="busy" @move="(d) => $emit('move', partner, d, partners)" />
        </div>
      </div>
    </div>
  </section>

  <!-- mobile: a light logo grid with its own heading -->
  <section v-if="partners.length" class="grid-section">
    <div class="grid-header">
      <EditableText tag="p" class="grid-eyebrow" :content-key="ck('mobile.eyebrow')"
        default="Trusted by leading organizations" />
      <EditableText tag="h2" class="grid-heading" :content-key="ck('mobile.heading')"
        default="Working Alongside Organizations That Shape New York." />
    </div>
    <div class="grid">
      <div v-for="(partner, i) in partners" :key="partner.id" class="card">
        <img v-if="partner.logo" :src="partner.logo" :alt="partner.name" loading="lazy" />
        <span v-else class="card-name">{{ partner.name }}</span>
        <PartnerReorder v-if="canReorder" :name="partner.name" :first="i === 0" :last="i === partners.length - 1"
          :busy="busy" @move="(d) => $emit('move', partner, d, partners)" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
$mobile: 900px;

.band {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  @include pagePadding();
  padding-top: 6rem;
  padding-bottom: 6rem;
  background-color: $primary-600;
  overflow: hidden;

  > :not(.texture) {
    position: relative;
  }

  @media screen and (max-width: $mobile) {
    display: none;
  }
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

.band-heading {
  max-width: 60rem;
  @include type-h3;
  text-transform: uppercase;
  color: #ffffff;
}

.marquee {
  overflow: hidden;
}

.marquee-track {
  display: flex;
  gap: 2.4rem;
  width: max-content;
  animation: partners-marquee 40s linear infinite;

  .marquee:hover & {
    animation-play-state: paused;
  }

  .marquee--static & {
    flex-wrap: wrap;
    width: auto;
    animation: none;
  }

  @media (prefers-reduced-motion: reduce) {
    flex-wrap: wrap;
    width: auto;
    animation: none;
  }
}

@keyframes partners-marquee {
  from {
    transform: translateX(0);
  }

  to {
    // one copy of the list plus its trailing gap
    transform: translateX(calc(-50% - 1.2rem));
  }
}

// 18.1rem tiles with a cyan left rule; logos are shown white on the dark band
.tile {
  position: relative;
  display: flex;
  align-items: center;
  flex: 0 0 18.1rem;
  height: 13.2rem;
  padding: 0 1.6rem;
  border-left: 1px solid $primary-base;

  img {
    width: 12rem;
    height: 13.2rem;
    object-fit: contain;
    object-position: left center;
    filter: brightness(0) invert(1);
  }
}

// the looping copy isn't needed when the strip doesn't move
.tile--clone {
  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
}

.tile-name {
  font-family: $font-switzer;
  font-weight: 600;
  font-size: 20px;
  line-height: 1.2;
  text-transform: uppercase;
  color: #ffffff;
}

.grid-section {
  display: none;

  @media screen and (max-width: $mobile) {
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    padding: 4.8rem 1.6rem;
    background-color: #ffffff;
  }
}

.grid-header {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  text-transform: uppercase;
}

.grid-eyebrow {
  font-family: $font-poppins;
  font-weight: 600;
  font-size: 16px;
  line-height: 18px;
  letter-spacing: 1.28px;
  color: $primary-400;
}

.grid-heading {
  font-family: $font-switzer;
  font-weight: 600;
  font-size: 36px;
  line-height: 44px;
  letter-spacing: -0.18px;
  color: $primary-600;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.2rem;
}

// logos are shown dark on the light cards
.card {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 8rem;
  padding: 1.6rem;
  border: 1px solid #e5e7eb;
  border-radius: 1.2rem;
  background-color: $surface-cream;

  img {
    width: 11rem;
    height: 6rem;
    object-fit: contain;
    filter: brightness(0);
    opacity: 0.8;
  }
}

.card-name {
  font-family: $font-poppins;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.3;
  color: $primary-600;
  text-align: center;
}
</style>
