<template>
  <div class="container">
    <blogs-filters :page="currentPage" :last_page="lastPage" :tags="currentFilters.tags" :author="currentFilters.author"
      :search="currentFilters.search" @query="handleFiltersChanged($event)">
      <div v-if="pending">Loading...</div>
      <div v-else-if="error">Error: {{ error }}</div>
      <div v-else-if="blogs">
        <blogs-content :blogs="blogs"/>

      </div>
    </blogs-filters>
  </div>
</template>

<script lang="ts" setup>
import type { Blog, PaginatedResponse } from '~/types/types'
import blogsSeo from '~/assets/seoMetaTags/blogs';

usePageSeo(blogsSeo);

const route = useRoute()
const blogs:Ref<Blog[]> = ref([])
const pending = ref(false)
const error:Ref<any> = ref(null)
const lastPage = ref(1)

// Get current page from URL (default to 1)
const currentPage = computed(() => {
  const page = parseInt(route.query.page as string) || 1
  return page > 0 ? page : 1
})

// Get current filters from URL
const currentFilters = computed(() => ({
  search: (route.query.search as string) || '',
  author: (route.query.author as string) || '',
  tags: route.query.tags ? (route.query.tags as string).split(',') : []
}))

// Build query string from current URL parameters
const buildQueryFromUrl = () => {
  const params = new URLSearchParams()

  // Add page
  params.append('page', currentPage.value.toString())

  // Add filters if they exist
  if (currentFilters.value.search) {
    params.append('search', currentFilters.value.search)
  }
  if (currentFilters.value.author) {
    params.append('author', currentFilters.value.author)
  }
  if (currentFilters.value.tags.length > 0) {
    params.append('tags', currentFilters.value.tags.join(','))
  }

  return params.toString()
}

// interface BlogsApiResponse {
//   data: any[] // Replace 'any[]' with your actual blog type
//   meta: {
//     current_page: number
//     last_page: number
//     per_page: number
//     total: number
//     // Add other meta fields as needed
//   }
// }

// Function to fetch blogs with query
const fetchBlogs = async (query: string) => {
  try {
    pending.value = true
    error.value = null

    const response = await $fetch<PaginatedResponse<Blog>>(`${useUrl()}/blogs?${query}`)
    blogs.value = response.data

    lastPage.value=response.last_page;
  } catch (err) {
    error.value = err
  } finally {
    pending.value = false
  }
}

// Function called by blogs-filters component (for filter changes, not page changes)
const handleFiltersChanged = (query: string) => {
  // Parse the new query and update URL
  const params = new URLSearchParams(query)
  const newQuery = { ...route.query }

  // Update query parameters
  for (const [key, value] of params) {
    if (key !== 'page') { // Don't update page here, pagination handles it
      if (value) {
        newQuery[key] = value
      } else {
        delete newQuery[key]
      }
    }
  }

  // Reset to page 1 when filters change
  delete newQuery.page

  // Navigate to new URL
  navigateTo({ query: newQuery })
}

// Watch URL changes and fetch data accordingly
watch(() => route.query, () => {
  const query = buildQueryFromUrl()
  fetchBlogs(query)
}, { immediate: true, deep: true })

</script>


<style scoped lang="scss">
.container {
  @include pagePadding();
  padding-top: calc($navbarHeight * 0.7) !important;
  min-height: 100vh;
}
</style>