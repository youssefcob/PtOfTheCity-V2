<template>
  <div>
    <div class="mobile">
      <DropDownModal ref="modal">
        <div class="dropdown-wrapper">
          <div class="dropdown-element" v-for="(clinic, index) in clinics" @click="selectClinic(clinic)"
            :class="{ active: selectedClinic?.id === clinic.id }" :key="index">
            <div class="dropdown-element-name">
              <h3>{{ clinic.name }}</h3>
            </div>
            <div class="clinic-address">
              <p>{{ clinic.street_address }}</p>
            </div>
          </div>
        </div>
      </DropDownModal>
      <div>
      </div>
    </div>

    <span v-if="!noFormLabel" class="form-label">
      Select a Clinic
    </span>
      <div :class="`booking-input-field mobile w-m-100 ${dropDownDisabled && 'disabled' }`" @click="openModal()">
        {{ selectedClinic ? selectedClinic.name : 'Select a clinic' }}
      </div>

    <div class="desktop w-60">
      <DropDownInputField ref="dropDown" :list="clinicsTitles" placeHolder="N/A" NoLabel
        @input="selectClinic(fromTitle($event) as Clinic)" :default="selectedClinic?.name" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import DropDownInputField from '~/sharedComponents/DropDownInputField.vue';
import DropDownModal from '~/sharedComponents/DropDownModal.vue';
import type { Clinic } from '~/types/types';
import { watch } from 'vue'
import bookingForm from '../../bookingForm';

const props = defineProps({
  noFormLabel: {
    type: Boolean,
    default: false,
  }
})
const toast = useToast();

const route = useRoute();
const clinicName = route.query.clinic as string;

onMounted(()=>{
  if(clinicName){
    selectClinic(fromTitle(clinicName) as Clinic)
  }
})
const clinics = computed(() => bookingForm.firstStep.content.selectedService?.clinics)
const clinicsTitles = computed(() => clinics.value?.map((c) => c.name))
const modal = ref<InstanceType<typeof DropDownModal> | null>(null);

const emit = defineEmits(['clinic-selected']);

const selectedClinic = ref<Clinic | null>(bookingForm.firstStep.content.selectedClinic);

const dropDown = ref<InstanceType<typeof DropDownInputField> | null>(null);
const dropDownDisabled = computed(() => {
  return !bookingForm.firstStep.content.selectedService || clinics.value?.length === 0;
});

function selectClinic(clinic: Clinic) {
  if (!clinic) return;
  selectedClinic.value = clinic;
  emit('clinic-selected', clinic);
  modal.value?.closeModal();
  // dropDown.value?.defaultValue(clinic.name);
}
function fromTitle(clinic: string) {
  return clinics.value?.find((c) => c.name === clinic);
}
const clear = () => {
  selectedClinic.value = null;
  emit('clinic-selected', null);
  modal.value?.closeModal();
}

function openModal() {
  if (!modal.value) return;
  if (!bookingForm.firstStep.content.selectedService || clinics.value?.length === 0) {
    toast.error({ message: 'Pick a service first to see available clinics' });
    return;
  }
  modal.value?.openModal();
}
defineExpose({
  clear,
});


</script>

<style scoped lang="scss">
.dropdown-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 70vh;
  overflow-y: scroll;
  width: 90vw;
  max-width: 50rem;
  padding: 2rem;
  border-radius: 1rem;
  backdrop-filter: blur(7px);
  background: rgba(16, 53, 53, 0.50);

  .dropdown-element {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    cursor: pointer;
    // background-color: red;
    border-radius: 10px;
    padding: 1rem;

    &.active {
      background-color: $cta;
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 0.5rem;
    }

    .dropdown-element-name {
      h3 {
        color: white;
        font-size: 2.2rem;
        font-weight: 700;
      }
    }

    .clinic-address {
      p {
        color: white;
        font-size: 1.4rem;
      }
    }
  }


  h3,
  p {
    color: white;
  }
}

// .booking-input-field{
//   max-width:40rem;
// }


.w-60 {
  // max-width: 60vw;
}

.input-field-wrapper {
  // width:100vw;
  // padding-right:5rem;
}

.w-m-100 {
  @media screen and (max-width:1100px) {
    width:calc(600px - 5rem);

    max-width: 100%;
    // background-color: red;
    // display: none;
    display:flex;
    align-items: center;


  }
  @media screen and (max-width:600px){
    width: calc(100vw - 5rem);

  }

}

.booking-input-field.disabled {
    background-color: $grey;
    opacity: 0.3;
    cursor: not-allowed;
}
</style>