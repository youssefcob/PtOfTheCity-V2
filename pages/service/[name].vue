<script setup lang="ts">
import SingleServiceSmall from '~/sharedComponents/SingleServiceSmall.vue';
import Carousel from '~/sharedComponents/Carousel.vue';
import ServiceClinics from '~/components/Service/ServiceClinics.vue';
import type { Service } from '~/types/types';
import { createSlug, createSlugWithSeparator } from '~/utils/stringUtils';

definePageMeta({
  middleware: ['slug-redirect']
})
// Get the route parameter
const route = useRoute();
const serviceName = decodeURIComponent(route.params.name as string);
console.log(serviceName);


  const serviceSeoSchema = await import(`~/assets/ServiceSeoSchema/${serviceName}.json`).catch(
    () => null,
  );
  
  

  const serviceSeoMetaTags = await import(`~/assets/seoMetaTags/service/${serviceName}.ts`)
    .then((module) => module.default)
    .catch(() => null);
  


const { data, pending, error } = await useFetch<Service[]>(`${useUrl()}/web/services`);
const service = computed(() => 
  data.value?.find((service: Service) => service.slug === serviceName) ||
  data.value?.find((service: Service) => service.title === serviceName)
)

const filteredServices = computed(() => 
  data.value?.filter((service: Service) => service.slug !== serviceName && service.title !== serviceName) || []
)
usePageSeo(
    serviceSeoMetaTags || {},
);
useHead({
  title: service.value ? `${service.value.title} - PT of the City` : 'Service Not Found',
  meta: [
    {
      name: 'description',
      content: service.value ? service.value.description.replace(/<[^>]*>/g, '').substring(0, 160) : 'Service not found'
    }
  ],
  script: [
   {
      type: "application/ld+json",
      innerHTML: JSON.stringify(serviceSeoSchema?.default || {name:"PT"}),
    } 
  ]
})
</script>

<template>
  <div class="container">
    <!-- Loading state -->
    <div v-if="pending" class="loading">
      <div class="loading-text">Loading service information...</div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="error">
      <div class="error-text">Failed to load service information</div>
      <div class="error-details">
        <p>Error: {{ error.message }}</p>
        <p>Searched for: {{ serviceName }}</p>
      </div>
      <NuxtLink to="/" class="btn">Go Home</NuxtLink>
    </div>

    <!-- Service not found -->
    <div v-else-if="!service" class="not-found">
      <h1>Service Not Found</h1>
      <p>The service "{{ serviceName }}" doesn't exist.</p>
      <p>Please check the URL or browse our <NuxtLink to="/#Services">services</NuxtLink>.</p>
      <NuxtLink to="/" class="btn">Go Home</NuxtLink>
    </div>

    <!-- Service details -->
    <div v-else class="service-container">
      <h1>{{ service.title }}</h1>

      <div class="info-image">
        <div class="info">
          <ClientOnly>
            <p class="text-s" v-html="service.description"></p>
          </ClientOnly>
          <ServiceClinics :clinics="service.clinics" :serviceName="service.title" />
        </div>

        <div class="image" :style="{ backgroundImage: `url(${useImg(service.path)})` }"></div>
      </div>

      <h1 class="responsive-header">{{ service.title }}</h1>
    </div>

    <NuxtLink to="/" class="btn transparent responsive main back">Back To Homepage</NuxtLink>
  </div>

  <!-- Other Services Carousel -->
  <div v-if="filteredServices && filteredServices.length > 0" class="other-services">
    <h1 class="carousel-header">Other Services</h1>
    <Carousel class="carousel">
      <div class="singleService" :to="`/service/${service.slug}`" v-for="service in filteredServices">

        <SingleServiceSmall :key="service.id" :service="service" />
      </div>
    </Carousel>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;

  @include pagePadding;
  padding-top: $navbarHeight !important;

  .back {
    @media screen and (min-width: 500px) {
      display: none;
    }

    display: block;
    width: 100%;
  }

  .responsive-header {
    color: $navy;
    display: none;
    margin-bottom: 3rem;
  }

  >.service-container {
    padding-top: 2vh;
    display: flex;
    flex-direction: column;
    gap: 4%;

    >h1 {
      margin-bottom: 3rem;
    }

    .info-image {
      display: flex;
      gap: 3rem;

      @media screen and (max-width: 800px) {
        flex-direction: column-reverse;


      }
    }

    @media screen and (max-width: 800px) {
      flex-direction: column-reverse;
      padding-top: calc(8vh + 3vh);

      h1 {
        display: none;
      }

      .responsive-header {
        display: block;
      }


    }



    .info {
      width: 70%;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;

      @media screen and (max-width: 800px) {
        width: 100%;
      }



      >h1 {
        color: black !important;
      }

      >p {
        @media screen and (max-width: 500px) {
          margin-top: 2rem;
          font-size: 16px;

        }
      }

      >.btn {
        align-self: flex-start;
        width: 30rem;
        // min-width:30rem;

        @media screen and (max-width: 500px) {
          width: 100%;
        }

      }
    }

    .image {
      width: 50%;
      height: clamp(300px, 40vw, 40rem);
      border-radius: 1.125rem;
      overflow: hidden;
      background-size: cover;
      background-position: center;

      @media screen and (max-width: 800px) {
        width: 100%;
        height: 300px;
      }


    }
  }
}

.loading,
.error,
.not-found {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  text-align: center;

  .loading-text,
  .error-text {
    font-size: 1.2rem;
    color: $navy;
    margin-bottom: 1rem;
  }
}

.error {
  .error-details {
    margin: 1rem 0;
    padding: 1rem;
    background: rgba(255, 0, 0, 0.1);
    border-radius: 0.5rem;

    p {
      margin: 0.5rem 0;
      font-size: 0.9rem;
      color: $navy;
    }
  }
}

.not-found {
  h1 {
    color: $navy;
    margin-bottom: 1rem;
  }

  p {
    color: $navy;
    margin-bottom: 1rem;

    a {
      color: $blue;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.other-services {
  .carousel-header {
    @include pagePadding;
    color: $navy;
    margin-top: 2rem;

    @media screen and (max-width: 500px) {
      margin-top: 10rem;
    }
  }

  .carousel {
    margin-top: 2rem;
    height: 300px;
    width: 100%;

    @media screen and (max-width: 500px) {
      margin-top: 5rem;
    }

    @media screen and (max-width: 500px) {
      @include pagePadding;
    }

    .singleService {
      display: flex;
      border-radius: 10px;
      overflow: hidden;
      @include carouselItem2(3);

      @media screen and (max-width: 1024px) {
        @include carouselItem2(3);
      }

      @media screen and (max-width: 800px) {
        @include carouselItem2(1);
      }

      @media screen and (max-width: 500px) {
        @include carouselItem2(1);
      }
    }
  }
}
</style>
