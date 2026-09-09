<script setup lang="ts">
import BookingFormNew from '~/components/booking/BookingFormNew.vue';

import bookingSeo from "~/assets/seoMetaTags/booking";

const {
  contentMap: pageContentMap,
  isContentEditor: pageIsContentEditor,
  textStyles: pageTextStyles,
  pageMeta: pageMetaData,
} = await usePageContent("booking");
providePageContent("booking", pageContentMap, pageIsContentEditor, pageTextStyles, pageMetaData);

  useHead({
    script: [
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          url: "https://www.ptofthecity.com/booking",
          name: "Book an Appointment | PT of the City",
          description:
            "Schedule your physical therapy appointment with PT of the City. Choose your location and book an appointment online today.",
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.ptofthecity.com/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Booking",
                item: "https://www.ptofthecity.com/booking",
              },
            ],
          },
          mainEntity: {
            "@type": "MedicalOrganization",
            "@id": "https://www.ptofthecity.com/#organization",
            name: "PT of the City",
            url: "https://www.ptofthecity.com/",
            medicalSpecialty: "PhysicalTherapy",
            areaServed: [
              "Brooklyn, NY",
              "Manhattan, NY",
              "The Bronx, NY",
              "Queens, NY",
            ],
          },
          potentialAction: {
            "@type": "ScheduleAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: "https://www.ptofthecity.com/booking",
              actionPlatform: [
                "http://schema.org/DesktopWebPlatform",
                "http://schema.org/MobileWebPlatform",
              ],
            },
            name: "Book an Appointment",
            description:
              "Schedule your physical therapy session at any PT of the City clinic online.",
          },
        }),
      },
    ],
  });
  usePageSeo(bookingSeo, pageMetaData)
</script>

<template>
  <div class="booking">
  <BookingFormNew  />
  </div>
</template>

<style scoped lang="scss">
/* body is #eeeced site-wide - override just this page rather than touching
   the global default other pages rely on. */
.booking {
  @media screen and (min-width: 900px) {
  background-color: #ffffff;
    
  }
}
</style>

