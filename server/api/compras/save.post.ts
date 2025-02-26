
export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { saveCompra } = dataCompras()

    const data = await saveCompra(body)

    return data
});
