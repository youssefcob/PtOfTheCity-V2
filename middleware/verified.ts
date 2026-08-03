// middleware/verified.ts
export default defineNuxtRouteMiddleware(async (to, from) => {
    const { isLoggedIn, isVerified, fetchUser, user } = useAuth()
    const toast = useToast() // 🔥 Use your toast composable here!

    // Not logged in? Redirect to login
    if (!isLoggedIn()) {
        toast.error({ message: 'Please login to continue' })
        return navigateTo('/login')
    }

    // Fetch user data if we don't have it yet
    if (!user.value) {
        await fetchUser()
    }

    // Check verification status
    if (!isVerified.value) {
        // Don't redirect if already on verify page (avoid loop)
        if (to.path !== '/verify') {
            toast.warning({ message: 'Please verify your email to access this page' })
            return navigateTo('/verify')
        }
    }
})