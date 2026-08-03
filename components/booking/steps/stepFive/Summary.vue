<template>
  <div class="info-wrapper">
    <div class="line">
      <div class="info">
        <span class="b">Location:</span>
        <span class="u"> {{ bookingForm.firstStep.content.selectedClinic?.street_address }}</span>
      </div>
    </div>


    <div class="line">
      <div class="info">
        <span class="b">Service:</span>
        <span> {{ bookingForm.firstStep.content.selectedService?.title }}</span>
      </div>
    </div>

    <div v-for="(chunk, index) in formChunks" :key="index" class="line">
      <div v-for="item in chunk" :key="item.key" class="info">
        <span class="b">{{ formatLabel(item.key) }}:</span>
        <span>{{ formatValue(item.key, item.value) }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import bookingForm from '../../bookingForm';

const form = bookingForm.form;

const skipKeys = ['service_id', 'clinic_id', 'returning', 'payment'];

const formEntries = computed(() => {
  return Object.entries(form)
    .filter(([key, value]) => !skipKeys.includes(key) && value !== null && value !== undefined && value !== '')
    .map(([key, value]) => ({ key, value }));
});

const formChunks = computed(() => {
  const chunks = [];
  for (let i = 0; i < formEntries.value.length; i += 2) {
    chunks.push(formEntries.value.slice(i, i + 2));
  }
  return chunks;
});

function formatLabel(key: string) {
  return key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
}

function formatValue(key: string, value: any) {
  if (key === 'date') {
    if (!value) return value;
    
    // Parse the date (assuming MM/DD/YYYY format)
    const [month, day, year] = value.split('-').map(Number);
    
    // Create date object and increment month
   
    
    return `${month + 1}/${day}/${year}`;
  }
  return value;
}
</script>

<style scoped lang="scss">
.info-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  // @media screen and (max-width < 600) {
  //   flex-direction: row;
  // }

  * {
    color: white;
  }

  .line {
    display: flex;
    gap: 6rem;

    @media screen and (max-width: 600px) {
      flex-direction: column;
      gap: 1rem;
    }

    // background-color: red;
  }



  span {
    display: inline-block;
    font-weight: 500;

    &.b {
      font-weight: 700;
      margin-right: 5px;
    }

    &.u {
      text-decoration: underline;
    }
  }
}
</style>