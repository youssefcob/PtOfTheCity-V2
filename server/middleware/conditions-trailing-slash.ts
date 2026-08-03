export default defineEventHandler((event) => {
  const url = event.node.req.url || '';
  const [pathname, search] = url.split('?');

  if (pathname === '/conditions/') {
    return sendRedirect(event, search ? `/conditions?${search}` : '/conditions', 301);
  }
});
