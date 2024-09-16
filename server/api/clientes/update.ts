export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { updateClient } = fetchClient()

    const data = await updateClient(body)

    return data

})