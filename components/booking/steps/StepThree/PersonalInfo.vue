<template>
  <div>
    <!-- <span class="form-label">
      Personal Info
    </span> -->
    <div class="wrapper">

      <div class="split split-mobile name">
        <InputField required class="field" placeHolder="First Name" id="firstName" @input="form.firstName = $event"
          lettersOnly />
        <InputField required class="field" placeHolder="Last Name" id="lastName" @input="form.lastName = $event"
          lettersOnly />
      </div>
      <div class="mobile">
        <RadioInputField class="mobile" style="width: 100%" color="white" title=""
          :options="['Male', 'Female', 'Other', 'Prefer not to say']" id="returning" :error="false"
          @change="form.gender = $event" />
      </div>
      <!-- <div class="ps">Your legal name as shown in the photo ID</div> -->
      <div class="split">
        <div class="field">
          <InputField placeHolder="Date of Birth" mask="##-##-####" id="dob" required @input="form.dob = $event" date
            minYear="-100" maxYear="+10" />
          <!-- <div class="ps">MM-DD-YYYY</div> -->
        </div>
        <div class="desktop">
          <DropDownInputField class="field" :list="['Male', 'Female', 'Other', 'Prefer not to say']" required
            id="gender" placeHolder="Gender" @input="form.gender = $event" />
        </div>

      </div>
      <div>
        <RadioInputField style="width: 100%" color="white" title="Returning Patient" :options="['Yes', 'No']"
          :checked="'No'" id="returning" :error="false"
          @change="$event == 'Yes' ? form.returning = true : form.returning = false" />
      </div>
      <!-- <div class="reverse"> -->
      <div class="field">
        <InputField placeHolder="Phone Number" mask="(###) ###-####" id="phone" required @input="form.phone = $event" />
      </div>
      <div class="field">
        <InputField placeHolder="Email" id="email" required @input="form.email = $event" />
      </div>
      <!-- </div> -->
    </div>

  </div>
</template>

<script lang="ts" setup>
import InputField from '~/sharedComponents/InputField.vue';
import bookingForm from '../../bookingForm';
import DropDownInputField from '~/sharedComponents/DropDownInputField.vue';
import RadioInputField from '~/sharedComponents/RadioInputField.vue';

const form = reactive({
  firstName: '',
  lastName: '',
  dob: '',
  gender: '',
  phone: '',
  email: '',
  returning: false,
})

watch((form),(newform,oldForm)=>{
  handleSecondStepFormUpdates()
})
const handleSecondStepFormUpdates = () => {
  bookingForm.thirdStep.push(form);
};
</script>

<style scoped lang="scss">
$gap: 1.5rem;

.wrapper {
  display: flex;
  flex-direction: column;
  gap: $gap;

  .split {
    display: flex;
    flex-direction: column;
    gap: $gap;
  }

  .split-mobile {
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: $gap;

    >* {
      width: 50%;
    }
  }

  @media screen and (min-width: 1100px) {
    width: 60vw;
    display: flex;
    flex-direction: column;
    gap: $gap;


    .split {
      display: flex;
      flex-direction: row;
      width: 100%;
      gap: $gap;

      >* {
        width: 50%;
      }
    }
  }
}
</style>