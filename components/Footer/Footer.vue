<script setup lang="ts">
import EditableText from '~/components/Admin/EditableText.vue';
import EditableImage from '~/components/Admin/EditableImage.vue';

const toast = useToast();
const logoUrl = useImg('https://res.cloudinary.com/dzilc11zf/image/upload/v1778861676/LogoPt_ildwod.webp', 264);

const serviceLinks = [
  { label: 'Sports Rehabilitation', to: '/service/sports-rehabilitation' },
  { label: 'Orthopedic', to: '/service/orthopedic-rehabilitation' },
  { label: 'Pelvic Floor Therapy', to: '/service/pelvic-floor-rehabilitation' },
  { label: 'Pediatric', to: '/service/pediatric-rehabilitation' },
  { label: 'Vestibular Therapy', to: '/service/vestibular-rehabilitation' },
  { label: 'Hand Therapy', to: '/service/hand-therapy' },
];

// "Partnerships" and "Contact Us" below point at pages that don't exist yet -
// they're separate frames in the PTOC-2026 Figma file, queued to be built
// next. Linked now at their expected slugs so this footer doesn't need
// editing again once those pages land.
const patientLinks = [
  { label: 'New Patients Guide', to: '/new-patients-guide' },
  { label: 'Existing Patients', to: '/existing-patients-guide' },
  { label: 'Insurance & Eligibility', to: '/insurances' },
  { label: 'Patient Referrals', to: '/patients-referral' },
  { label: 'Book Appointment', to: '/booking' },
];

const companyLinks = [
  { label: 'About Us', to: '/about' },
  { label: 'Careers', to: '/careers' },
  { label: 'Partnerships', to: '/partnerships' },
  { label: 'Contact Us', to: '/contact' },
  { label: 'Referring Physicians', to: '/physicians-referral' },
];

// The Figma "Knowledge Hub" page (and its "Back & Spine" article, recovery
// tips, and guides content) isn't built yet either - routed to the existing
// blog for now since that's the closest live equivalent.
const resourceLinks = [
  { label: 'Knowledge Hub', to: '/blogs' },
  { label: 'Back & Spine', to: '/blogs' },
  { label: 'Recovery Tips', to: '/blogs' },
  { label: 'Free Guides', to: '/blogs' },
];

// Stable content key derived from the link's own destination rather than its
// position in the array - so reordering/adding links later doesn't silently
// reassign which saved edit belongs to which link.
const linkKey = (group: string, to: string) => `global.footer.${group}.${to.replace(/^\//, '').replace(/\//g, '-')}`;

const email = ref('');
const submitting = ref(false);

async function subscribe() {
  if (!email.value || submitting.value) return;
  submitting.value = true;
  try {
    await $fetch(`${useUrl()}/web/newsletter`, { method: 'POST', body: { email: email.value } });
    toast.success({ title: 'Subscribed!', message: "You're on the list for recovery tips and updates." });
    email.value = '';
  } catch (e) {
    toast.error({ title: 'Something went wrong', message: 'Please try again in a moment.' });
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <footer class="site-footer">
    <div class="top-row">
      <div class="brand-info">
        <EditableImage class="logo" content-key="global.footer.logo" :default-src="logoUrl"
          default-alt="PT of the City" :width="132" :height="64" default-object-fit="contain" />
        <EditableText tag="p" class="brand-copy" content-key="global.footer.brand_copy"
          default="Move Better. Live Fully. Clinical excellence and physical therapy solutions across New York City." />
      </div>

      <div class="newsletter">
        <EditableText tag="p" class="newsletter-label" content-key="global.footer.newsletter_label"
          default="Get Recovery Tips & Updates" />
        <EditableText tag="p" class="newsletter-copy" content-key="global.footer.newsletter_copy"
          default="Sign up for our newsletter to receive expert advice on injury prevention, mobility routines, and health guides directly from our clinicians." />
        <form class="newsletter-form" @submit.prevent="subscribe">
          <input
            v-model="email"
            type="email"
            required
            placeholder="Enter your email address"
            aria-label="Email address"
          />
          <button type="submit" :disabled="submitting" aria-label="Subscribe to newsletter">
            <img src="/images/footer/icon-arrow-submit.svg" alt="" aria-hidden="true" />
          </button>
        </form>
      </div>
    </div>

    <div class="divider" role="presentation"></div>

    <div class="links-grid">
      <div class="links-col">
        <EditableText tag="p" class="links-heading" content-key="global.footer.heading.services" default="Services" />
        <div class="links-list">
          <NuxtLink v-for="link in serviceLinks" :key="link.label" :to="link.to" >
            <EditableText tag="span" :content-key="linkKey('services', link.to)" class="links-item" :default="link.label" />
          </NuxtLink>
        </div>
      </div>
      <div class="links-col">
        <EditableText tag="p" class="links-heading" content-key="global.footer.heading.patients" default="Patients" />
        <div class="links-list">
          <NuxtLink v-for="link in patientLinks" :key="link.label" :to="link.to" >
            <EditableText tag="span" :content-key="linkKey('patients', link.to)" class="links-item" :default="link.label" />
          </NuxtLink>
        </div>
      </div>
      <div class="links-col">
        <EditableText tag="p" class="links-heading" content-key="global.footer.heading.company" default="Company" />
        <div class="links-list">
          <NuxtLink v-for="link in companyLinks" :key="link.label" :to="link.to" >
            <EditableText tag="span" :content-key="linkKey('company', link.to)" class="links-item" default="link.label" />
          </NuxtLink>
        </div>
      </div>
      <div class="links-col">
        <EditableText tag="p" class="links-heading" content-key="global.footer.heading.resources" default="Resources" />
        <div class="links-list">
          <NuxtLink v-for="link in resourceLinks" :key="link.label" :to="link.to" >
            <EditableText tag="span" :content-key="linkKey('resources', link.to)" class="links-item" :default="link.label" />
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="divider" role="presentation"></div>

    <div class="bottom-bar">
      <div class="legal-links">
        <NuxtLink to="/privacy-policy">
          <EditableText tag="span" content-key="global.footer.legal.privacy_policy" class="links-item" default="Privacy Policy" />
        </NuxtLink>
        <NuxtLink to="/terms-of-service">
          <EditableText tag="span" content-key="global.footer.legal.terms_of_service" class="links-item" default="Terms of Service" />
        </NuxtLink>
        <NuxtLink to="/accessibility">
          <EditableText tag="span" content-key="global.footer.legal.accessibility" class="links-item" default="Accessibility" />
        </NuxtLink>
        <!-- not in the Figma legal row, but it's the site's only link to this
             federally-required disclosure page - dropping it would orphan it -->
        <NuxtLink to="/no-surprises-act-disclosure">
          <EditableText tag="span" content-key="global.footer.legal.no_surprises_act" class="links-item" default="No Surprises Act Disclosure" />
        </NuxtLink>
      </div>
      <EditableText tag="p" class="copyright" content-key="global.footer.copyright"
        default="© 2026 PT of the City. All rights reserved." />
    </div>
  </footer>
</template>

<style scoped lang="scss">
// Figma binds every footer text layer (desktop AND mobile frames alike) to the
// fixed Type/Desktop/* styles rather than the fluid Type/Mobile->Desktop scale
// the rest of the site uses - so this block hardcodes those values instead of
// pulling in the shared type-overline/type-caption/type-body mixins, which
// would incorrectly shrink/reweight this text below the 800px breakpoint.
.site-footer {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  width: 100%;
  padding: 5rem 7.5rem 3rem;
  background-color: $primary-700;

  @media screen and (max-width: 900px) {
    gap: 2.5rem;
    padding: 3.5rem 1.5rem 2.5rem;
  }
}

.divider {
  height: 1px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.15);
}

.top-row {
  display: flex;
  justify-content: space-between;
  gap: 3rem;

  @media screen and (max-width: 900px) {
    flex-direction: column;
    gap: 2.5rem;
  }
}

.brand-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 25rem;
  max-width: 100%;

  @media screen and (max-width: 900px) {
    width: 100%;
    padding-bottom: 2.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  }
}

.logo {
  width: 8.25rem;
  height: auto;

  :deep(img) {
    width: 100%;
    height: auto;
  }
}

.brand-copy {
  font-family: $font-poppins;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.005em;
  color: $surface-cream;
  opacity: 0.8;
}

.newsletter {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 26.25rem;
  max-width: 100%;
}

.newsletter-label {
  font-family: $font-poppins;
  font-weight: 500;
  font-size: 16px;
  line-height: 18px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #ffffff;
}

.newsletter-copy {
  font-family: $font-poppins;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.005em;
  color: #9ca3af;
}

.newsletter-form {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #ffffff;

  input {
    flex: 1;
    min-width: 0;
    border: none;
    background: transparent;
    font-family: $font-poppins;
    font-weight: 400;
    font-size: 18px;
    line-height: 30px;
    color: #ffffff;

    &::placeholder {
      color: #9ca3af;
    }

    &:focus {
      outline: none;
    }
  }

  button {
    flex-shrink: 0;
    display: flex;
    background: transparent;
    cursor: pointer;

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    img {
      width: 28px;
      height: 28px;
    }
  }
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 13.75rem));
  justify-content: space-between;
  column-gap: 1rem;
  row-gap: 2rem;

  @media screen and (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.links-col {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  @media screen and (max-width: 900px) {
    gap: 1rem;
  }
}

.links-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media screen and (max-width: 900px) {
    gap: 0.625rem;
  }
}

.links-heading {
  font-family: $font-poppins;
  font-weight: 500;
  font-size: 16px;
  line-height: 18px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #ffffff;
}

.links-item {
  display: block;
  font-family: $font-poppins;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.005em;
  color: $surface-cream;
  opacity: 0.8;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 1;
  }
}

.bottom-bar {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  @media screen and (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.legal-links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.5rem;

  @media screen and (max-width: 900px) {
    gap: 1rem;
  }

  a {
    font-family: $font-poppins;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: 0.005em;
    color: #9ca3af;
    white-space: nowrap;

    &:hover {
      color: #ffffff;
    }
  }
}

.copyright {
  font-family: $font-poppins;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.005em;
  color: #9ca3af;
  white-space: nowrap;
}
</style>
