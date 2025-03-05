export default defineEventHandler(async (event) => {
    const user = event.context.user
    console.log('token', user)
    if (user?.email) {
        const { findClient } = fetchClient()
        const data = await findClient(user.email)
        const noPassUser = { ...data, password: undefined }
        return noPassUser
    }
    return { state: null }
})