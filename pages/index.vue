<script lang="ts" setup>
import { defineAsyncComponent } from "vue";
import Hero from "~/components/Home/Hero/Hero.vue";
import PartnerBanner from "~/components/Home/PartnerBanner/PartnerBanner.vue";
import RecoveryTeam from "~/components/Home/RecoveryTeam/RecoveryTeam.vue";
import PtSquare from "~/components/Home/PtSquare/PtSquare.vue";
import Testimonials from "~/components/Home/Testimonials/Testimonials.vue";
import homePageSeo from "~/assets/seoMetaTags/home";
import type {
  Blog,
  Campaign,
  Career,
  Content,
  HttpClinics,
  Insurance,
  Service,
  Staff,
  TrustedBy,
} from "~/types/types";
import type { FAQs } from "~/sharedComponents/FAQs/FAQs";

const Clinics = defineAsyncComponent(() => import("~/components/Home/Clinics/Clinics.vue"));
const Services = defineAsyncComponent(() => import("~/components/Home/Services/Services.vue"));
const OurStaff = defineAsyncComponent(() => import("~/components/Home/OurStaff/OurStaff.vue"));

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

const {
  contentMap: pageContentMap,
  isContentEditor: pageIsContentEditor,
  textStyles: pageTextStyles,
  pageMeta: pageMetaData,
} = await usePageContent("home");
providePageContent("home", pageContentMap, pageIsContentEditor, pageTextStyles, pageMetaData);

// Preload the static hero image for LCP — browser fetches it before DOM is parsed
const heroImgWidth = (width: number) => useImg('careers', width);
useHead({
  link: [{
    rel: 'preload',
    as: 'image',
    href: heroImgWidth(900),
    imagesrcset: `${heroImgWidth(480)} 480w, ${heroImgWidth(900)} 900w, ${heroImgWidth(1280)} 1280w, ${heroImgWidth(1600)} 1600w`,
    imagesizes: '(max-width: 900px) 100vw, 55vw',
    fetchpriority: 'high'
  }]
});

useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "MedicalOrganization",
            "@id": "https://www.ptofthecity.com/#organization",
            name: "PT of the City",
            alternateName:
              "PT of the City – NYC's Top-Rated Physical Therapy Clinics",
            url: "https://www.ptofthecity.com/",
            logo: {
              "@type": "ImageObject",
              url: "https://www.ptofthecity.com/images/logo.png",
            },
            image: "https://www.ptofthecity.com/images/logo.png",
            description:
              "PT of the City is a leading provider of physical therapy services in New York City, operating 30+ clinic locations across Manhattan, Brooklyn, Queens, and the Bronx. We specialize in orthopedic rehabilitation, sports injury recovery, post-surgical therapy, neurological rehabilitation, pediatric therapy, pelvic floor therapy, and balance training.",
            telephone: "+1-718-648-0888",
            email: "info@ptofthecity.com",
            priceRange: "$$",
            medicalSpecialty: "PhysicalTherapy",
            address: {
              "@type": "PostalAddress",
              addressLocality: "New York",
              addressRegion: "NY",
              postalCode: "10001",
              addressCountry: "US",
            },
            areaServed: [
              {
                "@type": "AdministrativeArea",
                name: "Manhattan",
              },
              {
                "@type": "AdministrativeArea",
                name: "Brooklyn",
              },
              {
                "@type": "AdministrativeArea",
                name: "Queens",
              },
              {
                "@type": "AdministrativeArea",
                name: "The Bronx",
              },
            ],
            hasPart: [
              {
                "@type": "CollectionPage",
                "@id": "https://www.ptofthecity.com/clinics/Manhattan",
              },
              {
                "@type": "CollectionPage",
                "@id": "https://www.ptofthecity.com/clinics/Brooklyn",
              },
              {
                "@type": "CollectionPage",
                "@id": "https://www.ptofthecity.com/clinics/Queens",
              },
              {
                "@type": "CollectionPage",
                "@id": "https://www.ptofthecity.com/clinics/The%20Bronx",
              },
            ],
            sameAs: [
              "https://www.facebook.com/PTofTheCity",
              "https://www.instagram.com/pt_city/",
              "https://www.linkedin.com/company/pt-of-the-city/",
            ],
          },

          {
            "@type": "WebSite",
            "@id": "https://www.ptofthecity.com/#website",
            url: "https://www.ptofthecity.com/",
            name: "PT of the City",
            publisher: {
              "@id": "https://www.ptofthecity.com/#organization",
            },
            inLanguage: "en-US",
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate:
                  "https://www.ptofthecity.com/?s={search_term_string}",
              },
              "query-input": "required name=search_term_string",
            },
          },

          {
            "@type": "WebPage",
            "@id": "https://www.ptofthecity.com/#webpage",
            url: "https://www.ptofthecity.com/",
            name: "Physical Therapy Clinics in NYC | PT of the City",
            isPartOf: {
              "@id": "https://www.ptofthecity.com/#website",
            },
            about: {
              "@id": "https://www.ptofthecity.com/#organization",
            },
            description:
              "Find expert physical therapy services across NYC at PT of the City. With 30+ clinic locations in Manhattan, Brooklyn, Queens, and the Bronx, we help patients recover from injuries, surgeries, and chronic pain.",
          },
        ],
      }),
    },
  ],
});
usePageSeo(homePageSeo, pageMetaData)
</script>

<template>
  <section class="landing-page-container">
    <Hero />
  </section>
  <section class="partnerBannerSection">
    <PartnerBanner />
  </section>
  <section class="recoveryTeamSection">
    <RecoveryTeam />
  </section>
    <section class="servicesSection" id="Services">
    <Services />
  </section>
  <section class="clinicsSection" id="Clinics">
    <Clinics />
  </section>

  <section class="ptSquareSection">
    <PtSquare />
  </section>
  <section class="ourStaffSection" id="OurStaff">
    <OurStaff />
  </section>
  <!-- <section class="testimonialsSection">
    <Testimonials />
  </section> -->
</template>

<style scoped lang="scss">
// PTOC-2026 sections sit flush against each other; each manages its own
// internal padding rather than relying on a shared inter-section margin.
.landing-page-container {
  width: 100%;
  margin-bottom: 0;
}
</style>
