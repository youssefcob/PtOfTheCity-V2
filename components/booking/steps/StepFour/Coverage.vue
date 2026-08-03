<template>
  <!-- <span class="form-label">
    Pick a date & time
  </span> -->
  <div class="g-2 w-60 w-m-100">

    <div>
      <RadioInputField layout-mobile="vertical" style="width: 100%" color="white" title=""
        :options="['Insurance', 'Self pay', 'Workers compensation']" :checked="'Insurance'" id="returning"
        @change="updateCoverage($event)" />
    </div>


    <div class="g-2"
      v-show="form.payment.toLowerCase() != 'workers compensation' && !bookingForm.thirdStep.content.form.returning">
      <div class="desktop">
        <DropDownInputField v-show="!(bookingForm.step(3).content.form.returning == 'Yes')" id="insurance"
          :list="insurancesTitles" placeHolder="Insurance company name" @input="form.insurance = $event"
          :disabled="isSelfPay()" :required="!isSelfPay()" />
      </div>
      <div class="mobile">
        <DropDownMobile :disabled="isSelfPay()" placeHolder='Insurance' @input="form.insurance = $event"
          :list="insurancesTitles" class="dropdown-wrapper"  />
      </div>
      <InputField v-show="!(bookingForm.step(3).content.form.returning == 'Yes')" @input="form.memberId = $event"
        placeHolder="Member ID" id="MemberId" :required="!isSelfPay()" :disabled="isSelfPay()" />
    </div>


    <div class="g-2" v-show="form.payment.toLowerCase() == 'workers compensation'">
      <div class="split g-2 f-r">
        <div class="field">
          <InputField @input="form.date_of_accident = $event" placeHolder="Date of Accident" mask="##-##-####"
            id="date_of_accident" date required min-year="-50" max-year="+0" />
        </div>
        <div class="field ">
          <InputField @input="form.case_number = $event" placeHolder="Case Number" id="case_number" required />
        </div>
      </div>
      <div class="split g-2 f-r">
        <div class="field">
          <InputField @input="form.lawyer_name = $event" placeHolder="Lawyer Name" id="lawyer_name" letterOnly
            required />
        </div>
        <div class="field">
          <InputField @input="form.lawyer_phone_number = $event" placeHolder="Lawyer Phone Number"
            id="lawyer_phone_number" mask="(###) ###-####" required />
        </div>
      </div>
    </div>
    <InputField @input="form.pain = $event" height="15rem" placeHolder="Tell us more about your pain" id="pain"
      optional />
  </div>


</template>

<script lang="ts" setup>
import DropDownInputField from '~/sharedComponents/DropDownInputField.vue';
import InputField from '~/sharedComponents/InputField.vue';
import RadioInputField from '~/sharedComponents/RadioInputField.vue';
import bookingForm from '../../bookingForm';
import type { Insurance } from '~/types/types';
import DropDownMobile from '~/sharedComponents/DropDownMobile.vue';

const form = reactive({
  date_of_accident: '',
  case_number: '',
  lawyer_name: '',
  lawyer_phone_number: '',
  payment: 'Insurance',
  insurance: '',
  memberId: '',
  pain: ''
})
// console.log('show insurance', form.payment.toLowerCase() != 'workers compensation')
// console.log( !bookingForm.thirdStep.content.form.returning)

onMounted(()=>{
  handleFormUpdates();
})
watch((form), (newform, oldForm) => {
  handleFormUpdates();

})

function handleFormUpdates() {
  bookingForm.fourthStep.push(form);
}
function isSelfPay() {
  return form.payment.toLowerCase() === 'self pay'
}


function updateCoverage(coverage: string) {
  form.payment = coverage;

}


const bookingPageData = inject('bookingPageData') as Ref<{
  insurances: Insurance[]
}>;
const bookingPagePending = inject('bookingPagePending');
const bookingPageError = inject('bookingPageError');

const insurances = computed(() => bookingPageData.value?.insurances as Insurance[]);
const insurancesTitles = computed(() => bookingPageData.value?.insurances.map((i) => i.title))


</script>

<style scoped lang="scss">
$gap: 1rem;

.g-2 {
  display: flex;
  flex-direction: column;
  gap: $gap;
}

.f-r {
  flex-direction: row;
}

.split {
  >* {
    width: 50%;
  }
}

.w-60 {
  width: 60vw;
}

.w-m-100 {
  @media screen and (max-width:600px) {
    width: 100%;
  }
}
</style>