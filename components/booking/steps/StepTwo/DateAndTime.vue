<template>
  <div>
    <!-- <span class="form-label">
      Pick a date & time
    </span> -->
    <div class="wrapper">
      <div class="calender">
        <Calender @input="updateDate($event)" @hours="updateHours($event)" :schedule="schedule" />

      </div>
      <div class="desktop">
        <DropDownInputField ref="hoursComp" @input="updateTime($event)" id="time"
          :list="bookingForm.secondStep.content.Availablehours" placeHolder="When" />
      </div>
      <div class="mobile">
        <div>

          <DropDownMobile :list="bookingForm.secondStep.content.Availablehours"
            :disabled="!bookingForm.secondStep.content.Availablehours.length" disabledText="Please Pick a date first"
            class="time-picker" @input="updateTime($event)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Calender from '~/sharedComponents/Calender.vue';
import bookingForm from '../../bookingForm';
import DropDownInputField from '~/sharedComponents/DropDownInputField.vue';
import DropDownMobile from '~/sharedComponents/DropDownMobile.vue';


const schedule = computed(() => {
  return bookingForm.firstStep.content.selectedClinic?.schedule;
});


const form = reactive({
  date: bookingForm.secondStep.content.form.date,
  time: bookingForm.secondStep.content.form.time,
})


function to12Hour(time24: string) {
  const [hours, minutes] = time24.split(':').map(Number);

  if (hours === 0) {
    return `12:${minutes.toString().padStart(2, '0')} AM`;
  } else if (hours === 12) {
    return `12:${minutes.toString().padStart(2, '0')} PM`;
  } else if (hours < 12) {
    return `${hours}:${minutes.toString().padStart(2, '0')} AM`;
  } else {
    return `${hours - 12}:${minutes.toString().padStart(2, '0')} PM`;
  }
}
const updateHours = (date: { start: string, end: string }) => {
  // hoursComp.value?.clear();
  const getHours = (time: string) => {
    const [hours, minutes, seconds] = time.split(':');
    return parseInt(hours);
  }
  let hours = [];
  const startHour = getHours(date.start);
  const endHour = getHours(date.end);

  for (let i = startHour; i < endHour; i++) {
    hours.push(to12Hour(`${i}:00`))
    if (i < endHour - 1) {
      hours.push(to12Hour(`${i}:30`));
    }
  }
  bookingForm.secondStep.setAvailableHours(hours);

  handleSecondStepFormUpdates();

}

const updateDate = (date: { day: number, month: number, year: number }) => {
  
  if ((!date.month && date.month != 0) || !date.day || !date.year) {
    form.date = null;

  } else {
    form.date = `${date.month}-${date.day}-${date.year}`;
  }
  handleSecondStepFormUpdates();

}
const updateTime = (time: string) => {
  form.time = time;
  handleSecondStepFormUpdates();

}
const handleSecondStepFormUpdates = () => {
  bookingForm.secondStep.push({ date: form.date, time: form.time });
};
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  gap: 1rem;

  @media screen and (max-width: 1100px) {
    width: 100%;
    max-width: 30rem;
    flex-direction: column;
  }

  @media screen and (max-width: 600px) {
    max-width: 100%;

  }


}

.calender {
  width: 30rem;

  @media screen and (max-width: 600px) {
    width: 100%;
  }

}
</style>