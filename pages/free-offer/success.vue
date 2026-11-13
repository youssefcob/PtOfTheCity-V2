<script lang="ts" setup>
definePageMeta({ layout: false });

usePageSeo({
  title: "You're All Set | Free Offer | PT of the City",
  description:
    'Your free session has been booked successfully. A member of our team will contact you within 24 hours to confirm your appointment.',
  robots: 'noindex, nofollow',
});

const route = useRoute();

function queryValue(key: string) {
  const value = route.query[key];
  const raw = Array.isArray(value) ? value[0] : value;
  return typeof raw === 'string' ? raw.trim() : '';
}

const logoSrc = useImg(
  'https://res.cloudinary.com/dzilc11zf/image/upload/v1778861676/LogoPt_ildwod.webp',
  264,
);

const offer = computed(() => queryValue('offer') || 'Free Check-up Session');
const preferredDate = computed(() => queryValue('date') || '[Date will be confirmed]');
const location = computed(() => queryValue('location') || '[Your nearest PTOC location]');
</script>

<template>
  <div class="success-page">
    <div class="inner">
      <NuxtLink to="/" class="logo-pill" aria-label="PT of the City home">
        <img :src="logoSrc" alt="PT of the City Physical Therapy" class="logo" />
      </NuxtLink>

      <div class="card">
        <div class="icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="9.5" />
            <path d="M8 12.2 10.6 14.8 16.2 9.2" />
          </svg>
        </div>

        <h1 class="title">You're All Set!</h1>
        <p class="subtitle">Your free session has been booked successfully.</p>

        <div class="divider" aria-hidden="true"></div>

        <p class="details-heading">Booking Details</p>

        <ul class="details-list">
          <li>
            <span class="details-icon" aria-hidden="true">
              <svg viewBox="6 5 12 13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 8.66627V18M12 8.66627C11.7589 7.6725 11.3436 6.82319 10.8085 6.22856C10.2734 5.63394 9.64312 5.32188 9 5.33309C8.55797 5.33309 8.13405 5.50869 7.82149 5.82126C7.50893 6.13384 7.33333 6.55778 7.33333 6.99982C7.33333 7.44187 7.50893 7.86581 7.82149 8.17838C8.13405 8.49096 8.55797 8.66656 9 8.66656M12 8.66627C12.2411 7.6725 12.6564 6.82319 13.1915 6.22856C13.7266 5.63394 14.3569 5.32188 15 5.33309C15.442 5.33309 15.866 5.50869 16.1785 5.82126C16.4911 6.13384 16.6667 6.55778 16.6667 6.99982C16.6667 7.44187 16.4911 7.86581 16.1785 8.17838C15.866 8.49096 15.442 8.66656 15 8.66656M17.3333 11.333V16.6666C17.3333 17.0202 17.1929 17.3594 16.9428 17.6095C16.6928 17.8595 16.3536 18 16 18H8C7.64638 18 7.30724 17.8595 7.05719 17.6095C6.80714 17.3594 6.66667 17.0202 6.66667 16.6666V11.333M17.3333 11.333C17.7015 11.333 18 11.0346 18 10.6664V9.33296C18 8.96476 17.7015 8.66627 17.3333 8.66627H6.66667C6.29848 8.66627 6 8.96476 6 9.33296V10.6664C6 11.0346 6.29848 11.333 6.66667 11.333M17.3333 11.333H6.66667" />
              </svg>
            </span>
            <p>
              <span class="details-label">Selected Offer:</span>
              <span class="details-value accent">{{ offer }}</span>
            </p>
          </li>
          <li>
            <span class="details-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M8 3v4M16 3v4M3 10h18" />
              </svg>
            </span>
            <p>
              <span class="details-label">Preferred Date:</span>
              <span class="details-value">{{ preferredDate }}</span>
            </p>
          </li>
          <li>
            <span class="details-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11z" />
                <circle cx="12" cy="10" r="2.4" />
              </svg>
            </span>
            <p>
              <span class="details-label">Location:</span>
              <span class="details-value">{{ location }}</span>
            </p>
          </li>
        </ul>

        <div class="info-box">
          A member of our team will contact you within 24 hours to confirm your appointment details. No further action is required from you at this time.
        </div>

        <NuxtLink to="/" class="back-btn">Back to Homepage</NuxtLink>

        <p class="hipaa">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          HIPAA Compliant &amp; Secured. Your healthcare privacy is strictly protected under high industry standard protocols.
        </p>
      </div>

      <p class="footer-note">
        Questions? Call us at
        <a href="tel:+17186480888">(718) 648-0888</a>
        or email
        <a href="mailto:info@ptofthecity.com">info@ptofthecity.com</a>
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.success-page {
  min-height: 100vh;
  background-color: $surface-cream;
  padding: 4.8rem 2rem 5.6rem;

  @media screen and (max-width: 640px) {
    padding: 3.2rem 1.6rem 4rem;
  }
}

.inner {
  max-width: 56rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: $white;
  border-radius: 99.9rem;
  padding: 1.2rem 2.8rem;
  margin-bottom: 3.2rem;
}

.logo {
  display: block;
  height: 4rem;
  width: auto;

  @media screen and (max-width: 640px) {
    height: 3.4rem;
  }
}

.card {
  width: 100%;
  background-color: $white;
  border: 1px solid $border-gray;
  padding: 4rem 3.6rem 3.2rem;
  text-align: center;

  @media screen and (max-width: 640px) {
    padding: 3.2rem 2rem 2.4rem;
  }
}

.icon {
  width: 5.6rem;
  height: 5.6rem;
  margin: 0 auto 2rem;
  color: $primary-400;

  svg {
    width: 100%;
    height: 100%;
  }
}

.title {
  @include type-h3;
  margin: 0 0 0.8rem;
  color: $primary-600;
}

.subtitle {
  @include type-body;
  margin: 0;
  color: $primary-700;
}

.divider {
  height: 1px;
  background-color: $border-gray;
  margin: 2.8rem 0 2.4rem;
}

.details-heading {
  @include type-overline;
  margin: 0 0 1.6rem;
  color: $primary-700;
  opacity: 0.7;
  text-align: left;
}

.details-list {
  list-style: none;
  margin: 0 0 2.4rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  li {
    display: flex;
    align-items: flex-start;
    gap: 1.2rem;
    text-align: left;
  }

  p {
    @include type-caption;
    margin: 0;
    color: $primary-700;
  }
}

.details-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  margin-top: 0.2rem;
  color: $primary-400;

  svg {
    width: 1.8rem;
    height: 1.8rem;
  }
}

.details-label {
  font-weight: 600;
  color: $primary-600;
  margin-right: 0.4rem;
}

.details-value {
  font-weight: 500;

  &.accent {
    color: $primary-400;
    font-weight: 600;
  }
}

.info-box {
  @include type-caption;
  background-color: $surface-mint;
  padding: 1.6rem 1.8rem;
  margin-bottom: 2.4rem;
  color: $primary-700;
  text-align: left;
}

.back-btn {
  @include type-button;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1.6rem;
  color: $white;
  background-color: $primary-400;
  border-radius: 1.2rem;
  text-decoration: none;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: $primary-600;
  }
}

.hipaa {
  @include type-caption;
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  margin: 1.6rem 0 0;
  color: $primary-700;
  opacity: 0.7;
  text-align: left;

  svg {
    width: 1.4rem;
    height: 1.4rem;
    flex-shrink: 0;
    margin-top: 0.3rem;
  }
}

.footer-note {
  @include type-caption;
  margin: 2.8rem 0 0;
  color: $primary-700;
  text-align: center;

  a {
    color: $primary-600;
    font-weight: 600;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
