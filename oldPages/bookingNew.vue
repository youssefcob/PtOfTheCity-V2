<template>
  <div class="background">
    <img src="https://res.cloudinary.com/dzilc11zf/image/upload/v1755025289/booking_f9l8hn.webp"
      alt="Booking Background" class="background-image" />

  </div>
  <div class="form-container">
    <booking-form />
  </div>
</template>

<script lang="ts" setup>

useHead({
  link: [
    {
      rel: 'canonical',
      href: 'https://www.ptofthecity.com/booking'
    }
  ]
})

useHead({
  script:[
    {
      type: 'application/ld+json',
      innerHTML:JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "url": "https://www.ptofthecity.com/booking",
  "name": "Book an Appointment | PT of the City",
  "description": "Schedule your physical therapy appointment with PT of the City. Choose your location and book an appointment online today.",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.ptofthecity.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Booking",
        "item": "https://www.ptofthecity.com/booking"
      }
    ]
  },
  "mainEntity": {
    "@type": "MedicalOrganization",
    "@id": "https://www.ptofthecity.com/#organization",
    "name": "PT of the City",
    "url": "https://www.ptofthecity.com/",
    "medicalSpecialty": "PhysicalTherapy",
    "areaServed": [
      "Brooklyn, NY",
      "Manhattan, NY",
      "The Bronx, NY",
      "Queens, NY"
    ]
  },
  "potentialAction": {
    "@type": "ScheduleAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.ptofthecity.com/booking",
      "actionPlatform": [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform"
      ]
    },
    "name": "Book an Appointment",
    "description": "Schedule your physical therapy session at any PT of the City clinic online."
  }
})
    }
  ]
})

</script>

<style scoped lang="scss">
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  z-index: -1;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(270deg, rgba(44, 50, 51, 0.00) 0%, rgba(44, 50, 51, .9) 83.17%);

    @media screen and (max-width: 600px) {
      background: linear-gradient(270deg, rgba(44, 50, 51, 0.00) 0%, rgba(44, 50, 51, 0.9) 70%);

    }
  }

  >img {
    position: absolute;
    top: -10px;
    left: -10px;
    width: calc(100% + 20px);
    height: calc(100% + 20px);
    object-fit: cover;
    filter: blur(10px);
  }
}

.form-container {
  padding-left: 15rem;
  padding-bottom:5rem;
  padding-top: calc($navbarHeight + 2rem);
  height: 100vh;
  z-index: 2;
    // background-color: green;

  @media screen and (max-width: 1100px) {

    padding: 2rem;
    padding-top: calc($navbarHeight + 2rem);


  }

  // background-color: red;
}

@media screen and (max-height: 360px) {
  .form-container,.background {
    height:120vh;
  }
}
</style>