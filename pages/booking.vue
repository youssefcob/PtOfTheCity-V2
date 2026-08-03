<script setup lang="ts">
import BookingFormNew from '~/components/booking/BookingFormNew.vue';

import bookingSeo from "~/assets/seoMetaTags/booking";


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
  usePageSeo(bookingSeo)
</script>

<template>
  <BookingFormNew  />
</template>