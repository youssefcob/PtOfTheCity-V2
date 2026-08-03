// composables/useApi.ts
export const useApi = () => {
  const { getToken } = useAuth()
  const config = useRuntimeConfig()

  const apiFetch = async (endpoint: string, options: any = {}) => {
    return await $fetch(endpoint, {
      baseURL: useUrl() as string,
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Accept': 'application/json',
        ...(options.headers || {})
      },
      ...options
    })
  }

  return {
    apiFetch
  }
}