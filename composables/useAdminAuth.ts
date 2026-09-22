// Admin/content-editor auth is a separate system from the patient-facing
// useAuth() — different token, different backend guard (Sanctum admin-ability
// tokens via /admin/login, not the patient /auth/* flow).
export const useAdminAuth = () => {
  const token = useCookie('admin_token', {
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

  const isLoggedIn = () => !!token.value;
  const getToken = () => token.value;
  const setToken = (newToken: string) => {
    token.value = newToken;
    // useCookie serialises to document.cookie via a watcher that flushes on a
    // later tick - callers that immediately do `window.location.href = '/'`
    // (the admin login page) can navigate before that write lands, so the
    // fresh token never reaches the SSR /page-bootstrap request and the CMS
    // toolbar stays hidden. Write it synchronously here as well.
    if (import.meta.client) {
      const secure = window.location.protocol === 'https:' ? '; secure' : '';
      document.cookie = `admin_token=${newToken}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax${secure}`;
    }
  };
  const logout = () => {
    token.value = null;
    if (import.meta.client) {
      document.cookie = 'admin_token=; path=/; max-age=0; samesite=lax';
    }
  };

  // POST /admin/login only issues a usable token for role: admin/super_admin -
  // a non-admin account still 200s but `tokens` comes back without `token`.
  const login = async (username: string, password: string) => {
    const res = await $fetch<{
      user: Record<string, any>;
      tokens: { token?: string };
    }>('/admin/login', {
      baseURL: useUrl() as string,
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: { username, password },
    });

    if (!res.tokens?.token) {
      throw new Error('This account is not authorized to sign in here.');
    }

    // A valid token can still belong to an account that hasn't been granted
    // content-editor access - the CMS toolbar (isContentEditor from
    // /page-bootstrap) would never show, so reject it here rather than land
    // the user on a page with no editing controls and no explanation.
    if (!res.user?.is_content_editor) {
      throw new Error(
        'This account does not have content editor access. Ask a super admin to enable it.',
      );
    }

    setToken(res.tokens.token);
    return res.user;
  };

  return {
    token,
    isLoggedIn,
    getToken,
    setToken,
    logout,
    login,
  };
};
