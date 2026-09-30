// Admin-managed redirects (/admin/redirects). Rules live in the API; this
// applies them to page requests before Nuxt renders anything.
//
// The rule map (GET /redirects/map) is kept in memory and refreshed at most
// once a minute, so a new rule takes effect within a minute. If the API is
// unreachable the last known map keeps working.

type RedirectRule = { id: number; destination: string; status_code: 301 | 302 };
type RedirectMap = Record<string, RedirectRule>;

const TTL_MS = 60_000;
let cachedMap: RedirectMap = {};
let fetchedAt = 0;
let inFlight: Promise<void> | null = null;

const loadMap = (apiUrl: string) => {
  if (Date.now() - fetchedAt < TTL_MS) return Promise.resolve();
  inFlight ??= $fetch<RedirectMap | []>(`${apiUrl}/redirects/map`, { timeout: 3000 })
    .then((map) => {
      // keyed lowercase: the API treats /About and /about as the same source
      cachedMap = Object.fromEntries(
        Object.entries(map && !Array.isArray(map) ? map : {}).map(([source, rule]) => [source.toLowerCase(), rule]),
      );
      fetchedAt = Date.now();
    })
    .catch(() => {
      // keep serving the last good map; retry on a later request
      fetchedAt = Date.now() - TTL_MS + 10_000;
    })
    .finally(() => {
      inFlight = null;
    });
  return inFlight;
};

// Never redirect these, so a bad rule can't break the admin, the API proxy
// or Nuxt's own assets.
const SKIP_PREFIXES = ['/admin', '/api/', '/__sitemap__', '/_nuxt', '/__nuxt', '/_ipx', '/sitemap', '/robots.txt', '/favicon'];
// Real files are served as-is; old page-style extensions can still be redirected.
const PAGE_EXTENSIONS = /\.(html?|php|aspx?)$/i;

/** Same rule as the API: no query/hash, one leading "/", no trailing "/" (except root). */
const normalizePath = (path: string) => ('/' + path.split(/[?#]/)[0].replace(/^\/+/, '')).replace(/\/+$/, '') || '/';

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  if (method !== 'GET' && method !== 'HEAD') return;

  const [rawPath, query] = (event.node.req.url || '/').split('?');
  if (SKIP_PREFIXES.some((prefix) => rawPath === prefix || rawPath.startsWith(prefix))) return;
  const lastSegment = rawPath.split('/').pop() || '';
  if (lastSegment.includes('.') && !PAGE_EXTENSIONS.test(lastSegment)) return;

  const config = useRuntimeConfig();
  await loadMap(config.public.url);

  let decoded = rawPath;
  try {
    decoded = decodeURI(rawPath);
  } catch {
    // malformed escape sequence: match against the raw path
  }
  const path = normalizePath(decoded);
  const rule = cachedMap[path.toLowerCase()];
  if (!rule) return;

  // guard against a rule that points at itself
  if (!/^https?:\/\//i.test(rule.destination) && normalizePath(rule.destination).toLowerCase() === path.toLowerCase()) return;

  // count the hit without delaying the visitor
  $fetch(`${config.public.url}/redirects/${rule.id}/hit`, { method: 'POST', timeout: 3000 }).catch(() => {});

  const target = query && !rule.destination.includes('?') ? `${rule.destination}?${query}` : rule.destination;
  return sendRedirect(event, target, rule.status_code);
});
