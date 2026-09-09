// Admin/content-editor auth is a separate system from the patient-facing
// useAuth() — different token, different backend guard (Sanctum admin-ability
// tokens via /admin/login, not the patient /auth/* flow).
export const useAdminAuth = () => {
  const token = useCookie('admin_token', {
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  const isLoggedIn = () => !!token.value;
  const getToken = () => token.value;
  const setToken = (newToken: string) => {
    token.value = newToken;
  };
  const logout = () => {
    token.value = null;
  };

  // POST /admin/login only issues a usable token for role: admin/super_admin -
  // a non-admin account still 200s but `tokens` comes back without `token`.
  const login = async (username: string, password: string) => {
    const res = await $fetch<{ user: Record<string, any>; tokens: { token?: string } }>('/admin/login', {
      baseURL: useUrl() as string,
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: { username, password },
    });

    if (!res.tokens?.token) {
      throw new Error('This account is not authorized to sign in here.');
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
