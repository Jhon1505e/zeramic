
export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { insertCompra } = dataCompras()

    const data = await insertCompra(body)

    return data
});
