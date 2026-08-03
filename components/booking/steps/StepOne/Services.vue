<template>
  <div class="services-wrapper">
    <span class="form-label">
      Service
    </span>
    <!-- {{ services }} -->
    <div class="mobile">
      <div class="carousel-container">
        <Carousel ref="carousel" NoIndicator NoButtons>
          <div class="service" v-for="service in services" :key="service.id" @click="pickService(service)" :class="{
            active: service.title === currentService?.title
          }">
            <NuxtImg :src="service.path" class="service-image" />
            <h3>{{ service.title }}</h3>
          </div>

        </Carousel>
      </div>
    </div>

    <div class="desktop">
      <DropDownInputField :list="servicesTitles" placeHolder="N/A" NoLabel @input="pickService(fromTitle($event))"
        :default="currentService?.title" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Carousel from '~/sharedComponents/Carousel.vue';
import DropDownInputField from '~/sharedComponents/DropDownInputField.vue';
import type { Service } from '~/types/types';
import bookingForm from '../../bookingForm';

const route = useRoute();
const serviceName = route.query.service as string;

onMounted(()=>{
  if(serviceName){
    pickService(fromTitle(serviceName) )
  } else {
    pickService(fromTitle('Initial Check-up'))
  }
})

const bookingPageData = inject('bookingPageData') as Ref<{
  services: Service[]
}>;
const bookingPagePending = inject('bookingPagePending');
const bookingPageError = inject('bookingPageError');

const currentService = ref<Service | null>(bookingForm.firstStep.content.selectedService);

const services = computed(() => {
  const allServices = bookingPageData.value?.services as Service[] || [];
  return allServices.sort((a, b) => {
    if (a.title?.toLowerCase() === 'initial check-up') return -1;
    if (b.title?.toLowerCase() === 'initial check-up') return 1;
    return 0;
  });
});
const servicesTitles = computed(() => bookingPageData.value?.services.map((s) => s.title))
const emit = defineEmits(['serviceSelected']);

function pickService(service: Service | undefined) {
  if (!service) return
  currentService.value = service;
  emit('serviceSelected', service);
}
const carousel = ref(null)
function fromTitle(service: string) {
  return services.value.find((s) => s.title === service);
}




</script>

<style scoped lang="scss">
.service {
  display: flex;
  flex-direction: column;


  .service-image {
    // width: 15rem;
    height: 20vh;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 2rem;
    @media screen and (max-width:500px) {
      height:15vh;
    }

  }

  h3 {
    font-size: 1.7rem;
    font-weight: 600;
    color: white;
    text-align: center;
  }

  &.active {
    h3 {
      color: $cta
    }

    .service-image {
      border: 0.2rem solid $cta;
    }
  }
}

.carousel-container{
  width:calc(100vw - 3rem)
}
</style>