<script setup lang="ts">
import type { Clinic } from '~/types/types';
import EditableText from '~/components/Admin/EditableText.vue';
import EditableImage from '~/components/Admin/EditableImage.vue';
import { MOUNT_SINAI_NETWORK_LOGO } from '~/config/clinicAffiliations';

const props = defineProps<{ clinic: Clinic }>();

const ck = (s: string) => `clinic.${props.clinic.slug}.mount_sinai.${s}`;
</script>

<template>
  <section class="clinic-mount-sinai">
    <EditableImage
      class="logo"
      :content-key="ck('logo')"
      :default-src="MOUNT_SINAI_NETWORK_LOGO"
      default-alt="Mount Sinai Trusted Rehabilitation Provider Network"
      default-object-fit="contain"
      :width="600"
      :height="240"
      loading="lazy"
    />
    <EditableText
      tag="p"
      class="body"
      :content-key="ck('body')"
      :default="`PT of The City - ${clinic.name}, our physical therapy clinic is a proud member of the Mount Sinai Trusted Rehabilitation Provider Network. This partnership reflects our ongoing commitment to exceptional patient care and clinical excellence. For our patients, it means receiving highly personalized, hands-on treatment from our dedicated team, fully supported by the seamless coordination and elite medical standards of a world-class healthcare network.`"
    />
  </section>
</template>

<style scoped lang="scss">
.clinic-mount-sinai {
  @include pagePadding();
  padding-top: 4rem;
  padding-bottom: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
  text-align: center;

  @media screen and (max-width: 1100px) {
    padding-top: 3rem;
    padding-bottom: 3rem;
    background-color: $surface-cream;
  }
}

.logo {
  width: 30rem;
  max-width: 100%;

  :deep(img) {
    width: 100%;
    height: auto;
    display: block;
  }
}

.body {
  @include type-body;
  color: $primary-700;
  margin: 0;
  max-width: 90rem;
}
</style>
