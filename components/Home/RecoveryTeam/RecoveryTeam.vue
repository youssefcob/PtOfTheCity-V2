<script setup lang="ts">
import EditableText from '~/components/Admin/EditableText.vue';
import EditableImage from '~/components/Admin/EditableImage.vue';

const bodyParts = [
  { label: "Lower Back", anchor: "lowerBack" },
  { label: "Wrist/Hand", anchor: "hands" },
  { label: "Neck Pain", anchor: "neck" },
  { label: "Ankle & Foot", anchor: "feet" },
  { label: "Pelvic Floor", anchor: "abdomen" },
  { label: "Shoulder", anchor: "shoulder" },
  { label: "Hip Pain", anchor: "" },
  { label: "Elbow", anchor: "elbows" },
  { label: "Knee Pain", anchor: "knees" },
];
</script>

<template>
  <section class="recovery-team">
    <div class="panel">
      <div class="panel-bg">
        <EditableImage content-key="home.recovery.panel_image"
          default-src="/images/home/recovery-team-bg.webp" default-alt="" />
      </div>
      <div class="panel-copy">
        <EditableImage content-key="home.recovery.panel_logo" class="panel-logo"
          default-src="/images/logo-white.webp" default-alt="PT of the City" />
        <!-- <img class="panel-logo" src="/images/logo-white.webp" alt="PT of the City" /> -->
        <EditableText tag="h1" class="panel-title" content-key="home.recovery.title"
          default="Your Recovery Team Starts Here." />
        <EditableText tag="p" class="panel-subtitle" content-key="home.recovery.subtitle"
          default="From your first visit to your final treatment plan" />
      </div>
    </div>

    <!-- mobile only: the dark photo panel is replaced by a plain section header,
         matching the mobile Figma frame -->
    <div class="mobile-header">
      <EditableText tag="p" class="overline" content-key="home.recovery.overline" default="Get Started" />
      <EditableText tag="h2" class="heading" content-key="home.recovery.title"
        default="Your Recovery Team Starts Here." />
      <EditableText tag="p" class="subtitle" content-key="home.recovery.subtitle"
        default="From your first visit to your final treatment plan" />
    </div>

    <div class="content">
      <div class="block mobile-card">
        <EditableText tag="h3" class="block-title" content-key="home.recovery.block1_title"
          default="Thinking About Surgery?" />
        <EditableText tag="p" class="block-body" content-key="home.recovery.block1_body"
          default="Many injuries and conditions can improve through targeted physical therapy." />
        <NuxtLink to="/booking" class="text-link">
          <EditableText tag="span" content-key="home.recovery.block1_link_label" default="Talk to a Therapist" class="text-link" />
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </NuxtLink>
      </div>

      <div class="block">
        <EditableText tag="h3" class="block-title" content-key="home.recovery.block2_title"
          default="Where Does It Hurt?" />
        <EditableText tag="p" class="block-body" content-key="home.recovery.block2_body"
          default="Find care designed for your specific condition and start feeling better sooner." />
        <div class="chip-grid">
          <NuxtLink
            v-for="part in bodyParts"
            :key="part.label"
            :to="part.anchor ? `/conditions#${part.anchor}` : '/conditions'"
            class="chip"
          >
            {{ part.label }}
          </NuxtLink>
        </div>
        <NuxtLink to="/conditions" class="text-link">
          <EditableText tag="span" content-key="home.recovery.block2_link_label" default="Explore All Conditions" class="text-link"/>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.recovery-team {
  display: flex;
  width: 100%;
  position: relative;

  @media screen and (max-width: 1100px) {
    flex-direction: column;
  }
}

.panel {
  position: relative;
  display: flex;
  align-items: center;
  width: 49%;
  min-height: 32rem;
  padding: 3.5rem 8rem;
  overflow: hidden;
  background-color: $primary-base;
  // pulls the panel up into PartnerBanner's oversized bottom padding
  // (10rem, vs 3.75rem elsewhere) so it overlaps the section above.
  margin-top: -6rem;

  @media screen and (max-width: 1100px) {
    width: 100%;
    min-height: 22rem;
  }

  @media screen and (max-width: 900px) {
    display: none;
  }
}

.mobile-header {
  display: none;

  @media screen and (max-width: 900px) {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
    padding: 3rem 1.25rem 0;
    background-color: $surface-cream;

    .overline {
      @include type-overline;
      color: $primary-400;
    }

    .heading {
      @include type-h2;
      color: $primary-700;
    }

    .subtitle {
      @include type-body;
      color: $primary-700;
      opacity: 0.8;
    }
  }
}

.block.mobile-card{
  @media screen and (max-width: 900px) {
    background-color: #ffffff;
    padding: 3rem;
    border-radius: 1rem;
 border:none;
  }
}


.panel-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;

  :deep(img) {
    opacity: 0.2;
  }
}

.panel-copy {
  z-index: 1;
}

.panel-copy {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.panel-logo {
  align-self: flex-start;
  height: 6.25rem;
  width: auto;
}

.panel-title {
  @include type-h1;
  max-width: 34rem;
  text-transform: uppercase;
  color: #ffffff;
}

.panel-subtitle {
  @include type-h3;
  max-width: 33.4rem;
  color: $primary-600;
}

.content {
  display: flex;
  flex-direction: column;
  width: 51%;
  padding: 3.5rem 4rem;
  gap: 0;
  background-color: #ffffff;

  @media screen and (max-width: 1100px) {
    width: 100%;
    padding: 2.5rem 2rem;
  }

  @media screen and (max-width: 900px) {
    padding: 1.5rem 1.25rem 3rem;
    background-color: $surface-cream;
  }
}

.block {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 1rem;
  margin-bottom: 14rem;
  border-bottom: 1px solid $primary-300;

  &:last-child {
    margin-bottom: 0;
  }

  @media screen and (max-width: 900px) {
    margin-bottom: 2.5rem;
  }
}

.block-title {
  @include type-h3;
  text-transform: uppercase;
  color: $primary-600;
}

.block-body {
  @include type-body;
  color: $primary-700;
}

.chip-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;

  @media screen and (max-width: 900px) {
    display: flex;
    flex-wrap: wrap;
  }
}

.chip {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  padding: 0.5rem 0.75rem;
  border: 1.5px solid $primary-400;
  border-radius: 1rem;
  background: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.06);
  @include type-body;
  color: $primary-700;
  text-align: center;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: $surface-mint;
  }
}

.text-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  align-self: flex-start;
  @include type-button;
  color: $primary-700;

  &:hover {
    color: $primary-400;
  }
}

.block:last-child .text-link {
  font-weight: 700;
}
</style>
