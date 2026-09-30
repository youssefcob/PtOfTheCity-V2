<template>
  <div class="contact-page">
    <ContactHero />
    <ContactFormSection />
    <ContactChannels />
    <ContactBoroughs />
    <ContactExpect />
    <ContactCommunityStrip />
    <ContactClosing />
    <FaqSection page-key="contact" title-default="FAQs" subtitle-default="Our team will contact you within 30 minutes"
      :faqs="data?.FAQs || []" />
  </div>
</template>

<script setup lang="ts">
import ContactHero from '~/components/Contact/ContactHero.vue';
import ContactFormSection from '~/components/Contact/ContactFormSection.vue';
import ContactChannels from '~/components/Contact/ContactChannels.vue';
import ContactBoroughs from '~/components/Contact/ContactBoroughs.vue';
import ContactExpect from '~/components/Contact/ContactExpect.vue';
import ContactCommunityStrip from '~/components/Contact/ContactCommunityStrip.vue';
import ContactClosing from '~/components/Contact/ContactClosing.vue';
import FaqSection from '~/components/shared/FaqSection.vue';
import contactSeo from '~/assets/seoMetaTags/contact';
import type { FAQs } from '~/sharedComponents/FAQs/FAQs';

const { data } = await useFetch<{ FAQs: FAQs[] }>(`${useUrl()}/web/home`);

const {
  contentMap: pageContentMap,
  isContentEditor: pageIsContentEditor,
  textStyles: pageTextStyles,
  pageMeta: pageMetaData,
} = await usePageContent('contact');
providePageContent('contact', pageContentMap, pageIsContentEditor, pageTextStyles, pageMetaData);

usePageSeo(contactSeo, pageMetaData);
</script>

<style scoped lang="scss">
.contact-page {
  width: 100%;
  overflow: hidden;

  // the site-wide pagePadding drops to 1rem on small screens; the mobile
  // design uses 2rem gutters (the photo strip and closing band set their own)
  @media screen and (max-width: 900px) {
    background-color: $surface-cream;

    > :not(.strip):not(.closing) {
      padding-left: 2rem;
      padding-right: 2rem;
    }
  }
}

// The contact page's mobile FAQ is a plain list (no cards) with a chevron.
// Scoped to this page: other pages share FaqSection with their own designs.
@media screen and (max-width: 900px) {
  .contact-page {
    :deep(.faq-section) {
      gap: 3.2rem;
      padding-top: 6.4rem;
      padding-bottom: 8rem;
    }

    :deep(.faq-header) {
      gap: 0.8rem;

      .subtitle {
        font-size: 18px;
        line-height: 30px;
        opacity: 0.6;
      }
    }

    :deep(.faq-list) {
      gap: 0;
    }

    :deep(.faq-item) {
      border: 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.13);
      border-radius: 0;
      background-color: transparent;

      &.open .icon {
        transform: rotate(180deg);
      }
    }

    :deep(.faq-question) {
      padding: 1.6rem 0;
      font-size: 18px;
      line-height: 30px;

      .icon {
        width: 1.8rem;
        height: 1.8rem;
        border: 0;
        border-radius: 0;
        background: url('/images/contact/m-faq-chevron.svg') no-repeat center / 1.8rem;

        svg {
          display: none;
        }
      }
    }

    :deep(.faq-answer) {
      padding: 0 0 1.6rem;
    }
  }
}
</style>
