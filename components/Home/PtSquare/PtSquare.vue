<script setup lang="ts">
import EditableText from '~/components/Admin/EditableText.vue';
import EditableImage from '~/components/Admin/EditableImage.vue';
</script>

<template>
  <section class="pt-square">
    <div class="card">
      <img class="texture" src="/images/home/square-texture.webp" alt="" aria-hidden="true" />
      <div class="card-copy">
        <EditableText tag="p" class="overline" content-key="home.pt_square.overline" default="PT of the City Square" />
        <EditableText tag="h2" class="heading" content-key="home.pt_square.heading"
          default="Treatment, Designed Around You" />
        <EditableText tag="p" class="body" content-key="home.pt_square.body"
          default="No two patients are the same. That's why our therapists create personalized treatment plans based on your goals, lifestyle, and recovery needs." />
      </div>
      <NuxtLink to="/booking" class="cta-button">
        <EditableText tag="span" content-key="home.pt_square.cta_label" default="Request Appointment" />
      </NuxtLink>
      <NuxtLink to="/about" class="text-link">
        <EditableText tag="span" content-key="home.pt_square.link_label" default="Learn about the company" />
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      </NuxtLink>
    </div>

    <div class="image-panel">
      <EditableImage content-key="home.pt_square.image" default-alt="A PT of the City physical therapist caring for a patient" />
    </div>
 <div class="card-2">
      <div class="card-copy">
        <EditableText tag="h2" class="heading" content-key="home.pt_square.card2_heading"
          default="Treatment, Designed Around You" />
        <EditableText tag="p" class="body" content-key="home.pt_square.card2_body_1"
          default="No two patients are the same. That's why our therapists create personalized treatment plans based on your goals, lifestyle, and recovery needs." />
        <EditableText tag="p" class="body" content-key="home.pt_square.card2_body_2"
          default="No two patients are the same. That's why our therapists create personalized treatment plans based on your goals, lifestyle, and recovery needs." />
      </div>
    </div>

  </section>
</template>

<style scoped lang="scss">
.pt-square {
  display: flex;
  width: 100%;
  min-height: 60rem;
  padding: 7.5rem 10rem;
  background-color: white;


  @media screen and (max-width: 900px) {
    flex-direction: column;
    min-height: unset;
    padding: 3rem 1.25rem;
  }
}

.card,.card-2 {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 1.5rem;
  width: 50%;
  padding: 3rem 4rem;
  background-color: $primary-400;
  overflow: hidden;

  @media screen and (max-width: 900px) {
    width: 100%;
  }
}

// mobile only shows the teal card - image panel and the white duplicate card
// aren't in the Figma mobile frame
.image-panel,
.card-2 {
  @media screen and (max-width: 900px) {
    display: none;
  }
}

.card {
  @media screen and (max-width: 900px) {
    justify-content: flex-start;
    gap: 1.25rem;
    padding: 1.5rem;
    background-color: $primary-base;

    .texture {
      display: none;
    }

    .overline {
      display: none;
    }

    .heading,
    .body {
      color: $primary-600;
    }

    .body {
      opacity: 0.9;
    }
  }
}

.card-2 {
  background-color: $white;

  .heading,
  .body {
    color: $primary-700;
  }
}
.texture {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.15;
  pointer-events: none;
}

.card-copy {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.overline {
  @include type-overline;
  color: #ffffff;
}

.heading {
  @include type-h2;
  text-transform: uppercase;
  color: $primary-700;
}

.body {
  @include type-body;
  color: #ffffff;
}

.cta-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3.5rem;
  border-radius: 0.75rem;
  background-color: #ffffff;
  @include type-button;
  color: $primary-700;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.9;
  }

  @media screen and (max-width: 900px) {
    width: 100%;
    height: auto;
    padding: 0.875rem;
    background-color: $primary-400;
    color: #ffffff;
  }
}

.text-link {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  align-self: flex-start;
  @include type-button;
  color: $primary-700;

  &:hover {
    color: #ffffff;
  }

  @media screen and (max-width: 900px) {
    align-self: stretch;
    justify-content: center;
    width: 100%;
    padding: 0.875rem;
    border: 1.5px solid $primary-600;
    border-radius: 0.75rem;
    color: $primary-600;

    svg {
      display: none;
    }

    &:hover {
      color: $primary-700;
    }
  }
}

.image-panel {
  width: 50%;

  @media screen and (max-width: 900px) {
    width: 100%;
    height: 20rem;
  }

  :deep(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}
</style>
