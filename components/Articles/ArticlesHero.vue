<script setup lang="ts">
import EditableText from '~/components/Admin/EditableText.vue';
</script>

<template>
  <section class="articles-hero">
    <div class="copy">
      <EditableText tag="p" class="kicker" content-key="articles.hero.kicker" default="The Knowledge Hub" />
      <EditableText tag="h1" class="title" content-key="articles.hero.title"
        default="Move Better. Live Fully. Expert Guidance for Every Body." />
      <EditableText tag="p" class="lede" content-key="articles.hero.body"
        default="Evidence-based resources, expert articles, and recovery guides — curated by PT of the City clinicians." />
    </div>
    <!-- Figma's "water caustic" shader fill - intentionally rendered as empty space. -->
    <div class="art" aria-hidden="true" />
  </section>
</template>

<style scoped lang="scss">
.articles-hero {
  @include pagePadding();
  padding-top: calc(#{$navbarHeight} + 5.8rem);
  padding-bottom: 7rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 4rem;

  @media screen and (max-width: 900px) {
    padding-top: calc(#{$navbarHeight} + 3rem);
    padding-bottom: 4rem;
  }
}

.copy {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 58.8rem;
  max-width: 100%;
  text-transform: uppercase;

  .kicker.kicker {
    @include type-overline;
    color: $primary-700;
    margin: 0;
  }

  .title.title {
    @include type-h2;
    color: $primary-600;
    margin: 0;
  }

  .lede.lede {
    @include type-large;
    color: $primary-700;
    margin: 0;
  }
}

.art {
  flex: 0 1 77.3rem;
  height: 39.6rem;
  margin-top: -5.8rem;

  @media screen and (max-width: 900px) {
    display: none;
  }
}
</style>
