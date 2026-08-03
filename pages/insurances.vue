<template>
  
 <section class="insuranceSection" id="Insurance">
    <Insurances />
  </section>
  <section id="eligibility">
    <Eligibility />
  </section>
</template>

<script lang="ts" setup>
import Eligibility from '~/components/eligibility/Eligibility.vue';
import Insurances from '~/components/Home/Insurances/Insurances.vue';
import type { FAQs } from '~/sharedComponents/FAQs/FAQs';
import type { Blog, Campaign, Career, Content, HttpClinics, Insurance, Service, Staff, TrustedBy } from '~/types/types';

type HomeData = {
  clinics: HttpClinics[];
  services: Service[];
  campaigns: Campaign[];
  insurances: Insurance[];
  whoWeAre: Content;
  staff: Staff[];
  careers: Career[];
  trustedBy: TrustedBy[];
  FAQs: FAQs[];
  blogs: Blog[];
};

const { data, pending, error } = await useFetch<HomeData>(
  `${useUrl()}/web/home`,
);

provide("homepageData", data);
provide("homepagePending", pending);
provide("homepageError", error);

</script>

<style scoped lang="scss">
.insuranceSection,
#eligibility {
  @include pagePadding();
  padding-top: 5rem;

  @media screen and (max-width: 1100px) {
    padding-top: 3rem;
  }
}
</style>