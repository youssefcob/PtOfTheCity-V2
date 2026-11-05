<script setup lang="ts">
import type { FAQs } from '~/sharedComponents/FAQs/FAQs';
import faqsSeo from '~/assets/seoMetaTags/faqs';
import EditableText from '~/components/Admin/EditableText.vue';
import FaqGroup from '~/components/Faqs/FaqGroup.vue';
import ContactUsPage from '~/components/ContactUsSection/ContactUsPage.vue';

const {
  contentMap: pageContentMap,
  isContentEditor: pageIsContentEditor,
  textStyles: pageTextStyles,
  pageMeta: pageMetaData,
} = await usePageContent('faqs');
providePageContent('faqs', pageContentMap, pageIsContentEditor, pageTextStyles, pageMetaData);

usePageSeo(faqsSeo, pageMetaData);

// { "General": [...], "Billing & Payment": [...] } - one accordion group per key.
const { data } = await useFetch<Record<string, FAQs[]>>(`${useUrl()}/web/faqs`);

const groups = computed(() =>
  Object.entries(data.value ?? {})
    .filter(([, list]) => Array.isArray(list) && list.length)
    .map(([title, faqs]) => ({ title, id: createSlug(title), faqs })),
);

// Highlight the category whose section is currently under the top of the viewport.
const activeId = ref('');
watchEffect(() => {
  if (!activeId.value && groups.value.length) activeId.value = groups.value[0].id;
});

onMounted(() => {
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(
    (entries) => {
      const hit = entries.find((e) => e.isIntersecting);
      if (hit) activeId.value = hit.target.id;
    },
    { rootMargin: '-25% 0px -65% 0px' },
  );
  groups.value.forEach((g) => {
    const el = document.getElementById(g.id);
    if (el) observer.observe(el);
  });
  onBeforeUnmount(() => observer.disconnect());
});
</script>

<template>
  <div class="faqs-page">
    <section class="hero">
      <EditableText tag="p" class="kicker" content-key="faqs.hero.kicker" default="Help Center" />
      <EditableText tag="h1" class="title" content-key="faqs.hero.title" default="Frequently Asked Questions" />
      <EditableText tag="p" class="lede" content-key="faqs.hero.body"
        default="Answers about your first visit, physical therapy, insurance and billing. Can't find what you need? Our team is happy to help." />
    </section>

    <section v-if="groups.length" class="content">
      <aside class="categories">
        <nav aria-label="FAQ categories">
          <a v-for="g in groups" :key="g.id" :href="`#${g.id}`" class="category" :class="{ active: g.id === activeId }"
            @click="activeId = g.id">
            <span class="category-name">{{ g.title }}</span>
            <span class="category-count">{{ g.faqs.length }}</span>
          </a>
        </nav>
      </aside>

      <div class="groups">
        <FaqGroup v-for="g in groups" :key="g.id" :id="g.id" :title="g.title" :faqs="g.faqs" />
      </div>
    </section>

    <!-- Still the legacy contact form: the Figma contact-page (417:508) hasn't been built yet. -->
    <ContactUsPage class="contact" header="Still have a question?" />
  </div>
</template>

<style scoped lang="scss">
.faqs-page {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.hero {
  @include pagePadding();
  padding-top: calc(#{$navbarHeight} + 5.8rem);
  padding-bottom: 6rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  max-width: 100%;

  @media screen and (max-width: 900px) {
    padding-top: calc(#{$navbarHeight} + 3rem);
    padding-bottom: 4rem;
  }

  > * {
    max-width: 78rem;
  }

  .kicker.kicker {
    @include type-overline;
    color: $primary-700;
    margin: 0;
  }

  .title.title {
    @include type-h1;
    text-transform: uppercase;
    color: $primary-600;
    margin: 0;
  }

  .lede.lede {
    @include type-large;
    color: $primary-700;
    margin: 0;
  }
}

.content {
  @include pagePadding();
  padding-top: 6rem;
  padding-bottom: 8rem;
  display: flex;
  align-items: flex-start;
  gap: 6rem;
  background: $surface-cream;

  @media screen and (max-width: 900px) {
    flex-direction: column;
    gap: 3.2rem;
    padding-top: 3.2rem;
    padding-bottom: 5rem;
  }
}

.categories {
  position: sticky;
  top: calc(#{$navbarHeight} + 2rem);
  width: 28rem;
  flex-shrink: 0;

  nav {
    display: flex;
    flex-direction: column;
  }

  @media screen and (max-width: 900px) {
    position: static;
    width: 100%;

    nav {
      flex-direction: row;
      flex-wrap: wrap;
      gap: 0.8rem;
    }
  }
}

.category {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;
  padding: 1.6rem 0;
  border-bottom: 1px solid rgba(3, 41, 46, 0.12);
  color: $primary-700;
  transition: color 0.15s ease, border-color 0.15s ease;

  &:hover {
    color: $primary-400;
  }

  &.active {
    border-bottom-color: $primary-400;
    color: $primary-600;

    .category-name {
      font-weight: 600;
    }
  }

  @media screen and (max-width: 900px) {
    padding: 0.6rem 1.6rem;
    border: 1px solid rgba(3, 41, 46, 0.2);
    border-radius: 20rem;
    background: $white;

    &.active {
      background: $primary-400;
      border-color: $primary-400;
      color: $white;
    }

    .category-count {
      display: none;
    }
  }
}

.category-name,
.category-count {
  @include type-body;
  color: inherit;
}

.category-count {
  @include type-caption;
  opacity: 0.7;
}

.groups {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6rem;
}

.contact {
  margin-top: 8rem;
  margin-bottom: 4rem;
}
</style>
