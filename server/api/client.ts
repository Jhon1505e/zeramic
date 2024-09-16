export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    console.log(body)

    if (!body.email) {
        return
    }

    const { findClient } = fetchClient()
    const data = await findClient(body.email)
    console.log(data)
    return data
})
