export default defineEventHandler(async (event) => {
    if (!event.context.valid)
        return []

    const query = getQuery(event)
    const { getCompras } = dataCompras()
    const data = await getCompras(query)
    return data
});