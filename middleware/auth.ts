export default defineNuxtRouteMiddleware(async (event) => {
    const { userLoggedIn, client } = useAuth()
    if (client.value) return
    await userLoggedIn()
    const path = event.path
    if(!client.value && path.startsWith("/micuenta") && event.name !== "micuenta")
        return navigateTo({ name: "micuenta" })
})