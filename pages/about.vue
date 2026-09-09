<script setup lang="ts">
import Carousel from '~/sharedComponents/Carousel.vue';
import Services from '~/components/Home/Services/Services.vue';
import InfoSection from '~/components/WhoWeArePage/InfoSection.vue';
import type { Service, Staff, WhoWeAre } from '~/types/types';
import SingleStaffMember from '~/components/WhoWeArePage/SingleStaffMember.vue';
import aboutSeo from '~/assets/seoMetaTags/about';

usePageSeo(aboutSeo);

type AboutPage = {
    whoweare: WhoWeAre,
    services: Service[],
    staff: Staff[]
}

const { data, pending, error } = await useFetch<AboutPage>(`${useUrl()}/web/about`)

provide('homepageData', data);
provide('homepagePending', pending);
provide('homepageError', error);

const staff = computed(() => data.value?.staff || [])




</script>

<template>
    <div class="whoWeAre-container">
        <InfoSection />
        <div class="service">
            <h3 class="header-t">Our Services</h3>
            <Services NoTitle />
        </div>
        <Carousel NoIndicator class="carousel">
            <SingleStaffMember class="s-staff" v-for="member in staff" :staffMember="member" />
        </Carousel>
        <div class="btns-container">
            <NuxtLink active-class="navbar-link" class="btn btnfont" to="/booking">
                {{ $translate('book_now') }}
            </NuxtLink>
            <NuxtLink active-class="navbar-link" class="btn transparent btnfont" to="/">
                Back to Home Page
            </NuxtLink>
        </div>
    </div>
</template>

<style scoped lang="scss">
.whoWeAre-container {
    width: 100%;
    padding-top: 2vh;
    overflow: hidden;

    padding-top: calc($navbarHeight + 2vh);

    .header-t {
        margin-bottom: 1.25rem;
    }

    .service {
        >.header-t {
            @include padding(left);
        }

        margin-top: 3rem;
    }

    .carousel {
        margin-top: 3rem;
        height: 300px;
        width: 100%;

        @media screen and (max-width: 500px) {
            margin-left: $resMargin;
        }

        .s-staff {
            @include carouselItem2(7);

            @media screen and (max-width: 1024px) {
                @include carouselItem2(4);
            }

            @media screen and (max-width: 800px) {
                @include carouselItem2(3);
            }

            @media screen and (max-width: 500px) {
                @include carouselItem2(2.8);
            }
        }
    }

    .btns-container {
        @include pagePadding;
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1rem;
        margin-top: 3rem;

        @media screen and (max-width: 500px) {
            display: none;
        }
    }
}
</style>