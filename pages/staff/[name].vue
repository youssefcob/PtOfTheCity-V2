<template>
  <div v-if="staffMember" class="staff-page">
    <StaffProfile :staff="staffMember" />
    <StaffTeam :staff="otherStaff" />
    <FindClinicBand page-key="staff" to="/clinics/all" />
  </div>
</template>

<script setup lang="ts">
import StaffProfile from '~/components/Staff/StaffProfile.vue';
import StaffTeam from '~/components/Staff/StaffTeam.vue';
import FindClinicBand from '~/components/shared/FindClinicBand.vue';
import type { Staff } from '~/types/types';

definePageMeta({
  middleware: ['slug-redirect'],
});

const route = useRoute();
const staffSlug = decodeURIComponent(route.params.name as string)
  .toLowerCase()
  .replace(/\s+/g, '-')
  .replace(/[^a-z0-9-]/g, '')
  .replace(/-+/g, '-');

const { data } = await useFetch<Staff[]>(`${useUrl()}/web/staff`);

const staffMember = computed(() => data.value?.find((s) => s.slug === staffSlug) ?? null);
const otherStaff = computed(() => data.value?.filter((s) => s.slug !== staffSlug) ?? []);

if (!staffMember.value) {
  throw createError({ statusCode: 404, statusMessage: 'Staff member not found', fatal: true });
}

// Page-level CMS content (breadcrumb/labels/band copy and per-staff image overrides)
const {
  contentMap: pageContentMap,
  isContentEditor: pageIsContentEditor,
  textStyles: pageTextStyles,
  pageMeta: pageMetaData,
} = await usePageContent('staff');
providePageContent('staff', pageContentMap, pageIsContentEditor, pageTextStyles, pageMetaData);

const fullName = computed(() =>
  [staffMember.value?.title, staffMember.value?.first_name, staffMember.value?.last_name].filter(Boolean).join(' '),
);
const description = computed(() => {
  const member = staffMember.value;
  const text = (member?.brief || member?.bio || '').replace(/\s+/g, ' ').trim();
  return text.slice(0, 160) || `Meet ${fullName.value}${member?.occupation ? `, ${member.occupation}` : ''} at PT of the City.`;
});

useSeoMeta({
  title: () => `${fullName.value} | PT of the City`,
  description,
  ogTitle: () => `${fullName.value} | PT of the City`,
  ogDescription: description,
  ogImage: () => staffMember.value?.image,
});
</script>

<style scoped lang="scss">
.staff-page {
  width: 100%;
  overflow: hidden;
}
</style>
