<script setup lang="ts">
import EditableText from '~/components/Admin/EditableText.vue';
import EditableImage from '~/components/Admin/EditableImage.vue';
import { MOUNT_SINAI_NETWORK_LOGO } from '~/config/clinicAffiliations';

// Generic network affiliation blurb ("official member … at select locations")
// shown on pages that aren't tied to one clinic. Needs the host page's
// providePageContent() context, like every other Editable* field.
const props = withDefaults(defineProps<{
  // Prefix for the CMS keys, e.g. "about.mount_sinai" -> about.mount_sinai.logo
  contentKey: string;
  // Drop the page-edge padding when nested inside another padded container.
  flush?: boolean;
}>(), { flush: false });

const ck = (s: string) => `${props.contentKey}.${s}`;
</script>

<template>
  <section class="mount-sinai-blurb" :class="{ flush }">
    <EditableImage
      class="logo"
      :content-key="ck('logo')"
      :default-src="MOUNT_SINAI_NETWORK_LOGO"
      default-alt="Mount Sinai Trusted Rehabilitation Provider Network"
      default-object-fit="contain"
      :width="500"
      :height="200"
      loading="lazy"
    />
    <EditableText
      tag="p"
      class="body"
      :content-key="ck('body')"
      default="PT of The City is an official member of the Mount Sinai Trusted Rehabilitation Provider Network at select locations. This affiliation recognizes our advanced clinical excellence and aligns our care pathways with Mount Sinai's trusted network standards to ensure optimal patient outcomes."
    />
  </section>
</template>

<style scoped lang="scss">
.mount-sinai-blurb {
  @include pagePadding();
  padding-top: 3rem;
  padding-bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.4rem;
  text-align: center;

  &.flush {
    padding: 2rem 0 0;
  }

  @media screen and (max-width: 1100px) {
    padding-top: 2.4rem;
    padding-bottom: 2.4rem;

    &.flush {
      padding: 2rem 0 0;
    }
  }
}

.logo {
  width: 25rem;
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
  max-width: 80rem;
}
</style>
