<script setup lang="ts">
import { computed } from 'vue';
import type { Clinic } from '~/types/types';
import EditableText from '~/components/Admin/EditableText.vue';
import EditableImage from '~/components/Admin/EditableImage.vue';
import { stripHtml } from '~/utils/stringUtils';

const props = defineProps<{ clinic: Clinic }>();

const ck = (s: string) => `clinic.${props.clinic.slug}.about.${s}`;

const aboutImage = computed(() => props.clinic.image || useImg('whoWeArePage', 900));

const summary = computed(
  () =>
    stripHtml(props.clinic.summary) ||
    `PT of the City – ${props.clinic.name} Physical Therapy Clinic is located at ${props.clinic.street_address}, ${props.clinic.city}, ${props.clinic.state} ${props.clinic.zip_code}. Its central location makes it a convenient choice for residents seeking quality care.`,
);

const bookingTarget = computed(() => ({
  path: '/booking',
  query: { clinic: props.clinic.name, service: 'Initial Check-up' },
}));

const bullets = ['getting_1', 'getting_2', 'getting_3'] as const;
const bulletDefaults: Record<string, string> = {
  getting_1: 'By Subway: nearby lines stop a short walk from the clinic.',
  getting_2: 'By Bus: several MTA bus routes stop nearby.',
  getting_3: 'By Car: street parking and nearby lots are available.',
};
</script>

<template>
  <section class="clinic-about">
    <div class="top">
      <div class="intro">
        <EditableText
          tag="h2"
          class="heading"
          :content-key="ck('heading')"
          default="Where exceptional care begins"
        />
        <EditableText tag="p" class="body" :content-key="ck('summary')" :default="summary" />
      </div>
      <div class="photo">
        <EditableImage
          :content-key="ck('image')"
          :default-src="aboutImage"
          :default-alt="`Inside ${clinic.name}`"
          :width="900"
          :height="700"
          loading="lazy"
        />
      </div>
    </div>

    <div class="bottom">
      <div class="directions">
        <EditableText
          tag="p"
          class="directions-title"
          :content-key="ck('getting_title')"
          default="Getting to the clinic is easy:"
        />
        <ul>
          <li v-for="b in bullets" :key="b">
            <EditableText tag="span" :content-key="ck(b)" :default="bulletDefaults[b]" />
          </li>
        </ul>
      </div>

      <div class="closing">
        <EditableText
          tag="p"
          class="body"
          :content-key="ck('closing')"
          default="Whether you're visiting for a routine appointment or specialized care, our clinic is dedicated to serving the community with accessibility and excellence in physical therapy services."
        />
        <NuxtLink :to="bookingTarget" class="request-btn">Request appointment</NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.clinic-about {
  @include pagePadding();
  padding-top: 4rem;
  padding-bottom: 4rem;
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
  @media screen and (max-width: 1000px) {
    background-color: $surface-cream;
    
  }
}

.top {
  display: flex;
  align-items: flex-start;
  gap: 4rem;

  @media screen and (max-width: 1000px) {
    flex-direction: column;
    gap: 2rem;
  }
}

.intro {
  width: 42%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media screen and (max-width: 1000px) {
    width: 100%;
  }
}

.heading {
  @include type-h2;
  text-transform: uppercase;
  color: $primary-600;
  margin: 0;
}

.body {
  @include type-body;
  color: $primary-700;
  margin: 0;
}

.photo {
  flex: 1;
  align-self: stretch;
  min-height: 34rem;
  overflow: hidden;
  background-color: $surface-teal-pale;

  @media screen and (max-width: 1000px) {
    width: 100%;
    min-height: 22rem;
  }

  :deep(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}

.bottom {
  display: flex;
  align-items: flex-start;
  gap: 4rem;

  @media screen and (max-width: 1000px) {
    flex-direction: column;
    gap: 2rem;
  }
}

.directions {
  width: 42%;

  @media screen and (max-width: 1000px) {
    width: 100%;
  }

  .directions-title {
    @include type-body;
    color: $primary-700;
    margin: 0 0 0.75rem;
  }

  ul {
    margin: 0;
    padding-left: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  li {
    @include type-body;
    color: $primary-700;

    :deep(.cms-editable-text) {
      color: inherit;
    }
  }
}

.closing {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: flex-start;
}

.request-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1.6rem 2.9rem;
  border-radius: 1.2rem;
  background-color: $primary-400;
  color: #ffffff;
  @include type-button;

  &:hover {
    background-color: $primary-600;
  }
}
</style>
