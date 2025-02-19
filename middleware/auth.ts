export default defineNuxtRouteMiddleware(async (event) => {


    const { userLoggedIn, client } = useAuth()
    if (client.value) return
    const user = await userLoggedIn()
    console.log("user", user, event.name)
    if (!user && event.name !== "micuenta")
        return navigateTo({ name: "micuenta" })
})