<script lang="ts" setup>
import StaffMember from '~/components/Home/OurStaff/StaffMember.vue';
import Carousel from '~/sharedComponents/Carousel.vue';
import type { Staff } from '~/types/types';
definePageMeta({
  middleware: ['slug-redirect']
})
const route = useRoute();
const staffName = decodeURIComponent(route.params.name as string).toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');

const { data, pending, error } = await useFetch<Staff[]>(`${useUrl()}/web/staff`);
console.log(data.value);

const staffMember = computed(() => {
  return data.value?.find((s) => s.slug === staffName) || {} as Staff;
});

const filteredStaff = computed(() => {
  return data.value?.filter((s) => s.slug !== staffName) || [] as Staff[];
});


const formatText = (text: string | undefined): string => {
  if (!text) return '';
  return text.replace(/\n/g, '<br>');
}


</script>

<template>
  <div class="container">
    <div class="staff-container">
      <h1 class="responsive-header">{{ staffMember?.title }} {{ staffMember?.first_name }} {{
        staffMember?.last_name }}</h1>

      <div class="image" :style="{ backgroundImage: `url(${staffMember?.image})` }"></div>
      <!-- <div class="image"></div> -->

      <div class="info">
        <h1>{{ staffMember?.title }} {{ staffMember?.first_name }} {{ staffMember?.last_name }}</h1>
        <ClientOnly>
          <p class="text-s" v-html="formatText(staffMember?.bio)"></p>
        </ClientOnly>
      </div>
      <NuxtLink :to="`/blogs?author=${staffMember.full_name.replaceAll(' ', '+')}`" class="btn main">Articles</NuxtLink>


    </div>
    <NuxtLink to="/booking" class="btn transparent responsive main back">Back To Homepage</NuxtLink>
  </div>
  <h1 class="carousel-header">Our Staff</h1>
  <Carousel class="carousel">
    <StaffMember :staffMember="staff" class="s-staff" v-for="staff in filteredStaff" :key="staff.id" />
  </Carousel>
</template>

<style scoped lang="scss">
.container {
  .back {
    @media screen and (min-width: 500px) {
      display: none;
    }

    display:block;
    width:100%;
    margin-top: 2rem;
  }

  width: 100%;
  // background-color: blueviolet;
  @include pagePadding;

  .responsive-header {
    color: $navy;
    display: none;
    margin-bottom: 3rem;
  }

  >.staff-container {
    padding-top: calc(8vh + 7.5vh);


    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 4rem;

    @media screen and (max-width: 800px) {
      display: flex;
      flex-direction: column;
      padding-top: calc(8vh + 3vh);

      h1 {
        display: none;
      }

      .responsive-header {
        display: block;
      }


    }



    .info {
      // width: 100%;
      // padding:1.7rem 0;

      @media screen and (max-width: 800px) {
        width: 100%;
      }

      display:flex;
      flex-direction: column;
      gap:1.25rem;

      >h1 {
        color: $navy
      }

      >p {
        @media screen and (max-width: 500px) {
          margin-top: 2rem;
          font-size: 16px;

        }
      }

      >.btn {
        align-self: flex-start;
        width: 30%;

        @media screen and (max-width: 500px) {
          width: 100%;
        }

      }
    }

    >.image {
      width: 100%;
      height: 50vh;

      @media screen and (max-width: 800px) {
        width: 100%;
        height: 300px;
      }

      border-radius: 1.125rem;
      overflow: hidden;
      background-size: cover;
      background-position: center;
    }
  }

}

.carousel-wrapper {
  height: fit-content;
}

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

  @media screen and (max-width: 500px) {
    margin-top: 5rem;

  }

  height:300px;
  width:100%;

  @media screen and (max-width: 500px) {
    @include pagePadding;
  }

  .s-staff {
    display: block;
    @include carouselItem2(5);

    @media screen and (max-width: 1024px) {
      @include carouselItem2(4);

    }

    @media screen and (max-width: 800px) {
      @include carouselItem2(3);

    }

    @media screen and (max-width: 500px) {
      @include carouselItem2(1);

    }

  }
}
</style>
