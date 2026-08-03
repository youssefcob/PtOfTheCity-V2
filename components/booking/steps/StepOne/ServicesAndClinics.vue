<template>
  <div class="wrapper">
    <Services @service-selected="selectService($event as Service)" />
    <Clinics ref="clinicComp" @clinic-selected="selectClinic($event as Clinic)"  />
  </div>
</template>

<script lang="ts" setup>
import type { Clinic, Service } from '~/types/types';
import Services from './Services.vue';
import Clinics from './Clinics.vue';
import bookingForm from '../../bookingForm';

const form = reactive({
  service_id: bookingForm.firstStep.content.form.service_id as string | null,
  clinic_id: bookingForm.firstStep.content.form.clinic_id as number | null,
})
const clinics = ref<Clinic[]>([]);
const clinicComp = ref<InstanceType<typeof Clinics> | null>(null);

let selectedService = bookingForm.firstStep.content.selectedService as Service | null;
let selectedClinic = bookingForm.firstStep.content.selectedClinic as Clinic | null;
const emit = defineEmits(['formUpdates']);

function selectService(service: Service) {
  form.service_id = service.id;
  selectedService = service;
  clinics.value = service.clinics || [];
  if (form.clinic_id && !service.clinics.some((clinic: Clinic) => clinic.id === form.clinic_id)) {
    form.clinic_id = null;
    selectedClinic = null;
    clinicComp.value?.clear()
  }
  // emit('formUpdates', { form, selectedService, selectedClinic });
handleStepOneFormUpdates();
}

function selectClinic(clinic: Clinic) {
  if (!clinic) return;
  form.clinic_id = clinic.id;
  selectedClinic = clinic;
handleStepOneFormUpdates();
}
function handleStepOneFormUpdates(){
  bookingForm.firstStep.push({ form, selectedService, selectedClinic });
  bookingForm.secondStep.content.schedule = selectedClinic?.schedule || null;
};


</script>

<style scoped lang="scss">
.wrapper {
  
  @media screen and (min-width: 1100px) {
    width: 60vw;
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }


}
</style>