<template>
  <div class="container">
    <div class="back" @click="router.back()">
      <svg width="46" height="51" viewBox="0 0 46 51" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M26.8335 14.875L17.2502 25.5L26.8335 36.125" stroke="black" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round" />
      </svg>
      <p>Back to last view</p>
    </div>

    <div class="img-wrapper">
      <nuxt-img :src="data?.main_image" :alt="data?.main_image_alt"/>
    </div>
    <div class="tags-wrapper">
      <span v-for="tag in data?.tags" :key="tag.id" class="tag">
        #{{ tag.title }}
      </span>
    </div>
    <!-- <p class="title">{{ data?.title }}</p> -->

    <!-- Studio owns the article body; html_content is the fallback for
         articles that have no Studio doc published yet. -->
    <StudioContent v-if="doc" class="studio-article" :doc="doc" />
    <ClientOnly v-else>
      <div class="content" v-html="data?.html_content"></div>
    </ClientOnly>

    <div class="author-container">
      <div class="author-header">
        <div class="author-image">
          <NuxtImg :src="data?.staff.image" />
        </div>
        <NuxtLink :to="`/staff/${data?.staff.full_name}`">
        <h3 class="author-name">{{ data?.staff.title }} {{ data?.staff.first_name }} {{ data?.staff.last_name }}</h3>
        </NuxtLink>
      </div>
      <p class="author-desc">{{ data?.staff.brief }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { NuxtImg } from '#components';
import type { Blog } from '~/types/types';
import StudioContent from '~/components/shared/StudioContent.vue';

definePageMeta({
  middleware: ['slug-redirect']
})

const route = useRoute();
const blogName = decodeURIComponent(route.params.name as string).toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');

const { data, pending, error } = await useFetch<Blog>(`${useUrl()}/blogs/title/${blogName}`)

// The API answers an unknown slug with 200 and an empty object.
if (!data.value?.id) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found', fatal: true })
}
const router = useRouter()

const constructMetas = () => {
  let metas: Record<string, string> = {};
  try {
    const metasParsedArray = JSON.parse(data.value?.metas as string) || [];
    metasParsedArray.forEach((item: any) => {
      metas[item.key] = item.value;
    });
  } catch {
    // no usable metas on this row
  }

  return metas;
}

useSeoMeta(constructMetas());

// Applied after the row's own metas so Studio's head wins when a doc exists.
const { doc } = await useStudioDoc('articles', () => data.value?.cms_slug || blogName);



</script>

<style scoped lang="scss">
// the article container already clears the navbar
.studio-article {
  padding-top: 0;
}

.container {
  @include pagePadding();
  padding-top: calc($navbarHeight * 0.7) !important;
  min-height: 100vh;

  .back {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    // background-color: red;
    height:3rem;
    

    p {
      font-size: 2rem;
      transition: all 0.2s ease-in-out;
    }
    svg{
      transition: all 0.2s ease-in-out;
      path{
      transition: all 0.2s ease-in-out;

      }
    }
    &:hover {
      p {
        font-size: 2.5rem;
      }
      svg {
        width: calc(46px * 1.2);
        height: calc(51px * 1.2);
        path {
          stroke-width: 2.5;
        }
      }
    }
  }

  .img-wrapper {
    width: 100%;
    height: 30rem;
    overflow: hidden;
    display: flex;
    align-items: center;
    border-radius: $border-radius;

    >img {
      object-fit: cover;
      // height:100%;
      width: 100%;
    }

  }

  .tags-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 1rem 0;
  }

  .tag {
    // background: rgba(52, 152, 219, 0.1);
    color: $navy;
    padding: .5rem 1rem;
    border-radius: 20px;
    font-size: 1.2rem;
    font-weight: 400;
    text-transform: lowercase;
    border: 1px solid $cta;

    &:hover {
      background: rgba(52, 152, 219, 0.15);
    }
  }

  .title {
    font-weight: 500;
    @extend h1;
  }

  .content {
    margin: 2rem 0;

  }

  .author-container {
    .author-header {
      display: flex;
      align-items: center;
      gap: 1rem;

      .author-image {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100vh;
        overflow: hidden;
        height: 7rem;
        aspect-ratio: 1/1;

        img {
          height: 100%;
        }
      }

      .author-name {
        font-weight: 500;
        color: $navy;
      }
    }

    .author-desc {
      margin-top: 2rem;
      max-width: 70rem;
    }


  }
}
</style>