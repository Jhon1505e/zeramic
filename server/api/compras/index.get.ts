export default defineEventHandler(async (event) => {

    const query = getQuery(event)
    const { getCompras } = dataCompras()
    const data = await getCompras(query)

    return data
});