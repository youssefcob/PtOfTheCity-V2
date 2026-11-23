<script setup lang="ts">
import { useCampaign } from '~/composables/useCampaign';

// Multi-clinic campaigns: first field of the campaign form. The picked clinic
// also drives the clinic-specific sections (services, location, reviews).
defineProps<{ error?: string }>();
const emit = defineEmits<{ change: [] }>();

const { clinics, selectedClinicId, selectClinic } = useCampaign();

const sortedClinics = computed(() => [...clinics.value].sort((a, b) => a.name.localeCompare(b.name)));

const select = ref<HTMLSelectElement | null>(null);

const onChange = (e: Event) => {
  const value = (e.target as HTMLSelectElement).value;
  selectClinic(value ? Number(value) : null);
  emit('change');
};

// A pick made before hydration never reached onChange — sync it now
onMounted(() => {
  const value = select.value?.value;
  if (value && Number(value) !== selectedClinicId.value) selectClinic(Number(value));
});
</script>

<template>
  <div class="field">
    <label for="campaign-clinic">Clinic</label>
    <select id="campaign-clinic" ref="select" :value="selectedClinicId ?? ''" required @change="onChange">
      <option value="">Select a clinic near you</option>
      <option v-for="c in sortedClinics" :key="c.id" :value="c.id">
        {{ c.name }}<template v-if="c.city"> · {{ c.city }}</template>
      </option>
    </select>
    <span v-if="error" class="field-error">{{ error }}</span>
  </div>
</template>

<style scoped>
.field-error {
  display: block;
  color: #E85A47;
  font-size: 12px;
  font-weight: 600;
  margin-top: -2px;
}
</style>
