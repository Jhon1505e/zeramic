export default defineNuxtRouteMiddleware(async () => {
    console.log('auth middleware')
    const { authUser } = useAuth()
    if (!authUser.value) {
        return navigateTo({ name: "clientes" })
    }
})