export default defineNuxtRouteMiddleware(async () => {
    const { authUser } = useAuth()
    console.log('auth middleware', authUser.value)
    if (!authUser.value) {
        return navigateTo({ name: "clientes" })
    }
})