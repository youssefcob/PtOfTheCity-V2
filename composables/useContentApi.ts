import type {
  EditableTag,
  ImageUploadResponse,
  LinkTarget,
  PageBootstrapResponse,
  PageMeta,
  PageMetaCustomTag,
  PageMetaIndexRow,
  RedirectInput,
  RedirectRule,
  SitemapEntry,
  SitemapEntryInput,
  TextStyle,
} from '~/types/content';
import type { Partner } from '~/types/types';

export interface SaveTextOptions {
  textStyleId?: number | null;
  tag?: EditableTag | null;
  href?: string | null;
  target?: LinkTarget | null;
}

export interface SaveImageOptions {
  alt?: string;
  objectFit?: string;
  objectPosition?: string;
}

export interface TextStylePayload {
  name: string;
  font_family: string;
  mobile_font_family: string | null;
  font_weight: number;
  mobile_font_weight: number | null;
  italic: boolean;
  mobile_italic: boolean | null;
  underline: boolean;
  mobile_underline: boolean | null;
  color: string | null;
  mobile_color: string | null;
  min_font_size: number;
  mobile_min_font_size: number | null;
  max_font_size: number;
  mobile_max_font_size: number | null;
  font_size_vw: number;
  mobile_font_size_vw: number | null;
  line_height: number | null;
  mobile_line_height: number | null;
}

// Talks to the CMS content endpoints directly (not useApi/useAuth, which are
// wired to the patient auth system) — reads/writes use the admin token when
// present via useAdminAuth. page-bootstrap is public and works without one.
export const useContentApi = () => {
  const { getToken } = useAdminAuth();

  const authHeaders = (): Record<string, string> => {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const call = (path: string, options: Record<string, any> = {}) => {
    return $fetch(path, {
      baseURL: useUrl() as string,
      headers: { Accept: 'application/json', ...authHeaders(), ...(options.headers || {}) },
      ...options,
    });
  };

  const fetchBootstrap = (page: string) => {
    return call('/page-bootstrap', { query: { page } }) as Promise<PageBootstrapResponse>;
  };

  const saveText = (key: string, page: string, value: string, options: SaveTextOptions = {}) => {
    return call('/page-content', {
      method: 'POST',
      body: {
        key,
        page,
        value,
        ...(options.textStyleId !== undefined ? { text_style_id: options.textStyleId } : {}),
        ...(options.tag !== undefined ? { tag: options.tag } : {}),
        ...(options.href !== undefined ? { href: options.href } : {}),
        ...(options.target !== undefined ? { target: options.target } : {}),
      },
    });
  };

  const saveImage = (key: string, page: string, file: File | null, options: SaveImageOptions = {}) => {
    const formData = new FormData();
    formData.append('key', key);
    formData.append('page', page);
    if (file) formData.append('file', file);
    if (options.alt) formData.append('alt', options.alt);
    if (options.objectFit) formData.append('object_fit', options.objectFit);
    if (options.objectPosition) formData.append('object_position', options.objectPosition);

    return call('/page-content/image', { method: 'POST', body: formData }) as Promise<ImageUploadResponse>;
  };

  const createTextStyle = (payload: TextStylePayload) => {
    return call('/text-styles', { method: 'POST', body: payload }) as Promise<TextStyle>;
  };

  const updateTextStyle = (id: number, payload: TextStylePayload) => {
    return call(`/text-styles/${id}`, { method: 'PUT', body: payload }) as Promise<TextStyle>;
  };

  const deleteTextStyle = (id: number) => {
    return call(`/text-styles/${id}`, { method: 'DELETE' });
  };

  // Meta for a single URL path ("/about", "/clinic/brooklyn-heights"), or
  // null when that URL has no custom meta. Public.
  const fetchPageMeta = (page: string) => {
    return call('/page-meta', { query: { page } }) as Promise<PageMeta | null>;
  };

  // Every page key with custom meta, for the /admin/meta-tags index. Editors only.
  const fetchPageMetaIndex = () => {
    return call('/page-meta/index') as Promise<PageMetaIndexRow[]>;
  };

  const savePageMeta = (page: string, fields: { title?: string; description?: string; canonical?: string }) => {
    return call('/page-meta', { method: 'POST', body: { page, ...fields } }) as Promise<PageMeta>;
  };

  const savePageMetaOgImage = (page: string, file: File) => {
    const formData = new FormData();
    formData.append('page', page);
    formData.append('file', file);
    return call('/page-meta/og-image', { method: 'POST', body: formData }) as Promise<ImageUploadResponse>;
  };

  const saveCustomTag = (page: string, attribute: 'name' | 'property', metaKey: string, content: string) => {
    return call('/page-meta/custom-tags', {
      method: 'POST',
      body: { page, attribute, meta_key: metaKey, content },
    }) as Promise<PageMetaCustomTag>;
  };

  const updateCustomTag = (id: number, attribute: 'name' | 'property', metaKey: string, content: string) => {
    return call(`/page-meta/custom-tags/${id}`, {
      method: 'PUT',
      body: { attribute, meta_key: metaKey, content },
    }) as Promise<PageMetaCustomTag>;
  };

  const deleteCustomTag = (id: number) => {
    return call(`/page-meta/custom-tags/${id}`, { method: 'DELETE' });
  };

  // --- redirects (/admin/redirects) ---
  const listRedirects = () => call('/admin/redirects') as Promise<RedirectRule[]>;

  const createRedirect = (body: RedirectInput) =>
    call('/admin/redirects', { method: 'POST', body }) as Promise<RedirectRule>;

  const updateRedirect = (id: number, body: Partial<RedirectInput>) =>
    call(`/admin/redirects/${id}`, { method: 'PUT', body }) as Promise<RedirectRule>;

  const deleteRedirect = (id: number) => call(`/admin/redirects/${id}`, { method: 'DELETE' });

  // --- sitemap overrides (/admin/sitemap) ---
  // Upserts by url; only the fields sent change (null resets to the default).
  const saveSitemapEntry = (body: SitemapEntryInput) =>
    call('/admin/sitemap-entries', { method: 'POST', body }) as Promise<SitemapEntry>;

  const deleteSitemapEntry = (id: number) => call(`/admin/sitemap-entries/${id}`, { method: 'DELETE' });

  // Partners are managed in Filament; editors can reorder them from the
  // /partnerships page. Send every partner id in the new order.
  const reorderPartners = (ids: number[]) => {
    return call('/partners/reorder', { method: 'POST', body: { ids } }) as Promise<Partner[]>;
  };

  return {
    fetchBootstrap,
    fetchPageMeta,
    fetchPageMetaIndex,
    saveText,
    saveImage,
    createTextStyle,
    updateTextStyle,
    deleteTextStyle,
    savePageMeta,
    savePageMetaOgImage,
    saveCustomTag,
    updateCustomTag,
    deleteCustomTag,
    reorderPartners,
    listRedirects,
    createRedirect,
    updateRedirect,
    deleteRedirect,
    saveSitemapEntry,
    deleteSitemapEntry,
  };
};
