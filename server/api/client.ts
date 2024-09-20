export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    console.log('body',body)

    const { getClients, findClient } = fetchClient()
    
    if (!body?.email) {
        return await getClients()
    }

    const data = await findClient(body.email.trim())
    console.log('data',data)
    return data
})
