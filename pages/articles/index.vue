<script lang="ts" setup>
import type { Blog, BlogFilters, PaginatedResponse } from '~/types/types';
import type { ArticleFilterState } from '~/utils/articleUtils';
import blogsSeo from '~/assets/seoMetaTags/blogs';
import ArticlesHero from '~/components/Articles/ArticlesHero.vue';
import FeaturedArticle from '~/components/Articles/FeaturedArticle.vue';
import ArticleFilters from '~/components/Articles/ArticleFilters.vue';
import ArticleCard from '~/components/Articles/ArticleCard.vue';
import ArticlesPaginator from '~/components/Articles/ArticlesPaginator.vue';
import EditableText from '~/components/Admin/EditableText.vue';

const {
  contentMap: pageContentMap,
  isContentEditor: pageIsContentEditor,
  textStyles: pageTextStyles,
  pageMeta: pageMetaData,
} = await usePageContent('articles');
providePageContent('articles', pageContentMap, pageIsContentEditor, pageTextStyles, pageMetaData);

usePageSeo(blogsSeo, pageMetaData);

const route = useRoute();

// The URL is the source of truth for page + filters (?page=&search=&author=&tags=a,b).
const currentPage = computed(() => Math.max(1, parseInt(route.query.page as string) || 1));
const filters = computed<ArticleFilterState>(() => ({
  search: (route.query.search as string) || '',
  author: (route.query.author as string) || '',
  tags: route.query.tags ? (route.query.tags as string).split(',').filter(Boolean) : [],
}));
const hasFilters = computed(() =>
  Boolean(filters.value.search || filters.value.author || filters.value.tags.length));

const setFilters = (next: ArticleFilterState) => {
  const query: Record<string, string> = {};
  if (next.search) query.search = next.search;
  if (next.author) query.author = next.author;
  if (next.tags.length) query.tags = next.tags.join(',');
  // filter changes always go back to page 1
  navigateTo({ query });
};

const apiQuery = computed(() => {
  const q: Record<string, string> = { page: String(currentPage.value) };
  if (filters.value.search) q.search = filters.value.search;
  if (filters.value.author) q.author = filters.value.author;
  if (filters.value.tags.length) q.tags = filters.value.tags.join(',');
  return q;
});

const [{ data: blogsData, pending, error }, { data: filterOptions }] = await Promise.all([
  useFetch<PaginatedResponse<Blog>>(`${useUrl()}/blogs`, { query: apiQuery }),
  useFetch<BlogFilters>(`${useUrl()}/blogs/filters`),
]);

const blogs = computed(() => blogsData.value?.data ?? []);
const lastPage = computed(() => blogsData.value?.last_page ?? 1);

const authorOptions = computed(() =>
  (filterOptions.value?.authors ?? []).map((a) => [a.title, a.first_name, a.last_name].filter(Boolean).join(' ')));
const tagOptions = computed(() => (filterOptions.value?.tags ?? []).map((t) => t.title));

// The featured band only shows on the unfiltered first page: the highlighted
// article if there is one, otherwise the newest. It's pulled out of the grid.
const featured = computed<Blog | null>(() => {
  if (hasFilters.value || currentPage.value !== 1 || !blogs.value.length) return null;
  return blogs.value.find((b) => Number(b.is_highlighted) === 1) ?? blogs.value[0];
});
const gridBlogs = computed(() => blogs.value.filter((b) => b.id !== featured.value?.id));

// Scroll the list back into view when paging, so the reader isn't left at the footer.
// Waits for the new page to render, since leaving page 1 also removes the featured band.
const listTop = ref<HTMLElement | null>(null);
let scrollOnLoad = false;
watch(currentPage, () => (scrollOnLoad = true));
watch(blogsData, () => {
  if (!scrollOnLoad) return;
  scrollOnLoad = false;
  listTop.value?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}, { flush: 'post' });
</script>

<template>
  <div class="articles-page">
    <ArticlesHero />

    <FeaturedArticle v-if="featured" :blog="featured" />

    <section ref="listTop" class="library">
      <div class="library-head">
        <EditableText tag="p" class="kicker" content-key="articles.library.kicker" default="Articles" />
        <EditableText tag="h2" class="title" content-key="articles.library.title" default="Latest from our clinicians" />
      </div>

      <ArticleFilters :model-value="filters" :authors="authorOptions" :tags="tagOptions"
        @update:model-value="setFilters" />

      <p v-if="error" class="state">We couldn't load articles right now. Please try again in a moment.</p>
      <template v-else>
        <div v-if="gridBlogs.length" class="grid" :class="{ loading: pending }">
          <!-- The API pages in sixes; with one pulled into the featured band the
               first card spans two columns so the grid still fills its rows. -->
          <ArticleCard v-for="(blog, i) in gridBlogs" :key="blog.id" :blog="blog"
            :wide="Boolean(featured) && i === 0 && gridBlogs.length % 3 === 2" />
        </div>
        <p v-else-if="pending" class="state">Loading articles…</p>
        <div v-else-if="!featured" class="state empty">
          <p>No articles match those filters.</p>
          <button v-if="hasFilters" type="button" class="reset"
            @click="setFilters({ search: '', author: '', tags: [] })">
            Clear filters
          </button>
        </div>

        <ArticlesPaginator :current-page="currentPage" :last-page="lastPage" />
      </template>
    </section>
  </div>
</template>

<style scoped lang="scss">
.articles-page {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.library {
  @include pagePadding();
  padding-top: 7.2rem;
  padding-bottom: 12rem;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  scroll-margin-top: $navbarHeight;

  @media screen and (max-width: 900px) {
    padding-top: 5rem;
    padding-bottom: 8rem;
    gap: 3.2rem;
  }
}

.library-head {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  .kicker.kicker {
    @include type-overline;
    color: $primary-700;
    margin: 0;
  }

  .title.title {
    @include type-h2;
    text-transform: uppercase;
    color: $primary-600;
    margin: 0;
  }
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 2rem;
  transition: opacity 0.2s ease;

  &.loading {
    opacity: 0.5;
  }

  @media screen and (max-width: 1000px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: minmax(0, 1fr);
  }
}

.state,
.state p {
  @include type-large;
  color: $primary-700;
  margin: 0;
}

.empty {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.6rem;
  padding: 4rem 0;
}

.reset {
  height: 5.6rem;
  padding: 0 3.2rem;
  border: none;
  border-radius: 12px;
  background: $primary-400;
  color: $white;
  @include type-button;
  cursor: pointer;
}
</style>
