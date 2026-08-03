import type { User } from "~/types/types"

// composables/useAuth.ts
export const useAuth = () => {
  const token = useCookie('auth_token', {
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  })

  // Store user data client-side (including verification status)
  const user = useState<User | null>('user', () => null)

  const isLoggedIn = () => {
    return !!token.value
  }

  // const isVerified = () => {
  //   return user.value?.is_verified
  //   // or: return user.value?.is_verified === true
  // }

  const getToken = () => {
    return token.value
  }

  const setToken = (newToken: string) => {
    token.value = newToken
  }

  const setUser = (userData: any) => {
    user.value = userData
  }

  const logout = () => {
    token.value = null
    user.value = null
  }

  const isVerified = computed(() => {
    console.log('Checking if user is verified:', user.value)
    return user.value?.is_verified === true
  })

  // Fetch user data from Laravel API
  const fetchUser = async () => {
    if (!token.value) return null

    try {
      const { apiFetch } = useApi()
      const userData = await apiFetch('/auth/me')
      console.log('Fetched user data:', userData)
      setUser(userData)
      return userData
    } catch (error: any) {
      console.error('❌ fetchUser error:', {
        message: error.message,
        status: error.status,
        statusText: error.statusText,
        data: error.data
      })

      // Only logout on auth errors
      if (error.status === 401 || error.status === 403) {
        console.log('🔒 Invalid token, logging out')
        logout()
      } else {
        console.log('⚠️ Non-auth error, keeping token')
      }
      return null
    }
  }

  return {
    isLoggedIn,
    isVerified,
    getToken,
    setToken,
    setUser,
    logout,
    fetchUser,
    user,
    token
  }
}