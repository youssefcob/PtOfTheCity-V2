<script setup lang="ts">
import type { Clinic } from '~/types/types';
import EditableText from '~/components/Admin/EditableText.vue';
import EditableImage from '~/components/Admin/EditableImage.vue';
import { HSS_NETWORK_LOGO } from '~/config/clinicAffiliations';

const props = defineProps<{ clinic: Clinic }>();

const ck = (s: string) => `clinic.${props.clinic.slug}.hss.${s}`;
</script>

<template>
  <section class="clinic-hss">
    <div class="card">
      <EditableImage
        class="logo"
        :content-key="ck('logo')"
        :default-src="HSS_NETWORK_LOGO"
        default-alt="HSS Rehabilitation National Network - Participating Location"
        default-object-fit="contain"
        :width="460"
        :height="140"
        loading="eager"
      />
      <div class="copy">
        <EditableText
          tag="p"
          class="body"
          :content-key="ck('body')"
          :default="`PT of The City ${clinic.name} is a participating member of the HSS Rehabilitation National Network. Learn more about Hospital for Special Surgery, the #1 hospital in the world in orthopedics.`"
        />
        <a class="link" href="https://www.hss.edu" target="_blank" rel="noopener">hss.edu</a>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.clinic-hss {
  @include pagePadding();
  padding-top: 1rem;
  padding-bottom: 3rem;

  @media screen and (max-width: 1100px) {
    padding-top: 1rem;
    padding-bottom: 2rem;
  }
}

.card {
  display: flex;
  align-items: center;
  gap: 3rem;
  padding: 2.4rem 3.2rem;
  background-color: $surface-gray;

  @media screen and (max-width: 700px) {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
    padding: 2rem 1.6rem;
  }
}

.logo {
  flex-shrink: 0;
  width: 19.2rem;
  max-width: 100%;

  :deep(img) {
    width: 100%;
    height: auto;
    display: block;
  }
}

.copy {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.body {
  @include type-body;
  color: $primary-700;
  margin: 0;
}

.link {
  @include type-body;
  color: $primary-400;
  text-decoration: underline;

  &:hover {
    color: $primary-600;
  }
}
</style>
