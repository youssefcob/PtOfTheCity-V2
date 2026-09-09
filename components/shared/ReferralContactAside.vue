<script setup lang="ts">
import EditableText from '~/components/Admin/EditableText.vue';
import EditableImage from '~/components/Admin/EditableImage.vue';

const props = defineProps<{
  pageKey: string;
}>();

const asideImg = (width: number) => useImg('careers', width);
</script>

<template>
  <div class="contact-aside">
    <div class="aside-photo">
      <EditableImage :content-key="`${pageKey}.form.aside_image`" :default-src="asideImg(600)" loading="lazy"
        default-alt="A PT of the City physical therapist caring for a patient" />
    </div>

    <div class="contact-info">
      <EditableText tag="p" class="eyebrow" :content-key="`${pageKey}.form.contact_eyebrow`"
        default="Contact Information" />
      <EditableText tag="p" class="heading" :content-key="`${pageKey}.form.contact_heading`" default="Talk To Our Team" />

      <div class="contact-rows">
        <a class="contact-row" href="tel:+17186480888">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path
              d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12.7 19.79 19.79 0 0 1 1.63 4.1 2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.1 6.1l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17.92z" />
          </svg>
          <span>(718) 648-0888</span>
        </a>
        <a class="contact-row" href="fax:+17186480889">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="6 9 6 2 18 2 18 9" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect x="6" y="14" width="12" height="8" />
          </svg>
          <span>(718) 648-0889 (fax)</span>
        </a>
        <a class="contact-row" href="mailto:referrals@ptofthecity.com">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          <span>referrals@ptofthecity.com</span>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.contact-aside {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
}

.aside-photo {
  width: 100%;
  border-radius: 1rem;
  overflow: hidden;
  aspect-ratio: 1 / 1;

  :deep(.cms-editable-image),
  :deep(img) {
    width: 100%;
    height: 100%;
  }

  :deep(img) {
    object-fit: cover;
  }
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .eyebrow {
    @include type-body;
    color: $primary-700;
    margin: 0;
  }

  .heading {
    @include type-large;
    color: $primary-600;
    text-transform: uppercase;
    margin: 0;
  }
}

.contact-rows {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: $primary-700;
  text-decoration: none;
  @include type-body;

  svg {
    flex-shrink: 0;
    color: $primary-400;
  }

  &:hover {
    color: $primary-400;
  }
}
</style>
