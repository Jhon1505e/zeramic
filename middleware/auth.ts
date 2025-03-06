export default defineNuxtRouteMiddleware(async (event) => {
    const { userLoggedIn, client } = useAuth()
    if (client.value) return
    await userLoggedIn()
    // console.log("vista", event.name)
    // console.log("client", client.value)
    const path = event.path
    if(!client.value && path.startsWith("/micuenta") && event.name !== "micuenta")
        return navigateTo({ name: "micuenta" })
})