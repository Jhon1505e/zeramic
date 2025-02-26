export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { getClients } = fetchClient()

    const data = await getClients(body)
    
    if (!data) {
        return { error: "No data" }
    }
    return data
})