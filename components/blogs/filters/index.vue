<template>
  <div>
    <!-- {{tags}}
    {{ authors }} -->
    <div class="filters-container">
      <div class="filters-wrapper">
        <div class="input-fields-wrapper">
          <div class="search">
            <InputField place-holder="Search articles" @input="filters.s = $event; console.log($event)" :default="filters.s"/>
          </div>
          <div class="authors">
            <div class="desktop">
              <DropDownInputField place-holder="authors" :list="authors" @input="filters.author = $event; console.log($event)"
                :default="filters.author" />
            </div>
            <div class="mobile">
              <DropDownMobile place-holder="authors" :list="authors" @input="filters.author = $event"
                :default="filters.author" />
            </div>
          </div>
        </div>
        <p>filter by tags</p>

        <div class="tags">
          <div class="tag" v-for="tag in tags" :class="{ active: filters.tags.includes(tag) }" @click="toggleTag(tag)">
            <span>#{{ tag }}
              <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_4594_708)">
                  <path
                    d="M12.5 0.890625C5.81055 0.890625 0.390625 6.31055 0.390625 13C0.390625 19.6895 5.81055 25.1094 12.5 25.1094C19.1895 25.1094 24.6094 19.6895 24.6094 13C24.6094 6.31055 19.1895 0.890625 12.5 0.890625ZM18.4375 16.1787C18.667 16.4082 18.667 16.7793 18.4375 17.0088L16.5039 18.9375C16.2744 19.167 15.9033 19.167 15.6738 18.9375L12.5 15.7344L9.32129 18.9375C9.0918 19.167 8.7207 19.167 8.49121 18.9375L6.5625 17.0039C6.33301 16.7744 6.33301 16.4033 6.5625 16.1738L9.76562 13L6.5625 9.82129C6.33301 9.5918 6.33301 9.2207 6.5625 8.99121L8.49609 7.05762C8.72559 6.82812 9.09668 6.82812 9.32617 7.05762L12.5 10.2656L15.6787 7.0625C15.9082 6.83301 16.2793 6.83301 16.5088 7.0625L18.4424 8.99609C18.6719 9.22559 18.6719 9.59668 18.4424 9.82617L15.2344 13L18.4375 16.1787Z"
                    fill="#103535" />
                </g>
                <defs>
                  <clipPath id="clip0_4594_708">
                    <rect width="25" height="25" fill="white" transform="translate(0 0.5)" />
                  </clipPath>
                </defs>
              </svg>

            </span>
          </div>
        </div>
      </div>
      <div class="paginator">
        <blogs-filters-paginator :current_page="page" :last_page="last_page" />
      </div>
      <slot></slot>
      <div class="paginator page-end">
        <blogs-filters-paginator :current_page="page" :last_page="last_page" />
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import DropDownInputField from '~/sharedComponents/DropDownInputField.vue';
import DropDownMobile from '~/sharedComponents/DropDownMobile.vue';
import InputField from '~/sharedComponents/InputField.vue';
import type { BlogFilters } from '~/types/types';


const { data, pending, error } = await useFetch<BlogFilters>(`${useUrl()}/blogs/filters`)
const tags = computed(() => data.value?.tags.map(tag => tag.title) || [])
const authors = computed(() => data.value?.authors.map(author => `${author.title} ${author.first_name} ${author.last_name}`) || [])

const props = defineProps({
  page: {
    type: Number,
    default: 1
  },
  last_page: {
    type: Number,
    default: 2
  },
  tags: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  author: {
    type: String,
    default: ''
  },
  search: {
    type: String,
    default: ''
  }
})
const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

const filters: { tags: string[], s: string, author: string } = reactive({
  s: props.search,
  tags: props.tags,
  author: props.author,
})
const debouncedConstructQuery = debounce(() => {
  constructQuery();
}, 300);

const emit = defineEmits(['query'])

const constructQuery = () => {
  const params = new URLSearchParams();

  params.append('page', props.page.toString());

    params.append('search', filters.s);

    params.append('author', filters.author);

    params.append('tags', filters.tags.join(','));


  const queryString = params.toString();
  emit('query', queryString);

};

// Watch filters and call debounced function
watch(filters, (newFilters, oldFilters) => {
  debouncedConstructQuery();
}, { deep: true });


const toggleTag = (tag: string) => {
  const index = filters.tags.indexOf(tag);
  index > -1 ? filters.tags.splice(index, 1) : filters.tags.push(tag);
};
</script>

<style scoped lang="scss">
$gap: 1rem;

.filters-container {
  min-height: calc(100vh);
  display: flex;
  flex-direction: column;

  .page-end {
    margin-top: auto;
  }

}

.filters-wrapper {
  background-color: $lowOpacityGrey;
  padding: 3rem;
  padding-bottom: 1.5rem;
  border-radius: 18px;

  .input-fields-wrapper {
    display: flex;
    gap: $gap;
    width: 100%;

    >.search {
      width: 60%;
    }

    >.authors {
      width: 40%;
    }

    @media screen and (max-width:800px) {
      flex-direction: column;

      >.search,
      .authors {
        width: 100%;
      }
    }
  }

  p {
    margin-top: $gap;

  }

  .tags {
    margin-top: calc($gap * 0.7);
    display: flex;
    gap: $gap;
    flex-wrap: wrap;

    .tag {
      padding: 0.5rem 1rem;
      border-radius: 18px;
      border: 1px solid $blue;
      display: flex;
      align-items: center;
      text-align: center;
      cursor: pointer;
      user-select: none;

      span {
        display: flex;
        align-items: center;
        // justify-content: center;
        gap: 0.7rem;
        padding: 0;
        text-align: center;

        >svg {
          display: none
        }

      }

      &.active {
        background-color: $cta;
        border-color: $cta;

        >span>svg {
          display: inherit;
        }
      }
    }
  }
}

.paginator {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>