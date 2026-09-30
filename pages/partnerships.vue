<template>
  <div class="partnerships-page">
    <PartnersHero />

    <p v-if="canReorder" class="editor-hint">
      Partners are added and edited in the admin dashboard under <strong>Partners</strong>. Use the ↑ ↓ buttons here to
      change their order.
    </p>

    <PartnersLogos :partners="partners" :can-reorder="canReorder" :busy="saving" @move="move" />
    <PartnersGroups :partners="partners" :can-reorder="canReorder" :busy="saving" @move="move" />
    <PartnersMobileExtras />
  </div>
</template>

<script setup lang="ts">
import PartnersHero from '~/components/Partners/PartnersHero.vue';
import PartnersLogos from '~/components/Partners/PartnersLogos.vue';
import PartnersGroups from '~/components/Partners/PartnersGroups.vue';
import PartnersMobileExtras from '~/components/Partners/PartnersMobileExtras.vue';
import partnershipsSeo from '~/assets/seoMetaTags/partnerships';
import type { Partner } from '~/types/types';

const { data } = await useFetch<Partner[]>(`${useUrl()}/web/partners`);

const {
  contentMap: pageContentMap,
  isContentEditor: pageIsContentEditor,
  textStyles: pageTextStyles,
  pageMeta: pageMetaData,
} = await usePageContent('partnerships');
providePageContent('partnerships', pageContentMap, pageIsContentEditor, pageTextStyles, pageMetaData);

usePageSeo(partnershipsSeo, pageMetaData);

// --- ordering (editors only, in edit mode) ---
const { editModeEnabled } = useEditorState();
const { reorderPartners } = useContentApi();
const toast = useToast();

const partners = ref<Partner[]>(data.value || []);
watch(data, (value) => (partners.value = value || []));

const canReorder = computed(() => pageIsContentEditor.value && editModeEnabled.value);
const saving = ref(false);

// Swap a partner with its neighbour in the list it's shown in (the logo strip
// or its category), then save the whole order. The list updates immediately
// and rolls back if the save fails.
const move = async (partner: Partner, direction: -1 | 1, group: Partner[]) => {
  const neighbour = group[group.findIndex((p) => p.id === partner.id) + direction];
  if (!neighbour || saving.value) return;

  const previous = partners.value;
  const next = [...previous];
  const a = next.findIndex((p) => p.id === partner.id);
  const b = next.findIndex((p) => p.id === neighbour.id);
  [next[a], next[b]] = [next[b], next[a]];
  partners.value = next;

  saving.value = true;
  try {
    partners.value = await reorderPartners(next.map((p) => p.id));
  } catch (err) {
    console.error('Failed to reorder partners', err);
    partners.value = previous;
    toast.error({ title: 'Error!', message: "Couldn't save the new order. Please try again." });
  } finally {
    saving.value = false;
  }
};
</script>

<style scoped lang="scss">
.partnerships-page {
  width: 100%;
  overflow: hidden;

  // the mobile design sits its sections on a cream page
  @media screen and (max-width: 900px) {
    background-color: $surface-cream;
  }
}

.editor-hint {
  @include pagePadding();
  padding-top: 1.2rem;
  padding-bottom: 1.2rem;
  border-top: 1px dashed rgba(255, 155, 55, 0.6);
  border-bottom: 1px dashed rgba(255, 155, 55, 0.6);
  background-color: rgba(255, 155, 55, 0.08);
  font-family: $font-poppins;
  font-size: 14px;
  color: #142235;
}
</style>
