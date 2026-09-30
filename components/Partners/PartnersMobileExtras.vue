<script setup lang="ts">
import EditableText from '~/components/Admin/EditableText.vue';

// Sections that only exist in the mobile design.
const benefits = [
  { id: 'access', title: 'Expand Access to Care', body: 'Connect more people with timely, evidence-based physical therapy.' },
  { id: 'expertise', title: 'Shared Clinical Expertise', body: 'Collaborate with experienced clinicians and rehabilitation specialists.' },
  { id: 'community', title: 'Community-Focused Programs', body: 'Support initiatives that promote wellness, prevention, and recovery.' },
  { id: 'outcomes', title: 'Measurable Outcomes', body: 'Deliver better experiences and stronger long-term results for the people you serve.' },
];

const contacts = [
  { id: 'phone_1', icon: 'phone', value: '(212) 555-0100', href: 'tel:+12125550100' },
  { id: 'phone_2', icon: 'phone', value: '(718) 648-0888', href: 'tel:+17186480888' },
  { id: 'email', icon: 'mail', value: 'Referral@ptoc.com', href: 'mailto:Referral@ptoc.com' },
];

const ck = (s: string) => `partnerships.mobile.${s}`;
</script>

<template>
  <div class="mobile-extras">
    <section class="why">
      <div class="why-header">
        <EditableText tag="p" class="eyebrow" :content-key="ck('why.eyebrow')" default="Why Partner with PTOC" />
        <EditableText tag="h2" class="heading" :content-key="ck('why.heading')"
          default="Partnerships That Create Lasting Impact." />
        <EditableText tag="p" class="intro" :content-key="ck('why.intro')"
          default="We're proud to collaborate with healthcare systems, educational institutions, employers, and community organizations that share our commitment to healthier communities." />
      </div>
      <div class="benefits">
        <div v-for="benefit in benefits" :key="benefit.id" class="benefit">
          <EditableText tag="h3" class="benefit-title" :content-key="ck(`why.${benefit.id}.title`)" :default="benefit.title" />
          <EditableText tag="p" class="benefit-body" :content-key="ck(`why.${benefit.id}.body`)" :default="benefit.body" />
        </div>
      </div>
    </section>

    <section class="cta">
      <EditableText tag="h2" class="cta-heading" :content-key="ck('cta.heading')"
        default="Better Partnerships. Healthier Communities." />
      <EditableText tag="p" class="cta-body" :content-key="ck('cta.body')"
        default="The strongest partnerships are built on shared purpose. Let's work together to make quality rehabilitation more accessible across New York City." />
      <NuxtLink to="/contact#message" class="cta-btn">
        <EditableText tag="span" :content-key="ck('cta.button_label')" default="Let's Partner" />
      </NuxtLink>
    </section>

    <section class="contact">
      <EditableText tag="p" class="contact-eyebrow" :content-key="ck('contact.eyebrow')" default="Contact Information" />
      <ul class="contact-list">
        <li v-for="item in contacts" :key="item.id">
          <img :src="`/images/partners/${item.icon}.svg`" width="24" height="24" alt="" aria-hidden="true" />
          <a :href="item.href">
            <EditableText tag="span" :content-key="ck(`contact.${item.id}`)" :default="item.value" />
          </a>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped lang="scss">
.mobile-extras {
  display: none;

  @media screen and (max-width: 900px) {
    display: block;
  }

  :deep(span) {
    font: inherit;
    color: inherit;
  }
}

.why {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding: 4.8rem 1.6rem;
}

.why-header {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.eyebrow {
  font-family: $font-poppins;
  font-weight: 600;
  font-size: 16px;
  line-height: 18px;
  letter-spacing: 1.28px;
  text-transform: uppercase;
  color: $primary-400;
}

.heading {
  font-family: $font-switzer;
  font-weight: 600;
  font-size: 36px;
  line-height: 44px;
  letter-spacing: -0.18px;
  text-transform: uppercase;
  color: $primary-600;
}

.intro {
  font-family: $font-poppins;
  font-size: 16px;
  line-height: 26px;
  color: $primary-700;
  opacity: 0.8;
}

.benefits {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.benefit {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem 0.8rem 1.2rem 1.6rem;
  border-left: 4px solid $primary-400;
}

.benefit-title {
  font-family: $font-switzer;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: $primary-600;
}

.benefit-body {
  font-family: $font-poppins;
  font-size: 16px;
  line-height: 24px;
  color: $primary-700;
}

.cta {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2.4rem;
  background-color: $primary-600;
}

.cta-heading {
  font-family: $font-switzer;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #ffffff;
}

.cta-body {
  font-family: $font-poppins;
  font-size: 16px;
  line-height: 26px;
  color: #e2f1f3;
}

.cta-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5.6rem;
  padding: 1.6rem 3.2rem;
  border: 1px solid $primary-600;
  border-radius: 1.2rem;
  background-color: rgba(43, 192, 212, 0.2);
  @include type-button;
  color: #ffffff;
}

.contact {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 3.2rem 1.6rem;
  border: 1px solid rgba(3, 41, 46, 0.1);
  background-color: #ffffff;
}

.contact-eyebrow {
  @include type-overline;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 1.28px;
  color: $primary-400;
}

.contact-list {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  list-style: none;

  li {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    margin: 0;
  }

  img {
    flex-shrink: 0;
    width: 2.4rem;
    height: 2.4rem;
  }

  a {
    font-family: $font-poppins;
    font-size: 18px;
    line-height: 28px;
    color: $primary-700;
  }
}
</style>
