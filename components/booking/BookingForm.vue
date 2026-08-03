<script lang="ts" setup>
import type { Insurance, Service } from '~/types/types';
import MultiStepForm from './MultiStepForm.vue';
import Steps from './Steps.vue';
import ServicesAndClinics from './steps/StepOne/ServicesAndClinics.vue';
import DateAndTime from './steps/StepTwo/DateAndTime.vue';
import PersonalInfo from './steps/StepThree/PersonalInfo.vue';
import Coverage from './steps/StepFour/Coverage.vue';
import Summary from './steps/stepFive/Summary.vue';
import bookingForm from './bookingForm';
import Http from '~/mixins/Http';
import Loading from '~/sharedComponents/Loading.vue';
import moment from 'moment-timezone';
import SubmissionConfirmed from './steps/stepSix/SubmissionConfirmed.vue';
// const step = ref(1);
const toast = useToast();
const step = ref(1)
const transitionName = ref('slide-left')



function nextStep() {
  if (!bookingForm.step(step.value).isValid()) {
    toast.error({ message: 'Please Complete the form' })
    return;
  }
  if (step.value < 5) {
    transitionName.value = 'slide-left';
    step.value++;
  }
}
function prevStep() {

  if (step.value > 1) {
    transitionName.value = 'slide-right'
    step.value--
  }

}
const isLoading = ref<boolean>(false);

const submitForm = async () => {
  if (isLoading.value) return;
  const form = bookingForm.form
  let moddedForm = modifyForm(form);

  try {
    isLoading.value = true;
    // let response = await Http.post('reservation', moddedForm);

    const data = await $fetch(`${useUrl()}/reservation`, {
      method: 'POST',
      body: moddedForm
    })
    // console.log(data)
    toast.success({ title: 'Success!', message: 'Form Submitted Successfully, We will contact you' })

    isLoading.value = false;
    step.value++

  } catch (e: any) {
    console.error('Full error object:', e);
    console.error('Error data:', e.data);
    console.error('Error status:', e.status);
    console.error('Error message:', e.message);
    toast.error({ title: 'Error!', message: 'Something went wrong.' })
    isLoading.value = false;
  }

  // isLoading.value = false;
}
const convertTotimeStamp = (date: string, time: string) => {
  const [month, day, year] = date.split('-').map((e) => parseInt(e));

  // Parse AM/PM time
  const [timePart, period] = time.split(' ');
  const [hour, minute] = timePart.split(':').map((e) => parseInt(e));

  let hour24 = hour;
  if (period.toLowerCase() === 'am') {
    if (hour === 12) hour24 = 0; // 12:xx AM = 00:xx
  } else { // PM
    if (hour !== 12) hour24 = hour + 12; // 1:xx PM = 13:xx, but 12:xx PM stays 12:xx
  }

  const nyDate = moment.tz({ year, month, day, hour: hour24, minute }, 'America/New_York');
  return nyDate.valueOf();
}

const modifyForm = (form: any) => {
  let moddedform = {};

  let formPayment = () => {
    switch (form.payment) {
      case 'Insurance':
        return 'insurance';
      case 'Self Pay':
        return 'self_pay';
      case 'Workers Compensation':
        return 'workers_compensation';
      default:
        return 'self_pay';
    }
  }


  let date_in_unix = convertTotimeStamp(form.date, form.time);
  Object.assign(moddedform, {
    clinic_id: form.clinic_id,
    first_name: form.firstName,
    last_name: form.lastName,
    dob: form.dob,
    gender: form.gender,
    phone: form.phone.replace(/\D/g, ''),
    email: form.email,
    payment: formPayment(),
    service_id: form.service_id,
    date: date_in_unix,
    pain: form.pain,
    returning: form.returning
  });

  if (form.payment === 'Insurance') {
    Object.assign(moddedform, {
      insurance_company: form.insurance,
      member_id: form.memberId
    });
  }

  if (form.payment === 'Workers Compensation') {
    Object.assign(moddedform, {
      date_of_accident: form.date_of_accident,
      case_number: form.case_number,
      lawyer_name: form.lawyer_name,
      lawyer_phone_number: form.lawyer_phone_number,
    });
  }
  // console.log(moddedform);
  return moddedform;
}

type BookingData = {
  services: Service[],
  insurances: Insurance[]
}

const { data, pending, error } = await useFetch<BookingData>(`${useUrl()}/web/booking`);

provide('bookingPageData', data);
provide('bookingPagePending', pending);
provide('bookingPageError', error);

// function handleServicesAndClinics(scform: any) {
//   // console.log(scform);
// }

</script>
<template>
  <div class="booking-form">
    <!-- <span class="step-header desktop">Booking</span> -->
    <transition :name="transitionName" mode="out-in">

      <div :key="step" class="form-header-step">
        <span class="step-header" v-if="step === 1"> Booking</span>
        <span class="step-header" v-else-if="step === 2"> Pick date & time</span>
        <span class="step-header" v-else-if="step === 3">Personal Info</span>
        <span class="step-header" v-else-if="step === 4">Coverage</span>
        <span class="step-header" v-else-if="step === 5">Summary</span>


      </div>
    </transition>
    <br />
    <Steps v-if="step < 6" :steps="4" :currentStep="step" />
    <div class="form">
      <MultiStepForm :total-steps="6" @step-changed="step = $event" :transitionName="transitionName" :step="step">
        <template #step1>
          <ServicesAndClinics />
        </template>

        <template #step2>
          <DateAndTime />

        </template>

        <template #step3>
          <PersonalInfo />
        </template>

        <template #step4>
          <Coverage />
        </template>

        <template #step5>
          <Summary />

        </template>
        <template #step6>
          <SubmissionConfirmed />
        </template>
      </MultiStepForm>
    </div>
    <div class="form-nav">
      <button v-if="step < 5" class="btn cta" @click="nextStep">
        Continue
      </button>
      <button v-if="step == 5" :class="`btn cta ${isLoading && 'loading'}`" @click="submitForm">
        {{ isLoading ? 'Loading...' : 'Submit' }}
        <!-- <Loading /> -->
      </button>
      <!-- <template> -->
        <button v-if="step > 1 && step < 6" class="btn transparent" @click="prevStep">
          Back
        </button>
        <button class="btn placeholder" v-else>yo</button>

      <!-- </template> -->

      <!-- <NuxtLink v-if="step == 6" href="/" class="btn cta mobile">back to homepage</NuxtLink> -->

    </div>
    <p v-if="step < 6" class="note">Need help? Complete your booking by phone at <strong>(718) 648-0888.</strong></p>



  </div>
</template>



<style scoped lang="scss">
.booking-form {
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  // background-color: red;
  height: 100%;

  @media screen and (max-width:500px) {
    height: 100%;

  }
}

.form-nav {
  display: flex;
  gap: 1rem;

  button {
    padding: 1.7rem 4rem;

    &.transparent {
      color: white;
    }
  }

}

.note {
  font-size: 1.2rem;
  color: white;
  margin-top: 1rem;
}


.step-header {
  @extend h1;
  font-size: 4rem;
  color: white;
}

.form {
  display: flex;
  // flex: 1;
  // min-height: 60vh;
  // background-color: blue;

  @media screen and (max-width:500px) {
    // min-height: 50vh;

  }
}

@media screen and (min-width: 1100px) {
  .desktop {
    display: block;
  }


  .form-nav {
    .cta {
      padding: 1.7rem 9rem;
    }
  }
}

@media screen and (max-width: 1100px) {
  .desktop {
    display: none;
  }



  .form-nav {
    flex-direction: column;
    // align-items: center;
  }
}

.wrapper {
  // width:100px;
}

.btn.loading {
  opacity: 0.6;
  cursor: progress;
}

.btn.placeholder{
  opacity:0;
  user-select: none;
  cursor: default;
}
</style>