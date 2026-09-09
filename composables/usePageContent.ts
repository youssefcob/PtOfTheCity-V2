import type { PageContentMap, PageMeta, TextStyle } from '~/types/content';

export const PAGE_CONTENT_MAP_KEY = 'pageContentMap';
export const PAGE_CONTENT_PAGE_KEY = 'pageContentPage';
export const PAGE_CONTENT_IS_EDITOR_KEY = 'isContentEditor';
export const PAGE_CONTENT_TEXT_STYLES_KEY = 'pageContentTextStyles';
export const PAGE_CONTENT_META_KEY = 'pageContentMeta';

// Fetches the merged content/entity-overlay map for a page, plus all text
// styles and that page's SEO meta.
//
// Must be awaited by the caller (top-level await in a page's <script setup>,
// same as the existing useFetch(/web/home) call) - EditableText/EditableImage
// read the content map once, synchronously, at their own setup() (see their
// v-once usage) to avoid cursor-jump bugs while an admin is actively typing.
// If this fetch hasn't resolved by the time those children mount, they'd
// permanently fall back to their `default` prop instead of the real content.
//
// Deliberately does NOT call provide() itself: provide() after an await
// inside a plain composable function loses Vue's component-instance context
// (Vue's <script setup> compiler only auto-preserves it across awaits written
// directly in the SFC, not ones buried inside a helper's own internal await) -
// it fails with "provide() can only be used inside setup()" and silently does
// nothing. Call providePageContent() from the page itself, synchronously,
// right after awaiting this.
export const usePageContent = async (page: string) => {
  const { fetchBootstrap } = useContentApi();

  const { data, pending, error, refresh } = await useAsyncData(
    `page-bootstrap-${page}`,
    () => fetchBootstrap(page),
    {
      default: () => ({
        content: {} as PageContentMap,
        isContentEditor: false,
        textStyles: [] as TextStyle[],
        pageMeta: null as PageMeta | null,
      }),
    },
  );

  const contentMap = computed(() => data.value?.content ?? {});
  const isContentEditor = computed(() => data.value?.isContentEditor ?? false);
  const textStyles = computed(() => data.value?.textStyles ?? []);
  const pageMeta = computed(() => data.value?.pageMeta ?? null);

  return { contentMap, isContentEditor, textStyles, pageMeta, pending, error, refresh };
};

// Call synchronously from the page's own <script setup>, right after
// `await usePageContent(...)` resolves - see the note above for why.
export const providePageContent = (
  page: string,
  contentMap: Ref<PageContentMap>,
  isContentEditor: Ref<boolean>,
  textStyles: Ref<TextStyle[]>,
  pageMeta: Ref<PageMeta | null>,
) => {
  provide(PAGE_CONTENT_MAP_KEY, contentMap);
  provide(PAGE_CONTENT_PAGE_KEY, page);
  provide(PAGE_CONTENT_IS_EDITOR_KEY, isContentEditor);
  provide(PAGE_CONTENT_TEXT_STYLES_KEY, textStyles);
  provide(PAGE_CONTENT_META_KEY, pageMeta);
};

// Used by EditableText/EditableImage/PageMeta to read what providePageContent set up.
export const useInjectedPageContent = () => {
  const contentMap = inject<Ref<PageContentMap>>(PAGE_CONTENT_MAP_KEY, ref({}));
  const page = inject<string>(PAGE_CONTENT_PAGE_KEY, 'home');
  const isContentEditor = inject<Ref<boolean>>(PAGE_CONTENT_IS_EDITOR_KEY, ref(false));
  const textStyles = inject<Ref<TextStyle[]>>(PAGE_CONTENT_TEXT_STYLES_KEY, ref([]));
  const pageMeta = inject<Ref<PageMeta | null>>(PAGE_CONTENT_META_KEY, ref(null));

  return { contentMap, page, isContentEditor, textStyles, pageMeta };
};
