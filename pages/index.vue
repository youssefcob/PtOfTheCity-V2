<script lang="ts" setup>
import { defineAsyncComponent } from "vue";
import Hero from "~/components/Home/Hero/Hero.vue";
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

const Conditions = defineAsyncComponent(() => import("~/components/Home/Conditions/Conditions.vue"));
const Clinics = defineAsyncComponent(() => import("~/components/Home/Clinics/Clinics.vue"));
const Services = defineAsyncComponent(() => import("~/components/Home/Services/Services.vue"));
const WhoWeArePage = defineAsyncComponent(() => import("~/components/Home/WhoWeAre/WhoWeArePage.vue"));
const Insurances = defineAsyncComponent(() => import("~/components/Home/Insurances/Insurances.vue"));
const OurStaff = defineAsyncComponent(() => import("~/components/Home/OurStaff/OurStaff.vue"));
const FAQsSection = defineAsyncComponent(() => import("~/components/FAQs/FAQs.vue"));
const ContactUsPage = defineAsyncComponent(() => import("~/components/ContactUsSection/ContactUsPage.vue"));
const Careers = defineAsyncComponent(() => import("~/components/CareersSection/Careers.vue"));
const Blogs = defineAsyncComponent(() => import("~/components/blogs/blogs.vue"));
const Eligibility = defineAsyncComponent(() => import("~/components/eligibility/Eligibility.vue"));

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

// Preload first hero image for LCP — browser fetches it before DOM is parsed
const firstHeroPath = data.value?.campaigns?.[0]?.images?.[0]?.path;
if (firstHeroPath) {
  const cw = (width: number) => useImg(firstHeroPath, width);
  useHead({
    link: [{
      rel: 'preload',
      as: 'image',
      href: cw(800),
      imagesrcset: `${cw(480)} 480w, ${cw(800)} 800w, ${cw(1280)} 1280w, ${cw(1920)} 1920w`,
      imagesizes: '100vw',
      fetchpriority: 'high'
    }]
  });
}

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
usePageSeo(homePageSeo)
</script>

<template>
  <section class="landing-page-container">
    <Hero />
  </section>
   <section class="whoWeAreSection" id="WhoWeAre">
    <WhoWeArePage />
  </section>
   <section class="servicesSection" id="Services">
    <Services />
  </section>
    <section class="conditionsSection" id="conditions">
    <Conditions />
  </section>
    <section class="insuranceSection" id="Insurance">
    <Insurances />
  </section>
  <section id="eligibility">
    <Eligibility />
  </section>

      <section class="clinicsSection" id="Clinics">
    <Clinics />
  </section>
  <!-- <section class="quiz">
    <home-quiz />
  </section>  -->
  <section class="ourStaffSection" id="OurStaff">
    <OurStaff />
  </section>

  <section class="careersSection" id="Careers">
    <Careers />
  </section>

  <section class="trustedBySection" id="TrustedBy">
    <TrustedBy />
  </section>

  <section
    class="FAQsSection"
    id="FAQs"
    aria-label="Learn more about frequently asked questions"
    title="Frequently Asked Questions"
  >
    <FAQsSection />
  </section>

  <section class="ContactUsSection" id="ContactUs">
    <ContactUsPage />
  </section>
    <section class="conditionsSection" id="blogs">
    <Blogs />
  </section>

</template>

<style scoped lang="scss">
section {
  margin: 12.5rem 0;

  &:first-child {
    margin: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }

  &.TrustedBySection {
    margin: 0 0 !important;
  }

  &.conditionsSection {
    margin: $firstSectionGap 0;
  }

  // @include sectionMargin;
}

.landing-page-container {
  width: 100%;
  // height: 100vh;
  margin-bottom: 0;
}

.insuranceSection {
  width: 100%;
  // min-height:160vh;
}

.ourStaffSection {
  width: 100%;
  margin-top: 12.5rem;
}

.clinicsSection {
  margin-top: 7.5rem;
  // @media screen and (max-width: 500px){
  //     margin-top:10vh;

  // }
}

.FAQsSection {
  // margin-top: 12.5rem;
  height: fit-content;
}

.ContactUsSection {
  margin-top: 12.5rem;
}
</style>
